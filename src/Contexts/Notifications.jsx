import { useState, createContext } from "react";

export const NotificationContext = createContext();

export default function NotificationContextProvider({ children }) {
  const [notificationNumber, setNotificationNumber] = useState(0);
  const [allNotifications, setAllNotifications ] = useState([]);

  return (
    <NotificationContext.Provider value={{ notificationNumber, setNotificationNumber, allNotifications, setAllNotifications  }}>
      {children}
    </NotificationContext.Provider>
  );
}