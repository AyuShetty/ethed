'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AdminLayout } from '@/layouts/AdminLayout';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Eye, 
  Check, 
  X, 
  MoreHorizontal,
  Clock,
  Users,
  DollarSign,
  Star,
  Calendar
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: {
    name: string;
    email: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'draft';
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  enrollments: number;
  rating: number;
  createdAt: string;
  thumbnail: string;
}

export default function AdminCoursesPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AdminLayout 
      title="Course Management" 
      subtitle="Review, approve, and manage all platform courses"
    >
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={16} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400/50"
          />
        </div>
        
        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`
                px-4 py-3 rounded-lg font-medium text-sm transition-all
                ${filter === status 
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50' 
                  : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
                }
              `}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <CourseStats />

      {/* Course Table */}
      <CourseTable filter={filter} searchTerm={searchTerm} />
    </AdminLayout>
  );
}

function CourseStats() {
  const stats = [
    {
      title: 'Total Courses',
      value: '89',
      change: '+5 this week',
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Pending Review',
      value: '3',
      change: '2 new today',
      icon: Clock,
      color: 'orange'
    },
    {
      title: 'Active Students',
      value: '1,234',
      change: '+89 this week',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Revenue',
      value: '$45,230',
      change: '+12% this month',
      icon: DollarSign,
      color: 'purple'
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

function CourseTable({ filter, searchTerm }: { filter: string; searchTerm: string }) {
  // Mock data - in real app, this would come from API
  const courses: Course[] = [
    {
      id: '1',
      title: 'Advanced Smart Contract Development',
      instructor: { name: 'John Doe', email: 'john@example.com' },
      status: 'pending',
      category: 'Development',
      difficulty: 'Advanced',
      price: 299,
      enrollments: 0,
      rating: 0,
      createdAt: '2025-09-06',
      thumbnail: '/images/courses/smart-contracts.jpg'
    },
    {
      id: '2',
      title: 'DeFi Protocol Design',
      instructor: { name: 'Sarah Wilson', email: 'sarah@example.com' },
      status: 'approved',
      category: 'DeFi',
      difficulty: 'Intermediate',
      price: 199,
      enrollments: 156,
      rating: 4.8,
      createdAt: '2025-09-01',
      thumbnail: '/images/courses/defi-protocol.jpg'
    },
    {
      id: '3',
      title: 'NFT Marketplace Development',
      instructor: { name: 'Mike Chen', email: 'mike@example.com' },
      status: 'approved',
      category: 'NFTs',
      difficulty: 'Intermediate',
      price: 249,
      enrollments: 89,
      rating: 4.6,
      createdAt: '2025-08-28',
      thumbnail: '/images/courses/nft-marketplace.jpg'
    },
    {
      id: '4',
      title: 'Blockchain Security Fundamentals',
      instructor: { name: 'Alex Johnson', email: 'alex@example.com' },
      status: 'pending',
      category: 'Security',
      difficulty: 'Beginner',
      price: 149,
      enrollments: 0,
      rating: 0,
      createdAt: '2025-09-05',
      thumbnail: '/images/courses/security.jpg'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesFilter = filter === 'all' || course.status === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase());
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
              <th className="text-left p-4 text-white/80 font-medium">Course</th>
              <th className="text-left p-4 text-white/80 font-medium">Instructor</th>
              <th className="text-left p-4 text-white/80 font-medium">Status</th>
              <th className="text-left p-4 text-white/80 font-medium">Category</th>
              <th className="text-left p-4 text-white/80 font-medium">Price</th>
              <th className="text-left p-4 text-white/80 font-medium">Students</th>
              <th className="text-left p-4 text-white/80 font-medium">Rating</th>
              <th className="text-left p-4 text-white/80 font-medium">Created</th>
              <th className="text-left p-4 text-white/80 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={course.thumbnail} 
                      alt={course.title}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.jpg';
                      }}
                    />
                    <div>
                      <h4 className="text-white font-medium text-sm">{course.title}</h4>
                      <p className="text-white/60 text-xs">{course.difficulty}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-white text-sm">{course.instructor.name}</p>
                    <p className="text-white/60 text-xs">{course.instructor.email}</p>
                  </div>
                </td>
                <td className="p-4">
                  <StatusBadge status={course.status} />
                </td>
                <td className="p-4">
                  <span className="text-white/80 text-sm">{course.category}</span>
                </td>
                <td className="p-4">
                  <span className="text-white font-medium">${course.price}</span>
                </td>
                <td className="p-4">
                  <span className="text-white/80">{course.enrollments}</span>
                </td>
                <td className="p-4">
                  {course.rating > 0 ? (
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-white/80 text-sm">{course.rating}</span>
                    </div>
                  ) : (
                    <span className="text-white/40 text-sm">No ratings</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-white/60 text-sm">
                    <Calendar size={14} />
                    {new Date(course.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-4">
                  <CourseActions course={course} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto mb-4 text-white/40" size={48} />
          <p className="text-white/60">No courses found matching your criteria.</p>
        </div>
      )}
    </motion.div>
  );
}

function StatusBadge({ status }: { status: Course['status'] }) {
  const statusConfig = {
    pending: { color: 'orange', label: 'Pending Review' },
    approved: { color: 'green', label: 'Approved' },
    rejected: { color: 'red', label: 'Rejected' },
    draft: { color: 'gray', label: 'Draft' }
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

function CourseActions({ course }: { course: Course }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleApprove = () => {
    console.log('Approving course:', course.id);
    // Add approval logic here
  };

  const handleReject = () => {
    console.log('Rejecting course:', course.id);
    // Add rejection logic here
  };

  const handleView = () => {
    console.log('Viewing course:', course.id);
    // Navigate to course details
  };

  return (
    <div className="flex items-center gap-2">
      {course.status === 'pending' && (
        <>
          <button
            onClick={handleApprove}
            className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-all"
            title="Approve Course"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleReject}
            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
            title="Reject Course"
          >
            <X size={16} />
          </button>
        </>
      )}
      
      <button
        onClick={handleView}
        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all"
        title="View Course"
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
          <div className="absolute right-0 top-full mt-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg py-2 min-w-[120px] z-10">
            <button className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/10 text-sm">
              Edit Details
            </button>
            <button className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/10 text-sm">
              View Analytics
            </button>
            <button className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/20 text-sm">
              Delete Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
