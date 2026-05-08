import { MOCK_PARCELS } from './mocks.js'

const KEY = 'agrordc_parcels'

function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
function save(list) { localStorage.setItem(KEY, JSON.stringify(list)) }

export function getAllParcels() {
    const stored = load()
    const storedIds = new Set(stored.map(p => p.id))
    const base = MOCK_PARCELS.filter(p => !storedIds.has(p.id))
    return [...stored.filter(p => !p._deleted), ...base]
}

export function getParcelsByFarm(farmId) {
    return getAllParcels().filter(p => p.farmId === farmId)
}

export function getParcelById(id) {
    const stored = load().find(p => p.id === id)
    if (stored) return stored._deleted ? null : stored
    return MOCK_PARCELS.find(p => p.id === id) ?? null
}

export function createParcel(payload) {
    const list = load()
    const parcel = {
        id: `PAR-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'En cours',
        ...payload,
    }
    save([...list, parcel])
    return parcel
}

export function updateParcel(id, updates) {
    const list = load()
    const idx = list.findIndex(p => p.id === id)
    if (idx !== -1) {
        list[idx] = { ...list[idx], ...updates }
        save(list)
        return list[idx]
    }
    const base = MOCK_PARCELS.find(p => p.id === id)
    if (!base) return null
    const merged = { ...base, ...updates }
    save([...list, merged])
    return merged
}

export function deleteParcel(id) {
    const list = load()
    const idx = list.findIndex(p => p.id === id)
    if (idx !== -1) {
        list[idx] = { ...list[idx], _deleted: true }
        save(list)
    } else {
        save([...list, { id, _deleted: true }])
    }
}
