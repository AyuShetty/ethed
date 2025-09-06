# Backend Integration Guide for EthEd Platform

## 📋 Current Frontend Pages & Data Requirements

### 🏠 **Home Page** (`/src/app/page.tsx`)
**What it displays:**
- Featured courses grid
- Platform stats (total courses, students, completion rate)
- Hero section with CTA buttons

**Data needed from backend:**
```typescript
// Featured courses
GET /api/courses?featured=true&limit=6
Response: Course[]

// Platform statistics  
GET /api/stats/platform
Response: {
  totalCourses: number;
  totalStudents: number;
  completionRate: number;
}
```

### 📚 **Courses Page** (`/src/app/courses/page.tsx`)
**What it displays:**
- Course grid with filters (category, difficulty, price)
- Search functionality
- Course cards showing title, description, price, difficulty

**Data needed from backend:**
```typescript
// All courses with filtering
GET /api/courses?category=${category}&difficulty=${difficulty}&search=${query}
Response: Course[]

// Categories for filter dropdown
GET /api/courses/categories
Response: string[]
```

### 📖 **Individual Course Page** (`/src/app/courses/[id]/page.tsx`)
**What it displays:**
- Course details (title, description, price, difficulty, category)
- Course modules/lessons list
- Instructor information
- Enrollment button
- Course progress (if enrolled)

**Data needed from backend:**
```typescript
// Course details with modules
GET /api/courses/[id]
Response: {
  id: string;
  title: string;
  description: string;
  price: number;
  difficulty: string;
  category: string;
  published: boolean;
  createdAt: Date;
  creator: {
    name: string;
    email: string;
  };
  modules: Module[];
  enrollments: Enrollment[];
  _count: {
    enrollments: number;
  };
}

// Enrollment status for current user
GET /api/courses/[id]/enrollment
Response: {
  enrolled: boolean;
  progress?: number;
  enrollment?: Enrollment;
}

// Enroll in course
POST /api/courses/[id]/enroll
Response: { success: boolean; enrollment: Enrollment; }
```

### 🎓 **Learning Page** (`/src/app/learn/[courseId]/[lessonId]/page.tsx`)
**What it displays:**
- Lesson content
- Navigation between lessons
- Progress tracking
- Next/Previous buttons

**Data needed from backend:**
```typescript
// Lesson content
GET /api/courses/[courseId]/lessons/[lessonId]
Response: {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  duration?: number;
  order: number;
  moduleId: string;
  module: {
    title: string;
    course: {
      title: string;
    };
  };
}

// Update lesson progress
POST /api/courses/[courseId]/lessons/[lessonId]/progress
Body: { completed: boolean; }
Response: { success: boolean; }
```

### 👤 **Profile Page** (`/src/app/profile/page.tsx`)
**What it displays:**
- User information
- Enrolled courses
- Course progress
- Certificates earned

**Data needed from backend:**
```typescript
// User profile data
GET /api/user/profile
Response: {
  user: {
    name: string;
    email: string;
    image?: string;
    createdAt: Date;
  };
  enrolledCourses: Array<{
    course: Course;
    progress: number;
    enrolledAt: Date;
    completedAt?: Date;
  }>;
  certificates: Certificate[];
}

// Update profile
PUT /api/user/profile
Body: { name?: string; email?: string; }
Response: { success: boolean; user: User; }
```

### 🏆 **Progress Page** (`/src/app/progress/page.tsx`)
**What it displays:**
- Course progress overview
- Learning streaks
- Achievements
- Time spent learning

**Data needed from backend:**
```typescript
// Progress analytics
GET /api/user/progress
Response: {
  overallProgress: number;
  coursesInProgress: number;
  coursesCompleted: number;
  totalTimeSpent: number;
  currentStreak: number;
  achievements: Achievement[];
  weeklyProgress: Array<{
    date: string;
    hours: number;
  }>;
}
```

### 🎖️ **Rewards Page** (`/src/app/rewards/page.tsx`)
**What it displays:**
- NFT certificates
- Badges/achievements
- Reward history

**Data needed from backend:**
```typescript
// User rewards
GET /api/user/rewards
Response: {
  certificates: Array<{
    id: string;
    courseTitle: string;
    earnedAt: Date;
    nftTokenId?: string;
    imageUrl: string;
  }>;
  badges: Array<{
    id: string;
    name: string;
    description: string;
    earnedAt: Date;
    imageUrl: string;
  }>;
}
```

