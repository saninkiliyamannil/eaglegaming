import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';

const NotificationButton: React.FC = () => {
  const { permission, requestPermission } = useNotifications();

  const handleClick = async () => {
    await requestPermission();
  };

  if (!('Notification' in window)) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors duration-300 ${
        permission === 'granted'
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-gray-700 hover:bg-gray-600'
      }`}
      aria-label="Enable notifications"
      title={
        permission === 'granted'
          ? 'Notifications enabled'
          : 'Enable notifications'
      }
    >
      <Bell className="h-5 w-5" />
    </button>
  );
};

export default NotificationButton;