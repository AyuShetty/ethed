'use client';

import React, { ReactNode } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Role } from '@/types/roles';
import { RoleBasedNav } from '@/components/navigation/RoleBasedNav';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Search, 
  Settings, 
  Crown,
  Users,
  BookOpen,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN]}>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 min-h-screen p-4 border-r border-white/10">
            <div className="mb-6">
              <h1 className="text-white text-xl font-bold flex items-center gap-2">
                <Crown className="text-yellow-400" size={24} />
                Admin Panel
              </h1>
              <p className="text-white/60 text-sm">Platform Management</p>
            </div>
            
            <RoleBasedNav />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <AdminHeader title={title} subtitle={subtitle} />
            
            {/* Content */}
            <main className="p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function AdminHeader({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <header className="backdrop-blur-md bg-white/5 border-b border-white/10 p-4">
      <div className="flex items-center justify-between">
        <div>
          {title && (
            <h2 className="text-white text-2xl font-bold">{title}</h2>
          )}
          {subtitle && (
            <p className="text-white/70 text-sm">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400/50"
            />
          </div>

          {/* Notifications */}
          <NotificationButton />

          {/* Settings */}
          <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all">
            <Settings size={20} />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10 border border-white/20">
            <Crown className="text-yellow-400" size={16} />
            <span className="text-white text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function NotificationButton() {
  const notifications = [
    { id: 1, type: 'course', message: '3 courses pending approval', count: 3 },
    { id: 2, type: 'user', message: '2 instructor applications', count: 2 },
    { id: 3, type: 'system', message: '1 system alert', count: 1 }
  ];

  const totalCount = notifications.reduce((sum, notif) => sum + notif.count, 0);

  return (
    <div className="relative">
      <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all relative">
        <Bell size={20} />
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalCount}
          </span>
        )}
      </button>
    </div>
  );
}

// Quick Stats Component for Admin Dashboard
export function AdminQuickStats() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Courses',
      value: '89',
      change: '+5%',
      icon: BookOpen,
      color: 'green'
    },
    {
      title: 'Pending Approvals',
      value: '3',
      change: '-2',
      icon: AlertCircle,
      color: 'orange'
    },
    {
      title: 'Revenue',
      value: '$45,230',
      change: '+18%',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="backdrop-blur-md bg-white/10 rounded-lg p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <stat.icon className={`text-${stat.color}-400`} size={24} />
            <span className={`text-${stat.color}-400 text-sm font-medium`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-white text-2xl font-bold mb-1">{stat.value}</h3>
          <p className="text-white/60 text-sm">{stat.title}</p>
        </motion.div>
      ))}
    </div>
  );
}
