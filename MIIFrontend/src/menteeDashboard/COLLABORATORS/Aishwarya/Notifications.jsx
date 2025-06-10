import React, { useState, useEffect } from 'react';

const Notifications = ({ isVisible, onClose }) => {
  const [notifications, setNotifications] = useState([
    'XYZ Mentee has dropped a query today!'
  ]);

  const clearNotifications = () => setNotifications([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-container')) {
        onClose();
      }
    };
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="notification-container bg-white border border-gray-300 shadow-lg rounded-lg w-80 p-4 absolute top-12 right-0 z-50">
      <div className="text-lg font-bold text-red-700 border-b pb-2 mb-2">NOTIFICATIONS</div>
      {notifications.length > 0 ? (
        <div className="bg-gray-200 p-2 rounded-md mb-2 text-black">
          {notifications[0]}
        </div>
      ) : (
        <div className="text-gray-500 text-center">No new notifications</div>
      )}
      {notifications.length > 0 && (
        <div
          className="text-right text-sm text-black cursor-pointer hover:underline"
          onClick={clearNotifications}
        >
          clear
        </div>
      )}
    </div>
  );
};

export default Notifications;
