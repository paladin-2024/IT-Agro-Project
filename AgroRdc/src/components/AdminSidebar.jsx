import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import Icon from './Icon.jsx'

const navItems = [
    { label: 'Tableau de bord', icon: 'space_dashboard', to: '/dashboard' },
    { label: 'Utilisateurs',    icon: 'group',           to: '/utilisateurs' },
    { label: 'Fermes',          icon: 'agriculture',     to: '/fermes' },
    { label: 'Santé du système',icon: 'monitor_heart',   to: '/sante-systeme' },
    { label: 'Paramètres',      icon: 'settings',        to: '/parametres' },
]

export default function AdminSidebar() {
    const { logout } = useAuth()
    const navigate   = useNavigate()
    const { pathname } = useLocation()

    const handleLogout = () => { logout(); navigate('/login') }

    return (
        <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border bg-white py-6">
            <div className="mb-8 flex items-center gap-3 px-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Icon name="agriculture" className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                    <h1 className="text-xl font-black leading-tight text-primary">AgriRDC</h1>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Administration</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-3">
                {navItems.map((item) => {
                    const active = pathname === item.to
                    return (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                active
                                    ? 'bg-accent font-semibold text-accent-foreground'
                                    : 'text-muted-foreground hover:text-primary'
                            }`}
                        >
                            <Icon name={item.icon} className="h-5 w-5" />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-auto space-y-4 px-4">
                <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary-hover">
                    Générer un rapport
                </button>
                <div className="border-t border-border pt-4">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-destructive"
                    >
                        <Icon name="logout" className="h-5 w-5" />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}
