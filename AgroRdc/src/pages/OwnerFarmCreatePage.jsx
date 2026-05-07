import React, { useState } from "react";
import OwnerSidebar from "../components/OwnerSidebar";

export default function OwnerFarmCreatePage() {
    const [farmName, setFarmName] = useState("");
    const [province, setProvince] = useState("Kongo Central");
    const [area, setArea] = useState("");
    const [farmDesc, setFarmDesc] = useState("");
    const [parcelName, setParcelName] = useState("");
    const [crop, setCrop] = useState("Maïs");
    const [parcelSize, setParcelSize] = useState("");

    return (
        <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c]">
            <OwnerSidebar />

            <main className="ml-64 min-h-screen px-8 py-8">
                <header className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="mb-1 text-[32px] font-semibold leading-10 text-[#003f87]">
                            Créer une Ferme
                        </h2>
                        <p className="text-base text-[#424752]">
                            Configurez votre nouvelle exploitation agricole pour commencer le suivi.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button className="rounded-lg border border-[#727784] px-5 py-2 text-sm font-semibold text-[#003f87] transition-colors hover:bg-[#f0eded]">
                            Annuler
                        </button>
                        <button className="flex items-center gap-2 rounded-lg bg-[#b6171e] px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                            Enregistrer la Ferme
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 space-y-6 lg:col-span-7">
                        <section className="rounded-lg border border-[#c2c6d4] bg-white p-6">
                            <div className="mb-4 flex items-center gap-3 border-b border-[#eae8e7] pb-3">
                                <span className="material-symbols-outlined text-[#003f87]">info</span>
                                <h3 className="text-2xl font-semibold text-[#1b1c1c]">Informations Générales</h3>
                            </div>

                            <div className="space-y-6">
                                <Field
                                    label="Nom de la Ferme"
                                    value={farmName}
                                    onChange={(e) => setFarmName(e.target.value)}
                                    placeholder="Ex: Plantation de Lukula"
                                />

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <SelectField
                                        label="Province"
                                        value={province}
                                        onChange={(e) => setProvince(e.target.value)}
                                        options={["Kongo Central", "Kinshasa", "Lualaba", "Haut-Katanga"]}
                                    />

                                    <div>
                                        abel className="mb-1 block text-sm font-semibold text-[#424752]">
                                        Superficie Totale (Hectares)
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={area}
                                            onChange={(e) => setArea(e.target.value)}
                                            className="input-focus-glow w-full rounded border border-[#c2c6d4] bg-white px-4 py-2 pr-12 text-base outline-none"
                                            placeholder="0.00"
                                            type="number"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#424752]">
                        ha
                      </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                abel className="mb-1 block text-sm font-semibold text-[#424752]">
                                Description
                            </label>
                            <textarea
                                value={farmDesc}
                                onChange={(e) => setFarmDesc(e.target.value)}
                                className="input-focus-glow w-full rounded border border-[#c2c6d4] bg-white px-4 py-3 text-base outline-none"
                                placeholder="Détaillez les types de cultures prévus ou l'historique du terrain..."
                                rows={4}
                            />
                    </div>
                </div>
            </section>

            <section className="rounded-lg border border-[#c2c6d4] bg-white p-6">
                <div className="mb-4 flex items-center justify-between border-b border-[#eae8e7] pb-3">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#003f87]">location_on</span>
                        <h3 className="text-2xl font-semibold text-[#1b1c1c]">Localisation Géographique</h3>
                    </div>
                    <button className="flex items-center gap-1 text-sm font-semibold text-[#003f87] hover:underline">
                        <span className="material-symbols-outlined text-sm">my_location</span>
                        Utiliser ma position
                    </button>
                </div>

                <div className="relative aspect-video overflow-hidden rounded-lg bg-[#eae8e7]">
                    <img
                        alt="satellite agricultural land"
                        className="h-full w-full object-cover grayscale-[0.3] contrast-[1.1]"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDg55zfWTnDI0Hv2cNU691_0izlTbufr721GTnDdubI9khhYUHcuaA7d7CPv_3BtONUVSEje8P4eSTeGp5ElEeLY2BnU4echg8Zi9FR1tLejgCARISO3vXQly6ziyKgdze54w6SCOYJ8_1g8TG2ZeFqIsSA4wF3TBgXTA2G1GgqZfC3FgK8Brn9aoPveQylaSVpPNKzBC9MI5CidpG5wYu0ypWufi9hPNDI-GmFoDzG9NWLXUssH4wqkm2-xb3a0N_5ptMJcrJRbA"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#b6171e] shadow-lg">
                            <span className="material-symbols-outlined text-white">push_pin</span>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4 rounded border border-[#c2c6d4] bg-white/90 p-2 text-xs shadow-sm backdrop-blur-sm">
                        Lat: -5.8504, Long: 13.4501
                    </div>
                </div>
            </section>
        </div>

    <div className="col-span-12 space-y-6 lg:col-span-5">
        <section className="rounded-lg bg-[#003f87] p-6 text-white shadow-sm">
            <div className="mb-3 flex items-center gap-3">
                <span className="material-symbols-outlined">grid_view</span>
                <h3 className="text-2xl font-semibold">Première Parcelle</h3>
            </div>

            <p className="mb-4 text-sm text-[#bbd0ff]">
                Une ferme est composée de plusieurs parcelles. Commencez par en créer une pour définir vos premières zones de culture.
            </p>

            <div className="mb-4 rounded-lg border border-white/20 bg-white/10 p-4">
                <div className="space-y-4">
                    <Field
                        label="Nom de la parcelle"
                        value={parcelName}
                        onChange={(e) => setParcelName(e.target.value)}
                        placeholder="Ex: Zone Nord - Maïs"
                        dark
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <SelectField
                            label="Culture"
                            value={crop}
                            onChange={(e) => setCrop(e.target.value)}
                            options={["Maïs", "Manioc", "Café", "Cacao"]}
                            dark
                        />

                        <div>
                            abel className="mb-1 block text-xs font-semibold text-[#bbd0ff]">
                            Taille (ha)
                        </label>
                        <input
                            value={parcelSize}
                            onChange={(e) => setParcelSize(e.target.value)}
                            className="w-full rounded border border-white/30 bg-[#0056b3] px-3 py-2 text-sm text-white outline-none placeholder:text-white/50 focus:ring-1 focus:ring-white"
                            placeholder="0.5"
                            type="number"
                        />
                    </div>
                </div>
            </div>
    </div>

    <button className="w-full rounded bg-white py-2.5 text-sm font-semibold text-[#003f87] transition-colors hover:bg-[#bbd0ff]">
        Ajouter la parcelle
    </button>
</section>

    <section className="rounded-lg border border-[#c2c6d4] bg-white p-6">
        <div className="mb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#003f87]">cloud</span>
            <h3 className="text-2xl font-semibold text-[#1b1c1c]">Météo Locale</h3>
        </div>

        <div className="flex items-center justify-between">
            <div>
                <p className="text-[40px] font-bold leading-tight text-[#003f87]">28°C</p>
                <p className="text-sm font-semibold text-[#424752]">Ciel dégagé, Matadi</p>
            </div>
            <span className="material-symbols-outlined text-5xl text-yellow-500">wb_sunny</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#eae8e7] pt-4 text-center">
            <Metric label="Humidité" value="64%" />
            <Metric label="Pluie (24h)" value="0mm" />
            <Metric label="Vent" value="12 km/h" />
        </div>
    </section>

    <section className="rounded-lg border border-[#983c00]/20 bg-[#ffdbcc] p-6 text-[#351000]">
        <div className="flex gap-3">
            <span className="material-symbols-outlined text-[#722b00]">lightbulb</span>
            <div>
                <p className="mb-1 text-sm font-semibold">Conseil de précision</p>
                <p className="text-sm opacity-90">
                    La définition précise de la superficie nous permet de calculer automatiquement vos besoins en intrants et vos prévisions de récolte.
                </p>
            </div>
        </div>
    </section>
</div>
</div>

    <footer className="mt-10 flex items-center justify-center gap-6">
        <Step active number="1" label="Configuration Ferme" />
        <div className="h-px w-12 bg-[#c2c6d4]" />
        <Step number="2" label="Détails Sols" />
        <div className="h-px w-12 bg-[#c2c6d4]" />
        <Step number="3" label="Finalisation" />
    </footer>
</main>
</div>
);
}

