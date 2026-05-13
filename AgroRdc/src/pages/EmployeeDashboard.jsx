import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import EmployeeTopNav from "../components/EmployeeTopNav.jsx";
import EmployeeBottomNav from "../components/EmployeeBottomNav.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getAssignedParcels } from "../api/assignments.js";
import Icon from '../components/Icon.jsx'

function loadMyHarvests(userId) {
    try {
        const all = JSON.parse(localStorage.getItem('agrordc_harvests') || '[]')
        return userId ? all.filter(h => h.employeeId === userId) : all
    } catch { return [] }
}

const UNIT_TO_KG = { 'Tonne': 1000, 'Sac 50 kg': 50, 'Kg (Vrac)': 1, 'Caisse': 25 }
function toKg(qty, unit) { return parseFloat(qty || 0) * (UNIT_TO_KG[unit] || 1) }

/* ─── Static data ────────────────────────────────────────────────────── */

const parcels = [
    {
        id: "B-04",
        name: "Parcelle B-04",
        farm: "Ferme de Kasangulu, Kongo-Central",
        area: "12.4 ha",
        crop: "Manioc",
        cropIcon: "potted_plant",
        cropIconColor: "text-[#722b00]",
        metric2Label: "Irrigation",
        metric2Value: "80%",
        metric2Icon: "water_drop",
        metric2Color: "text-[#b6171e]",
        status: "En cours",
        statusBg: "bg-[#003f87]",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALtBuEn95R_AyG7rO59b-Qw9_St7Q4hb1DutFlYzl7IqhfSfyQfcjdotQMhfzvPrbmLVFTaIbf2VViiYYTzeziLj_r_UjjTSPACEhcp0NClpsL6GNdY6ldnjupiYvDb3X-m6K99fJxZtzQiVP2_4nLwGwu6TwoLsFi-MTiFPZzmNOr5Tf1fJl6An9D36bOaAd1yMFql60S8raq68oF1sfckytP5WqwSpLFzKGpOpDhAjoqbYez9Fq6X8RVSt5nelaLTNCGqM_wp4E",
    },
    {
        id: "A-12",
        name: "Parcelle A-12",
        farm: "Ferme de Kimpese, Kongo-Central",
        area: "8.2 ha",
        crop: "Maïs",
        cropIcon: "agriculture",
        cropIconColor: "text-[#722b00]",
        metric2Label: "Rendement est.",
        metric2Value: "4.5 t/ha",
        metric2Icon: "trending_up",
        metric2Color: "text-[#b6171e]",
        status: "Prêt pour récolte",
        statusBg: "bg-emerald-700",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlgQBuOHANQ-ZZRTlU75focmU57b_D5gFoj-UrRrhE_e6sHQyTXdMhNBs7V6N7jm-d5-TqEx4tbuQM7jrwEm3EZ5Z8qWBo-eqBO8TnTGjTFXknDisPFUfBBDep9cVBiZRultCnYSIZPS_GDhGBGZH82fIHb0Wthk0QGt_eWe49XgOPwW5moeCez7zhKsfjGEm-uFH8T4O89a4KJGRJfmbTCbamrJdqxDIvtoR8XWK1Oqvj_nkmAau5zNToOH5uiZEHGRAKflAkszk",
    },
    {
        id: "C-09",
        name: "Parcelle C-09",
        farm: "Ferme Mbanza-Ngungu",
        area: "15.0 ha",
        crop: "Soja",
        cropIcon: "compost",
        cropIconColor: "text-[#722b00]",
        metric2Label: "Alerte",
        metric2Value: "Sécheresse",
        metric2Icon: "warning",
        metric2Color: "text-[#b6171e]",
        status: "Alerte Stress",
        statusBg: "bg-[#ba1a1a]",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAym1rIf-JNCP5V-5wh7mMh4U-E7LL49AeK6u5jVPDgx5J4IiivXWiOrKYNre9QeGCiDw5mcBmxJcInqcg0KXD2gPaH7LphvycBy6wYKO2tHnf4Bf7ho8n_i5XJYhZHyA_tiJpjhPK3NXlgvZvbZW-yExUc9mxAFNdhyXlqEbRtTGdJTYis51PsYOkE-yjFAoiFQ88MOE_XHXbAa47ISaNQLkoHpX0zSejArUWe7X-oh5Qh246CMcn4uSnFGnw9jMts_8WJMjxuGN0",
    },
];


