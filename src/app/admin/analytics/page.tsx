'use client';

import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award,
  Eye,
  Clock,
  Target
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Courses',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: BookOpen,
      color: 'green'
    },
    {
      title: 'Completions',
      value: '1,234',
      change: '+15.3%',
      trend: 'up',
      icon: Award,
      color: 'yellow'
    },
    {
      title: 'Page Views',
      value: '45.2K',
      change: '+5.7%',
      trend: 'up',
      icon: Eye,
      color: 'purple'
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-gray-400 mt-1">Platform performance and user insights</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium">Real-time Data</span>
          </div>
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
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold">User Growth</h3>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-900/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500">Chart placeholder</p>
                <p className="text-sm text-gray-600">Integration with Chart.js or similar</p>
              </div>
            </div>
          </div>

          {/* Course Performance */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold">Course Performance</h3>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-900/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500">Chart placeholder</p>
                <p className="text-sm text-gray-600">Top performing courses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {[
              { action: 'New user registration', user: 'john.doe@example.com', time: '2 minutes ago' },
              { action: 'Course completion', user: 'jane.smith@example.com', time: '5 minutes ago' },
              { action: 'New course created', user: 'instructor@ethed.com', time: '15 minutes ago' },
              { action: 'Admin login', user: 'admin@ethed.com', time: '30 minutes ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                <div>
                  <p className="text-white">{activity.action}</p>
                  <p className="text-sm text-gray-400">{activity.user}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}