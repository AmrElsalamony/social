import { useContext, useEffect, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import {
    FaRegCommentAlt,
    FaShare,
    FaGlobeAmericas,
    FaChevronDown,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, Avatar } from "@mui/material";

import { Link, useLocation } from "react-router-dom";

import CommentCard from "../CommentCard/CommentCard";
import formatPostDate from "../../Services/ConvertTime";
import image from "../../assets/Portrait_Placeholder.png";
import { bookMarkAndUnBookMark, likeAndUnlike } from "../../Services/Comments";
import { UserContext } from "../../Contexts/UserContext";
import { deletePost, sharePost, updatePost } from "../../Services/PostsServices";
import { showToast } from "../CustomToast";

const PostCard = ({
    postData,
    comments = [],
    addComment,
    getFeedPosts,
    getProfilePosts,
    onBookmarkUpdate,
    getBookMarkedPosts
}) => {
    const { userData } = useContext(UserContext);
    const location = useLocation();

    const isOwner = userData?._id === postData?.user?._id;

    const [visibleComments, setVisibleComments] = useState(2);
    const [isLiked, setIsLiked] = useState(false);
    const [likesLoading, setLikesLoading] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const [threeDots, setThreeDots] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updatedBody, setUpdatedBody] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);

    const [showLikes, setShowLikes] = useState(false);
    const [likes, setLikes] = useState([]);
    const [createdComment, setCreatedComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBookMarked, setIsBookMarked] = useState(postData.bookmarked);
    const [isShared, setIsShared] = useState(postData.isShare || false);
    const [sharesCount, setSharesCount] = useState(postData?.sharesCount || false);



    const originalPost = isShared ? postData?.sharedPost : postData;

    const sharer = postData.user;

    useEffect(() => {



        setLikesCount(postData?.likesCount || 0);
        setIsLiked(postData?.likes?.includes(userData?._id) || false);
    }, [postData, userData]);

    async function likeFunction() {
        const previousLiked = isLiked;
        const previousCount = likesCount;

        try {
            setLikesLoading(true);

            // Optimistic Update
            setIsLiked(!previousLiked);
            setLikesCount(prev => previousLiked ? Math.max(prev - 1, 0) : prev + 1);

            const { data } = await likeAndUnlike(postData._id);
            const liked = data.data.liked;

            // Sync with backend response
            setIsLiked(liked);
            setLikesCount(liked ? previousCount + 1 : Math.max(previousCount - 1, 0));

        } catch (err) {
            console.error("Like error:", err);
            // Revert on error
            setIsLiked(previousLiked);
            setLikesCount(previousCount);
            showToast('Failed to like post', 'error');
        } finally {
            setLikesLoading(false);
        }
    }

    async function deletePostFunction(id) {
        const data = await deletePost(id);

        if (data?.success) {
            showToast('Post deleted successfully!', 'success');
            if (location.pathname === "/") {
                getFeedPosts();
            } else if (location.pathname.includes("/profile")) {
                getProfilePosts();
            }
            else if (location.pathname.includes("/bookmarks")) {
                getBookMarkedPosts();
            }
        } else {
            showToast('Failed to delete post', 'error');
        }
    }

    async function handleUpdate() {
        const formData = new FormData();
        formData.append("body", updatedBody);

        if (selectedImage) formData.append("image", selectedImage);
        if (removeImage) formData.append("removeImage", "true");

        try {
            const { data } = await updatePost(postData._id, formData);
            if (data.success) {
                showToast('Post updated successfully!', 'success');
                setShowUpdateModal(false);
                if (location.pathname === "/") getFeedPosts();
                else if (location.pathname.includes("/profile")) getProfilePosts();
                else if (location.pathname.includes("/bookmarks")) getBookMarkedPosts();
            }
        } catch (err) {
            console.error("Update error:", err);
            showToast('Failed to update post', 'error');
        }
    }

    async function bookMarkFunction(id) {
        try {
            const { data } = await bookMarkAndUnBookMark(id);

            if (data?.success) {
                const newBookmarkStatus = data.data.bookmarked;

                setIsBookMarked(newBookmarkStatus);

                if (onBookmarkUpdate) {
                    onBookmarkUpdate(id, newBookmarkStatus);
                }

                showToast(
                    `Post ${newBookmarkStatus ? 'bookmarked' : 'unbookmarked'} successfully!`,
                    'success'
                );
                if (location.pathname.includes("/bookmarks")) {
                    getBookMarkedPosts();
                }
            }
        } catch (err) {
            console.error("Bookmark error:", err);
            showToast('Failed to update bookmark', 'error');
        }
    }

    async function handleShare(id) {
        if (isShared) return;

        try {
            const { data } = await sharePost(
                id,
                " "
            );



            if (data?.success) {
                setSharesCount((prev) => prev + 1);


                setIsShared(true);
                showToast('Post shared successfully!', 'success');
                if (location.pathname === "/") {
                    getFeedPosts();
                } else if (location.pathname.includes("/profile")) {
                    getProfilePosts();
                }
                else if (location.pathname.includes("/bookmarks")) {
                    getBookMarkedPosts();
                }
            } else {
                console.log(data.success);

            }

            console.log(data);

        } catch (error) {
            showToast(error.response?.data?.message, 'error');
            console.log(error.response?.data || error.message);
        }
    }

    const loadMore = () => setVisibleComments((prev) => prev + 2);

    const handleComment = async (text) => {
        if (!text.trim()) return;
        setIsSubmitting(true);
        try {
            await addComment(text, postData._id);
            setCreatedComment("");
        } catch (err) {
            console.error(err);
            showToast('Failed to add comment', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedImage(null);
        setPreviewImage(null);
        setRemoveImage(false);
    };

    return (
        <div className="card w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto rounded-2xl  overflow-hidden hover:cursor-pointer">

            {/* Header */}
            <div className="flex justify-between items-start p-4">
                <Link to={`/profile/${postData.user._id}/posts`}>
                    <div className="flex gap-3">
                        <img
                            src={postData?.user?.photo ? postData.user.photo : image}
                            alt=""
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="font-semibold text-main">
                                {postData?.user?.name}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-sub">
                                <span>{formatPostDate(postData.createdAt)}</span>
                                <span>·</span>
                                <FaGlobeAmericas className="text-xs" />
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="relative flex items-center">
                    {/* Bookmark Button */}
                    <button
                        onClick={() => bookMarkFunction(postData._id)}
                        className="px-2 mt-[-5px] rounded-full transition-all duration-200 text-3xl"
                        title="Bookmark"
                    >
                      {isBookMarked ? <FaBookmark  className="text-blue-600 text-xl" /> : <FaRegBookmark className="text-sub hover:text-blue-600 transition duration-200 text-xl" />}
                    </button>

                    {isOwner && (
                        <>
                            <button
                                onClick={() => setThreeDots(!threeDots)}
                                className="w-10 h-10 rounded-full text-sub hover:text-blue-600 flex items-center justify-center transition"
                            >
                                <BsThreeDots size={20} />
                            </button>

                            {threeDots && (
                                <div className="absolute top-12 right-[-10px] w-44 card  rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20">
                                    <button
                                        onClick={() => {
                                            setShowUpdateModal(true);
                                            setUpdatedBody(postData.body || "");
                                            setPreviewImage(null);
                                            setSelectedImage(null);
                                            setRemoveImage(false);
                                        }}
                                        className="w-full px-4 py-4 flex items-center gap-3 hover:bg-green-50 transition-all duration-200 "
                                    >
                                        <i className="fa-solid fa-pen text-green-500"></i>
                                        <span className="text-sm font-medium text-green-500">Update Post</span>
                                    </button>

                                    <div className="h-px dark:bg-[#334155] bg-gray-50" />

                                    <button
                                        onClick={() => deletePostFunction(postData._id)}
                                        className="w-full px-4 py-4 flex items-center gap-3 hover:bg-red-50 transition-all duration-200 text-red-500 disabled:opacity-50"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                        Delete Post
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="px-4 ">
                <p className="text-main leading-7">{postData.body}</p>
            </div>
            <div>

                {postData?.sharedPost &&
                    <Link to={`/post-details/${originalPost._id}`}>
                        <div className="px-4">
                            <div className="text-sub text-sm mb-2">
                                {sharer.name} shared a post
                            </div>

                            <p className="mb-3 text-sub">{postData.body}</p>
                            <div className="border my-border rounded-xl p-3">

                                <div className="flex gap-2 items-center mb-2">
                                    <img
                                        src={originalPost.user.photo}
                                        className="w-10 h-10 rounded-full"
                                    />

                                    <div>
                                        <h4 className="text-main">{originalPost.user.name}</h4>
                                        <span className="text-sm text-sub">
                                            @{originalPost.user.username}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-main mb-3">{originalPost.body}</p>
                                <img className="max-h-[400px] w-full rounded-lg" src={originalPost.image} alt="" />

                            </div>



                        </div>
                    </Link>
                }




            </div>

            {/* Image */}
            {postData.image && (
                <div className="relative group overflow-hidden max-h-[400px] px-2 mt-2">
                    <img
                        src={postData.image}
                        alt=""
                        className="w-full object-cover transition duration-500 group-hover:scale-105 rounded-lg"
                    />
                </div>
            )}

            {/* Likes & Comments Count */}
            <div className="px-4 py-3 flex justify-between items-center text-sm text-sub border-b dark:border-[#334155]">
                {likesCount > 0 && (
                    <Link to={`/post-details/${postData._id}`}

                        className="flex items-center gap-2 hover:underline"
                    >
                        <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                            👍
                        </div>
                        <span>{likesCount}</span>
                    </Link>
                )}

                <div className="flex gap-4">

                    {postData.commentsCount > 0 && (

                        <Link className="hover:underline text-sub" to={`/post-details/${postData._id}`}>
                            {postData.commentsCount}{" "}
                            {postData.commentsCount === 1 ? "comment" : "comments"}
                        </Link>
                    )}
                    {sharesCount > 0 && (
                        <Link className="hover:underline text-sub" to={`/post-details/${postData._id}`}>

                            {postData.sharesCount}{" "}
                            {postData.sharesCount === 1 ? "share" : "shares"}
                        </Link>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 p-2">
                <button
                    onClick={likeFunction}
                    disabled={likesLoading}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#334155] transition font-medium"
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
                            <ThumbUpOffAltIcon fontSize="small" className="text-sub" />
                            <span className="text-sub">Like</span>
                        </>
                    )}
                </button>

                <Link
                    to={`/post-details/${postData._id}`}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#334155] transition font-medium text-sub"
                >
                    <FaRegCommentAlt /> Comment
                </Link>

                {isShared === true ?
                    <button
                        disabled={true}
                        className=" cursor-not-allowed flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#334155] transition font-medium text-blue-600"
                    >
                        <FaShare className="text-blue-500" /> Shared
                    </button>
                    :
                    <button
                        onClick={() => handleShare(postData._id)}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#334155] transition font-medium text-sub"
                    >
                        <FaShare /> Share
                    </button>
                }
            </div>

            {/* Comments Section */}
            {comments && comments.length > 0 && (
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
                                <FaChevronDown className="text-sm" />
                                Load more comments
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {showUpdateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
                    <div className="card w-full max-w-lg rounded-xl p-6 shadow-2xl mx-3">
                        <h2 className="text-xl font-semibold mb-4 text-main">Update Post</h2>

                        <textarea
                            value={updatedBody}
                            onChange={(e) => setUpdatedBody(e.target.value)}
                            className="input w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-blue-500 min-h-[100px]"
                            placeholder="What's on your mind?"
                        />

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-sub mb-1">
                                Change Image (optional)
                            </label>
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
                                className="w-full text-sm text-sub file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>

                        <div className="mt-4">
                            {previewImage && (
                                <div className="relative">
                                    <img
                                        src={previewImage}
                                        className="w-[150px] h-[150px] mx-auto rounded-xl border"
                                        alt="New preview"
                                    />
                                    <button
                                        onClick={() => {
                                            setSelectedImage(null);
                                            setPreviewImage(null);
                                        }}
                                        className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}

                            {!previewImage && postData.image && !removeImage && (
                                <div className="relative">
                                    <img
                                        src={postData.image}
                                        className="w-[150px] h-[150px] mx-auto rounded-xl border"
                                        alt="Current"
                                    />
                                    <button
                                        onClick={() => setRemoveImage(true)}
                                        className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}

                            {removeImage && !previewImage && (
                                <p className="text-red-500 text-sm mt-2">✅ Image will be removed</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={closeUpdateModal}
                                className="text-red-900 bg-red-100 px-5 py-2  hover:bg-red-400 rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
                            >
                                Update Post
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default PostCard;