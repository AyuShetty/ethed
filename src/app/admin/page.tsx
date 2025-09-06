'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Role } from '@/types/roles';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin dashboard
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN]}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="animate-spin w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full"></div>
      </div>
    </ProtectedRoute>
  );
}
