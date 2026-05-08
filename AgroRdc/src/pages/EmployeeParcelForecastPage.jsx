import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const HEADER_TABS = ['Aperçu', 'Capteurs', 'Prévisions', 'Historique']

const RISKS = [
    {
        label: 'Sécheresse de Fin de Saison',
        badge: 'Risque Élevé',
        badgeBg: 'bg-red-100 text-red-800',
        barColor: 'bg-[#b6171e]',
        barWidth: '85%',
        note: "Recommandation : Déployer le système d'irrigation secondaire avant la semaine 45.",
    },
    {
        label: 'Scolyte du Café',
        badge: 'Risque Moyen',
        badgeBg: 'bg-amber-100 text-amber-800',
        barColor: 'bg-amber-500',
        barWidth: '42%',
        note: 'Recommandation : Inspection des pièges à phéromones toutes les 72 heures.',
    },
    {
        label: 'Baisse Nutritionnelle du Sol',
        badge: 'Risque Faible',
        badgeBg: 'bg-green-100 text-green-800',
        barColor: 'bg-green-600',
        barWidth: '18%',
        note: null,
    },
]

const NAV_ITEMS = [
    { icon: 'assignment', label: 'Missions' },
    { icon: 'map',        label: 'Carte',  active: true },
    { icon: 'history',    label: 'Journaux' },
    { icon: 'person',     label: 'Profil' },
]

