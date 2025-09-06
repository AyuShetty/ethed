# 🎨 Frontend Design Specification - Exact Page Contents

## 🏠 **Home Page** (`/src/app/page.tsx`)

### **Visual Layout & Components:**
```
┌─ Hero Section ─────────────────────────────────────────┐
│  - Large gradient background with animated diamonds     │
│  - "Learn Blockchain Development" main heading         │
│  - Subtitle text about mastering Web3                  │
│  - Two CTA buttons: "Start Learning" + "Explore Courses"│
│  - Animated Web3 background with floating elements     │
└────────────────────────────────────────────────────────┘

┌─ Featured Courses Grid ────────────────────────────────┐
│  - "Featured Courses" heading                          │
│  - 3x2 grid of course cards                           │
│  - Each card shows:                                   │
│    * Course thumbnail image                           │
│    * Course title                                     │
│    * Short description                                │
│    * Difficulty badge (Beginner/Intermediate/Advanced)│
│    * Price (Free or $XX)                             │
│    * Glass-morphism styling                           │
└────────────────────────────────────────────────────────┘

┌─ Platform Stats Section ───────────────────────────────┐
│  - Three stat cards in a row:                         │
│    * Total Courses (with number)                      │
│    * Active Students (with number)                    │
│    * Completion Rate (with percentage)                │
│  - Each stat has an icon and glass styling            │
└────────────────────────────────────────────────────────┘
```

### **Current Dummy Data Used:**
```javascript
// Featured courses array (6 courses)
const featuredCourses = [
  "Ethereum Fundamentals", "Smart Contract Development", 
  "DeFi Protocol Design", "NFT Marketplace", 
  "Web3 Security & Auditing", "Advanced Solidity"
]

// Platform stats
{ totalCourses: 50, activeStudents: 1200, completionRate: 87 }
```

---

## 📚 **Courses Page** (`/src/app/courses/page.tsx`)

### **Visual Layout & Components:**
```
┌─ Header & Search ──────────────────────────────────────┐
│  - "Discover Courses" main heading                     │
│  - Search bar (full width)                            │
│  - Filter buttons row:                                │
│    * Category dropdown (All, DeFi, NFTs, etc.)       │
│    * Difficulty dropdown (All, Beginner, etc.)       │
│    * Price filter (All, Free, Paid)                  │
└────────────────────────────────────────────────────────┘

┌─ Courses Grid ─────────────────────────────────────────┐
│  - Responsive grid layout (3-4 columns on desktop)    │
│  - Course cards with hover animations                 │
│  - Each card contains:                                │
│    * Course thumbnail (placeholder images)            │
│    * Course title                                     │
│    * Description (truncated)                          │
│    * Instructor name                                  │
│    * Duration estimate                                │
│    * Difficulty badge                                 │
│    * Price tag                                        │
│    * "View Course" button                             │
│    * Glass-morphism card styling                      │
└────────────────────────────────────────────────────────┘
```

### **Current Dummy Data Used:**
```javascript
// Sample courses array (12 courses)
const sampleCourses = [
  {
    title: "Ethereum Fundamentals",
    description: "Learn the basics of Ethereum blockchain",
    instructor: "Alice Johnson",
    duration: "6 weeks",
    difficulty: "Beginner",
    price: "Free",
    image: "/images/courses/eth-fundamentals.jpg"
  },
  // ... 11 more similar courses
]
```

---

## 📖 **Individual Course Page** (`/src/app/courses/[id]/page.tsx`)

