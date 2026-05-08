import { DEFAULT_ASSIGNMENTS, MOCK_EMPLOYEES, MOCK_PARCELS } from './mocks.js'

const API = import.meta.env.VITE_API_URL
const STORAGE_KEY = 'agrordc_assignments'

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

function saveToStorage(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Returns { [employeeId]: [parcelId, ...] }
function getAllAssignments() {
    return loadFromStorage() ?? DEFAULT_ASSIGNMENTS
}

// Returns the parcel IDs assigned to an employee
export async function getAssignedParcelIds(employeeId) {
    if (!API) {
        const all = getAllAssignments()
        return all[employeeId] ?? []
    }
    const res = await fetch(`${API}/api/assignments?employeeId=${employeeId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    })
    if (!res.ok) throw new Error('Erreur lors du chargement des affectations')
    const data = await res.json()
    return data.parcelIds ?? []
}

// Returns full parcel objects assigned to an employee
export async function getAssignedParcels(employeeId) {
    const ids = await getAssignedParcelIds(employeeId)
    if (!API) {
        return MOCK_PARCELS.filter((p) => ids.includes(p.id))
    }
    const res = await fetch(`${API}/api/parcels?ids=${ids.join(',')}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    })
    if (!res.ok) throw new Error('Erreur lors du chargement des parcelles')
    return res.json()
}

// Assign or unassign an employee to a parcel
export async function setAssignment(employeeId, parcelId, assign = true) {
    if (!API) {
        const all = getAllAssignments()
        const current = all[employeeId] ?? []
        const updated = assign
            ? [...new Set([...current, parcelId])]
            : current.filter((id) => id !== parcelId)
        saveToStorage({ ...all, [employeeId]: updated })
        return { employeeId, parcelId, assigned: assign }
    }
    const res = await fetch(`${API}/api/assignments`, {
        method: assign ? 'POST' : 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ employeeId, parcelId }),
    })
    if (!res.ok) throw new Error("Erreur lors de la mise à jour de l'affectation")
    return res.json()
}

// Returns all employees with their assignment status for a parcel
export async function getEmployeesForParcel(parcelId) {
    if (!API) {
        const all = getAllAssignments()
        return MOCK_EMPLOYEES.map((emp) => ({
            ...emp,
            assigned: (all[emp.id] ?? []).includes(parcelId),
        }))
    }
    const res = await fetch(`${API}/api/assignments/parcel/${parcelId}/employees`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    })
    if (!res.ok) throw new Error('Erreur lors du chargement des employés')
    return res.json()
}
