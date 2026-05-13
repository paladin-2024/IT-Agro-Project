import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import OwnerSidebar from '../components/OwnerSidebar'
import { createParcel } from '../api/parcels.js'
import { getFarms } from '../api/farms.js'
import { MOCK_CROPS } from '../api/mocks.js'
import { useAuth } from '../hooks/useAuth.js'
import Icon from '../components/Icon.jsx'

const STATUSES = ['En cours', 'PlantÃ©', 'En Croissance', 'PrÃªt pour rÃ©colte', 'Repos']

export default function OwnerParcelCreatePage() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const { user } = useAuth()

    const farms = getFarms(user?.id || 'owner-001')

    const [name,      setName]      = useState('')
    const [farmId,    setFarmId]    = useState(params.get('farmId') || farms[0]?.id || '')
    const [crop,      setCrop]      = useState(MOCK_CROPS[0].name)
    const [area,      setArea]      = useState('')
    const [status,    setStatus]    = useState('En cours')
    const [plantDate, setPlantDate] = useState('')
    const [location,  setLocation]  = useState('')
    const [error,     setError]     = useState('')
    const [saving,    setSaving]    = useState(false)

    function handleSave() {
        if (!name.trim())  { setError('Le nom de la parcelle est obligatoire.'); return }
        if (!farmId)       { setError('SÃ©lectionnez une ferme.'); return }
        setSaving(true)
        const farm = farms.find(f => f.id === farmId)
        const parcel = createParcel({
            name: name.trim(),
            farmId,
            farm: farm?.name || '',
            crop,
            area: area ? `${area} ha` : '0 ha',
            status,
            plantDate: plantDate || undefined,
            location: location.trim() || undefined,
        })
        navigate(`/owner/parcelles/${parcel.id}`)
    }

    return (
        <div className="min-h-screen bg-[#f4f6f9] text-[#1b1c1c]">
            <OwnerSidebar />

            <main className="ml-64 min-h-screen">
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Link to="/owner/parcelles" className="hover:text-[#003f87] transition-colors">Mes Parcelles</Link>
                        <Icon name="chevron_right" className="h-4 w-4" />
                        <span className="font-semibold text-[#1b1c1c]">Nouvelle Parcelle</span>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/owner/parcelles')}
                            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 rounded-lg bg-[#003f87] px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#002d63] active:scale-95 disabled:opacity-60"
                        >
                            <Icon name="save" className="h-5 w-5 text-base" />
                            {saving ? 'Enregistrementâ€¦' : 'CrÃ©er la Parcelle'}
                        </button>
                    </div>
                </header>

                <div className="mx-auto max-w-3xl p-8 space-y-6">
                    <div>
                        <h1 className="text-lg font-bold text-[#1b1c1c]">CrÃ©er une Nouvelle Parcelle</h1>
                        <p className="mt-0.5 text-xs text-slate-500">
                            Ajoutez une parcelle Ã  l'une de vos fermes et commencez le suivi de la culture.
                        </p>
                    </div>

                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                            {error}
                        </div>
                    )}

                    <div className="rounded-xl bg-white ring-1 ring-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
                            <Icon name="grid_view" className="h-5 w-5 text-base text-[#003f87]" />
                            <h3 className="text-sm font-bold text-[#1b1c1c]">Informations de la Parcelle</h3>
                        </div>
                        <div className="space-y-5 p-5">
                            <Field label="Nom de la Parcelle" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Zone Nord â€” CafÃ©" />

                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Ferme</label>
                                <select
                                    value={farmId}
                                    onChange={e => setFarmId(e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20"
                                >
                                    {farms.map(f => <option key={f.id} value={f.id}>{f.name} â€” {f.province}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Culture</label>
                                    <select
                                        value={crop}
                                        onChange={e => setCrop(e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20"
                                    >
                                        {MOCK_CROPS.map(c => (
                                            <option key={c.id} value={c.name}>{c.name} ({c.variety})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Statut</label>
                                    <select
                                        value={status}
                                        onChange={e => setStatus(e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20"
                                    >
                                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Superficie (Ha)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={area}
                                            onChange={e => setArea(e.target.value)}
                                            placeholder="0.0"
                                            className="w-full rounded-lg border border-slate-200 bg-white p-3 pr-10 text-sm outline-none focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">ha</span>
                                    </div>
                                </div>
                                <Field label="Date de Plantation" type="date" value={plantDate} onChange={e => setPlantDate(e.target.value)} />
                            </div>

                            <Field label="Localisation (optionnel)" value={location} onChange={e => setLocation(e.target.value)} placeholder="Ex: Territoire de Kasangulu, Kongo-Central" />
                        </div>
                    </div>

                    {crop && (
                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                            <div className="flex items-start gap-3">
                                <Icon name="eco" className="h-5 w-5 mt-0.5 shrink-0 text-base text-[#003f87]" />
                                <div>
                                    <p className="text-xs font-bold text-[#003f87]">Culture sÃ©lectionnÃ©e : {crop}</p>
                                    {MOCK_CROPS.find(c => c.name === crop)?.growthDays > 0 && (
                                        <p className="mt-1 text-xs leading-relaxed text-blue-700">
                                            DurÃ©e de croissance estimÃ©e : <strong>{MOCK_CROPS.find(c => c.name === crop)?.growthDays} jours</strong> â€” variÃ©tÃ© {MOCK_CROPS.find(c => c.name === crop)?.variety}.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20 placeholder:text-slate-400"
            />
        </div>
    )
}

