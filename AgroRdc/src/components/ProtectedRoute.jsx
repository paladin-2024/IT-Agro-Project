import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

const ROLE_HOME = {
    admin:    '/dashboard',
    owner:    '/owner/dashboard',
    employee: '/employee/dashboard',
}

export default function ProtectedRoute({ children, roles }) {
    const { isAuthenticated, user } = useAuth()

    if (!isAuthenticated) return <Navigate to="/login" replace />

    if (roles && user?.role && !roles.includes(user.role)) {
        return <Navigate to={ROLE_HOME[user.role] ?? '/login'} replace />
    }

    return children
}
