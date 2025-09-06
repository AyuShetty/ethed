'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRole } from '@/hooks/useRole';
import { Role } from '@/types/roles';
import { motion } from 'framer-motion';
import { Lock, AlertCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: Role[];
  redirectTo?: string;
  fallback?: ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({ 
  children, 
  allowedRoles, 
  redirectTo,
  fallback,
  requireAuth = true 
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const { userRole, isLoading, canAccess } = useRole();
  const router = useRouter();

  // Show loading state
  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full mx-auto mb-4"></div>
          <p className="text-white/80 text-lg">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !session) {
    if (redirectTo) {
      router.push(redirectTo);
      return null;
    }
    return fallback || <UnauthorizedMessage message="Please sign in to access this page" />;
  }

  // Check role permissions
  if (userRole && !canAccess(allowedRoles)) {
    if (redirectTo) {
      router.push(redirectTo);
      return null;
    }
    return fallback || <ForbiddenMessage userRole={userRole} allowedRoles={allowedRoles} />;
  }

  return <>{children}</>;
}

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: Role[];
  fallback?: ReactNode;
  hideIfNoAccess?: boolean;
}

export function RoleGuard({ 
  children, 
  allowedRoles, 
  fallback, 
  hideIfNoAccess = false 
}: RoleGuardProps) {
  const { canAccess, userRole } = useRole();

  if (!userRole || !canAccess(allowedRoles)) {
    if (hideIfNoAccess) return null;
    return fallback || <div className="text-white/50 text-sm italic">Access restricted</div>;
  }

  return <>{children}</>;
}

function UnauthorizedMessage({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 max-w-md mx-4"
      >
        <Lock className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
        <p className="text-white/80 mb-6">{message}</p>
        <button
          onClick={() => window.location.href = '/auth'}
          className="backdrop-blur-md bg-blue-500/30 hover:bg-blue-500/50 border border-blue-400/30 text-white font-semibold px-6 py-3 rounded-lg transition-all"
        >
          Sign In
        </button>
      </motion.div>
    </div>
  );
}

function ForbiddenMessage({ userRole, allowedRoles }: { userRole: Role; allowedRoles: Role[] }) {
  const getRoleDisplayName = (role: Role) => {
    switch (role) {
      case Role.ADMIN: return 'Administrator';
      case Role.INSTRUCTOR: return 'Instructor';
      case Role.STUDENT: return 'Student';
      default: return role;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 max-w-md mx-4"
      >
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Access Forbidden</h2>
        <p className="text-white/80 mb-4">
          Your current role: <span className="font-semibold text-yellow-400">{getRoleDisplayName(userRole)}</span>
        </p>
        <p className="text-white/80 mb-6">
          Required roles: {allowedRoles.map(getRoleDisplayName).join(', ')}
        </p>
        <button
          onClick={() => window.history.back()}
          className="backdrop-blur-md bg-gray-500/30 hover:bg-gray-500/50 border border-gray-400/30 text-white font-semibold px-6 py-3 rounded-lg transition-all"
        >
          Go Back
        </button>
      </motion.div>
    </div>
  );
}
