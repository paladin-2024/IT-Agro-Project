const API_URL = import.meta.env.VITE_API_URL

export async function loginUser({ email, password, remember }) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, remember }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Connexion échouée')
    return data
}

export async function forgotPassword({ email }) {
    const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Une erreur est survenue.')
    return data
}
