import { useState } from 'react'
import { Link } from 'react-router-dom'
import LeftBanner from '../components/LeftBanner.jsx'
import PageFooter from '../components/PageFooter.jsx'
import logo from "../assets/logo.jpeg"

const API_URL = import.meta.env.VITE_API_URL

const BANNER_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0J5kkWpcHxQIv4PJbV7FnP4G9PWTIUqb8P_R5itGP3NT5GtKq2GmKP5_FkmvQ_sQT62ya6BD6VZHHeqj2Ullb3eV53kGHvtf-M8XZQfvdH7lYRcExDvX7y8S6lg88EiDm65WAGcq_jmf3qClD6S-R2IylrUAJEyR9kdPauuAJ6ADwU7G_GbKhGeocuCjmEHot08Zde2FXeWb3C4395iep25_D3s3iLvLWy4fodhRy669ltFgxuhsQgX7u5t-CeEqqn1VEZW_kLA8'

const FOOTER_LINKS = [
    { icon: 'help', href: '#', ariaLabel: 'Aide' },
    { icon: 'policy', href: '#', ariaLabel: 'Politique de confidentialité' },
]

const GENERIC_MESSAGE = 'Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.'

export default function MotPasseOublie() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')
        try {
            const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Une erreur est survenue.')
            setSuccess(GENERIC_MESSAGE)
        } catch {
            // Generic message intentionally hides whether the email exists (security best practice)
            setError(GENERIC_MESSAGE)
        } finally {
            setLoading(false)
        }
    }

    const bannerFooter = (
        <p className="text-sm opacity-80">
            En cas de difficulté, contactez l&apos;administrateur du hub ou votre support informatique local.
        </p>
    )

    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <main className="w-full  grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl overflow-hidden shadow-xl min-h-screen border border-outline-variant">
                <LeftBanner
                    imageUrl={BANNER_IMAGE}
                    icon="lock_reset"
                    title="Réinitialisation"
                    subtitle="Restaurez l'accès à votre compte AgriRDC en quelques étapes sécurisées."
                    infoIcon="shield_lock"
                    infoTitle="Récupération protégée"
                    infoText="Pour votre sécurité, nous n'indiquons pas si une adresse email est enregistrée ou non dans le système."
                    footer={bannerFooter}
                />

                <section className="flex flex-col justify-center p-6 md:p-10 bg-white">
                    <div className="max-w-md mx-auto w-full space-y-8">
                        <div className="md:hidden flex flex-col items-center mb-8 space-y-1">
                            <img
                                alt="Logo AgriRDC"
                                src={logo}
                                className="w-32 h-24 object-contain"
                            />
                            <h1 className="text-1xl font-semibold text-primary">
                                Mot de passe oublié
                            </h1>
                            <p className="text-sm text-outline">Hub des plantations RDC</p>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold text-on-surface">
                                Réinitialiser votre mot de passe
                            </h2>
                            <p className="text-sm text-on-surface-variant">
                                Saisissez l&apos;adresse email associée à votre compte. Si elle est reconnue,
                                vous recevrez un lien de réinitialisation.
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
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="gestionnaire@AgriRDC.cd"
                                        autoComplete="email"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-outline rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                                    {error}
                                </p>
                            )}

                            {success && (
                                <p className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg p-3">
                                    {success}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-md active:scale-[0.98] disabled:opacity-60"
                            >
                                {loading ? 'Envoi du lien...' : 'Envoyer le lien de réinitialisation'}
                            </button>
                        </form>

                        <div className="pt-6 border-t border-outline-variant">
                            <Link
                                to="/login"
                                className="w-full py-3 bg-white border border-primary text-primary font-semibold rounded-lg hover:bg-surface-tint transition-colors block text-center"
                            >
                                Retour à la page de connexion
                            </Link>
                        </div>

                        <PageFooter links={FOOTER_LINKS} />
                    </div>
                </section>
            </main>
        </div>
    )
}
