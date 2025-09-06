'use client';

import React from 'react';
import { AdminLayout, AdminQuickStats } from '@/layouts/AdminLayout';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Settings
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle="Platform overview and quick actions"
    >
      {/* Quick Stats */}
      <AdminQuickStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Pending Approvals */}
        <PendingApprovals />

        {/* System Health */}
        <SystemHealth />
      </div>
    </AdminLayout>
  );
}

function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'course_submission',
      message: 'New course "Advanced Smart Contracts" submitted for review',
      user: 'John Doe',
      time: '2 minutes ago',
      icon: BookOpen,
      color: 'blue'
    },
    {
      id: 2,
      type: 'user_registration',
      message: 'New instructor application from Sarah Wilson',
      user: 'Sarah Wilson',
      time: '15 minutes ago',
      icon: Users,
      color: 'green'
    },
    {
      id: 3,
      type: 'course_approval',
      message: 'Course "DeFi Fundamentals" approved and published',
      user: 'Admin',
      time: '1 hour ago',
      icon: CheckCircle,
      color: 'emerald'
    },
    {
      id: 4,
      type: 'payment',
      message: 'Instructor payout processed: $1,250',
      user: 'System',
      time: '2 hours ago',
      icon: DollarSign,
      color: 'yellow'
    },
    {
      id: 5,
      type: 'report',
      message: 'User reported inappropriate content in course comments',
      user: 'Mike Chen',
      time: '3 hours ago',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-md bg-white/10 rounded-lg p-6 border border-white/20"
    >
      <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
        <Clock size={20} />
        Recent Activity
      </h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
            <div className={`p-2 rounded-lg bg-${activity.color}-500/20 border border-${activity.color}-400/30`}>
              <activity.icon size={16} className={`text-${activity.color}-400`} />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">{activity.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-white/60 text-xs">{activity.user}</span>
                <span className="text-white/40 text-xs">•</span>
                <span className="text-white/60 text-xs">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-blue-400 text-sm hover:text-blue-300 transition-colors">
        View All Activity →
      </button>
    </motion.div>
  );
}

function QuickActions() {
  const actions = [
    {
      label: 'Review Courses',
      description: '3 pending approvals',
      icon: BookOpen,
      color: 'blue',
      href: '/admin/courses?filter=pending'
    },
    {
      label: 'Manage Users',
      description: 'View all users',
      icon: Users,
      color: 'green',
      href: '/admin/users'
    },
    {
      label: 'View Analytics',
      description: 'Platform insights',
      icon: TrendingUp,
      color: 'purple',
      href: '/admin/analytics'
    },
    {
      label: 'Platform Settings',
      description: 'Configure system',
      icon: Settings,
      color: 'gray',
      href: '/admin/settings'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="backdrop-blur-md bg-white/10 rounded-lg p-6 border border-white/20"
    >
      <h3 className="text-white text-xl font-bold mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className={`
              w-full p-4 rounded-lg border transition-all text-left
              bg-${action.color}-500/10 border-${action.color}-400/30 
              hover:bg-${action.color}-500/20 hover:border-${action.color}-400/50
            `}
          >
            <div className="flex items-center gap-3">
              <action.icon size={20} className={`text-${action.color}-400`} />
              <div>
                <p className="text-white font-medium text-sm">{action.label}</p>
                <p className="text-white/60 text-xs">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function PendingApprovals() {
  const pendingItems = [
    {
      id: 1,
      type: 'course',
      title: 'Advanced Smart Contracts',
      instructor: 'John Doe',
      submitted: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'instructor',
      title: 'Instructor Application',
      instructor: 'Sarah Wilson',
      submitted: '1 day ago',
      status: 'under_review'
    },
    {
      id: 3,
      type: 'course',
      title: 'NFT Development Guide',
      instructor: 'Mike Chen',
      submitted: '3 days ago',
      status: 'pending'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="backdrop-blur-md bg-white/10 rounded-lg p-6 border border-white/20"
    >
      <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle size={20} className="text-orange-400" />
        Pending Approvals
      </h3>
      
      <div className="space-y-4">
        {pendingItems.map((item) => (
          <div key={item.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {item.type === 'course' ? (
                  <BookOpen size={16} className="text-blue-400" />
                ) : (
                  <Users size={16} className="text-green-400" />
                )}
                <span className="text-white font-medium text-sm">{item.title}</span>
              </div>
              <span className="text-orange-400 text-xs bg-orange-500/20 px-2 py-1 rounded-full">
                {item.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-white/60 text-sm">By {item.instructor}</p>
            <p className="text-white/40 text-xs mt-1">{item.submitted}</p>
            
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 px-3 bg-green-500/20 text-green-400 border border-green-400/30 rounded-lg text-sm hover:bg-green-500/30 transition-all">
                Approve
              </button>
              <button className="flex-1 py-2 px-3 bg-red-500/20 text-red-400 border border-red-400/30 rounded-lg text-sm hover:bg-red-500/30 transition-all">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SystemHealth() {
  const healthMetrics = [
    {
      name: 'Server Uptime',
      value: '99.9%',
      status: 'excellent',
      color: 'green'
    },
    {
      name: 'Database Performance',
      value: '95%',
      status: 'good',
      color: 'blue'
    },
    {
      name: 'CDN Status',
      value: '100%',
      status: 'excellent',
      color: 'green'
    },
    {
      name: 'Error Rate',
      value: '0.1%',
      status: 'excellent',
      color: 'green'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="backdrop-blur-md bg-white/10 rounded-lg p-6 border border-white/20"
    >
      <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp size={20} className="text-green-400" />
        System Health
      </h3>
      
      <div className="space-y-4">
        {healthMetrics.map((metric) => (
          <div key={metric.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <span className="text-white/80 text-sm">{metric.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">{metric.value}</span>
              <div className={`w-2 h-2 rounded-full bg-${metric.color}-400`}></div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm transition-all">
        View Detailed Metrics
      </button>
    </motion.div>
  );
}
