import { useState, useEffect } from 'react';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission === 'granted') {
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BLGrBkZY7kPKbVNYBWrYE9EDYnB_BHe_FewXyABzJQrHPIRzYPCpkHxfp8kz-YZ3jbQI_HvwHuA0dpNtP4dMxCk'
        });
        setSubscription(sub);
        return sub;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  return {
    permission,
    subscription,
    requestPermission
  };
};