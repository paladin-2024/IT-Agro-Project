import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

/* ─── Static data ────────────────────────────────────────────────────── */

const harvests = [
    { id: "PRD-2023-084", date: "14 Nov 2023", variety: "Maïs Jaune Z-10",   qty: "4.2 Tonnes" },
    { id: "PRD-2023-047", date: "22 Jul 2023", variety: "Sorgho Rugale",      qty: "2.8 Tonnes" },
    { id: "PRD-2023-012", date: "05 Mar 2023", variety: "Soja Prima",         qty: "3.5 Tonnes" },
    { id: "PRD-2022-098", date: "12 Oct 2022", variety: "Maïs Jaune Z-10",   qty: "3.9 Tonnes" },
];

const workers = [
    {
        name: "Jean-Pierre Mukeba",
        role: "Agronome Principal",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7jCBXr0XXH161QKvkLKYaQl6xxKl2muBnTB25VRKmFxrVqyWmOsuQlXde87E2IltJluvtZbwqrMc5ztEG4leZ15dsRR1az3LoU-9cSnCUpIPfgOvYoMciW9lFpso8_MV7KmZ-llH-z5FkozJgiQvoUGG3H-o5fUN0fFzH7g2rQCQGlqDIbSlUNpur7cM_v0Fm2rzEtATaC_80qyFJ6cZanpcrMFNQ09--Kr0pjwIn4LJnP3nlsoIjDIgX-L5Iat5eU6a5f19PUTg",
    },
    {
        name: "Sarah Kalala",
        role: "Spécialiste Irrigation",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqkVVIMWAxX8splT4CNIP974fyVxRMxNtQoR7vcRXR2OwAJPscjobu7tdiv7yPol8Jhy3vBQUtg8au6uDCUQK9_13AS53F0dgWiIWl8kIsWroFGlieGMzTb9FsocPw38hHe8dg4cFigC7aSznKjWfZpBb8rHwva_FCjOGXu_AlluOsX3bEuV8Wv3zLXQoJ5wcmRl2o7clxqlHq_sCztNAANDHJqy-hYh2p74BhrwZ8IrBcmlI8l4rhHKzQUlGt0BasPlPHI17XBeI",
    },
];

const TABS = ["Historique Production", "Personnel Assigné", "Prévisions"];

/* ─── Page component ─────────────────────────────────────────────────── */

