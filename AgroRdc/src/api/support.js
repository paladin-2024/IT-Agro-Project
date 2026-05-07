const API_URL = import.meta.env.VITE_API_URL

export async function contactHubAdmin(form) {
    const res = await fetch(`${API_URL}/api/support/contact-hub-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Une erreur est survenue. Veuillez réessayer.')
    return data
}
