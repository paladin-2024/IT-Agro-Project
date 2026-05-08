// Central mock data — used by all API modules when VITE_API_URL is not set.
// Edit here to change what the app shows in dev/demo mode.

export const MOCK_EMPLOYEES = [
    { id: 'emp-001', name: 'Samuel Mwamba',       role: 'Agronome Principal',    email: 'employee@agrordc.cd' },
    { id: 'emp-002', name: 'Clarisse Kabuya',      role: 'Technicien Irrigation', email: 'clarisse@agrordc.cd' },
    { id: 'emp-003', name: 'Jean-Pierre Bolamba',  role: 'Expert Sols',           email: 'jp@agrordc.cd' },
    { id: 'emp-004', name: 'Arnaud Mutombo',       role: 'Superviseur Récolte',   email: 'arnaud@agrordc.cd' },
]

export const MOCK_PARCELS = [
    {
        id: 'B-04',
        name: 'Parcelle B-04',
        farm: 'Ferme de Kasangulu, Kongo-Central',
        area: '12.4 ha',
        crop: 'Café Arabica',
        status: 'En cours',
    },
    {
        id: 'A-12',
        name: 'Parcelle A-12',
        farm: 'Ferme de Kimpese, Kongo-Central',
        area: '8.2 ha',
        crop: 'Maïs Hybride',
        status: 'Prêt pour récolte',
    },
    {
        id: 'C-09',
        name: 'Parcelle C-09',
        farm: 'Ferme Mbanza-Ngungu',
        area: '15.0 ha',
        crop: 'Soja',
        status: 'Alerte Stress',
    },
]

// Default assignments: employee emp-001 (Samuel) is assigned to B-04 and A-12
export const DEFAULT_ASSIGNMENTS = {
    'emp-001': ['B-04', 'A-12'],
}
