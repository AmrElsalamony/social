import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './../components/Navbar';
import getProfile from '../Services/Profile';
import { UserContext } from '../Contexts/UserContext';
import getUnreadNotifications from '../Services/Notifications';
import { getAllNotifications } from '../Services/Notifications';
import { NotificationContext } from '../Contexts/Notifications';
import Footer from './../components/Footer';

const MainLayout = () => {
    const { UserData, setUserData } = useContext(UserContext)
    const { notificationNumber, setNotificationNumber } = useContext(NotificationContext)
    const { allNotifications, setAllNotifications } = useContext(NotificationContext)

    async function getProfileData() {
        const { data } = await getProfile()
        // console.log(data.user._id);
        
        setUserData(data.user)
    }
    async function getNotificationUnreadNumber() {
        const { data } = await getUnreadNotifications()
        setNotificationNumber(data.unreadCount)

    }
    async function getAllNotificationsFunction() {
        const  data  = await getAllNotifications()
        // console.log(data.notifications);

        setAllNotifications(data.notifications)

    }
    useEffect(() => {

        getProfileData()
        getNotificationUnreadNumber()
        getAllNotificationsFunction()

    }, []);


    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default MainLayout;
