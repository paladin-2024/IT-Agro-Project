import AdminSidebar from '../components/AdminSidebar.jsx'

export default function AdminUsersPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#1b1c1c]">
            <AdminSidebar />

            <main className="ml-64 min-h-screen">
                {/* Topbar — sticky inside main, consistent with other pages */}
                <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-8">
                    <div className="flex flex-1 items-center max-w-xl">
                        <div className="relative w-full">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Rechercher un utilisateur, une ferme ou un ID..."
                                className="w-full rounded-lg border-none bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#003f87]"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-50">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-[#b6171e]" />
                        </button>
                        <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-50">
                            <span className="material-symbols-outlined">help_outline</span>
                        </button>
                        <div className="mx-2 h-8 w-px bg-slate-200" />
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-xs font-bold leading-none text-slate-900">Admin DRC</p>
                                <p className="text-[10px] text-slate-500">Super Admin</p>
                            </div>
                            <img
                                alt="Profil administrateur"
                                className="h-10 w-10 rounded-full border-2 border-[#d7e2ff] object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR2XXUjANDOWwaW6JNv451XHbuPZ3b9FPv8u0uCQLTJHKK5lzqK4mlWrlQpPh3xcytgc5j-MAyZ5_R7DyQhbSD5KIvVThGi9ypYXoil-U6sx9vH7-fhCxIuBpO4UUZdAMwbiZ-poPo3Zjo9kxAFRYHdLITTk5uKzVpjghsCqWuGEGuCUpCaHoop4JNDC4SIZuZqZSIAhl9qyxeZKiYFdlT0ICp4bI9vs5c3z1wyS9s2mPQhWyImTr2xoBKNEb1-h3Di73WwBVMbVM"
                            />
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {/* Page title */}
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="mb-1 text-3xl font-bold text-[#003f87]">
                                Gestion des utilisateurs
                            </h2>
                            <p className="text-sm text-slate-500">
                                Administrez les accès système et les relations propriétaires-employés.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 rounded-lg border border-[#003f87] px-4 py-2 text-sm font-medium text-[#003f87] transition-colors hover:bg-blue-50">
                                <span className="material-symbols-outlined text-sm">file_download</span>
                                Exporter la liste
                            </button>
                            <button className="flex items-center gap-2 rounded-lg bg-[#003f87] px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0056b3]">
                                <span className="material-symbols-outlined text-sm">person_add</span>
                                Nouvel utilisateur
                            </button>
                        </div>
                    </div>

                    {/* KPI cards */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <StatCard title="Total utilisateurs" value="1 284" icon="group" iconBg="bg-blue-50" iconText="text-[#003f87]" />
                        <StatCard title="Actifs" value="1 120" icon="verified" iconBg="bg-green-50" iconText="text-green-600" />
                        <StatCard title="Propriétaires" value="86" icon="store" iconBg="bg-orange-50" iconText="text-orange-600" />
                        <StatCard title="Suspendus" value="14" icon="block" iconBg="bg-red-50" iconText="text-red-600" />
                    </div>

                    {/* Admins table */}
                    <section>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#003f87]">shield_person</span>
                            <h3 className="text-xl font-semibold text-slate-900">Administrateurs système</h3>
                        </div>
                        <div className="overflow-hidden rounded-xl border border-[#DEE2E6] bg-white">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-[#DEE2E6] bg-slate-50">
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Utilisateur</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Rôle</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Email</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Dernière connexion</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Statut</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F1F3F5]">
                                    <UserRow
                                        initials="MK"
                                        name="Mbuyi Kabongo"
                                        id="ADM-001"
                                        role="Super Admin"
                                        email="m.kabongo@agrodirect.cd"
                                        lastLogin="Il y a 12 min"
                                        status="actif"
                                    />
                                    <UserRow
                                        initials="SL"
                                        name="Sarah Lukusa"
                                        id="ADM-002"
                                        role="Analyste Système"
                                        email="s.lukusa@agrodirect.cd"
                                        lastLogin="Hier, 16:45"
                                        status="actif"
                                        alt
                                    />
                                    <UserRow
                                        initials="PN"
                                        name="Pascal Ngoy"
                                        id="ADM-003"
                                        role="Modérateur"
                                        email="p.ngoy@agrodirect.cd"
                                        lastLogin="Il y a 3 jours"
                                        status="suspendu"
                                    />
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Owners + employees */}
                    <section>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#003f87]">agriculture</span>
                            <h3 className="text-xl font-semibold text-slate-900">Propriétaires et leurs employés</h3>
                        </div>
                        <div className="space-y-5">
                            <OwnerCard
                                icon="store"
                                owner="Jean-Pierre Siku"
                                farm="Ferme de Kasangulu"
                                employees="8 employés"
                                employeesRows={[
                                    { name: 'Alain Mundele', role: 'Chef de culture', contact: 'a.mundele@kasangulu.farm', status: 'en ligne' },
                                    { name: 'Blandine Zola', role: 'Logistique & Transport', contact: 'b.zola@kasangulu.farm', status: 'hors ligne' },
                                ]}
                                moreText="Voir les 6 autres employés"
                            />
                            <OwnerCard
                                icon="warehouse"
                                owner="Marie-Louise Kasa"
                                farm="Plantation de Kisantu"
                                employees="3 employés"
                                employeesRows={[
                                    { name: 'David Mwamba', role: 'Superviseur de récolte', contact: 'd.mwamba@kisantu.co', status: 'en ligne' },
                                    { name: 'Hélène Bokolo', role: 'Comptable ferme', contact: 'h.bokolo@kisantu.co', status: 'suspendu' },
                                ]}
                            />
                            <OwnerCard
                                icon="grass"
                                owner="Cédric Kalombo"
                                farm="Agro-Katanga Sud"
                                employees="5 employés"
                                employeesRows={[
                                    { name: 'Élise Tshimanga', role: 'Ingénieure agronome', contact: 'e.tshimanga@katanga.cd', status: 'en ligne' },
                                    { name: 'Rodrigue Mbayo', role: 'Chauffeur-livreur', contact: 'r.mbayo@katanga.cd', status: 'hors ligne' },
                                ]}
                                moreText="Voir les 3 autres employés"
                            />
                        </div>
                    </section>
                </div>
            </main>

            {/* FAB */}
            <div className="fixed bottom-8 right-8 z-50">
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#003f87] text-white shadow-lg transition-transform hover:scale-110 active:scale-95">
                    <span className="material-symbols-outlined text-2xl">add</span>
                </button>
            </div>
        </div>
    )
}

