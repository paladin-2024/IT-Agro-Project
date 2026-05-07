import React, { useState } from "react";

export default function App() {
    const [drawerOpen, setDrawerOpen] = useState(true);

    const parcels = [
        {
            title: "Parcelle A-01",
            size: "12.5 Ha",
            crop: "Maïs",
            harvest: "Oct 2024",
            status: "Actif",
            statusTone: "bg-green-100 text-green-700",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDTXvuVs1bf1pbIrVcu6il0T-g06Neb-r82LPYdMNhyyG58_PHL5V1BvW6tZ8AgyvSQ9ptRa7hk9YPOJfczx2sd_x-kPtyGqeYFxTmel741u1KmRZd8fPXZTT99Q1tV3mpkLxkALUJgo0GDqAhk57SDdqfsK7_V36MXexepnV5qa_Yb81SoRladbwO_xAlBwTdoZZdAE4492E4xqeAgtOc_EjQkgPnZ79nCoe4YOrJCdczKaHRliMmNvWBPsLGw9GwjfnVZmoYc3JE",
            workers: "+2 assignés",
            button: "Modifier",
            selected: false,
        },
        {
            title: "Parcelle B-04",
            size: "8.2 Ha",
            crop: "Caféier",
            harvest: "Nov 2024",
            status: "Besoin d'Attention",
            statusTone: "bg-blue-100 text-blue-700",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuABkwnWul4AL6WN78AmFEPxRILjrbR2wRerEJS-brsT8E7BLeUPLA85EUNb0b5n4HZADwMVUA1oEwGDJmzubtAW4-C1Dbu4j_GZGeogg3sVui-eqRPbOcdfum8PmPdXahmbaEPOatUqdnjrTpQXEJOx4FJyxRG-LefwqYr5lfrbXbYHw2TzjoNs3BQhO0WuvzSVxvXGJTSp66QY3k8K3EK_LYDX5RDIarWpqTe2illCtWnMhKdC8hvp5u46BJvOyaEJBZG4fruDVv7w",
            workers: "0 Personnel Assigné",
            button: "Affecter Personnel",
            selected: true,
        },
        {
            title: "Parcelle C-12",
            size: "15.0 Ha",
            crop: "Manioc",
            harvest: "En jachère",
            status: "Repos",
            statusTone: "bg-slate-100 text-slate-600",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAd_6Xh5E_TL4isO6pkjuIuhCT8AZ_pV3Pr8DICCPPeDcd_qxHQSvZmk36OrG-dYf8OTVB2rZOz0j9FrMWM78TZdrUEXQh0JaN9SMso6AVMXTx5FOmH9WJoGkGRgYAjMxmgFVq5yfnbBARRitf47bZ-JGWGaVfgJ7gQJNII8hTliaYIcRnYMR8aYhSlnmu7L5FrB2zZnvsJVC_Z2gYrNQVxG6KIjGbSq6qvfiyQvexam4s0uqHiSqWEj45uDXrTEAyY0LwKommV_KA",
            workers: "Aucun personnel requis",
            button: "Gérer",
            selected: false,
        },
    ];

    const employees = [
        ["Samuel Mwamba", "Agronome Principal", false],
        ["Clarisse Kabuya", "Technicien Irrigation", false],
        ["Jean-Pierre Bolamba", "Expert Sols", true],
        ["Arnaud Mutombo", "Superviseur Récolte", false],
    ];

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#fbf9f8] text-[#1b1c1c]">
            <TopBar />
            <SideNav />

            <main className="relative min-h-screen pb-20 pt-16 md:ml-64 md:pb-6">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <HeaderSection />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {parcels.map((parcel) => (
                            <ParcelCard key={parcel.title} {...parcel} />
                        ))}
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
                        <div className="rounded-2xl border border-[#DEE2E6] bg-white p-6 md:col-span-8">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="font-['Work_Sans'] text-2xl font-semibold text-[#003f87]">
                                    Aperçu de la Main-d'œuvre
                                </h2>
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                  Total: 142 employés
                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <SmallStat icon="engineering" value="18" label="Agronomes" />
                                <SmallStat icon="psychology" value="42" label="Techniciens" />
                                <SmallStat icon="nature_people" value="82" label="Agents de Terrain" />
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-[#003f87] p-6 text-white md:col-span-4">
                            <div className="absolute -right-10 -bottom-10 opacity-10">
                                <span className="material-symbols-outlined text-[180px]">groups</span>
                            </div>
                            <div>
                                <h2 className="mb-2 font-['Work_Sans'] text-2xl font-semibold">
                                    Taux d'Affectation
                                </h2>
                                <p className="text-sm text-blue-100">
                                    84% des parcelles critiques sont couvertes.
                                </p>
                            </div>

                            <div className="mt-8">
                                <div className="mb-2 h-2 w-full rounded-full bg-blue-900/50">
                                    <div className="h-2 w-[84%] rounded-full bg-white" />
                                </div>
                                <div className="flex justify-between text-xs font-bold">
                                    <span>COUVERTURE</span>
                                    <span>84%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {drawerOpen && <AssignmentDrawer onClose={() => setDrawerOpen(false)} employees={employees} />}
            <MobileBottomNav />
        </div>
    );
}

