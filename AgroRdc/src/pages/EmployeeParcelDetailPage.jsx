import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getHarvestsByParcel } from "../api/harvests.js";
import EmployeeSidebar from "../components/EmployeeSidebar.jsx";
import Icon from '../components/Icon.jsx'

/* ─── Static data ────────────────────────────────────────────────────── */

function fmtDate(d) {
    if (!d) return '�'
    return new Date(d + 'T00:00:00').toLocaleDateString('fr-CD', {
        day: 'numeric', month: 'short', year: 'numeric',
    })
}

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
    const [harvests, setHarvests]             = useState([])
    const [loadingHarvests, setLoadingHarvests] = useState(true)
    const { id: parcelId = "B-04" } = useParams();

    useEffect(() => {
        getHarvestsByParcel(parcelId)
            .then((data) => { setHarvests(data); setLoadingHarvests(false) })
            .catch(() => setLoadingHarvests(false))
    }, [parcelId])

    return (
        <div className="min-h-screen bg-[#f9f9ff] text-[#171c25]">
            <EmployeeSidebar />

            <main className="ml-64 space-y-6 p-8">
                {/* Hero section */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Parcel hero card */}
                    <div className="relative col-span-12 flex items-center justify-between overflow-hidden rounded-xl bg-[#003f87] p-6 text-white shadow-lg lg:col-span-8">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold">Parcelle B-04 (Haute Plaine)</h2>
                            <p className="mt-1 flex items-center gap-1 text-sm opacity-90">
                                <Icon name="location_on" className="h-4 w-4" />
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
                                <Icon name="warning" className="h-5 w-5" />
                                <span className="text-xs font-bold uppercase tracking-wider">Action Requise</span>
                            </div>
                            <h3 className="text-base font-bold text-[#171c25]">Maintenance Irrigation</h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Le système de goutte-� -goutte du Secteur 2 présente des chutes de pression. Une inspection immédiate est prévue demain.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-col gap-2">
                            <Link
                                to={`/employee/parcelles/${parcelId}/rapport-quotidien`}
                                className="block w-full rounded-lg bg-[#003f87] py-3 text-center text-sm font-bold text-white transition-all hover:bg-[#0056b3] active:scale-[0.98]"
                            >
                                Saisir le Rapport Quotidien
                            </Link>
                            <button className="w-full rounded-lg border border-[#003f87] py-3 text-sm font-bold text-[#003f87] transition-colors hover:bg-blue-50">
                                Voir le Journal de Maintenance
                            </button>
                        </div>
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
                                <div className="flex items-center gap-3">
                                    <Link
                                        to={`/employee/parcelles/${parcelId}/saisir-recolte`}
                                        className="flex items-center gap-1 rounded-lg bg-[#003f87] px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-[#0056b3]"
                                    >
                                        <Icon name="add" className="h-4 w-4" />
                                        Saisir une récolte
                                    </Link>
                                    <button className="flex items-center gap-1 text-xs font-semibold text-[#003f87] hover:underline">
                                        <Icon name="download" className="h-4 w-4" />
                                        Exporter CSV
                                    </button>
                                </div>
                            </div>
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50">
                                        {["Date de R�colte", "Quantit�", "Notes", "Statut", ""].map((h) => (
                                            <th key={h} className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loadingHarvests ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-10 text-center">
                                                <Icon name="progress_activity" className="h-6 w-6 animate-spin text-slate-300" />
                                            </td>
                                        </tr>
                                    ) : harvests.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-400">
                                                Aucune production enregistr�e.
                                                <Link
                                                    to={`/employee/parcelles/${parcelId}/saisir-recolte`}
                                                    className="ml-1 font-semibold text-[#003f87] hover:underline"
                                                >
                                                    Saisir la premi�re r�colte.
                                                </Link>
                                            </td>
                                        </tr>
                                    ) : harvests.map((row, i) => (
                                        <tr key={row.id} className={`cursor-pointer transition-colors hover:bg-blue-50/40 ${i % 2 === 1 ? "bg-slate-50/30" : ""}`}>
                                            <td className="px-6 py-4 font-semibold text-[#171c25]">
                                                {fmtDate(row.date)}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-[#171c25]">
                                                {row.quantity} {row.unit}
                                            </td>
                                            <td className="max-w-[180px] truncate px-6 py-4 text-slate-500">
                                                {row.observations || '�'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-800">
                                                    Soumis
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    to={`/employee/productions/${row.id}`}
                                                    state={{ parcelId }}
                                                    className="flex items-center gap-1 text-xs font-bold text-[#003f87] hover:underline"
                                                >
                                                    D�tails
                                                    <Icon name="arrow_forward" className="h-3.5 w-3.5" />
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
                                    <Icon name="group" className="h-4 w-4" />
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
                                    <Icon name="query_stats" className="h-5 w-5 text-[#003f87]" />
                                    <h3 className="text-base font-bold text-[#171c25]">Prévisions Saisonnières</h3>
                                </div>
                                <Link
                                    to={`/employee/parcelles/${parcelId}/previsions`}
                                    className="flex items-center gap-1 text-xs font-bold text-[#003f87] hover:underline"
                                >
                                    Voir tout
                                    <Icon name="arrow_forward" className="h-3.5 w-3.5" />
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
                                        body="Les niveaux d'humidité actuels sont alignés �  95% avec les besoins du Maïs Hybride."
                                    />
                                    <InsightItem
                                        icon="info"
                                        iconColor="text-amber-500"
                                        title="Fenêtre de Fertilisation"
                                        body="La fenêtre d'application secondaire optimale s'ouvre dans 4 jours."
                                    />
                                </ul>
                                <Link
                                    to={`/employee/parcelles/${parcelId}/previsions`}
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
                                <Icon name="arrow_forward" className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

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
            <Icon name="verified" className="h-5 w-5 ml-auto text-slate-400" />
        </div>
    );
}

function InsightItem({ icon, iconColor, title, body }) {
    return (
        <li className="flex items-start gap-3">
            <Icon name={icon} className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`} />
            <div>
                <p className="text-sm font-semibold text-[#171c25]">{title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{body}</p>
            </div>
        </li>
    );
}

