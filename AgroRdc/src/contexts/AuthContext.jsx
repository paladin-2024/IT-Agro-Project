import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
    })
    const [token, setToken] = useState(() => localStorage.getItem('accessToken'))

    const login = useCallback((userData, accessToken) => {
        setUser(userData)
        setToken(accessToken)
        if (accessToken) localStorage.setItem('accessToken', accessToken)
        if (userData) localStorage.setItem('user', JSON.stringify(userData))
    }, [])

    const logout = useCallback(() => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
    }, [])

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext)
}
