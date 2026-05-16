import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import LeftBanner from '../components/LeftBanner.jsx'
import PageFooter from '../components/PageFooter.jsx'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import logo from '../assets/logo.png'
import Icon from '../components/Icon.jsx'

const API_URL = import.meta.env.VITE_API_URL

const BANNER_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0J5kkWpcHxQIv4PJbV7FnP4G9PWTIUqb8P_R5itGP3NT5GtKq2GmKP5_FkmvQ_sQT62ya6BD6VZHHeqj2Ullb3eV53kGHvtf-M8XZQfvdH7lYRcExDvX7y8S6lg88EiDm65WAGcq_jmf3qClD6S-R2IylrUAJEyR9kdPauuAJ6ADwU7G_GbKhGeocuCjmEHot08Zde2FXeWb3C4395iep25_D3s3iLvLWy4fodhRy669ltFgxuhsQgX7u5t-CeEqqn1VEZW_kLA8'

const FOOTER_LINKS = [
    { icon: 'help',   href: '#', ariaLabel: 'Aide' },
    { icon: 'policy', href: '#', ariaLabel: 'Politique de confidentialité' },
]

const GENERIC_MESSAGE = 'Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.'

const schema = z.object({
    email: z.string().email('Adresse email invalide'),
})

export default function MotPasseOublie() {
    const [successMsg, setSuccessMsg] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(schema) })

    const onSubmit = async ({ email }) => {
        try {
            if (!API_URL) {
                // Dev mode — always show the generic message (never reveal if email exists)
                setSuccessMsg(GENERIC_MESSAGE)
                return
            }
            const res  = await fetch(`${API_URL}/api/auth/forgot-password`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message)
            setSuccessMsg(GENERIC_MESSAGE)
        } catch {
            // Generic message intentionally hides whether the email exists (security best practice)
            setSuccessMsg(GENERIC_MESSAGE)
        }
    }

    const bannerFooter = (
        <p className="text-sm opacity-80">
            En cas de difficulté, contactez l&apos;administrateur du hub ou votre support informatique local.
        </p>
    )

    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <main className="w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl overflow-hidden shadow-xl min-h-screen border border-outline-variant">
                <LeftBanner
                    imageUrl={BANNER_IMAGE}
                    icon="lock_reset"
                    title="AgriRDC"
                    subtitle="Restaurez l'accès à votre compte AgriRDC en quelques étapes sécurisées."
                    infoIcon="shield_lock"
                    infoTitle="Récupération protégée"
                    infoText="Pour votre sécurité, nous n'indiquons pas si une adresse email est enregistrée ou non dans le système."
                    footer={bannerFooter}
                />

                <section className="flex flex-col justify-center p-6 md:p-10 bg-white">
                    <div className="max-w-md mx-auto w-full space-y-8">
                        <div className="md:hidden flex flex-col items-center mb-8 space-y-1">
                            <img alt="Logo AgriRDC" src={logo} className="w-32 h-24 object-contain" />
                            <h1 className="text-lg font-semibold text-primary">Mot de passe oublié</h1>
                            <p className="text-sm text-outline">Hub des plantations RDC</p>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold text-on-surface">Réinitialiser votre mot de passe</h2>
                            <p className="text-sm text-on-surface-variant">
                                Saisissez l&apos;adresse email associée à votre compte. Si elle est reconnue,
                                vous recevrez un lien de réinitialisation.
                            </p>
                        </div>

                        {successMsg ? (
                            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                                <div className="flex items-center gap-2 mb-1">
                                    <Icon name="check_circle" className="h-5 w-5 text-base text-green-600" />
                                    <span className="font-semibold">Demande envoyée</span>
                                </div>
                                <p>{successMsg}</p>
                                <Link to="/login" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                                    Retour à la connexion →
                                </Link>
                            </div>
                        ) : (
                            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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

                                <Button type="submit" disabled={isSubmitting} className="w-full py-6 bg-primary hover:bg-primary-hover">
                                    {isSubmitting ? 'Envoi en cours…' : 'Envoyer le lien de réinitialisation'}
                                </Button>
                            </form>
                        )}

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
