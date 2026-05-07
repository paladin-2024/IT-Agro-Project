import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import LeftBanner from '../components/LeftBanner.jsx'
import PageFooter from '../components/PageFooter.jsx'
import logo from '../assets/logo.jpeg'

const API_URL = import.meta.env.VITE_API_URL

const FOOTER_LINKS = [
    { icon: 'help', href: '#', ariaLabel: 'Aide' },
    { icon: 'language', href: '#', ariaLabel: 'Langue' },
    { icon: 'policy', href: '#', ariaLabel: 'Politique de confidentialité' },
]

const AVATAR_URLS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBIQVcS5u52ebVhgBemv1w2Vyue6jzFD35v9Fhk_F_ui6poHB4QmKAGwp4m5CFJawDF1Prxa3jiqQ0o96oPcsddER0kfNPqVG8irGEiM5XN_wALJ2fYd67zPQjjYE3oFtEE7T6XWgZP-G-ysd_JpeeTmo9HUI5-OZYcGqMf7LGYods8dCq45qj4ovF-U7sk_uR4-aFBoJMukB_CF3uuz5Md9GINeytav7JRJ1ymawOy1uBkhpV9zJLgvi26xyGTI2VUjARElJNH34I',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC3oElxHxmHZVlPUF3y49fuwfRUQARw3_ghccNZldYb3E6QMfPpJQmCUFcspXzddOVrQPfpvMMyDxcxt7hroD13h9fy4BbibMDVtgYOXdBjwKvsXIiXgPDOiGqwrRGbENMOP11mi31L_ts_4O0kT4lEo1sWdhG2ZYUkdc6H_vx-eA95RB2fCcK4bYZMORI6shV_20S4xtk25VWe2QcOiN86HtOld285pFwVkuEO0LHEdNw95SaOJgmp1ZSJA4hiuFaigiF7pEwNY10',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCIRbqkXEdsvuofhkVYIYnlFFK2Lnr01bKYSRVbg9ZU3ShM3RjCnXHhMstQvx9wRHNaU0V45zFdh-kDya88YS9pRGYdjC_qRBvHZjAmWx5nfos4gI2SdQTw0nE0cLUSJ62BoWGKk4mD2ojBSSTqwpiZFpFVEi5yZtYzo8GNIBk4897a8Uooi-hC0mSv88ngbYRT3rFn4HzYDqaccVwuCmC9Bng0zMA3vfmyvueZhCWSoaIDY7GVRLTIXVPNV_2iMNQWOgY1vEddYzY',
]

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [form, setForm] = useState({ email: '', password: '', remember: false })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { login, isAuthenticated } = useAuth()

    if (isAuthenticated) return <Navigate to="/dashboard" replace />

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email: form.email, password: form.password, remember: form.remember }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Connexion échouée')
            login(data.user, data.accessToken)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const bannerFooter = (
        <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
                {AVATAR_URLS.map((src, i) => (
                    <img
                        key={i}
                        alt="Profil gestionnaire"
                        className="w-8 h-8 rounded-full border-2 border-primary"
                        src={src}
                    />
                ))}
            </div>
            <span className="text-sm opacity-80">
                Rejoint par plus de 200 gestionnaires à travers la RDC
            </span>
        </div>
    )

    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <main className="w-full grid grid-cols-1 md:grid-cols-2 bg-white min-h-screen">
                <LeftBanner
                    icon="agriculture"
                    title="AgriRDC"
                    subtitle="Hub des plantations RDC : plateforme d'intelligence agricole et de logistique de la chaîne d'approvisionnement."
                    infoIcon="verified_user"
                    infoTitle="Infrastructure sécurisée"
                    infoText="L'accès est réservé aux gestionnaires de plantation et coordinateurs logistiques autorisés. Les identifiants sont gérés par l'administration centrale."
                    footer={bannerFooter}
                />

                <section className="flex flex-col justify-center p-6 md:p-16 bg-white min-h-screen">
                    <div className="max-w-md mx-auto w-full space-y-8">
                        <div className="md:hidden flex flex-col items-center mb-8 space-y-1">

                            <img
                                alt="Logo AgriRDC"
                                src={logo}
                                className="w-32 h-24 object-contain"
                            />
                            <h1 className="text-1xl font-semibold text-primary">AgriRDC</h1>
                            <p className="text-sm text-outline">Hub des plantations RDC</p>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold text-on-surface-variant">Connexion au système</h2>
                            <p className="text-sm text-on-surface-variant">
                                Saisissez vos identifiants professionnels pour accéder au tableau de bord.
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-1">
                                <label htmlFor="email" className="text-sm font-semibold text-on-surface">
                                    Email professionnel
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                                        mail
                                    </span>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        autoComplete="email"
                                        onChange={handleChange}
                                        placeholder="gestionnaire@AgriRDC.cd"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-outline rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="text-sm font-semibold text-on-surface">
                                        Mot de passe
                                    </label>
                                    <Link to="/mot-de-passe-oublie" className="text-sm text-primary hover:underline">
                                        Mot de passe oublié ?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                                        lock
                                    </span>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={form.password}
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-12 py-3 bg-white border border-outline rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(v => !v)}
                                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
                                    >
                                        <span className="material-symbols-outlined">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    checked={form.remember}
                                    onChange={handleChange}
                                    className="w-4 h-4 accent-primary"
                                />
                                <label htmlFor="remember" className="text-sm text-on-surface-variant">
                                    Se souvenir de cet appareil pendant 30 jours
                                </label>
                            </div>

                            {error && (
                                <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-md active:scale-[0.98] disabled:opacity-60"
                            >
                                {loading ? 'Connexion en cours...' : 'Se connecter'}
                            </button>
                        </form>

                        <div className="pt-6 border-t border-outline-variant">
                            <div className="flex flex-col gap-3">
                                <p className="text-sm text-on-surface-variant text-center">
                                    Besoin d&apos;un nouveau compte ou vous avez perdu l&apos;accès ?
                                </p>
                                <Link
                                    to="/contact-admin"
                                    className="w-full py-3 bg-white border border-primary text-primary font-semibold rounded-lg hover:bg-surface-tint transition-colors block text-center"
                                >
                                    Contacter l&apos;administrateur
                                </Link>
                            </div>
                        </div>

                        <PageFooter links={FOOTER_LINKS} />
                    </div>
                </section>
            </main>
        </div>
    )
}
