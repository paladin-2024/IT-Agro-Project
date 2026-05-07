import AdminSidebar from '../components/AdminSidebar.jsx'

const CIRC = 251.33 // 2 * π * 40

function CircleGauge({ value, color, label, sublabel }) {
    const offset = CIRC * (1 - value / 100)
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative h-24 w-24">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                    <circle
                        cx="50" cy="50" r="40" fill="none"
                        stroke={color} strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={CIRC}
                        strokeDashoffset={offset}
                        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-[#1b1c1c]">{value}%</span>
                </div>
            </div>
            <span className="text-sm font-semibold text-[#1b1c1c]">{label}</span>
            <span className="text-xs text-slate-500">{sublabel}</span>
        </div>
    )
}

const BAR_DATA = [42, 58, 75, 63, 88, 72, 95, 81, 69, 74, 91, 78]
const BAR_LABELS = ['08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h']

const SERVICES = [
    { name: 'API Gateway', status: 'ok', latency: '42ms', uptime: '99.99%' },
    { name: 'Auth Service', status: 'ok', latency: '18ms', uptime: '100%' },
    { name: 'Base PostgreSQL', status: 'ok', latency: '6ms', uptime: '99.97%' },
    { name: 'Capteurs IoT', status: 'warn', latency: '2140ms', uptime: '97.3%' },
    { name: 'Service Email', status: 'ok', latency: '95ms', uptime: '99.8%' },
    { name: 'Stockage fichiers', status: 'ok', latency: '31ms', uptime: '100%' },
    { name: 'Worker tâches', status: 'error', latency: '—', uptime: '81.2%' },
]

const STATUS_BADGE = {
    ok: 'bg-green-100 text-green-700',
    warn: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
}
const STATUS_DOT = {
    ok: 'bg-green-500',
    warn: 'bg-yellow-500',
    error: 'bg-red-500',
}
const STATUS_LABEL = { ok: 'Actif', warn: 'Dégradé', error: 'Hors ligne' }

const ALERTS = [
    { level: 'error', msg: 'Worker tâches — arrêt inattendu', time: 'il y a 5 min', icon: 'cancel' },
    { level: 'warn', msg: 'Capteurs Kivu 3 — latence > 2000ms', time: 'il y a 15 min', icon: 'warning' },
    { level: 'warn', msg: 'Utilisation RAM à 74% — seuil approché', time: 'il y a 32 min', icon: 'warning' },
    { level: 'ok', msg: 'Sauvegarde base de données — succès', time: 'il y a 1h', icon: 'check_circle' },
    { level: 'ok', msg: 'Certificat SSL renouvelé automatiquement', time: 'il y a 3h', icon: 'check_circle' },
]

const ALERT_COLORS = {
    error: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600', text: 'text-red-800' },
    warn: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600', text: 'text-yellow-800' },
    ok: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', text: 'text-green-800' },
}

const AUDIT_LOGS = [
    { user: 'Admin Système', action: 'Nouvelle route logistique KIN-MAT-04 approuvée', time: 'il y a 2 min', type: 'info' },
    { user: 'Système', action: 'Worker tâches redémarré automatiquement (échec × 3)', time: 'il y a 5 min', type: 'error' },
    { user: 'Pierre Kalala', action: 'Connexion depuis 196.217.x.x (Kinshasa)', time: 'il y a 12 min', type: 'info' },
    { user: 'Système', action: 'Alerte latence capteurs IoT — secteur Kivu 3', time: 'il y a 15 min', type: 'warn' },
    { user: 'Admin Système', action: 'Utilisateur Sarah Amina approuvée (rôle Conseillère)', time: 'il y a 28 min', type: 'info' },
    { user: 'Système', action: 'Sauvegarde quotidienne base PostgreSQL — 4.2 GB', time: 'il y a 1h', type: 'ok' },
    { user: 'Jean M\'Boku', action: 'Rapport de rendement généré et exporté (PDF)', time: 'il y a 1h 20min', type: 'info' },
]

const LOG_DOT = { info: 'bg-blue-500', error: 'bg-red-500', warn: 'bg-yellow-500', ok: 'bg-green-500' }

const NETWORK_IN =  [30, 45, 38, 60, 55, 70, 65, 80, 72, 68, 85, 78]
const NETWORK_OUT = [20, 30, 25, 42, 38, 50, 45, 58, 52, 48, 63, 55]

