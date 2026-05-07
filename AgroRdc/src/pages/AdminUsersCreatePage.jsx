import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar.jsx'

const INITIAL_FORM = {
    fullname: '',
    email: '',
    password: '',
    role: '',
    farm: '',
}

export default function AdminUsersCreatePage() {
    const [form, setForm] = useState(INITIAL_FORM)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const validate = () => {
        const next = {}
        if (!form.fullname.trim()) next.fullname = 'Le nom complet est requis.'
        if (!form.email.trim()) next.email = "L'adresse email est requise."
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Adresse email invalide.'
        if (!form.password) next.password = 'Le mot de passe temporaire est requis.'
        else if (form.password.length < 8) next.password = 'Minimum 8 caractères requis.'
        if (!form.role) next.role = 'Veuillez sélectionner un rôle.'
        return next
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const next = validate()
        if (Object.keys(next).length) { setErrors(next); return }
        setLoading(true)
        // Simulate API call
        await new Promise(r => setTimeout(r, 1000))
        setLoading(false)
        setSuccess(true)
        setTimeout(() => navigate('/utilisateurs'), 1500)
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#1b1c1c]">
            <AdminSidebar />

            <main className="ml-64 min-h-screen">
                {/* Topbar — consistent with other admin pages */}
                <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-8">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/utilisateurs')}
                            className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[#003f87] transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            Utilisateurs
                        </button>
                        <span className="text-slate-300">/</span>
                        <span className="text-sm font-semibold text-[#003f87]">Nouvel utilisateur</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-56 rounded-lg border-none bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#003f87]"
                            />
                        </div>
                        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-50">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-[#b6171e]" />
                        </button>
                        <button className="rounded-full p-2 text-slate-500 hover:bg-slate-50">
                            <span className="material-symbols-outlined">help_outline</span>
                        </button>
                        <img
                            alt="Profil administrateur"
                            className="h-9 w-9 rounded-full border-2 border-[#003f87]/20 object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEBtwNSRqpVUC3K8SFbc04wjgNvQVdTzKAUkyxRDgUDJNqn9yeeKswN-cVyl7IjURgYmrxQbg7y01YMdmhYA4gBxtlx2cY14X3ejdCRX56MXGQgVThygA9Qv3VF-FM9ajiX5qxxF4oMCtmnqsbTRxaRUryssNam8Z2zifaFjvfmPYxB-N5vy62yJKNffR_XKBV9MN6ZOP-c7YjYpxp2_Iu0dYwJyuyWchVjer40W_2y8Fpf1XbSmqr7ws8lgI7X8b1S-Ugtq8gWtU"
                        />
                    </div>
                </header>

                <section className="flex min-h-[calc(100vh-4rem)] items-start justify-center p-8">
                    <div className="w-full max-w-2xl">
                        {/* Page heading */}
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-[#002a5d]">Ajouter un nouvel utilisateur</h2>
                            <p className="mt-1 text-sm text-[#434751]">
                                Configurez les identifiants et les permissions d&apos;accès pour un nouveau collaborateur.
                            </p>
                        </div>

                        {/* Success banner */}
                        {success && (
                            <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4">
                                <span className="material-symbols-outlined text-green-600">check_circle</span>
                                <p className="text-sm font-medium text-green-800">
                                    Utilisateur créé avec succès. Redirection en cours…
                                </p>
                            </div>
                        )}

                        <div className="overflow-hidden rounded-xl border border-[#DEE2E6] bg-white shadow-sm">
                            <form className="p-8 space-y-6" onSubmit={handleSubmit} noValidate>

                                {/* Full name */}
                                <Field
                                    label="Nom complet"
                                    id="fullname"
                                    name="fullname"
                                    icon="person"
                                    placeholder="Jean-Pierre Kabila"
                                    type="text"
                                    value={form.fullname}
                                    onChange={handleChange}
                                    error={errors.fullname}
                                />

                                {/* Email */}
                                <Field
                                    label="Adresse email"
                                    id="email"
                                    name="email"
                                    icon="mail"
                                    placeholder="jp.kabila@agriprecise.cd"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-[#1b1c1c]" htmlFor="password">
                                        Mot de passe temporaire
                                    </label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={form.password}
                                            onChange={handleChange}
                                            className={`w-full rounded-lg border bg-[#F8FAFC] py-3 pl-12 pr-12 text-sm outline-none transition-all focus:ring-2 focus:ring-[#003f87] ${errors.password ? 'border-red-400' : 'border-slate-200'}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(v => !v)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#002a5d]"
                                        >
                                            <span className="material-symbols-outlined">
                                                {showPassword ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-xs font-medium text-red-600">{errors.password}</p>}
                                    <p className="text-xs text-slate-400">Minimum 8 caractères. L&apos;utilisateur devra le modifier à la première connexion.</p>
                                </div>

                                {/* Role + Farm */}
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <SelectField
                                        label="Rôle"
                                        id="role"
                                        name="role"
                                        icon="badge"
                                        value={form.role}
                                        onChange={handleChange}
                                        error={errors.role}
                                        options={[
                                            { value: '', label: 'Sélectionner un rôle' },
                                            { value: 'administrator', label: 'Administrateur' },
                                            { value: 'proprietor', label: 'Propriétaire' },
                                            { value: 'employee', label: 'Employé' },
                                            { value: 'analyst', label: 'Analyste système' },
                                        ]}
                                    />
                                    <SelectField
                                        label="Ferme / Exploitation (optionnel)"
                                        id="farm"
                                        name="farm"
                                        icon="landscape"
                                        value={form.farm}
                                        onChange={handleChange}
                                        options={[
                                            { value: '', label: 'Aucune' },
                                            { value: 'lualaba-1', label: 'Exploitation Lualaba A1' },
                                            { value: 'haut-katanga-v2', label: 'Vallée Haut-Katanga V2' },
                                            { value: 'kasai-east', label: 'Secteur Kasaï Oriental' },
                                            { value: 'kasangulu', label: 'Ferme de Kasangulu' },
                                            { value: 'kisantu', label: 'Plantation de Kisantu' },
                                        ]}
                                    />
                                </div>

                                {/* Actions */}
                                <div className="border-t border-slate-100 pt-6 flex flex-col gap-3 sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        disabled={loading || success}
                                        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#003f87] py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0056b3] active:scale-[0.98] disabled:opacity-60"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                                Création en cours…
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-lg">person_add</span>
                                                Ajouter l&apos;utilisateur
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/utilisateurs')}
                                        className="flex-1 rounded-lg border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 active:scale-[0.98]"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>

                            {/* Info banner */}
                            <div className="flex items-start gap-3 border-t border-slate-100 bg-blue-50/60 px-8 py-4">
                                <span className="material-symbols-outlined mt-0.5 text-[#003f87]">info</span>
                                <p className="text-xs leading-relaxed text-[#434751]">
                                    Le nouvel utilisateur recevra un email d&apos;activation contenant ses identifiants temporaires.
                                    Il sera invité à modifier son mot de passe lors de sa première connexion.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

/* ── Sub-components ── */

function Field({ label, id, name, icon, placeholder, type, value, onChange, error }) {
    return (
        <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1b1c1c]" htmlFor={id}>
                {label}
            </label>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
                <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full rounded-lg border bg-[#F8FAFC] py-3 pl-12 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-[#003f87] ${error ? 'border-red-400' : 'border-slate-200'}`}
                />
            </div>
            {error && <p className="text-xs font-medium text-red-600">{error}</p>}
        </div>
    )
}

function SelectField({ label, id, name, icon, options, value, onChange, error }) {
    return (
        <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1b1c1c]" htmlFor={id}>
                {label}
            </label>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full appearance-none rounded-lg border bg-[#F8FAFC] py-3 pl-12 pr-10 text-sm outline-none transition-all focus:ring-2 focus:ring-[#003f87] ${error ? 'border-red-400' : 'border-slate-200'}`}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">expand_more</span>
            </div>
            {error && <p className="text-xs font-medium text-red-600">{error}</p>}
        </div>
    )
}