function Field({ label, value, onChange, placeholder, dark = false }) {
    return (
        <div>
            abel className={`mb-1 block text-sm font-semibold ${dark ? "text-[#bbd0ff]" : "text-[#424752]"}`}>
            {label}
        </label>
    <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-focus-glow w-full rounded border px-4 py-2 outline-none ${
            dark
                ? "border-white/30 bg-white/5 text-white placeholder:text-white/50"
                : "border-[#c2c6d4] bg-white text-[#1b1c1c]"
        }`}
        type="text"
    />
</div>
);
}

function SelectField({ label, value, onChange, options, dark = false }) {
    return (
        <div>
            abel className={`mb-1 block text-sm font-semibold ${dark ? "text-[#bbd0ff]" : "text-[#424752]"}`}>
            {label}
        </label>
    <select
        value={value}
        onChange={onChange}
        className={`input-focus-glow w-full rounded border px-4 py-2 outline-none ${
            dark
                ? "border-white/30 bg-[#0056b3] text-white"
                : "border-[#c2c6d4] bg-white text-[#1b1c1c]"
        }`}
    >
        {options.map((opt) => (
            <option key={opt} value={opt}>
                {opt}
            </option>
        ))}
    </select>
</div>
);
}

function Metric({ label, value }) {
    return (
        <div>
            <p className="text-xs uppercase text-[#424752]">{label}</p>
            <p className="text-sm font-semibold text-[#003f87]">{value}</p>
        </div>
    );
}

function Step({ number, label, active = false }) {
    return (
        <div className={`flex items-center gap-3 ${active ? "" : "opacity-40"}`}>
            <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    active ? "bg-[#003f87] text-white" : "border border-[#727784] text-[#424752]"
                }`}
            >
                {number}
            </div>
            <span className={`text-sm font-semibold ${active ? "text-[#003f87]" : "text-[#424752]"}`}>
        {label}
      </span>
        </div>
    );
}