### **Visual Layout & Components:**
```
┌─ Course Header ────────────────────────────────────────┐
│  - Breadcrumb navigation (Home > Courses > Course Name)│
│  - Course title (large heading)                       │
│  - Course description (detailed)                      │
│  - Instructor info with avatar                        │
│  - Course stats: Duration, Difficulty, Students       │
│  - Price and "Enroll Now" button                      │
│  - Course thumbnail/hero image                        │
└────────────────────────────────────────────────────────┘

┌─ Course Content Tabs ──────────────────────────────────┐
│  - Tab navigation: "Overview", "Curriculum", "Reviews" │
│                                                        │
│  Overview Tab:                                         │
│  - "What you'll learn" bullet points                  │
│  - Prerequisites                                       │
│  - Course requirements                                 │
│                                                        │
│  Curriculum Tab:                                       │
│  - Expandable modules/sections                        │
│  - Lessons list with play icons                       │
│  - Lesson duration for each                           │
│  - Progress indicators (if enrolled)                   │
│                                                        │
│  Reviews Tab:                                          │
│  - Star ratings                                       │
│  - Student reviews and comments                       │
│  - Review submission form (if enrolled)                │
└────────────────────────────────────────────────────────┘

┌─ Enrollment Progress (if enrolled) ────────────────────┐
│  - Progress bar showing completion percentage          │
│  - "Continue Learning" button                         │
│  - Last accessed lesson info                          │
└────────────────────────────────────────────────────────┘
```

### **Current Dummy Data Used:**
```javascript
const sampleCourse = {
  title: "DeFi Protocol Design",
  description: "Master decentralized finance protocols...",
  instructor: { name: "Dr. Sarah Chen", avatar: "/images/instructors/alice.jpg" },
  duration: "8 weeks",
  difficulty: "Advanced",
  price: 299,
  studentsEnrolled: 1247,
  modules: [
    {
      title: "Introduction to DeFi",
      lessons: [
        { title: "What is DeFi?", duration: "15 min" },
        { title: "DeFi vs Traditional Finance", duration: "20 min" }
      ]
    }
  ]
}
```

---

## 🎓 **Learning Page** (`/src/app/learn/[courseId]/[lessonId]/page.tsx`)

### **Visual Layout & Components:**
```
┌─ Learning Interface ───────────────────────────────────┐
│  ┌─ Sidebar (Course Navigation) ─┐ ┌─ Main Content ─┐ │
│  │  - Course title              │ │  - Video player │ │
│  │  - Progress indicator        │ │  - Lesson title │ │
│  │  - Module/lesson tree        │ │  - Lesson text  │ │
│  │  - Checkmarks for completed  │ │  - Code examples│ │
│  │  - Current lesson highlighted│ │  - Exercises    │ │
│  └──────────────────────────────┘ │  - Resources    │ │
│                                   └─────────────────┘ │
└────────────────────────────────────────────────────────┘

┌─ Lesson Controls ──────────────────────────────────────┐
│  - Previous lesson button (left)                      │
│  - Progress bar for current lesson                    │
│  - Next lesson button (right)                         │
│  - "Mark as Complete" button                          │
│  - Notes section (collapsible)                        │
└────────────────────────────────────────────────────────┘
```

### **Current Dummy Data Used:**
```javascript
const sampleLesson = {
  title: "Understanding Smart Contracts",
  content: "Smart contracts are self-executing contracts...",
  videoUrl: "/videos/lesson-1.mp4",
  duration: "25 minutes",
  module: "Introduction to Ethereum",
  course: "Ethereum Fundamentals"
}
```

---

## 👤 **Profile Page** (`/src/app/profile/page.tsx`)

### **Visual Layout & Components:**
```
┌─ Profile Header ───────────────────────────────────────┐
│  - User avatar (large, circular)                      │
│  - User name and email                                │
│  - Join date                                          │
│  - Edit profile button                                │
│  - Profile stats: Courses completed, Hours learned    │
└────────────────────────────────────────────────────────┘

┌─ Dashboard Tabs ───────────────────────────────────────┐
│  - Tab navigation: "Overview", "Courses", "Certificates"│
│                                                        │
│  Overview Tab:                                         │
│  - Learning streak counter                            │
│  - Recent activity feed                               │
│  - Achievement badges                                 │
│  - Progress summary cards                             │
│                                                        │
│  Courses Tab:                                         │
│  - Grid of enrolled courses                           │
│  - Progress bars for each course                      │
│  - "Continue" buttons                                 │
│  - Filter: All, In Progress, Completed               │
│                                                        │
│  Certificates Tab:                                    │
│  - Grid of earned certificates                        │
│  - NFT certificate cards                              │
│  - Download/share buttons                             │
└────────────────────────────────────────────────────────┘
```