export default function AdminHealthPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] font-[Inter] text-[#1b1c1c]">
            <AdminSidebar />

            <main className="ml-64 min-h-screen">
                {/* Topbar */}
                <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input
                                type="text"
                                placeholder="Rechercher dans les journaux..."
                                className="w-64 rounded-md border-none bg-slate-50 py-1.5 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-[#003f87]"
                            />
                        </div>
                        <div className="hidden md:flex items-center gap-1">
                            {['Rapports', 'Journaux', 'Assistance'].map((tab, i) => (
                                <button key={tab} className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${i === 1 ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative rounded-full p-2 text-slate-600 hover:bg-slate-50">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-[#b6171e]" />
                        </button>
                        <button className="rounded-full p-2 text-slate-600 hover:bg-slate-50">
                            <span className="material-symbols-outlined">help_outline</span>
                        </button>
                        <div className="h-8 w-8 overflow-hidden rounded-full border border-slate-200">
                            <img
                                alt="Avatar administrateur"
                                className="h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpZiPygdW00_GdJRti8ARyY5_lKP2M894zEZnDDv0PcD4cPOy1NVORIFT8pRF0TQ0HxA1y2MIpKnui8wrp_G2v3zGi6gLjYkcTDGtyP0MB0sVDfRmTKw4g7a1ANR-uTOiprv7P3I3GyLzuEITS5IhH62M-EVG_QtxA2aGa6j9lxwa2S2HEVoRiW9gH47GlucBiYBJQLBBaq90H3_XJcyxBNMWOL1rRxrFsmN-QQ_6V3ia3S3Te5sMAOZ0KTyjdNbqoZn5s4KroBjI"
                            />
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-6">

                    {/* Page title */}
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-[#1b1c1c]">Santé du système</h2>
                            <p className="mt-1 text-sm text-[#424752]">
                                Supervision en temps réel de l&apos;infrastructure · Dernière mise à jour : il y a 30s
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                                <span className="material-symbols-outlined text-sm">download</span>
                                Exporter
                            </button>
                            <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-green-700">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                                <span className="text-sm font-medium">Système opérationnel</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Row 1: 6 KPI cards ── */}
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                        {[
                            { icon: 'dns', iconBg: 'bg-blue-50', iconColor: 'text-blue-700', label: 'État serveur', value: 'Connecté', sub: '99.9% uptime', subColor: 'text-green-600' },
                            { icon: 'database', iconBg: 'bg-orange-50', iconColor: 'text-orange-700', label: 'Base de données', value: 'Optimisée', sub: '142 requêtes/s', subColor: 'text-slate-500' },
                            { icon: 'speed', iconBg: 'bg-red-50', iconColor: 'text-red-600', label: 'Latence API', value: '124ms', sub: '↓ 12ms vs hier', subColor: 'text-green-600' },
                            { icon: 'memory', iconBg: 'bg-purple-50', iconColor: 'text-purple-700', label: 'CPU', value: '68%', sub: '8 cœurs actifs', subColor: 'text-slate-500' },
                            { icon: 'storage', iconBg: 'bg-teal-50', iconColor: 'text-teal-700', label: 'RAM utilisée', value: '74%', sub: '11.8 / 16 GB', subColor: 'text-slate-500' },
                            { icon: 'group', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-700', label: 'Sessions actives', value: '1 284', sub: '+47 ce matin', subColor: 'text-green-600' },
                        ].map((card) => (
                            <div key={card.label} className="flex flex-col gap-3 rounded-xl border border-[#DEE2E6] bg-white p-4">
                                <div className={`w-fit rounded-lg p-2 ${card.iconBg}`}>
                                    <span className={`material-symbols-outlined text-xl ${card.iconColor}`}>{card.icon}</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">{card.label}</p>
                                    <p className="text-lg font-bold text-[#1b1c1c]">{card.value}</p>
                                    <p className={`text-xs ${card.subColor}`}>{card.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── Row 2: Gauges + Services status ── */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* Circular gauges */}
                        <div className="col-span-12 rounded-xl border border-[#DEE2E6] bg-white p-6 lg:col-span-7">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-[#1b1c1c]">Ressources système</h3>
                                <span className="text-xs text-slate-400">Temps réel</span>
                            </div>
                            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                                <CircleGauge value={68} color="#6366f1" label="CPU" sublabel="8 cœurs" />
                                <CircleGauge value={74} color="#0056B3" label="RAM" sublabel="11.8 / 16 GB" />
                                <CircleGauge value={45} color="#0d9488" label="Stockage" sublabel="450 / 1000 GB" />
                                <CircleGauge value={32} color="#f59e0b" label="Réseau" sublabel="320 / 1000 Mbps" />
                            </div>
                            {/* mini bars below gauges */}
                            <div className="mt-8 grid grid-cols-4 gap-4">
                                {[
                                    { label: 'Température CPU', value: '52°C', max: 100, current: 52, color: 'bg-indigo-400' },
                                    { label: 'Swap utilisé', value: '1.2 GB', max: 100, current: 15, color: 'bg-blue-500' },
                                    { label: 'I/O disque', value: '48 MB/s', max: 100, current: 48, color: 'bg-teal-500' },
                                    { label: 'Paquets/s', value: '12.4k', max: 100, current: 62, color: 'bg-amber-400' },
                                ].map((m) => (
                                    <div key={m.label}>
                                        <div className="mb-1 flex justify-between text-xs">
                                            <span className="text-slate-500">{m.label}</span>
                                            <span className="font-semibold">{m.value}</span>
                                        </div>
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                            <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.current}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Services status */}
                        <div className="col-span-12 rounded-xl border border-[#DEE2E6] bg-white p-6 lg:col-span-5">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-[#1b1c1c]">État des services</h3>
                                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">1 panne</span>
                            </div>
                            <div className="space-y-2">
                                {SERVICES.map((svc) => (
                                    <div key={svc.name} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <span className={`h-2 w-2 rounded-full ${STATUS_DOT[svc.status]}`} />
                                            <span className="text-sm font-medium text-[#1b1c1c]">{svc.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-slate-400">{svc.latency}</span>
                                            <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${STATUS_BADGE[svc.status]}`}>
                                                {STATUS_LABEL[svc.status]}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Row 3: Requests chart + Network I/O ── */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* Requests bar chart */}
                        <div className="col-span-12 rounded-xl border border-[#DEE2E6] bg-white p-6 lg:col-span-8">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-[#1b1c1c]">Requêtes par heure</h3>
                                    <p className="text-xs text-slate-400">Aujourd&apos;hui — 08h00 → 19h00</p>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span className="inline-block h-2 w-3 rounded-sm bg-[#0056B3]" />
                                    Requêtes (milliers)
                                </div>
                            </div>
                            <div className="flex h-40 items-end gap-2">
                                {BAR_DATA.map((v, i) => (
                                    <div key={i} className="group relative flex flex-1 flex-col items-center gap-1">
                                        <div
                                            className="w-full rounded-t-sm bg-[#0056B3] transition-all duration-300 group-hover:bg-[#003f87]"
                                            style={{ height: `${v}%` }}
                                        >
                                            <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded bg-[#1b1c1c] px-2 py-0.5 text-[10px] text-white group-hover:block whitespace-nowrap">
                                                {v}k req
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2 flex gap-2">
                                {BAR_LABELS.map((l) => (
                                    <div key={l} className="flex-1 text-center text-[10px] text-slate-400">{l}</div>
                                ))}
                            </div>
                            {/* summary row */}
                            <div className="mt-4 grid grid-cols-3 divide-x divide-slate-100 rounded-lg bg-slate-50 py-3">
                                {[
                                    { label: 'Pic horaire', value: '95k' },
                                    { label: 'Moyenne', value: '70k' },
                                    { label: 'Taux d\'erreur', value: '0.08%' },
                                ].map((s) => (
                                    <div key={s.label} className="flex flex-col items-center">
                                        <span className="text-base font-bold text-[#1b1c1c]">{s.value}</span>
                                        <span className="text-xs text-slate-500">{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Network I/O */}
                        <div className="col-span-12 rounded-xl border border-[#DEE2E6] bg-white p-6 lg:col-span-4">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-[#1b1c1c]">Trafic réseau</h3>
                                <span className="text-xs text-slate-400">Mbps</span>
                            </div>
                            <div className="mb-4 flex gap-4 text-xs">
                                <span className="flex items-center gap-1"><span className="h-2 w-3 rounded-sm bg-[#0056B3]" />Entrant</span>
                                <span className="flex items-center gap-1"><span className="h-2 w-3 rounded-sm bg-teal-400" />Sortant</span>
                            </div>
                            <div className="flex h-32 items-end gap-1">
                                {NETWORK_IN.map((v, i) => (
                                    <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                                        <div className="w-full rounded-t-sm bg-[#0056B3]" style={{ height: `${v}%` }} />
                                        <div className="w-full rounded-t-sm bg-teal-400" style={{ height: `${NETWORK_OUT[i]}%` }} />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                                {[
                                    { label: 'Entrant actuel', value: '78 Mbps', color: 'text-[#0056B3]' },
                                    { label: 'Sortant actuel', value: '55 Mbps', color: 'text-teal-600' },
                                    { label: 'Bande passante totale', value: '1 000 Mbps', color: 'text-slate-500' },
                                ].map((r) => (
                                    <div key={r.label} className="flex justify-between text-xs">
                                        <span className="text-slate-500">{r.label}</span>
                                        <span className={`font-semibold ${r.color}`}>{r.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Row 4: Alerts + Uptime ── */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* Recent alerts */}
                        <div className="col-span-12 rounded-xl border border-[#DEE2E6] bg-white p-6 lg:col-span-7">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-[#1b1c1c]">Alertes récentes</h3>
                                <button className="text-xs font-bold text-[#0056B3] hover:underline">Voir tout</button>
                            </div>
                            <div className="space-y-2">
                                {ALERTS.map((a, i) => {
                                    const c = ALERT_COLORS[a.level]
                                    return (
                                        <div key={i} className={`flex items-start gap-3 rounded-lg border p-3 ${c.bg} ${c.border}`}>
                                            <span className={`material-symbols-outlined text-lg ${c.icon}`}>{a.icon}</span>
                                            <div className="flex-1">
                                                <p className={`text-sm font-medium ${c.text}`}>{a.msg}</p>
                                                <p className="text-xs text-slate-400">{a.time}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Uptime last 90 days */}
                        <div className="col-span-12 rounded-xl border border-[#DEE2E6] bg-white p-6 lg:col-span-5">
                            <h3 className="mb-1 text-sm font-semibold text-[#1b1c1c]">Disponibilité — 90 derniers jours</h3>
                            <p className="mb-4 text-xs text-slate-400">Chaque barre = 1 jour</p>
                            <div className="flex flex-wrap gap-0.5">
                                {Array.from({ length: 90 }).map((_, i) => {
                                    const rand = Math.random()
                                    const color = rand > 0.97 ? 'bg-red-400' : rand > 0.93 ? 'bg-yellow-400' : 'bg-green-400'
                                    return <div key={i} className={`h-5 w-2 rounded-sm ${color}`} />
                                })}
                            </div>
                            <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-green-400" />OK</span>
                                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-yellow-400" />Dégradé</span>
                                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-400" />Panne</span>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Disponibilité globale', value: '99.71%', color: 'text-green-600' },
                                    { label: 'Incidents ce mois', value: '2', color: 'text-red-600' },
                                    { label: 'MTTR moyen', value: '18 min', color: 'text-[#1b1c1c]' },
                                    { label: 'SLA contractuel', value: '99.5%', color: 'text-[#1b1c1c]' },
                                ].map((s) => (
                                    <div key={s.label} className="rounded-lg bg-slate-50 p-3">
                                        <p className="text-xs text-slate-500">{s.label}</p>
                                        <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Row 5: Audit log table ── */}
                    <div className="rounded-xl border border-[#DEE2E6] bg-white">
                        <div className="flex items-center justify-between border-b border-[#DEE2E6] p-6">
                            <h3 className="text-sm font-semibold text-[#1b1c1c]">Journal d&apos;audit système</h3>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                                    <span className="material-symbols-outlined text-sm">filter_list</span>
                                    Filtrer
                                </button>
                                <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                                    <span className="material-symbols-outlined text-sm">download</span>
                                    Exporter
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-[#DEE2E6] bg-slate-50 text-xs font-semibold text-slate-500">
                                        <th className="px-6 py-3">Horodatage</th>
                                        <th className="px-6 py-3">Utilisateur</th>
                                        <th className="px-6 py-3">Événement</th>
                                        <th className="px-6 py-3 text-center">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AUDIT_LOGS.map((log, i) => (
                                        <tr key={i} className="border-b border-slate-100 transition-colors hover:bg-slate-50">
                                            <td className="px-6 py-3 text-xs text-slate-400 whitespace-nowrap">{log.time}</td>
                                            <td className="px-6 py-3 font-medium whitespace-nowrap">{log.user}</td>
                                            <td className="px-6 py-3 text-slate-600">{log.action}</td>
                                            <td className="px-6 py-3 text-center">
                                                <span className={`inline-block h-2 w-2 rounded-full ${LOG_DOT[log.type]}`} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="border-t border-[#DEE2E6] p-4 text-center">
                            <button className="text-xs font-bold text-[#0056B3] hover:underline">
                                Voir le journal d&apos;audit complet →
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}
