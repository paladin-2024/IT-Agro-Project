import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../contexts/AuthContext.jsx'
import LeftBanner from '../components/LeftBanner.jsx'
import PageFooter from '../components/PageFooter.jsx'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import logo from '../assets/logo.jpeg'
import Icon from '../components/Icon.jsx'

const API_URL = import.meta.env.VITE_API_URL

const FOOTER_LINKS = [
    { icon: 'help',   href: '#', ariaLabel: 'Aide' },
    { icon: 'language', href: '#', ariaLabel: 'Langue' },
    { icon: 'policy', href: '#', ariaLabel: 'Politique de confidentialité' },
]

const AVATAR_URLS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBIQVcS5u52ebVhgBemv1w2Vyue6jzFD35v9Fhk_F_ui6poHB4QmKAGwp4m5CFJawDF1Prxa3jiqQ0o96oPcsddER0kfNPqVG8irGEiM5XN_wALJ2fYd67zPQjjYE3oFtEE7T6XWgZP-G-ysd_JpeeTmo9HUI5-OZYcGqMf7LGYods8dCq45qj4ovF-U7sk_uR4-aFBoJMukB_CF3uuz5Md9GINeytav7JRJ1ymawOy1uBkhpV9zJLgvi26xyGTI2VUjARElJNH34I',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC3oElxHxmHZVlPUF3y49fuwfRUQARw3_ghccNZldYb3E6QMfPpJQmCUFcspXzddOVrQPfpvMMyDxcxt7hroD13h9fy4BbibMDVtgYOXdBjwKvsXIiXgPDOiGqwrRGbENMOP11mi31L_ts_4O0kT4lEo1sWdhG2ZYUkdc6H_vx-eA95RB2fCcK4bYZMORI6shV_20S4xtk25VWe2QcOiN86HtOld285pFwVkuEO0LHEdNw95SaOJgmp1ZSJA4hiuFaigiF7pEwNY10',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCIRbqkXEdsvuofhkVYIYnlFFK2Lnr01bKYSRVbg9ZU3ShM3RjCnXHhMstQvx9wRHNaU0V45zFdh-kDya88YS9pRGYdjC_qRBvHZjAmWx5nfos4gI2SdQTw0nE0cLUSJ62BoWGKk4mD2ojBSSTqwpiZFpFVEi5yZtYzo8GNIBk4897a8Uooi-hC0mSv88ngbYRT3rFn4HzYDqaccVwuCmC9Bng0zMA3vfmyvueZhCWSoaIDY7GVRLTIXVPNV_2iMNQWOgY1vEddYzY',
]

const loginSchema = z.object({
    email:    z.string().email('Adresse email invalide'),
    password: z.string().min(1, 'Le mot de passe est requis'),
    remember: z.boolean().optional(),
})

export default function LoginPage() {
    const navigate = useNavigate()
    const { login, isAuthenticated, user } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '', remember: false },
    })

    if (isAuthenticated) {
        const dest = user?.role === 'owner'    ? '/owner/dashboard'
                   : user?.role === 'employee' ? '/employee/dashboard'
                   : '/dashboard'
        return <Navigate to={dest} replace />
    }

    const onSubmit = async ({ email, password, remember }) => {
        try {
            if (!API_URL) {
                const mockUsers = {
                    'owner@agrordc.cd':    { id: 'usr-owner-1', role: 'owner',    name: 'Kabangu Mulumba' },
                    'admin@agrordc.cd':    { id: 'usr-admin-1', role: 'admin',    name: 'Administrateur' },
                    'employee@agrordc.cd': { id: 'emp-001',     role: 'employee', name: 'Samuel Mwamba' },
                }
                const mockUser = mockUsers[email]
                if (!mockUser || password !== 'password') {
                    setError('root', { message: 'Email ou mot de passe incorrect (mode dev)' })
                    return
                }
                login(mockUser, 'dev-token')
                const dest = mockUser.role === 'owner' ? '/owner/dashboard'
                           : mockUser.role === 'employee' ? '/employee/dashboard'
                           : '/dashboard'
                navigate(dest)
                return
            }
            const res  = await fetch(`${API_URL}/api/auth/login`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password, remember }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Connexion échouée')
            login(data.user, data.accessToken)
            const role = data.user?.role
            navigate(role === 'owner' ? '/owner/dashboard' : role === 'employee' ? '/employee/dashboard' : '/dashboard')
        } catch (err) {
            setError('root', { message: err.message })
        }
    }

    const bannerFooter = (
        <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
                {AVATAR_URLS.map((src, i) => (
                    <img key={i} alt="Profil gestionnaire" className="w-8 h-8 rounded-full border-2 border-primary" src={src} />
                ))}
            </div>
            <span className="text-sm opacity-80">Rejoint par plus de 200 gestionnaires à travers la RDC</span>
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
                    infoText="L'accès est réservé aux gestionnaires de plantation et coordinateurs logistiques autorisés."
                    footer={bannerFooter}
                />

                <section className="flex flex-col justify-center p-6 md:p-16 bg-white min-h-screen">
                    <div className="max-w-md mx-auto w-full space-y-8">
                        <div className="md:hidden flex flex-col items-center mb-8 space-y-1">
                            <img alt="Logo AgriRDC" src={logo} className="w-32 h-24 object-contain" />
                            <p className="text-sm text-outline">Hub des plantations RDC</p>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold text-on-surface-variant">Connexion au système</h2>
                            <p className="text-sm text-on-surface-variant">
                                Saisissez vos identifiants professionnels pour accéder au tableau de bord.
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            {/* Email */}
                            <div className="space-y-1">
                                <Label htmlFor="email">Email professionnel</Label>
                                <div className="relative">
                                    <Icon name="mail" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                                    <Input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="gestionnaire@agrordc.cd"
                                        className="pl-10"
                                        aria-invalid={!!errors.email}
                                        {...register('email')}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-destructive">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <Link to="/mot-de-passe-oublie" className="text-sm text-primary hover:underline">
                                        Mot de passe oublié ?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Icon name="lock" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                                    <Input
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="pl-10"
                                        aria-invalid={!!errors.password}
                                        {...register('password')}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-xs text-destructive">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Remember */}
                            <div className="flex items-center gap-3">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="w-4 h-4 accent-primary"
                                    {...register('remember')}
                                />
                                <Label htmlFor="remember" className="font-normal text-on-surface-variant">
                                    Se souvenir de cet appareil pendant 30 jours
                                </Label>
                            </div>

                            {/* Root error */}
                            {errors.root && (
                                <p className="text-sm text-destructive bg-red-50 border border-red-200 rounded-lg p-3">
                                    {errors.root.message}
                                </p>
                            )}

                            <Button type="submit" disabled={isSubmitting} className="w-full py-6 bg-primary hover:bg-primary-hover">
                                {isSubmitting ? 'Connexion en cours…' : 'Se connecter'}
                            </Button>
                        </form>

                        <div className="pt-6 border-t border-outline-variant">
                            <p className="text-sm text-on-surface-variant text-center mb-3">
                                Besoin d&apos;un nouveau compte ou vous avez perdu l&apos;accès ?
                            </p>
                            <Link
                                to="/contact-admin"
                                className="w-full py-3 bg-white border border-primary text-primary font-semibold rounded-lg hover:bg-surface-tint transition-colors block text-center"
                            >
                                Contacter l&apos;administrateur
                            </Link>
                        </div>

                        <PageFooter links={FOOTER_LINKS} />
                    </div>
                </section>
            </main>
        </div>
    )
}
