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

export default function ContacteAdmin() {
    const [form, setForm] = useState({
        nom: '',
        email: '',
        typeDemande: 'acces_compte',
        message: '',
        urgence: 'normal',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')
        try {
            const res = await fetch(`${API_URL}/api/support/contact-hub-admin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Une erreur est survenue. Veuillez réessayer.')
            setSuccess("Votre demande a été transmise à l'administrateur du hub.")
            setForm({ nom: '', email: '', typeDemande: 'acces_compte', message: '', urgence: 'normal' })
        } catch (err) {
            setError(err.message || 'Une erreur est survenue. Veuillez réessayer.')
        } finally {
            setLoading(false)
        }
    }

    const bannerFooter = (
        <p className="text-sm opacity-80">
            En cas d&apos;urgence opérationnelle critique (blocage complet de la production), appelez
            également la ligne de support interne si elle est disponible.
        </p>
    )

    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <main className="w-full  grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl overflow-hidden shadow-xl min-h-[650px] border border-outline-variant">
                <LeftBanner
                    imageUrl={BANNER_IMAGE}
                    icon="support_agent"
                    title="Support hub"
                    subtitle="Contactez l'administrateur du hub pour toute demande d'accès, de sécurité ou de mise à jour de vos droits."
                    infoIcon="info"
                    infoTitle="Informations importantes"
                    infoText="Fournissez un maximum de détails dans votre message pour permettre une prise en charge rapide et précise de votre demande."
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
                                Contacter l&apos;administrateur
                            </h1>
                            <p className="text-sm text-outline">Hub des plantations RDC</p>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold text-on-surface">
                                Envoyer une demande au hub
                            </h2>
                            <p className="text-sm text-on-surface-variant">
                                Remplissez le formulaire ci-dessous. Vous recevrez une réponse sur votre
                                email professionnel dès que possible.
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-1">
                                <label htmlFor="nom" className="text-sm font-semibold text-on-surface">
                                    Nom complet
                                </label>
                                <input
                                    id="nom"
                                    name="nom"
                                    type="text"
                                    value={form.nom}
                                    onChange={handleChange}
                                    placeholder="Ex : Jean Kabila"
                                    autoComplete="name"
                                    className="w-full px-4 py-3 bg-white border border-outline rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    required
                                />
                            </div>

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
                                        onChange={handleChange}
                                        placeholder="gestionnaire@AgriRDC.cd"
                                        autoComplete="email"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-outline rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="typeDemande" className="text-sm font-semibold text-on-surface">
                                    Type de demande
                                </label>
                                <select
                                    id="typeDemande"
                                    name="typeDemande"
                                    value={form.typeDemande}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-outline rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                                >
                                    <option value="acces_compte">Accès au compte</option>
                                    <option value="nouveau_compte">Nouveau compte</option>
                                    <option value="modification_droits">Modification des droits</option>
                                    <option value="probleme_securite">Problème de sécurité</option>
                                    <option value="autre">Autre</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="urgence" className="text-sm font-semibold text-on-surface">
                                    Niveau d&apos;urgence
                                </label>
                                <select
                                    id="urgence"
                                    name="urgence"
                                    value={form.urgence}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-outline rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                                >
                                    <option value="normal">Normal</option>
                                    <option value="urgent">Urgent</option>
                                    <option value="critique">Critique</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="message" className="text-sm font-semibold text-on-surface">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Décrivez votre demande en détail..."
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white border border-outline rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary transition resize-none"
                                    required
                                />
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
                                {loading ? 'Envoi de la demande...' : 'Envoyer'}
                            </button>
                        </form>

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
