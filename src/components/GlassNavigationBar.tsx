'use client';

import Link from 'next/link'
import { useRole } from '@/hooks/useRole';
import { Role, getRoleDisplayName, getRoleIcon } from '@/types/roles';
import { Crown, GraduationCap, BookOpen } from 'lucide-react';
import { RoleGuard } from '@/components/auth/ProtectedRoute';

export default function GlassNavigationBar() {
  const { userRole } = useRole();

  return (
    <header className="glass-nav fixed top-0 left-0 w-full z-50 px-4 md:px-10 py-3 flex items-center justify-between backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-2 font-extrabold text-lg text-cyan-300 tracking-widest">
        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Eth.Ed</span>
      </Link>
      
      <nav className="hidden md:flex gap-8 text-white/80 text-base items-center">
        <Link href="/courses" className="hover:text-cyan-300 transition">Courses</Link>
        
        {/* Instructor/Admin Course Creation */}
        <RoleGuard allowedRoles={[Role.ADMIN, Role.INSTRUCTOR]} hideIfNoAccess>
          <Link href="/creator" className="hover:text-cyan-300 transition flex items-center gap-1">
            <BookOpen size={16} />
            Create
          </Link>
        </RoleGuard>

        {/* Student/Instructor Progress */}
        <RoleGuard allowedRoles={[Role.STUDENT, Role.INSTRUCTOR, Role.ADMIN]} hideIfNoAccess>
          <Link href="/progress" className="hover:text-cyan-300 transition">Progress</Link>
        </RoleGuard>

        <Link href="/rewards" className="hover:text-cyan-300 transition">NFTs</Link>
        <Link href="/community" className="hover:text-cyan-300 transition">Community</Link>
        
        {/* Instructor Dashboard */}
        <RoleGuard allowedRoles={[Role.INSTRUCTOR, Role.ADMIN]} hideIfNoAccess>
          <Link href="/instructor" className="hover:text-cyan-300 transition flex items-center gap-1">
            <GraduationCap size={16} />
            Instructor
          </Link>
        </RoleGuard>

        {/* Admin Panel */}
        <RoleGuard allowedRoles={[Role.ADMIN]} hideIfNoAccess>
          <Link 
            href="/admin/dashboard" 
            className="hover:text-yellow-300 transition flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-lg border border-yellow-400/30"
          >
            <Crown size={16} />
            Admin
          </Link>
        </RoleGuard>

        <Link href="/about" className="hover:text-cyan-300 transition">About</Link>
        <Link href="/profile" className="hover:text-cyan-300 transition">Profile</Link>
        
        {/* Role Indicator */}
        {userRole && (
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg border border-white/20">
            <span className="text-lg">{getRoleIcon(userRole)}</span>
            <span className="text-xs font-medium">{getRoleDisplayName(userRole)}</span>
          </div>
        )}
      </nav>

      {/* Mobile Hamburger - Enhanced with Role Info */}
      <div className="md:hidden flex items-center gap-2">
        {userRole && (
          <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg border border-white/20">
            <span className="text-sm">{getRoleIcon(userRole)}</span>
            <span className="text-xs font-medium">{userRole}</span>
          </div>
        )}
        <button className="glass-button px-3 py-2 rounded-lg border border-white/20 text-white">
          <span className="sr-only">Menu</span>
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M4 7h20M4 14h20M4 21h20" />
          </svg>
        </button>
      </div>
    </header>
  )
}
