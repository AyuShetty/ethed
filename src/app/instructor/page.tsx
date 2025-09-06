'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Plus, 
  BarChart3, 
  Settings,
  Eye,
  Star,
  Clock,
  Award
} from 'lucide-react';

export default function InstructorDashboardPage() {
  const stats = [
    {
      title: 'Total Courses',
      value: '8',
      change: '+2 this month',
      trend: 'up',
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Total Students',
      value: '342',
      change: '+28 this week',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Average Rating',
      value: '4.6',
      change: '+0.2 from last month',
      trend: 'up',
      icon: Star,
      color: 'yellow'
    },
    {
      title: 'Monthly Earnings',
      value: '$1,250',
      change: '+15% from last month',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const courses = [
    {
      id: '1',
      title: 'Introduction to Blockchain',
      students: 247,
      rating: 4.8,
      status: 'published',
      lastUpdated: '2 days ago'
    },
    {
      id: '2',
      title: 'Smart Contract Development',
      students: 95,
      rating: 4.4,
      status: 'published',
      lastUpdated: '1 week ago'
    },
    {
      id: '3',
      title: 'Advanced DeFi Protocols',
      students: 0,
      rating: 0,
      status: 'draft',
      lastUpdated: '3 days ago'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-400 bg-green-400/20';
      case 'draft':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'review':
        return 'text-blue-400 bg-blue-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Instructor Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage your courses and track your teaching performance</p>
          </div>
          <Link 
            href="/instructor/create"
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create New Course
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg border ${getColorClasses(stat.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-green-400 text-xs mt-1">{stat.change}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/instructor/create" className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 group-hover:bg-cyan-500/30 transition-colors">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Create Course</h3>
                <p className="text-gray-400 text-sm">Start building a new course</p>
              </div>
            </div>
          </Link>

          <Link href="/instructor/analytics" className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 group-hover:bg-purple-500/30 transition-colors">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">View Analytics</h3>
                <p className="text-gray-400 text-sm">Track course performance</p>
              </div>
            </div>
          </Link>

          <Link href="/instructor/settings" className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 group-hover:bg-yellow-500/30 transition-colors">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Settings</h3>
                <p className="text-gray-400 text-sm">Manage your profile</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Course Management */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-semibold">My Courses</h2>
            </div>
            <Link 
              href="/instructor/courses"
              className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
            >
              View All Courses
            </Link>
          </div>

          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{course.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students} students</span>
                        </div>
                        {course.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Updated {course.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                    <Link
                      href={`/instructor/courses/${course.id}`}
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          
          <div className="space-y-3">
            {[
              { type: 'enrollment', message: 'New student enrolled in "Introduction to Blockchain"', time: '2 hours ago' },
              { type: 'completion', message: 'Student completed "Smart Contract Development"', time: '4 hours ago' },
              { type: 'review', message: 'New 5-star review on "Introduction to Blockchain"', time: '1 day ago' },
              { type: 'milestone', message: 'Course "Smart Contract Development" reached 100 students!', time: '2 days ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                <p className="text-gray-300">{activity.message}</p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}