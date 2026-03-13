import { Bell } from '../../icons';

export default function NotificationsBell() {
  // TODO: Replace with real unread notifications count
  const unreadNotifications = 3;

  return (
    <button
      className="relative p-2 rounded-lg border border-transparent cursor-pointer transition
        hover:text-orange-600 hover:bg-red-50 hover:border-red-100 focus:text-orange-600 focus:bg-red-50 focus:border-red-100"
      aria-label={`${unreadNotifications} notifications non lues`}>
      {unreadNotifications > 0 && (
        <span className="absolute bg-red-500 rounded-full w-2 h-2 top-1 right-1 text-orange-600" aria-hidden="true"></span>
      )}
      <Bell aria-hidden="true" />
    </button>
  );
}
