import { NextRequest, NextResponse } from 'next/server';

// Mock instructor courses data
const instructorCourses = [
  {
    id: '1',
    title: 'Introduction to Blockchain',
    description: 'A comprehensive introduction to blockchain technology',
    status: 'published',
    students: 247,
    lessons: 12,
    duration: '8 hours',
    createdAt: '2024-12-01',
    lastUpdated: '2025-01-15'
  },
  {
    id: '2',
    title: 'Smart Contract Development',
    description: 'Learn to build and deploy smart contracts',
    status: 'published',
    students: 95,
    lessons: 16,
    duration: '12 hours',
    createdAt: '2024-11-15',
    lastUpdated: '2025-01-10'
  },
  {
    id: '3',
    title: 'Advanced DeFi Protocols',
    description: 'Deep dive into decentralized finance protocols',
    status: 'draft',
    students: 0,
    lessons: 8,
    duration: '6 hours',
    createdAt: '2025-01-01',
    lastUpdated: '2025-01-20'
  }
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    
    let courses = instructorCourses;
    
    // Filter by status if provided
    if (status && status !== 'all') {
      courses = courses.filter(course => course.status === status);
    }
    
    return NextResponse.json({
      success: true,
      data: { courses },
      total: courses.length
    });
  } catch (error) {
    console.error('Instructor courses API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, duration } = body;
    
    // In a real app, you would save to database
    const newCourse = {
      id: (instructorCourses.length + 1).toString(),
      title,
      description,
      status: 'draft',
      students: 0,
      lessons: 0,
      duration,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      data: { course: newCourse },
      message: 'Course created successfully'
    });
  } catch (error) {
    console.error('Course creation API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    );
  }
}