import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Dashboard() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <div className="min-h-screen bg-surface flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl p-10 max-w-md w-full text-center space-y-6 border border-outline-variant">
                <span className="material-symbols-outlined text-primary text-[64px]">agriculture</span>
                <div>
                    <h1 className="text-2xl font-semibold text-on-surface">Bienvenue sur AgriRDC</h1>
                    {user?.email && (
                        <p className="text-sm text-on-surface-variant mt-1">{user.email}</p>
                    )}
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-white border border-primary text-primary font-semibold rounded-lg hover:bg-surface-tint transition-colors"
                >
                    Se déconnecter
                </button>
            </div>
        </div>
    )
}
