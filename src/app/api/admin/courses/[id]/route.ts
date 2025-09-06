import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            enrollments: true,
          }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    const course = await prisma.course.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        category: body.category,
        difficulty: body.difficulty,
        published: body.published,
      },
      include: {
        creator: {
          select: {
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            enrollments: true,
          }
        }
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;

    // Delete all enrollments first
    await prisma.enrollment.deleteMany({
      where: { courseId: id }
    });

    // Then delete the course
    await prisma.course.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}