/* ── Sub-components ── */

function StatCard({ title, value, icon, iconBg, iconText }) {
    return (
        <div className="flex items-center gap-4 rounded-xl border border-[#DEE2E6] bg-white p-5">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBg}`}>
                <span className={`material-symbols-outlined text-2xl ${iconText}`}>{icon}</span>
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
        </div>
    )
}

const STATUS_CONFIG = {
    actif:      { dot: 'bg-green-500', badge: 'bg-green-100 text-green-800', label: 'Actif' },
    'en ligne': { dot: 'bg-green-500', badge: 'bg-green-100 text-green-800', label: 'En ligne' },
    'hors ligne': { dot: 'bg-slate-300', badge: 'bg-slate-100 text-slate-600', label: 'Hors ligne' },
    suspendu:   { dot: 'bg-red-500',   badge: 'bg-red-100 text-red-700',     label: 'Suspendu' },
    'en attente': { dot: 'bg-yellow-400', badge: 'bg-yellow-100 text-yellow-700', label: 'En attente' },
}

function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG['hors ligne']
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
        </span>
    )
}

function UserRow({ initials, name, id, role, email, lastLogin, status = 'actif', alt = false }) {
    return (
        <tr className={`${alt ? 'bg-slate-50/40' : ''} transition-colors hover:bg-slate-50`}>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-[#003f87]">
                        {initials}
                    </div>
                    <div>
                        <p className="font-medium text-slate-900">{name}</p>
                        <p className="text-xs text-slate-400">ID : {id}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-slate-600">{role}</td>
            <td className="px-6 py-4 text-sm text-slate-600">{email}</td>
            <td className="px-6 py-4 text-sm text-slate-500">{lastLogin}</td>
            <td className="px-6 py-4">
                <StatusBadge status={status} />
            </td>
            <td className="px-6 py-4">
                <div className="flex justify-end gap-1">
                    <button className="rounded p-1.5 text-slate-400 transition-colors hover:bg-blue-50 hover:text-[#003f87]">
                        <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="rounded p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-[#b6171e]">
                        <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    )
}

function OwnerCard({ icon, owner, farm, employees, employeesRows, moreText }) {
    return (
        <div className="overflow-hidden rounded-xl border border-[#DEE2E6] bg-white">
            <div className="flex items-center justify-between border-b border-[#DEE2E6] bg-slate-50 px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#003f87]/10 text-[#003f87]">
                        <span className="material-symbols-outlined">{icon}</span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900">{owner}</h4>
                        <p className="text-sm text-slate-500">
                            {farm} <span className="mx-1.5 text-slate-300">•</span>
                            <span className="font-medium text-[#003f87]">{employees}</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-bold uppercase text-blue-700">
                        Propriétaire
                    </span>
                    <div className="h-6 w-px bg-slate-200" />
                    <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-white hover:shadow-sm">
                        Gérer la ferme
                    </button>
                    <button className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-[#003f87]">
                        <span className="material-symbols-outlined text-lg">more_vert</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-100 bg-white">
                        <tr>
                            <th className="px-8 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Employé</th>
                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Rôle</th>
                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Contact</th>
                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Statut</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {employeesRows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                                <td className="px-8 py-3.5">
                                    <p className="font-medium text-slate-900">{row.name}</p>
                                </td>
                                <td className="px-6 py-3.5 text-sm italic text-slate-500">{row.role}</td>
                                <td className="px-6 py-3.5 text-sm text-slate-600">{row.contact}</td>
                                <td className="px-6 py-3.5">
                                    <StatusBadge status={row.status} />
                                </td>
                                <td className="px-6 py-3.5 text-right">
                                    <button className="text-sm font-medium text-[#003f87] hover:underline">Modifier</button>
                                    <button className="ml-4 text-sm font-medium text-[#b6171e] hover:underline">
                                        {row.status === 'suspendu' ? 'Réactiver' : 'Retirer'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {moreText && (
                <div className="border-t border-slate-100 bg-slate-50/50 px-8 py-3 text-center">
                    <button className="mx-auto flex items-center justify-center gap-1 text-sm font-medium text-[#003f87] transition-all hover:gap-2">
                        <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                        {moreText}
                    </button>
                </div>
            )}
        </div>
    )
}
