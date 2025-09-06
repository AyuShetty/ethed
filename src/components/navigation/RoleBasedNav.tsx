'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRole } from '@/hooks/useRole';
import { Role, getRoleDisplayName, getRoleColor, getRoleIcon } from '@/types/roles';
import { 
  Home, 
  BookOpen, 
  User, 
  TrendingUp, 
  Award, 
  Users, 
  Info,
  Settings,
  BarChart3,
  Shield,
  FileText,
  PlusCircle,
  GraduationCap,
  LucideIcon
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: Role[];
  badge?: string;
}

const navigationItems: NavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
    roles: [Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT]
  },
  {
    href: '/courses',
    label: 'Courses',
    icon: BookOpen,
    roles: [Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT]
  },
  {
    href: '/creator',
    label: 'Create Course',
    icon: PlusCircle,
    roles: [Role.ADMIN, Role.INSTRUCTOR]
  },
  {
    href: '/instructor',
    label: 'Instructor Dashboard',
    icon: GraduationCap,
    roles: [Role.ADMIN, Role.INSTRUCTOR]
  },
  {
    href: '/admin/dashboard',
    label: 'Admin Dashboard',
    icon: Shield,
    roles: [Role.ADMIN],
    badge: 'Admin'
  },
  {
    href: '/admin/courses',
    label: 'Course Management',
    icon: FileText,
    roles: [Role.ADMIN]
  },
  {
    href: '/admin/users',
    label: 'User Management',
    icon: Users,
    roles: [Role.ADMIN]
  },
  {
    href: '/admin/analytics',
    label: 'Analytics',
    icon: BarChart3,
    roles: [Role.ADMIN]
  },
  {
    href: '/admin/settings',
    label: 'Settings',
    icon: Settings,
    roles: [Role.ADMIN]
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: User,
    roles: [Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT]
  },
  {
    href: '/progress',
    label: 'Progress',
    icon: TrendingUp,
    roles: [Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT]
  },
  {
    href: '/rewards',
    label: 'Rewards',
    icon: Award,
    roles: [Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT]
  },
  {
    href: '/community',
    label: 'Community',
    icon: Users,
    roles: [Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT]
  },
  {
    href: '/about',
    label: 'About',
    icon: Info,
    roles: [Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT]
  }
];

export function RoleBasedNav() {
  const { userRole, canAccess } = useRole();
  const pathname = usePathname();

  if (!userRole) return null;

  const allowedItems = navigationItems.filter(item => canAccess(item.roles));

  return (
    <nav className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-2">
      {/* Role Badge */}
      <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getRoleIcon(userRole)}</span>
          <div>
            <p className="text-white font-medium text-sm">{getRoleDisplayName(userRole)}</p>
            <span className={`text-xs px-2 py-1 rounded-full border ${getRoleColor(userRole)}`}>
              {userRole}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="space-y-1">
        {allowedItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-all group
                ${isActive 
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-400/30' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <item.icon 
                size={18} 
                className={`
                  ${isActive ? 'text-blue-300' : 'text-white/60 group-hover:text-white'}
                `} 
              />
              <span className="text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-xs bg-red-500/30 text-red-300 px-2 py-1 rounded-full border border-red-400/30">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Quick Actions for Admin */}
      {userRole === Role.ADMIN && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-white/60 text-xs font-medium mb-2 px-3">QUICK ACTIONS</p>
          <div className="space-y-1">
            <QuickActionButton 
              href="/admin/courses?filter=pending" 
              icon={FileText}
              label="Pending Courses"
              badge="3"
            />
            <QuickActionButton 
              href="/admin/users?filter=instructors" 
              icon={Users}
              label="New Instructors"
              badge="2"
            />
          </div>
        </div>
      )}

      {/* Quick Actions for Instructor */}
      {userRole === Role.INSTRUCTOR && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-white/60 text-xs font-medium mb-2 px-3">QUICK ACTIONS</p>
          <div className="space-y-1">
            <QuickActionButton 
              href="/creator" 
              icon={PlusCircle}
              label="Create Course"
            />
            <QuickActionButton 
              href="/instructor/analytics" 
              icon={BarChart3}
              label="View Analytics"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

function QuickActionButton({ 
  href, 
  icon: Icon, 
  label, 
  badge 
}: { 
  href: string; 
  icon: LucideIcon; 
  label: string; 
  badge?: string; 
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm"
    >
      <Icon size={16} />
      <span>{label}</span>
      {badge && (
        <span className="ml-auto text-xs bg-orange-500/30 text-orange-300 px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}
