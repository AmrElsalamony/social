import { useContext, useEffect, useState } from "react";
import {
    FaRegCommentAlt,
    FaShare,
    FaGlobeAmericas,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { Link } from "react-router-dom";

import CommentCard from "../CommentCard/CommentCard";
import formatPostDate from "../../Services/ConvertTime";
import image from "../../assets/Portrait_Placeholder.png";
import { likeAndUnlike } from "../../Services/Comments";
import { UserContext } from "../../Contexts/UserContext";

const PostCard = ({ postData, comments, addComment }) => {
    const { userData } = useContext(UserContext);

    const [visibleComments, setVisibleComments] = useState(2);

    const [isLiked, setIsLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const [likes, setLikes] = useState([]);


    const [likesCount, setLikesCount] = useState(
        postData?.likesCount || 0
    );

    function loadMore() {
        setVisibleComments((prev) => prev + 2);
    }

    useEffect(() => {
        setLikesCount(postData?.likesCount || 0);

        setIsLiked(
            postData?.likes?.includes(userData?._id)
        );



    }, [postData, userData]);

    async function likeFunction() {
        try {
            setLikeLoading(true)
            const { data } = await likeAndUnlike(postData._id);
            
setLikes(data.data)
            const liked = data.data.liked;

            setIsLiked(liked);

            setLikesCount((prev) =>
                liked
                    ? prev + 1
                    : Math.max(prev - 1, 0)
            );
            setLikeLoading(false)
        } catch (error) {


            console.log(error);
        }
    }

    return (
        <div className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

            {/* Header */}

            <div className="flex justify-between items-start p-4">

                <Link to={`/profile/${postData?.user?._id}/posts`}>

                    <div className="flex gap-3">

                        <img
                            src={
                                postData?.user?.photo
                                    ? postData.user.photo
                                    : image
                            }
                            alt=""
                            className="w-12 h-12 rounded-full object-cover bg-gray-100"
                        />

                        <div>

                            <h3 className="font-semibold text-gray-900">
                                {postData?.user?.name}
                            </h3>

                            <div className="flex items-center gap-1 text-sm text-gray-500">

                                <span>
                                    {formatPostDate(postData.createdAt)}
                                </span>

                                <span>·</span>

                                <FaGlobeAmericas className="text-xs" />

                            </div>

                        </div>

                    </div>

                </Link>

                <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">

                    <BsThreeDots size={20} />

                </button>

            </div>

            {/* Content */}

            <div className="px-4 pb-4">

                <p className="text-gray-800 leading-7">

                    {postData.body}

                </p>

            </div>

            {/* Image */}

            {postData.image && (

                <div className="relative group overflow-hidden max-h-[400px]">

                    <img
                        src={postData.image}
                        alt=""
                        className="w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                </div>

            )}

            {/* Likes & Comments */}

            <div className="px-4 py-3 flex justify-between items-center text-sm text-gray-500 border-b border-gray-200">

                {likesCount > 0 && (
                    <Link
                        to={`/post-details/${postData._id}`}
                        className="hover:underline"
                    >

                        <div className="flex items-center gap-2">

                            <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">

                                👍

                            </div>

                            <span>

                                {likesCount}

                            </span>

                        </div>

                    </Link>)}

                <div className="flex gap-4">

                    {postData.commentsCount > 0 && (

                        <Link
                            to={`/post-details/${postData._id}`}
                            className="hover:underline"
                        >

                            {postData.commentsCount}{" "}

                            {postData.commentsCount === 1
                                ? "comment"
                                : "comments"}

                        </Link>

                    )}

                    {postData.sharesCount > 0 && (

                        <button className="hover:underline">

                            {postData.sharesCount}{" "}

                            {postData.sharesCount === 1
                                ? "share"
                                : "shares"}

                        </button>

                    )}

                </div>

            </div>

            {/* Actions */}

            <div className="grid grid-cols-3 p-2">

                {/* Like */}

                <button

                    onClick={likeFunction}

                    disabled={likeLoading}

                    className="
flex items-center
justify-center
gap-2
py-3
rounded-xl
hover:bg-gray-100
transition
font-medium
"

                >

                    {

                        likeLoading ?

                            <i className="fa fa-spinner fa-spin text-blue-600"></i>

                            :

                            isLiked ?

                                <>

                                    <ThumbUpIcon

                                        fontSize="small"

                                        className="text-blue-600"

                                    />

                                    <span className="text-blue-600">

                                        Like

                                    </span>

                                </>

                                :

                                <>

                                    <ThumbUpOffAltIcon

                                        fontSize="small"

                                        className="text-gray-600"

                                    />

                                    <span className="text-gray-600">

                                        Like

                                    </span>

                                </>

                    }

                </button>

                {/* Comment */}

                <Link
                    to={`/post-details/${postData._id}`}
                    className="
          flex items-center
          justify-center
          gap-2
          py-3
          rounded-xl
          hover:bg-gray-100
          transition
          font-medium
          text-gray-600
        "
                >

                    <FaRegCommentAlt />

                    Comment

                </Link>

                {/* Share */}

                <button
                    className="
          flex items-center
          justify-center
          gap-2
          py-3
          rounded-xl
          hover:bg-gray-100
          transition
          font-medium
          text-gray-600
        "
                >

                    <FaShare />

                    Share

                </button>

            </div>

            {/* Comments */}

            {comments?.length > 0 && (

                <div className="w-full">

                    <div className="w-[95%] mx-auto rounded-2xl grid">

                        {comments
                            .slice(0, visibleComments)
                            .map((comment, index) => (

                                <CommentCard
                                    key={index}
                                    comment={comment}
                                />

                            ))}

                        {visibleComments < comments.length && (

                            <button
                                onClick={loadMore}
                                className="
                flex items-center gap-3
                px-2.5 py-2.5
                rounded-full
                bg-gray-100
                hover:bg-gray-200
                text-gray-700
                font-medium
                transition-all
                duration-200
                w-fit
                mx-auto
                mb-5
              "
                            >

                                <FaChevronDown className="text-sm" />

                                Load more comments

                            </button>

                        )}

                    </div>

                </div>

            )}

            {addComment}

        </div>
    );
};

export default PostCard;