/* ─── Page component ─────────────────────────────────────────────────── */

export default function EmployeeDashboard() {
    const [activeTab, setActiveTab] = useState("assignments");
    const [displayParcels, setDisplayParcels] = useState(parcels);
    const { user } = useAuth();

    const myHarvests = useMemo(() => loadMyHarvests(user?.id), [user?.id])
    const totalKg = myHarvests.reduce((s, h) => s + toKg(h.quantity, h.unit), 0)
    const totalTonnes = Math.round(totalKg / 100) / 10
    const uniqueCrops = [...new Set(displayParcels.map(p => p.crop).filter(Boolean))]

    useEffect(() => {
        if (!user?.id) return;
        getAssignedParcels(user.id).then((assigned) => {
            if (assigned.length > 0) {
                // Merge API parcel data with local display data for images/icons
                const merged = assigned.map((ap) => {
                    const local = parcels.find((p) => p.id === ap.id);
                    return local ? { ...local, ...ap, id: ap.id } : ap;
                });
                setDisplayParcels(merged);
            }
        }).catch(() => {
            // If assignment lookup fails, keep showing all parcels
        });
    }, [user?.id]);

    return (
        <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c]">
            <EmployeeTopNav title="Mes Parcelles Assignées">
                <div className="hidden items-center gap-1 md:flex">
                    <button
                        onClick={() => setActiveTab("assignments")}
                        className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                            activeTab === "assignments"
                                ? "bg-blue-50 text-[#003f87]"
                                : "text-slate-500 hover:text-[#003f87]"
                        }`}
                    >
                        Mes Missions
                    </button>
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                            activeTab === "history"
                                ? "bg-blue-50 text-[#003f87]"
                                : "text-slate-500 hover:text-[#003f87]"
                        }`}
                    >
                        Historique
                    </button>
                </div>
            </EmployeeTopNav>

            {/* Main content — extra bottom padding for mobile bottom nav */}
            <main className="mx-auto max-w-7xl px-6 pb-32 pt-10 md:pb-16">
                {/* Page header + search */}
                <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-[#003f87]">
                            Mes Parcelles Assignées
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Gérez et suivez l'avancement des cultures sur vos zones d'affectation.
                        </p>
                    </div>
                    <div className="w-full md:w-96">
                        <label className="mb-1 block text-xs font-semibold text-[#1b1c1c]">
                            Rechercher une parcelle
                        </label>
                        <div className="relative">
                            <Icon name="search" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                className="w-full rounded-lg border border-[#DEE2E6] bg-white py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20"
                                placeholder="ID, Culture ou Ferme…"
                                type="text"
                            />
                        </div>
                    </div>
                </div>

                {/* KPI strip — 3 summary cards */}
                <div className="mb-8 grid grid-cols-3 gap-4">
                    <DashKpi
                        icon="assignment"
                        label="Parcelles assignées"
                        value={displayParcels.length}
                        color="bg-[#003f87]"
                    />
                    <DashKpi
                        icon="eco"
                        label="Cultures en cours"
                        value={uniqueCrops.length}
                        color="bg-emerald-600"
                    />
                    <DashKpi
                        icon="inventory_2"
                        label="Total récolté"
                        value={totalTonnes > 0 ? `${totalTonnes} t` : '0 t'}
                        color="bg-amber-500"
                    />
                </div>

                {/* Cultures overview strip */}
                {uniqueCrops.length > 0 && (
                    <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                            <div className="flex items-center gap-2">
                                <Icon name="eco" className="h-5 w-5 text-emerald-600" />
                                <h3 className="text-sm font-bold text-[#1b1c1c]">Cultures sur mes parcelles</h3>
                            </div>
                            <Link
                                to="/employee/cultures"
                                className="flex items-center gap-1 text-xs font-semibold text-[#003f87] hover:underline"
                            >
                                Voir tout
                                <Icon name="chevron_right" className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                        <div className="flex divide-x divide-slate-100">
                            {uniqueCrops.map(crop => {
                                const count = displayParcels.filter(p => p.crop === crop).length
                                return (
                                    <Link
                                        key={crop}
                                        to={`/employee/cultures/${encodeURIComponent(crop)}`}
                                        className="flex flex-1 flex-col items-center gap-1 px-4 py-3 text-center transition-colors hover:bg-slate-50"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                                            <Icon name="eco" className="h-4 w-4 text-emerald-700" />
                                        </div>
                                        <span className="text-xs font-bold text-[#1b1c1c]">{crop}</span>
                                        <span className="text-[10px] text-slate-400">{count} parcelle{count > 1 ? 's' : ''}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Weather banner */}
                <div className="mb-10 flex flex-wrap items-center justify-between gap-6 rounded-xl bg-gradient-to-br from-[#003f87] to-[#0056b3] p-6 text-white shadow-sm">
                    <div className="flex items-center gap-6">
                        <Icon name="cloudy_snowing" className="h-12 w-12" />
                        <div>
                            <span className="block text-3xl font-extrabold">28°C</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-90">
                                Kongo-Central · Nuageux
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-10">
                        <WeatherStat label="Humidité"       value="82%" />
                        <WeatherStat label="Vent"           value="14 km/h" />
                        <WeatherStat label="Précipitations" value="12%" />
                    </div>
                </div>

                {/* Parcel cards grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {displayParcels.map((p) => (
                        <ParcelCard key={p.id} parcel={p} />
                    ))}
                </div>
            </main>

            {/* FAB */}
            <Link
                to="/employee/saisir-recolte"
                className="fixed bottom-20 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#b6171e] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 md:bottom-12 md:right-12"
            >
                <Icon name="add_task" className="h-6 w-6" />
            </Link>

            <EmployeeBottomNav />
        </div>
    );
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function ParcelCard({ parcel }) {
    const {
        id, name, farm, area, crop, cropIcon, cropIconColor,
        metric2Label, metric2Value, metric2Icon, metric2Color,
        status, statusBg, image,
    } = parcel;

    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border border-[#DEE2E6] bg-white transition-shadow duration-300 hover:shadow-lg">
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={image}
                />
                <div className="absolute top-3 right-3">
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold text-white ${statusBg}`}>
                        {status}
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-grow flex-col p-5">
                {/* Title row */}
                <div className="mb-1 flex items-start justify-between">
                    <h3 className="text-lg font-bold text-[#003f87]">{name}</h3>
                    <span className="text-sm font-semibold text-slate-500">{area}</span>
                </div>

                {/* Location */}
                <div className="mb-4 flex items-center gap-1 text-slate-500">
                    <Icon name="location_on" className="h-4 w-4" />
                    <span className="text-xs">{farm}</span>
                </div>

                {/* Metric row */}
                <div className="mb-4 flex items-center justify-between rounded-lg bg-[#f0eded] p-3">
                    <div className="flex items-center gap-2">
                        <Icon name={cropIcon} className={`h-5 w-5 ${cropIconColor}`} />
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">Culture</span>
                            <span className="text-sm font-bold text-[#1b1c1c]">{crop}</span>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-[#c2c6d4]" />
                    <div className="flex items-center gap-2">
                        <Icon name={metric2Icon} className={`h-5 w-5 ${metric2Color}`} />
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                {metric2Label}
                            </span>
                            <span className="text-sm font-bold text-[#1b1c1c]">{metric2Value}</span>
                        </div>
                    </div>
                </div>

                {/* CTA buttons */}
                <Link
                    to={`/employee/parcelles/${id}`}
                    className="mt-auto w-full rounded-lg bg-[#003f87] py-3 text-sm font-bold text-white transition-all hover:bg-[#0056b3] active:scale-[0.98] block text-center"
                >
                    Voir Détails / Saisir Récolte
                </Link>
                <Link
                    to={`/employee/parcelles/${id}/previsions`}
                    className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-[#003f87] py-2.5 text-sm font-bold text-[#003f87] transition-colors hover:bg-blue-50"
                >
                    <Icon name="query_stats" className="h-4 w-4" />
                    Prévisions de Rendement
                </Link>
            </div>
        </div>
    );
}

function WeatherStat({ label, value }) {
    return (
        <div className="text-center">
            <span className="block text-[10px] font-bold uppercase tracking-wider opacity-80">{label}</span>
            <span className="text-lg font-bold">{value}</span>
        </div>
    );
}

function DashKpi({ icon, label, value, color }) {
    return (
        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
                <Icon name={icon} className="h-5 w-5 text-white" />
            </div>
            <p className="text-xl font-extrabold text-[#1b1c1c]">{value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 leading-tight">{label}</p>
        </div>
    );
}
