import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Icon from './Icon.jsx'

const DESKTOP_NAV = [
    { to: '/employee/dashboard', icon: 'assignment',   label: 'Parcelles'  },
    { to: '/employee/cultures',  icon: 'eco',          label: 'Cultures'   },
    { to: '/employee/saisir-recolte', icon: 'add_task', label: 'Récolte'  },
]

/**
 * Props
 *  backTo    – path for the ← back chevron (omit on dashboard)
 *  backLabel – text next to the arrow
 *  title     – bold page title shown after the breadcrumb
 *  badge     – optional chip next to the title
 *  children  – extra action buttons placed between title and icons
 */
export default function EmployeeTopNav({ backTo, backLabel, title, badge, children }) {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    function handleLogout() {
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
            {/* ── Left: logo + breadcrumb ───────────────────────────── */}
            <div className="flex min-w-0 items-center gap-2 overflow-hidden">
                {/* Logo — always a link to the dashboard */}
                <Link
                    to="/employee/dashboard"
                    className="flex shrink-0 items-center gap-2 rounded-lg px-1 py-1 transition-colors hover:bg-slate-100"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#003f87]">
                        <Icon name="agriculture" className="h-[18px] w-[18px] text-white" />
                    </div>
                    <span className="hidden text-base font-black text-[#003f87] sm:block">AgriRDC</span>
                </Link>

                {/* Back crumb */}
                {backTo && (
                    <>
                        <span className="shrink-0 text-slate-300">/</span>
                        <Link
                            to={backTo}
                            className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-slate-500 transition-colors hover:text-[#003f87]"
                        >
                            <Icon name="arrow_back" className="h-4 w-4" />
                            <span className="hidden sm:block">{backLabel || 'Retour'}</span>
                        </Link>
                    </>
                )}

                {/* Current page title */}
                {title && (
                    <>
                        <span className="shrink-0 text-slate-300">/</span>
                        <div className="flex min-w-0 items-center gap-2 overflow-hidden">
                            <span className="truncate text-sm font-bold text-[#1b1c1c]">{title}</span>
                            {badge && (
                                <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-[#003f87]">
                                    {badge}
                                </span>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* ── Center: desktop nav (hidden on mobile) ───────────── */}
            <nav className="hidden items-center gap-1 md:flex">
                {DESKTOP_NAV.map(item => {
                    const active = pathname === item.to || (item.to !== '/employee/dashboard' && pathname.startsWith(item.to))
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                                active
                                    ? 'bg-blue-50 text-[#003f87]'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-[#003f87]'
                            }`}
                        >
                            <Icon name={item.icon} className="h-[18px] w-[18px]" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* ── Right: actions + icons ────────────────────────────── */}
            <div className="flex shrink-0 items-center gap-1 md:gap-2">
                {children}
                <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#003f87]">
                    <Icon name="notifications" className="h-5 w-5" />
                </button>
                <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#003f87]">
                    <Icon name="account_circle" className="h-5 w-5" />
                </button>
                <button
                    onClick={handleLogout}
                    title="Se déconnecter"
                    className="rounded-full p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                    <Icon name="logout" className="h-5 w-5" />
                </button>
            </div>
        </div>
        </header>
    )
}
