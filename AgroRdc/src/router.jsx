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
import OwnerParcelCreatePage from './pages/OwnerParcelCreatePage.jsx'
import OwnerCulturesPage from './pages/OwnerCulturesPage.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'
import EmployeeParcelDetailPage from './pages/EmployeeParcelDetailPage.jsx'
import EmployeeProductionDetailPage from './pages/EmployeeProductionDetailPage.jsx'
import EmployeeParcelForecastPage from './pages/EmployeeParcelForecastPage.jsx'
import EmployeeParcelTeamPage from './pages/EmployeeParcelTeamPage.jsx'
import EmployeeHarvestLogPage from './pages/EmployeeHarvestLogPage.jsx'
import EmployeeDailyReportPage from './pages/EmployeeDailyReportPage.jsx'
import EmployeeCulturesPage from './pages/EmployeeCulturesPage.jsx'
import EmployeeProductionEditPage from './pages/EmployeeProductionEditPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default createBrowserRouter([
    { path: '/', element: <LoginPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/mot-de-passe-oublie', element: <MotPasseOublie /> },
    { path: '/contact-admin', element: <ContacteAdmin /> },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/sante-systeme',
        element: (
            <ProtectedRoute roles={['admin']}>
                <AdminHealthPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/utilisateurs',
        element: (
            <ProtectedRoute roles={['admin']}>
                <AdminUsersPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/utilisateurs/nouveau',
        element: (
            <ProtectedRoute roles={['admin']}>
                <AdminUsersCreatePage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/fermes',
        element: (
            <ProtectedRoute roles={['admin']}>
                <AdminFermesGestion />
            </ProtectedRoute>
        ),
    },
    {
        path: '/parametres',
        element: (
            <ProtectedRoute roles={['admin']}>
                <AdminSettingsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/dashboard',
        element: (
            <ProtectedRoute roles={['owner']}>
                <OwnerDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/fermes',
        element: (
            <ProtectedRoute roles={['owner']}>
                <OwnerFarmParcelPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/fermes/creer',
        element: (
            <ProtectedRoute roles={['owner']}>
                <OwnerFarmCreatePage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/fermes/:id',
        element: (
            <ProtectedRoute roles={['owner']}>
                <OwnerFarmDetailPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/analytics',
        element: (
            <ProtectedRoute roles={['owner']}>
                <OwnerYieldAnalyticsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/parcelles',
        element: (
            <ProtectedRoute roles={['owner']}>
                <OwnerParcelsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/parcelles/creer',
        element: (
            <ProtectedRoute roles={['owner']}>
                <OwnerParcelCreatePage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/parcelles/apercu',
        element: (
            <ProtectedRoute roles={['owner']}>
                <OwnerOverviewParcelPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/parcelles/:id',
        element: (
            <ProtectedRoute roles={['owner']}>
                <OwnerDetailParcell />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/cultures',
        element: (
            <ProtectedRoute roles={['owner']}>
                <OwnerCulturesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/affectation',
        element: (
            <ProtectedRoute roles={['owner']}>
                <OwnerAffectation />
            </ProtectedRoute>
        ),
    },
    {
        path: '/employee/dashboard',
        element: (
            <ProtectedRoute roles={['employee']}>
                <EmployeeDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/employee/parcelles/:id',
        element: (
            <ProtectedRoute roles={['employee']}>
                <EmployeeParcelDetailPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/employee/productions/:id',
        element: (
            <ProtectedRoute roles={['employee']}>
                <EmployeeProductionDetailPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/employee/productions/:id/modifier',
        element: (
            <ProtectedRoute roles={['employee']}>
                <EmployeeProductionEditPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/employee/parcelles/:id/previsions',
        element: (
            <ProtectedRoute roles={['employee']}>
                <EmployeeParcelForecastPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/employee/parcelles/:id/equipe',
        element: (
            <ProtectedRoute roles={['employee']}>
                <EmployeeParcelTeamPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/employee/saisir-recolte',
        element: (
            <ProtectedRoute roles={['employee']}>
                <EmployeeHarvestLogPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/employee/parcelles/:id/saisir-recolte',
        element: (
            <ProtectedRoute roles={['employee']}>
                <EmployeeHarvestLogPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/employee/cultures',
        element: (
            <ProtectedRoute roles={['employee']}>
                <EmployeeCulturesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/employee/parcelles/:id/rapport-quotidien',
        element: (
            <ProtectedRoute roles={['employee']}>
                <EmployeeDailyReportPage />
            </ProtectedRoute>
        ),
    },
    { path: '*', element: <Navigate to="/" replace /> },
])
