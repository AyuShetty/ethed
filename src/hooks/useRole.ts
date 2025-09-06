import { useRole as useRoleContext } from '@/context/RoleContext';
import { Role, Permission, hasPermission, canAccessRoute as checkRouteAccess } from '@/types/roles';

// Enhanced useRole hook with additional utilities
export function useRole() {
  const context = useRoleContext();

  // Permission checking utilities
  const checkPermission = (permission: Permission): boolean => {
    if (!context.userRole) return false;
    return hasPermission(context.userRole, permission);
  };

  const checkPermissions = (permissions: Permission[], requireAll = false): boolean => {
    if (!context.userRole) return false;
    
    if (requireAll) {
      return permissions.every(permission => hasPermission(context.userRole!, permission));
    }
    
    return permissions.some(permission => hasPermission(context.userRole!, permission));
  };

  // Route access checking
  const canAccessRoute = (route: string): boolean => {
    if (!context.userRole) return false;
    return checkRouteAccess(context.userRole, route);
  };

  // Role-based component rendering helpers
  const renderForRole = (role: Role, component: React.ReactNode): React.ReactNode | null => {
    return context.hasRole(role) ? component : null;
  };

  const renderForRoles = (roles: Role[], component: React.ReactNode): React.ReactNode | null => {
    return context.hasAnyRole(roles) ? component : null;
  };

  const renderForPermission = (permission: Permission, component: React.ReactNode): React.ReactNode | null => {
    return checkPermission(permission) ? component : null;
  };

  const renderForPermissions = (
    permissions: Permission[], 
    component: React.ReactNode, 
    requireAll = false
  ): React.ReactNode | null => {
    return checkPermissions(permissions, requireAll) ? component : null;
  };

  // Admin-specific utilities
  const isAdminOrHigher = (): boolean => {
    return context.isAdmin;
  };

  const isInstructorOrHigher = (): boolean => {
    return context.isAdmin || context.isInstructor;
  };

  // Get role-specific dashboard route
  const getDashboardRoute = (): string => {
    if (context.isAdmin) return '/admin/dashboard';
    if (context.isInstructor) return '/instructor';
    return '/courses';
  };

  return {
    ...context,
    checkPermission,
    checkPermissions,
    canAccessRoute,
    renderForRole,
    renderForRoles,
    renderForPermission,
    renderForPermissions,
    isAdminOrHigher,
    isInstructorOrHigher,
    getDashboardRoute,
  };
}
