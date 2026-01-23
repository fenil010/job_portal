import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ProtectedRoute - Wraps routes that require authentication
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string[]} [props.allowedRoles] - Array of roles allowed to access the route
 * @param {string} [props.redirectTo] - Path to redirect unauthorized users
 */
export default function ProtectedRoute({
    children,
    allowedRoles = [],
    redirectTo = '/login'
}) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking auth status
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F4EDE3]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#90353D]/30 border-t-[#90353D] rounded-full animate-spin" />
                    <p className="text-[#4A3C35] text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Check role-based access if roles are specified
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        // Redirect to the appropriate dashboard based on user role
        const roleRedirects = {
            jobseeker: '/dashboard',
            employer: '/employer/dashboard',
            admin: '/admin/dashboard',
        };

        const redirectPath = roleRedirects[user?.role] || '/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return children;
}
