import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import EmployeeSidebar from '../components/EmployeeSidebar.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { MOCK_CROPS } from '../api/mocks.js'
import Icon from '../components/Icon.jsx'

const UNIT_TO_KG = { 'Tonne': 1000, 'Sac 50 kg': 50, 'Kg (Vrac)': 1, 'Caisse': 25 }
function toKg(qty, unit) { return parseFloat(qty || 0) * (UNIT_TO_KG[unit] || 1) }

function loadHarvests() {
    try { return JSON.parse(localStorage.getItem('agrordc_harvests') || '[]') } catch { return [] }
}

function loadAssignedParcels(userId) {
    try {
        const key = `agrordc_assignments_${userId}`
        const raw = localStorage.getItem(key)
        return raw ? JSON.parse(raw) : null
    } catch { return null }
}

function fmtDate(d) {
    if (!d) return '—'
    return new Date(d + 'T00:00:00').toLocaleDateString('fr-CD', {
        day: 'numeric', month: 'short', year: 'numeric',
    })
}

const STATUS_STYLE = {
    'En cours':          'bg-emerald-100 text-emerald-700',
    'Prêt pour récolte': 'bg-amber-100 text-amber-700',
    'Alerte Stress':     'bg-red-100 text-red-700',
    'Planté':            'bg-blue-100 text-blue-700',
    'En Croissance':     'bg-green-100 text-green-700',
}

