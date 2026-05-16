import { useState, useMemo } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import EmployeeSidebar from '../components/EmployeeSidebar.jsx'
import { getHarvestById } from '../api/harvests.js'
import Icon from '../components/Icon.jsx'

// eslint-disable-next-line no-unused-vars
const TABS = ['Aperçu', 'Calendrier', 'Intrants', 'Rendement']

const INFO_CARDS = [
    {
        icon: 'grass',
        label: 'Type de Culture',
        value: 'Maïs Hybride',
        sub: 'Variété: MH-402 High Yield',
    },
    {
        icon: 'calendar_month',
        label: 'Date de Récolte',
        value: '14 Nov 2023',
        sub: 'Heure: 08:30 GMT+1',
    },
    {
        icon: 'inventory',
        label: 'Conditionnement',
        value: '84 Sacs',
        sub: 'Poids/Sac: ~50 kg',
    },
]

const TIMELINE = [
    {
        icon: 'check_circle',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-700',
        title: 'Approuvé par Direction',
        date: "Aujourd'hui, 10:45",
        avatarBg: 'bg-blue-100',
        avatarText: 'SM',
        person: 'Sarah Maloba (Directrice)',
    },
    {
        icon: 'rate_review',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-700',
        title: 'Enregistrement Validé',
        date: '14 Nov 2023, 16:20',
        avatarBg: 'bg-red-100',
        avatarText: 'JM',
        person: 'Jean-Pierre Mukeba (Field Supervisor)',
    },
    {
        icon: 'add_circle',
        iconBg: 'bg-slate-100',
        iconColor: 'text-slate-500',
        title: 'Production Créée',
        date: '14 Nov 2023, 08:45',
        note: 'Créé via Terminal Mobile #TM-02',
    },
]

