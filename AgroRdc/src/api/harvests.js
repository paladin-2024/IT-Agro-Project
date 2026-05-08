const API = import.meta.env.VITE_API_URL
const STORAGE_KEY = 'agrordc_harvests'

function loadHarvests() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function saveHarvests(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export async function createHarvest(payload) {
    // payload: { parcelId, quantity, unit, date, observations, employeeId }
    if (!API) {
        const harvests = loadHarvests()
        const entry = {
            id: `PRD-${Date.now()}`,
            createdAt: new Date().toISOString(),
            ...payload,
        }
        saveHarvests([entry, ...harvests])
        return entry
    }
    const res = await fetch(`${API}/api/harvests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Erreur lors de l'enregistrement de la récolte")
    return res.json()
}

export async function getHarvestsByParcel(parcelId) {
    if (!API) {
        return loadHarvests().filter((h) => h.parcelId === parcelId)
    }
    const res = await fetch(`${API}/api/harvests?parcelId=${parcelId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    })
    if (!res.ok) throw new Error('Erreur lors du chargement des récoltes')
    return res.json()
}

export async function getRecentHarvests(limit = 10) {
    if (!API) {
        return loadHarvests().slice(0, limit)
    }
    const res = await fetch(`${API}/api/harvests?limit=${limit}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    })
    if (!res.ok) throw new Error('Erreur lors du chargement des récoltes')
    return res.json()
}
