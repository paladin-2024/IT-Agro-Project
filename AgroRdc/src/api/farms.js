import { MOCK_FARMS } from './mocks.js'

const KEY = 'agrordc_farms'

function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
function save(list) { localStorage.setItem(KEY, JSON.stringify(list)) }

export function getFarms(ownerId) {
    const stored = load()
    const storedIds = new Set(stored.map(f => f.id))
    const base = MOCK_FARMS.filter(f => !storedIds.has(f.id) && (!ownerId || f.ownerId === ownerId))
    return [...stored.filter(f => !f._deleted), ...base]
}

export function getFarmById(id) {
    const stored = load().find(f => f.id === id)
    if (stored) return stored._deleted ? null : stored
    return MOCK_FARMS.find(f => f.id === id) ?? null
}

export function createFarm(payload) {
    const list = load()
    const farm = { id: `FM-${Date.now()}`, createdAt: new Date().toISOString(), status: 'Actif', parcels: [], ...payload }
    save([...list, farm])
    return farm
}

export function updateFarm(id, updates) {
    const list = load()
    const idx = list.findIndex(f => f.id === id)
    if (idx !== -1) {
        list[idx] = { ...list[idx], ...updates }
        save(list)
        return list[idx]
    }
    const base = MOCK_FARMS.find(f => f.id === id)
    if (!base) return null
    const merged = { ...base, ...updates }
    save([...list, merged])
    return merged
}

export function deleteFarm(id) {
    const list = load()
    const idx = list.findIndex(f => f.id === id)
    if (idx !== -1) {
        list[idx] = { ...list[idx], _deleted: true }
        save(list)
    } else {
        save([...list, { id, _deleted: true }])
    }
}