export default function EmployeeParcelForecastPage() {
    const [activeTab, setActiveTab] = useState('Prévisions')
    const { id } = useParams()
    const parcelId = id || 'B-04'

    return (
        <div className="min-h-screen bg-[#f9f9ff] text-[#171c25]">
            {/* Sticky header */}
            <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <Link
                        to={`/employee/parcelles/${parcelId}`}
                        className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#003f87] transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Parcelle {parcelId}
                    </Link>
                    <nav className="hidden md:flex items-center gap-1">
                        {HEADER_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
                                    activeTab === tab
                                        ? 'border-b-2 border-[#003f87] text-[#003f87]'
                                        : 'text-slate-500 hover:text-[#003f87]'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden md:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">search</span>
                        <input
                            className="w-56 rounded-full border-none bg-slate-100/70 py-1.5 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30"
                            placeholder="Rechercher…"
                            type="text"
                        />
                    </div>
                    <button className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#b6171e]" />
                    </button>
                    <div className="h-9 w-9 overflow-hidden rounded-full border border-slate-200">
                        <img
                            alt="Profil"
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCbuiJWotVBv4xtsAPrQU7wKzQRq8a6UcdSWVe03Ct4g_vAu0SP9CJULRDk6EL9ZP81YRcAKDRFoBitD_Nr3Twe6LKoEHrMyzgi-TQV17bg6Bgyd6D7JTCLHJFSZJs2r8H-YldoXbtotjDI-sfgyKmwawinmrozWlI7mK0jL1h60adkI31Ew4281lMc-R54UzOXvvpTCLjoMECHeP-WaV9001XUl-wB2XJ5TAevxeLGybhSUXXgz-lFQzCtaUXTlQpWIcan71p9nc"
                        />
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl space-y-6 px-6 pb-32 pt-8 md:pb-10">
                {/* Page title row */}
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <nav className="mb-2 flex items-center gap-1 text-xs text-slate-400">
                            <Link to="/employee/dashboard" className="hover:text-[#003f87]">Parcelles</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <Link to={`/employee/parcelles/${parcelId}`} className="hover:text-[#003f87]">
                                Parcelle {parcelId}
                            </Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-[#003f87] font-semibold">Prévisions</span>
                        </nav>
                        <h2 className="text-4xl font-black tracking-tight text-[#003f87]">
                            Prévisions de Rendement
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Analyse prédictive de production — Plantation Café Secteur Nord
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#003f87] shadow-sm transition-colors hover:bg-slate-50">
                            <span className="material-symbols-outlined text-[18px]">download</span>
                            Exporter PDF
                        </button>
                        <button className="flex items-center gap-2 rounded-xl bg-[#003f87] px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0056b3] active:scale-95">
                            <span className="material-symbols-outlined text-[18px]">refresh</span>
                            Recalculer
                        </button>
                    </div>
                </div>

                {/* Bento grid */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left column */}
                    <div className="col-span-12 space-y-6 lg:col-span-8">
                        {/* Seasonal progress card */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-[#003f87]">
                                        Progression du Rendement Saisonnier
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        Objectif : 4.2 Tonnes (Variété Arabica)
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-5xl font-black text-[#003f87]">78%</span>
                                    <p className="text-xs font-medium text-slate-400">Estimation Actuelle</p>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="relative mb-6 h-4 w-full overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="absolute left-0 top-0 h-full rounded-full bg-[#003f87] transition-all"
                                    style={{ width: '78%' }}
                                />
                                {/* Baseline marker */}
                                <div
                                    className="absolute top-0 z-10 h-full w-0.5 bg-[#b6171e]"
                                    style={{ left: '85%' }}
                                    title="Référence historique"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { label: 'Total Projeté',       value: '3.28 T',  color: 'text-[#003f87]' },
                                    { label: 'Confiance de Récolte', value: 'Élevée', color: 'text-emerald-700' },
                                    { label: 'Délai de Récolte',    value: '42 Jours', color: 'text-[#003f87]' },
                                ].map((stat) => (
                                    <div key={stat.label} className="rounded-lg bg-[#f9f9ff] p-4">
                                        <p className="text-xs text-slate-400">{stat.label}</p>
                                        <p className={`mt-1 text-xl font-bold ${stat.color}`}>{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Yield trend chart */}
                        <div className="flex h-[400px] flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-[#003f87]">
                                    Projection de Tendance de Rendement
                                </h3>
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                        <span className="h-3 w-3 rounded-full bg-[#003f87]" />
                                        Prévision
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                        <span className="h-3 w-3 rounded-full bg-slate-200" />
                                        Réel
                                    </span>
                                </div>
                            </div>

                            {/* Chart area */}
                            <div className="relative ml-10 mt-4 flex-1 border-b border-l border-slate-200">
                                {/* Gradient fill */}
                                <div
                                    className="pointer-events-none absolute inset-0"
                                    style={{
                                        background:
                                            'linear-gradient(180deg, rgba(0,86,179,0.10) 0%, rgba(0,86,179,0) 100%)',
                                    }}
                                />
                                <svg className="absolute inset-0 h-full w-full overflow-visible">
                                    <path
                                        d="M 0 300 Q 100 280 200 240 T 400 180 T 600 100 T 800 40"
                                        fill="none"
                                        stroke="#003f87"
                                        strokeWidth="3"
                                    />
                                    {[
                                        [0, 300], [200, 240], [400, 180], [600, 100],
                                    ].map(([cx, cy]) => (
                                        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={4} fill="#003f87" />
                                    ))}
                                    <circle cx={800} cy={40} r={6} fill="#003f87" stroke="white" strokeWidth={2} />
                                </svg>

                                {/* X-axis labels */}
                                <div className="absolute -bottom-7 flex w-full justify-between px-2 text-[11px] text-slate-400">
                                    <span>Actuel</span>
                                    <span>+30 Jours</span>
                                    <span>+60 Jours</span>
                                    <span>+90 Jours</span>
                                </div>

                                {/* Y-axis labels */}
                                <div className="absolute -left-10 flex h-full flex-col justify-between text-[11px] text-slate-400">
                                    <span>4.0T</span>
                                    <span>3.0T</span>
                                    <span>2.0T</span>
                                    <span>1.0T</span>
                                    <span>0</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="col-span-12 space-y-6 lg:col-span-4">
                        {/* Harvest schedule — dark blue card */}
                        <div className="relative overflow-hidden rounded-xl bg-[#003f87] p-6 text-white shadow-lg">
                            <div className="relative z-10">
                                <div className="mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined">event_available</span>
                                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                                        Calendrier de Récolte
                                    </span>
                                </div>
                                <p className="text-5xl font-black">14 Nov</p>
                                <p className="mb-6 text-sm opacity-80">Récolte Principale Estimée</p>

                                <div className="space-y-0">
                                    {[
                                        { label: 'Date de Plantation', value: '12 Juin 2023' },
                                        { label: 'Durée de Saison',    value: '155 Jours' },
                                        { label: "Main d'œuvre",       value: '24 Travailleurs' },
                                    ].map((row, i, arr) => (
                                        <div
                                            key={row.label}
                                            className={`flex items-center justify-between py-2.5 ${
                                                i < arr.length - 1 ? 'border-b border-white/10' : ''
                                            }`}
                                        >
                                            <span className="text-sm opacity-80">{row.label}</span>
                                            <span className="text-sm font-semibold">{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Decorative blur circle */}
                            <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
                        </div>

                        {/* Risk assessment */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-[#003f87]">
                                <span className="material-symbols-outlined text-[#b6171e]">warning</span>
                                Évaluation des Risques
                            </h3>
                            <div className="space-y-6">
                                {RISKS.map((risk) => (
                                    <div key={risk.label}>
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-sm font-semibold text-[#1b1c1c]">
                                                {risk.label}
                                            </span>
                                            <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${risk.badgeBg}`}>
                                                {risk.badge}
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className={`h-full rounded-full ${risk.barColor}`}
                                                style={{ width: risk.barWidth }}
                                            />
                                        </div>
                                        {risk.note && (
                                            <p className="mt-2 text-xs italic text-slate-400">{risk.note}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button className="mt-8 w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-[#003f87] transition-colors hover:bg-slate-50">
                                Voir le Plan Détaillé d&apos;Atténuation
                            </button>
                        </div>

                        {/* Satellite image card */}
                        <div className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200">
                            <img
                                alt="Vue aérienne plantation café Parcelle B-04, RDC"
                                className="h-full w-full object-cover grayscale-[20%] transition-all duration-500 group-hover:grayscale-0"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsEKOAOm_4amfF8ABkYxVm6k86MAS6u0FUL1IR98fbVjEJtaXV512nGC8hRDwe3UNLt4aIKQ2ncxzlDpYqj3GX7OnzMLTXpB1P0zKO5bDKPXlXw9PQKWhDWX65B6yCXQyehPCTEKz6gT04iC0F20OCclKdBg6KVbB1HPc3sgGGRmVRqXGAWoQBlxm-2GiGCdTNiJdRzKGLdAyiVVbZw9YQIndr6cYBI4LPdFtDrztZsxBvVUSbESZRxQdeLtwz8gjSVETC7RaGZ3w"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-5">
                                <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/60">
                                    Vue Satellite en Direct
                                </span>
                                <span className="text-sm font-bold text-white">
                                    Indice Visuel — Parcelle {parcelId}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* FAB */}
            <button className="fixed bottom-20 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#b6171e] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 md:bottom-10 md:right-10">
                <span
                    className="material-symbols-outlined text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                >
                    add_chart
                </span>
            </button>

            {/* Mobile bottom nav */}
            <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-[#DEE2E6] bg-white/95 px-4 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] backdrop-blur-sm md:hidden">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.label}
                        className={`flex flex-col items-center justify-center rounded-lg px-3 py-1 transition-all ${
                            item.active ? 'bg-blue-50 text-[#003f87]' : 'text-slate-500'
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
    )
}