export default function EmployeeProductionDetailPage() {
    // eslint-disable-next-line no-unused-vars
    const [activeTab, setActiveTab] = useState('Aperçu')
    const { id } = useParams()
    const { state } = useLocation()
    const recordId = id || 'PRD-2023-084'
    const harvest  = useMemo(() => getHarvestById(id), [id])
    const parcelId = state?.parcelId || harvest?.parcelId || 'B-04'

    return (
        <div className="min-h-screen bg-[#f9f9ff] text-[#171c25]">
            <EmployeeSidebar />

            <main className="ml-64 space-y-6 px-8 pt-8 pb-10">
                {/* Title row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-4">
                            <h3 className="text-4xl font-black text-[#003f87] tracking-tight">
                                #{recordId}
                            </h3>
                            <span className="rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                                Validé
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                            <Icon name="download" className="h-[18px] w-[18px]" />
                            Télécharger Reçu
                        </button>
                        <Link
                            to={`/employee/productions/${recordId}/modifier`}
                            className="flex items-center gap-2 rounded-lg bg-[#003f87] px-4 py-2 text-sm font-bold text-white transition-all hover:bg-[#0056b3]"
                        >
                            <Icon name="edit" className="h-[18px] w-[18px]" />
                            Modifier
                        </Link>
                    </div>
                </div>

                {/* Bento grid */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Hero metric */}
                    <div className="col-span-12 md:col-span-4 relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="pointer-events-none absolute -right-4 -top-4 text-[#003f87] opacity-10">
                            <Icon name="scale" className="h-5 w-5" />
                        </div>
                        <div className="relative z-10">
                            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                                Quantité Récoltée
                            </p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-[#003f87]">
                                    {harvest?.quantity ?? '4.2'}
                                </span>
                                <span className="text-2xl font-bold text-[#003f87] opacity-70">
                                    {harvest?.unit ?? 'Tonnes'}
                                </span>
                            </div>
                            <div className="mt-4 flex w-fit items-center gap-2 rounded bg-emerald-50 px-2 py-1 text-emerald-600">
                                <Icon name="trending_up" className="h-4 w-4" />
                                <span className="text-xs font-semibold">+12% vs prévisions</span>
                            </div>
                        </div>
                    </div>

                    {/* 3 info cards */}
                    <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {INFO_CARDS.map((card) => (
                            <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#003f87]">
                                    <Icon name={card.icon} className="h-5 w-5" />
                                </div>
                                <p className="mb-1 text-xs text-slate-500">{card.label}</p>
                                <p className="text-lg font-bold text-[#1b1c1c]">{card.value}</p>
                                <p className="mt-1 text-xs text-slate-400">{card.sub}</p>
                            </div>
                        ))}
                    </div>

                    {/* Origin Parcel + Map */}
                    <div className="col-span-12 md:col-span-8 flex flex-col md:flex-row overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        {/* Left: details */}
                        <div className="space-y-6 p-8 md:w-1/2">
                            <div>
                                <h5 className="mb-1 text-lg font-bold text-[#003f87]">Parcelle d&apos;Origine</h5>
                                <p className="text-sm text-slate-500">
                                    Détails géographiques et techniques de la zone de production.
                                </p>
                            </div>
                            <div className="space-y-0">
                                {[
                                    { label: 'Nom de Parcelle',    value: 'Parcelle B-04' },
                                    { label: 'Superficie Totale',  value: '12.4 Ha' },
                                    { label: 'Localisation',       value: 'Kongo-Central, RDC' },
                                ].map((row, i, arr) => (
                                    <div
                                        key={row.label}
                                        className={`flex items-center justify-between py-3 ${
                                            i < arr.length - 1 ? 'border-b border-slate-100' : ''
                                        }`}
                                    >
                                        <span className="text-sm text-slate-500">{row.label}</span>
                                        <span className="text-sm font-bold text-[#1b1c1c]">{row.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link
                                    to={`/employee/parcelles/${parcelId}`}
                                    className="block w-full rounded-lg border border-[#003f87] px-4 py-3 text-center text-sm font-bold text-[#003f87] transition-colors hover:bg-blue-50"
                                >
                                    Voir détails de la parcelle
                                </Link>
                                <Link
                                    to={`/employee/parcelles/${parcelId}/previsions`}
                                    className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#003f87] px-4 py-3 text-center text-sm font-bold text-white transition-all hover:bg-[#0056b3]"
                                >
                                    <Icon name="query_stats" className="h-4 w-4" />
                                    Prévisions de Rendement
                                </Link>
                            </div>
                        </div>

                        {/* Right: satellite map */}
                        <div className="relative min-h-[280px] md:w-1/2">
                            <img
                                alt="Vue satellite parcelle B-04, Kongo-Central"
                                className="h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBSbZMlXVEr7aMAowa1i0sdrDj17rxk4605-qP0D7TBkSAITyYAzfIkcznL1K7A5o6LSBm2DV7QWQcc2TyrMCFdG0deZ7wBN2LA1FH3l5F6ihJ-6nD9rtL1W72D2zEhb3Bqvpg5LKs5alqXetEbgRkRgKllovqPFoBnw3m7J7OCylx99HyEUZDb3K5rzXx4I1ehIE-7pX38sDd2X8vo1BYLBZ6J1gaqZ7ub05ckfMitiUvgu7W8d-zujjaZ65oVeyKtwASFMK7JV8"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-[#003f87]/10" />
                            <div className="absolute right-4 top-4 rounded-lg bg-white p-2 shadow-lg">
                                <Icon name="layers" className="h-5 w-5 text-[#003f87]" />
                            </div>
                            <div className="absolute bottom-4 left-4 rounded-lg border border-[#003f87]/20 bg-white/90 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#003f87] backdrop-blur">
                                COORD: 5.1234° S, 13.5678° E
                            </div>
                        </div>
                    </div>

                    {/* Validation timeline */}
                    <div className="col-span-12 md:col-span-4 space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h5 className="text-lg font-bold text-[#003f87]">Historique de Validation</h5>

                        <div className="relative space-y-8 before:absolute before:bottom-2 before:left-4 before:top-2 before:w-px before:bg-slate-200">
                            {TIMELINE.map((item) => (
                                <div key={item.title} className="relative pl-10">
                                    <div
                                        className={`absolute left-0 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white ${item.iconBg}`}
                                    >
                                        <Icon name={item.icon} className={`h-4 w-4 ${item.iconColor}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#1b1c1c]">{item.title}</p>
                                        <p className="text-xs text-slate-400">{item.date}</p>
                                        {item.person && (
                                            <div className="mt-2 flex items-center gap-2 rounded border border-slate-100 bg-slate-50 p-2">
                                                <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${item.avatarBg}`}>
                                                    {item.avatarText}
                                                </div>
                                                <span className="text-xs text-slate-700">{item.person}</span>
                                            </div>
                                        )}
                                        {item.note && (
                                            <p className="mt-1 text-xs italic text-slate-400">{item.note}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-slate-100 pt-4">
                            <button className="flex items-center gap-2 text-sm font-semibold text-[#003f87] hover:underline">
                                <Icon name="history" className="h-[18px] w-[18px]" />
                                Voir le log complet
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-6 text-[11px] font-medium uppercase tracking-widest text-slate-400">
                    <span>Identifiant Système: UUID-8492-AX-2023</span>
                    <span>Dernière modification: 15 Nov 2023 10:45</span>
                    <span>AgriPrecise v4.2.0</span>
                </div>
            </main>

        </div>
    )
}
