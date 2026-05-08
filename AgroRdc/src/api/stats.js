const UNIT_TO_KG = { 'Tonne': 1000, 'Sac 50 kg': 50, 'Kg (Vrac)': 1, 'Caisse': 25 }
const MONTH_LABELS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

function toKg(quantity, unit) {
    return parseFloat(quantity || 0) * (UNIT_TO_KG[unit] || 1)
}

// Reads agrordc_harvests from localStorage and computes metrics.
// Returns null if no harvest entries exist (caller should use demo data).
export function computeHarvestStats() {
    try {
        const raw = localStorage.getItem('agrordc_harvests')
        const harvests = raw ? JSON.parse(raw) : []
        if (harvests.length === 0) return null

        const totalKg = harvests.reduce((s, h) => s + toKg(h.quantity, h.unit), 0)

        const byParcel = {}
        harvests.forEach((h) => {
            byParcel[h.parcelId] = (byParcel[h.parcelId] || 0) + toKg(h.quantity, h.unit)
        })

        const byMonth = {}
        harvests.forEach((h) => {
            if (!h.date) return
            const key = h.date.substring(0, 7) // YYYY-MM
            byMonth[key] = (byMonth[key] || 0) + toKg(h.quantity, h.unit)
        })

        return {
            totalTonnes: Math.round(totalKg / 100) / 10,
            totalKg,
            byParcel,
            byMonth,
            count: harvests.length,
        }
    } catch {
        return null
    }
}

// Returns last `count` months as bar-chart-ready objects { label, kg, pct }
export function getMonthlyBars(stats, count = 6) {
    if (!stats?.byMonth) return null
    const keys = Object.keys(stats.byMonth).sort().slice(-count)
    if (keys.length === 0) return null
    const values = keys.map((k) => stats.byMonth[k])
    const maxVal = Math.max(...values, 1)
    return keys.map((k, i) => ({
        label: MONTH_LABELS[parseInt(k.substring(5, 7), 10) - 1],
        kg: values[i],
        tonnes: Math.round(values[i] / 100) / 10,
        pct: Math.round((values[i] / maxVal) * 100),
    }))
}

// Groups parcel totals by crop name using MOCK_PARCELS lookup
export function getStatsByCrop(stats, parcels) {
    if (!stats?.byParcel || !parcels) return null
    const byCrop = {}
    Object.entries(stats.byParcel).forEach(([parcelId, kg]) => {
        const parcel = parcels.find((p) => p.id === parcelId)
        const crop = parcel?.crop ?? 'Autre'
        byCrop[crop] = (byCrop[crop] || 0) + kg
    })
    const total = Object.values(byCrop).reduce((s, v) => s + v, 0) || 1
    return Object.entries(byCrop)
        .sort((a, b) => b[1] - a[1])
        .map(([crop, kg]) => ({
            crop,
            tonnes: Math.round(kg / 100) / 10,
            pct: Math.round((kg / total) * 100),
        }))
}
