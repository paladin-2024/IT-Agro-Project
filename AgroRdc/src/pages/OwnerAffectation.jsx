import { useState } from "react";
import { motion } from "framer-motion";
import OwnerSidebar from "../components/OwnerSidebar.jsx";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Icon from '../components/Icon.jsx'

const PARCEL_LIST = [
    {
        id: "A-01",
        title: "Parcelle A-01",
        size: "12.5 Ha",
        crop: "Maïs",
        harvest: "Oct 2024",
        status: "Actif",
        statusClass: "bg-emerald-100 text-emerald-700",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTXvuVs1bf1pbIrVcu6il0T-g06Neb-r82LPYdMNhyyG58_PHL5V1BvW6tZ8AgyvSQ9ptRa7hk9YPOJfczx2sd_x-kPtyGqeYFxTmel741u1KmRZd8fPXZTT99Q1tV3mpkLxkALUJgo0GDqAhk57SDdqfsK7_V36MXexepnV5qa_Yb81SoRladbwO_xAlBwTdoZZdAE4492E4xqeAgtOc_EjQkgPnZ79nCoe4YOrJCdczKaHRliMmNvWBPsLGw9GwjfnVZmoYc3JE",
    },
    {
        id: "B-04",
        title: "Parcelle B-04",
        size: "8.2 Ha",
        crop: "Caféier",
        harvest: "Nov 2024",
        status: "Besoin d'Attention",
        statusClass: "bg-amber-100 text-amber-700",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABkwnWul4AL6WN78AmFEPxRILjrbR2wRerEJS-brsT8E7BLeUPLA85EUNb0b5n4HZADwMVUA1oEwGDJmzubtAW4-C1Dbu4j_GZGeogg3sVui-eqRPbOcdfum8PmPdXahmbaEPOatUqdnjrTpQXEJOx4FJyxRG-LefwqYr5lfrbXbYHw2TzjoNs3BQhO0WuvzSVxvXGJTSp66QY3k8K3EK_LYDX5RDIarWpqTe2illCtWnMhKdC8hvp5u46BJvOyaEJBZG4fruDVv7w",
    },
    {
        id: "C-12",
        title: "Parcelle C-12",
        size: "15.0 Ha",
        crop: "Manioc",
        harvest: "En jachère",
        status: "Repos",
        statusClass: "bg-slate-100 text-slate-600",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd_6Xh5E_TL4isO6pkjuIuhCT8AZ_pV3Pr8DICCPPeDcd_qxHQSvZmk36OrG-dYf8OTVB2rZOz0j9FrMWM78TZdrUEXQh0JaN9SMso6AVMXTx5FOmH9WJoGkGRgYAjMxmgFVq5yfnbBARRitf47bZ-JGWGaVfgJ7gQJNII8hTliaYIcRnYMR8aYhSlnmu7L5FrB2zZnvsJVC_Z2gYrNQVxG6KIjGbSq6qvfiyQvexam4s0uqHiSqWEj45uDXrTEAyY0LwKommV_KA",
    },
];

const EMPLOYEE_LIST = [
    { id: "emp-001", name: "Samuel Mwamba",       role: "Agronome Principal" },
    { id: "emp-002", name: "Clarisse Kabuya",      role: "Technicien Irrigation" },
    { id: "emp-003", name: "Jean-Pierre Bolamba",  role: "Expert Sols" },
    { id: "emp-004", name: "Arnaud Mutombo",       role: "Superviseur Récolte" },
];

const STORAGE_KEY = "agrordc_assignments";

function loadAssignments() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}

