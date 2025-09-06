'use client';

import React from 'react';
import { useRole } from '@/hooks/useRole';
import { Permission, getRoleDisplayName, getRoleIcon } from '@/types/roles';
import { motion } from 'framer-motion';
import { 
  Crown, 
  GraduationCap, 
  BookOpen, 
  Shield, 
  Settings,
  BarChart3,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function RoleTestPage() {
  const { 
    userRole, 
    checkPermission, 
    isAdmin,
    isInstructor,
    isStudent
  } = useRole();

  const permissions = [
    Permission.CREATE_COURSE,
    Permission.EDIT_ANY_COURSE,
    Permission.VIEW_ALL_USERS,
    Permission.MANAGE_PLATFORM_SETTINGS,
    Permission.VIEW_PLATFORM_ANALYTICS,
    Permission.APPROVE_COURSE,
    Permission.ENROLL_IN_COURSES,
    Permission.ACCESS_LEARNING_CONTENT
  ];

  const routes = [
    { path: '/admin/dashboard', label: 'Admin Dashboard' },
    { path: '/admin/users', label: 'User Management' },
    { path: '/admin/courses', label: 'Course Management' },
    { path: '/instructor', label: 'Instructor Dashboard' },
    { path: '/creator', label: 'Create Course' },
    { path: '/courses', label: 'Course Catalog' },
    { path: '/profile', label: 'Profile' },
    { path: '/learn/course/lesson', label: 'Learning Interface' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            🎭 Role-Based Access Control Test Page
          </h1>
          <p className="text-white/70 text-lg">
            Test and verify role-based permissions and access control
          </p>
        </motion.div>

        {/* Current Role Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-md bg-white/10 rounded-lg p-6 border border-white/20 mb-8"
        >
          <h2 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
            <Crown className="text-yellow-400" />
            Current Role Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-6xl mb-3">{userRole ? getRoleIcon(userRole) : '❓'}</div>
              <h3 className="text-white text-xl font-bold">
                {userRole ? getRoleDisplayName(userRole) : 'No Role Assigned'}
              </h3>
              <p className="text-white/60">{userRole || 'Please assign a role'}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className={`w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center ${isAdmin ? 'bg-red-500/30 border-red-400' : 'bg-gray-500/30 border-gray-400'} border-2`}>
                  <Shield className={isAdmin ? 'text-red-400' : 'text-gray-400'} size={24} />
                </div>
                <p className={`text-sm font-medium ${isAdmin ? 'text-red-400' : 'text-gray-400'}`}>Admin</p>
              </div>
              
              <div>
                <div className={`w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center ${isInstructor ? 'bg-yellow-500/30 border-yellow-400' : 'bg-gray-500/30 border-gray-400'} border-2`}>
                  <GraduationCap className={isInstructor ? 'text-yellow-400' : 'text-gray-400'} size={24} />
                </div>
                <p className={`text-sm font-medium ${isInstructor ? 'text-yellow-400' : 'text-gray-400'}`}>Instructor</p>
              </div>
              
              <div>
                <div className={`w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center ${isStudent ? 'bg-blue-500/30 border-blue-400' : 'bg-gray-500/30 border-gray-400'} border-2`}>
                  <BookOpen className={isStudent ? 'text-blue-400' : 'text-gray-400'} size={24} />
                </div>
                <p className={`text-sm font-medium ${isStudent ? 'text-blue-400' : 'text-gray-400'}`}>Student</p>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-white font-medium mb-2">Quick Stats</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Is Admin:</span>
                  <span className={isAdmin ? 'text-green-400' : 'text-red-400'}>
                    {isAdmin ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Is Instructor:</span>
                  <span className={isInstructor ? 'text-green-400' : 'text-red-400'}>
                    {isInstructor ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Is Student:</span>
                  <span className={isStudent ? 'text-green-400' : 'text-red-400'}>
                    {isStudent ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Permission Testing */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-md bg-white/10 rounded-lg p-6 border border-white/20"
          >
            <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
              <Settings className="text-blue-400" />
              Permission Testing
            </h3>
            
            <div className="space-y-3">
              {permissions.map((permission) => {
                const hasPermission = checkPermission(permission);
                return (
                  <div key={permission} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <span className="text-white/80 text-sm">{permission.replace(/_/g, ' ')}</span>
                    <div className="flex items-center gap-2">
                      {hasPermission ? (
                        <CheckCircle className="text-green-400" size={16} />
                      ) : (
                        <XCircle className="text-red-400" size={16} />
                      )}
                      <span className={`text-xs font-medium ${hasPermission ? 'text-green-400' : 'text-red-400'}`}>
                        {hasPermission ? 'Allowed' : 'Denied'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Route Access Testing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-md bg-white/10 rounded-lg p-6 border border-white/20"
          >
            <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="text-green-400" />
              Route Access Testing
            </h3>
            
            <div className="space-y-3">
              {routes.map((route) => {
                // Simulate route-specific access logic
                let routeAccess = false;
                
                if (route.path.startsWith('/admin')) {
                  routeAccess = isAdmin;
                } else if (route.path === '/instructor' || route.path === '/creator') {
                  routeAccess = isAdmin || isInstructor;
                } else {
                  routeAccess = true; // Public or general user routes
                }
                
                return (
                  <div key={route.path} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div>
                      <span className="text-white/80 text-sm font-medium">{route.label}</span>
                      <p className="text-white/40 text-xs">{route.path}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {routeAccess ? (
                        <CheckCircle className="text-green-400" size={16} />
                      ) : (
                        <XCircle className="text-red-400" size={16} />
                      )}
                      <span className={`text-xs font-medium ${routeAccess ? 'text-green-400' : 'text-red-400'}`}>
                        {routeAccess ? 'Accessible' : 'Restricted'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="backdrop-blur-md bg-white/10 rounded-lg p-6 border border-white/20">
            <h3 className="text-white text-xl font-bold mb-4">Test Role-Specific Features</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/admin/dashboard'}
                disabled={!isAdmin}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2
                  ${isAdmin 
                    ? 'bg-red-500/30 text-red-300 border border-red-400/50 hover:bg-red-500/50' 
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30 cursor-not-allowed'
                  }
                `}
              >
                <Crown size={16} />
                Admin Dashboard
              </button>
              
              <button
                onClick={() => window.location.href = '/instructor'}
                disabled={!isInstructor && !isAdmin}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2
                  ${(isInstructor || isAdmin)
                    ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-400/50 hover:bg-yellow-500/50' 
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30 cursor-not-allowed'
                  }
                `}
              >
                <GraduationCap size={16} />
                Instructor Panel
              </button>
              
              <button
                onClick={() => window.location.href = '/courses'}
                className="px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 bg-blue-500/30 text-blue-300 border border-blue-400/50 hover:bg-blue-500/50"
              >
                <BookOpen size={16} />
                Course Catalog
              </button>
            </div>
            
            <p className="text-white/60 text-sm mt-4">
              Use the role switcher in the bottom-right corner to test different role permissions
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
