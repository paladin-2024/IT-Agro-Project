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
import { Textarea } from '@/components/ui/textarea'
import logo from '../assets/logo.png'
import Icon from '../components/Icon.jsx'

const API_URL = import.meta.env.VITE_API_URL

const BANNER_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0J5kkWpcHxQIv4PJbV7FnP4G9PWTIUqb8P_R5itGP3NT5GtKq2GmKP5_FkmvQ_sQT62ya6BD6VZHHeqj2Ullb3eV53kGHvtf-M8XZQfvdH7lYRcExDvX7y8S6lg88EiDm65WAGcq_jmf3qClD6S-R2IylrUAJEyR9kdPauuAJ6ADwU7G_GbKhGeocuCjmEHot08Zde2FXeWb3C4395iep25_D3s3iLvLWy4fodhRy669ltFgxuhsQgX7u5t-CeEqqn1VEZW_kLA8'

const FOOTER_LINKS = [
    { icon: 'help',   href: '#', ariaLabel: 'Aide' },
    { icon: 'policy', href: '#', ariaLabel: 'Politique de confidentialité' },
]

const schema = z.object({
    nom:         z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email:       z.string().email('Adresse email invalide'),
    typeDemande: z.enum(['acces_compte', 'nouveau_compte', 'modification_droits', 'probleme_securite', 'autre']),
    urgence:     z.enum(['normal', 'urgent', 'critique']),
    message:     z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

export default function ContacteAdmin() {
    const [successMsg, setSuccessMsg] = useState('')

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setError,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { nom: '', email: '', typeDemande: 'acces_compte', urgence: 'normal', message: '' },
    })

    const onSubmit = async (data) => {
        try {
            if (!API_URL) {
                setSuccessMsg("Votre demande a été transmise à l'administrateur du hub.")
                reset()
                return
            }
            const res  = await fetch(`${API_URL}/api/support/contact-hub-admin`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json.message || 'Une erreur est survenue.')
            setSuccessMsg("Votre demande a été transmise à l'administrateur du hub.")
            reset()
        } catch (err) {
            setError('root', { message: err.message || 'Une erreur est survenue. Veuillez réessayer.' })
        }
    }

    const bannerFooter = (
        <p className="text-sm opacity-80">
            En cas d&apos;urgence opérationnelle critique, appelez également la ligne de support interne si disponible.
        </p>
    )

    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <main className="w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl overflow-hidden shadow-xl min-h-[650px] border border-outline-variant">
                <LeftBanner
                    imageUrl={BANNER_IMAGE}
                    icon="support_agent"
                    title="AgriRDC"
                    subtitle="Contactez l'administrateur du hub pour toute demande d'accès, de sécurité ou de mise à jour de vos droits."
                    infoIcon="info"
                    infoTitle="Informations importantes"
                    infoText="Fournissez un maximum de détails dans votre message pour une prise en charge rapide."
                    footer={bannerFooter}
                />

                <section className="flex flex-col justify-center p-6 md:p-10 bg-white">
                    <div className="max-w-md mx-auto w-full space-y-8">
                        <div className="md:hidden flex flex-col items-center mb-8 space-y-1">
                            <img alt="Logo AgriRDC" src={logo} className="w-32 h-24 object-contain" />
                            <h1 className="text-lg font-semibold text-primary">Contacter l&apos;administrateur</h1>
                            <p className="text-sm text-outline">Hub des plantations RDC</p>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold text-on-surface">Envoyer une demande au hub</h2>
                            <p className="text-sm text-on-surface-variant">
                                Remplissez le formulaire ci-dessous. Vous recevrez une réponse sur votre email professionnel.
                            </p>
                        </div>

                        {successMsg ? (
                            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                                <div className="flex items-center gap-2 mb-1">
                                    <Icon name="check_circle" className="h-5 w-5 text-base text-green-600" />
                                    <span className="font-semibold">Demande envoyée</span>
                                </div>
                                <p>{successMsg}</p>
                                <button
                                    onClick={() => setSuccessMsg('')}
                                    className="mt-3 text-sm font-semibold text-primary hover:underline"
                                >
                                    Envoyer une nouvelle demande
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                                {/* Nom */}
                                <div className="space-y-1">
                                    <Label htmlFor="nom">Nom complet</Label>
                                    <Input
                                        id="nom"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Ex : Jean Kabila"
                                        aria-invalid={!!errors.nom}
                                        {...register('nom')}
                                    />
                                    {errors.nom && <p className="text-xs text-destructive">{errors.nom.message}</p>}
                                </div>

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
                                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                                </div>

                                {/* Type de demande */}
                                <div className="space-y-1">
                                    <Label htmlFor="typeDemande">Type de demande</Label>
                                    <select
                                        id="typeDemande"
                                        className="w-full px-4 py-3 bg-white border border-outline rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary transition text-sm"
                                        {...register('typeDemande')}
                                    >
                                        <option value="acces_compte">Accès au compte</option>
                                        <option value="nouveau_compte">Nouveau compte</option>
                                        <option value="modification_droits">Modification des droits</option>
                                        <option value="probleme_securite">Problème de sécurité</option>
                                        <option value="autre">Autre</option>
                                    </select>
                                </div>

                                {/* Urgence */}
                                <div className="space-y-1">
                                    <Label htmlFor="urgence">Niveau d&apos;urgence</Label>
                                    <select
                                        id="urgence"
                                        className="w-full px-4 py-3 bg-white border border-outline rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary transition text-sm"
                                        {...register('urgence')}
                                    >
                                        <option value="normal">Normal</option>
                                        <option value="urgent">Urgent</option>
                                        <option value="critique">Critique</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div className="space-y-1">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Décrivez votre demande en détail…"
                                        rows={4}
                                        aria-invalid={!!errors.message}
                                        {...register('message')}
                                    />
                                    {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                                </div>

                                {errors.root && (
                                    <p className="text-sm text-destructive bg-red-50 border border-red-200 rounded-lg p-3">
                                        {errors.root.message}
                                    </p>
                                )}

                                <Button type="submit" disabled={isSubmitting} className="w-full py-6 bg-primary hover:bg-primary-hover">
                                    {isSubmitting ? 'Envoi de la demande…' : 'Envoyer'}
                                </Button>
                            </form>
                        )}

                        <div className="pt-6 border-t border-outline-variant">
                            <Link
                                to="/login"
                                className="w-full py-3 bg-white border border-primary text-primary font-semibold rounded-lg hover:bg-surface-tint transition-colors block text-center"
                            >
                                Page de connexion
                            </Link>
                        </div>

                        <PageFooter links={FOOTER_LINKS} />
                    </div>
                </section>
            </main>
        </div>
    )
}
