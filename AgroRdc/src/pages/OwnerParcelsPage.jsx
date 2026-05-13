import { useState } from "react";
import { Link } from "react-router-dom";
import OwnerSidebar from "../components/OwnerSidebar";
import Icon from '../components/Icon.jsx'

/* â”€â”€â”€ Static data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const stats = [
    { icon: "grid_view",  iconBg: "bg-blue-50 text-blue-700",   label: "Total Parcelles",  value: "124" },
    { icon: "eco",        iconBg: "bg-green-50 text-green-700",  label: "Surface Totale",   value: "2 450 Ha" },
    { icon: "warning",    iconBg: "bg-orange-50 text-orange-700",label: "Alertes Actives",  value: "12" },
    { icon: "groups",     iconBg: "bg-red-50 text-red-700",      label: "Main d'Å“uvre",     value: "458" },
];

const tableRows = [
    {
        code: "C5",
        name: "Plaine de Kipushi",
        site: "Kipushi Sud",
        crop: "Soja",
        area: "112.5 Ha",
        status: "Productif",
        statusClass: "bg-green-100 text-green-700 border-green-200",
        avatars: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCrdwtlODLy51OuNVCD5ea1u4nNMZXXHPv0WYKRj0JvimRiiBMWhCW0PBZy0sislVfSi5-4cdLKhiHVj9ME4TvqKXziUXMir0EVKojJFoAVpTwRNKxzkQApDqcSLHAwF8pQm0l61sRqi_Ua2H8lmi9OuoNkuCojJ-UgkTjG2e3wFSjwvCvydUwxh2gnGswS54LjZAqFqX1cllllWhK1XjLCYoQDJw3xomSomKCT-DU4DiCs49JF3qfquTJgU4E_wxfErX96OeduB3k",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDlRK-CTg50hrZLCpncKTanbuTiiAWI3cDqazEiB76u4I6l5vjKgO7pE0LbkEctq-zYDpdue4GOdGY4OjnJpM5vmdGxurP44A5yJZGJYm0WntwBdyyVasLChgg_trY-YPNIJbGX2IFaJmwZXHyxo0Ucvec9dNYGt29jDvrkpXQvDz3JCHVda7avSqSbgqF0jTCvnpc6xHrQ5DC8ZyYxzMLyU_z8f1RmAVM0rABL5tfaKnZbWSpMRjVONDb1p3iBeppIKGDBy9c33jk",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDEEPTFzag7gPc6GBMqgyKL-_Gp578NkvYFV_LuA0RQsGZyUBQEhYF1v2iyKh5mNP8eC-2D6m33UiCnnvn3WpJBU2NixBJG23QG2YwpsFCZfVaQ2fkuG2MS4ZdQuQq74wIN_-JDbDYiRVtwuq8lk0pTBnxGfyjvcbUeSG7JIGNf2gL6l2Ma3aMZlUhjuhHFRcJVvD0t0WWfaKxCb07Cl67XqiHBIu8tA5_9z7zu6woqLlXfTcBs72qo2dcGESGQeJEpm--t1kCB9U4",
        ],
    },
    {
        code: "D1",
        name: "PÃ©riphÃ©rie Nord",
        site: "Lubumbashi Ouest",
        crop: "Haricots",
        area: "24.0 Ha",
        status: "Attention",
        statusClass: "bg-red-100 text-red-700 border-red-200",
        avatars: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCrnLA4LrusIIfu07bwBF40KngEoMbl9xOuyIrVuWUnBeBguPsyRyKqJbQoVLaMv6nyH6LLgfuRlRAI7oB-AW3O6UykI2Ewl5nU-O8x2MQo6QQFY-aQv4XvT8CjSr7g6IyXIkGVWQA8VVibft3x5SG0WdTiK0G5s_ar390SPeLDAR_VEBlV4tIU_gKURLh0iiUg2dDF8Tnsn9ickRXIoMQCkf5Md87vGEwFkt-uLy2OAdIdwMVa2Kp7xlCQ0W1eLMiva4ub7SgBMwU",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDwP-gk8aODREdPNQDlY0-oV6xvkf26NDQzBFNgvXSuNPDqZeETAoNGLubWzDjCk6pp2O7o7f34lFxDmFqhkAPn-wT6evguTy_zKAxtNrsy2IiaPxgclR6S9EoDl3naSffTE7ZAvnCKOsWXBClP2E4i0PZxqIN0cINyoEsl7d73xXNoUtg_bo72gK5MI1TKd19OlJewyGn7GFtof4_uTFqr3yzm6RJspUnSNmWVFlbidJ684A1OFqQ7xS90R3VKo6Op9CyQ2UP5MGE",
        ],
    },
    {
        code: "E8",
        name: "Nouveaux Plateaux",
        site: "Kundelungu",
        crop: "En jachÃ¨re",
        area: "350.0 Ha",
        status: "Repos",
        statusClass: "bg-slate-100 text-slate-500 border-slate-200",
        avatars: [],
    },
];

/* â”€â”€â”€ Page component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export default function OwnerParcelsPage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="min-h-screen bg-[#f4f6f9] text-[#1b1c1c]">
            <OwnerSidebar />

            <main className="ml-64 min-h-screen">
                {/* Sticky header */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Link to="/owner/fermes" className="hover:text-[#003f87] transition-colors">Mes Fermes</Link>
                        <Icon name="chevron_right" className="h-4 w-4" />
                        <span className="font-semibold text-[#1b1c1c]">Inventaire des Parcelles</span>
                    </div>
                    <div className="relative">
                        <Icon name="search" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#003f87] focus:ring-1 focus:ring-[#003f87]"
                            placeholder="Rechercher une parcelleâ€¦"
                            type="text"
                        />
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Page title + filters */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-[#003f87]">Inventaire des Parcelles</h1>
                            <p className="mt-1 text-sm text-slate-500">
                                GÃ©rez et suivez l'Ã©tat de vos cultures en temps rÃ©el Ã  travers la province.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-end gap-3">
                            <FilterSelect label="Filtrer par Ferme">
                                <option>Toutes les fermes</option>
                                <option>Site de Lubumbashi</option>
                                <option>Site de Kipushi</option>
                                <option>Plateau de Kundelungu</option>
                            </FilterSelect>
                            <FilterSelect label="Type de Culture">
                                <option>Toutes les cultures</option>
                                <option>MaÃ¯s Grain</option>
                                <option>Manioc</option>
                                <option>Haricots</option>
                                <option>Soja</option>
                            </FilterSelect>
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center gap-2 self-end rounded-lg bg-[#003f87] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#002d63] active:scale-95"
                            >
                                <Icon name="add" className="h-5 w-5 text-base" />
                                Nouvelle Parcelle
                            </button>
                        </div>
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                        {stats.map((s) => (
                            <StatCard key={s.label} {...s} />
                        ))}
                    </div>

                    {/* Bento grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

                        {/* Featured parcel card â€” col-span-8 */}
                        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:flex-row lg:col-span-8">
                            <div className="relative h-52 w-full shrink-0 md:h-auto md:w-1/3">
                                <img
                                    alt="Vue aÃ©rienne du champ de maÃ¯s"
                                    className="h-full w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOnzlpUC49lopMOdgEtbe1rMeFEMZwEl_UjBxBXPb1_lyFxKAKiC7aYfh9FAQRzBv94t8MbdZtkz-pU3_u07zLoaGj1pcKQ2_mB8NPJ_e0DZbhsgc66kjau38OlqQJr0nS7uKeSUuOh9Dmh1YMOfhlaK1vs-geWnPJoeHUlgRZ5tiBEDdiLNbsgxzAvoiRBzFeYcxIVnx_UQLjh4CySNVZwGIdA3N_4UbanDlSJYrMYNlopS1OwhANHhRN0eNsvSeHqwDx-AG3QCI"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                                        Sain
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col justify-between p-6">
                                <div>
                                    <div className="mb-2 flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Parcelle A-12 : VallÃ©e Sud</h3>
                                            <p className="text-xs text-slate-500">Site de Lubumbashi Â· Zone Fertile 1</p>
                                        </div>
                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                                            MaÃ¯s Grain
                                        </span>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-4">
                                        <FieldStat label="Surface"         value="45.2 Hectares" />
                                        <FieldStat label="DerniÃ¨re rÃ©colte" value="15 Mars 2024" />
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                                    <div>
                                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Ã‰quipe AssignÃ©e
                                        </span>
                                        <div className="flex -space-x-2">
                                            {[
                                                "https://lh3.googleusercontent.com/aida-public/AB6AXuC9WQrcwLbAQHgJPnuVEisvoWAptVt_FCVqG4QHjtF0khAa_EWOrOH6HLiYdMz1w9QB6yowE9Ii2cOVQYlzvHZtmyRrFJZJnM9MbEUFJ1lGaZXb-4umTUYQN0xCMHN3PTEqWQ-3-yEKi47uBkgfK9jKNqpJM_0WP5jHjGT5q6Jj881vW_PR6kMZi3qW1MFkEQn3DahCk1QgzFnglLFmpiRs19dJc0fy-D75uxoBawvh5M2qu2tpvRp3oLuG8waT9OBy6jQthEJ3aso",
                                                "https://lh3.googleusercontent.com/aida-public/AB6AXuDbyHW-pzLtSVEnpAEbKZ6zTcusSRt3PNE6_emrLIFmCX65QT9vjZy3Nw6FfYsGw8StFxP4DkwE5OcumAVQLcr5VOlmXmbJz764HaVpmmJwHrAFZWCklP9k8ZCFgd_Thj_oLX-zGjjZiXIfuAekWgH5fXM7NU2Z8PxVACVXbWiXkJB_CZpQWPCV3YRDyzsbmNWZl6BNzQWFSHqKYqz47pGBMinEg-PC-WqC1BBphuHWmlrafSXOXQftGcDF1lwDUlaxsIVFoUCjNVE",
                                                "https://lh3.googleusercontent.com/aida-public/AB6AXuCqRaQG8J2GydlEYJGOPMcdLICrIIzoPlYEPYfs89GDRLOLduX9oiGYrkdlyKlgKqHiGAY-6-rCc8yTdXXX1hjDE0hT32ctZqlUTQyw5ajUcYiMrb5qszrQAbg4qig6-jMWBjkP5vMZaNbQtn1Z3450ldSOK-AipE0TnexqVS4U1lgSe0gLfFUIQFzpN43JiI_rHGw-VihvsTQwLmcGx2O1APTvyzPgPd34Dup5yG7q6cnMwSpC9Ush6GIMfZTFM0GqX0mzV1AdnBY",
                                            ].map((src, i) => (
                                                <img key={i} alt="worker" className="h-8 w-8 rounded-full border-2 border-white object-cover" src={src} />
                                            ))}
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-bold text-slate-500">
                                                +4
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        to="/owner/parcelles/A-12"
                                        className="flex items-center gap-1 text-sm font-semibold text-[#003f87] hover:underline"
                                    >
                                        DÃ©tails complets
                                        <Icon name="chevron_right" className="h-5 w-5 text-lg" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Irrigation mini-card â€” col-span-4 */}
                        <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-4">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <span className="rounded bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-700">
                                        Besoin d'irrigation
                                    </span>
                                    <h3 className="mt-2 text-lg font-bold text-slate-900">Parcelle B-04</h3>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
                                    <Icon name="water_drop" className="h-5 w-5 text-slate-400" />
                                </div>
                            </div>

                            <p className="mb-5 text-sm text-slate-600">
                                Culture : <span className="font-semibold">Manioc</span> Â· 12 Ha
                            </p>

                            <div className="mb-6">
                                <div className="mb-1 flex justify-between text-xs">
                                    <span className="text-slate-500">HumiditÃ© du sol</span>
                                    <span className="font-bold text-orange-600">22%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full w-[22%] rounded-full bg-orange-500" />
                                </div>
                            </div>

                            <div className="mt-auto border-t border-slate-100 pt-4">
                                <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Responsable
                                </span>
                                <div className="flex items-center gap-3">
                                    <img
                                        alt="Jean-Pierre Kalala"
                                        className="h-8 w-8 rounded-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhLUWWRw9vq8yOPky4mg-pF_gL4g08uvGzbv83VhbJLMkEviJVeyduEVjXRWp5Eg3GezRCjIMBMOlC7mML28MN-TuPB34F3zw0W1zDgZB-h5tDG-DTLzxSPtF-fAcZy6l1d0lTbSJRzKtAmlYsVU9mCoDPAd7oanC-gRyvoqhm1PrsXWO0fcy0kJbfyAZCLUpNBAr7HA0UJqf4GDiuS8kTh6auS2Kz7dyycW-A1JiDNvwMkp4Qq2ThwylPep9XjfuSfD12pA3ztzw"
                                    />
                                    <div>
                                        <p className="text-xs font-bold text-slate-800">Jean-Pierre Kalala</p>
                                        <p className="text-[10px] text-slate-500">Agronome Senior</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Full-width parcels table */}
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-12">
                            <div className="flex items-center justify-between border-b border-slate-200 p-6">
                                <h2 className="text-lg font-bold text-slate-900">Liste exhaustive des Parcelles</h2>
                                <button className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#003f87]">
                                    <Icon name="download" className="h-5 w-5 text-lg" />
                                    Exporter CSV
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50">
                                            {["ID / Nom", "Culture", "Surface", "Ã‰quipe", "Ã‰tat", ""].map((h) => (
                                                <th key={h} className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {tableRows.map((row, i) => (
                                            <tr key={row.code} className={`group transition-colors hover:bg-slate-50 ${i % 2 === 1 ? "bg-slate-50/50" : ""}`}>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700">
                                                            {row.code}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900">{row.name}</p>
                                                            <p className="text-xs text-slate-500">{row.site}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-slate-700">{row.crop}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-slate-700">{row.area}</td>
                                                <td className="px-6 py-4">
                                                    {row.avatars.length > 0 ? (
                                                        <div className="flex -space-x-2">
                                                            {row.avatars.map((src, j) => (
                                                                <img key={j} alt="worker" className="h-7 w-7 rounded-full border-2 border-white object-cover" src={src} />
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs italic text-slate-400">Aucune assignation</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase ${row.statusClass}`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="rounded-lg p-2 text-slate-400 transition-colors hover:text-[#003f87]">
                                                        <Icon name="more_vert" className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs text-slate-500">Affichage de 3 sur 124 parcelles</p>
                                <div className="flex gap-2">
                                    <button className="cursor-not-allowed rounded border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-400" disabled>
                                        PrÃ©cÃ©dent
                                    </button>
                                    <button className="rounded border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-[#003f87] transition-colors hover:bg-slate-100">
                                        Suivant
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom row: weather + map */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:col-span-12">
                            {/* Weather widget */}
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 p-8 text-white md:col-span-2">
                                <div className="relative z-10 w-2/3">
                                    <h3 className="mb-2 text-xl font-bold">Conditions Locales : Lubumbashi</h3>
                                    <div className="mb-6 flex items-end gap-4">
                                        <span className="text-6xl font-black">28Â°C</span>
                                        <div className="mb-2 flex flex-col">
                                            <Icon name="sunny" className="h-10 w-10 text-yellow-400" />
                                            <span className="text-xs opacity-80">EnsoleillÃ©</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-4">
                                        <WeatherStat label="PrÃ©cipitations" value="2%" />
                                        <WeatherStat label="Vent" value="12 km/h" />
                                        <WeatherStat label="UV Index" value="Haut (8)" />
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20">
                                    <img
                                        alt="lumiÃ¨re solaire"
                                        className="h-full w-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFIYP_fX2aHLjcSe5l-6ee02oCtWce7EF_4BABZdfiC49sSRNZeWP6_4nJ0vzn_PjE4E5-vHE0o6VtMOOfehxfnPetN1DT53GejVfvUPiWQ3d7jxVAofhkgSh6RzAl-EnsRjdl4zOn-EquyffxjDKqoOVjnNssnG9ljqq4oO85cAp51p-CtRvpX9uD1AddH6u5hQ_UbgSrQioc9EvMHxWWbS02IiKA_QSkAnop9a2tjJXtG1yI1aEr79XKSGrLHo5ICgFjUqJqk5c"
                                    />
                                </div>
                            </div>

                            {/* Map preview */}
                            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
                                <div className="absolute left-3 top-3 z-10">
                                    <span className="rounded bg-white/90 px-2 py-1 text-xs font-black text-slate-900 shadow-sm backdrop-blur-sm">
                                        GÃ©olocalisation des sites
                                    </span>
                                </div>
                                <img
                                    alt="Carte satellite Lubumbashi"
                                    className="h-full min-h-[200px] w-full object-cover grayscale brightness-75 transition-all hover:grayscale-0"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjGDTfmMBmvXKeki6x0u7kCKCj7YHNWTywAErivqBjgHPYVYClX2W-pkFdE2ENJBcsHbv8etT01o7aEhbzphEX5utoQfsR4fx-rh1JWndISbgROUgEikWa13l0DY3smtd8ErblulWqfeZYEji-0lghf1i5Vk-Bin-j_-n74xANCvM6pjBrt6vfSBRywxy8vpH0Kl1fSmMalcy-dBX5-WEozRUY7tDFSmitdA1LDFPcmHPTcANVicTA2rK7dX03qIg694ckaC_gfEM"
                                />
                                <button className="absolute bottom-3 right-3 z-10 flex items-center justify-center rounded-full bg-white p-2 shadow-lg text-[#003f87]">
                                    <Icon name="fullscreen" className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* FAB */}
            <button className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#003f87] text-white shadow-xl transition-transform hover:scale-110 active:scale-95">
                <Icon name="map" className="h-6 w-6" />
            </button>

            {showModal && <CreateParcelModal onClose={() => setShowModal(false)} />}
        </div>
    );
}

/* â”€â”€â”€ Sub-components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function StatCard({ icon, iconBg, label, value }) {
    return (
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                <Icon name={icon} className="h-5 w-5" />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
        </div>
    );
}

function FilterSelect({ label, children }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs font-semibold text-slate-500">{label}</label>
            <select className="min-w-[160px] rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20">
                {children}
            </select>
        </div>
    );
}

function FieldStat({ label, value }) {
    return (
        <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
            <p className="text-base font-bold text-slate-800">{value}</p>
        </div>
    );
}

function WeatherStat({ label, value }) {
    return (
        <div>
            <p className="mb-1 text-[10px] font-bold uppercase opacity-70">{label}</p>
            <p className="font-bold">{value}</p>
        </div>
    );
}

function CreateParcelModal({ onClose }) {
    return (
        <div
            className="fixed inset-0 z-[60] flex justify-end bg-[#1b1c1c]/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#003f87]/10">
                            <Icon name="add_location_alt" className="h-5 w-5 text-base text-[#003f87]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-[#1b1c1c]">Nouvelle Parcelle</h3>
                            <p className="text-[11px] text-slate-500">Enregistrement d'une zone de culture</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200"
                    >
                        <Icon name="close" className="h-5 w-5 text-lg" />
                    </button>
                </div>

                <form className="flex-1 space-y-5 overflow-y-auto p-6">
                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Ferme associÃ©e</label>
                        <select className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 p-3 text-sm text-slate-500 outline-none" disabled>
                            <option>Kinshasa Nord â€” Site Principal</option>
                        </select>
                    </div>
                    <Field label="Type de Culture" as="select">
                        <option value="">SÃ©lectionnez une cultureâ€¦</option>
                        <option>MaÃ¯s Grain</option>
                        <option>Manioc</option>
                        <option>Haricots</option>
                        <option>Soja</option>
                        <option>CafÃ©</option>
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Superficie (Ha)" type="number" placeholder="ex. 4.5" />
                        <Field label="Date de Plantation" type="date" />
                    </div>
                    <Field label="CoordonnÃ©es GPS (optionnel)" placeholder="ex. -4.3317, 15.3822" />
                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                        <p className="flex items-start gap-2 text-xs leading-relaxed text-blue-700">
                            <Icon name="info" className="h-4 w-4 mt-0.5 shrink-0" />
                            L'identifiant sera gÃ©nÃ©rÃ© automatiquement selon les conventions de la ferme sÃ©lectionnÃ©e.
                        </p>
                    </div>
                </form>

                <div className="flex gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
                    >
                        Annuler
                    </button>
                    <button className="flex-[2] rounded-lg bg-[#003f87] py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#002d63] active:scale-95">
                        Confirmer la crÃ©ation
                    </button>
                </div>
            </div>
        </div>
    );
}

function Field({ label, type = "text", placeholder, as = "input", children }) {
    const cls = "w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none transition-all focus:border-[#003f87] focus:ring-2 focus:ring-[#003f87]/20 placeholder:text-slate-400";
    return (
        <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</label>
            {as === "select" ? (
                <select className={cls}>{children}</select>
            ) : (
                <input className={cls} type={type} placeholder={placeholder} />
            )}
        </div>
    );
}

