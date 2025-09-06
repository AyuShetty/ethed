import { NextRequest, NextResponse } from 'next/server';

// Mock users data
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'STUDENT',
    status: 'active',
    joinedAt: '2025-01-15',
    coursesEnrolled: 3,
    coursesCompleted: 1
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'INSTRUCTOR',
    status: 'active',
    joinedAt: '2024-12-10',
    coursesEnrolled: 0,
    coursesCompleted: 0
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@ethed.com',
    role: 'ADMIN',
    status: 'active',
    joinedAt: '2024-11-01',
    coursesEnrolled: 0,
    coursesCompleted: 0
  }
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const role = searchParams.get('role');
    const search = searchParams.get('search');

    let filteredUsers = mockUsers;

    // Filter by role
    if (role && role !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    // Filter by search
    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        users: paginatedUsers,
        pagination: {
          current: page,
          pages: Math.ceil(filteredUsers.length / limit),
          total: filteredUsers.length
        }
      }
    });
  } catch (error) {
    console.error('Users API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    // Handle different user actions
    switch (action) {
      case 'updateRole':
        // Update user role
        return NextResponse.json({
          success: true,
          message: `User role updated to ${data.role}`
        });
      
      case 'updateStatus':
        // Update user status
        return NextResponse.json({
          success: true,
          message: `User status updated to ${data.status}`
        });
      
      case 'deleteUser':
        // Delete user
        return NextResponse.json({
          success: true,
          message: 'User deleted successfully'
        });
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Users API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}