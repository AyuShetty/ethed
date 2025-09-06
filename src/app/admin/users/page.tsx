'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AdminLayout } from '@/layouts/AdminLayout';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  UserCheck, 
  UserX, 
  Shield, 
  GraduationCap,
  BookOpen,
  MoreHorizontal,
  Eye,
  Edit,
  Mail,
  Calendar,
  Award
} from 'lucide-react';
import { Role, getRoleDisplayName, getRoleColor, getRoleIcon } from '@/types/roles';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  createdAt: string;
  lastActive: string;
  status: 'active' | 'suspended' | 'pending';
  coursesCreated?: number;
  coursesEnrolled?: number;
  totalEarnings?: number;
}

export default function AdminUsersPage() {
  const [filter, setFilter] = useState<'all' | Role>('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AdminLayout 
      title="User Management" 
      subtitle="Manage users, roles, and permissions across the platform"
    >
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={16} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400/50"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`
              px-4 py-3 rounded-lg font-medium text-sm transition-all
              ${filter === 'all' 
                ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50' 
                : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
              }
            `}
          >
            All Users
          </button>
          {[Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT].map((role) => (
            <button
              key={role}
              onClick={() => setFilter(role)}
              className={`
                px-4 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2
                ${filter === role 
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50' 
                  : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
                }
              `}
            >
              <span className="text-lg">{getRoleIcon(role)}</span>
              {getRoleDisplayName(role)}
            </button>
          ))}
        </div>
      </div>

      {/* User Stats */}
      <PlatformUserStats />

      {/* Users Table */}
      <UsersTable filter={filter} searchTerm={searchTerm} />
    </AdminLayout>
  );
}

function PlatformUserStats() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+45 this week',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Instructors',
      value: '89',
      change: '+5 this month',
      icon: GraduationCap,
      color: 'green'
    },
    {
      title: 'Students',
      value: '1,142',
      change: '+40 this week',
      icon: BookOpen,
      color: 'purple'
    },
    {
      title: 'Admins',
      value: '3',
      change: 'No change',
      icon: Shield,
      color: 'red'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="backdrop-blur-md bg-white/10 rounded-lg p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <stat.icon className={`text-${stat.color}-400`} size={24} />
            <span className={`text-${stat.color}-400 text-xs`}>
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

function UsersTable({ filter, searchTerm }: { filter: 'all' | Role; searchTerm: string }) {
  // Mock data - in real app, this would come from API
  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: Role.INSTRUCTOR,
      avatar: '/images/instructors/john.jpg',
      createdAt: '2025-08-15',
      lastActive: '2 hours ago',
      status: 'active',
      coursesCreated: 5,
      totalEarnings: 12500
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: Role.ADMIN,
      avatar: '/images/instructors/sarah.jpg',
      createdAt: '2025-01-10',
      lastActive: '30 minutes ago',
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@example.com',
      role: Role.STUDENT,
      avatar: '/images/students/mike.jpg',
      createdAt: '2025-09-01',
      lastActive: '1 day ago',
      status: 'active',
      coursesEnrolled: 12
    },
    {
      id: '4',
      name: 'Emma Davis',
      email: 'emma@example.com',
      role: Role.INSTRUCTOR,
      avatar: '/images/instructors/emma.jpg',
      createdAt: '2025-07-20',
      lastActive: '3 days ago',
      status: 'pending',
      coursesCreated: 0
    },
    {
      id: '5',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: Role.STUDENT,
      avatar: '/images/students/alex.jpg',
      createdAt: '2025-08-28',
      lastActive: '1 week ago',
      status: 'suspended',
      coursesEnrolled: 3
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.role === filter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-md bg-white/10 rounded-lg border border-white/20 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="text-left p-4 text-white/80 font-medium">User</th>
              <th className="text-left p-4 text-white/80 font-medium">Role</th>
              <th className="text-left p-4 text-white/80 font-medium">Status</th>
              <th className="text-left p-4 text-white/80 font-medium">Activity</th>
              <th className="text-left p-4 text-white/80 font-medium">Joined</th>
              <th className="text-left p-4 text-white/80 font-medium">Stats</th>
              <th className="text-left p-4 text-white/80 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={user.avatar} 
                      alt={user.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-user.jpg';
                      }}
                    />
                    <div>
                      <h4 className="text-white font-medium text-sm">{user.name}</h4>
                      <p className="text-white/60 text-xs">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <RoleBadge role={user.role} />
                </td>
                <td className="p-4">
                  <StatusBadge status={user.status} />
                </td>
                <td className="p-4">
                  <span className="text-white/80 text-sm">{user.lastActive}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-white/60 text-sm">
                    <Calendar size={14} />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-4">
                  <UserStats user={user} />
                </td>
                <td className="p-4">
                  <UserActions user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto mb-4 text-white/40" size={48} />
          <p className="text-white/60">No users found matching your criteria.</p>
        </div>
      )}
    </motion.div>
  );
}

function RoleBadge({ role }: { role: Role }) {
  return (
    <span className={`
      inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
      ${getRoleColor(role)}
    `}>
      <span className="text-sm">{getRoleIcon(role)}</span>
      {getRoleDisplayName(role)}
    </span>
  );
}

function StatusBadge({ status }: { status: User['status'] }) {
  const statusConfig = {
    active: { color: 'green', label: 'Active' },
    suspended: { color: 'red', label: 'Suspended' },
    pending: { color: 'orange', label: 'Pending' }
  };

  const config = statusConfig[status];

  return (
    <span className={`
      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
      bg-${config.color}-500/20 text-${config.color}-400 border border-${config.color}-400/30
    `}>
      {config.label}
    </span>
  );
}

function UserStats({ user }: { user: User }) {
  if (user.role === Role.INSTRUCTOR) {
    return (
      <div className="text-xs text-white/60">
        <div className="flex items-center gap-1 mb-1">
          <BookOpen size={12} />
          <span>{user.coursesCreated || 0} courses</span>
        </div>
        {user.totalEarnings && (
          <div className="flex items-center gap-1">
            <Award size={12} />
            <span>${user.totalEarnings.toLocaleString()}</span>
          </div>
        )}
      </div>
    );
  }

  if (user.role === Role.STUDENT) {
    return (
      <div className="text-xs text-white/60">
        <div className="flex items-center gap-1">
          <BookOpen size={12} />
          <span>{user.coursesEnrolled || 0} enrolled</span>
        </div>
      </div>
    );
  }

  return <span className="text-white/40 text-xs">System user</span>;
}

function UserActions({ user }: { user: User }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleRoleChange = (newRole: Role) => {
    console.log(`Changing role for ${user.name} to ${newRole}`);
    // Add role change logic here
  };

  const handleSuspend = () => {
    console.log(`Suspending user: ${user.name}`);
    // Add suspend logic here
  };

  const handleActivate = () => {
    console.log(`Activating user: ${user.name}`);
    // Add activate logic here
  };

  return (
    <div className="flex items-center gap-2">
      {user.status === 'suspended' ? (
        <button
          onClick={handleActivate}
          className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-all"
          title="Activate User"
        >
          <UserCheck size={16} />
        </button>
      ) : user.status === 'active' ? (
        <button
          onClick={handleSuspend}
          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
          title="Suspend User"
        >
          <UserX size={16} />
        </button>
      ) : null}
      
      <button
        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all"
        title="View Profile"
      >
        <Eye size={16} />
      </button>
      
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
        >
          <MoreHorizontal size={16} />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 top-full mt-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg py-2 min-w-[160px] z-10">
            <button className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/10 text-sm flex items-center gap-2">
              <Edit size={14} />
              Edit Profile
            </button>
            <button className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/10 text-sm flex items-center gap-2">
              <Mail size={14} />
              Send Message
            </button>
            <div className="border-t border-white/10 my-1"></div>
            <div className="px-3 py-1">
              <p className="text-white/60 text-xs font-medium">Change Role:</p>
            </div>
            {[Role.STUDENT, Role.INSTRUCTOR, Role.ADMIN].map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                disabled={user.role === role}
                className={`
                  w-full text-left px-3 py-2 text-sm flex items-center gap-2
                  ${user.role === role 
                    ? 'text-white/40 cursor-not-allowed' 
                    : 'text-white/80 hover:bg-white/10'
                  }
                `}
              >
                <span className="text-xs">{getRoleIcon(role)}</span>
                {getRoleDisplayName(role)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
