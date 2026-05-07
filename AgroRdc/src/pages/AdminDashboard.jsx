import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import AdminSidebar from '../components/AdminSidebar.jsx'

export default function AdminDashboard() {
    const { user } = useAuth()

    return (
        <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] font-[Inter]">
            <AdminSidebar />

            <main className="ml-64 min-h-screen">
                <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#DEE2E6] bg-white px-6">
                    <div className="flex flex-1 items-center gap-4">
                        <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                search
              </span>
                            <input
                                type="text"
                                placeholder="Rechercher des utilisateurs, fermes ou rapports..."
                                className="w-full rounded-lg border-none bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0056B3]"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <button className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-50">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-50">
                                <span className="material-symbols-outlined">help_outline</span>
                            </button>
                        </div>

                        <div className="h-8 w-px bg-[#DEE2E6]" />

                        <div className="flex cursor-pointer items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-semibold leading-none">{user?.nom || user?.email || 'Admin'}</p>
                                <p className="text-xs text-slate-500">{user?.role || 'Super Admin'}</p>
                            </div>
                            <img
                                alt="Avatar de l'utilisateur"
                                className="h-10 w-10 rounded-full border border-[#DEE2E6] object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByzF_XvQTBuWaEnjKodstX932NI6w_fk_jo6S6w7m2Uy6eB53_JXF7uFbggz9uUyEekPGuPpzCi5Eim6qUb7eaRgAajDDK7BCuUPxLBQlNq_impBSax5Haj0AftdF4o_izrt0hcxswGi0qj2yadgvIMxHOpvv2mzscl_fQHEzfHRjVCpZCeMW_GNPLY4FVoDDVP5zkLQh37ntCgasCax3kfIyAz9uLWd_bbU9ZsO1_kJqdhjEnywl4hNzA5QznKH4ZBd1vpJr_Ofs"
                            />
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="mb-10">
                        <h2 className="font-[Work_Sans] text-[32px] font-semibold leading-10 text-[#1b1c1c]">
                            Aperçu administrateur
                        </h2>
                        <p className="text-base text-[#424752]">
                            Performance du système et tableau de bord de gestion des utilisateurs.
                        </p>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 grid grid-cols-3 gap-6 lg:col-span-8">
                            <div className="col-span-1 flex flex-col gap-2 border border-[#DEE2E6] bg-white p-6">
                                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined rounded bg-blue-50 p-2 text-[#0056B3]">
                    group
                  </span>
                                    <span className="text-xs font-bold text-green-600">+12%</span>
                                </div>
                                <div>
                                    <p className="text-xs text-[#424752]">Nombre total d'utilisateurs</p>
                                    <h3 className="text-xl font-semibold">1,284</h3>
                                </div>
                                <div className="flex gap-1 text-[10px] text-slate-400">
                                    <span className="rounded bg-slate-50 px-1.5 py-0.5">42 admins</span>
                                    <span className="rounded bg-slate-50 px-1.5 py-0.5">812 employés</span>
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col gap-2 border border-[#DEE2E6] bg-white p-6">
                                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined rounded bg-blue-50 p-2 text-[#0056B3]">
                    agriculture
                  </span>
                                    <span className="text-xs font-bold text-green-600">+5%</span>
                                </div>
                                <div>
                                    <p className="text-xs text-[#424752]">Fermes actives</p>
                                    <h3 className="text-xl font-semibold">342</h3>
                                </div>
                                <p className="text-xs text-slate-400">Réparties dans 14 provinces</p>
                            </div>

                            <Link to="/sante-systeme" className="col-span-1 flex flex-col gap-2 border border-[#DEE2E6] bg-white p-6 hover:border-green-400 transition-colors">
                                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined rounded bg-green-50 p-2 text-green-600">
                    monitor_heart
                  </span>
                                    <span className="text-xs font-bold text-green-600">Optimal</span>
                                </div>
                                <div>
                                    <p className="text-xs text-[#424752]">Santé du système</p>
                                    <h3 className="text-xl font-semibold">99.9%</h3>
                                </div>
                                <p className="text-xs text-slate-400">Latence : 142ms ↗</p>
                            </Link>

                            <div className="col-span-3 overflow-hidden border border-[#DEE2E6] bg-white">
                                <div className="flex items-center justify-between border-b border-[#DEE2E6] p-6">
                                    <h4 className="text-sm font-semibold text-[#1b1c1c]">
                                        Croissance des utilisateurs actifs
                                    </h4>
                                    <button className="text-xs font-bold text-[#0056B3] hover:underline">
                                        Voir les analyses
                                    </button>
                                </div>
                                <div className="flex h-64 items-end gap-4 bg-slate-50 p-6">
                                    <div className="group relative h-24 flex-1 rounded-t-sm bg-blue-100">
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-[#004491] px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                                            840
                                        </div>
                                    </div>
                                    <div className="h-32 flex-1 rounded-t-sm bg-blue-200" />
                                    <div className="h-40 flex-1 rounded-t-sm bg-blue-300" />
                                    <div className="h-48 flex-1 rounded-t-sm bg-blue-400" />
                                    <div className="group relative h-56 flex-1 rounded-t-sm bg-[#0056B3]">
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-[#004491] px-2 py-1 text-[10px] text-white">
                                            1,284
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
                            <div className="border border-[#DEE2E6] bg-white p-6">
                                <h4 className="mb-6 text-sm font-semibold text-[#1b1c1c]">
                                    Administration rapide
                                </h4>
                                <div className="flex flex-col gap-2">
                                    <Link to="/utilisateurs" className="flex items-center gap-3 border border-transparent bg-slate-50 p-3 text-sm font-medium transition-all hover:border-[#c2c6d4] hover:bg-slate-100">
                    <span className="material-symbols-outlined text-[#0056B3]">
                      person_add
                    </span>
                                        Ajouter un nouvel admin
                                    </Link>
                                    <button className="flex items-center gap-3 border border-transparent bg-slate-50 p-3 text-sm font-medium transition-all hover:border-[#c2c6d4] hover:bg-slate-100">
                    <span className="material-symbols-outlined text-[#0056B3]">
                      domain_verification
                    </span>
                                        File de validation des fermes
                                        <span className="ml-auto rounded-full bg-[#da3433] px-2 py-0.5 text-[10px] text-white">
                      8
                    </span>
                                    </button>
                                    <button className="flex items-center gap-3 border border-transparent bg-slate-50 p-3 text-sm font-medium transition-all hover:border-[#c2c6d4] hover:bg-slate-100">
                    <span className="material-symbols-outlined text-[#0056B3]">
                      database
                    </span>
                                        Sauvegarde de la base de données
                                    </button>
                                </div>
                            </div>

                            <div className="relative overflow-hidden bg-[#0056B3] p-6 text-white">
                                <div className="relative z-10">
                                    <div className="mb-4 flex items-start justify-between">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest opacity-80">
                                                Kinshasa, RDC
                                            </p>
                                            <h4 className="text-xl font-semibold">31°C</h4>
                                        </div>
                                        <span className="material-symbols-outlined text-4xl">
                      wb_sunny
                    </span>
                                    </div>
                                    <p className="mb-4 text-xs opacity-90">
                                        Forte humidité prévue. Conditions optimales pour le suivi de l'irrigation du riz.
                                    </p>
                                    <div className="flex justify-between border-t border-white/20 pt-4">
                                        <div className="text-center">
                                            <p className="text-[10px] opacity-70">Humidité</p>
                                            <p className="text-xs font-bold">82%</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] opacity-70">Vent</p>
                                            <p className="text-xs font-bold">12km/h</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] opacity-70">Pluie</p>
                                            <p className="text-xs font-bold">10%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -right-10 -bottom-10 opacity-10">
                  <span className="material-symbols-outlined text-[160px]">
                    cloud
                  </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 overflow-hidden border border-[#DEE2E6] bg-white">
                            <div className="flex items-center justify-between border-b border-[#DEE2E6] p-6">
                                <h4 className="text-sm font-semibold text-[#1b1c1c]">
                                    Inscriptions récentes des utilisateurs
                                </h4>
                                <div className="flex gap-2">
                                    <button className="border border-[#DEE2E6] p-2 transition-colors hover:bg-slate-50">
                                        <span className="material-symbols-outlined text-sm">filter_list</span>
                                    </button>
                                    <button className="border border-[#DEE2E6] p-2 transition-colors hover:bg-slate-50">
                                        <span className="material-symbols-outlined text-sm">download</span>
                                    </button>
                                    <Link
                                        to="/utilisateurs"
                                        className="flex items-center gap-1 border border-[#003f87] px-3 py-1.5 text-xs font-medium text-[#003f87] transition-colors hover:bg-blue-50"
                                    >
                                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                                        Gérer
                                    </Link>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                    <tr className="border-b border-[#DEE2E6] bg-slate-50 text-xs font-semibold">
                                        <th className="px-6 py-4">Utilisateur</th>
                                        <th className="px-6 py-4">Rôle</th>
                                        <th className="px-6 py-4">Organisation/Ferme</th>
                                        <th className="px-6 py-4">Date d'inscription</th>
                                        <th className="px-6 py-4 text-center">Statut</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="border-b border-[#DEE2E6] transition-colors hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-[#003f87]">
                                                    JM
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Jean M&apos;Boku</p>
                                                    <p className="text-[10px] text-slate-500">
                                                        jean.mboku@agri-corp.cd
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">Propriétaire de ferme</td>
                                        <td className="px-6 py-4">Domaine Lush Valley</td>
                                        <td className="px-6 py-4">24 oct. 2023</td>
                                        <td className="px-6 py-4 text-center">
                        <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold uppercase text-green-700">
                          Actif
                        </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-[#0056B3]">
                          <span className="material-symbols-outlined text-sm">
                            more_vert
                          </span>
                                            </button>
                                        </td>
                                    </tr>

                                    <tr className="border-b border-[#DEE2E6] bg-slate-50 transition-colors hover:bg-slate-100">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                                                    SA
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Sarah Amina</p>
                                                    <p className="text-[10px] text-slate-500">
                                                        s.amina@provincial-gov.cd
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">Conseillère</td>
                                        <td className="px-6 py-4">Ministère de l'Agriculture - Kasaï Central</td>
                                        <td className="px-6 py-4">23 oct. 2023</td>
                                        <td className="px-6 py-4 text-center">
                        <span className="inline-block rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-bold uppercase text-yellow-700">
                          En attente
                        </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-[#0056B3]">
                          <span className="material-symbols-outlined text-sm">
                            more_vert
                          </span>
                                            </button>
                                        </td>
                                    </tr>

                                    <tr className="border-b border-[#DEE2E6] transition-colors hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-[#003f87]">
                                                    PK
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Pierre Kalala</p>
                                                    <p className="text-[10px] text-slate-500">
                                                        p.kalala@fertichem.cd
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">Responsable logistique</td>
                                        <td className="px-6 py-4">Fertichem Logistics</td>
                                        <td className="px-6 py-4">22 oct. 2023</td>
                                        <td className="px-6 py-4 text-center">
                        <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold uppercase text-green-700">
                          Actif
                        </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-[#0056B3]">
                          <span className="material-symbols-outlined text-sm">
                            more_vert
                          </span>
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-6 border border-[#DEE2E6] bg-white">
                            <div className="flex items-center justify-between border-b border-[#DEE2E6] p-6">
                                <h4 className="text-sm font-semibold text-[#1b1c1c]">
                                    Carte de validation géospatiale
                                </h4>
                                <span className="text-xs text-slate-400">République démocratique du Congo</span>
                            </div>
                            <div className="relative h-80 overflow-hidden bg-slate-100">
                                <img
                                    className="h-full w-full object-cover opacity-50 grayscale"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4ZerCG1vWscLVGN7QQm14312EHCjtkaaR0bLbTNCohzNEv-POrTzAeQuByDel4jySyy73gokYcZgA0F1Wm74MXrSfbBPGU9YUfKenXDsWuN_8WrEdjkfSjdERSKs5605jHY_3hcR9UhbxY96K-fArR_ssn9hESGpfLyL5Tb28VtWM8W_9_OreA4mCkIBxFkHQUqr7V4Zqk0mZf83E7Tt5M4atOysHywa45egYG4c_cz9-dEm5IEwvQLHF6qzVTBAUS_NEdBAwbY"
                                    alt="Carte des pôles agricoles en RDC"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-[#0056B3]/20 animate-ping" />
                                        <span
                                            className="material-symbols-outlined text-4xl text-[#0056B3]"
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                      location_on
                    </span>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 rounded border border-[#DEE2E6] bg-white/90 p-2 text-[10px] shadow-sm">
                                    <div className="mb-1 flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-green-500" />
                                        Ferme vérifiée
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-yellow-500" />
                                        En attente de vérification
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-6 border border-[#DEE2E6] bg-white">
                            <div className="border-b border-[#DEE2E6] p-6">
                                <h4 className="text-sm font-semibold text-[#1b1c1c]">
                                    Journal d'activité du système
                                </h4>
                            </div>
                            <div className="space-y-6 p-6">
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-[#003f87]" />
                                        <div className="mt-2 h-full w-px bg-[#DEE2E6]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Nouvelle route logistique approuvée</p>
                                        <p className="text-xs text-slate-500">
                                            Route KIN-MAT-04 validée par l'administrateur système
                                        </p>
                                        <p className="mt-1 text-[10px] text-slate-400">il y a 2 minutes</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-[#b6171e]" />
                                        <div className="mt-2 h-full w-px bg-[#DEE2E6]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-[#b6171e]">
                                            Alerte de latence des capteurs
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Les capteurs d'humidité du secteur Kivu 3 signalent une latence élevée (&gt;2000ms)
                                        </p>
                                        <p className="mt-1 text-[10px] text-slate-400">il y a 15 minutes</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Rapport hebdomadaire généré</p>
                                        <p className="text-xs text-slate-500">
                                            Rapport de prévision de rendement à l'échelle de la plateforme envoyé au ministère de l'Agriculture
                                        </p>
                                        <p className="mt-1 text-[10px] text-slate-400">il y a 1 heure</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-[#DEE2E6] p-6 text-center">
                                <button className="text-xs font-bold text-[#0056B3] hover:underline">
                                    Voir le journal d'audit complet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
