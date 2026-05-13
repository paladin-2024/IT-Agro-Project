import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar.jsx'
import Icon from '../components/Icon.jsx'

const STATUT_CFG = {
    active: { label: 'Active', bg: 'bg-emerald-100', text: 'text-emerald-700' },
    en_validation: { label: 'En validation', bg: 'bg-amber-100', text: 'text-amber-700' },
    suspendue: { label: 'Suspendue', bg: 'bg-red-100', text: 'text-red-700' },
}

const CULTURES_COLORS = {
    Manioc: 'bg-yellow-100 text-yellow-700',
    Maïs: 'bg-orange-100 text-orange-700',
    Cacao: 'bg-amber-100 text-amber-800',
    Café: 'bg-stone-200 text-stone-700',
    'Palmier à huile': 'bg-lime-100 text-lime-700',
    Riz: 'bg-cyan-100 text-cyan-700',
    Thé: 'bg-green-100 text-green-700',
    Soja: 'bg-teal-100 text-teal-700',
    Quinquina: 'bg-purple-100 text-purple-700',
    Haricots: 'bg-rose-100 text-rose-700',
}

const FERMES = [
    {
        id: 'FRM-001',
        nom: 'Ferme Verte de Matadi',
        proprietaire: 'Jean-Pierre Mukala',
        province: 'Kongo Central',
        superficie: 120,
        cultures: ['Manioc', 'Maïs'],
        employes: 18,
        statut: 'active',
        dateAjout: '2024-03-12',
        telephone: '+243 81 234 5678',
        adresse: 'Route de Matadi, Km 14',
        description: "Grande ferme polyculture au bord du fleuve Congo.",
    },
    {
        id: 'FRM-002',
        nom: 'Plantation Katanga Sud',
        proprietaire: 'Marie Kabila',
        province: 'Haut-Katanga',
        superficie: 340,
        cultures: ['Café', 'Cacao'],
        employes: 45,
        statut: 'active',
        dateAjout: '2024-04-05',
        telephone: '+243 97 654 3210',
        adresse: 'Avenue Lumumba, Lubumbashi',
        description: "Plantation spécialisée en cultures de rente exportées.",
    },
    {
        id: 'FRM-003',
        nom: 'Agro Lualaba',
        proprietaire: 'Paul Mwamba',
        province: 'Lualaba',
        superficie: 85,
        cultures: ['Soja', 'Maïs'],
        employes: 12,
        statut: 'en_validation',
        dateAjout: '2025-01-20',
        telephone: '+243 82 111 9999',
        adresse: 'Kolwezi, Zone industrielle',
        description: "Nouvelle ferme en cours d'homologation administrative.",
    },
    {
        id: 'FRM-004',
        nom: 'Ferme du Kasaï',
        proprietaire: 'Aimée Tshisekedi',
        province: 'Kasaï Oriental',
        superficie: 200,
        cultures: ['Manioc', 'Riz'],
        employes: 30,
        statut: 'active',
        dateAjout: '2023-11-08',
        telephone: '+243 84 777 2222',
        adresse: 'Mbuji-Mayi, Quartier Dibindi',
        description: "Ferme principale de la région Kasaï produisant pour le marché local.",
    },
    {
        id: 'FRM-005',
        nom: 'Jardin des Kivus',
        proprietaire: 'Emmanuel Bisimwa',
        province: 'Sud-Kivu',
        superficie: 60,
        cultures: ['Thé', 'Quinquina'],
        employes: 9,
        statut: 'suspendue',
        dateAjout: '2024-07-15',
        telephone: '+243 89 456 1234',
        adresse: 'Bukavu, Route Panzi',
        description: "Activité suspendue suite à un litige foncier en cours.",
    },
    {
        id: 'FRM-006',
        nom: 'Palmeraie du Maniema',
        proprietaire: 'Claudine Nkutu',
        province: 'Maniema',
        superficie: 480,
        cultures: ['Palmier à huile'],
        employes: 62,
        statut: 'active',
        dateAjout: '2023-06-30',
        telephone: '+243 99 321 8765',
        adresse: 'Kindu, Route nationale 31',
        description: "La plus grande palmeraie enregistrée sur la plateforme AgriRDC.",
    },
    {
        id: 'FRM-007',
        nom: 'Coopérative Butembo',
        proprietaire: 'Honoré Katembo',
        province: 'Nord-Kivu',
        superficie: 95,
        cultures: ['Haricots', 'Maïs'],
        employes: 22,
        statut: 'en_validation',
        dateAjout: '2025-02-18',
        telephone: '+243 81 800 4455',
        adresse: 'Butembo, Avenue des Volcans',
        description: "Coopérative agricole soumise à validation pour accès aux subventions.",
    },
    {
        id: 'FRM-008',
        nom: 'Ferme Équatoriale Gemena',
        proprietaire: 'Rosalie Akamba',
        province: 'Sud-Ubangi',
        superficie: 150,
        cultures: ['Café', 'Riz', 'Manioc'],
        employes: 27,
        statut: 'active',
        dateAjout: '2024-09-01',
        telephone: '+243 90 123 6789',
        adresse: 'Gemena, Quartier Central',
        description: "Ferme mixte bénéficiant d'un programme d'encadrement gouvernemental.",
    },
]