### **Current Dummy Data Used:**
```javascript
const profileData = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/images/placeholder-user.jpg",
    joinDate: "2024-01-15"
  },
  stats: {
    coursesCompleted: 3,
    coursesInProgress: 2,
    totalHours: 47,
    currentStreak: 7
  }
}
```

---

## 🏆 **Progress Page** (`/src/app/progress/page.tsx`)

### **Visual Layout & Components:**
```
┌─ Progress Overview ────────────────────────────────────┐
│  - Overall completion percentage (large circular chart)│
│  - Learning streak counter with fire icon             │
│  - Total time studied this week                       │
│  - Courses completed this month                       │
└────────────────────────────────────────────────────────┘

┌─ Progress Charts ──────────────────────────────────────┐
│  - Weekly activity chart (bar chart)                  │
│  - Course completion timeline                         │
│  - Skills progress radar chart                        │
│  - Daily study time line graph                        │
└────────────────────────────────────────────────────────┘

┌─ Achievements Section ─────────────────────────────────┐
│  - Achievement badges grid                            │
│  - Recent achievements with timestamps                │
│  - Progress towards next achievements                  │
│  - Leaderboard position (optional)                    │
└────────────────────────────────────────────────────────┘
```

---

## 🎖️ **Rewards Page** (`/src/app/rewards/page.tsx`)

### **Visual Layout & Components:**
```
┌─ NFT Certificates Gallery ────────────────────────────┐
│  - Grid of NFT certificate cards                      │
│  - Each card shows:                                   │
│    * Certificate artwork                              │
│    * Course name                                      │
│    * Completion date                                  │
│    * Blockchain verification badge                    │
│    * Download/share options                           │
└────────────────────────────────────────────────────────┘

┌─ Badges & Achievements ────────────────────────────────┐
│  - Achievement badges with icons                      │
│  - Progress bars for partial achievements             │
│  - Badge categories: Learning, Community, Special     │
│  - Rarity indicators (Common, Rare, Epic)            │
└────────────────────────────────────────────────────────┘

┌─ Reward History ───────────────────────────────────────┐
│  - Timeline of earned rewards                         │
│  - Point values and dates                             │
│  - Upcoming rewards preview                           │
└────────────────────────────────────────────────────────┘
```

---

## 👥 **Community Page** (`/src/app/community/page.tsx`)

### **Visual Layout & Components:**
```
┌─ Community Stats ──────────────────────────────────────┐
│  - Total community members                            │
│  - Online users counter                               │
│  - Recent discussions count                           │
│  - Top contributors this week                         │
└────────────────────────────────────────────────────────┘

┌─ User Directory ───────────────────────────────────────┐
│  - Grid of user profile cards                         │
│  - Each card shows:                                   │
│    * User avatar and name                             │
│    * Courses completed count                          │
│    * Join date                                        │
│    * Online status indicator                          │
│    * "View Profile" button                            │
│  - Search and filter options                          │
└────────────────────────────────────────────────────────┘

┌─ Discussion Forums ────────────────────────────────────┐
│  - Forum categories (General, Course Help, Projects)  │
│  - Recent discussion threads                          │
│  - Each thread shows:                                 │
│    * Thread title and author                          │
│    * Reply count and last activity                    │
│    * Tags/categories                                  │
│    * Vote/like counters                               │
└────────────────────────────────────────────────────────┘
```

### **Current Dummy Data Used:**
```javascript
const communityUsers = [
  {
    name: "Alice Johnson",
    avatar: "/images/users/alice.jpg",
    coursesCompleted: 5,
    joinDate: "2024-02-10",
    isOnline: true
  },
  // ... more users
]

const discussionThreads = [
  {
    title: "Smart Contract Best Practices",
    author: "Bob Wilson",
    replies: 23,
    lastActivity: "2 hours ago",
    tags: ["solidity", "best-practices"]
  }
  // ... more threads
]
```

---

## ℹ️ **About Page** (`/src/app/about/page.tsx`)