### 👥 **Community Page** (`/src/app/community/page.tsx`)
**What it displays:**
- User directory
- Discussion forums
- Community stats

**Data needed from backend:**
```typescript
// Community users
GET /api/community/users
Response: Array<{
  id: string;
  name: string;
  image?: string;
  coursesCompleted: number;
  joinedAt: Date;
}>;

// Forum discussions
GET /api/community/discussions
Response: Array<{
  id: string;
  title: string;
  author: User;
  createdAt: Date;
  repliesCount: number;
  lastReply?: Date;
}>;
```

### ℹ️ **About Page** (`/src/app/about/page.tsx`)
**What it displays:**
- Platform information
- Team members
- Mission/vision

**Data needed from backend:**
```typescript
// Team members (if dynamic)
GET /api/about/team
Response: Array<{
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}>;
```

### 🎨 **Course Creator Page** (`/src/app/creator/page.tsx`)
**What it displays:**
- Course creation form
- Module/lesson management
- Course preview

**Data needed from backend:**
```typescript
// Create new course
POST /api/courses
Body: {
  title: string;
  description: string;
  price: number;
  category: string;
  difficulty: string;
}
Response: { success: boolean; course: Course; }

// Add module to course
POST /api/courses/[id]/modules
Body: {
  title: string;
  description: string;
  order: number;
}
Response: { success: boolean; module: Module; }

// Add lesson to module
POST /api/courses/[courseId]/modules/[moduleId]/lessons
Body: {
  title: string;
  content: string;
  videoUrl?: string;
  duration?: number;
  order: number;
}
Response: { success: boolean; lesson: Lesson; }
```

## 🗄️ **Current Database Schema**

```prisma
model User {
  id            String       @id @default(cuid())
  name          String?
  email         String       @unique
  emailVerified DateTime?
  image         String?
  password      String?
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  accounts      Account[]
  sessions      Session[]
  courses       Course[]
  enrollments   Enrollment[]
}

model Course {
  id          String       @id @default(cuid())
  title       String
  description String
  price       Float
  category    String
  difficulty  String
  published   Boolean      @default(false)
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  creatorId   String
  creator     User         @relation(fields: [creatorId], references: [id])
  enrollments Enrollment[]
}

model Enrollment {
  id          String    @id @default(cuid())
  userId      String
  courseId    String
  progress    Float     @default(0)
  enrolledAt  DateTime  @default(now())
  completedAt DateTime?
  user        User      @relation(fields: [userId], references: [id])
  course      Course    @relation(fields: [courseId], references: [id])

  @@unique([userId, courseId])
}
```

## 🔧 **Authentication Setup**

**Current NextAuth configuration:**
- Simple email/password authentication
- No role-based access control
- Session-based authentication
- User data stored in JWT tokens

**Auth endpoints needed:**
```typescript
// Sign up
POST /api/auth/signup
Body: { email: string; password: string; name?: string; }

// Sign in (handled by NextAuth)
POST /api/auth/signin

// Get session (handled by NextAuth)
GET /api/auth/session
```

## 📱 **Frontend Component Structure**

**Reusable components your backend can use:**
- `GlassButton` - Glassmorphism styled buttons
- `GlassCard` - Card containers with glass effect
- `GlassInput` - Form inputs with glass styling
- `CourseCard` - Displays course information
- `UserCard` - Displays user profile info

## 🎯 **Key Points for Backend Developer**

1. **API Response Format:** Frontend expects JSON responses with consistent structure
2. **Error Handling:** Return appropriate HTTP status codes and error messages
3. **Authentication:** Use NextAuth session for protected routes
4. **Pagination:** Consider adding pagination for courses and discussions
5. **File Uploads:** Course thumbnails, user avatars, lesson videos
6. **Search:** Implement full-text search for courses
7. **Real-time:** Consider WebSocket for community features

## 🚀 **Suggested API Priority Order**

1. **User Management** - Profile, authentication
2. **Course CRUD** - Create, read, update courses
3. **Enrollment System** - Join courses, track progress  
4. **Learning System** - Lessons, progress tracking
5. **Community Features** - User directory, discussions
6. **Advanced Features** - Certificates, achievements, analytics

This should give your backend teammate a complete picture of what the frontend needs! 🎯
