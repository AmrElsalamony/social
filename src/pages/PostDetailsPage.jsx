import { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { deletePost, getSinglePost, updatePost, sharePost } from '../Services/PostsServices';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { likeAndUnlike, bookMarkAndUnBookMark } from "../Services/Comments";
import { createComment, getComments, getLikes } from '../Services/Comments';
import CommentCard from './../components/CommentCard/CommentCard';
import { UserContext } from '../Contexts/UserContext';
import image from '../assets/Portrait_Placeholder.png';
import formatPostDate from '../Services/ConvertTime';
import {
    FaRegCommentAlt,
    FaShare,
    FaGlobeAmericas,
    FaChevronDown,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Avatar, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LoadingCard from './../components/LoadingCard/LoadingCard';
import { showToast } from '../components/CustomToast';

const PostDetailsPage = () => {
    const { id } = useParams();

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [visibleComments, setVisibleComments] = useState(2);

    const { userData } = useContext(UserContext);

    const [createdComment, setCreatedComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);

    const [showLikes, setShowLikes] = useState(false);
    const [likes, setLikes] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [likesLoading, setLikesLoading] = useState(false);

    const [threeDots, setThreeDots] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    // Update Modal States
    const [updatedBody, setUpdatedBody] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);

    const [isDeleted, setIsDeleted] = useState(false);
    const [isBookMarked, setIsBookMarked] = useState(false);

    // Share States
    const [isShared, setIsShared] = useState(false);
    const [shareLoading, setShareLoading] = useState(false);
    const [sharesCount, setSharesCount] = useState(0);

    const isOwner = userData?._id === post?.user?._id;

    /* ==================== BOOKMARK ==================== */
    async function bookMarkFunction() {
        try {
            const { data } = await bookMarkAndUnBookMark(id);
            if (data?.success) {
                const newStatus = data.data.bookmarked;
                setIsBookMarked(newStatus);
                showToast(
                    `Post ${newStatus ? 'bookmarked' : 'unbookmarked'} successfully!`,
                    'success'
                );
            }
        } catch (err) {
            console.error("Bookmark error:", err);
            showToast('Failed to update bookmark', 'error');
        }
    }

    /* ==================== LIKE - Fast + Persists on Reload ==================== */
    async function likeFunction() {
        const previousLiked = isLiked;
        const previousCount = likesCount;

        try {
            setLikesLoading(true);

            // Optimistic update
            setIsLiked(!previousLiked);
            setLikesCount(prev => previousLiked ? Math.max(prev - 1, 0) : prev + 1);

            const { data } = await likeAndUnlike(id);
            const liked = data.data.liked;

            // Sync with server
            setIsLiked(liked);
            setLikesCount(liked ? previousCount + 1 : Math.max(previousCount - 1, 0));

            // CRITICAL FIX: Refresh likes list after like/unlike
            await getPostLikes();

        } catch (error) {
            console.error("Like error:", error);
            // Revert on error
            setIsLiked(previousLiked);
            setLikesCount(previousCount);
            showToast('Failed to like post', 'error');
        } finally {
            setLikesLoading(false);
        }
    }

    /* ==================== SHARE ==================== */
    async function handleShare() {
        // Prevent sharing if already shared or loading
        if (isShared || shareLoading) {
            if (isShared) {
                showToast('You have already shared this post!', 'info');
            }
            return;
        }

        try {
            setShareLoading(true);

            const { data } = await sharePost(id, " ");

            if (data?.success) {
                setIsShared(true);
                setSharesCount(prev => prev + 1);
                showToast('Post shared successfully!', 'success');

                // Refresh post data to get updated shares
                await getPost();
            } else {
                showToast('Failed to share post', 'error');
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
            showToast(error.response?.data?.message || 'Failed to share post', 'error');
        } finally {
            setShareLoading(false);
        }
    }

    // ==================== UPDATE POST ====================
    async function handleUpdate() {
        const formData = new FormData();
        formData.append("body", updatedBody);

        if (selectedImage) formData.append("image", selectedImage);
        if (removeImage) formData.append("removeImage", "true");

        try {
            const { data } = await updatePost(post._id, formData);
            if (data.success) {
                showToast('Post updated successfully!', 'success');
                setShowUpdateModal(false);
                getPost();
            }
        } catch (error) {
            console.log(error);
            showToast('Failed to update post', 'error');
        }
    }

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setUpdatedBody("");
        setSelectedImage(null);
        setPreviewImage(null);
        setRemoveImage(false);
    };

    async function handleComment(content) {
        if (!content.trim()) return;
        setIsSubmitting(true);
        try {
            await createComment(content, id);
            setCreatedComment("");
            getPostComments();
            setCommentsCount(prev => prev + 1);
        } catch (error) {
            console.log(error);
            showToast('Failed to add comment', 'error');
        } finally {
            setIsSubmitting(false);
        }
    }

    async function getPost() {
        try {
            setIsLoading(true);
            const { data } = await getSinglePost(id);

            if (data?.post) {
                setPost(data.post);
                setIsShared(data.post.isShare)
                setCommentsCount(data.post.commentsCount || 0);
                setLikesCount(data.post.likesCount || 0);
                setIsBookMarked(data.post.bookmarked || false);
                setSharesCount(data.post.sharesCount || 0);

                const userLiked = data.post.likes?.includes(userData?._id) || false;
                setIsLiked(userLiked);
            } else {
                setIsDeleted(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function getPostComments() {
        const { data } = await getComments(id);
        setComments(data.comments || []);
    }

    async function getPostLikes() {
        try {
            const res = await getLikes(id);
            setLikes(res?.data?.likes || []);
        } catch (error) {
            console.log(error);
            setLikes([]);
        }
    }

    function loadMore() {
        setVisibleComments(prev => prev + 2);
    }

    async function deletePostFunction(id) {
        const data = await deletePost(id);
        if (data?.success) {
            showToast('Post deleted successfully!', 'success');
            setIsDeleted(true);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getPost();
            await getPostComments();
            await getPostLikes();
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (post?.likes && userData?._id) {
            const userLiked = post.likes.includes(userData._id);
            setIsLiked(userLiked);
        }
        // Update share status when post or user changes
        if (post?.shares && userData?._id) {
            const userHasShared = post.shares.includes(userData._id);
            setIsShared(userHasShared);
        }
    }, [post, userData]);

    const originalPost = isShared ? post?.sharedPost : post;
    const sharer = post.user;

    return (
        <>
            {isDeleted ? (
                <div className="bg-white rounded-2xl mx-5  shadow-sm border border-gray-100 px-6 py-10 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <i className="fa-solid fa-trash text-gray-500 text-xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Post Deleted</h3>
                    <p className="text-sm text-gray-500 mt-2">This post has been removed successfully.</p>
                    <Link to="/" className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                        <i className="fa-solid fa-house"></i> Go to Feed
                    </Link>
                </div>
            ) : isLoading ? (
                <LoadingCard />
            ) : (
                <div className="container mx-auto my-6 px-2">
                    <div className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

                        {/* Header */}
                        <div className="flex justify-between items-start p-4">
                            <Link to={`/profile/${post?.user?._id}/posts`}>
                                <div className="flex gap-3">
                                    <img
                                        src={post?.user?.photo ? post.user.photo : image}
                                        alt=""
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{post?.user?.name}</h3>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <span>{formatPostDate(post.createdAt)}</span>
                                            <span>·</span>
                                            <FaGlobeAmericas className="text-xs" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="flex items-center gap-1">
                                {/* Bookmark Button */}
                                <button
                                    onClick={bookMarkFunction}
                                    className="px-3 py-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 text-3xl"
                                    title="Bookmark"
                                >
                                    {isBookMarked ? '★' : '☆'}
                                </button>

                                {isOwner && (
                                    <div className="relative">
                                        <button
                                            onClick={() => setThreeDots(!threeDots)}
                                            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
                                        >
                                            <BsThreeDots size={20} />
                                        </button>

                                        {threeDots && (
                                            <div className="absolute top-12 right-[-10px] w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                                <button
                                                    onClick={() => {
                                                        setShowUpdateModal(true);
                                                        setUpdatedBody(post.body || "");
                                                        setPreviewImage(null);
                                                        setSelectedImage(null);
                                                        setRemoveImage(false);
                                                    }}
                                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-all duration-200"
                                                >
                                                    <i className="fa-solid fa-pen text-gray-500"></i>
                                                    <span className="text-sm font-medium text-gray-700">Update Post</span>
                                                </button>

                                                <div className="h-px bg-gray-100" />

                                                <button
                                                    onClick={() => deletePostFunction(post?._id)}
                                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-all duration-200 text-red-500"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                    <span className="text-sm font-medium">Delete Post</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-4 ">
                            <p className="text-gray-800 leading-7">{post.body}</p>
                        </div>

                        {post?.sharedPost &&
                            <Link  to={`/post-details/${originalPost?._id}`}>
                                <div className="px-4">
                                    <div className="text-gray-500 text-sm mb-2">
                                        {sharer?.name} shared a post
                                    </div>

                                    <p className="mb-3">{post.body}</p>
                                    <div className="border rounded-xl p-3">

                                        <div className="flex gap-2 items-center mb-2">
                                            <img
                                                src={originalPost?.user?.photo}
                                                className="w-10 h-10 rounded-full"
                                                alt=""
                                            />
                                            <div>
                                                <h4>{originalPost?.user?.name}</h4>
                                                <span className="text-sm text-gray-500">
                                                    @{originalPost?.user?.username}
                                                </span>
                                            </div>
                                        </div>

                                        <p>{originalPost?.body}</p>
                                        {originalPost?.image && (
                                            <img className="max-h-[400px] w-full" src={originalPost.image} alt="" />
                                        )}
                                    </div>
                                </div>
                            </Link>
                        }

                        {/* Image */}
                        {post.image && (
                            <div className="relative group overflow-hidden max-h-[400px]">
                                <img
                                    src={post.image}
                                    alt=""
                                    className="w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>
                        )}

                        {/* Stats */}
                        <div className="px-4 py-3 flex justify-between items-center text-sm text-gray-500 border-b border-gray-200">
                            {likesCount > 0 && (
                                <button
                                    onClick={() => {
                                        setShowLikes(true);
                                        getPostLikes(); // Refresh likes when opening modal
                                    }}
                                    className="flex items-center gap-2 hover:underline"
                                >
                                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">👍</div>
                                    <span>{likesCount}</span>
                                </button>
                            )}

                            <div className="flex gap-4">
                                {commentsCount > 0 && (
                                    <span>{commentsCount} {commentsCount === 1 ? "comment" : "comments"}</span>
                                )}
                                {sharesCount > 0 && (
                                    <span>{sharesCount} {sharesCount === 1 ? "share" : "shares"}</span>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-3 p-2">
                            <button
                                onClick={likeFunction}
                                disabled={likesLoading}
                                className="flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-100 transition font-medium"
                            >
                                {likesLoading ? (
                                    <i className="fa fa-spinner fa-spin text-blue-600" />
                                ) : isLiked ? (
                                    <>
                                        <ThumbUpIcon fontSize="small" className="text-blue-600" />
                                        <span className="text-blue-600">Like</span>
                                    </>
                                ) : (
                                    <>
                                        <ThumbUpOffAltIcon fontSize="small" className="text-gray-600" />
                                        <span className="text-gray-600">Like</span>
                                    </>
                                )}
                            </button>

                            <button className="flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-100 transition font-medium text-gray-600">
                                <FaRegCommentAlt /> Comment
                            </button>

                            {/* Share Button - Disabled if already shared */}
                            <button
                                onClick={handleShare}
                                disabled={isShared || shareLoading}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl transition font-medium ${isShared
                                    ? ' text-blue-600 cursor-not-allowed opacity-80'
                                    : ' text-gray-600'
                                    } ${shareLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {shareLoading ? (
                                    <i className="fa fa-spinner fa-spin" />
                                ) : (
                                    <FaShare className={isShared ? 'text-blue-600' : ''} />
                                )}
                                {isShared ? 'Shared' : 'Share'}
                            </button>
                        </div>

                        {/* Comments Section */}
                        {comments.length > 0 && (
                            <div className="w-full">
                                <div className="w-[95%] mx-auto rounded-2xl">
                                    {comments.slice(0, visibleComments).map((comment, index) => (
                                        <CommentCard key={index} comment={comment} />
                                    ))}
                                    {visibleComments < comments.length && (
                                        <button
                                            onClick={loadMore}
                                            className="flex items-center gap-3 px-2.5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all duration-200 w-fit mx-auto mb-5"
                                        >
                                            <FaChevronDown className="text-sm" /> Load more comments
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Add Comment */}
                        <div className="flex items-center gap-3 w-full py-4 px-5">
                            <Avatar src={userData?.photo} sx={{ width: 40, height: 40 }} className='bg-[#F0F2F5]' />
                            <div className="flex items-center justify-between flex-1 bg-[#F0F2F5] rounded-full px-4 py-2">
                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
                                    value={createdComment}
                                    onChange={(e) => setCreatedComment(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleComment(createdComment)}
                                />
                                {createdComment.trim() ? (
                                    <IconButton onClick={() => handleComment(createdComment)} disabled={isSubmitting} size="small">
                                        {isSubmitting ? <i className="fa fa-spinner fa-spin" /> : <SendIcon className="text-blue-500 text-lg" />}
                                    </IconButton>
                                ) : (
                                    <IconButton disabled size="small">
                                        <SendIcon className="text-gray-500 text-lg" />
                                    </IconButton>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {showUpdateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 mt-5">
                    <div className="bg-white w-full max-w-lg rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-4">Update Post</h2>
                        <textarea
                            value={updatedBody}
                            onChange={(e) => setUpdatedBody(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-xl min-h-[60px] focus:outline-none focus:border-blue-500"
                        />

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Change Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setSelectedImage(file);
                                        setPreviewImage(URL.createObjectURL(file));
                                        setRemoveImage(false);
                                    }
                                }}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>

                        <div className="mt-4">
                            {previewImage && (
                                <div className="relative">
                                    <img src={previewImage} className="rounded-xl w-[150px] h-[150px] mx-auto" alt="preview" />
                                    <button onClick={() => { setSelectedImage(null); setPreviewImage(null); }} className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600">Remove</button>
                                </div>
                            )}

                            {!previewImage && post.image && !removeImage && (
                                <div className="relative">
                                    <img src={post.image} className="w-[150px] h-[150px] mx-auto rounded-xl" alt="current" />
                                    <button onClick={() => setRemoveImage(true)} className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600">Remove</button>
                                </div>
                            )}

                            {removeImage && !previewImage && <p className="text-red-500 text-sm mt-2">Image will be removed</p>}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={closeUpdateModal} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
                            <button onClick={handleUpdate} className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Update Post</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Likes Modal */}
            {showLikes && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
                    <div className="bg-white w-[350px] max-h-[400px] rounded-xl shadow-lg overflow-hidden">
                        <div className="flex items-center justify-between p-3 border-b font-semibold">
                            <p>Likes</p>
                            <button onClick={() => setShowLikes(false)} className="w-fit bg-red-200 p-2 text-sm text-red-700 hover:bg-red-300 transition-all duration-300 rounded-lg">Close</button>
                        </div>

                        <div className="overflow-y-auto max-h-[350px] pb-6">
                            {likes.length === 0 ? (
                                <p className="p-4 text-gray-500 text-sm">No likes yet</p>
                            ) : (
                                likes.map((item) => (
                                    <Link key={item._id} to={`/profile/${item._id}/posts`}>
                                        <div className="flex justify-between border-b items-center gap-3 p-3 hover:bg-gray-50">
                                            <div className="flex items-center gap-3">
                                                <img src={item.photo} className="w-10 h-10 rounded-full object-cover" alt="" />
                                                <div>
                                                    <h4 className="text-sm font-semibold">{item.name}</h4>
                                                    <p className="text-xs text-gray-500">@{item.username}</p>
                                                </div>
                                            </div>
                                            <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">👍</div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PostDetailsPage;