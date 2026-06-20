import { StrictMode } from 'react'
import { createRoot, ReactDOM } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import { HeroUIProvider } from "@heroui/react";
import TokenContextProvider from './Contexts/AuthContext.jsx'
import UserContextProvider from './Contexts/UserContext.jsx'
import NotificationContextProvider from './Contexts/Notifications.jsx'
import { ToastContainer } from 'react-toastify';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <TokenContextProvider>
        <UserContextProvider>
          <NotificationContextProvider>
            <App />
            <ToastContainer />
          </NotificationContextProvider>

        </UserContextProvider>
      </TokenContextProvider>
    </HeroUIProvider>
  </StrictMode>
  ,
)
