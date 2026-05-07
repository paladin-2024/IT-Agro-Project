import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import ContacteAdmin from './pages/ContacteAdmin.jsx'
import MotPasseOublie from './pages/MotPasseOublie.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminHealthPage from './pages/AdminHeathPage.jsx'
import AdminUsersPage from './pages/AdminUserPage.jsx'
import AdminUsersCreatePage from './pages/AdminUsersCreatePage.jsx'
import AdminSettingsPage from './pages/AdminSettingsPage.jsx'
import AdminFermesGestion from './pages/AdminFermesGestion.jsx'
import OwnerDashboard from './pages/OwnerDashboard.jsx'
import OwnerFarmCreatePage from './pages/OwnerFarmCreatePage.jsx'
import OwnerYieldAnalyticsPage from './pages/OwnerYieldAnalyticsPage.jsx'
import OwnerFarmParcelPage from './pages/OwnerFarmParcelPage.jsx'
import OwnerParcelsPage from './pages/OwnerParcelsPage.jsx'
import OwnerOverviewParcelPage from './pages/OwnerOverviewParcelPage.jsx'
import OwnerDetailParcell from './pages/OwnerDetailParcell.jsx'
import OwnerAffectation from './pages/OwnerAffectation.jsx'
import OwnerFarmDetailPage from './pages/OwnerFarmDetailPage.jsx'
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
    {
        path: '/sante-systeme',
        element: (
            <ProtectedRoute>
                <AdminHealthPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/utilisateurs',
        element: (
            <ProtectedRoute>
                <AdminUsersPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/utilisateurs/nouveau',
        element: (
            <ProtectedRoute>
                <AdminUsersCreatePage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/fermes',
        element: (
            <ProtectedRoute>
                <AdminFermesGestion />
            </ProtectedRoute>
        ),
    },
    {
        path: '/parametres',
        element: (
            <ProtectedRoute>
                <AdminSettingsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/dashboard',
        element: (
            <ProtectedRoute>
                <OwnerDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/fermes',
        element: (
            <ProtectedRoute>
                <OwnerFarmParcelPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/fermes/creer',
        element: (
            <ProtectedRoute>
                <OwnerFarmCreatePage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/fermes/:id',
        element: (
            <ProtectedRoute>
                <OwnerFarmDetailPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/analytics',
        element: (
            <ProtectedRoute>
                <OwnerYieldAnalyticsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/parcelles',
        element: (
            <ProtectedRoute>
                <OwnerParcelsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/parcelles/apercu',
        element: (
            <ProtectedRoute>
                <OwnerOverviewParcelPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/parcelles/detail',
        element: (
            <ProtectedRoute>
                <OwnerDetailParcell />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/affectation',
        element: (
            <ProtectedRoute>
                <OwnerAffectation />
            </ProtectedRoute>
        ),
    },
    { path: '*', element: <Navigate to="/" replace /> },
])
