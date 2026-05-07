import { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar.jsx'

const INITIAL_GENERAL = {
    appName: 'AgriRDC',
    massUnit: 'kg',
    areaUnit: 'ha',
    timezone: 'Africa/Kinshasa',
    language: 'fr',
    currency: 'CDF',
}

const INITIAL_SECURITY = {
    twoFactor: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    ipWhitelist: '',
}

const INITIAL_NOTIF = {
    emailAlerts: true,
    smsAlerts: false,
    yieldAlertThreshold: 20,
    dailyDigest: true,
}

const ROLE_ROWS = [
    { label: 'Gestion de la configuration système',        admin: true,  proprietaire: false, employe: false, analyste: false, logisticien: false },
    { label: 'Gestion des utilisateurs et des droits',     admin: true,  proprietaire: false, employe: false, analyste: false, logisticien: false },
    { label: 'Export des données agricoles',               admin: true,  proprietaire: true,  employe: false, analyste: true,  logisticien: false },
    { label: 'Accès aux rapports financiers',              admin: true,  proprietaire: true,  employe: false, analyste: true,  logisticien: false },
    { label: 'Validation des fermes',                      admin: true,  proprietaire: false, employe: false, analyste: false, logisticien: false },
    { label: 'Gestion des itinéraires logistiques',        admin: true,  proprietaire: false, employe: false, analyste: false, logisticien: true  },
    { label: 'Saisie des données de rendement',            admin: true,  proprietaire: true,  employe: true,  analyste: false, logisticien: false },
    { label: 'Consultation du journal d\'audit',           admin: true,  proprietaire: false, employe: false, analyste: true,  logisticien: false },
    { label: 'Génération de rapports automatiques',        admin: true,  proprietaire: true,  employe: false, analyste: true,  logisticien: false },
]

export default function AdminSettingsPage() {
    const [general, setGeneral]       = useState(INITIAL_GENERAL)
    const [backup, setBackup]         = useState('daily')
    const [retention, setRetention]   = useState('5ans')
    const [security, setSecurity]     = useState(INITIAL_SECURITY)
    const [notif, setNotif]           = useState(INITIAL_NOTIF)
    const [savedSection, setSavedSection] = useState('')
    const [dangerConfirm, setDangerConfirm] = useState('')

    const saveSection = (section) => {
        setSavedSection(section)
        setTimeout(() => setSavedSection(''), 2500)
    }

    const handleGeneral = (e) => {
        const { name, value } = e.target
        setGeneral(prev => ({ ...prev, [name]: value }))
    }

    const handleSecurity = (e) => {
        const { name, value, type, checked } = e.target
        setSecurity(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleNotif = (e) => {
        const { name, value, type, checked } = e.target
        setNotif(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#1b1c1c]">
            <AdminSidebar />

            <main className="ml-64 min-h-screen">
                {/* Topbar */}
                <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#003f87]">settings</span>
                        <span className="text-sm font-semibold text-[#1b1c1c]">Paramètres du système</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input
                                className="w-52 rounded-lg border-none bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#003f87]"
                                placeholder="Rechercher une configuration..."
                                type="text"
                            />
                        </div>
                        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-50">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="rounded-full p-2 text-slate-500 hover:bg-slate-50">
                            <span className="material-symbols-outlined">help_outline</span>
                        </button>
                        <img
                            alt="Profil administrateur"
                            className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvmULBcSrXXCrLY-U6pRnbTVf50mbAedNNHnvsgfc9vnIwjaF_kLVISRQgK4-VZaG0fkGjv56la6_f9T_ymXhCYUH839zFWWxbelu4zguDEHpK-rwGGEvT2qax2jRLoYL2xsYeRJY79YmUN8fpFhRUg0lhFMooeTA-nvDWkY0nrcT-3Rcikg6CPa4QaTePEaGXZ-8mNRFtuDNBTgH7mKWJmmVOMISQoE9UC1WlhrPQUtzXelzaww5hP-ScxTrWvEZV3_rzDz9IFQA"
                        />
                    </div>
                </header>

                <div className="mx-auto w-full max-w-6xl p-8 space-y-6">
                    {/* Page title */}
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-[#1b1c1c]">Paramètres du système</h2>
                            <p className="mt-1 text-sm text-[#424752]">
                                Gérez les configurations globales, les permissions et les règles de sécurité d&apos;AgriRDC.
                            </p>
                        </div>
                        {savedSection && (
                            <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                Modifications enregistrées
                            </div>
                        )}
                    </div>

                    {/* ── Row 1 : General + Defaults ── */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">

                        {/* General config */}
                        <section className="flex flex-col gap-5 rounded-xl border border-[#DEE2E6] bg-white p-6 md:col-span-7">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#003f87]">tune</span>
                                <h3 className="text-base font-semibold">Configuration générale</h3>
                            </div>

                            <div className="space-y-4">
                                <FormField label="Nom de la plateforme">
                                    <input
                                        name="appName"
                                        type="text"
                                        value={general.appName}
                                        onChange={handleGeneral}
                                        className="field-input"
                                    />
                                </FormField>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField label="Unité de masse">
                                        <select name="massUnit" value={general.massUnit} onChange={handleGeneral} className="field-input">
                                            <option value="kg">kg — Kilogrammes</option>
                                            <option value="t">t — Tonnes métriques</option>
                                            <option value="lb">lb — Livres</option>
                                        </select>
                                    </FormField>
                                    <FormField label="Unité de surface">
                                        <select name="areaUnit" value={general.areaUnit} onChange={handleGeneral} className="field-input">
                                            <option value="ha">ha — Hectares</option>
                                            <option value="ac">ac — Acres</option>
                                            <option value="m2">m²</option>
                                        </select>
                                    </FormField>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField label="Fuseau horaire">
                                        <select name="timezone" value={general.timezone} onChange={handleGeneral} className="field-input">
                                            <option value="Africa/Kinshasa">UTC+01:00 — Kinshasa</option>
                                            <option value="Africa/Lubumbashi">UTC+02:00 — Lubumbashi</option>
                                            <option value="UTC">UTC+00:00</option>
                                        </select>
                                    </FormField>
                                    <FormField label="Langue de l'interface">
                                        <select name="language" value={general.language} onChange={handleGeneral} className="field-input">
                                            <option value="fr">Français</option>
                                            <option value="ln">Lingala</option>
                                            <option value="sw">Swahili</option>
                                            <option value="en">English</option>
                                        </select>
                                    </FormField>
                                </div>

                                <FormField label="Devise locale">
                                    <select name="currency" value={general.currency} onChange={handleGeneral} className="field-input">
                                        <option value="CDF">CDF — Franc congolais</option>
                                        <option value="USD">USD — Dollar américain</option>
                                        <option value="EUR">EUR — Euro</option>
                                    </select>
                                </FormField>
                            </div>

                            <div className="flex justify-end border-t border-slate-100 pt-4">
                                <button
                                    onClick={() => saveSection('general')}
                                    className="flex items-center gap-2 rounded-lg bg-[#003f87] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0056b3]"
                                >
                                    <span className="material-symbols-outlined text-sm">save</span>
                                    Enregistrer
                                </button>
                            </div>
                        </section>

                        {/* Backup & retention */}
                        <section className="rounded-xl border border-[#DEE2E6] bg-slate-50 p-6 md:col-span-5">
                            <div className="mb-5 flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#003f87]">database</span>
                                <h3 className="text-base font-semibold">Sauvegarde &amp; données</h3>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold">Fréquence de sauvegarde automatique</label>
                                    <div className="space-y-2">
                                        <RadioItem label="Quotidienne (recommandée)" checked={backup === 'daily'} onChange={() => setBackup('daily')} />
                                        <RadioItem label="Hebdomadaire" checked={backup === 'weekly'} onChange={() => setBackup('weekly')} />
                                        <RadioItem label="Intervalle personnalisé" checked={backup === 'custom'} onChange={() => setBackup('custom')} />
                                    </div>
                                </div>

                                <FormField label="Conservation des données">
                                    <select value={retention} onChange={e => setRetention(e.target.value)} className="field-input bg-white">
                                        <option value="5ans">5 ans (norme légale RDC)</option>
                                        <option value="10ans">10 ans</option>
                                        <option value="illimitee">Illimitée</option>
                                    </select>
                                    <p className="mt-1 text-xs text-slate-400">Les archives sont supprimées automatiquement après cette période.</p>
                                </FormField>

                                <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                                    <p className="text-xs text-slate-600">
                                        <span className="font-semibold text-[#003f87]">Dernière sauvegarde :</span> aujourd&apos;hui à 02:00 — 4.2 GB — <span className="text-green-600 font-medium">Succès</span>
                                    </p>
                                </div>

                                <div className="flex justify-end pt-1">
                                    <button
                                        onClick={() => saveSection('backup')}
                                        className="flex items-center gap-2 rounded-lg bg-[#003f87] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0056b3]"
                                    >
                                        <span className="material-symbols-outlined text-sm">save</span>
                                        Enregistrer
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* ── Row 2 : Roles & permissions ── */}
                    <section className="overflow-hidden rounded-xl border border-[#DEE2E6] bg-white">
                        <div className="flex items-center justify-between border-b border-[#DEE2E6] bg-slate-50 p-6">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#003f87]">admin_panel_settings</span>
                                <h3 className="text-base font-semibold">Rôles et permissions</h3>
                            </div>
                            <button className="flex items-center gap-2 rounded-lg border border-[#003f87] px-4 py-1.5 text-sm font-semibold text-[#003f87] hover:bg-blue-50">
                                <span className="material-symbols-outlined text-sm">group_add</span>
                                Gérer les groupes
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm">
                                <thead>
                                    <tr className="border-b border-[#DEE2E6] bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        <th className="px-6 py-3">Permission</th>
                                        <th className="px-6 py-3 text-center">Administrateur</th>
                                        <th className="px-6 py-3 text-center">Propriétaire</th>
                                        <th className="px-6 py-3 text-center">Employé</th>
                                        <th className="px-6 py-3 text-center">Analyste</th>
                                        <th className="px-6 py-3 text-center">Logisticien</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {ROLE_ROWS.map((row) => (
                                        <RoleRow key={row.label} {...row} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* ── Row 3 : Security + Notifications ── */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        {/* Security */}
                        <section className="rounded-xl border border-[#DEE2E6] bg-white p-6 space-y-5">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#003f87]">verified_user</span>
                                <h3 className="text-base font-semibold">Sécurité</h3>
                            </div>

                            <Toggle
                                label="Authentification à deux facteurs (2FA)"
                                description="Obligatoire pour tous les comptes administrateurs"
                                checked={security.twoFactor}
                                onChange={() => setSecurity(p => ({ ...p, twoFactor: !p.twoFactor }))}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField label="Expiration de session (min)">
                                    <input
                                        name="sessionTimeout"
                                        type="number"
                                        min={5}
                                        max={480}
                                        value={security.sessionTimeout}
                                        onChange={handleSecurity}
                                        className="field-input"
                                    />
                                </FormField>
                                <FormField label="Tentatives max avant blocage">
                                    <input
                                        name="maxLoginAttempts"
                                        type="number"
                                        min={3}
                                        max={10}
                                        value={security.maxLoginAttempts}
                                        onChange={handleSecurity}
                                        className="field-input"
                                    />
                                </FormField>
                            </div>

                            <FormField label="Liste blanche IP (optionnel)" hint="Séparez plusieurs adresses par une virgule.">
                                <input
                                    name="ipWhitelist"
                                    type="text"
                                    value={security.ipWhitelist}
                                    onChange={handleSecurity}
                                    placeholder="ex : 196.217.10.1, 41.243.0.0/16"
                                    className="field-input"
                                />
                            </FormField>

                            <div className="flex justify-end border-t border-slate-100 pt-2">
                                <button onClick={() => saveSection('security')} className="flex items-center gap-2 rounded-lg bg-[#003f87] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0056b3]">
                                    <span className="material-symbols-outlined text-sm">save</span>
                                    Enregistrer
                                </button>
                            </div>
                        </section>

                        {/* Notifications */}
                        <section className="rounded-xl border border-[#DEE2E6] bg-white p-6 space-y-5">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#003f87]">notifications_active</span>
                                <h3 className="text-base font-semibold">Notifications</h3>
                            </div>

                            <div className="space-y-3">
                                <Toggle
                                    label="Alertes par email"
                                    description="Incidents, pannes et rapports automatiques"
                                    checked={notif.emailAlerts}
                                    onChange={() => setNotif(p => ({ ...p, emailAlerts: !p.emailAlerts }))}
                                />
                                <Toggle
                                    label="Alertes par SMS"
                                    description="Uniquement pour les incidents critiques"
                                    checked={notif.smsAlerts}
                                    onChange={() => setNotif(p => ({ ...p, smsAlerts: !p.smsAlerts }))}
                                />
                                <Toggle
                                    label="Résumé quotidien"
                                    description="Envoyé chaque matin à 07h00"
                                    checked={notif.dailyDigest}
                                    onChange={() => setNotif(p => ({ ...p, dailyDigest: !p.dailyDigest }))}
                                />
                            </div>

                            <div className="border-t border-slate-100 pt-4">
                                <FormField label="Seuil d'alerte rendement (%)" hint="Une alerte est envoyée si le rendement chute en dessous de ce seuil par rapport à la moyenne.">
                                    <input
                                        name="yieldAlertThreshold"
                                        type="number"
                                        min={1}
                                        max={100}
                                        value={notif.yieldAlertThreshold}
                                        onChange={handleNotif}
                                        className="field-input"
                                    />
                                </FormField>
                            </div>

                            <div className="flex justify-end border-t border-slate-100 pt-2">
                                <button onClick={() => saveSection('notif')} className="flex items-center gap-2 rounded-lg bg-[#003f87] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0056b3]">
                                    <span className="material-symbols-outlined text-sm">save</span>
                                    Enregistrer
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* ── Row 4 : Danger zone ── */}
                    <section className="rounded-xl border border-red-200 bg-red-50 p-6">
                        <div className="mb-3 flex items-center gap-3">
                            <span className="material-symbols-outlined text-red-600">bolt</span>
                            <h3 className="text-base font-semibold text-red-800">Zone de danger — Opérations irréversibles</h3>
                        </div>
                        <p className="mb-5 text-sm text-red-700">
                            Ces actions affectent l&apos;ensemble de la plateforme et ne peuvent pas être annulées.
                            Tapez <span className="font-mono font-bold">CONFIRMER</span> dans le champ ci-dessous pour activer les boutons.
                        </p>

                        <input
                            type="text"
                            value={dangerConfirm}
                            onChange={e => setDangerConfirm(e.target.value)}
                            placeholder="Tapez CONFIRMER pour activer"
                            className="mb-5 w-full max-w-xs rounded-lg border border-red-300 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-400"
                        />

                        <div className="flex flex-wrap gap-3">
                            <DangerButton
                                icon="lock_reset"
                                label="Réinitialiser tous les mots de passe"
                                enabled={dangerConfirm === 'CONFIRMER'}
                                variant="dark"
                            />
                            <DangerButton
                                icon="history"
                                label="Purger le journal d'audit"
                                enabled={dangerConfirm === 'CONFIRMER'}
                                variant="outline"
                            />
                            <DangerButton
                                icon="warning"
                                label="Réinitialisation complète du système"
                                enabled={dangerConfirm === 'CONFIRMER'}
                                variant="red"
                            />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

/* ── Sub-components ── */

function FormField({ label, hint, children }) {
    return (
        <div className="space-y-1.5">
            {label && <label className="block text-sm font-semibold text-[#1b1c1c]">{label}</label>}
            {children}
            {hint && <p className="text-xs text-slate-400">{hint}</p>}
        </div>
    )
}

function RadioItem({ label, checked, onChange }) {
    return (
        <label className="flex cursor-pointer items-center gap-3">
            <input checked={checked} onChange={onChange} className="h-4 w-4 accent-[#003f87]" name="backup" type="radio" readOnly />
            <span className="text-sm">{label}</span>
        </label>
    )
}

function Toggle({ label, description, checked, onChange }) {
    return (
        <div className={`flex items-center justify-between rounded-lg border p-4 ${checked ? 'border-blue-200 bg-blue-50/60' : 'border-slate-200 bg-slate-50'}`}>
            <div>
                <p className={`text-sm font-semibold ${checked ? 'text-[#003f87]' : 'text-slate-700'}`}>{label}</p>
                {description && <p className="text-xs text-slate-500">{description}</p>}
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
                <input checked={checked} onChange={onChange} className="peer sr-only" type="checkbox" />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 transition-all after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#003f87] peer-checked:after:translate-x-full peer-checked:after:border-white" />
            </label>
        </div>
    )
}

function RoleRow({ label, admin, proprietaire, employe, analyste, logisticien }) {
    return (
        <tr className="transition-colors hover:bg-slate-50">
            <td className="px-6 py-3 text-sm text-[#1b1c1c]">{label}</td>
            {[admin, proprietaire, employe, analyste, logisticien].map((val, i) => (
                <td key={i} className="px-6 py-3 text-center">
                    {val
                        ? <span className="material-symbols-outlined text-green-600 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        : <span className="material-symbols-outlined text-slate-300 text-lg">remove</span>
                    }
                </td>
            ))}
        </tr>
    )
}

function DangerButton({ icon, label, enabled, variant }) {
    const base = 'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed'
    const variants = {
        dark:    'bg-[#351000] text-white hover:bg-[#5a1a00]',
        outline: 'border border-red-800 text-red-800 hover:bg-red-100',
        red:     'bg-[#ba1a1a] text-white hover:bg-[#8c1010]',
    }
    return (
        <button disabled={!enabled} className={`${base} ${variants[variant]}`}>
            <span className="material-symbols-outlined text-sm">{icon}</span>
            {label}
        </button>
    )
}
