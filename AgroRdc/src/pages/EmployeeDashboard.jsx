import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmployeeTopNav from "../components/EmployeeTopNav.jsx";
import EmployeeBottomNav from "../components/EmployeeBottomNav.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getAssignedParcels } from "../api/assignments.js";

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
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input
                                className="w-full rounded-lg border border-[#DEE2E6] bg-white py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20"
                                placeholder="ID, Culture ou Ferme…"
                                type="text"
                            />
                        </div>
                    </div>
                </div>

                {/* Weather banner */}
                <div className="mb-10 flex flex-wrap items-center justify-between gap-6 rounded-xl bg-gradient-to-br from-[#003f87] to-[#0056b3] p-6 text-white shadow-sm">
                    <div className="flex items-center gap-6">
                        <span
                            className="material-symbols-outlined text-5xl"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            cloudy_snowing
                        </span>
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
                <span className="material-symbols-outlined text-2xl">add_task</span>
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
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span className="text-xs">{farm}</span>
                </div>

                {/* Metric row */}
                <div className="mb-4 flex items-center justify-between rounded-lg bg-[#f0eded] p-3">
                    <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined ${cropIconColor}`}>{cropIcon}</span>
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">Culture</span>
                            <span className="text-sm font-bold text-[#1b1c1c]">{crop}</span>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-[#c2c6d4]" />
                    <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined ${metric2Color}`}>{metric2Icon}</span>
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
                    <span className="material-symbols-outlined text-[16px]">query_stats</span>
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
