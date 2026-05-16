import { useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import EmployeeSidebar from '../components/EmployeeSidebar.jsx'
import { getHarvestById, updateHarvest } from '../api/harvests.js'
import Icon from '../components/Icon.jsx'

const UNITS = ['Sac 50 kg', 'Tonne', 'Kg (Vrac)', 'Caisse']

const schema = z.object({
    quantity: z
        .string()
        .min(1, 'La quantité est requise')
        .refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0, 'Entrez une quantité valide'),
    unit: z.enum(['Sac 50 kg', 'Tonne', 'Kg (Vrac)', 'Caisse']),
    date: z.string().min(1, 'La date est requise'),
    observations: z.string().optional(),
})

export default function EmployeeProductionEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const harvest  = useMemo(() => getHarvestById(id), [id])
    const notFound = !harvest
    const [submitted, setSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: harvest ? {
            quantity:     String(harvest.quantity),
            unit:         harvest.unit ?? UNITS[0],
            date:         harvest.date ?? '',
            observations: harvest.observations ?? '',
        } : {},
    })

    const onSubmit = async (data) => {
        setSubmitError('')
        try {
            await updateHarvest(id, data)
            setSubmitted(true)
        } catch (err) {
            setSubmitError(err.message)
        }
    }

    const backTo = `/employee/productions/${id}`

    if (notFound) {
        return (
            <div className="min-h-screen bg-[#f9f9ff]">
                <EmployeeSidebar />
                <div className="ml-64 flex flex-col items-center justify-center py-24 text-center px-6">
                    <Icon name="error_outline" className="h-12 w-12 text-slate-300" />
                    <p className="mt-4 text-lg font-bold text-slate-600">Production introuvable</p>
                    <p className="mt-1 text-sm text-slate-400">
                        L&apos;identifiant <strong>{id}</strong> ne correspond à aucun enregistrement local.
                    </p>
                </div>
            </div>
        )
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#f9f9ff]">
                <EmployeeSidebar />
                <div className="ml-64 mx-6 mt-10 flex flex-col items-center justify-center rounded-xl border border-emerald-200 bg-white py-20 text-center shadow-sm">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                        <Icon name="check_circle" className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#003f87]">Modifications enregistrées !</h3>
                    <p className="mt-2 text-sm text-slate-500">
                        La production <strong>#{id}</strong> a été mise à jour avec succès.
                    </p>
                    <button
                        onClick={() => navigate(backTo)}
                        className="mt-6 rounded-lg bg-[#003f87] px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#0056b3]"
                    >
                        Voir la production
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f9f9ff] text-[#171c25]">
            <EmployeeSidebar />

            <main className="ml-64 px-8 pt-8 pb-10">
                {/* Breadcrumb + title */}
                <div className="mb-8">
                    <nav className="mb-2 flex items-center gap-1 text-xs text-slate-400">
                        <span>Productions</span>
                        <Icon name="chevron_right" className="h-3.5 w-3.5" />
                        <span className="font-semibold text-[#003f87]">Modifier #{id}</span>
                    </nav>
                    <h1 className="text-3xl font-black tracking-tight text-[#003f87]">
                        Modifier la Production
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Parcelle <strong>{harvest?.parcelId ?? '…'}</strong> — mettez à jour les données de récolte.
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* ── Form ── */}
                    <div className="col-span-12 lg:col-span-8">
                        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Quantity + Unit */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2 md:col-span-1">
                                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                                            Quantité Récoltée
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder="0.00"
                                            {...register('quantity')}
                                            className="w-full rounded-lg bg-slate-50 py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30"
                                        />
                                        {errors.quantity && (
                                            <p className="mt-1 text-xs text-red-600">{errors.quantity.message}</p>
                                        )}
                                    </div>

                                    <div className="col-span-2 md:col-span-1">
                                        <label className="mb-2 block text-sm font-semibold text-slate-600">
                                            Unité de Mesure
                                        </label>
                                        <div className="relative">
                                            <select
                                                {...register('unit')}
                                                className="w-full appearance-none rounded-lg bg-slate-50 py-3 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30"
                                            >
                                                {UNITS.map((u) => <option key={u}>{u}</option>)}
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
                                            type="date"
                                            {...register('date')}
                                            className="w-full rounded-lg bg-slate-50 py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30"
                                        />
                                        <Icon name="calendar_today" className="h-5 w-5 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                    {errors.date && (
                                        <p className="mt-1 text-xs text-red-600">{errors.date.message}</p>
                                    )}
                                </div>

                                {/* Observations */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                                        Observations
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Conditions météo, qualité de la récolte, problèmes rencontrés…"
                                        {...register('observations')}
                                        className="w-full resize-none rounded-lg bg-slate-50 py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#003f87]/30"
                                    />
                                </div>

                                {submitError && (
                                    <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                        {submitError}
                                    </p>
                                )}

                                {/* Actions */}
                                <div className="flex gap-4 pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 rounded-xl bg-[#003f87] py-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0056b3] active:scale-[0.98] disabled:opacity-60"
                                    >
                                        {isSubmitting ? 'Enregistrement…' : 'Enregistrer les Modifications'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate(backTo)}
                                        className="rounded-xl border border-slate-200 px-8 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>

                    {/* ── Metadata sidebar ── */}
                    <div className="col-span-12 space-y-4 lg:col-span-4">
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#003f87]">
                                Informations
                            </h4>
                            <dl className="space-y-3 text-sm">
                                {[
                                    { label: 'Identifiant', value: id },
                                    { label: 'Parcelle',    value: harvest?.parcelId ?? '—' },
                                    { label: 'Employé',     value: harvest?.employeeName ?? '—' },
                                    {
                                        label: 'Créé le',
                                        value: harvest?.createdAt
                                            ? new Date(harvest.createdAt).toLocaleDateString('fr-CD', {
                                                day: 'numeric', month: 'short', year: 'numeric',
                                              })
                                            : '—',
                                    },
                                ].map((row) => (
                                    <div
                                        key={row.label}
                                        className="flex justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                                    >
                                        <dt className="text-slate-500">{row.label}</dt>
                                        <dd className="font-semibold text-[#1b1c1c]">{row.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                            <div className="flex items-start gap-2">
                                <Icon name="info" className="h-4 w-4 mt-0.5 text-amber-600" />
                                <p className="text-xs text-amber-800">
                                    Les modifications sont enregistrées localement et soumises à validation par le superviseur.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}
