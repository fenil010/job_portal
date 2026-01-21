import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Loading fallback component
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#F4EDE3]">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#90353D]/30 border-t-[#90353D] rounded-full animate-spin" />
            <p className="text-[#4A3C35] text-sm">Loading...</p>
        </div>
    </div>
);

// Lazy load pages for code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const JobSeekerDashboard = lazy(() => import('./pages/dashboard/JobSeekerDashboard'));
const EmployerDashboard = lazy(() => import('./pages/dashboard/EmployerDashboard'));
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'));
const JobListingsPage = lazy(() => import('./pages/jobs/JobListingsPage'));
const JobDetailsPage = lazy(() => import('./pages/jobs/JobDetailsPage'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'));
const CommunicationHub = lazy(() => import('./pages/CommunicationHub'));
const AnalyticsHub = lazy(() => import('./pages/AnalyticsHub'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Wrap component with Suspense
const withSuspense = (Component) => (
    <Suspense fallback={<PageLoader />}>
        <Component />
    </Suspense>
);

const router = createBrowserRouter([
    // Public Routes - Landing page is home
    {
        path: '/',
        element: withSuspense(LandingPage),
    },
    {
        path: '/login',
        element: withSuspense(LoginPage),
    },
    {
        path: '/register',
        element: withSuspense(RegisterPage),
    },

    // Job Seeker Routes
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['jobseeker']}>
                {withSuspense(JobSeekerDashboard)}
            </ProtectedRoute>
        ),
    },
    {
        path: '/jobs',
        element: (
            <ProtectedRoute allowedRoles={['jobseeker', 'employer', 'admin']}>
                {withSuspense(JobListingsPage)}
            </ProtectedRoute>
        ),
    },
    {
        path: '/jobs/:id',
        element: (
            <ProtectedRoute allowedRoles={['jobseeker', 'employer', 'admin']}>
                {withSuspense(JobDetailsPage)}
            </ProtectedRoute>
        ),
    },
    {
        path: '/saved',
        element: (
            <ProtectedRoute allowedRoles={['jobseeker']}>
                {withSuspense(JobListingsPage)}
            </ProtectedRoute>
        ),
    },
    {
        path: '/applications',
        element: (
            <ProtectedRoute allowedRoles={['jobseeker']}>
                {withSuspense(JobSeekerDashboard)}
            </ProtectedRoute>
        ),
    },
    {
        path: '/profile',
        element: (
            <ProtectedRoute allowedRoles={['jobseeker']}>
                {withSuspense(ProfilePage)}
            </ProtectedRoute>
        ),
    },
    {
        path: '/settings',
        element: (
            <ProtectedRoute>
                {withSuspense(SettingsPage)}
            </ProtectedRoute>
        ),
    },

    // Employer Routes
    {
        path: '/employer/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['employer']}>
                {withSuspense(EmployerDashboard)}
            </ProtectedRoute>
        ),
    },
    {
        path: '/employer/*',
        element: (
            <ProtectedRoute allowedRoles={['employer']}>
                {withSuspense(EmployerDashboard)}
            </ProtectedRoute>
        ),
    },

    // Admin Routes
    {
        path: '/admin/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['admin']}>
                {withSuspense(AdminDashboard)}
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/*',
        element: (
            <ProtectedRoute allowedRoles={['admin']}>
                {withSuspense(AdminDashboard)}
            </ProtectedRoute>
        ),
    },

    // Shared Routes
    {
        path: '/messages',
        element: (
            <ProtectedRoute>
                {withSuspense(CommunicationHub)}
            </ProtectedRoute>
        ),
    },
    {
        path: '/analytics',
        element: (
            <ProtectedRoute allowedRoles={['employer', 'admin']}>
                {withSuspense(AnalyticsHub)}
            </ProtectedRoute>
        ),
    },

    // Catch-all 404
    {
        path: '*',
        element: withSuspense(NotFoundPage),
    },
]);

export default router;
