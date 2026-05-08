import { Link, useLocation } from 'react-router-dom'

/**
 * Props
 *  parcelId – current parcel ID; makes Récolte & Rapport links parcel-aware
 */
export default function EmployeeBottomNav({ parcelId }) {
    const { pathname } = useLocation()

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
                        <span
                            className="material-symbols-outlined text-[22px]"
                            style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                        >
                            {item.icon}
                        </span>
                        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider">
                            {item.label}
                        </span>
                    </Link>
                )
            })}
        </nav>
    )
}
