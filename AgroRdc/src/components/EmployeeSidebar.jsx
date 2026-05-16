import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import Icon from './Icon.jsx'
import logo from '../assets/logo.png'

const navItems = [
    { label: 'Tableau de bord', icon: 'space_dashboard', to: '/employee/dashboard' },
    { label: 'Cultures',        icon: 'eco',             to: '/employee/cultures'  },
    { label: 'Saisir Récolte',  icon: 'add_task',        to: '/employee/saisir-recolte' },
]

export default function EmployeeSidebar() {
    const { logout } = useAuth()
    const navigate   = useNavigate()
    const { pathname } = useLocation()

    const handleLogout = () => { logout(); navigate('/login') }

    function isActive(to) {
        if (to === '/employee/dashboard')
            return pathname === to || pathname.startsWith('/employee/parcelles')
        return pathname === to || pathname.startsWith(to)
    }

    return (
        <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border bg-white py-6">
            <div className="mb-8 px-5">
                <img src={logo} alt="AgriRDC" className="h-12 w-auto object-contain" />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Espace Employé</p>
                <div className="mt-4 border-t border-border" />
            </div>

            <nav className="flex-1 space-y-1 px-3">
                {navItems.map((item) => {
                    const active = isActive(item.to)
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
                <Link
                    to="/employee/saisir-recolte"
                    className="block w-full rounded-lg bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground transition-all hover:bg-primary-hover"
                >
                    Saisir une Récolte
                </Link>
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
