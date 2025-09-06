'use client';

import React from 'react';
import { useRole } from '@/hooks/useRole';
import { Crown, Shield, BarChart3, Users, FileText } from 'lucide-react';
import Link from 'next/link';

export function AdminOverlay() {
  const { userRole, isAdmin } = useRole();

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 backdrop-blur-lg border border-yellow-400/30 rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400 font-bold text-sm">ADMIN MODE</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Link 
            href="/admin/dashboard"
            className="flex items-center gap-2 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
          >
            <Shield className="w-3 h-3" />
            Dashboard
          </Link>
          
          <Link 
            href="/admin/users"
            className="flex items-center gap-2 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
          >
            <Users className="w-3 h-3" />
            Users
          </Link>
          
          <Link 
            href="/admin/courses"
            className="flex items-center gap-2 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
          >
            <FileText className="w-3 h-3" />
            Courses
          </Link>
          
          <Link 
            href="/admin/analytics"
            className="flex items-center gap-2 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
          >
            <BarChart3 className="w-3 h-3" />
            Analytics
          </Link>
        </div>
        
        <div className="mt-2 pt-2 border-t border-yellow-400/20">
          <div className="text-xs text-yellow-300/60">
            Role: {userRole}
          </div>
        </div>
      </div>
    </div>
  );
}