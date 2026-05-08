import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import OwnerSidebar from '../components/OwnerSidebar'
import { MOCK_CROPS } from '../api/mocks.js'
import { getAllParcels } from '../api/parcels.js'
import { computeHarvestStats } from '../api/stats.js'

export default function OwnerCulturesPage() {
    const parcels = useMemo(() => getAllParcels(), [])
    const harvestStats = useMemo(() => computeHarvestStats(), [])

    const cropRows = useMemo(() => {
        return MOCK_CROPS.map(c => {
            const linked = parcels.filter(p => p.crop === c.name)
            const totalAreaHa = linked.reduce((s, p) => s + (parseFloat(p.area) || 0), 0)
            const totalKg = harvestStats?.byParcel
                ? linked.reduce((s, p) => s + (harvestStats.byParcel[p.id] || 0), 0)
                : null
            const totalTonnes = totalKg !== null ? Math.round(totalKg / 100) / 10 : null
            return { ...c, parcelCount: linked.length, totalAreaHa: Math.round(totalAreaHa * 10) / 10, totalTonnes }
        })
    }, [parcels, harvestStats])

    const totalCrops   = MOCK_CROPS.length
    const totalParcels = parcels.length
    const topCrop      = [...cropRows].sort((a, b) => b.parcelCount - a.parcelCount)[0]

    return (
        <div className="min-h-screen bg-[#f4f6f9] text-[#1b1c1c]">
            <OwnerSidebar />

            <main className="ml-64 min-h-screen">
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
                    <div>
                        <h1 className="text-lg font-bold text-[#1b1c1c]">Cultures</h1>
                        <p className="text-xs text-slate-500">Catalogue des cultures et suivi par parcelle</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined cursor-pointer text-slate-500 hover:text-[#003f87]">notifications</span>
                        <span className="material-symbols-outlined cursor-pointer text-slate-500 hover:text-[#003f87]">account_circle</span>
                    </div>
                </header>

                <div className="mx-auto max-w-7xl space-y-8 p-8">

                    {/* Page title */}
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-[#003f87]">Gestion des Cultures</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Catalogue de toutes les cultures disponibles et leur répartition sur les parcelles.
                            </p>
                        </div>
                        <Link
                            to="/owner/parcelles/creer"
                            className="flex items-center gap-2 rounded-lg bg-[#003f87] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#002d63] transition-colors"
                        >
                            <span className="material-symbols-outlined text-base">add</span>
                            Nouvelle Parcelle
                        </Link>
                    </div>

                    {/* KPI row */}
                    <div className="grid grid-cols-3 gap-4">
                        <KpiCard icon="eco" iconBg="bg-emerald-600" label="Types de cultures" value={totalCrops} />
                        <KpiCard icon="grid_view" iconBg="bg-[#003f87]" label="Parcelles en culture" value={totalParcels} />
                        <KpiCard
                            icon="military_tech"
                            iconBg="bg-amber-500"
                            label="Culture dominante"
                            value={topCrop?.parcelCount > 0 ? topCrop.name : '—'}
                            sub={topCrop?.parcelCount > 0 ? `${topCrop.parcelCount} parcelle(s)` : undefined}
                        />
                    </div>

                    {/* Crop cards grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {cropRows.map(c => (
                            <CropCard key={c.id} crop={c} />
                        ))}
                    </div>

                    {/* Parcel-by-crop table */}
                    <section className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
                            <span className="material-symbols-outlined text-[#003f87]">table_rows</span>
                            <h3 className="text-sm font-bold text-[#1b1c1c]">Toutes les Parcelles par Culture</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                        <th className="px-6 py-3.5">Parcelle</th>
                                        <th className="px-6 py-3.5">Culture</th>
                                        <th className="px-6 py-3.5">Variété</th>
                                        <th className="px-6 py-3.5 text-right">Superficie</th>
                                        <th className="px-6 py-3.5">Statut</th>
                                        <th className="px-6 py-3.5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {parcels.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-400">
                                                Aucune parcelle enregistrée
                                            </td>
                                        </tr>
                                    )}
                                    {parcels.map((p, i) => {
                                        const cropMeta = MOCK_CROPS.find(c => c.name === p.crop)
                                        const statusClass =
                                            p.status === 'Prêt pour récolte' ? 'bg-amber-100 text-amber-800' :
                                            p.status === 'En cours'          ? 'bg-emerald-100 text-emerald-800' :
                                            p.status === 'Alerte Stress'     ? 'bg-red-100 text-red-800' :
                                            p.status === 'Planté'            ? 'bg-blue-100 text-blue-800' :
                                            'bg-slate-100 text-slate-600'
                                        return (
                                            <tr key={p.id} className={`transition-colors hover:bg-slate-50 ${i % 2 === 1 ? 'bg-slate-50/40' : ''}`}>
                                                <td className="px-6 py-4">
                                                    <span className="rounded bg-blue-50 px-2 py-0.5 font-mono text-xs font-bold text-[#003f87]">
                                                        {p.id}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-[#1b1c1c]">{p.crop || '—'}</td>
                                                <td className="px-6 py-4 text-slate-500">{cropMeta?.variety || '—'}</td>
                                                <td className="px-6 py-4 text-right text-slate-600">{p.area || '—'}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${statusClass}`}>
                                                        {p.status || 'Actif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        to={`/owner/parcelles/${p.id}`}
                                                        className="text-xs font-semibold text-[#003f87] hover:underline"
                                                    >
                                                        Voir →
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

function KpiCard({ icon, iconBg, label, value, sub }) {
    return (
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
                <span className="material-symbols-outlined text-xl text-white">{icon}</span>
            </div>
            <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
                <p className="mt-0.5 text-xl font-extrabold text-[#1b1c1c]">{value}</p>
                {sub && <p className="text-[11px] text-slate-400">{sub}</p>}
            </div>
        </div>
    )
}

function CropCard({ crop }) {
    const hasData = crop.parcelCount > 0

    return (
        <div className={`rounded-xl bg-white ring-1 shadow-sm transition-all hover:shadow-md ${hasData ? 'ring-slate-200' : 'ring-slate-100 opacity-70'}`}>
            <div className="flex items-start justify-between p-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                        <span className="material-symbols-outlined text-emerald-600"
                              style={{ fontVariationSettings: "'FILL' 1" }}>
                            eco
                        </span>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-[#1b1c1c]">{crop.name}</h4>
                        <p className="text-xs text-slate-500">Var. {crop.variety}</p>
                    </div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${hasData ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                    {hasData ? `${crop.parcelCount} parcelle(s)` : 'Non planté'}
                </span>
            </div>

            <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100">
                <Stat label="Superficie" value={crop.totalAreaHa > 0 ? `${crop.totalAreaHa} ha` : '—'} />
                <Stat label="Croissance" value={crop.growthDays > 0 ? `${crop.growthDays}j` : 'Pérenne'} />
                <Stat
                    label="Production"
                    value={crop.totalTonnes !== null && crop.totalTonnes > 0 ? `${crop.totalTonnes} t` : '—'}
                    highlight={crop.totalTonnes > 0}
                />
            </div>
        </div>
    )
}

function Stat({ label, value, highlight }) {
    return (
        <div className="flex flex-col items-center py-3">
            <span className={`text-sm font-bold ${highlight ? 'text-[#003f87]' : 'text-[#1b1c1c]'}`}>{value}</span>
            <span className="mt-0.5 text-[10px] uppercase tracking-wide text-slate-400">{label}</span>
        </div>
    )
}
