import React from "react";
import { useParams } from "react-router-dom";
import OwnerSidebar from "../components/OwnerSidebar.jsx";

export default function OwnerDetailParcell() {
    const { id: parcelId = 'B-04' } = useParams();
    const historyRows = [
        ["2022-2023 Q3", "Maïs Jaune", "45.2", "Terminé", "bg-blue-100 text-blue-800"],
        ["2021-2022 Q4", "Soja", "28.8", "Terminé", "bg-blue-100 text-blue-800"],
        ["2020-2021 Q4", "Manioc", "31.5", "Partiel", "bg-[#ffdad6] text-[#ba1a1a]"],
    ];

    const staff = [
        {
            name: "Jean-Pierre Mukendi",
            role: "Chef d'équipe",
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnwY1oVUdVt0ZBLmet9TjM0ExPsw3a4OOWVczAqzyoqPg9I-2MqwcxuEvzJrGpPj4xfSxWMclTQMTrXzO9e1bndXj6FJZhL8Bg80T3HRQ6yNP8FTYlo6GX2eFR1vamoR0LOX2zS1haMkPJi0pLriKLTS9_hWtr9FHX5s5BlrvN6yAkgL8FwJwUlgVkCsfQ5-qZ8hxBJoAQMvJQ15K9c4BgALel1Kcyijj-WD-Aq9UYUqkdZNMyvN79ibgsojy3jvdMqLxpFaYOIqY",
        },
        {
            name: "Sarah Maliba",
            role: "Agronome",
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuvKMs2fz-W3JH6ddslJWvSAm3I-wPyVDsn7RgVnJ1ogYwJIue5N6EKW5k1g-x6fqPrN0Qyv9AAarZyM5XfUPLFwBwc7knu1unO4AiS_TMWnbYE6zp3SOswmD_8eq7z3W0j9frBrXFAbzOKf5_daj4MqWk_G3dMM99KDa6UMShcgWz2rKIXnVaUYVinJNJFe_AavO3X1y0MLP-P4D4eJjHo0v4GVK8ywFN75tuq93EDmgwTcpu3GVoHrIarc7KUGrB2Okzg0UKQtQ",
        },
        {
            name: "David Kalonji",
            role: "Technicien",
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9vFHDQuoZCFV8OrwBBs3QzEPirXpveLrmKzD7hkuTObkXxwgFHgIdbnM5njcqAwcXFeh031dOqfphJgfcwoK1vjgMSHmgL1dAW31jnAoCH_I8I4noRh6KdkObBNPuX5L-U-I-0OKBfB7N6idWGu_S79QP0LdwbpsmqHOHkF5jrp_jjqYHXcQPdFSyZ02pRwIrphidZXvDCQcbOdYyrf7qQqdQPrejF238y1LgFXkk9JtecVJCfhoKpShwF_4MgwUkQXQXzEPb_5g",
        },
    ];

    return (
        <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c]">
            <OwnerSidebar />

            <main className="ml-64 min-h-screen">
                <div className="mx-auto max-w-[1440px] p-8">
                    <BreadcrumbHeader parcelId={parcelId} />
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 space-y-6 lg:col-span-8">
                            <MetricsRow />
                            <YieldChart />
                            <CropHistoryTable rows={historyRows} />
                        </div>

                        <div className="col-span-12 space-y-6 lg:col-span-4">
                            <GeoMap />
                            <AssignedStaff staff={staff} />
                            <WeatherCard />
                        </div>
                    </div>
                </div>
            </main>

            <SuccessToast />
        </div>
    );
}

