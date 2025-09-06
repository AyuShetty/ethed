'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { Role } from '@/types/roles';

interface RoleContextType {
  userRole: Role | null;
  isLoading: boolean;
  setUserRole: (role: Role) => void;
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
  isAdmin: boolean;
  isInstructor: boolean;
  isStudent: boolean;
  canAccess: (allowedRoles: Role[]) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
}

export function RoleProvider({ children }: RoleProviderProps) {
  const { data: session, status } = useSession();
  const [userRole, setUserRoleState] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('RoleProvider: Session status:', status);
    console.log('RoleProvider: Session data:', session);
    
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }

    // Check localStorage for saved role first
    const savedRole = localStorage.getItem('userRole') as Role;
    if (savedRole && Object.values(Role).includes(savedRole)) {
      console.log('RoleProvider: Found saved role in localStorage:', savedRole);
      setUserRoleState(savedRole);
      setIsLoading(false);
      return;
    }

    if (status === 'unauthenticated') {
      console.log('RoleProvider: User not authenticated, setting default role to STUDENT');
      setUserRoleState(Role.STUDENT); // Default to student for unauthenticated users
      setIsLoading(false);
      return;
    }

    if (session?.user?.email) {
      // For demo purposes, assign roles based on email
      // In production, this would come from the user object or API call
      const email = session.user.email;
      let role: Role;

      if (email === 'admin@ethed.com' || email.includes('admin')) {
        role = Role.ADMIN;
      } else if (email === 'instructor@ethed.com' || email.includes('instructor')) {
        role = Role.INSTRUCTOR;
      } else {
        role = Role.STUDENT;
      }

      console.log('RoleProvider: Assigned role', role, 'to email', email);
      setUserRoleState(role);
    } else {
      console.log('RoleProvider: No email found, setting default role to STUDENT');
      setUserRoleState(Role.STUDENT); // Default fallback
    }
    
    setIsLoading(false);
  }, [session, status]);

  const setUserRole = (role: Role) => {
    setUserRoleState(role);
    // Store in localStorage for persistence
    localStorage.setItem('userRole', role);
  };

  const hasRole = (role: Role): boolean => {
    return userRole === role;
  };

  const hasAnyRole = (roles: Role[]): boolean => {
    return userRole ? roles.includes(userRole) : false;
  };

  const canAccess = (allowedRoles: Role[]): boolean => {
    return userRole ? allowedRoles.includes(userRole) : false;
  };

  const value: RoleContextType = {
    userRole,
    isLoading,
    setUserRole,
    hasRole,
    hasAnyRole,
    isAdmin: userRole === Role.ADMIN,
    isInstructor: userRole === Role.INSTRUCTOR,
    isStudent: userRole === Role.STUDENT,
    canAccess,
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextType {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