export default function EmployeeCropDetailPage() {
    const { cropName } = useParams()
    const { user } = useAuth()
    const decodedName = decodeURIComponent(cropName || '')

    const meta = useMemo(() => MOCK_CROPS.find(c => c.name === decodedName), [decodedName])

    const userId = user?.id
    const { parcels, productions } = useMemo(() => {
        const allHarvests = loadHarvests()
        const assignedRaw = userId ? loadAssignedParcels(userId) : null

        // Find parcels that grow this crop
        const cropParcels = allHarvests
            .filter(h => h.cropName === decodedName || h.crop === decodedName)
            .reduce((acc, h) => {
                if (!acc.find(p => p.id === h.parcelId)) {
                    acc.push({ id: h.parcelId, name: h.parcelId, status: 'En cours' })
                }
                return acc
            }, [])

        // Also include parcels from assignments that have this crop
        if (assignedRaw) {
            const assignedList = Array.isArray(assignedRaw) ? assignedRaw : []
            for (const p of assignedList) {
                if ((p.crop === decodedName) && !cropParcels.find(cp => cp.id === p.id)) {
                    cropParcels.push({ id: p.id, name: p.name || p.id, status: p.status || 'En cours' })
                }
            }
        }

        const parcelIds = new Set(cropParcels.map(p => p.id))
        const cropHarvests = allHarvests.filter(h => parcelIds.has(h.parcelId) || h.cropName === decodedName || h.crop === decodedName)

        return { parcels: cropParcels, productions: cropHarvests }
    }, [userId, decodedName])

    const totalKg = productions.reduce((s, h) => s + toKg(h.quantity, h.unit), 0)
    const totalTonnes = Math.round(totalKg / 100) / 10

    if (!meta && decodedName) {
        return (
            <div className="min-h-screen bg-[#f9f9ff]">
                <EmployeeSidebar />
                <div className="ml-64 flex flex-col items-center justify-center py-32 text-center">
                    <Icon name="eco" className="h-12 w-12 text-slate-300" />
                    <p className="mt-4 text-lg font-bold text-slate-500">Culture introuvable</p>
                    <Link to="/employee/cultures" className="mt-4 text-sm font-semibold text-[#003f87] hover:underline">
                        Retour aux cultures
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f9f9ff] text-[#171c25]">
            <EmployeeSidebar />

            <main className="ml-64 space-y-6 px-8 pt-6 pb-10">

                {/* Hero card */}
                <div className="overflow-hidden rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 text-white shadow-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="mb-1 flex items-center gap-2">
                                <Icon name="eco" className="h-6 w-6 text-emerald-200" />
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">Culture</span>
                            </div>
                            <h1 className="text-3xl font-black">{decodedName}</h1>
                            {meta && (
                                <p className="mt-1 text-sm text-emerald-200">
                                    Variété : <strong className="text-white">{meta.variety}</strong>
                                </p>
                            )}
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-emerald-200">Durée de croissance</p>
                            <p className="text-2xl font-black">
                                {meta?.growthDays > 0 ? `${meta.growthDays}j` : 'Pérenne'}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <HeroStat label="Parcelles" value={String(parcels.length || '—')} />
                        <HeroStat label="Productions" value={String(productions.length || '—')} />
                        <HeroStat label="Récolté" value={totalTonnes > 0 ? `${totalTonnes} t` : '—'} />
                    </div>
                </div>

                {/* Parcels with this crop */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
                        <Icon name="grid_view" className="h-5 w-5 text-[#003f87]" />
                        <h2 className="text-sm font-bold text-[#1b1c1c]">Parcelles associées</h2>
                    </div>
                    {parcels.length === 0 ? (
                        <div className="px-5 py-8 text-center">
                            <p className="text-sm text-slate-400">Aucune parcelle enregistrée pour cette culture.</p>
                            <Link
                                to="/employee/dashboard"
                                className="mt-2 inline-block text-xs font-semibold text-[#003f87] hover:underline"
                            >
                                Voir mes parcelles
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {parcels.map(p => (
                                <Link
                                    key={p.id}
                                    to={`/employee/parcelles/${p.id}`}
                                    className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-slate-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="rounded bg-blue-50 px-2 py-0.5 font-mono text-xs font-bold text-[#003f87]">
                                            {p.id}
                                        </span>
                                        <span className="text-sm font-medium text-[#1b1c1c]">{p.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STATUS_STYLE[p.status] || 'bg-slate-100 text-slate-600'}`}>
                                            {p.status}
                                        </span>
                                        <Icon name="chevron_right" className="h-4 w-4 text-slate-400" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Production records */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                        <div className="flex items-center gap-2">
                            <Icon name="inventory_2" className="h-5 w-5 text-[#003f87]" />
                            <h2 className="text-sm font-bold text-[#1b1c1c]">Productions enregistrées</h2>
                        </div>
                        {totalTonnes > 0 && (
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#003f87]">
                                {totalTonnes} t total
                            </span>
                        )}
                    </div>
                    {productions.length === 0 ? (
                        <div className="px-5 py-8 text-center">
                            <Icon name="inventory_2" className="mx-auto h-10 w-10 text-slate-300" />
                            <p className="mt-3 text-sm font-semibold text-slate-500">Aucune production enregistrée</p>
                            <p className="mt-1 text-xs text-slate-400">
                                Les récoltes saisies seront affichées ici.
                            </p>
                            <Link
                                to="/employee/saisir-recolte"
                                className="mt-4 inline-flex items-center gap-1 rounded-lg bg-[#003f87] px-4 py-2 text-xs font-bold text-white hover:bg-[#0056b3]"
                            >
                                <Icon name="add_task" className="h-4 w-4" />
                                Saisir une récolte
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {productions.map((h, i) => {
                                const kg = toKg(h.quantity, h.unit)
                                return (
                                    <Link
                                        key={h.id || i}
                                        to={h.id ? `/employee/productions/${h.id}` : '#'}
                                        className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-slate-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50">
                                                <Icon name="inventory_2" className="h-4 w-4 text-[#003f87]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-[#1b1c1c]">
                                                    {h.quantity} {h.unit}
                                                    <span className="ml-1 text-xs font-normal text-slate-400">
                                                        ({kg >= 1000 ? `${(kg/1000).toFixed(2)} t` : `${kg} kg`})
                                                    </span>
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    Parcelle {h.parcelId} · {fmtDate(h.date)}
                                                </p>
                                            </div>
                                        </div>
                                        <Icon name="chevron_right" className="h-4 w-4 shrink-0 text-slate-400" />
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-2 gap-3">
                    <Link
                        to="/employee/saisir-recolte"
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#003f87] py-3 text-sm font-bold text-white shadow-sm hover:bg-[#0056b3]"
                    >
                        <Icon name="add_task" className="h-4 w-4" />
                        Saisir une récolte
                    </Link>
                    <Link
                        to="/employee/cultures"
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                    >
                        <Icon name="eco" className="h-4 w-4 text-emerald-600" />
                        Toutes les cultures
                    </Link>
                </div>
            </main>

        </div>
    )
}

function HeroStat({ label, value }) {
    return (
        <div className="rounded-lg bg-white/10 p-3 text-center">
            <p className="text-lg font-black">{value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-200">{label}</p>
        </div>
    )
}
