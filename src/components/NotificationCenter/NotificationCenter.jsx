import { useContext, useState, useEffect, useCallback, useRef } from "react";
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
import getUnreadNotifications, {
    getAllNotifications,
    makeAllNotificationRead,
    makeOneNotificationRead,
    // getNotifications // Import the new paginated function
} from "../../Services/Notifications";
import { Link } from "react-router-dom";
import NotificationLoadingCard from "../NotificationLoading/NotificationLoading";

export default function NotificationsMenu({ toggle }) {
    const { notificationNumber, setNotificationNumber, allNotifications, setAllNotifications } = useContext(NotificationContext);

    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [initialLoad, setInitialLoad] = useState(true);
    const [error, setError] = useState(null);

    // Reference for the load more button
    const loadMoreRef = useRef(null);

    // Fetch notifications with pagination
    const fetchNotifications = useCallback(async (pageNum, append = false) => {
        try {
            if (append) {
                setLoadingMore(true);
            } else {
                setLoading(true);
                setInitialLoad(true);
            }
            setError(null);

            // Use the new paginated function
            const result = await getAllNotifications(pageNum, 10);

            if (!result.success) {
                throw new Error('Failed to fetch notifications');
            }

            const newNotifications = result.notifications || [];
            const pagination = result.pagination || {};

            if (append) {
                setAllNotifications(prev => [...prev, ...newNotifications]);
            } else {
                setAllNotifications(newNotifications);
            }

            setHasMore(pagination.nextPage !== null && pagination.nextPage !== undefined);
            setCurrentPage(pagination.currentPage || pageNum);

            return { success: true };

        } catch (error) {
            console.error('Error fetching notifications:', error);
            setError('Failed to load notifications');
            return { success: false };
        } finally {
            if (append) {
                setLoadingMore(false);
            } else {
                setLoading(false);
                setInitialLoad(false);
            }
        }
    }, [setAllNotifications]);

    // Load more function
    const loadMore = useCallback(async () => {
        if (!loadingMore && hasMore && !loading) {
            const nextPage = currentPage + 1;
            await fetchNotifications(nextPage, true);
        }
    }, [fetchNotifications, hasMore, loadingMore, loading, currentPage]);

    // Initial load
    useEffect(() => {
        fetchNotifications(1, false);
        getNotificationUnreadNumber();
    }, []);

    // Intersection Observer for auto-load more (optional)
    useEffect(() => {
        if (!hasMore || loading || loadingMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.5 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loading, loadingMore, loadMore]);

    async function getNotificationUnreadNumber() {
        try {
            const { data } = await getUnreadNotifications();
            setNotificationNumber(data.unreadCount);
        } catch (error) {
            console.log(error);
        }
    }

    async function readNotification(id) {
        try {
            await makeOneNotificationRead(id);
            setAllNotifications((prev) =>
                prev.map((no) =>
                    no._id === id ? { ...no, isRead: true } : no
                )
            );
            setNotificationNumber((prev) => Math.max(prev - 1, 0));
        } catch (error) {
            console.log(error);
        }
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

    // Render notification item
    const renderNotificationItem = (no, index) => {
        const isLast = index === allNotifications.length - 1;
        const linkTo = no.entityType === "post"
            ? `/post-details/${no.entityId}`
            : `/profile/${no.actor._id}/posts`;

        return (
            <Link
                onClick={() => {
                    if (no?.isRead === false) readNotification(no?._id);
                    toggle();
                }}
                key={no._id || index}
                to={linkTo}
                ref={isLast ? loadMoreRef : null}
            >
                <div className="card rounded-none flex gap-3 p-4  border-b relative cursor-pointer">
                    {/* Avatar */}
                    <div className="relative">
                        <img
                            src={no.actor.photo}
                            alt=""
                            className="w-14 h-14 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-main p-1.5 rounded-full">
                            <FaUserPlus className="text-xs" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <p className="text-sm text-main">
                            <span className="font-semibold">{no.actor.name}</span>{" "}
                            {(() => {
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

                    {/* Mark Read & unread dot */}
                    {no.isRead ? null : (
                        <>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    readNotification(no?._id);
                                }}
                                className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition"
                            >
                                <FaCheck />
                            </button>
                            <div className="absolute right-6 bottom-4 w-3 h-3 rounded-full bg-blue-600" />
                        </>
                    )}
                </div>
            </Link>
        );
    };

    return (
        <div className="card rounded-none   w-full overflow-hidden min-h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 ">
                <h2 className="text-2xl font-bold text-main">Notifications</h2>
                {allNotifications.length !== 0 ? (
                    <button
                        onClick={readAllNotifications}
                        className="flex items-center  gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition"
                    >
                        <FaCheckDouble />
                        Mark all as read
                    </button>
                ) : (
                    ""
                )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto min-h-0 pb-6 ">
                {initialLoad || loading ? (
                    <NotificationLoadingCard />
                ) : error ? (
                    <div className="text-center text-red-500 p-4">{error}</div>
                ) : allNotifications.length === 0 ? (
                    <div className="text-center text-gray-500 p-4">
                        No notifications to show
                    </div>
                ) : (
                    <>
                        {allNotifications.map((no, index) => renderNotificationItem(no, index))}

                        {/* Load More Button */}
                        {hasMore && (
                            <div className="text-center p-4">
                                <button
                                    onClick={loadMore}
                                    disabled={loadingMore}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    {loadingMore ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Loading more...
                                        </span>
                                    ) : (
                                        'Load More'
                                    )}
                                </button>
                            </div>
                        )}

                        {/* No more notifications message */}
                        {!hasMore && allNotifications.length > 10 && (
                            <div className="text-center text-gray-400 text-sm p-2">
                                No more notifications
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}