const PROVINCES = [...new Set(FERMES.map((f) => f.province))].sort()

function StatutBadge({ statut }) {
    const cfg = STATUT_CFG[statut] ?? { label: statut, bg: 'bg-slate-100', text: 'text-slate-600' }
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
            {cfg.label}
        </span>
    )
}

function CultureBadge({ culture }) {
    const cls = CULTURES_COLORS[culture] ?? 'bg-slate-100 text-slate-600'
    return (
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
            {culture}
        </span>
    )
}

function InfoRow({ icon, children }) {
    return (
        <div className="flex items-start gap-2 text-sm text-slate-600">
            <Icon name={icon} className="h-5 w-5 mt-0.5 text-slate-400" />
            <span>{children}</span>
        </div>
    )
}

function Detail({ label, children }) {
    return (
        <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
            <dd className="mt-0.5 text-sm text-slate-800">{children}</dd>
        </div>
    )
}

function FermeModal({ ferme, onClose, onValidate }) {
    if (!ferme) return null
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between border-b border-slate-100 p-6">
                    <div>
                        <p className="text-xs font-semibold text-slate-400">{ferme.id}</p>
                        <h2 className="mt-0.5 text-xl font-bold text-slate-800">{ferme.nom}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100"
                    >
                        <Icon name="close" className="h-5 w-5" />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4 p-6">
                    <Detail label="Propriétaire">{ferme.proprietaire}</Detail>
                    <Detail label="Province">{ferme.province}</Detail>
                    <Detail label="Superficie">{ferme.superficie} ha</Detail>
                    <Detail label="Employés">{ferme.employes} personnes</Detail>
                    <Detail label="Statut">
                        <StatutBadge statut={ferme.statut} />
                    </Detail>
                    <Detail label="Date d'ajout">
                        {new Date(ferme.dateAjout).toLocaleDateString('fr-FR')}
                    </Detail>
                    <Detail label="Téléphone">{ferme.telephone}</Detail>
                    <Detail label="Adresse">{ferme.adresse}</Detail>
                    <div className="col-span-2">
                        <Detail label="Cultures">
                            <div className="mt-1 flex flex-wrap gap-1.5">
                                {ferme.cultures.map((c) => (
                                    <CultureBadge key={c} culture={c} />
                                ))}
                            </div>
                        </Detail>
                    </div>
                    {ferme.description && (
                        <div className="col-span-2">
                            <Detail label="Description">{ferme.description}</Detail>
                        </div>
                    )}
                </div>
                <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
                    {ferme.statut === 'en_validation' && (
                        <button
                            onClick={() => onValidate(ferme.id)}
                            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                            <Icon name="check_circle" className="h-5 w-5 text-base" />
                            Valider la ferme
                        </button>
                    )}
                    <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                        <Icon name="edit" className="h-5 w-5 text-base" />
                        Modifier
                    </button>
                    <button
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-sm text-slate-500 transition hover:bg-slate-100"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function AdminFermesGestion() {
    const [search, setSearch] = useState('')
    const [province, setProvince] = useState('')
    const [statut, setStatut] = useState('')
    const [view, setView] = useState('table')
    const [fermes, setFermes] = useState(FERMES)
    const [selected, setSelected] = useState(null)

    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return fermes.filter((f) => {
            const matchQ =
                !q ||
                f.nom.toLowerCase().includes(q) ||
                f.proprietaire.toLowerCase().includes(q) ||
                f.id.toLowerCase().includes(q)
            const matchP = !province || f.province === province
            const matchS = !statut || f.statut === statut
            return matchQ && matchP && matchS
        })
    }, [fermes, search, province, statut])

    const kpiTotal = fermes.length
    const kpiActives = fermes.filter((f) => f.statut === 'active').length
    const kpiValidation = fermes.filter((f) => f.statut === 'en_validation').length
    const kpiSuperficie = fermes.reduce((acc, f) => acc + f.superficie, 0)

    const handleValidate = (id) => {
        setFermes((prev) =>
            prev.map((f) => (f.id === id ? { ...f, statut: 'active' } : f)),
        )
        setSelected((prev) => (prev?.id === id ? { ...prev, statut: 'active' } : prev))
    }

    const handleDelete = (id) => {
        if (!window.confirm('Supprimer cette ferme définitivement ?')) return
        setFermes((prev) => prev.filter((f) => f.id !== id))
        if (selected?.id === id) setSelected(null)
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <AdminSidebar />

            <main className="ml-64 flex-1 overflow-y-auto">
                {/* Header */}
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Gestion des Fermes</h1>
                        <p className="text-sm text-slate-500">Gérez et suivez toutes les fermes enregistrées</p>
                    </div>
                    <Link
                        to="/owner/fermes/creer"
                        className="flex items-center gap-2 rounded-lg bg-[#003f87] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                        <Icon name="add" className="h-5 w-5 text-base" />
                        Nouvelle ferme
                    </Link>
                </header>

                <div className="space-y-8 p-8">
                    {/* KPI cards */}
                    <div className="grid grid-cols-4 gap-5">
                        {[
                            { label: 'Total des fermes', value: kpiTotal, icon: 'agriculture', color: 'text-blue-600', bg: 'bg-blue-50' },
                            {
                                label: 'Fermes actives',
                                value: `${kpiActives} (${Math.round((kpiActives / kpiTotal) * 100)}%)`,
                                icon: 'check_circle',
                                color: 'text-emerald-600',
                                bg: 'bg-emerald-50',
                            },
                            { label: 'En validation', value: kpiValidation, icon: 'pending', color: 'text-amber-600', bg: 'bg-amber-50' },
                            {
                                label: 'Superficie totale',
                                value: `${kpiSuperficie.toLocaleString('fr-FR')} ha`,
                                icon: 'straighten',
                                color: 'text-purple-600',
                                bg: 'bg-purple-50',
                            },
                        ].map((k) => (
                            <div key={k.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{k.label}</p>
                                    <Icon name={k.icon} className={`h-6 w-6 ${k.color}`} />
                                </div>
                                <p className={`mt-3 text-2xl font-bold ${k.color}`}>{k.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative min-w-[220px] flex-1">
                            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Rechercher par nom, propriétaire ou ID…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="field-input pl-9"
                            />
                        </div>
                        <select
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            className="field-input w-auto min-w-[170px]"
                        >
                            <option value="">Toutes les provinces</option>
                            {PROVINCES.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                        <select
                            value={statut}
                            onChange={(e) => setStatut(e.target.value)}
                            className="field-input w-auto min-w-[150px]"
                        >
                            <option value="">Tous les statuts</option>
                            {Object.entries(STATUT_CFG).map(([k, v]) => (
                                <option key={k} value={k}>{v.label}</option>
                            ))}
                        </select>
                        {(search || province || statut) && (
                            <button
                                onClick={() => {
                                    setSearch('')
                                    setProvince('')
                                    setStatut('')
                                }}
                                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100"
                            >
                                <Icon name="close" className="h-5 w-5 text-base" />
                                Réinitialiser
                            </button>
                        )}
                        <div className="ml-auto flex items-center rounded-lg border border-slate-200 bg-white p-1">
                            <button
                                onClick={() => setView('table')}
                                className={`rounded-md p-1.5 transition ${view === 'table' ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                                title="Vue tableau"
                            >
                                <Icon name="table_rows" className="h-5 w-5 text-xl" />
                            </button>
                            <button
                                onClick={() => setView('grid')}
                                className={`rounded-md p-1.5 transition ${view === 'grid' ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                                title="Vue grille"
                            >
                                <Icon name="grid_view" className="h-5 w-5 text-xl" />
                            </button>
                        </div>
                    </div>

                    <p className="text-sm text-slate-500">
                        {filtered.length} ferme{filtered.length !== 1 ? 's' : ''} trouvée{filtered.length !== 1 ? 's' : ''}
                    </p>

                    {/* TABLE VIEW */}
                    {view === 'table' && (
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        <th className="px-6 py-3 text-left">Ferme</th>
                                        <th className="px-4 py-3 text-left">Propriétaire</th>
                                        <th className="px-4 py-3 text-left">Province</th>
                                        <th className="px-4 py-3 text-right">Superficie</th>
                                        <th className="px-4 py-3 text-left">Cultures</th>
                                        <th className="px-4 py-3 text-right">Employés</th>
                                        <th className="px-4 py-3 text-left">Statut</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="py-12 text-center text-slate-400">
                                                <Icon name="search_off" className="h-10 w-10 mb-2 block" />
                                                Aucune ferme ne correspond aux filtres.
                                            </td>
                                        </tr>
                                    )}
                                    {filtered.map((f) => (
                                        <tr key={f.id} className="transition hover:bg-slate-50">
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                                                        <Icon name="agriculture" className="h-5 w-5 text-base text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800">{f.nom}</p>
                                                        <p className="text-xs text-slate-400">{f.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-slate-600">{f.proprietaire}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1 text-slate-600">
                                                    <Icon name="location_on" className="h-4 w-4 text-slate-400" />
                                                    {f.province}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium text-slate-700">{f.superficie} ha</td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap gap-1">
                                                    {f.cultures.map((c) => (
                                                        <CultureBadge key={c} culture={c} />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right text-slate-600">{f.employes}</td>
                                            <td className="px-4 py-3">
                                                <StatutBadge statut={f.statut} />
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => setSelected(f)}
                                                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                                        title="Voir les détails"
                                                    >
                                                        <Icon name="visibility" className="h-5 w-5 text-base" />
                                                    </button>
                                                    <button
                                                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                                        title="Modifier"
                                                    >
                                                        <Icon name="edit" className="h-5 w-5 text-base" />
                                                    </button>
                                                    {f.statut === 'en_validation' && (
                                                        <button
                                                            onClick={() => handleValidate(f.id)}
                                                            className="rounded-md p-1.5 text-amber-500 transition hover:bg-amber-50 hover:text-amber-700"
                                                            title="Valider"
                                                        >
                                                            <Icon name="check_circle" className="h-5 w-5 text-base" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(f.id)}
                                                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                                                        title="Supprimer"
                                                    >
                                                        <Icon name="delete" className="h-5 w-5 text-base" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* GRID VIEW */}
                    {view === 'grid' && (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {filtered.length === 0 && (
                                <div className="col-span-full py-16 text-center text-slate-400">
                                    <Icon name="search_off" className="h-12 w-12 mb-2 block" />
                                    Aucune ferme ne correspond aux filtres.
                                </div>
                            )}
                            {filtered.map((f) => (
                                <div
                                    key={f.id}
                                    className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                                                <Icon name="agriculture" className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800">{f.nom}</p>
                                                <p className="text-xs text-slate-400">{f.id}</p>
                                            </div>
                                        </div>
                                        <StatutBadge statut={f.statut} />
                                    </div>

                                    <div className="space-y-2 px-5 pb-4">
                                        <InfoRow icon="person">{f.proprietaire}</InfoRow>
                                        <InfoRow icon="location_on">{f.province}</InfoRow>
                                        <InfoRow icon="straighten">
                                            {f.superficie} ha · {f.employes} employés
                                        </InfoRow>
                                        <div className="flex flex-wrap gap-1 pt-1">
                                            {f.cultures.map((c) => (
                                                <CultureBadge key={c} culture={c} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 px-5 py-3">
                                        <span className="text-xs text-slate-400">
                                            Ajoutée le {new Date(f.dateAjout).toLocaleDateString('fr-FR')}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setSelected(f)}
                                                className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                                title="Voir les détails"
                                            >
                                                <Icon name="visibility" className="h-5 w-5 text-base" />
                                            </button>
                                            {f.statut === 'en_validation' && (
                                                <button
                                                    onClick={() => handleValidate(f.id)}
                                                    className="rounded-md p-1 text-amber-500 transition hover:bg-amber-50"
                                                    title="Valider"
                                                >
                                                    <Icon name="check_circle" className="h-5 w-5 text-base" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(f.id)}
                                                className="rounded-md p-1 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                                                title="Supprimer"
                                            >
                                                <Icon name="delete" className="h-5 w-5 text-base" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <FermeModal ferme={selected} onClose={() => setSelected(null)} onValidate={handleValidate} />
        </div>
    )
}
