import React, { useState } from "react";
import { Link } from "react-router-dom";
import OwnerSidebar from "../components/OwnerSidebar";
import Icon from '../components/Icon.jsx'

/* ─── Static data ────────────────────────────────────────────────────── */

const farmGroups = [
    {
        farm: "KIPUSHI MAIN",
        province: "Haut-Katanga",
        id: "KP-001",
        parcels: [
            {
                id: "KP-A01",
                cropIcon: "grain",
                cropColor: "text-amber-600",
                crop: "Maïs Blanc (H614)",
                area: "24.5 Ha",
                date: "12 Nov 2023",
                status: "En cours",
                statusClass: "bg-green-100 text-green-800",
            },
            {
                id: "KP-B12",
                cropIcon: "potted_plant",
                cropColor: "text-emerald-600",
                crop: "Soja (S-02)",
                area: "18.2 Ha",
                date: "05 Déc 2023",
                status: "Irrigation",
                statusClass: "bg-blue-100 text-blue-800",
            },
        ],
    },
    {
        farm: "LIKASI NORTH",
        province: "Haut-Katanga",
        id: "LK-002",
        parcels: [
            {
                id: "LK-N05",
                cropIcon: "grain",
                cropColor: "text-amber-600",
                crop: "Maïs Jaune",
                area: "45.0 Ha",
                date: "28 Oct 2023",
                status: "Prêt à récolter",
                statusClass: "bg-amber-100 text-amber-800",
            },
            {
                id: "LK-N08",
                cropIcon: "texture",
                cropColor: "text-slate-400",
                crop: "En jachère",
                area: "12.0 Ha",
                date: "—",
                status: "Repos",
                statusClass: "bg-slate-100 text-slate-600",
            },
        ],
    },
];

/* ─── Page component ─────────────────────────────────────────────────── */

