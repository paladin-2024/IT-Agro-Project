import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App.jsx'
import ContacteAdmin from './ContacteAdmin.jsx'
import MotPasseOublie from './MotPasseOublie.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <App /> },
    { path: '/mot-de-passe-oublie', element: <MotPasseOublie /> },
    { path: '/contact-admin', element: <ContacteAdmin /> },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    { path: '*', element: <Navigate to="/" replace /> },
])
