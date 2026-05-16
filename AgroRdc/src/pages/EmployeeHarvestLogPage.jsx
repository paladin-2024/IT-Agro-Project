import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmployeeSidebar from '../components/EmployeeSidebar.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createHarvest } from '../api/harvests.js'
import Icon from '../components/Icon.jsx'

const PARCELS = [
    { id: 'B-04', label: 'Parcelle B-04 — Vallée Est',   crop: 'Café (Arabica)' },
    { id: 'A-12', label: 'Parcelle A-12 — Hautes Pentes', crop: 'Maïs Hybride'   },
    { id: 'C-09', label: 'Parcelle C-09 — Plateau Nord',  crop: 'Soja Prima'     },
]

const UNITS = ['Sac 50 kg', 'Tonne', 'Kg (Vrac)', 'Caisse']

const RECENT = [
    { qty: '240 kg Café', parcel: 'B-04', note: 'Moulin à sec', when: 'Hier' },
    { qty: '185 kg Café', parcel: 'B-04', note: 'Moulin à sec', when: 'Il y a 2 jours' },
]

export default function EmployeeHarvestLogPage() {
    const { id: urlParcelId } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()

    const defaultParcel = PARCELS.find((p) => p.id === urlParcelId) || PARCELS[0]

    const [selectedParcel, setSelectedParcel] = useState(defaultParcel)
    const [form, setForm] = useState({
        quantity: '',
        unit: UNITS[0],
        date: '',
        observations: '',
    })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleParcelChange = (e) => {
        const found = PARCELS.find((p) => p.id === e.target.value)
        if (found) setSelectedParcel(found)
    }

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await createHarvest({
                parcelId: selectedParcel.id,
                quantity: form.quantity,
                unit: form.unit,
                date: form.date,
                observations: form.observations,
                employeeId: user?.id,
                employeeName: user?.name,
            })
            setSubmitted(true)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const backPath = urlParcelId
        ? `/employee/parcelles/${urlParcelId}`
        : '/employee/dashboard'

    return (
        <div className="min-h-screen bg-[#f9f9ff] text-[#171c25]">
            <EmployeeSidebar />

            <main className="ml-64 px-8 pt-8 pb-10">
                {/* Page title */}
                <div className="mb-8">
                    <nav className="mb-2 flex items-center gap-1 text-xs text-slate-400">
                        <span>Opérations</span>
                        <Icon name="chevron_right" className="h-3.5 w-3.5" />
                        <span>Récolte</span>
                        <Icon name="chevron_right" className="h-3.5 w-3.5" />
                        <span className="font-semibold text-[#003f87]">Nouvelle Entrée</span>
                    </nav>
                    <h1 className="text-3xl font-black tracking-tight text-[#003f87]">
                        Saisir une Production
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Enregistrez les données de récolte quotidiennes pour les secteurs de la Province Est.
                    </p>
                </div>

                {submitted ? (
                    /* Success state */
                    <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-200 bg-white py-20 text-center shadow-sm">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                            <Icon name="check_circle" className="h-10 w-10 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-[#003f87]">Enregistrement soumis !</h3>
                        <p className="mt-2 text-sm text-slate-500">
                            La récolte pour la Parcelle {selectedParcel.id} a été enregistrée avec succès.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => { setSubmitted(false); setForm({ quantity: '', unit: UNITS[0], date: '', observations: '' }) }}
                                className="rounded-lg border border-[#003f87] px-5 py-2.5 text-sm font-bold text-[#003f87] transition-colors hover:bg-blue-50"
                            >
                                Nouvelle Saisie
                            </button>
                            <Link
                                to={backPath}
                                className="rounded-lg bg-[#003f87] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#0056b3]"
                            >
                                Retour à la Parcelle
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-12 gap-6">
                        {/* Left: form */}
                        <div className="col-span-12 lg:col-span-8">
                            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Row 1: parcel + crop */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="mb-2 block text-sm font-semibold text-slate-600">
                                                Sélection de la Parcelle
                                            </label>
                                            <div className="relative">
                                                <select
                                                    className="w-full appearance-none rounded-lg bg-slate-50 py-3 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30"
                                                    value={selectedParcel.id}
                                                    onChange={handleParcelChange}
                                                >
                                                    {PARCELS.map((p) => (
                                                        <option key={p.id} value={p.id}>{p.label}</option>
                                                    ))}
                                                </select>
                                                <Icon name="expand_more" className="h-5 w-5 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            </div>
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="mb-2 block text-sm font-semibold text-slate-600">
                                                Type de Culture
                                            </label>
                                            <input
                                                readOnly
                                                className="w-full cursor-not-allowed rounded-lg bg-slate-100 py-3 px-4 text-sm font-medium text-slate-500 outline-none"
                                                value={selectedParcel.crop}
                                                type="text"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: quantity + unit */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="mb-2 block text-sm font-semibold text-slate-600">
                                                Quantité Récoltée
                                            </label>
                                            <input
                                                name="quantity"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={form.quantity}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                required
                                                className="w-full rounded-lg bg-slate-50 py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30"
                                            />
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className="mb-2 block text-sm font-semibold text-slate-600">
                                                Unité de Mesure
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="unit"
                                                    value={form.unit}
                                                    onChange={handleChange}
                                                    className="w-full appearance-none rounded-lg bg-slate-50 py-3 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30"
                                                >
                                                    {UNITS.map((u) => (
                                                        <option key={u}>{u}</option>
                                                    ))}
                                                </select>
                                                <Icon name="expand_more" className="h-5 w-5 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                                            Date de Récolte
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="date"
                                                type="date"
                                                value={form.date}
                                                onChange={handleChange}
                                                required
                                                className="w-full rounded-lg bg-slate-50 py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30"
                                            />
                                            <Icon name="calendar_today" className="h-5 w-5 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        </div>
                                    </div>

                                    {/* Observations */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                                            Observations
                                        </label>
                                        <textarea
                                            name="observations"
                                            value={form.observations}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Notez les conditions météo, la qualité de la récolte ou les problèmes d'équipement…"
                                            className="w-full resize-none rounded-lg bg-slate-50 py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30"
                                        />
                                    </div>

                                    {error && (
                                        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                            {error}
                                        </p>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-4 pt-2">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 rounded-xl bg-[#003f87] py-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0056b3] active:scale-[0.98] disabled:opacity-60"
                                        >
                                            {loading ? 'Envoi en cours…' : "Soumettre l'Enregistrement"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => navigate(backPath)}
                                            className="rounded-xl border border-slate-200 px-8 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>

                        {/* Right: context */}
                        <div className="col-span-12 space-y-6 lg:col-span-4">
                            {/* Parcel insights — dark blue */}
                            <div className="relative overflow-hidden rounded-xl bg-[#003f87] p-6 text-white shadow-lg">
                                <div className="relative z-10">
                                    <h3 className="mb-4 text-lg font-bold">Données de la Parcelle</h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Total Récolté (Mois)',  value: '12.4 Tonnes' },
                                            { label: 'Travailleurs Actifs',   value: '8 Membres'  },
                                            { label: 'Hydratation du Sol',    value: '64% (Optimal)' },
                                        ].map((row, i, arr) => (
                                            <div
                                                key={row.label}
                                                className={`flex items-center justify-between py-2 ${
                                                    i < arr.length - 1 ? 'border-b border-white/20' : ''
                                                }`}
                                            >
                                                <span className="text-sm opacity-70">{row.label}</span>
                                                <span className="text-sm font-bold">{row.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6">
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                                            <div className="h-full w-[72%] rounded-full bg-amber-300" />
                                        </div>
                                        <p className="mt-2 text-[12px] text-white/80">
                                            72% de l'objectif saisonnier atteint
                                        </p>
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute -bottom-8 -right-8 opacity-10">
                                    <Icon name="eco" className="h-5 w-5" />
                                </div>
                            </div>

                            {/* Map preview */}
                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                <div className="h-48 w-full bg-slate-200">
                                    <img
                                        alt="Vue satellite parcelle"
                                        className="h-full w-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWniRsPJ3lM7NjCGbpA5EuYAo38SI5nPlaz34U4BgCNbadaq5hoRKimxwWtFvW4hrDw2IZPFJ-f98I4piM5NUxBkUFbBjfNk7sAzUID6R8eQF58SaCjWVYmE3F21Y6Smzx6o3TltN84L9EK-PpZ67rMKw_RhAJMRaWFXOG4ssotyWbZ9ZP37i2KYnk10yL0jgMYF-gHjzj9ZpWY2JOv_5GvaLis-9VvXnxbE79ONJ1HVmTcdP_meY8zp1FTOLiJgldOxMd9iRhK9Y"
                                    />
                                </div>
                                <div className="flex items-center justify-between p-4">
                                    <div>
                                        <p className="text-sm font-bold text-[#003f87]">
                                            Parcelle {selectedParcel.id}
                                        </p>
                                        <p className="text-xs text-slate-500">2.4 Hectares • Plateau</p>
                                    </div>
                                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-[#003f87] hover:bg-slate-100">
                                        <Icon name="map" className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Recent harvests */}
                            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#003f87]">
                                    Récoltes Récentes
                                </h4>
                                <div className="space-y-4">
                                    {RECENT.map((r) => (
                                        <div key={r.when} className="flex items-start gap-3">
                                            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-800">
                                                <Icon name="check_circle" className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-semibold text-[#1b1c1c]">{r.qty}</p>
                                                    <p className="text-[10px] font-medium uppercase text-slate-400">{r.when}</p>
                                                </div>
                                                <p className="text-xs text-slate-500">
                                                    Parcelle {r.parcel} • {r.note}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    to={`/employee/parcelles/${selectedParcel.id}`}
                                    className="mt-6 block w-full rounded-lg border border-[#003f87]/20 py-2 text-center text-sm font-bold text-[#003f87] transition-colors hover:bg-blue-50"
                                >
                                    Voir tous les journaux
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>

        </div>
    )
}
