'use client';

import React from 'react';
import { useRole } from '@/hooks/useRole';
import { Role, getRoleDisplayName, getRoleIcon } from '@/types/roles';

export function DemoRoleSwitcher() {
  const { userRole, setUserRole } = useRole();

  const handleRoleChange = (newRole: Role) => {
    setUserRole(newRole);
    // Force page reload to apply middleware changes
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-4">
        <p className="text-white text-sm font-medium mb-3">Demo Mode - Switch Role:</p>
        <div className="flex flex-col gap-2">
          {[Role.STUDENT, Role.INSTRUCTOR, Role.ADMIN].map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              disabled={userRole === role}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${userRole === role 
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50 cursor-not-allowed' 
                  : 'bg-white/10 text-white/80 border border-white/20 hover:bg-white/20'
                }
              `}
            >
              <span className="text-base">{getRoleIcon(role)}</span>
              {getRoleDisplayName(role)}
              {userRole === role && <span className="text-xs">(Current)</span>}
            </button>
          ))}
        </div>
        
        {userRole && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-white/60 text-xs">
              Current: <span className="text-white font-medium">{getRoleDisplayName(userRole)}</span>
            </p>
            <p className="text-white/40 text-xs mt-1">
              Navigate to test role-based features
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
