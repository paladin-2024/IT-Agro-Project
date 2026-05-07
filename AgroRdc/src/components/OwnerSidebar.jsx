import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

const navItems = [
    { label: 'Tableau de bord', icon: 'space_dashboard', to: '/owner/dashboard' },
    { label: 'Mes Fermes',      icon: 'agriculture',     to: '/owner/fermes' },
    { label: 'Parcelles',       icon: 'grid_view',       to: '/owner/parcelles' },
    { label: 'Rendements',      icon: 'show_chart',      to: '/owner/analytics' },
    { label: 'Affectation',     icon: 'group',           to: '/owner/affectation' },
]

export default function OwnerSidebar() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-slate-200 bg-slate-50 py-6">
            <div className="mb-8 flex items-center gap-3 px-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#003f87]">
                    <span className="material-symbols-outlined text-white">agriculture</span>
                </div>
                <div>
                    <h1 className="text-xl font-black leading-tight text-blue-800">AgriRDC</h1>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">
                        Espace Propriétaire
                    </p>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-3">
                {navItems.map((item) => {
                    const active = pathname === item.to
                    return (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-all duration-200 ease-in-out ${
                                active
                                    ? 'bg-blue-50 font-semibold text-blue-700'
                                    : 'text-slate-600 hover:text-blue-600'
                            }`}
                        >
                            <span
                                className="material-symbols-outlined"
                                style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
                            >
                                {item.icon}
                            </span>
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-auto space-y-4 px-4">
                <button className="w-full rounded-lg bg-[#003f87] py-2.5 text-sm font-medium text-white transition-all hover:opacity-90">
                    Générer un rapport
                </button>
                <div className="border-t border-slate-200 pt-4">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-200 ease-in-out hover:text-red-600"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span>Déconnexion</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}
