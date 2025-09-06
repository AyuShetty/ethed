'use client';

import React from 'react';
import Link from 'next/link';
import { useRole } from '@/hooks/useRole';
import { Role } from '@/types/roles';

export default function SimpleRoleTest() {
  const { userRole, setUserRole, isAdmin, isInstructor, isStudent } = useRole();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="backdrop-blur-md bg-white/10 rounded-lg p-6 border border-white/20">
          <h1 className="text-2xl font-bold text-white mb-6">🧪 Simple Role Test</h1>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">Current Role Status:</h2>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-white">Current Role: <span className="font-bold text-yellow-400">{userRole || 'None'}</span></p>
              <p className="text-white">Is Admin: <span className={isAdmin ? 'text-green-400' : 'text-red-400'}>{isAdmin ? 'Yes' : 'No'}</span></p>
              <p className="text-white">Is Instructor: <span className={isInstructor ? 'text-green-400' : 'text-red-400'}>{isInstructor ? 'Yes' : 'No'}</span></p>
              <p className="text-white">Is Student: <span className={isStudent ? 'text-green-400' : 'text-red-400'}>{isStudent ? 'Yes' : 'No'}</span></p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">Switch Role:</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setUserRole(Role.STUDENT)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  userRole === Role.STUDENT 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/20 text-white/80 hover:bg-white/30'
                }`}
              >
                👨‍🎓 Student
              </button>
              <button
                onClick={() => setUserRole(Role.INSTRUCTOR)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  userRole === Role.INSTRUCTOR 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-white/20 text-white/80 hover:bg-white/30'
                }`}
              >
                👨‍🏫 Instructor
              </button>
              <button
                onClick={() => setUserRole(Role.ADMIN)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  userRole === Role.ADMIN 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/20 text-white/80 hover:bg-white/30'
                }`}
              >
                👑 Admin
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">Test Navigation:</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/courses" className="bg-blue-500/30 text-blue-200 px-4 py-2 rounded-lg text-center hover:bg-blue-500/50 transition-all">
                📚 Courses
              </Link>
              <Link href="/creator" className="bg-green-500/30 text-green-200 px-4 py-2 rounded-lg text-center hover:bg-green-500/50 transition-all">
                ➕ Create Course
              </Link>
              <Link href="/instructor" className="bg-yellow-500/30 text-yellow-200 px-4 py-2 rounded-lg text-center hover:bg-yellow-500/50 transition-all">
                👨‍🏫 Instructor
              </Link>
              <Link href="/admin/dashboard" className="bg-red-500/30 text-red-200 px-4 py-2 rounded-lg text-center hover:bg-red-500/50 transition-all">
                👑 Admin
              </Link>
            </div>
          </div>

          <div className="text-white/60 text-sm">
            <p>• Switch roles using the buttons above</p>
            <p>• Try navigating to different pages to test access control</p>
            <p>• Check the navigation bar for role-specific items</p>
          </div>
        </div>
      </div>
    </div>
  );
}
