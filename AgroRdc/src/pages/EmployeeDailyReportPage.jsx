import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmployeeTopNav from '../components/EmployeeTopNav.jsx'
import EmployeeBottomNav from '../components/EmployeeBottomNav.jsx'
import { useAuth } from '../hooks/useAuth.js'
import Icon from '../components/Icon.jsx'

const REPORTS_KEY = 'agrordc_daily_reports'

function saveReport(report) {
    try {
        const list = JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]')
        localStorage.setItem(REPORTS_KEY, JSON.stringify([report, ...list]))
    } catch (e) {
        console.warn('Could not save report to localStorage', e)
    }
}

const WEATHER_OPTIONS = [
    { id: 'sunny',  icon: 'wb_sunny', label: 'Soleil'   },
    { id: 'cloudy', icon: 'cloud',    label: 'Nuageux'  },
    { id: 'rainy',  icon: 'rainy',    label: 'Pluie'    },
    { id: 'windy',  icon: 'cyclone',  label: 'Venté'    },
]

const ANOMALY_TAGS = [
    { id: 'insects',   icon: 'pest_control',  label: 'Insectes détectés' },
    { id: 'equipment', icon: 'build',         label: 'Panne matériel'    },
    { id: 'other',     icon: 'priority_high', label: 'Autre problème'    },
]

const SEASON_GOAL_KG = 1200

