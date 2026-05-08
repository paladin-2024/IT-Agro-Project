import { Link, useParams } from 'react-router-dom'

const TEAM = [
    {
        initials: 'JM',
        name: 'Jeanine Mukenga',
        department: 'AgriPrecise — Personnel Senior',
        role: 'Agronome Principal',
        status: 'active',
    },
    {
        initials: 'SK',
        name: 'Samuel Kabwe',
        department: 'Division Technique',
        role: 'Spécialiste Irrigation',
        status: 'active',
    },
    {
        initials: 'LM',
        name: 'Lydia Mwamba',
        department: "Équipe Opérations",
        role: 'Technicien de Terrain',
        status: 'offsite',
    },
]

const STATUS = {
    active:  { dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-800',  label: 'Actif'    },
    offsite: { dot: 'bg-amber-400',   badge: 'bg-amber-50 text-amber-800',      label: 'Hors-site' },
    inactive:{ dot: 'bg-slate-300',   badge: 'bg-slate-100 text-slate-500',     label: 'Inactif'  },
}

const NAV_ITEMS = [
    { icon: 'assignment', label: 'Missions' },
    { icon: 'group',      label: 'Équipe',   active: true },
    { icon: 'map',        label: 'Carte'     },
    { icon: 'person',     label: 'Profil'    },
]

export default function EmployeeParcelTeamPage() {
    const { id: parcelId = 'B-04' } = useParams()

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
                    <div className="h-4 w-px bg-slate-200" />
                    <h2 className="text-lg font-black text-[#003f87]">Personnel Assigné</h2>
                </div>
                <div className="flex items-center gap-3">
                    <button className="rounded-full p-2 text-slate-500 hover:text-[#003f87] transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <button className="rounded-full p-2 text-slate-500 hover:text-[#003f87] transition-colors">
                        <span className="material-symbols-outlined">help_outline</span>
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-3xl space-y-6 px-6 pb-32 pt-8 md:pb-10">
                {/* Page title */}
                <div>
                    <h1 className="text-3xl font-black text-[#003f87]">
                        Collègues assignés — Parcelle {parcelId}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Personnel actif gérant les opérations en cours sur la Parcelle {parcelId}.
                    </p>
                </div>

                {/* Team table card */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70">
                                {['Membre', 'Rôle', 'Statut'].map((h) => (
                                    <th
                                        key={h}
                                        className="px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {TEAM.map((member) => {
                                const s = STATUS[member.status]
                                return (
                                    <tr
                                        key={member.name}
                                        className="transition-colors hover:bg-slate-50/60"
                                    >
                                        {/* Member */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-[#003f87]">
                                                    {member.initials}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#1b1c1c]">
                                                        {member.name}
                                                    </p>
                                                    <p className="text-xs text-slate-400">{member.department}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {member.role}
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                                                <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${s.badge}`}>
                                                    {s.label}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer meta */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">info</span>
                        <span>Affectation mise à jour il y a 2 jours</span>
                    </div>
                    <span>{TEAM.length} Affectations au Total</span>
                </div>
            </main>

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
