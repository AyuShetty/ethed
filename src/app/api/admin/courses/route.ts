import { NextRequest, NextResponse } from 'next/server';

// Mock courses data
const mockCourses = [
  {
    id: '1',
    title: 'Introduction to Blockchain',
    instructor: 'Dr. Sarah Johnson',
    status: 'published',
    enrollments: 247,
    completions: 89,
    rating: 4.8,
    createdAt: '2024-12-01',
    lastUpdated: '2025-01-15'
  },
  {
    id: '2',
    title: 'Smart Contract Development',
    instructor: 'Prof. Michael Chen',
    status: 'published',
    enrollments: 156,
    completions: 67,
    rating: 4.6,
    createdAt: '2024-11-15',
    lastUpdated: '2025-01-10'
  },
  {
    id: '3',
    title: 'DeFi Fundamentals',
    instructor: 'Dr. Emily Davis',
    status: 'draft',
    enrollments: 0,
    completions: 0,
    rating: 0,
    createdAt: '2025-01-01',
    lastUpdated: '2025-01-20'
  }
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let filteredCourses = mockCourses;

    // Filter by status
    if (status && status !== 'all') {
      filteredCourses = filteredCourses.filter(course => course.status === status);
    }

    // Filter by search
    if (search) {
      filteredCourses = filteredCourses.filter(course => 
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        courses: paginatedCourses,
        pagination: {
          current: page,
          pages: Math.ceil(filteredCourses.length / limit),
          total: filteredCourses.length
        }
      }
    });
  } catch (error) {
    console.error('Courses API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    // Handle different course actions
    switch (action) {
      case 'updateStatus':
        return NextResponse.json({
          success: true,
          message: `Course status updated to ${data.status}`
        });
      
      case 'deleteCourse':
        return NextResponse.json({
          success: true,
          message: 'Course deleted successfully'
        });
      
      case 'approveCourse':
        return NextResponse.json({
          success: true,
          message: 'Course approved and published'
        });
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Courses API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}