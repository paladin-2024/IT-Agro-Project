import React from "react";

const overviewStats = [
    { label: "Total parcelles", value: "124", icon: "grid_view", tone: "bg-blue-50 text-blue-700" },
    { label: "Surface totale", value: "2,450 Ha", icon: "eco", tone: "bg-green-50 text-green-700" },
    { label: "Parcelles actives", value: "98", icon: "check_circle", tone: "bg-emerald-50 text-emerald-700" },
    { label: "Alertes ouvertes", value: "12", icon: "warning", tone: "bg-orange-50 text-orange-700" },
];

const breakdown = [
    { label: "Productif", value: 68, color: "bg-green-600" },
    { label: "En croissance", value: 22, color: "bg-blue-600" },
    { label: "Attention", value: 10, color: "bg-red-600" },
];

export default function OwnerOverviewParcelPage() {
    return (
        <section className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">Vue d'ensemble des parcelles</h2>
                        <p className="mt-1 text-sm text-slate-600">
                            Aperçu rapide de l'état global des cultures, des surfaces et des alertes de gestion.
                        </p>
                    </div>
                    <button className="rounded-lg border border-[#c2c6d4] bg-white px-4 py-2 text-sm font-semibold text-[#003f87] hover:bg-slate-50">
                        Voir détails
                    </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {overviewStats.map((item) => (
                        <StatCard key={item.label} {...item} />
                    ))}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-[#f5f3f3] p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-900">Répartition par état</h3>
                            <span className="text-xs font-medium text-slate-500">En %</span>
                        </div>

                        <div className="space-y-4">
                            {breakdown.map((item) => (
                                <div key={item.label}>
                                    <div className="mb-1 flex items-center justify-between">
                                        <span className="text-sm text-slate-600">{item.label}</span>
                                        <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-white">
                                        <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#c2c6d4] bg-white p-5">
                        <h3 className="mb-3 text-sm font-semibold text-slate-900">Observation rapide</h3>
                        <p className="text-sm leading-6 text-slate-600">
                            La majorité des parcelles est en état productif, mais 12 parcelles nécessitent une action prioritaire.
                            Les parcelles en croissance restent stables et les zones en attente doivent être planifiées pour la prochaine phase.
                        </p>

                        <div className="mt-5 rounded-lg bg-[#d7e2ff] p-4">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-[#003f87]">insights</span>
                                <div>
                                    <p className="text-sm font-semibold text-[#004491]">Recommandation</p>
                                    <p className="mt-1 text-sm text-[#004491]">
                                        Prioriser l'irrigation sur les parcelles à faible humidité et suivre les alertes terrain dans les 24 heures.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">Indicateurs clés</h3>
                <div className="mt-5 space-y-4">
                    <KeyLine label="Surface exploitée" value="82%" />
                    <KeyLine label="Parcelles surveillées" value="96%" />
                    <KeyLine label="Taux de conformité" value="91%" />
                    <KeyLine label="Alertes résolues" value="78%" />
                </div>

                <div className="mt-6 rounded-xl bg-[#f0eded] p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Résumé du jour</p>
                    <p className="mt-2 text-sm text-slate-700">
                        3 nouvelles parcelles enregistrées, 2 alertes hydriques, et 1 parcelle programmée pour inspection.
                    </p>
                </div>
            </div>
        </section>
    );
}

function StatCard({ label, value, icon, tone }) {
    return (
        <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4">
            <div className={`flex h-11 w-11 items-center justify-center rounded-full ${tone}`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-xl font-bold text-slate-900">{value}</p>
            </div>
        </div>
    );
}

function KeyLine({ label, value }) {
    return (
        <div>
            <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-slate-600">{label}</span>
                <span className="text-sm font-bold text-slate-900">{value}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-[#003f87]" style={{ width: value }} />
            </div>
        </div>
    );
}