import { useParams } from 'react-router-dom'
import EmployeeTopNav from '../components/EmployeeTopNav.jsx'
import EmployeeBottomNav from '../components/EmployeeBottomNav.jsx'
import Icon from '../components/Icon.jsx'

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

export default function EmployeeParcelTeamPage() {
    const { id: parcelId = 'B-04' } = useParams()

    return (
        <div className="min-h-screen bg-[#f9f9ff] text-[#171c25]">
            <EmployeeTopNav
                backTo={`/employee/parcelles/${parcelId}`}
                backLabel={`Parcelle ${parcelId}`}
                title="Personnel Assigné"
            />

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
                        <Icon name="info" className="h-4 w-4" />
                        <span>Affectation mise à jour il y a 2 jours</span>
                    </div>
                    <span>{TEAM.length} Affectations au Total</span>
                </div>
            </main>

            <EmployeeBottomNav parcelId={parcelId} />
        </div>
    )
}
