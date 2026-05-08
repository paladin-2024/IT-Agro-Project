import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import EmployeeTopNav from '../components/EmployeeTopNav.jsx'
import EmployeeBottomNav from '../components/EmployeeBottomNav.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { getAssignedParcels } from '../api/assignments.js'
import { MOCK_CROPS } from '../api/mocks.js'

function loadMyHarvests(employeeId) {
    try {
        const all = JSON.parse(localStorage.getItem('agrordc_harvests') || '[]')
        return employeeId ? all.filter(h => h.employeeId === employeeId) : all
    } catch { return [] }
}

const UNIT_TO_KG = { 'Tonne': 1000, 'Sac 50 kg': 50, 'Kg (Vrac)': 1, 'Caisse': 25 }
function toKg(qty, unit) { return parseFloat(qty || 0) * (UNIT_TO_KG[unit] || 1) }

const STATUS_STYLE = {
    'En cours':          'bg-emerald-100 text-emerald-700',
    'Prêt pour récolte': 'bg-amber-100 text-amber-700',
    'Alerte Stress':     'bg-red-100 text-red-700',
    'Planté':            'bg-blue-100 text-blue-700',
    'En Croissance':     'bg-green-100 text-green-700',
}

export default function EmployeeCulturesPage() {
    const { user } = useAuth()
    const [parcels,  setParcels]  = useState([])
    const [loading,  setLoading]  = useState(true)

    useEffect(() => {
        if (!user?.id) { setLoading(false); return }
        getAssignedParcels(user.id)
            .then(p => { setParcels(p); setLoading(false) })
            .catch(() => setLoading(false))
    }, [user?.id])

    const myHarvests = useMemo(() => loadMyHarvests(user?.id), [user?.id])

    const cropRows = useMemo(() => {
        const uniqueCropNames = [...new Set(parcels.map(p => p.crop).filter(Boolean))]
        return uniqueCropNames.map(cropName => {
            const meta    = MOCK_CROPS.find(c => c.name === cropName)
            const linked  = parcels.filter(p => p.crop === cropName)
            const kgTotal = myHarvests
                .filter(h => linked.some(p => p.id === h.parcelId))
                .reduce((s, h) => s + toKg(h.quantity, h.unit), 0)
            return {
                name:       cropName,
                variety:    meta?.variety    ?? '—',
                growthDays: meta?.growthDays ?? null,
                parcels:    linked,
                kgLogged:   kgTotal,
                tonnes:     Math.round(kgTotal / 100) / 10,
            }
        })
    }, [parcels, myHarvests])

    const totalHarvestKg = myHarvests.reduce((s, h) => s + toKg(h.quantity, h.unit), 0)
    const totalTonnes    = Math.round(totalHarvestKg / 100) / 10

    return (
        <div className="min-h-screen bg-[#f9f9ff] text-[#171c25]">
            <EmployeeTopNav title="Mes Cultures" />

            <div className="mx-auto max-w-3xl space-y-6 px-4 pb-32 pt-6 md:pb-10">

                {/* Page title */}
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-[#003f87]">Mes Cultures</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Cultures en cours sur vos parcelles assignées.
                    </p>
                </div>

                {/* KPI strip */}
                <div className="grid grid-cols-3 gap-3">
                    <KpiCard icon="grid_view"  label="Parcelles" value={parcels.length}   color="bg-[#003f87]" />
                    <KpiCard icon="eco"        label="Cultures"  value={cropRows.length}  color="bg-emerald-600" />
                    <KpiCard icon="inventory_2" label="Récolté"  value={`${totalTonnes} t`} color="bg-amber-500" />
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center py-12">
                        <span className="material-symbols-outlined animate-spin text-3xl text-slate-300">progress_activity</span>
                    </div>
                )}

                {/* Empty state */}
                {!loading && parcels.length === 0 && (
                    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                        <span className="material-symbols-outlined text-4xl text-slate-300">eco</span>
                        <p className="mt-3 text-sm font-semibold text-slate-500">Aucune parcelle assignée</p>
                        <p className="mt-1 text-xs text-slate-400">Contactez votre superviseur pour être affecté à une parcelle.</p>
                    </div>
                )}

                {/* Crop cards */}
                {!loading && cropRows.map(c => (
                    <div key={c.name} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                        {/* Crop header */}
                        <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white px-5 py-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                                <span className="material-symbols-outlined text-emerald-700"
                                      style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-bold text-[#1b1c1c]">{c.name}</h3>
                                <p className="text-xs text-slate-500">Variété : {c.variety}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                    {c.growthDays > 0 ? `${c.growthDays} jours` : 'Pérenne'}
                                </p>
                                <p className="text-[10px] text-slate-400">durée croissance</p>
                            </div>
                        </div>

                        {/* Crop stats */}
                        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
                            <MiniStat label="Parcelles"  value={c.parcels.length} />
                            <MiniStat label="Superficie" value={`${c.parcels.reduce((s, p) => s + (parseFloat(p.area) || 0), 0).toFixed(1)} ha`} />
                            <MiniStat label="Récolté"    value={c.tonnes > 0 ? `${c.tonnes} t` : '—'} highlight={c.tonnes > 0} />
                        </div>

                        {/* Parcel list */}
                        <div className="divide-y divide-slate-50">
                            {c.parcels.map(p => (
                                <Link
                                    key={p.id}
                                    to={`/employee/parcelles/${p.id}`}
                                    className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-slate-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="rounded bg-blue-50 px-2 py-0.5 font-mono text-xs font-bold text-[#003f87]">
                                            {p.id}
                                        </span>
                                        <span className="text-sm font-medium text-[#1b1c1c]">{p.name || p.id}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STATUS_STYLE[p.status] || 'bg-slate-100 text-slate-600'}`}>
                                            {p.status || 'Actif'}
                                        </span>
                                        <span className="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* My harvests for this crop */}
                        {c.tonnes > 0 && (
                            <div className="border-t border-slate-100 bg-blue-50 px-5 py-3">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-[#003f87]">inventory_2</span>
                                    <p className="text-xs font-semibold text-[#003f87]">
                                        Vous avez enregistré <strong>{c.tonnes} t</strong> de {c.name} au total.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* All crops catalogue */}
                {!loading && (
                    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
                            <span className="material-symbols-outlined text-base text-[#003f87]">menu_book</span>
                            <h3 className="text-sm font-bold text-[#1b1c1c]">Catalogue des Cultures</h3>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {MOCK_CROPS.map(c => {
                                const active = cropRows.some(r => r.name === c.name)
                                return (
                                    <div key={c.id} className={`flex items-center justify-between px-5 py-3.5 ${active ? '' : 'opacity-50'}`}>
                                        <div className="flex items-center gap-3">
                                            <span className={`material-symbols-outlined text-base ${active ? 'text-emerald-600' : 'text-slate-300'}`}
                                                  style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                                            <div>
                                                <p className="text-sm font-semibold text-[#1b1c1c]">{c.name}</p>
                                                <p className="text-xs text-slate-500">Var. {c.variety}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-semibold text-slate-500">
                                                {c.growthDays > 0 ? `${c.growthDays} jours` : 'Pérenne'}
                                            </p>
                                            {active
                                                ? <span className="text-[10px] font-bold text-emerald-600">Sur vos parcelles</span>
                                                : <span className="text-[10px] text-slate-400">Non assigné</span>
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}
            </div>

            <EmployeeBottomNav />
        </div>
    )
}

function KpiCard({ icon, label, value, color }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
                <span className="material-symbols-outlined text-base text-white">{icon}</span>
            </div>
            <p className="text-lg font-extrabold text-[#1b1c1c]">{value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        </div>
    )
}

function MiniStat({ label, value, highlight }) {
    return (
        <div className="flex flex-col items-center py-3">
            <span className={`text-sm font-bold ${highlight ? 'text-[#003f87]' : 'text-[#1b1c1c]'}`}>{value}</span>
            <span className="mt-0.5 text-[10px] uppercase tracking-wide text-slate-400">{label}</span>
        </div>
    )
}