### **Visual Layout & Components:**
```
┌─ Hero Section ─────────────────────────────────────────┐
│  - Platform mission statement                         │
│  - Vision and values                                  │
│  - Company background                                 │
└────────────────────────────────────────────────────────┘

┌─ Team Section ─────────────────────────────────────────┐
│  - "Meet the Team" heading                            │
│  - Grid of team member cards                          │
│  - Each card shows:                                   │
│    * Professional headshot                            │
│    * Name and role                                    │
│    * Bio/description                                  │
│    * Social media links                               │
│    * Expertise tags                                   │
└────────────────────────────────────────────────────────┘

┌─ Company Stats ────────────────────────────────────────┐
│  - Years of experience                                │
│  - Courses created                                    │
│  - Students graduated                                 │
│  - Partner companies                                  │
└────────────────────────────────────────────────────────┘
```

### **Current Dummy Data Used:**
```javascript
const teamMembers = [
  {
    name: "Sarah Wilson",
    role: "Co-founder & CEO",
    bio: "Former blockchain engineer at Ethereum Foundation...",
    image: "/images/team/sarah.jpg",
    linkedin: "https://linkedin.com/in/sarah-wilson",
    expertise: ["Blockchain", "Product Strategy"]
  },
  // ... more team members
]
```

---

## 🎨 **Course Creator Page** (`/src/app/creator/page.tsx`)

### **Visual Layout & Components:**
```
┌─ Creator Dashboard Header ─────────────────────────────┐
│  - "Course Creator" main heading                      │
│  - "Create New Course" button (prominent)             │
│  - Quick stats: Published courses, Students, Revenue  │
└────────────────────────────────────────────────────────┘

┌─ Course Creation Form (Modal/Sidebar) ─────────────────┐
│  - Course basic info:                                 │
│    * Title input                                      │
│    * Description textarea                             │
│    * Category dropdown                                │
│    * Difficulty selector                              │
│    * Price input                                      │
│    * Thumbnail upload                                 │
│                                                        │
│  - Course modules section:                            │
│    * Add module button                                │
│    * Module title inputs                              │
│    * Drag-to-reorder functionality                    │
│                                                        │
│  - Lessons within modules:                            │
│    * Lesson title inputs                              │
│    * Content editor (rich text)                       │
│    * Video upload option                              │
│    * Duration input                                   │
└────────────────────────────────────────────────────────┘

┌─ My Courses Grid ──────────────────────────────────────┐
│  - Grid of created courses                            │
│  - Each course card shows:                            │
│    * Course thumbnail                                 │
│    * Title and description                            │
│    * Published status badge                           │
│    * Student enrollment count                         │
│    * Edit/Delete buttons                              │
│    * Preview button                                   │
└────────────────────────────────────────────────────────┘
```

### **Current Dummy Data Used:**
```javascript
const initialCourses = [
  {
    title: "Advanced Solidity Programming",
    description: "Deep dive into Solidity development",
    published: true,
    studentsEnrolled: 156,
    modules: [
      {
        title: "Introduction",
        lessons: [
          { title: "Course Overview", content: "Welcome to the course..." }
        ]
      }
    ]
  }
]
```

---

## 🎯 **Design System Elements**

### **Glass-morphism Components:**
- `GlassButton` - Translucent buttons with blur effect
- `GlassCard` - Container cards with backdrop blur
- `GlassInput` - Form inputs with glass styling
- `GlassModal` - Modal dialogs with glass background

### **Color Scheme:**
- Primary: Blue gradients (#3B82F6 to #1D4ED8)
- Secondary: Purple accents (#8B5CF6)
- Glass effects: `bg-white/10` with `backdrop-blur-md`
- Text: White on dark backgrounds, dark on light

### **Animations:**
- Hover scale effects (`hover:scale-105`)
- Smooth transitions (`transition-all duration-300`)
- Animated diamond decorations
- Floating Web3 background elements

---

## 📱 **Responsive Design Notes:**

- **Mobile:** Single column layout, collapsible sidebars
- **Tablet:** 2-column grids, adjusted spacing
- **Desktop:** 3-4 column grids, full sidebar navigation
- **All breakpoints:** Maintain glass-morphism effects

This specification ensures your teammate can build the backend while preserving your exact visual design! 🎨
