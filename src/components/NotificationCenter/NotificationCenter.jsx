import { useContext, useState } from "react";
import {
    FaBell,
    FaCheck,
    FaCheckDouble,
    FaUserPlus,
    FaHeart,
    FaComment,
} from "react-icons/fa";
import { NotificationContext } from "../../Contexts/Notifications";
import formatPostDate from "../../Services/ConvertTime";
import getUnreadNotifications, { getAllNotifications, makeAllNotificationRead, makeOneNotificationRead } from "../../Services/Notifications";
import { Link } from "react-router-dom";
import NotificationLoadingCard from "../NotificationLoading/NotificationLoading";
export default function NotificationsMenu({toggle}) {

    const { notificationNumber, setNotificationNumber, allNotifications, setAllNotifications } = useContext(NotificationContext);

    const [loading, setLoading] = useState(false);


    async function getAllNotificationsFunction() {
        try {
            setLoading(true);

            const res = await getAllNotifications();
            console.log(res);
            

            if (res.success) {
                setAllNotifications(res.notifications);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    async function getNotificationUnreadNumber() {
        const { data } = await getUnreadNotifications()

        setNotificationNumber(data.unreadCount)

    }
    async function readNotification(id) {
        const data = await makeOneNotificationRead(id);
        setAllNotifications((prev) =>
            prev.map((no) =>
                no._id === id
                    ? { ...no, isRead: true }
                    : no
            )
        );

        setNotificationNumber((prev) =>
            Math.max(prev - 1, 0)
        );

    }
    async function readAllNotifications() {
        try {
            await makeAllNotificationRead();

            setAllNotifications((prev) =>
                prev.map((no) => ({
                    ...no,
                    isRead: true,
                }))
            );

            setNotificationNumber(0);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="fixed top-[70px] right-[10px] z-10 w-[380px] max-w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden h-[500px] ">

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">

                <h2 className="text-2xl font-bold">
                    Notifications
                </h2>

                {allNotifications.length != 0 ? <button
                    onClick={readAllNotifications}
                    className="
          flex items-center gap-2
          text-blue-600
          hover:bg-blue-50
          px-3 py-2
          rounded-lg
          text-sm
          font-medium
          transition
          "
                >
                    <FaCheckDouble />

                    Mark all as read
                </button> : <div>

                    No Notifications
                </div>}

            </div>

            {/* Notifications List */}

            <div className="max-h-[500px] h-fit overflow-y-auto">

                {/* Notification */}

                {loading === false && allNotifications.length != 0 ? allNotifications.map((no, index) =>

                   no.entityType === "post" ?  
                   <Link onClick={

                        () => { no?.isRead === false ? readNotification(no?._id) : "" },
                        toggle
                        



                    } key={index} to={`/post-details/${no.entityId}`}>

                        <div

                            className="
          flex gap-3
          p-4
          hover:bg-gray-50
          border-b
          relative
          cursor-pointer
          "
                        >

                            {/* Avatar */}

                            <div className="relative">

                                <img
                                    src={no.actor.photo}
                                    alt=""
                                    className="
              w-14
              h-14
              rounded-full
              object-cover
              "
                                />

                                {/* Type icon */}

                                <div
                                    className="
              absolute
              -bottom-1
              -right-1
              bg-blue-600
              text-white
              p-1.5
              rounded-full
              "
                                >
                                    <FaUserPlus className="text-xs" />
                                </div>

                            </div>

                            {/* Content */}

                            <div className="flex-1">

                                <p className="text-sm text-gray-800">

                                    <span className="font-semibold">
                                        {no.actor.name}
                                    </span>

                                    {" "}
                                    {(() => {
                                        // {console.log(no.type)}
                                        switch (no.type) {
                                            case "follow_user":
                                                return "started following you.";

                                            case "like_post":
                                                return "liked your post.";

                                            case "comment_post":
                                                return "commented on your post.";
                                                case "share_post":
                                                return "shared your post.";

                                            default:
                                                return "";
                                        }
                                    })()}








                                </p>

                                <p className="text-xs text-blue-600 mt-1">
                                    {formatPostDate(no.createdAt)}
                                </p>

                            </div>

                            {/* Mark Read */}



                            {/* unread dot */}

                            {no.isRead ? "" :

                                <>
                                    <button




                                        onClick={() => readNotification(no?._id)}


                                        className="
                        
            p-2
            rounded-full
            hover:bg-gray-200
            text-gray-500
            transition
            "
                                    >
                                        <FaCheck />
                                    </button>
                                    <div className="absolute right-6 bottom-4 w-3 h-3 rounded-full bg-blue-600" />
                                </>
                            }

                        </div>
                    </Link>:
                    <Link onClick={

                        () => { no?.isRead === false ? readNotification(no?._id) : "" }



                    } key={index} to={`/profile/${no.actor._id}/posts`}>

                        <div

                            className="
          flex gap-3
          p-4
          hover:bg-gray-50
          border-b
          relative
          cursor-pointer
          "
                        >

                            {/* Avatar */}

                            <div className="relative">

                                <img
                                    src={no.actor.photo}
                                    alt=""
                                    className="
              w-14
              h-14
              rounded-full
              object-cover
              "
                                />

                                {/* Type icon */}

                                <div
                                    className="
              absolute
              -bottom-1
              -right-1
              bg-blue-600
              text-white
              p-1.5
              rounded-full
              "
                                >
                                    <FaUserPlus className="text-xs" />
                                </div>

                            </div>

                            {/* Content */}

                            <div className="flex-1">

                                <p className="text-sm text-gray-800">

                                    <span className="font-semibold">
                                        {no.actor.name}
                                    </span>

                                    {" "}
                                    {(() => {
                                        switch (no.type) {
                                            case "follow_user":
                                                return "started following you.";

                                            case "like_post":
                                                return "liked your post.";

                                            case "comment_post":
                                                return "commented on your post.";

                                            default:
                                                return "";
                                        }
                                    })()}








                                </p>

                                <p className="text-xs text-blue-600 mt-1">
                                    {formatPostDate(no.createdAt)}
                                </p>

                            </div>

                            {/* Mark Read */}



                            {/* unread dot */}

                            {no.isRead ? "" :

                                <>
                                    <button




                                        onClick={() => readNotification(no?._id)}


                                        className="
                        
            p-2
            rounded-full
            hover:bg-gray-200
            text-gray-500
            transition
            "
                                    >
                                        <FaCheck />
                                    </button>
                                    <div className="absolute right-6 bottom-4 w-3 h-3 rounded-full bg-blue-600" />
                                </>
                            }

                        </div>
                    </Link>


                ) : <NotificationLoadingCard />


                }




            </div>

        </div>
    );
}