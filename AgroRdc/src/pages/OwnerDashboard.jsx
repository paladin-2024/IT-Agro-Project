import React from "react";
import { Link } from "react-router-dom";
import OwnerSidebar from "../components/OwnerSidebar";
import { useAuth } from "../contexts/AuthContext.jsx";

const parcels = [
    { id: "PRC-882-KW", region: "Kwilu",        crop: "Manioc",        yield: "842.5", status: "Récolte",    statusClass: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", last: "Il y a 2h" },
    { id: "PRC-441-KC", region: "Kongo Central", crop: "Maïs",          yield: "610.2", status: "Irrigation", statusClass: "bg-blue-100 text-blue-700",     dot: "bg-blue-500",   last: "Il y a 5h" },
    { id: "PRC-109-TK", region: "Tshuapa",       crop: "Huile de Palme",yield: "582.0", status: "Fertilisation",statusClass:"bg-amber-100 text-amber-700",   dot: "bg-amber-500",  last: "Hier" },
    { id: "PRC-323-LU", region: "Lualaba",        crop: "Manioc",        yield: "490.1", status: "Alerte",     statusClass: "bg-red-100 text-red-700",      dot: "bg-red-500",    last: "À l'instant" },
];

export default function OwnerDashboard() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#f4f6f9] text-[#1b1c1c]">
            <OwnerSidebar />

            <main className="ml-64 min-h-screen">
                {/* Sticky header */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
                    <div>
                        <h1 className="text-lg font-bold text-[#1b1c1c]">
                            Bonjour, {user?.name || user?.email || "Propriétaire"} 👋
                        </h1>
                        <p className="text-xs text-slate-500">Vue d'ensemble de votre exploitation agricole</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">search</span>
                            <input
                                className="w-56 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#003f87] focus:ring-1 focus:ring-[#003f87]"
                                placeholder="Parcelles, cultures…"
                                type="text"
                            />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
                            <span className="material-symbols-outlined text-sm text-[#003f87]">calendar_today</span>
                            Oct 2023 — Mar 2024
                        </div>
                    </div>
                </header>

                <div className="space-y-8 p-8">
                    {/* KPI row */}
                    <div className="grid grid-cols-12 gap-5">
                        {/* Hero KPI */}
                        <div className="col-span-12 flex flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#003f87] to-[#0056b3] p-6 text-white shadow-md lg:col-span-4">
                            <div className="flex items-start justify-between">
                                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Production Totale</p>
                                <div className="rounded-xl bg-white/20 p-2">
                                    <span className="material-symbols-outlined text-xl">show_chart</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-4xl font-extrabold">14 280 <span className="text-base font-normal opacity-80">tonnes</span></p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-300">
                                        <span className="material-symbols-outlined text-xs">arrow_upward</span>12.4%
                                    </span>
                                    <span className="text-xs opacity-70">vs saison précédente</span>
                                </div>
                            </div>
                        </div>

                        {/* Yield/ha card */}
                        <div className="col-span-12 flex flex-col justify-between rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-sm md:col-span-6 lg:col-span-4">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Rendement par Ha</p>
                                <div className="rounded-lg bg-blue-50 p-2 text-[#003f87]">
                                    <span className="material-symbols-outlined">grid_view</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-3xl font-extrabold text-[#1b1c1c]">4.2 <span className="text-sm font-medium text-slate-400">t/ha</span></p>
                                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full w-[84%] rounded-full bg-[#003f87]" />
                                </div>
                                <p className="mt-1.5 text-[11px] text-slate-500">84% de l'objectif d'efficacité atteint</p>
                            </div>
                        </div>

                        {/* Active parcels card */}
                        <div className="col-span-12 flex flex-col justify-between rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-sm md:col-span-6 lg:col-span-4">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Parcelles Actives</p>
                                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                                    <span className="material-symbols-outlined">location_on</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-3xl font-extrabold text-[#1b1c1c]">128 <span className="text-sm font-medium text-slate-400">total</span></p>
                                <div className="mt-3 grid grid-cols-2 gap-2">
                                    <div className="rounded-lg bg-emerald-50 py-2 text-center text-xs font-bold text-emerald-700">112 En bonne santé</div>
                                    <div className="rounded-lg bg-red-50 py-2 text-center text-xs font-bold text-red-600">16 À risque</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts row */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* Production trend */}
                        <section className="col-span-12 rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-sm lg:col-span-8">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-bold text-[#1b1c1c]">Tendances de Production</h3>
                                    <p className="mt-0.5 text-xs text-slate-500">Production réelle vs prévisions saisonnières</p>
                                </div>
                                <div className="flex gap-4">
                                    <LegendDot color="bg-[#003f87]" label="Réel" />
                                    <LegendDot color="bg-slate-300" label="Prévision" />
                                </div>
                            </div>
                            <div className="relative h-52 w-full">
                                <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 800 200">
                                    <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="800" y1="50"  y2="50" />
                                    <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="800" y1="100" y2="100" />
                                    <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="800" y1="150" y2="150" />
                                    <path d="M0,150 Q100,140 200,100 T400,110 T600,60 T800,80" fill="none" stroke="#cbd5e1" strokeDasharray="8,4" strokeWidth="2.5" />
                                    <path d="M0,160 Q100,150 200,120 T400,130 T600,40 T800,50" fill="none" stroke="#003f87" strokeLinejoin="round" strokeWidth="3" />
                                    <path d="M0,160 Q100,150 200,120 T400,130 T600,40 T800,50 V200 H0 Z" fill="#003f87" opacity="0.08" />
                                </svg>
                                <div className="mt-3 flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    <span>Oct</span><span>Nov</span><span>Déc</span><span>Jan</span><span>Fév</span><span>Mar</span>
                                </div>
                            </div>
                        </section>

                        {/* Donut chart */}
                        <section className="col-span-12 flex flex-col rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-sm lg:col-span-4">
                            <h3 className="text-sm font-bold text-[#1b1c1c]">Meilleures Cultures</h3>
                            <p className="mt-0.5 mb-5 text-xs text-slate-500">Contribution par type de culture</p>
                            <div className="relative flex flex-1 items-center justify-center">
                                <svg className="h-44 w-44" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#003f87" strokeDasharray="163 251" strokeDashoffset="0" strokeWidth="12" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#93c5fd" strokeDasharray="63 251" strokeDashoffset="-163" strokeWidth="12" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#cbd5e1" strokeDasharray="25 251" strokeDashoffset="-226" strokeWidth="12" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-extrabold">65%</span>
                                    <span className="text-[10px] font-bold uppercase text-slate-400">Manioc</span>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-2">
                                <LegendDot color="bg-[#003f87]" label="Manioc (65%)" />
                                <LegendDot color="bg-blue-300" label="Maïs (25%)" />
                                <LegendDot color="bg-slate-300" label="Huile de Palme (10%)" />
                            </div>
                        </section>
                    </div>

                    {/* Top parcels table */}
                    <section className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                            <div>
                                <h3 className="text-sm font-bold text-[#1b1c1c]">Meilleures Parcelles</h3>
                                <p className="mt-0.5 text-xs text-slate-500">Classées par efficacité et score de qualité</p>
                            </div>
                            <Link to="/owner/parcelles" className="text-xs font-semibold text-[#003f87] hover:underline">
                                Voir toutes →
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50">
                                        {["Identifiant", "Région", "Culture", "Rendement (t)", "Statut", "Dernière activité"].map((h) => (
                                            <th key={h} className="px-6 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {parcels.map((p) => (
                                        <tr key={p.id} className="transition-colors hover:bg-slate-50/60">
                                            <td className="px-6 py-4">
                                                <span className="rounded-md bg-blue-50 px-2 py-1 font-mono text-xs font-bold text-[#003f87]">{p.id}</span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{p.region}</td>
                                            <td className="px-6 py-4 font-medium text-[#1b1c1c]">{p.crop}</td>
                                            <td className="px-6 py-4 font-bold text-[#1b1c1c]">{p.yield}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${p.statusClass}`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} />
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-500">{p.last}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Info cards */}
                    <div className="grid grid-cols-3 gap-5">
                        <InfoCard icon="cloud_sync"   title="Synchronisation Satellite"  sub="Dernière MAJ : 14:20 CAT"  iconBg="bg-blue-50 text-[#003f87]" />
                        <InfoCard icon="inventory_2"  title="Stock d'Engrais"            sub="Niveaux optimaux (88%)"    iconBg="bg-emerald-50 text-emerald-600" />
                        <InfoCard icon="warning"      title="Alertes en Attente"         sub="3 problèmes prioritaires"  iconBg="bg-amber-50 text-amber-600" />
                    </div>
                </div>
            </main>
        </div>
    );
}

function LegendDot({ color, label }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`h-2 w-2 shrink-0 rounded-full ${color}`} />
            <span className="text-xs font-medium text-slate-600">{label}</span>
        </div>
    );
}

function InfoCard({ icon, title, sub, iconBg }) {
    return (
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                <span className="material-symbols-outlined text-xl">{icon}</span>
            </div>
            <div>
                <h4 className="text-sm font-semibold text-[#1b1c1c]">{title}</h4>
                <p className="text-xs text-slate-500">{sub}</p>
            </div>
        </div>
    );
}
