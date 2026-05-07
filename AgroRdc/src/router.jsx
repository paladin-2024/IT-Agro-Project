import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import ContacteAdmin from './pages/ContacteAdmin.jsx'
import MotPasseOublie from './pages/MotPasseOublie.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default createBrowserRouter([
    { path: '/', element: <LoginPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/mot-de-passe-oublie', element: <MotPasseOublie /> },
    { path: '/contact-admin', element: <ContacteAdmin /> },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <AdminDashboard />
            </ProtectedRoute>
        ),
    },
    { path: '*', element: <Navigate to="/" replace /> },
])