export default function OwnerFarmParcelPage() {
    const [farmFilter, setFarmFilter] = useState("all");

    const filteredGroups =
        farmFilter === "all"
            ? farmGroups
            : farmGroups.filter((g) => g.id === farmFilter);

    const totalParcels = farmGroups.reduce((s, g) => s + g.parcels.length, 0);

    return (
        <div className="min-h-screen bg-[#f4f6f9] text-[#1b1c1c]">
            <OwnerSidebar />

            <main className="ml-64 min-h-screen">
                {/* Sticky header */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
                    <div>
                        <h1 className="text-lg font-bold text-[#1b1c1c]">Mes Fermes &amp; Parcelles</h1>
                        <p className="text-xs text-slate-500">Gérez vos actifs agricoles dans la région Haut-Katanga</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            to="/owner/fermes/creer"
                            className="flex items-center gap-2 rounded-lg border border-[#003f87] px-4 py-2 text-sm font-semibold text-[#003f87] transition-colors hover:bg-blue-50"
                        >
                            <Icon name="add_location" className="h-5 w-5 text-base" />
                            Nouvelle Ferme
                        </Link>
                        <button className="flex items-center gap-2 rounded-lg bg-[#003f87] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#002d63] active:scale-95">
                            <Icon name="grid_view" className="h-5 w-5 text-base" />
                            Créer une Parcelle
                        </button>
                    </div>
                </header>

                <div className="space-y-8 p-8">
                    {/* Bento overview */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* Map card */}
                        <div className="col-span-12 flex flex-col gap-5 rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-sm lg:col-span-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-bold text-[#1b1c1c]">Localisations des Fermes Actives</h3>
                                <button className="text-xs font-semibold text-[#003f87] hover:underline">
                                    Voir la carte détaillée
                                </button>
                            </div>

                            <div className="relative h-60 overflow-hidden rounded-xl bg-slate-200">
                                <img
                                    alt="Vue satellite des parcelles agricoles"
                                    className="h-full w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuALBK0bS3Ng_3nkskuXwuhQfOWZef4Aw5KJd-OKWnUnAHf9QH_HwEuPJ83HuXBUYK59U902Bv-NWkuVo2aLgijsPPJrbYqaJXzj9dMzMt1Yedj5hw_j3lIX7G3LVJVtg8WNcE-eV5lxW9n3IQEG5ksFm-1DobJrbRzarFeB4Vih7-BjkilGq_5xnsWDxxkFHA_4C4zOtnVrhg7E7b2LR5yrc3GIZ0z1wMkjn5vHKrsKbjsc84r_dP1nf2oUMb06uH3qeMWkMA8Sn2g"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-[#003f87]/10" />

                                {/* Legend overlay */}
                                <div className="absolute left-4 top-4 rounded-lg border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur-sm">
                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        <span className="h-2 w-2 rounded-full bg-[#003f87]" />
                                        Kipushi Main : 450 Ha
                                    </div>
                                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                                        <span className="h-2 w-2 rounded-full bg-red-600" />
                                        Likasi North : 120 Ha
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right stat cards */}
                        <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
                            {/* Surface area */}
                            <div className="flex flex-1 flex-col justify-between rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Surface Totale
                                        </p>
                                        <h4 className="text-4xl font-extrabold text-[#1b1c1c]">
                                            570.4{" "}
                                            <span className="text-lg font-normal text-slate-400">Ha</span>
                                        </h4>
                                    </div>
                                    <div className="rounded-full bg-blue-100 p-2.5">
                                        <Icon name="straighten" className="h-5 w-5 text-[#003f87]" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                                    <Icon name="trending_up" className="h-4 w-4" />
                                    +12% par rapport à la saison précédente
                                </div>
                            </div>

                            {/* Parcel count */}
                            <div className="flex flex-1 flex-col justify-between rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Nombre de Parcelles
                                        </p>
                                        <h4 className="text-4xl font-extrabold text-[#1b1c1c]">{totalParcels}</h4>
                                    </div>
                                    <div className="rounded-full bg-orange-100 p-2.5">
                                        <Icon name="category" className="h-5 w-5 text-orange-600" />
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                        18 Maïs
                                    </span>
                                    <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                        6 Soja
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory table */}
                    <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6">
                            <h3 className="text-base font-bold text-[#1b1c1c]">Inventaire Détaillé</h3>
                            <div className="flex gap-2">
                                <select
                                    value={farmFilter}
                                    onChange={(e) => setFarmFilter(e.target.value)}
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none focus:border-[#003f87]"
                                >
                                    <option value="all">Toutes les fermes</option>
                                    {farmGroups.map((g) => (
                                        <option key={g.id} value={g.id}>{g.farm}</option>
                                    ))}
                                </select>
                                <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50">
                                    <Icon name="filter_list" className="h-5 w-5 text-base" />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50">
                                        {["Ferme / ID Parcelle", "Type de Culture", "Superficie", "Date de Plantation", "Statut", ""].map(
                                            (h) => (
                                                <th key={h} className="px-6 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                                    {h}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredGroups.map((group) => (
                                        <React.Fragment key={group.farm}>
                                            {/* Farm group header row */}
                                            <tr className="bg-slate-100/70">
                                                <td
                                                    colSpan={6}
                                                    className="px-6 py-2 text-xs font-bold tracking-wider text-[#003f87]"
                                                >
                                                    {group.farm} &mdash; {group.province}
                                                </td>
                                            </tr>

                                            {group.parcels.map((p) => (
                                                <tr key={p.id} className="transition-colors hover:bg-slate-50/60">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                                                                <Icon name="tag" className="h-4 w-4" />
                                                            </div>
                                                            <span className="font-bold text-[#1b1c1c]">{p.id}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Icon name={p.cropIcon} className={`h-5 w-5 ${p.cropColor}`} />
                                                            <span className="text-slate-700">{p.crop}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600">{p.area}</td>
                                                    <td className="px-6 py-4 text-slate-600">{p.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${p.statusClass}`}>
                                                            {p.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:text-[#003f87]">
                                                            <Icon name="edit" className="h-5 w-5 text-base" />
                                                        </button>
                                                        <Link
                                                            to={`/owner/fermes/${group.id}`}
                                                            className="inline-block rounded-lg p-1.5 text-slate-400 transition-colors hover:text-[#003f87]"
                                                        >
                                                            <Icon name="analytics" className="h-5 w-5 text-base" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 p-4">
                            <p className="text-xs text-slate-500">
                                Affichage de {filteredGroups.reduce((s, g) => s + g.parcels.length, 0)} sur {totalParcels} parcelles
                            </p>
                            <div className="flex gap-1">
                                <button className="cursor-not-allowed rounded border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-400" disabled>
                                    Précédent
                                </button>
                                <button className="rounded border border-[#003f87] bg-[#003f87] px-3 py-1 text-xs font-bold text-white">
                                    1
                                </button>
                                {[2, 3].map((n) => (
                                    <button key={n} className="rounded border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                                        {n}
                                    </button>
                                ))}
                                <button className="rounded border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                                    Suivant
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Weather + CTA */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* Climate card */}
                        <div className="col-span-12 rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-sm md:col-span-4">
                            <div className="mb-5 flex items-center justify-between">
                                <h4 className="text-sm font-bold text-[#1b1c1c]">Météo — Lubumbashi</h4>
                                <Icon name="sunny" className="h-6 w-6 text-amber-500" />
                            </div>

                            <div className="mb-5 flex items-end gap-3">
                                <span className="text-4xl font-extrabold text-[#1b1c1c]">28°C</span>
                                <span className="mb-1 text-sm text-slate-500">Forte humidité</span>
                            </div>

                            <div className="space-y-4">
                                <ClimateBar label="Chances de pluie" value="15%" pct={15} color="bg-[#003f87]" />
                                <ClimateBar label="Humidité du sol" value="Optimale (72%)" pct={72} color="bg-emerald-500" />
                            </div>
                        </div>

                        {/* Logistics CTA */}
                        <div className="col-span-12 flex items-center justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#003f87] to-[#0056b3] p-8 text-white shadow-md md:col-span-8">
                            <div className="max-w-md">
                                <h4 className="text-xl font-bold">Logistique prête ?</h4>
                                <p className="mt-2 text-sm leading-relaxed opacity-90">
                                    4 parcelles à Likasi approchent de la fenêtre de récolte. Réservez le transport maintenant et économisez jusqu'à 15% sur les coûts logistiques.
                                </p>
                                <button className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#003f87] transition-colors hover:bg-blue-50">
                                    Réserver une flotte de transport
                                </button>
                            </div>
                            <Icon name="local_shipping" className="h-5 w-5 hidden text-[80px] opacity-20 sm:block" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function ClimateBar({ label, value, pct, color }) {
    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-slate-500">{label}</span>
                <span className="font-semibold text-[#1b1c1c]">{value}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}
