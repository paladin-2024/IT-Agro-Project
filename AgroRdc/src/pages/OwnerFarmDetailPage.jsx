import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import OwnerSidebar from "../components/OwnerSidebar";

const farmsData = {
    "KP-001": {
        id: "KP-001", name: "Kipushi Main", province: "Haut-Katanga", territoire: "Kipushi", area: 450, status: "Actif",
        description: "Exploitation principale dédiée à la culture du maïs hybride et du soja en rotation saisonnière.",
        parcels: [
            { id: "KP-A01", crop: "Maïs Hybride (H614)", area: 24.5, date: "12 Nov 2023", status: "En cours",        statusClass: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
            { id: "KP-B12", crop: "Soja (S-02)",          area: 18.2, date: "05 Déc 2023", status: "Irrigation",     statusClass: "bg-blue-100 text-blue-800",     dot: "bg-blue-500" },
            { id: "KP-C05", crop: "Maïs Jaune",            area: 32.0, date: "28 Oct 2023", status: "Récolte prête", statusClass: "bg-amber-100 text-amber-800",   dot: "bg-amber-500" },
            { id: "KP-D08", crop: "Jachère",               area: 15.0, date: "—",           status: "Repos",         statusClass: "bg-slate-100 text-slate-600",   dot: "bg-slate-400" },
        ],
    },
    "LK-002": {
        id: "LK-002", name: "Likasi North", province: "Haut-Katanga", territoire: "Likasi", area: 120, status: "Actif",
        description: "Ferme spécialisée dans la culture du maïs jaune destiné aux marchés locaux de Likasi.",
        parcels: [
            { id: "LK-N05", crop: "Maïs Jaune", area: 45.0, date: "28 Oct 2023", status: "Récolte prête", statusClass: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
            { id: "LK-N08", crop: "Jachère",    area: 12.0, date: "—",           status: "Repos",         statusClass: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
        ],
    },
    "KN-003": {
        id: "KN-003", name: "Kinshasa Nord", province: "Kinshasa", territoire: "Kinshasa", area: 85, status: "Partiel",
        description: "Site de culture mixte combinant manioc et café robusta pour une diversification des revenus.",
        parcels: [
            { id: "PAR-2023-001", crop: "Maïs Hybride", area: 4.5,  date: "12 Oct 2023", status: "En Croissance", statusClass: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
            { id: "PAR-2023-002", crop: "Café Robusta", area: 12.0, date: "05 Sep 2023", status: "Planté",        statusClass: "bg-blue-100 text-blue-800",      dot: "bg-blue-500" },
            { id: "PAR-2023-003", crop: "Manioc",       area: 2.8,  date: "20 Nov 2023", status: "En attente",   statusClass: "bg-orange-100 text-orange-800",  dot: "bg-orange-400" },
        ],
    },
};

export default function OwnerFarmDetailPage() {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const farm = farmsData[id];

    if (!farm) {
        return (
            <div className="min-h-screen bg-[#f4f6f9]">
                <OwnerSidebar />
                <main className="ml-64 flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                            <span className="material-symbols-outlined text-3xl text-slate-400">error_outline</span>
                        </div>
                        <p className="text-lg font-bold text-[#1b1c1c]">Ferme introuvable</p>
                        <p className="mt-1 text-sm text-slate-500">L'identifiant « {id} » ne correspond à aucune ferme.</p>
                        <Link to="/owner/fermes" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#003f87] hover:underline">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Retour à Mes Fermes
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const cultivatedArea = farm.parcels.reduce((s, p) => s + p.area, 0).toFixed(1);
    const coveragePct = Math.round((parseFloat(cultivatedArea) / farm.area) * 100);
    const activeParcels = farm.parcels.filter(p => p.status !== "Repos").length;

    return (
        <div className="min-h-screen bg-[#f4f6f9] text-[#1b1c1c]">
            <OwnerSidebar />

            <main className="ml-64 min-h-screen">
                {/* Sticky header */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/owner/fermes"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-[#003f87] hover:text-[#003f87]"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                        </Link>
                        <div className="h-5 w-px bg-slate-200" />
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-base font-bold text-[#1b1c1c]">{farm.name}</h1>
                                <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-slate-500">{farm.id}</span>
                                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${farm.status === "Actif" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                    {farm.status}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500">{farm.province} · {farm.area} Ha</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-[#003f87] transition-all hover:border-[#003f87] hover:bg-blue-50">
                            <span className="material-symbols-outlined text-base">edit</span>
                            Modifier
                        </button>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-1.5 rounded-lg bg-[#003f87] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#002d63] active:scale-95"
                        >
                            <span className="material-symbols-outlined text-base">add</span>
                            Ajouter une parcelle
                        </button>
                    </div>
                </header>

                <div className="p-8 space-y-7">
                    {/* Hero stat row */}
                    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                        <HeroStat icon="straighten"   label="Superficie totale"   value={`${farm.area} Ha`}         iconBg="bg-[#003f87]" />
                        <HeroStat icon="grid_view"    label="Nb. parcelles"        value={`${farm.parcels.length} parcelles`} iconBg="bg-emerald-600" />
                        <HeroStat icon="crop_square"  label="Surface cultivée"     value={`${cultivatedArea} Ha`}    iconBg="bg-amber-500" sub={`${coveragePct}% de couverture`} />
                        <HeroStat icon="check_circle" label="Parcelles actives"    value={`${activeParcels} / ${farm.parcels.length}`} iconBg="bg-purple-600" />
                    </div>

                    {/* Info + map */}
                    <div className="grid grid-cols-12 gap-6">
                        <section className="col-span-12 rounded-xl bg-white shadow-sm ring-1 ring-slate-200 lg:col-span-8">
                            <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
                                <span className="material-symbols-outlined text-[#003f87]">info</span>
                                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Informations générales</h2>
                            </div>
                            <div className="p-6">
                                <p className="mb-6 text-sm leading-relaxed text-slate-600">{farm.description}</p>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
                                    <MetaItem label="Province"         value={farm.province} />
                                    <MetaItem label="Territoire"       value={farm.territoire} />
                                    <MetaItem label="Identifiant"      value={farm.id} mono />
                                    <MetaItem label="Superficie totale" value={`${farm.area} Ha`} />
                                </div>

                                <div className="mt-6 rounded-lg bg-slate-50 p-4">
                                    <div className="mb-2 flex items-center justify-between text-xs">
                                        <span className="font-semibold text-slate-600">Taux de couverture des parcelles</span>
                                        <span className="font-bold text-[#003f87]">{coveragePct}%</span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className="h-full rounded-full bg-[#003f87] transition-all"
                                            style={{ width: `${coveragePct}%` }}
                                        />
                                    </div>
                                    <p className="mt-1.5 text-[11px] text-slate-400">{cultivatedArea} Ha cultivés sur {farm.area} Ha total</p>
                                </div>
                            </div>
                        </section>

                        <section className="col-span-12 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 lg:col-span-4">
                            <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
                                <span className="material-symbols-outlined text-[#003f87]">location_on</span>
                                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Localisation</h2>
                            </div>
                            <div className="relative h-44">
                                <img
                                    alt="Carte géospatiale"
                                    className="h-full w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuALBK0bS3Ng_3nkskuXwuhQfOWZef4Aw5KJd-OKWnUnAHf9QH_HwEuPJ83HuXBUYK59U902Bv-NWkuVo2aLgijsPPJrbYqaJXzj9dMzMt1Yedj5hw_j3lIX7G3LVJVtg8WNcE-eV5lxW9n3IQEG5ksFm-1DobJrbRzarFeB4Vih7-BjkilGq_5xnsWDxxkFHA_4C4zOtnVrhg7E7b2LR5yrc3GIZ0z1wMkjn5vHKrsKbjsc84r_dP1nf2oUMb06uH3qeMWkMA8Sn2g"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#003f87]/60 to-transparent" />
                                <div className="absolute bottom-3 left-4 right-4">
                                    <p className="text-sm font-bold text-white">{farm.territoire}</p>
                                    <p className="text-xs text-white/80">{farm.province}, RDC</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-slate-100 border-t border-slate-100">
                                <div className="px-4 py-3 text-center">
                                    <p className="text-[10px] font-medium uppercase text-slate-400">Province</p>
                                    <p className="text-sm font-semibold text-[#1b1c1c]">{farm.province}</p>
                                </div>
                                <div className="px-4 py-3 text-center">
                                    <p className="text-[10px] font-medium uppercase text-slate-400">Territoire</p>
                                    <p className="text-sm font-semibold text-[#1b1c1c]">{farm.territoire}</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Parcels table */}
                    <section className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#003f87]">grid_view</span>
                                <div>
                                    <h2 className="text-sm font-bold text-[#1b1c1c]">Parcelles de cette ferme</h2>
                                    <p className="text-xs text-slate-500">{farm.parcels.length} parcelle(s) enregistrée(s)</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center gap-1.5 rounded-lg bg-[#003f87] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#002d63] active:scale-95"
                            >
                                <span className="material-symbols-outlined text-base">add</span>
                                Nouvelle parcelle
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50">
                                        <Th>ID Parcelle</Th>
                                        <Th>Culture</Th>
                                        <Th>Superficie</Th>
                                        <Th>Date plantation</Th>
                                        <Th>Statut</Th>
                                        <Th align="right">Actions</Th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {farm.parcels.map((p) => (
                                        <tr key={p.id} className="group transition-colors hover:bg-blue-50/30">
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-xs font-bold text-[#003f87] bg-blue-50 px-2 py-1 rounded">
                                                    {p.id}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-[#1b1c1c]">{p.crop}</td>
                                            <td className="px-6 py-4 text-slate-700">{p.area} Ha</td>
                                            <td className="px-6 py-4 text-slate-500">{p.date}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${p.statusClass}`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} />
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    to={`/owner/parcelles/${p.id}`}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-transparent px-2.5 py-1 text-xs font-semibold text-[#003f87] transition-all group-hover:border-[#003f87] group-hover:bg-blue-50"
                                                >
                                                    Voir
                                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>

            {showModal && <AddParcelModal onClose={() => setShowModal(false)} farmName={farm.name} />}
        </div>
    );
}

function HeroStat({ icon, label, value, iconBg, sub }) {
    return (
        <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
                <span className="material-symbols-outlined text-xl text-white">{icon}</span>
            </div>
            <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
                <p className="mt-0.5 text-xl font-extrabold text-[#1b1c1c]">{value}</p>
                {sub && <p className="text-[11px] text-slate-400">{sub}</p>}
            </div>
        </div>
    );
}

function MetaItem({ label, value, mono = false }) {
    return (
        <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
            <p className={`mt-1 text-sm font-semibold text-[#1b1c1c] ${mono ? "font-mono text-[#003f87]" : ""}`}>{value}</p>
        </div>
    );
}

function Th({ children, align = "left" }) {
    return (
        <th className={`px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-${align}`}>
            {children}
        </th>
    );
}

function AddParcelModal({ onClose, farmName }) {
    return (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
            <div
                className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal header */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-5">
                    <div>
                        <h3 className="text-base font-bold text-[#1b1c1c]">Nouvelle Parcelle</h3>
                        <p className="text-xs text-slate-500">{farmName}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-200"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>

                {/* Form */}
                <form className="flex-1 space-y-5 overflow-y-auto p-6">
                    <ModalField label="Nom de la parcelle" type="text" placeholder="Ex : Zone Nord" />

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-[#1b1c1c]">Culture</label>
                        <select className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#1b1c1c] outline-none focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20">
                            <option value="">Sélectionnez une culture</option>
                            <option value="maize">Maïs</option>
                            <option value="cassava">Manioc</option>
                            <option value="coffee">Café</option>
                            <option value="cocoa">Cacao</option>
                            <option value="soja">Soja</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <ModalField label="Superficie (Ha)" type="number" placeholder="0.0" />
                        <ModalField label="Date de plantation" type="date" />
                    </div>

                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                        <div className="flex gap-3">
                            <span className="material-symbols-outlined text-sm text-[#003f87]">info</span>
                            <p className="text-xs leading-relaxed text-[#003f87]">
                                L'identifiant de la parcelle sera généré automatiquement selon les conventions de la ferme <strong>{farmName}</strong>.
                            </p>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="flex-[2] rounded-lg bg-[#003f87] py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#002d63] active:scale-[0.98]"
                    >
                        Créer la parcelle
                    </button>
                </div>
            </div>
        </div>
    );
}

function ModalField({ label, type, placeholder }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#1b1c1c]">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#1b1c1c] outline-none placeholder:text-slate-400 focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20"
            />
        </div>
    );
}
