import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OwnerSidebar from "../components/OwnerSidebar";
import { createFarm } from "../api/farms.js";
import { createParcel } from "../api/parcels.js";
import { useAuth } from "../hooks/useAuth.js";
import { MOCK_CROPS } from "../api/mocks.js";
import Icon from '../components/Icon.jsx'

export default function OwnerFarmCreatePage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [farmName, setFarmName]     = useState("");
    const [province, setProvince]     = useState("Kongo Central");
    const [territoire, setTerritoire] = useState("");
    const [area, setArea]             = useState("");
    const [farmDesc, setFarmDesc]     = useState("");
    const [parcelName, setParcelName] = useState("");
    const [crop, setCrop]             = useState(MOCK_CROPS[0].name);
    const [parcelSize, setParcelSize] = useState("");
    const [error, setError]           = useState("");
    const [saving, setSaving]         = useState(false);

    function handleSave() {
        if (!farmName.trim()) { setError("Le nom de la ferme est obligatoire."); return; }
        setSaving(true);
        const farm = createFarm({
            name: farmName.trim(),
            province,
            territoire: territoire.trim() || province,
            area: parseFloat(area) || 0,
            description: farmDesc.trim(),
            ownerId: user?.id || 'owner-001',
        });
        if (parcelName.trim()) {
            createParcel({
                name: parcelName.trim(),
                farmId: farm.id,
                farm: farm.name,
                crop,
                area: parcelSize ? `${parcelSize} ha` : '0 ha',
                status: 'En cours',
            });
        }
        navigate(`/owner/fermes/${farm.id}`);
    }

    return (
        <div className="min-h-screen bg-[#f4f6f9] text-[#1b1c1c]">
            <OwnerSidebar />

            <main className="ml-64 min-h-screen">
                {/* Sticky header */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Link to="/owner/fermes" className="hover:text-[#003f87] transition-colors">Mes Fermes</Link>
                        <Icon name="chevron_right" className="h-4 w-4" />
                        <span className="font-semibold text-[#1b1c1c]">Nouvelle Ferme</span>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("/owner/fermes")}
                            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 rounded-lg bg-[#003f87] px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#002d63] active:scale-95 disabled:opacity-60"
                        >
                            <Icon name="save" className="h-5 w-5 text-base" />
                            {saving ? 'Enregistrementâ€¦' : 'Enregistrer la Ferme'}
                        </button>
                    </div>
                </header>

                <div className="p-8">
                    {error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                            {error}
                        </div>
                    )}
                    {/* Page title */}
                    <div className="mb-8">
                        <h1 className="text-lg font-bold text-[#1b1c1c]">CrÃ©er une Nouvelle Ferme</h1>
                        <p className="mt-0.5 text-xs text-slate-500">
                            Configurez votre exploitation agricole pour commencer le suivi et la gestion des parcelles.
                        </p>
                    </div>

                    {/* Step indicator */}
                    <div className="mb-8 flex items-center gap-0">
                        <StepBar step={1} label="Configuration" active />
                        <StepConnector />
                        <StepBar step={2} label="DÃ©tails Sols" />
                        <StepConnector />
                        <StepBar step={3} label="Finalisation" />
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                        {/* Left column */}
                        <div className="col-span-12 space-y-6 lg:col-span-7">
                            {/* General info */}
                            <Section icon="info" title="Informations GÃ©nÃ©rales">
                                <div className="space-y-5">
                                    <Field
                                        label="Nom de la Ferme"
                                        value={farmName}
                                        onChange={(e) => setFarmName(e.target.value)}
                                        placeholder="Ex: Plantation de Lukula"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <SelectField
                                            label="Province"
                                            value={province}
                                            onChange={(e) => setProvince(e.target.value)}
                                            options={["Kongo Central", "Kinshasa", "Lualaba", "Haut-Katanga", "KasaÃ¯ Oriental", "Maniema", "Nord-Kivu", "Sud-Kivu", "Sud-Ubangi"]}
                                        />
                                        <div className="space-y-1.5">
                                            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Superficie (Hectares)
                                            </label>
                                            <div className="relative">
                                                <input
                                                    value={area}
                                                    onChange={(e) => setArea(e.target.value)}
                                                    className="w-full rounded-lg border border-slate-200 bg-white p-3 pr-10 text-sm outline-none transition-all focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20 placeholder:text-slate-400"
                                                    placeholder="0.0"
                                                    type="number"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">ha</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Field
                                        label="Territoire"
                                        value={territoire}
                                        onChange={(e) => setTerritoire(e.target.value)}
                                        placeholder="Ex: Kasangulu"
                                    />
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Description</label>
                                        <textarea
                                            value={farmDesc}
                                            onChange={(e) => setFarmDesc(e.target.value)}
                                            className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none transition-all focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20 placeholder:text-slate-400"
                                            placeholder="DÃ©taillez les types de cultures prÃ©vus ou l'historique du terrainâ€¦"
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </Section>

                            {/* Geolocation */}
                            <Section
                                icon="location_on"
                                title="Localisation GÃ©ographique"
                                action={
                                    <button className="flex items-center gap-1 text-xs font-semibold text-[#003f87] hover:underline">
                                        <Icon name="my_location" className="h-4 w-4" />
                                        Ma position
                                    </button>
                                }
                            >
                                <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100">
                                    <img
                                        alt="Carte satellite"
                                        className="h-full w-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDg55zfWTnDI0Hv2cNU691_0izlTbufr721GTnDdubI9khhYUHcuaA7d7CPv_3BtONUVSEje8P4eSTeGp5ElEeLY2BnU4echg8Zi9FR1tLejgCARISO3vXQly6ziyKgdze54w6SCOYJ8_1g8TG2ZeFqIsSA4wF3TBgXTA2G1GgqZfC3FgK8Brn9aoPveQylaSVpPNKzBC9MI5CidpG5wYu0ypWufi9hPNDI-GmFoDzG9NWLXUssH4wqkm2-xb3a0N_5ptMJcrJRbA"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#003f87]/20 to-transparent" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#003f87] shadow-lg">
                                            <Icon name="push_pin" className="h-5 w-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 right-3 rounded-lg border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium backdrop-blur-sm shadow-sm">
                                        Lat: -5.8504 Â· Long: 13.4501
                                    </div>
                                </div>
                            </Section>
                        </div>

                        {/* Right column */}
                        <div className="col-span-12 space-y-6 lg:col-span-5">
                            {/* First parcel */}
                            <div className="overflow-hidden rounded-xl shadow-sm">
                                <div className="bg-gradient-to-br from-[#003f87] to-[#0056b3] p-5 text-white">
                                    <div className="mb-2 flex items-center gap-2">
                                        <Icon name="grid_view" className="h-5 w-5 text-base" />
                                        <h3 className="text-sm font-bold">PremiÃ¨re Parcelle</h3>
                                    </div>
                                    <p className="text-xs leading-relaxed text-white/70">
                                        DÃ©finissez votre premiÃ¨re zone de culture pour commencer le suivi de la production.
                                    </p>
                                </div>

                                <div className="space-y-4 bg-white p-5 ring-1 ring-slate-200 ring-t-0">
                                    <Field
                                        label="Nom de la Parcelle"
                                        value={parcelName}
                                        onChange={(e) => setParcelName(e.target.value)}
                                        placeholder="Ex: Zone Nord â€” MaÃ¯s"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <SelectField
                                            label="Culture"
                                            value={crop}
                                            onChange={(e) => setCrop(e.target.value)}
                                            options={MOCK_CROPS.map(c => c.name)}
                                        />
                                        <Field
                                            label="Taille (ha)"
                                            value={parcelSize}
                                            onChange={(e) => setParcelSize(e.target.value)}
                                            placeholder="0.5"
                                            type="number"
                                        />
                                    </div>
                                    <button className="w-full rounded-lg border-2 border-dashed border-[#003f87]/30 py-2.5 text-sm font-semibold text-[#003f87] transition-colors hover:border-[#003f87] hover:bg-blue-50">
                                        <Icon name="add" className="h-4 w-4 mr-1 align-middle" />
                                        Ajouter la parcelle
                                    </button>
                                </div>
                            </div>

                            {/* Weather */}
                            <Section icon="wb_sunny" title="MÃ©tÃ©o Locale">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-3xl font-extrabold text-[#003f87]">28Â°C</p>
                                        <p className="mt-0.5 text-xs font-medium text-slate-500">Ciel dÃ©gagÃ© Â· Matadi</p>
                                    </div>
                                    <Icon name="wb_sunny" className="h-12 w-12 text-amber-400" />
                                </div>
                                <div className="mt-4 grid grid-cols-3 divide-x divide-slate-100 rounded-xl bg-slate-50 text-center">
                                    <WeatherStat label="HumiditÃ©" value="64%" icon="water_drop" />
                                    <WeatherStat label="Pluie 24h" value="0mm"   icon="rainy" />
                                    <WeatherStat label="Vent"     value="12km/h" icon="air" />
                                </div>
                            </Section>

                            {/* Tip */}
                            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                                <div className="flex items-start gap-3">
                                    <Icon name="lightbulb" className="h-5 w-5 mt-0.5 shrink-0 text-base text-[#003f87]" />
                                    <div>
                                        <p className="text-xs font-bold text-[#003f87]">Conseil de prÃ©cision</p>
                                        <p className="mt-1 text-xs leading-relaxed text-blue-700">
                                            La dÃ©finition prÃ©cise de la superficie permet de calculer automatiquement vos besoins en intrants et vos prÃ©visions de rÃ©colte.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

/* â”€â”€â”€ Sub-components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function Section({ icon, title, action, children }) {
    return (
        <div className="rounded-xl bg-white ring-1 ring-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-2">
                    <Icon name={icon} className="h-5 w-5 text-[#003f87]" />
                    <h3 className="text-sm font-bold text-[#1b1c1c]">{title}</h3>
                </div>
                {action}
            </div>
            <div className="p-5">{children}</div>
        </div>
    );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</label>
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none transition-all focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20 placeholder:text-slate-400"
            />
        </div>
    );
}

function SelectField({ label, value, onChange, options }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</label>
            <select
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none transition-all focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20"
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}

function WeatherStat({ label, value, icon }) {
    return (
        <div className="flex flex-col items-center gap-0.5 py-3">
            <Icon name={icon} className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-extrabold text-[#1b1c1c]">{value}</span>
            <span className="text-[10px] uppercase tracking-wide text-slate-400">{label}</span>
        </div>
    );
}

function StepBar({ step, label, active = false }) {
    return (
        <div className={`flex items-center gap-2 ${active ? "" : "opacity-40"}`}>
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${active ? "bg-[#003f87] text-white shadow-sm" : "border-2 border-slate-300 text-slate-400"}`}>
                {step}
            </div>
            <span className={`text-xs font-semibold ${active ? "text-[#003f87]" : "text-slate-400"}`}>{label}</span>
        </div>
    );
}

function StepConnector() {
    return <div className="mx-3 h-px w-10 bg-slate-200" />;
}