export default function OwnerAffectation() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedParcelId, setSelectedParcelId] = useState("B-04");
    const [assignments, setAssignments] = useState(loadAssignments);
    const [saving, setSaving] = useState(false);
    const [savedMsg, setSavedMsg] = useState("");

    const openDrawer = (parcelId) => {
        setSelectedParcelId(parcelId);
        setDrawerOpen(true);
    };

    const toggleEmployee = (employeeId) => {
        setAssignments((prev) => {
            const current = prev[employeeId] ?? [];
            const updated = current.includes(selectedParcelId)
                ? current.filter((id) => id !== selectedParcelId)
                : [...current, selectedParcelId];
            return { ...prev, [employeeId]: updated };
        });
    };

    const handleConfirm = async () => {
        setSaving(true);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
        await new Promise((r) => setTimeout(r, 400));
        setSaving(false);
        setDrawerOpen(false);
        setSavedMsg("Affectations sauvegardées !");
        setTimeout(() => setSavedMsg(""), 3000);
    };

    const getParcelWorkers = (parcelId) => {
        return EMPLOYEE_LIST.filter((emp) =>
            (assignments[emp.id] ?? []).includes(parcelId)
        );
    };

    const parcels = PARCEL_LIST.map((p) => {
        const workers = getParcelWorkers(p.id);
        const hasWorkers = workers.length > 0;
        return {
            ...p,
            workers: hasWorkers ? `+${workers.length} assigné${workers.length > 1 ? "s" : ""}` : "0 Personnel assigné",
            actionLabel: hasWorkers ? "Modifier" : "Affecter Personnel",
            actionStyle: hasWorkers ? "outline-blue" : "filled",
            selected: p.id === selectedParcelId && drawerOpen,
        };
    });

    const employees = EMPLOYEE_LIST.map((emp) => ({
        ...emp,
        assigned: (assignments[emp.id] ?? []).includes(selectedParcelId),
    }));

    return (
        <div className="min-h-screen bg-[#f4f6f9] text-[#1b1c1c]">
            <OwnerSidebar />

            <main className="ml-64 min-h-screen">
                {/* Sticky header */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
                    <div>
                        <h1 className="text-lg font-bold text-[#1b1c1c]">Affectation du Personnel</h1>
                        <p className="text-xs text-slate-500">Gérez les ressources humaines assignées aux opérations de terrain</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-all hover:border-[#003f87] hover:text-[#003f87]">
                            <Icon name="filter_list" className="h-4 w-4" />
                            Filtrer
                        </button>
                        <button
                            onClick={() => openDrawer(selectedParcelId)}
                            className="flex items-center gap-2 rounded-lg bg-[#003f87] px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#002d63] active:scale-95"
                        >
                            <Icon name="person_add" className="h-5 w-5 text-base" />
                            Affecter Employé
                        </button>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {savedMsg && (
                        <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-semibold text-emerald-700">
                            {savedMsg}
                        </div>
                    )}

                    {/* Parcel cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {parcels.map((p) => (
                            <ParcelCard key={p.id} parcel={p} onAssign={() => openDrawer(p.id)} />
                        ))}
                    </div>

                    {/* Workforce overview */}
                    <div className="grid grid-cols-12 gap-6">
                        <section className="col-span-12 rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-sm lg:col-span-8">
                            <div className="mb-5 flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#1b1c1c]">Aperçu de la Main-d'œuvre</h2>
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#003f87]">
                                    Total: 142 employés
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <WorkforceStat icon="engineering"    value="18" label="Agronomes" />
                                <WorkforceStat icon="psychology"     value="42" label="Techniciens" />
                                <WorkforceStat icon="nature_people"  value="82" label="Agents Terrain" />
                            </div>
                        </section>

                        <section className="relative col-span-12 overflow-hidden rounded-xl bg-gradient-to-br from-[#003f87] to-[#0056b3] p-6 text-white shadow-md lg:col-span-4">
                            <div className="pointer-events-none absolute -bottom-8 -right-8 opacity-10">
                                <Icon name="groups" className="h-5 w-5 text-[140px]" />
                            </div>
                            <h2 className="text-sm font-bold">Taux d'Affectation</h2>
                            <p className="mt-1 text-xs text-white/70">84% des parcelles critiques couvertes</p>
                            <div className="mt-6">
                                <div className="mb-1.5 h-2 w-full overflow-hidden rounded-full bg-white/20">
                                    <div className="h-full w-[84%] rounded-full bg-white" />
                                </div>
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                    <span>Couverture</span>
                                    <span>84%</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* shadcn Sheet replaces the hand-rolled drawer — handles focus trapping, Escape key, scroll lock */}
            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                <SheetContent side="right" className="w-full max-w-md flex flex-col p-0">
                    <SheetHeader className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                                <Icon name="person_add" className="h-5 w-5 text-base text-primary" />
                            </div>
                            <div>
                                <SheetTitle className="text-sm font-bold text-foreground">Affecter du Personnel</SheetTitle>
                                <p className="text-xs text-muted-foreground">
                                    {PARCEL_LIST.find((p) => p.id === selectedParcelId)?.title ?? selectedParcelId}
                                    {' · '}
                                    {PARCEL_LIST.find((p) => p.id === selectedParcelId)?.crop ?? ''}
                                </p>
                            </div>
                        </div>
                    </SheetHeader>

                    <div className="flex-1 space-y-5 overflow-y-auto p-6">
                        <div className="relative">
                            <Icon name="search" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400"
                                placeholder="Rechercher par nom ou compétence…"
                                type="text"
                            />
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Employés Disponibles</h3>
                            {employees.map((emp, i) => (
                                <motion.div
                                    key={emp.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: i * 0.06 }}
                                >
                                    <EmployeeRow {...emp} onToggle={() => toggleEmployee(emp.id)} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <SheetFooter className="flex gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
                        <Button variant="outline" className="flex-1" onClick={() => setDrawerOpen(false)}>
                            Annuler
                        </Button>
                        <Button
                            className="flex-[2] bg-primary hover:bg-primary-hover"
                            onClick={handleConfirm}
                            disabled={saving}
                        >
                            {saving ? 'Enregistrement…' : `Confirmer (${employees.filter(e => e.assigned).length})`}
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function ParcelCard({ parcel, onAssign }) {
    const { title, size, crop, harvest, status, statusClass, image, workers, actionLabel, actionStyle, selected } = parcel;

    const btnClass = {
        filled:       "bg-[#003f87] text-white hover:bg-[#002d63]",
        "outline-blue":"border border-[#003f87] text-[#003f87] hover:bg-blue-50",
        outline:      "border border-slate-200 text-slate-500 hover:bg-slate-50",
    }[actionStyle];

    return (
        <div className={`group overflow-hidden rounded-xl bg-white ring-1 transition-all duration-200 hover:shadow-lg ${selected ? "ring-[#003f87] shadow-md" : "ring-slate-200"}`}>
            <div className="relative h-36">
                <img className="h-full w-full object-cover transition-all group-hover:scale-105" src={image} alt={title} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusClass}`}>
                    {status}
                </span>
                {selected && (
                    <div className="absolute right-2 top-2">
                        <Icon name="check_circle" className="h-5 w-5 rounded-full bg-white text-[#003f87]" />
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="mb-1 flex items-start justify-between">
                    <h3 className="text-sm font-bold text-[#1b1c1c] group-hover:text-[#003f87] transition-colors">{title}</h3>
                    <span className="text-xs text-slate-500">{size}</span>
                </div>
                <p className="mb-3 text-xs text-slate-500">
                    {crop} · Récolte: {harvest}
                </p>

                <div className="mb-4 flex items-center gap-2">
                    {actionStyle === "outline" ? (
                        <span className="text-xs text-slate-400">{workers}</span>
                    ) : actionStyle === "filled" ? (
                        <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">{workers}</span>
                    ) : (
                        <>
                            <div className="flex -space-x-2">
                                <AvatarCircle /><AvatarCircle />
                            </div>
                            <span className="text-xs font-medium text-slate-500">{workers}</span>
                        </>
                    )}
                </div>

                <button
                    onClick={actionStyle === "filled" ? onAssign : undefined}
                    className={`w-full rounded-lg py-2 text-xs font-bold transition-all ${btnClass}`}
                >
                    {actionLabel}
                </button>
            </div>
        </div>
    );
}

function WorkforceStat({ icon, value, label }) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#003f87]/10">
                <Icon name={icon} className="h-5 w-5 text-[#003f87]" />
            </div>
            <div>
                <p className="text-xl font-extrabold text-[#1b1c1c]">{value}</p>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
            </div>
        </div>
    );
}

function EmployeeRow({ name, role, assigned, onToggle }) {
    return (
        <div className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${assigned ? "border-blue-200 bg-blue-50/40" : "border-slate-200 hover:bg-slate-50"}`}>
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    <Icon name="person" className="h-5 w-5 text-base text-slate-400" />
                </div>
                <div>
                    <p className="text-sm font-bold text-[#1b1c1c]">{name}</p>
                    <p className="text-[11px] font-semibold text-[#003f87]">{role}</p>
                </div>
            </div>
            {assigned ? (
                <button
                    onClick={onToggle}
                    className="flex items-center gap-1.5 text-emerald-600 hover:text-red-500 transition-colors"
                >
                    <Icon name="check_circle" className="h-5 w-5 text-base" />
                    <span className="text-xs font-bold">Assigné</span>
                </button>
            ) : (
                <button
                    onClick={onToggle}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:border-[#003f87] hover:bg-blue-50 hover:text-[#003f87]"
                >
                    Affecter
                </button>
            )}
        </div>
    );
}

function AvatarCircle() {
    return (
        <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-slate-200">
            <Icon name="person" className="h-4 w-4 text-slate-400" />
        </div>
    );
}