function BreadcrumbHeader({ parcelId }) {
    return (
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
                <div className="mb-2 flex items-center gap-2 text-gray-500">
                    <span className="text-xs">Parcelles</span>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-xs text-[#003f87]">Détail de la Parcelle</span>
                </div>
                <div className="flex items-center gap-4">
                    <h1 className="text-[32px] font-semibold leading-10 text-[#1b1c1c]">Parcelle {parcelId}</h1>
                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            Sain
          </span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-gray-500">
                    <span className="material-symbols-outlined text-base">location_on</span>
                    <span className="text-sm">Territoire de Kasangulu, Kongo-Central, RDC</span>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded border border-[#003f87] px-4 py-2 text-sm font-semibold text-[#003f87] transition-colors hover:bg-blue-50">
                    <span className="material-symbols-outlined text-lg">edit</span>
                    Modifier
                </button>
                <button className="flex items-center gap-2 rounded bg-[#003f87] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                    <span className="material-symbols-outlined text-lg">agriculture</span>
                    Enregistrer Récolte
                </button>
            </div>
        </div>
    );
}

function MetricsRow() {
    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <MetricCard title="Superficie" big="12.4" suffix="ha" />
            <MetricCard title="Culture Actuelle" icon="eco" value="Manioc" />
            <MetricCard title="Qualité du sol" big="88" suffix="/100" progress={88} />
            <MetricCard title="Dernière Récolte" value="Oct 2023" sub="2.4 tonnes / ha" />
        </div>
    );
}

function MetricCard({ title, value, big, suffix, sub, icon, progress }) {
    return (
        <div className="card-flat flex flex-col justify-between p-4">
            <span className="text-xs uppercase text-gray-500">{title}</span>
            {big ? (
                <div className="mt-4">
                    <span className="text-[40px] font-bold leading-[48px] text-[#003f87]">{big}</span>
                    <span className="ml-1 text-base text-gray-500">{suffix}</span>
                    {typeof progress === "number" && (
                        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                            <div className="h-full rounded-full bg-[#003f87]" style={{ width: `${progress}%` }} />
                        </div>
                    )}
                </div>
            ) : icon ? (
                <div className="mt-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-2xl text-[#b6171e]">{icon}</span>
                    <span className="text-2xl font-semibold">{value}</span>
                </div>
            ) : (
                <div className="mt-4">
                    <span className="text-2xl font-semibold text-[#1b1c1c]">{value}</span>
                    <p className="mt-1 text-xs text-gray-400">{sub}</p>
                </div>
            )}
        </div>
    );
}

function YieldChart() {
    const bars = [
        { year: "2019", h: "h-32", tone: "bg-[#003f87]/20 hover:bg-[#003f87]/40" },
        { year: "2020", h: "h-40", tone: "bg-[#003f87]/40 hover:bg-[#003f87]/60" },
        { year: "2021", h: "h-48", tone: "bg-[#003f87]/60 hover:bg-[#003f87]/80" },
        { year: "2022", h: "h-56", tone: "bg-[#003f87] hover:opacity-90" },
        { year: "2023", h: "h-52", tone: "bg-[#003f87]/90" },
        { year: "2024*", h: "h-60", tone: "bg-gray-200 border-t-2 border-dashed border-[#003f87]" },
    ];

    return (
        <div className="card-flat p-4">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Tendances de Rendement</h3>
                <div className="flex gap-2">
                    <LegendDot color="bg-[#003f87]" label="Réel" />
                    <LegendDot color="bg-[#003f87]/30" label="Prévision" />
                </div>
            </div>

            <div className="flex h-64 items-end justify-between gap-2 border-b border-gray-100 px-2">
                {bars.map((b) => (
                    <div key={b.year} className="flex flex-1 flex-col items-center">
                        <div className={`w-full ${b.tone} ${b.h} rounded-t`} />
                        <span className={`mt-2 text-xs text-gray-400 ${b.year === "2022" ? "font-bold text-gray-600" : ""}`}>{b.year}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CropHistoryTable({ rows }) {
    return (
        <div className="card-flat overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h3 className="text-2xl font-semibold">Historique des Cultures</h3>
                <button className="flex items-center gap-1 text-sm font-semibold text-[#003f87]">
                    Voir Tout <span className="material-symbols-outlined text-sm">open_in_new</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                        {["Saison", "Culture", "Rendement (T)", "Statut", "Action"].map((h) => (
                            <th key={h} className="px-4 py-3 text-xs uppercase text-gray-500">
                                {h}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {rows.map(([season, crop, yieldT, status, tone]) => (
                        <tr key={season} className="even:bg-[#f5f3f3]">
                            <td className="px-4 py-4 text-sm font-semibold">{season}</td>
                            <td className="px-4 py-4 text-sm">{crop}</td>
                            <td className="px-4 py-4 text-sm">{yieldT}</td>
                            <td className="px-4 py-4">
                                <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${tone}`}>{status}</span>
                            </td>
                            <td className="px-4 py-4 text-[#003f87]">
                                <button className="material-symbols-outlined">visibility</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function GeoMap() {
    return (
        <div className="card-flat overflow-hidden">
            <div className="border-b border-gray-200 p-4">
                <h3 className="text-2xl font-semibold">Localisation Géospatiale</h3>
            </div>
            <div className="relative h-64 w-full">
                <img
                    className="h-full w-full object-cover grayscale"
                    alt="high contrast satellite view of agricultural fields with blue geometric overlay indicating parcel boundaries in a rural DRC landscape"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFwdhIxRBKM8NvZwMtcYjq-5902mcJQdvl7aMDyDqVpKnuNP6ANMqNUhRj5BizGJ44Ja6Z9PYN8lCkLhaja7z5JGmNfzv1vJv3179ypXE_1cPzH42N4SnHQZA8gBK9xv2dItcdALPcXJpezvz9cE5MhALHcshP3nWXZIMPVN_TpCfF0R2_ouxQs1uxSLxw908FMLqsGJNGpUP8hRE6Rht3kNPUXupOrVqWe7UQlum2fm9W0kUo_9Z1Z9jKnlZccALOLkLHmZk3Cbk"
                />
                <div className="pointer-events-none absolute inset-0 m-12 border-4 border-[#003f87] bg-[#003f87]/10" />
                <div className="absolute bottom-4 right-4 flex flex-col gap-1 rounded bg-white p-2 shadow-sm">
                    <MapBtn icon="add" />
                    <MapBtn icon="remove" />
                </div>
            </div>
            <div className="bg-gray-50 p-4">
                <Row label="Coordonnées" value="4.5833° S, 15.1667° E" />
                <Row label="Périmètre" value="1,420 m" />
            </div>
        </div>
    );
}

function AssignedStaff({ staff }) {
    return (
        <div className="card-flat">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h3 className="text-2xl font-semibold">Personnel Assigné</h3>
                <button className="rounded p-1 text-[#003f87] transition-colors hover:bg-blue-50">
                    <span className="material-symbols-outlined">person_add</span>
                </button>
            </div>
            <div className="space-y-4 p-4">
                {staff.map((s) => (
                    <div key={s.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img alt={s.name} className="h-10 w-10 rounded-full object-cover" src={s.src} />
                            <div>
                                <p className="text-sm font-semibold">{s.name}</p>
                                <p className="text-xs text-gray-500">{s.role}</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-sm text-gray-400">more_vert</span>
                    </div>
                ))}
                <button className="w-full rounded border border-dashed border-gray-300 py-2 text-xs font-semibold text-gray-500 transition-colors hover:border-[#003f87] hover:text-[#003f87]">
                    + Assigner un nouvel employé
                </button>
            </div>
        </div>
    );
}

function WeatherCard() {
    return (
        <div className="card-flat border-none bg-gradient-to-br from-[#003f87] to-[#0056b3] p-4 text-white">
            <div className="mb-4 flex items-start justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-200">Météo Locale</p>
                    <h4 className="text-2xl font-semibold">Kasangulu</h4>
                </div>
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          wb_sunny
        </span>
            </div>
            <div className="mb-6 flex items-end gap-2">
                <span className="text-[40px] font-bold leading-[48px]">31°C</span>
                <span className="pb-2 text-sm text-blue-200">Ensoleillé</span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                <Row label="Humidité" value="65%" white />
                <Row label="Pluie (24h)" value="0.0 mm" white />
            </div>
        </div>
    );
}

function SuccessToast() {
    return (
        <div className="fixed bottom-8 right-8 z-50">
            <div className="flex items-center gap-3 rounded border border-gray-200 bg-white p-4 shadow-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
                </div>
                <div>
                    <p className="text-sm font-semibold">Données Synchronisées</p>
                    <p className="text-xs text-gray-500">Dernière mise à jour : il y a 2 min</p>
                </div>
            </div>
        </div>
    );
}

function LegendDot({ color, label }) {
    return (
        <span className="flex items-center gap-1 text-xs text-gray-500">
      <span className={`h-3 w-3 rounded-full ${color}`} />
            {label}
    </span>
    );
}

function MapBtn({ icon }) {
    return (
        <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 hover:bg-gray-50">
            <span className="material-symbols-outlined">{icon}</span>
        </button>
    );
}

function Row({ label, value, white = false }) {
    return (
        <div className="flex items-center justify-between text-xs">
            <span className={white ? "text-blue-200" : "text-gray-500"}>{label}</span>
            <span className={white ? "text-white" : "text-[#1b1c1c]"}>{value}</span>
        </div>
    );
}