export default function EmployeeParcelDetailPage() {
    const [activeTab, setActiveTab] = useState(0);
    const { id: parcelId = "B-04" } = useParams();

    return (
        <div className="min-h-screen bg-[#f9f9ff] text-[#171c25]">
            {/* Sticky header */}
            <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-8 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <Link
                        to="/employee/dashboard"
                        className="flex items-center justify-center rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#003f87]"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <span className="text-base font-bold text-[#171c25]">Parcelle {parcelId}</span>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-[#003f87]">
                        Zone Sud
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">search</span>
                        <input
                            className="w-60 rounded-lg border-none bg-slate-100/70 py-1.5 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30"
                            placeholder="Rechercher des opérations…"
                            type="text"
                        />
                    </div>
                    <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
                        <span className="material-symbols-outlined">help</span>
                    </button>
                    <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm">
                        <img
                            alt="Profil"
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfWKCV2OODf8gcfyhd9MUBlQePc91Wn3r6t-AT6MU62gFeK_iN8ACo7G4kVPwzcuQIiBfoQoHzxOBPfwjX3DnIOAi6D_sMjDELF2tXBICXstSHD-TolE9qxm3Y-bwE5lkdeHjIDrOyb9S2skResxFa8YgX6epJcdJQoqLNpMrzWEYyTrpJQAFRiFlcs8MgKcr-9Vpiz9235EcuwZcN2Rpno__Aqo-XcdQbMrH2cYTYlUyFhibAhwINEgW0n9_PzXKJ6L1Dji60Ga0"
                        />
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl space-y-6 p-8">
                {/* Hero section */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Parcel hero card */}
                    <div className="relative col-span-12 flex items-center justify-between overflow-hidden rounded-xl bg-[#003f87] p-6 text-white shadow-lg lg:col-span-8">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold">Parcelle B-04 (Haute Plaine)</h2>
                            <p className="mt-1 flex items-center gap-1 text-sm opacity-90">
                                <span className="material-symbols-outlined text-sm">location_on</span>
                                District du Katanga, Secteur 4-B
                            </p>
                            <div className="mt-6 grid grid-cols-3 gap-8">
                                <HeroStat label="Superficie"     value="12.4 Ha" />
                                <HeroStat label="Culture"        value="Maïs Hybride" />
                                <HeroStat label="Santé du Sol"   value="84% Optimal" />
                            </div>
                        </div>
                        {/* Background image overlay */}
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-20">
                            <img
                                alt=""
                                className="h-full w-full object-cover grayscale brightness-200"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD5micgyVgfhYyZEHAr0fHXFYi0qTic55CoZzNGCovhB9YjDMtWdqxytugeKL4dVgLiQeZdztFUUKoIVYFRKg_n_FG3vgPkD_D0ed9QGyzyChS-ZMwdlSjQaWZggPRa70j5Y4KlUHcJUYrEodC8afsijc9R1xiv0EmVlKHCCpTFTLaO19Y8SKv_9oixqbJDhM59hbT_WsC12G1uuX6E3FXHAVu0i4HVfqXCo0TNy4ntRFjwIBi2b0XAiHzZNL0ZMSvbAtwAIw6twI"
                            />
                        </div>
                    </div>

                    {/* Alert card */}
                    <div className="col-span-12 flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-4">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-[#b6171e]">
                                <span className="material-symbols-outlined">warning</span>
                                <span className="text-xs font-bold uppercase tracking-wider">Action Requise</span>
                            </div>
                            <h3 className="text-base font-bold text-[#171c25]">Maintenance Irrigation</h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Le système de goutte-à-goutte du Secteur 2 présente des chutes de pression. Une inspection immédiate est prévue demain.
                            </p>
                        </div>
                        <button className="mt-6 w-full rounded-lg bg-[#003f87] py-3 text-sm font-bold text-white transition-all hover:bg-[#0056b3] active:scale-[0.98]">
                            Voir le Journal de Maintenance
                        </button>
                    </div>
                </div>

                {/* Tab navigation */}
                <div className="flex gap-8 border-b border-slate-200">
                    {TABS.map((tab, i) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(i)}
                            className={`pb-2 text-sm font-semibold transition-colors ${
                                activeTab === i
                                    ? "border-b-2 border-[#003f87] text-[#003f87]"
                                    : "border-b-2 border-transparent text-slate-400 hover:text-[#171c25]"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-12 items-start gap-6">
                    {/* Left column */}
                    <div className="col-span-12 space-y-6 lg:col-span-8">
                        {/* Historical harvests table */}
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                                <h3 className="text-base font-bold text-[#171c25]">Historique des Récoltes</h3>
                                <button className="flex items-center gap-1 text-xs font-semibold text-[#003f87] hover:underline">
                                    <span className="material-symbols-outlined text-sm">download</span>
                                    Exporter CSV
                                </button>
                            </div>
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50">
                                        {["Date de Récolte", "Variété", "Quantité", "Statut", ""].map((h) => (
                                            <th key={h} className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {harvests.map((row, i) => (
                                        <tr key={row.id} className={`cursor-pointer transition-colors hover:bg-blue-50/40 ${i % 2 === 1 ? "bg-slate-50/30" : ""}`}>
                                            <td className="px-6 py-4 font-semibold text-[#171c25]">{row.date}</td>
                                            <td className="px-6 py-4 text-slate-500">{row.variety}</td>
                                            <td className="px-6 py-4 font-semibold text-[#171c25]">{row.qty}</td>
                                            <td className="px-6 py-4">
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-800">
                                                    Terminé
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    to={`/employee/productions/${row.id}`}
                                                    className="flex items-center gap-1 text-xs font-bold text-[#003f87] hover:underline"
                                                >
                                                    Détails
                                                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Assigned workforce */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <h3 className="text-base font-bold text-[#171c25]">Personnel Assigné</h3>
                                <Link
                                    to={`/employee/parcelles/${parcelId}/equipe`}
                                    className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                                >
                                    <span className="material-symbols-outlined text-sm">group</span>
                                    Voir l'équipe complète
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {workers.map((w) => (
                                    <WorkerCard key={w.name} worker={w} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right sidebar */}
                    <div className="col-span-12 space-y-6 lg:col-span-4">
                        {/* Seasonal forecast */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#003f87]">query_stats</span>
                                    <h3 className="text-base font-bold text-[#171c25]">Prévisions Saisonnières</h3>
                                </div>
                                <Link
                                    to="{`/employee/parcelles/${parcelId}/previsions`}"
                                    className="flex items-center gap-1 text-xs font-bold text-[#003f87] hover:underline"
                                >
                                    Voir tout
                                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                </Link>
                            </div>

                            <div className="space-y-5">
                                {/* Target yield block */}
                                <div className="rounded-lg bg-slate-50 p-4">
                                    <div className="mb-1 flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Rendement Cible
                                        </span>
                                        <span className="text-[10px] font-bold text-[#003f87]">Est. Avril 2024</span>
                                    </div>
                                    <p className="text-2xl font-extrabold text-[#003f87]">
                                        4.8 <span className="text-sm font-medium text-slate-500">T/Ha</span>
                                    </p>
                                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                                        <div className="h-full w-[65%] rounded-full bg-[#003f87]" />
                                    </div>
                                    <p className="mt-1 text-[11px] text-slate-400">65% du cycle complété</p>
                                </div>

                                {/* Insights */}
                                <ul className="space-y-4">
                                    <InsightItem
                                        icon="trending_up"
                                        iconColor="text-emerald-600"
                                        title="Correspondance Climatique"
                                        body="Les niveaux d'humidité actuels sont alignés à 95% avec les besoins du Maïs Hybride."
                                    />
                                    <InsightItem
                                        icon="info"
                                        iconColor="text-amber-500"
                                        title="Fenêtre de Fertilisation"
                                        body="La fenêtre d'application secondaire optimale s'ouvre dans 4 jours."
                                    />
                                </ul>
                                <Link
                                    to="{`/employee/parcelles/${parcelId}/previsions`}"
                                    className="mt-5 block w-full rounded-lg border border-[#003f87] py-2.5 text-center text-sm font-bold text-[#003f87] transition-colors hover:bg-blue-50"
                                >
                                    Voir les prévisions complètes
                                </Link>
                            </div>
                        </div>

                        {/* Parcel map snippet */}
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="relative h-48 w-full bg-slate-200">
                                <img
                                    alt="Carte de la parcelle"
                                    className="h-full w-full object-cover grayscale brightness-90 contrast-125"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCQwQ4Z1LcAfea6l8j69c6XjGJIa4cdt5siRde2Eqqug2m5GWww4NbWBOiTrdujKoHb83kXkPlznLpB1DhHPEJo2_8rNiBBl5IWR_-gV-8deN05tKmbQilRxQXBY5Q8P6T91DBMpTfLt5Ljebs1deaYRx8ey7qBa8r9E2dw7yFrfhuUmuLs5kqMT8J7pV56fsj6cMd4YnNsTDOqgYcSxB42TALsd7hMwhBgursW6Owx_5K9u--x1Snljg4QDgI18_fnqcKBUjdiEA"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-[#003f87]/10">
                                    <div className="h-12 w-12 animate-pulse rounded-full border-4 border-white bg-[#003f87]/80" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Géo-Réf : 11.6°S, 27.4°E
                                </span>
                                <button className="text-xs font-bold text-[#003f87] hover:underline">
                                    Agrandir la carte
                                </button>
                            </div>
                        </div>

                        {/* Budget alert */}
                        <div className="rounded-xl border border-red-200 bg-red-50/40 p-5">
                            <p className="mb-1 text-sm font-bold text-[#b6171e]">Alerte Budget</p>
                            <p className="mb-4 text-xs text-slate-500">
                                Les coûts opérationnels de B-04 ont atteint 92% de l'allocation saisonnière.
                            </p>
                            <button className="flex items-center gap-1 text-sm font-bold text-[#b6171e] hover:underline">
                                Revoir les Dépenses
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile bottom nav */}
            <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-[#DEE2E6] bg-white/95 px-4 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] backdrop-blur-sm md:hidden">
                {[
                    { icon: "assignment", label: "Missions", active: false },
                    { icon: "map",        label: "Carte",    active: true },
                    { icon: "history",    label: "Journaux", active: false },
                    { icon: "person",     label: "Profil",   active: false },
                ].map((item) => (
                    <button
                        key={item.label}
                        className={`flex flex-col items-center justify-center rounded-lg px-3 py-1 transition-all ${
                            item.active ? "bg-blue-50 text-[#003f87]" : "text-slate-500"
                        }`}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={item.active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                        >
                            {item.icon}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function HeroStat({ label, value }) {
    return (
        <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">{label}</p>
            <p className="mt-0.5 text-lg font-bold">{value}</p>
        </div>
    );
}

function WorkerCard({ worker }) {
    return (
        <div className="flex items-center gap-4 rounded-lg border border-slate-200 p-3 transition-shadow hover:shadow-sm">
            <img
                alt={worker.name}
                className="h-12 w-12 rounded-full object-cover"
                src={worker.avatar}
            />
            <div className="min-w-0">
                <p className="text-sm font-bold text-[#171c25]">{worker.name}</p>
                <p className="text-xs text-slate-500">{worker.role}</p>
            </div>
            <span className="material-symbols-outlined ml-auto text-slate-400">verified</span>
        </div>
    );
}

function InsightItem({ icon, iconColor, title, body }) {
    return (
        <li className="flex items-start gap-3">
            <span className={`material-symbols-outlined mt-0.5 shrink-0 text-base ${iconColor}`}>{icon}</span>
            <div>
                <p className="text-sm font-semibold text-[#171c25]">{title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{body}</p>
            </div>
        </li>
    );
}
