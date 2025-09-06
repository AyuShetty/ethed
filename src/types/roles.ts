// Role definitions and permissions
export enum Role {
  ADMIN = 'ADMIN',
  INSTRUCTOR = 'INSTRUCTOR',
  STUDENT = 'STUDENT'
}

export enum Permission {
  // Course Management
  CREATE_COURSE = 'CREATE_COURSE',
  EDIT_OWN_COURSE = 'EDIT_OWN_COURSE',
  EDIT_ANY_COURSE = 'EDIT_ANY_COURSE',
  DELETE_OWN_COURSE = 'DELETE_OWN_COURSE',
  DELETE_ANY_COURSE = 'DELETE_ANY_COURSE',
  APPROVE_COURSE = 'APPROVE_COURSE',
  VIEW_ALL_COURSES = 'VIEW_ALL_COURSES',
  
  // User Management
  VIEW_ALL_USERS = 'VIEW_ALL_USERS',
  EDIT_USER_ROLES = 'EDIT_USER_ROLES',
  SUSPEND_USERS = 'SUSPEND_USERS',
  DELETE_USERS = 'DELETE_USERS',
  
  // Analytics & Reports
  VIEW_PLATFORM_ANALYTICS = 'VIEW_PLATFORM_ANALYTICS',
  VIEW_OWN_ANALYTICS = 'VIEW_OWN_ANALYTICS',
  VIEW_FINANCIAL_REPORTS = 'VIEW_FINANCIAL_REPORTS',
  
  // Content Management
  MODERATE_CONTENT = 'MODERATE_CONTENT',
  MANAGE_COMMENTS = 'MANAGE_COMMENTS',
  
  // System Settings
  MANAGE_PLATFORM_SETTINGS = 'MANAGE_PLATFORM_SETTINGS',
  MANAGE_INSTRUCTOR_APPLICATIONS = 'MANAGE_INSTRUCTOR_APPLICATIONS',
  
  // Learning & Enrollment
  ENROLL_IN_COURSES = 'ENROLL_IN_COURSES',
  ACCESS_LEARNING_CONTENT = 'ACCESS_LEARNING_CONTENT',
  TRACK_PROGRESS = 'TRACK_PROGRESS',
  PARTICIPATE_COMMUNITY = 'PARTICIPATE_COMMUNITY'
}

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    // Full access to everything
    Permission.CREATE_COURSE,
    Permission.EDIT_OWN_COURSE,
    Permission.EDIT_ANY_COURSE,
    Permission.DELETE_OWN_COURSE,
    Permission.DELETE_ANY_COURSE,
    Permission.APPROVE_COURSE,
    Permission.VIEW_ALL_COURSES,
    Permission.VIEW_ALL_USERS,
    Permission.EDIT_USER_ROLES,
    Permission.SUSPEND_USERS,
    Permission.DELETE_USERS,
    Permission.VIEW_PLATFORM_ANALYTICS,
    Permission.VIEW_OWN_ANALYTICS,
    Permission.VIEW_FINANCIAL_REPORTS,
    Permission.MODERATE_CONTENT,
    Permission.MANAGE_COMMENTS,
    Permission.MANAGE_PLATFORM_SETTINGS,
    Permission.MANAGE_INSTRUCTOR_APPLICATIONS,
    Permission.ENROLL_IN_COURSES,
    Permission.ACCESS_LEARNING_CONTENT,
    Permission.TRACK_PROGRESS,
    Permission.PARTICIPATE_COMMUNITY
  ],
  
  [Role.INSTRUCTOR]: [
    // Course creation and management for own courses
    Permission.CREATE_COURSE,
    Permission.EDIT_OWN_COURSE,
    Permission.DELETE_OWN_COURSE,
    Permission.VIEW_OWN_ANALYTICS,
    Permission.ENROLL_IN_COURSES,
    Permission.ACCESS_LEARNING_CONTENT,
    Permission.TRACK_PROGRESS,
    Permission.PARTICIPATE_COMMUNITY
  ],
  
  [Role.STUDENT]: [
    // Learning and community participation only
    Permission.ENROLL_IN_COURSES,
    Permission.ACCESS_LEARNING_CONTENT,
    Permission.TRACK_PROGRESS,
    Permission.PARTICIPATE_COMMUNITY
  ]
};

// Navigation routes based on roles
export const ROLE_ROUTES: Record<Role, string[]> = {
  [Role.ADMIN]: [
    '/',
    '/courses',
    '/courses/[id]',
    '/learn/[courseId]/[lessonId]',
    '/profile',
    '/progress',
    '/rewards',
    '/community',
    '/about',
    '/admin',
    '/admin/dashboard',
    '/admin/courses',
    '/admin/users',
    '/admin/analytics',
    '/admin/settings',
    '/admin/reports',
    '/creator',
    '/instructor'
  ],
  
  [Role.INSTRUCTOR]: [
    '/',
    '/courses',
    '/courses/[id]',
    '/learn/[courseId]/[lessonId]',
    '/profile',
    '/progress',
    '/rewards',
    '/community',
    '/about',
    '/creator',
    '/instructor'
  ],
  
  [Role.STUDENT]: [
    '/',
    '/courses',
    '/courses/[id]',
    '/learn/[courseId]/[lessonId]',
    '/profile',
    '/progress',
    '/rewards',
    '/community',
    '/about'
  ]
};

// Default redirect routes for each role after login
export const ROLE_REDIRECTS: Record<Role, string> = {
  [Role.ADMIN]: '/admin/dashboard',
  [Role.INSTRUCTOR]: '/instructor',
  [Role.STUDENT]: '/courses'
};

// User interface for role management
export interface RoleUser {
  id: string;
  name: string | null;
  email: string | null;
  role: Role;
  image: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Permission checking utilities
export function hasPermission(userRole: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole].includes(permission);
}

export function hasAnyPermission(userRole: Role, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(userRole, permission));
}

export function hasAllPermissions(userRole: Role, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(userRole, permission));
}

export function canAccessRoute(userRole: Role, route: string): boolean {
  // Check if the route matches any allowed routes for the role
  const allowedRoutes = ROLE_ROUTES[userRole];
  
  // Handle dynamic routes
  return allowedRoutes.some(allowedRoute => {
    // Convert dynamic route pattern to regex
    const pattern = allowedRoute
      .replace(/\[.*?\]/g, '[^/]+')  // Replace [id], [courseId], etc. with regex
      .replace(/\//g, '\\/');        // Escape forward slashes
    
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(route);
  });
}

// Role display helpers
export function getRoleDisplayName(role: Role): string {
  switch (role) {
    case Role.ADMIN:
      return 'Administrator';
    case Role.INSTRUCTOR:
      return 'Instructor';
    case Role.STUDENT:
      return 'Student';
    default:
      return 'Unknown';
  }
}

export function getRoleColor(role: Role): string {
  switch (role) {
    case Role.ADMIN:
      return 'text-red-400 bg-red-500/20 border-red-500/30';
    case Role.INSTRUCTOR:
      return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    case Role.STUDENT:
      return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    default:
      return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
  }
}

export function getRoleIcon(role: Role): string {
  switch (role) {
    case Role.ADMIN:
      return '👑';
    case Role.INSTRUCTOR:
      return '👨‍🏫';
    case Role.STUDENT:
      return '👨‍🎓';
    default:
      return '👤';
  }
}
