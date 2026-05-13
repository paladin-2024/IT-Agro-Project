import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Icon from './Icon.jsx'

/**
 * Props
 *  parcelId – current parcel ID; makes Récolte & Rapport links parcel-aware
 */
export default function EmployeeBottomNav({ parcelId }) {
    const { pathname } = useLocation()
    const { logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login', { replace: true })
    }

    const NAV = [
        {
            id: 'dashboard',
            icon: 'assignment',
            label: 'Parcelles',
            to: '/employee/dashboard',
            isActive: (p) => p === '/employee/dashboard',
        },
        {
            id: 'harvest',
            icon: 'add_task',
            label: 'Récolte',
            to: parcelId
                ? `/employee/parcelles/${parcelId}/saisir-recolte`
                : '/employee/saisir-recolte',
            isActive: (p) => p.includes('saisir-recolte'),
        },
        {
            id: 'report',
            icon: 'edit_note',
            label: 'Rapport',
            to: parcelId
                ? `/employee/parcelles/${parcelId}/rapport-quotidien`
                : '/employee/dashboard',
            isActive: (p) => p.includes('rapport-quotidien'),
        },
        {
            id: 'forecast',
            icon: 'query_stats',
            label: 'Prévisions',
            to: parcelId
                ? `/employee/parcelles/${parcelId}/previsions`
                : '/employee/dashboard',
            isActive: (p) => p.includes('previsions'),
        },
        {
            id: 'cultures',
            icon: 'eco',
            label: 'Cultures',
            to: '/employee/cultures',
            isActive: (p) => p === '/employee/cultures',
        },
    ]

    return (
        <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-slate-200 bg-white/95 px-2 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] backdrop-blur-sm md:hidden">
            {NAV.map((item) => {
                const active = item.isActive(pathname)
                return (
                    <Link
                        key={item.id}
                        to={item.to}
                        className={`flex flex-col items-center justify-center rounded-lg px-3 py-1 transition-all ${
                            active ? 'bg-blue-50 text-[#003f87]' : 'text-slate-500 hover:text-[#003f87]'
                        }`}
                    >
                        <Icon name={item.icon} className="h-[22px] w-[22px]" />
                        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider">
                            {item.label}
                        </span>
                    </Link>
                )
            })}
            <button
                onClick={handleLogout}
                className="flex flex-col items-center justify-center rounded-lg px-3 py-1 text-slate-500 transition-all hover:bg-red-50 hover:text-red-600"
            >
                <Icon name="logout" className="h-5 w-5 text-[22px]" />
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider">Quitter</span>
            </button>
        </nav>
    )
}