export default function EmployeeDailyReportPage() {
    const { id: parcelId = 'B-04' } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()

    const [wateringDone, setWateringDone] = useState(false)
    const [endTime,      setEndTime]      = useState('09:15')
    const [volume,       setVolume]       = useState('')
    const [harvestQty,   setHarvestQty]   = useState('')
    const [humidity,     setHumidity]     = useState(42)
    const [weather,      setWeather]      = useState('sunny')
    const [observations, setObservations] = useState('')
    const [activeTags,   setActiveTags]   = useState([])
    const [loading,      setLoading]      = useState(false)
    const [submitted,    setSubmitted]    = useState(false)
    const [urgent,       setUrgent]       = useState(false)

    const toggleTag = (id) =>
        setActiveTags((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        )

    const progressPct = harvestQty
        ? Math.min(Math.round((parseFloat(harvestQty) / SEASON_GOAL_KG) * 100), 100)
        : 68

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            saveReport({
                id: `RPT-${Date.now()}`,
                createdAt: new Date().toISOString(),
                parcelId,
                employeeId: user?.id,
                employeeName: user?.name,
                date: new Date().toISOString().slice(0, 10),
                weather,
                wateringDone,
                wateringEndTime: endTime,
                waterVolumeLitres: volume ? parseFloat(volume) : null,
                harvestQtyKg: harvestQty ? parseFloat(harvestQty) : null,
                soilHumidityPct: humidity,
                observations,
                anomalyTags: activeTags,
                urgent,
            })
            setLoading(false)
            setSubmitted(true)
        }, 900)
    }

    const backPath = `/employee/parcelles/${parcelId}`

    if (submitted) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f9f9ff] px-6">
                <div className="w-full max-w-md rounded-xl border border-emerald-200 bg-white py-16 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                        <Icon name="check_circle" className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#003f87]">Rapport soumis !</h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Le rapport quotidien de la Parcelle {parcelId} a été enregistré.
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                        <button
                            onClick={() => { setSubmitted(false); setHarvestQty(''); setObservations(''); setActiveTags([]) }}
                            className="rounded-lg border border-[#003f87] px-5 py-2.5 text-sm font-bold text-[#003f87] hover:bg-blue-50"
                        >
                            Nouveau Rapport
                        </button>
                        <Link
                            to={backPath}
                            className="rounded-lg bg-[#003f87] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0056b3]"
                        >
                            Retour à la Parcelle
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f9f9ff] text-[#171c25]">
            <EmployeeTopNav
                backTo={backPath}
                backLabel={`Parcelle ${parcelId}`}
                title="Rapport Quotidien"
            />

            <form onSubmit={handleSubmit}>
                <div className="mx-auto max-w-7xl space-y-6 px-6 pb-32 pt-8 md:pb-10">
                    {/* Page title */}
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-[#003f87]">
                                Rapport d&apos;Activité Quotidien
                            </h1>
                            <div className="mt-2 flex items-center gap-3">
                                <span className="rounded bg-[#003f87] px-3 py-1 text-xs font-bold text-white">
                                    Parcelle {parcelId}
                                </span>
                                <span className="flex items-center gap-1 text-sm text-slate-500">
                                    <Icon name="location_on" className="h-4 w-4" />
                                    Zone Sud-Est • Maïs Premium
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                Date de saisie
                            </p>
                            <p className="text-xl font-bold text-[#1b1c1c]">
                                {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {/* Bento grid */}
                    <div className="grid grid-cols-12 gap-6">

                        {/* Watering card */}
                        <div className="col-span-12 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-[#003f87]/40 lg:col-span-4">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-[#1b1c1c]">
                                    <Icon name="water_drop" className="h-5 w-5 text-[#003f87]" />
                                    Arrosage
                                </h3>
                                <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    Tâche Matin
                                </span>
                            </div>

                            <label className="flex cursor-pointer items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4 transition-all hover:bg-white hover:shadow-md">
                                <input
                                    type="checkbox"
                                    checked={wateringDone}
                                    onChange={(e) => setWateringDone(e.target.checked)}
                                    className="h-6 w-6 rounded border-slate-300 accent-[#003f87]"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-[#1b1c1c]">Arrosage effectué</p>
                                    <p className="text-xs text-slate-500">Confirmer la fin du cycle</p>
                                </div>
                            </label>

                            <div className="mt-4 space-y-3">
                                <label className="block">
                                    <span className="text-sm font-semibold text-slate-600">Heure de fin</span>
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-none bg-slate-50 py-3 px-3 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-sm font-semibold text-slate-600">Volume estimé (L)</span>
                                    <input
                                        type="number"
                                        value={volume}
                                        onChange={(e) => setVolume(e.target.value)}
                                        placeholder="ex : 450"
                                        className="mt-1 block w-full rounded-lg border-none bg-slate-50 py-3 px-3 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Production & harvest card */}
                        <div className="col-span-12 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-8">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-[#1b1c1c]">
                                    <Icon name="inventory_2" className="h-5 w-5 text-[#003f87]" />
                                    Production &amp; Récolte
                                </h3>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        Objectif Saison
                                    </p>
                                    <p className="text-lg font-bold text-[#003f87]">1 200 Kg</p>
                                </div>
                            </div>

                            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
                                    <span className="mb-2 block text-sm font-bold text-[#003f87]">
                                        Quantité récoltée aujourd&apos;hui
                                    </span>
                                    <div className="flex items-end gap-2">
                                        <input
                                            type="number"
                                            value={harvestQty}
                                            onChange={(e) => setHarvestQty(e.target.value)}
                                            placeholder="0.0"
                                            className="w-full rounded-lg border-none bg-white p-4 text-2xl font-bold text-[#003f87] outline-none focus:ring-2 focus:ring-[#003f87]/30"
                                        />
                                        <span className="pb-4 text-xl font-bold text-[#003f87]/70">Kg</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="mb-2 flex items-end justify-between">
                                        <span className="text-sm font-bold text-[#1b1c1c]">
                                            Progrès vs Objectif
                                        </span>
                                        <span className="text-xl font-black text-[#003f87]">{progressPct}%</span>
                                    </div>
                                    <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className="h-full rounded-full bg-[#003f87] transition-all duration-500"
                                            style={{ width: `${progressPct}%` }}
                                        />
                                    </div>
                                    <p className="mt-3 text-xs italic text-slate-400">
                                        En avance de 4% sur les prévisions saisonnières
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Environmental state card + map */}
                        <div className="col-span-12 space-y-6 lg:col-span-5">
                            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                {/* Background icon */}
                                <div className="pointer-events-none absolute right-4 top-4 text-slate-100">
                                    <Icon name="thermostat" className="h-5 w-5 text-[72px]" />
                                </div>
                                <h3 className="relative mb-6 flex items-center gap-2 text-lg font-bold text-[#1b1c1c]">
                                    <Icon name="cloud_sync" className="h-5 w-5 text-[#003f87]" />
                                    État Environnemental
                                </h3>
                                <div className="relative z-10 space-y-5">
                                    {/* Humidity slider */}
                                    <div>
                                        <div className="mb-2 flex justify-between">
                                            <span className="text-sm font-bold text-[#1b1c1c]">
                                                Humidité estimée du sol
                                            </span>
                                            <span className="text-sm font-bold text-[#003f87]">{humidity}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={humidity}
                                            onChange={(e) => setHumidity(Number(e.target.value))}
                                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-100 accent-[#003f87]"
                                        />
                                    </div>

                                    {/* Weather picker */}
                                    <div>
                                        <span className="mb-2 block text-sm font-bold text-[#1b1c1c]">
                                            Observations météo
                                        </span>
                                        <div className="grid grid-cols-4 gap-2">
                                            {WEATHER_OPTIONS.map((w) => (
                                                <button
                                                    key={w.id}
                                                    type="button"
                                                    onClick={() => setWeather(w.id)}
                                                    className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition-all ${
                                                        weather === w.id
                                                            ? 'border-[#003f87] bg-blue-50'
                                                            : 'border-slate-200 hover:border-[#003f87]/40 hover:bg-blue-50/50'
                                                    }`}
                                                >
                                                    <Icon name={w.icon} className={`h-6 w-6 ${weather === w.id ? 'text-[#003f87]' : 'text-slate-400'}`} />
                                                    <span className={`text-[10px] font-bold ${weather === w.id ? 'text-[#003f87]' : 'text-slate-500'}`}>
                                                        {w.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map snippet */}
                            <div className="relative h-48 overflow-hidden rounded-xl border border-slate-200">
                                <img
                                    alt="Vue satellite parcelle"
                                    className="h-full w-full object-cover opacity-60 grayscale"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAuskXs1gYAWdcmK28-rQNstlMwFh5BMXDDvML-aGpHeA3XHkkf91htur0PfhHZpgifxOUh_hH50RR0HQTFhrlpfTijkPLrLvgTGH_E4ZqdO1FhwBrorApaELIGWR79DzMB0o44keXJBem3fG7_8u8VNUG96UFCT8jDAYABLxUDf6LFZbgPWgAL41Dh9FKncNVGm7Mqu9XImJinkXUB1KBqikwLI56sst_OwDm0TsMiymtyN4UrBzAjYmwqOtmB7STm_EXmhTD4RM"
                                />
                                <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 p-3 shadow-lg backdrop-blur-sm">
                                    <p className="text-xs font-bold text-[#003f87]">Signal GPS : Fort</p>
                                    <p className="text-[10px] text-slate-500">-11.6607, 27.4794</p>
                                </div>
                            </div>
                        </div>

                        {/* Observations & anomalies card */}
                        <div className="col-span-12 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-[#1b1c1c]">
                                    <Icon name="visibility" className="h-5 w-5 text-[#003f87]" />
                                    Observations &amp; Anomalies
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setUrgent((v) => !v)}
                                    className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                                        urgent ? 'text-[#b6171e]' : 'text-slate-400 hover:text-[#b6171e]'
                                    }`}
                                >
                                    <Icon name="warning" className="h-5 w-5" />
                                    Signaler Urgent
                                </button>
                            </div>

                            {urgent && (
                                <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-[#b6171e]">
                                    <Icon name="warning" className="h-[18px] w-[18px]" />
                                    Ce rapport sera marqué comme urgent et transmis au superviseur.
                                </div>
                            )}

                            <p className="mb-4 text-sm text-slate-500">
                                Notez tout problème constaté (ravageurs, pannes d&apos;équipement, état des plants).
                            </p>

                            <textarea
                                value={observations}
                                onChange={(e) => setObservations(e.target.value)}
                                rows={6}
                                placeholder="Décrivez vos observations ici..."
                                className="w-full resize-none rounded-lg border-none bg-slate-50 p-4 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30 placeholder:text-slate-400"
                            />

                            {/* Anomaly tag chips */}
                            <div className="mt-5 flex flex-wrap gap-3">
                                {ANOMALY_TAGS.map((tag) => (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        onClick={() => toggleTag(tag.id)}
                                        className={`flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                                            activeTags.includes(tag.id)
                                                ? 'bg-[#003f87] text-white'
                                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                        }`}
                                    >
                                        <Icon name={tag.icon} className="h-4 w-4" />
                                        {tag.label}
                                    </button>
                                ))}
                            </div>

                            {/* Submit row */}
                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate(backPath)}
                                    className="rounded-lg bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-200"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-lg bg-[#003f87] px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#0056b3] active:scale-95 disabled:opacity-60"
                                >
                                    {loading ? 'Envoi…' : 'Soumettre le Rapport'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 md:flex-row">
                        <p className="text-xs text-slate-400">
                            © 2024 AgriPrecise RDC • Système de Gestion Opérationnelle v2.4.1
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-xs font-bold text-[#003f87]">Guide de l&apos;employé</a>
                            <a href="#" className="text-xs font-bold text-[#003f87]">Politique de sécurité</a>
                        </div>
                    </div>
                </div>
            </form>

            <EmployeeBottomNav parcelId={parcelId} />
        </div>
    )
}
