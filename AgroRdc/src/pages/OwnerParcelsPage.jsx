import React from "react";
import OwnerSidebar from "../components/OwnerSidebar";

const parcelRows = [
    {
        id: "PAR-2023-001",
        crop: "Maïs Hybride",
        cropIcon: "grain",
        cropClass: "text-green-600",
        area: "4.5 Hectares",
        date: "12 Oct 2023",
        status: "En Croissance",
        statusClass: "bg-green-100 text-green-800",
        dotClass: "bg-green-600",
    },
    {
        id: "PAR-2023-002",
        crop: "Café Robusta",
        cropIcon: "coffee",
        cropClass: "text-amber-600",
        area: "12.0 Hectares",
        date: "05 Sep 2023",
        status: "Planté",
        statusClass: "bg-blue-100 text-blue-800",
        dotClass: "bg-blue-600",
    },
    {
        id: "PAR-2023-003",
        crop: "Manioc",
        cropIcon: "potted_plant",
        cropClass: "text-[#424752]",
        area: "2.8 Hectares",
        date: "20 Nov 2023",
        status: "En attente",
        statusClass: "bg-[#ffdbcc] text-[#7b2f00]",
        dotClass: "bg-[#722b00]",
    },
];

export default function OwnerParcelsPage() {
    return (
        <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c]">
            <OwnerSidebar active="Parcels" />

            <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-[#424752]">Parcelles / Kinshasa Nord</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            className="w-64 rounded-full border border-[#c2c6d4] bg-[#f5f3f3] px-4 py-2 pr-10 text-sm outline-none focus:border-[#003f87] focus:ring-1 focus:ring-[#003f87]"
                            placeholder="Rechercher une parcelle..."
                            type="text"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-2 text-sm text-[#424752]">
              search
            </span>
                    </div>

                    <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                        <IconButton icon="notifications" />
                        <IconButton icon="help" />
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d7e2ff] font-bold text-[#001a40]">
                            JD
                        </div>
                    </div>
                </div>
            </header>

            <main className="ml-64 min-h-[calc(100vh-64px)] p-8 pt-24">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="mb-2 text-[32px] font-semibold leading-10 text-[#1b1c1c]">
                            Gestion des Parcelles
                        </h2>
                        <p className="max-w-2xl text-base text-[#424752]">
                            Visualisez et gérez l'état de vos cultures, les zones de plantation et les dates de récolte prévues pour l'ensemble de votre exploitation.
                        </p>
                    </div>

                    <button className="flex items-center gap-2 rounded-xl bg-[#003f87] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#003f87]/20 transition-transform hover:scale-105">
                        <span className="material-symbols-outlined">add</span>
                        Ajouter une Parcelle
                    </button>
                </div>

                <div className="mb-8 grid grid-cols-12 gap-6">
                    <section className="col-span-12 flex min-h-[400px] flex-col overflow-hidden rounded-xl border border-[#c2c6d4] bg-white lg:col-span-8">
                        <div className="flex items-center justify-between border-b border-[#c2c6d4] bg-[#f5f3f3] px-6 py-4">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#003f87]">map</span>
                                <span className="text-sm font-semibold">Vue Géospatiale - Kinshasa Nord</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="rounded-full border border-[#727784] px-3 py-1 text-xs font-medium hover:bg-white transition-colors">
                                    Satellite
                                </button>
                                <button className="rounded-full bg-[#003f87] px-3 py-1 text-xs font-medium text-white">
                                    Terrain
                                </button>
                            </div>
                        </div>

                        <div className="relative flex-1 bg-[#e4e2e1]">
                            <img
                                alt="Carte des parcelles"
                                className="h-full w-full object-cover grayscale-[0.2] contrast-[1.1]"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMP-bH8qFP9KObpIBIhvBN0jYxQoh5nKpTqdymC3q3wYDdIt66wuH_GLQ6y9ShCpRGUuwUg93xW9-B-bGvz-H6HdZuLpX675Co4VD5iu-CsJp1xyCamJiPolofSCzK-LiQJVywSbom7komfresGAA8a-pXzY89G_lMaCjAS8f_0R_ZcD8mQu1plwHMgzgb0Pn6E9kLyO7KSwWEmLBAw4TqyXDRIpkglwbzTsvzcA-yTsYma2gUbLFp20VS5TzU67A9bw8EhiFLttw"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-[#003f87]/10 mix-blend-multiply" />

                            <MapTag className="top-1/4 left-1/3 border-[#003f87]" dot="bg-green-500" text="P-042: MAÏS" />
                            <MapTag className="bottom-1/3 right-1/4 border-[#b6171e]" dot="bg-red-500" text="P-055: ALERTE" pulse />
                        </div>
                    </section>

                    <div className="col-span-12 space-y-6 lg:col-span-4">
                        <section className="rounded-xl border border-[#c2c6d4] bg-white p-6">
                            <h3 className="mb-4 text-sm font-semibold text-[#1b1c1c]">Répartition par État</h3>
                            <div className="space-y-4">
                                <ProgressItem label="Croissance" value="42%" width="42%" color="bg-green-600" />
                                <ProgressItem label="Planté" value="38%" width="38%" color="bg-blue-600" />
                                <ProgressItem label="En attente" value="20%" width="20%" color="bg-[#722b00]" />
                            </div>
                        </section>

                        <section className="overflow-hidden rounded-xl border border-[#c2c6d4] bg-white">
                            <div className="bg-[#0056b3] p-6 text-[#bbd0ff]">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="mb-1 text-xs uppercase tracking-widest opacity-80">Météo Locale</p>
                                        <h4 className="text-2xl font-semibold text-white">Kinshasa</h4>
                                        <span className="mt-2 block text-4xl font-black text-white">31°C</span>
                                    </div>
                                    <span className="material-symbols-outlined text-5xl text-white">sunny</span>
                                </div>
                            </div>

                            <div className="flex justify-around bg-white p-4">
                                <MiniMetric label="Humidité" value="78%" />
                                <MiniMetric label="Vent" value="12km/h" bordered />
                                <MiniMetric label="Pluie" value="10%" />
                            </div>
                        </section>
                    </div>
                </div>

                <section className="overflow-hidden rounded-xl border border-[#c2c6d4] bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-[#c2c6d4] px-6 py-5">
                        <div className="flex items-center gap-3">
                            <h3 className="text-sm font-semibold text-[#1b1c1c]">Registre des Parcelles</h3>
                            <span className="rounded-full bg-[#f0eded] px-2 py-0.5 text-[10px] font-bold text-[#424752]">
                TOTAL: 12
              </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <ActionLink icon="filter_list" label="Filtrer" />
                            <ActionLink icon="download" label="Exporter" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                            <tr className="border-b border-[#c2c6d4] bg-[#f5f3f3]">
                                <Th>Identifiant</Th>
                                <Th>Culture</Th>
                                <Th>Superficie</Th>
                                <Th>Date de Plantation</Th>
                                <Th>Statut</Th>
                                <Th align="right">Actions</Th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-[#c2c6d4]">
                            {parcelRows.map((row) => (
                                <tr key={row.id} className="transition-colors hover:bg-slate-50">
                                    <td className="px-6 py-4 font-bold text-[#003f87]">{row.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`material-symbols-outlined ${row.cropClass}`}>{row.cropIcon}</span>
                                            <span>{row.crop}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{row.area}</td>
                                    <td className="px-6 py-4 text-[#424752]">{row.date}</td>
                                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold uppercase ${row.statusClass}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${row.dotClass}`} />
                          {row.status}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="rounded p-1 transition-colors hover:bg-[#f0eded]">
                                            <span className="material-symbols-outlined text-[#424752]">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between bg-[#f5f3f3] px-6 py-4 text-xs font-semibold text-[#424752]">
                        <span>Affichage de 3 sur 12 parcelles</span>
                        <div className="flex gap-2">
                            <button className="rounded border border-[#c2c6d4] bg-white px-3 py-1 disabled:opacity-50" disabled>
                                Précédent
                            </button>
                            <button className="rounded border border-[#c2c6d4] bg-white px-3 py-1 hover:bg-gray-100">
                                Suivant
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <CreateParcelModal />
        </div>
    );
}

function CreateParcelModal() {
    return (
        <div className="fixed inset-0 z-[60] flex justify-end bg-[#1b1c1c]/40 backdrop-blur-sm">
            <div className="flex h-full w-full max-w-md flex-col border-l border-[#c2c6d4] bg-white p-8 shadow-2xl">
                <div className="mb-8 flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-[#1b1c1c]">Ajouter une Parcelle</h3>
                    <button className="rounded-full p-2 transition-colors hover:bg-[#f0eded]">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form className="flex-1 space-y-6 overflow-y-auto pr-2">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#424752]">ID de la Ferme</label>
                        <div className="relative">
                            <select
                                className="w-full cursor-not-allowed appearance-none rounded-lg border border-[#c2c6d4] bg-[#f5f3f3] p-3 text-[#424752] outline-none transition-all focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]"
                                disabled
                            >
                                <option>Kinshasa Nord - Site Principal</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-3 text-[#424752] opacity-50">
                lock
              </span>
                        </div>
                    </div>

                    <Field label="Type de Culture" as="select">
                        <option value="">Sélectionnez une culture</option>
                        <option value="maize">Maïs</option>
                        <option value="cassava">Manioc</option>
                        <option value="coffee">Café</option>
                        <option value="cocoa">Cacao</option>
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Superficie (Ha)" type="number" placeholder="0.0" />
                        <Field label="Date de Plantation" type="date" />
                    </div>

                    <div className="rounded-xl border border-[#003f87]/20 bg-[#d7e2ff] p-4">
                        <p className="text-xs leading-relaxed text-[#004491]">
                            <span className="material-symbols-outlined mr-1 align-middle text-sm">info</span>
                            L'identifiant de la parcelle sera généré automatiquement selon les conventions de l'exploitation Kinshasa Nord.
                        </p>
                    </div>

                    <div className="pt-8">
                        <div className="relative mb-4 h-[150px] w-full overflow-hidden rounded-xl border border-[#c2c6d4]">
                            <img
                                alt="Exemple de parcelle"
                                className="h-full w-full object-cover opacity-60"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChGgD9cy4ITwOt95-RCwmWqO_xF4vVMXSLIXS1g3q8i1nTlFUQNWybhumb0u5FOLbxYZAaAAQJvAbGU_xbmtH_xV_V2KkF5Hwk9SHq-Isp7u2Gzsjcm_bxvbK92a9X5DHnxJ1tgcKs74CYGVToEawC7ACMeasCnEGAkMTZjvYIz98aRRyBql2LQDabqhwN7plJVIGy4Pd08P6ikcPyHxjG3Nl7i0axj9cvIMgM362YDZOqyCF2TkY9tsfm_pI175u0lXKgHwgPMF4"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                            <div className="absolute bottom-4 left-4">
                <span className="rounded bg-white/80 px-2 py-1 text-[10px] font-bold text-[#003f87] backdrop-blur">
                  PRÉVISUALISATION
                </span>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="flex gap-3 border-t border-[#c2c6d4] pt-6">
                    <button className="flex-1 rounded-xl border border-[#c2c6d4] py-3 text-sm font-semibold text-[#424752] transition-colors hover:bg-[#f0eded]">
                        Annuler
                    </button>
                    <button className="flex-[2] rounded-xl bg-[#003f87] py-3 text-sm font-semibold text-white shadow-lg shadow-[#003f87]/20 transition-opacity hover:opacity-90">
                        Confirmer la création
                    </button>
                </div>
            </div>
        </div>
    );
}

function Field({ label, type = "text", placeholder, as = "input", children }) {
    const common =
        "w-full rounded-lg border border-[#c2c6d4] bg-white p-3 outline-none transition-all focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]";

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1b1c1c]">{label}</label>
            {as === "select" ? (
                <select className={common}>{children}</select>
            ) : (
                <input className={common} type={type} placeholder={placeholder} />
            )}
        </div>
    );
}

function MapTag({ className, text, dot, pulse = false }) {
    return (
        <div className={`absolute flex items-center gap-2 rounded-lg border bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur ${className}`}>
            <div className={`h-2 w-2 rounded-full ${dot} ${pulse ? "animate-pulse" : ""}`} />
            <span className="text-[10px] font-bold text-[#1b1c1c]">{text}</span>
        </div>
    );
}

function ProgressItem({ label, value, width, color }) {
    return (
        <div>
            <div className="mb-1 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-[#424752]">
          <span className={`h-2 w-2 rounded-full ${color}`} />
            {label}
        </span>
                <span className="text-sm font-bold">{value}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#f0eded]">
                <div className={`h-1.5 rounded-full ${color}`} style={{ width }} />
            </div>
        </div>
    );
}

function MiniMetric({ label, value, bordered = false }) {
    return (
        <div className={`text-center ${bordered ? "border-x border-[#c2c6d4] px-6" : ""}`}>
            <span className="block text-[10px] uppercase text-[#424752]">{label}</span>
            <span className="text-sm font-bold text-[#1b1c1c]">{value}</span>
        </div>
    );
}

function ActionLink({ icon, label }) {
    return (
        <button className="flex items-center gap-2 text-sm text-[#424752] transition-colors hover:text-[#003f87]">
            <span className="material-symbols-outlined text-lg">{icon}</span>
            {label}
        </button>
    );
}

function Th({ children, align = "left" }) {
    return <th className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#424752] text-${align}`}>{children}</th>;
}

function IconButton({ icon }) {
    return (
        <button className="rounded-full p-2 text-[#424752] transition-colors hover:bg-gray-100">
            <span className="material-symbols-outlined">{icon}</span>
        </button>
    );
}