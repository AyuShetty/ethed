import { NextResponse } from 'next/server';

// Mock instructor dashboard data
const instructorData = {
  stats: {
    totalCourses: 8,
    totalStudents: 342,
    avgRating: 4.6,
    monthlyEarnings: 1250
  },
  courses: [
    {
      id: '1',
      title: 'Introduction to Blockchain',
      students: 247,
      completion: 89,
      rating: 4.8,
      status: 'published'
    },
    {
      id: '2',
      title: 'Smart Contract Development',
      students: 95,
      completion: 67,
      rating: 4.4,
      status: 'published'
    }
  ],
  recentActivity: [
    { type: 'enrollment', course: 'Introduction to Blockchain', student: 'John Doe', timestamp: new Date() },
    { type: 'completion', course: 'Smart Contract Development', student: 'Jane Smith', timestamp: new Date() }
  ]
};

export async function GET() {
  try {
    // In a real app, you would:
    // 1. Verify instructor authentication
    // 2. Query actual database for instructor-specific data
    
    return NextResponse.json({
      success: true,
      data: instructorData,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Instructor dashboard API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch instructor data' },
      { status: 500 }
    );
  }
}