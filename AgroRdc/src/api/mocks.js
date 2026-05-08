export const MOCK_CROPS = [
    { id: 'crop-001', name: 'Maïs Hybride',  variety: 'H614',      growthDays: 120 },
    { id: 'crop-002', name: 'Café Arabica',   variety: 'Bourbon',   growthDays: 365 },
    { id: 'crop-003', name: 'Soja',           variety: 'S-02',      growthDays: 90  },
    { id: 'crop-004', name: 'Manioc',         variety: 'TME 419',   growthDays: 270 },
    { id: 'crop-005', name: 'Huile de Palme', variety: 'Tenera',    growthDays: 0   },
    { id: 'crop-006', name: 'Maïs Jaune',     variety: 'Local',     growthDays: 90  },
    { id: 'crop-007', name: 'Café Robusta',   variety: 'Robusta',   growthDays: 365 },
    { id: 'crop-008', name: 'Riz Paddy',      variety: 'NERICA',    growthDays: 110 },
    { id: 'crop-009', name: 'Cacao',          variety: 'Forastero', growthDays: 0   },
    { id: 'crop-010', name: 'Arachide',       variety: 'Valencia',  growthDays: 100 },
]

export const MOCK_FARMS = [
    { id: 'KP-001', ownerId: 'owner-001', name: 'Kipushi Main',  province: 'Haut-Katanga', territoire: 'Kipushi',  area: 450, status: 'Actif',   description: 'Exploitation principale dédiée à la culture du maïs hybride et du soja en rotation saisonnière.' },
    { id: 'LK-002', ownerId: 'owner-001', name: 'Likasi North',  province: 'Haut-Katanga', territoire: 'Likasi',   area: 120, status: 'Actif',   description: 'Ferme spécialisée dans la culture du maïs jaune destiné aux marchés locaux de Likasi.' },
    { id: 'KN-003', ownerId: 'owner-001', name: 'Kinshasa Nord', province: 'Kinshasa',     territoire: 'Kinshasa', area: 85,  status: 'Partiel', description: 'Site de culture mixte combinant manioc et café robusta pour une diversification des revenus.' },
]

export const MOCK_EMPLOYEES = [
    { id: 'emp-001', name: 'Samuel Mwamba',       role: 'Agronome Principal',    email: 'employee@agrordc.cd' },
    { id: 'emp-002', name: 'Clarisse Kabuya',      role: 'Technicien Irrigation', email: 'clarisse@agrordc.cd' },
    { id: 'emp-003', name: 'Jean-Pierre Bolamba',  role: 'Expert Sols',           email: 'jp@agrordc.cd' },
    { id: 'emp-004', name: 'Arnaud Mutombo',       role: 'Superviseur Récolte',   email: 'arnaud@agrordc.cd' },
]

export const MOCK_PARCELS = [
    { id: 'B-04', farmId: 'KN-003', farm: 'Kinshasa Nord', name: 'Parcelle B-04', area: '12.4 ha', crop: 'Café Arabica', status: 'En cours'          },
    { id: 'A-12', farmId: 'KN-003', farm: 'Kinshasa Nord', name: 'Parcelle A-12', area: '8.2 ha',  crop: 'Maïs Hybride', status: 'Prêt pour récolte' },
    { id: 'C-09', farmId: 'LK-002', farm: 'Likasi North',  name: 'Parcelle C-09', area: '15.0 ha', crop: 'Soja',         status: 'Alerte Stress'     },
]

export const DEFAULT_ASSIGNMENTS = {
    'emp-001': ['B-04', 'A-12'],
}