function TopBar() {
    return (
        <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#DEE2E6] bg-white px-6 py-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-4">
        <span className="text-lg font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
          AgroDirect DRC
        </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden items-center rounded-lg border border-outline-variant bg-slate-100 px-3 py-1.5 dark:bg-slate-800 md:flex">
                    <span className="material-symbols-outlined mr-2 text-slate-500">search</span>
                    <input
                        className="border-none bg-transparent text-sm outline-none focus:ring-0"
                        placeholder="Search..."
                        type="text"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <IconBtn icon="notifications" />
                    <IconBtn icon="settings" />
                    <div className="h-8 w-8 overflow-hidden rounded-full border border-outline-variant bg-slate-200">
                        <img
                            alt="Manager Profile"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhZsv-uBE3J3vfIyGxyMBmSzaFQUo0Nr7fHxATmfpXXQXCwcyqT60jRi9lsVuaZIUUOjApOwrT6ti5kdaaAmmVut4GJL5KKuqPxceKxTSPjjB3DwRptiIYWbUG55rfCifenQl1vHf4DKdQE9Zwhyw35xy0gpba1Da-uJRmyAV7WVm2gECARiZrgwGKd9I1aIH7_XH9wne0lxkCfrcfFAd0KvjwdjoMc8wae0F71VBJilvyH3-uqA41C9CbzlrYN8c0ND9PaTzVgKg"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

function SideNav() {
    const nav = [
        ["dashboard", "Dashboard"],
        ["map", "Map Tracker"],
        ["layers", "Parcels", true],
        ["group", "Workforce"],
        ["local_shipping", "Logistics"],
        ["analytics", "Reports"],
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col border-r border-[#DEE2E6] bg-white pt-16 dark:border-slate-800 dark:bg-slate-900 md:flex">
            <div className="border-b border-[#DEE2E6] p-6 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-700 text-xl font-bold text-white">
                        AD
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">Plantation Manager</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">DRC Region North</div>
                    </div>
                </div>
            </div>

            <nav className="flex-1 py-4">
                <ul className="space-y-1">
                    {nav.map(([icon, label, active]) => (
                        <li key={label}>
                            <a
                                href="#"
                                className={`flex items-center px-6 py-3 text-sm font-semibold transition-colors ${
                                    active
                                        ? "border-r-4 border-blue-700 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                        : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                                }`}
                            >
                                <span className="material-symbols-outlined mr-4">{icon}</span>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto space-y-4 border-t border-[#DEE2E6] p-6 dark:border-slate-800">
                <button className="w-full rounded-lg bg-[#003f87] px-4 py-2.5 font-bold text-white hover:opacity-90">
                    Assign Tasks
                </button>
                <ul className="space-y-1">
                    <li>
                        <a href="#" className="flex items-center py-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined mr-4">help</span>
                            Support
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center py-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined mr-4">logout</span>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

function HeaderSection() {
    return (
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
                <h1 className="mb-1 font-['Work_Sans'] text-3xl font-semibold text-[#1b1c1c]">
                    Affectation d&apos;Employé à une Parcelle
                </h1>
                <p className="text-base text-[#424752]">
                    Gérez les ressources humaines assignées aux opérations de terrain.
                </p>
            </div>

            <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-lg border border-outline-variant bg-white px-4 py-2 text-sm font-semibold text-[#003f87] hover:bg-slate-50">
                    <span className="material-symbols-outlined">filter_list</span>
                    Filtrer
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-[#003f87] px-4 py-2 text-sm font-semibold text-white hover:opacity-95">
                    <span className="material-symbols-outlined">add</span>
                    Nouvelle Parcelle
                </button>
            </div>
        </div>
    );
}

function ParcelCard({ title, size, crop, harvest, status, statusTone, image, workers, button, selected }) {
    return (
        <div
            className={`overflow-hidden rounded-xl border bg-white transition-all ${
                selected ? "border-blue-700 shadow-lg" : "border-[#DEE2E6] hover:border-blue-700"
            }`}
        >
            <div className="relative h-32 bg-slate-100">
                <img className="h-full w-full object-cover grayscale-[0.3] transition-all hover:grayscale-0" src={image} alt={title} />
                <span className={`absolute left-3 top-3 rounded px-2 py-1 text-[10px] font-bold uppercase ${statusTone}`}>
          {status}
        </span>
                {selected && (
                    <div className="absolute right-2 top-2 z-10">
            <span className="material-symbols-outlined rounded-full bg-white text-blue-700">
              check_circle
            </span>
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-[#003f87]">{title}</h3>
                    <span className="text-sm text-slate-500">{size}</span>
                </div>
                <p className="mb-4 text-xs text-[#424752]">
                    Culture: {crop} • Récolte prévue: {harvest}
                </p>

                <div className="mb-4 flex items-center gap-2">
                    {title === "Parcelle C-12" ? (
                        <>
                            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-100">
                                <span className="material-symbols-outlined text-[14px] text-slate-400">group_off</span>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400">{workers}</span>
                        </>
                    ) : title === "Parcelle B-04" ? (
                        <span className="rounded bg-[#ffdad6]/20 px-2 py-0.5 text-[11px] font-semibold text-[#ba1a1a]">
              {workers}
            </span>
                    ) : (
                        <>
                            <div className="flex -space-x-2">
                                <AvatarCircle />
                                <AvatarCircle />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-500">{workers}</span>
                        </>
                    )}
                </div>

                <button
                    className={`w-full rounded-lg px-4 py-2 text-sm font-semibold ${
                        button === "Gérer"
                            ? "border border-slate-300 text-slate-500 hover:bg-slate-50"
                            : button === "Modifier"
                                ? "border border-blue-700 text-blue-700 hover:bg-blue-50"
                                : "bg-[#003f87] text-white hover:opacity-90"
                    }`}
                >
                    {button}
                </button>
            </div>
        </div>
    );
}

function AssignmentDrawer({ onClose, employees }) {
    return (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/40 backdrop-blur-sm">
            <div className="flex h-full w-full max-w-md animate-in flex-col overflow-hidden bg-white shadow-2xl slide-in-from-right duration-300">
                <div className="flex items-center justify-between border-b border-[#DEE2E6] bg-[#f5f3f3] p-6">
                    <div>
                        <h2 className="font-['Work_Sans'] text-2xl font-semibold text-[#003f87]">Assign Personnel</h2>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#424752]">
                            Parcelle B-04 • Caféier
                        </p>
                    </div>
                    <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-200">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto p-6">
                    <div className="space-y-4">
                        <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
                            <input
                                className="w-full rounded-lg border border-outline-variant bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#003f87] focus:ring-1 focus:ring-[#003f87]"
                                placeholder="Rechercher par nom ou compétence..."
                                type="text"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Chip active>Tous</Chip>
                            <Chip>Agronome</Chip>
                            <Chip>Technicien</Chip>
                            <Chip>IRR</Chip>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            Employés Disponibles
                        </h3>

                        {employees.map(([name, role, assigned]) => (
                            <EmployeeRow key={name} name={name} role={role} assigned={assigned} />
                        ))}
                    </div>
                </div>

                <div className="flex gap-3 border-t border-[#DEE2E6] bg-slate-50 p-6">
                    <button className="flex-1 rounded-lg border border-outline bg-white py-3 text-sm font-semibold text-[#1b1c1c] hover:bg-slate-100">
                        Annuler
                    </button>
                    <button className="flex-1 rounded-lg bg-[#003f87] py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg">
                        Confirmer (1)
                    </button>
                </div>
            </div>
        </div>
    );
}

function MobileBottomNav() {
    const items = [
        ["map", "Map"],
        ["grid_view", "Parcels", true],
        ["person_add", "Staff"],
        ["warning", "Alerts"],
    ];

    return (
        <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-[#DEE2E6] bg-white px-4 py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] md:hidden dark:border-slate-800 dark:bg-slate-900">
            {items.map(([icon, label, active]) => (
                <a
                    key={label}
                    href="#"
                    className={`flex flex-col items-center justify-center py-1 text-[11px] font-bold ${
                        active ? "text-[#003f87] dark:text-blue-400" : "text-slate-400 dark:text-slate-500"
                    }`}
                >
          <span className="material-symbols-outlined" style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}>
            {icon}
          </span>
                    <span className="font-['Work_Sans']">{label}</span>
                </a>
            ))}
        </nav>
    );
}

function SmallStat({ icon, value, label }) {
    return (
        <div className="rounded-xl border border-[#DEE2E6] bg-slate-50 p-4">
            <span className="material-symbols-outlined mb-2 text-[#003f87]">{icon}</span>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
            <div className="text-xs font-bold uppercase tracking-tight text-slate-500">{label}</div>
        </div>
    );
}

function Chip({ children, active = false }) {
    return (
        <span
            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ${
                active ? "bg-[#003f87] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
        >
      {children}
    </span>
    );
}

function EmployeeRow({ name, role, assigned }) {
    return (
        <div
            className={`flex items-center justify-between rounded-xl border p-3 ${
                assigned ? "border-blue-200 bg-blue-50/30" : "border-[#DEE2E6] hover:bg-slate-50"
            }`}
        >
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full border border-slate-200">
                    <img
                        alt={name}
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8o1xCCP2r08bMBnXmlVpqFXIX-4qI4KCoP_WuP6mnL5_pNkdPEYQzeIam9MdLxqMsP7wfa2lVjqwjef_8bm9uT5REM9rP7KzUW2oVnQJ__2Pvji94FKLlXMtlqWR6YD52IhrG62OlBB7-M4cVlWNb4isKa4bbsO0o1NKAFFpmp_O3iTLY57X2r-7Wmxzn8_p-iWcKcOQ2ghYTBgr80pBWj-l1magCb90oCWtHbDpHUxjFVVSQNeJw0dvoZzbEFkxycQwaM_I9Muk"
                    />
                </div>
                <div>
                    <div className="text-sm font-bold text-slate-900">{name}</div>
                    <div className="text-[11px] font-bold uppercase text-blue-700">{role}</div>
                </div>
            </div>

            {assigned ? (
                <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
                    <span className="text-xs font-bold text-green-600">Assigné</span>
                </div>
            ) : (
                <button className="rounded border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 hover:bg-[#003f87] hover:text-white">
                    Assign
                </button>
            )}
        </div>
    );
}

function IconBtn({ icon }) {
    return (
        <button className="rounded-full p-2 text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined">{icon}</span>
        </button>
    );
}

function AvatarCircle() {
    return (
        <div className="h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-slate-200">
            <img
                alt="Worker"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvzXBCvas61hRntMIftvf1pfYgE0uly5181Fu7wjoqdYvvomjjvvDF1-AwYKNIWZBMplAFIu5sWrKn7ONDaR0fUZcvMvC6FhjY9RfCPSJpBShWGUyyZQBTO5HeM0zBMkjYuXPNYMX4OPEW6mDLH0RwfHq3MPazitaMQYJ33PChEeHy9H8gwAD0OtRmK2Fr-rTm791y_wSFwpC78aroFpgYywxuL239bPbSLnY1FKVr4GmAukiHiksQvtcQU1qqeA9ODzLcvL5Fe-A"
            />
        </div>
    );
}