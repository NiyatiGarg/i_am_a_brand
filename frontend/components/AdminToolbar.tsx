'use client';

import { useAdmin } from '@/context/AdminContext';
import { Button } from './Button';

export function AdminToolbar() {
  const { isAdmin, isEditing, setIsEditing, adminLogout, pendingChanges, setPendingChanges } = useAdmin();

  if (!isAdmin) return null;

  const handleSave = () => {
    // This will be handled by individual components
    setPendingChanges(false);
  };

  const handleDiscard = () => {
    if (confirm('Discard all unsaved changes?')) {
      setPendingChanges(false);
      window.location.reload();
    }
  };

  return (
    <div className="fixed top-0 right-0 z-50 bg-white shadow-lg rounded-bl-lg p-2 flex gap-2 items-center">
      <span className="text-xs font-semibold text-gray-600 px-2">Admin Mode</span>
      {pendingChanges && (
        <span className="text-xs text-orange-600 px-2">• Unsaved changes</span>
      )}
      {isEditing && (
        <>
          <Button
            size="sm"
            onClick={handleSave}
            className="text-xs"
            disabled={!pendingChanges}
          >
            Save
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDiscard}
            className="text-xs"
            disabled={!pendingChanges}
          >
            Discard
          </Button>
        </>
      )}
      <Button
        size="sm"
        variant="outline"
        onClick={() => setIsEditing(!isEditing)}
        className="text-xs"
      >
        {isEditing ? 'Exit Edit' : 'Edit Mode'}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={adminLogout}
        className="text-xs"
      >
        Logout
      </Button>
    </div>
  );
}

