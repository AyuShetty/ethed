import { NextResponse } from 'next/server';

// Mock dashboard data
const dashboardData = {
  stats: {
    totalUsers: 2847,
    totalCourses: 156,
    activeLearners: 1923,
    completions: 1234
  },
  recentActivity: [
    { type: 'user_registration', user: 'john.doe@example.com', timestamp: new Date() },
    { type: 'course_completion', user: 'jane.smith@example.com', course: 'Blockchain Basics', timestamp: new Date() },
    { type: 'course_creation', instructor: 'instructor@ethed.com', course: 'Advanced DeFi', timestamp: new Date() }
  ],
  pendingApprovals: [
    { type: 'course', title: 'Smart Contract Security', instructor: 'security@ethed.com', status: 'pending' },
    { type: 'instructor', name: 'Dr. Alex Thompson', email: 'alex@university.edu', status: 'pending' }
  ]
};

export async function GET() {
  try {
    // In a real app, you would:
    // 1. Verify admin authentication
    // 2. Query actual database for dashboard data
    
    return NextResponse.json({
      success: true,
      data: dashboardData,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}