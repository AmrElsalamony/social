import { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSinglePost } from '../Services/PostsServices';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { likeAndUnlike } from "../Services/Comments";
import { createComment, getComments, getLikes } from '../Services/Comments';
import CommentCard from './../components/CommentCard/CommentCard';
import { UserContext } from '../Contexts/UserContext';
import image from '../assets/Portrait_Placeholder.png';
import formatPostDate from '../Services/ConvertTime';
import {
    FaRegThumbsUp,
    FaRegCommentAlt,
    FaShare,
    FaGlobeAmericas,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Avatar, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { FaChevronDown } from "react-icons/fa";
import LoadingCard from './../components/LoadingCard/LoadingCard';


const PostDetailsPage = () => {

    const { id } = useParams()


    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [visibleComments, setVisibleComments] = useState(2);
    const { userData } = useContext(UserContext)
    const [createdComment, setCreatedComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);
    const [showLikes, setShowLikes] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const [likesCount, setLikesCount] = useState(0);

    const [likesLoading, setLikesLoading] = useState(false);
    const [likes, setLikes] = useState([]);


    async function handleComment(content, id) {

        setIsSubmitting(true)
        const { data } = await createComment(content, id)
        setCreatedComment("")

        setIsSubmitting(false)

        // console.log(data);
        // console.log(content , id);

    }





    async function getPost() {
        try {
            setIsLoading(true);

            const { data } = await getSinglePost(id);

            if (data?.post) {

                setPost(data.post);

                setCommentsCount(data.post.commentsCount);

                setLikesCount(data.post.likesCount);

                setIsLiked(
                    data.post.likes?.includes(userData?._id)
                );

            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function likeFunction() {

        try {

            setLikesLoading(true);

            const { data } = await likeAndUnlike(id);
            console.log(data.data);

            setLikes(data.data)
            const liked = data.data.liked;

            setIsLiked(liked);

            setLikesCount((prev) =>

                liked

                    ? prev + 1

                    : Math.max(prev - 1, 0)

            );

            await getPostLikes();
            setLikesLoading(false)
        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLikesLoading(false);

        }

    }




    useEffect(() => {

        getPost()
    }, [id]);

    useEffect(() => {
        setLikesCount(post?.likesCount || 0);

        setIsLiked(
            post?.likes?.includes(userData?._id)
        );



    }, [post, userData]);

    async function getPostComments() {
        const { data } = await getComments(id)
        // console.log(data.comments);
        setComments(data.comments)

    }

    async function getPostLikes() {
        try {
            setLikesLoading(true);

            const res = await getLikes(id);

            if (res?.data?.likes) {
                // console.log(res.data.likes);

                setLikes(res.data.likes);
            } else {
                setLikes([]);
            }

        } catch (error) {
            console.log(error);
            setLikes([]);
        } finally {
            setLikesLoading(false);
        }
    }


    function loadMore() {

        setVisibleComments(visibleComments + 2)
    }






    useEffect(() => {

        async function fetchData() {

            await getPost();
            getPostLikes()
            await getPostComments();

        }

        fetchData();

    }, []);


    // console.log(post);

    return <>

        {isLoading ? <LoadingCard /> : <div className="container mx-auto my-6 px-2">

            <div className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:cursor-pointer">

                {/* Header */}
                <div className="flex justify-between items-start p-4">
                    <div className="flex gap-3">
                        <img
                            src={post?.user?.photo ? post.user.photo : image}
                            alt=""
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <div>
                            <h3 className="font-semibold text-gray-900">
                                {post?.user?.name}
                            </h3>

                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <span>  {formatPostDate(post.createdAt)}</span>
                                <span>·</span>
                                <FaGlobeAmericas className="text-xs" />
                            </div>
                        </div>
                    </div>

                    <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
                        <BsThreeDots size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="px-4 pb-4">
                    <p className="text-gray-800 leading-7">
                        {post.body}

                    </p>
                </div>

                {/* Image */}
                {post.image ? <div className="relative group overflow-hidden max-h-[400px]">
                    <img
                        src={post.image}
                        alt=""
                        className="w-full  object-cover transition duration-500 group-hover:scale-105"
                    />
                </div> : ""}

                {/* Likes & Comments */}
                <div className="px-4 py-3 flex justify-between items-center text-sm text-gray-500 border-b border-gray-200">

                    {/* Likes */}
                    {likesCount > 0 && <>
                        {showLikes && (
                            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                                <div className="bg-white w-[350px] max-h-[400px] rounded-xl shadow-lg overflow-hidden">

                                    {/* Header */}
                                    <div className="p-3 border-b font-semibold">
                                        Likes
                                    </div>

                                    {/* List */}
                                    <div className="overflow-y-auto max-h-[350px]">

                                        {likes.length === 0 ? (
                                            <p className="p-4 text-gray-500 text-sm">
                                                No likes yet
                                            </p>
                                        ) : (
                                            likes.map((item) => (
                                                <Link key={item._id} to={`/profile/${item._id}/posts`}>
                                                    <div

                                                        className="flex justify-between border-b-[1px] items-center gap-3 p-3 hover:bg-gray-50"
                                                    >


                                                        <div className='flex items-center gap-3'>
                                                            <img
                                                                src={item.photo}
                                                                className="w-10 h-10 rounded-full object-cover"
                                                            />
                                                            <div>
                                                                <h4 className="text-sm font-semibold">
                                                                    {item.name}

                                                                </h4>
                                                                <p className="text-xs text-gray-500">
                                                                    @{item.username}
                                                                </p>
                                                            </div>



                                                        </div>
                                                        <div className="w-5 h-5 me-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                                                            👍
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                        )}

                                    </div>

                                    {/* Close */}
                                    <button
                                        onClick={() => setShowLikes(false)}
                                        className="w-full p-2 text-sm text-blue-600 border-t hover:bg-gray-50"
                                    >
                                        Close
                                    </button>

                                </div>
                            </div>
                        )}

                        <button onClick={() => setShowLikes(true)} className="flex items-center gap-2">

                            <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                                👍
                            </div>

                            <span>{likesCount}</span>

                        </button>
                    </>}

                    {/* Comments & Shares */}
                    <div className="flex gap-4">

                        {commentsCount > 0 && (
                            <button className="hover:underline cursor-pointer">

                                {commentsCount}{" "}

                                {commentsCount === 1
                                    ? "comment"
                                    : "comments"}

                            </button>
                        )}

                        {post.sharesCount > 0 && (
                            <button className="hover:underline cursor-pointer">

                                {post.sharesCount}{" "}

                                {post.sharesCount === 1
                                    ? "share"
                                    : "shares"}

                            </button>
                        )}

                    </div>

                </div>

                <div className="grid grid-cols-3 p-2">

                    <button

                        onClick={likeFunction}

                        disabled={likesLoading}

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

                            likesLoading ?

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

                    <button className="flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-100 transition font-medium text-gray-600">
                        <FaRegCommentAlt />
                        Comment
                    </button>

                    <button className="flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-100 transition font-medium text-gray-600">
                        <FaShare />
                        Share
                    </button>

                </div>



                {comments != null && comments.length != 0 ? <div className="w-full ">

                    <div className=" w-[95%] mx-auto  rounded-2xl grid   ">
                        {comments ? comments.slice(0, visibleComments).map((comment, index) => <CommentCard key={index} comment={comment} />) : ""}

                        {visibleComments >= comments.length ? "" : <button
                            className="
                   flex items-center gap-3
                   px-2.5 py-2.5
                   rounded-full
                   bg-gray-100
                   hover:bg-gray-200
                   text-gray-700
                   font-medium
                   transition-all duration-200
                   w-fit
                   text-center
                   mx-auto
                   mb-5
                   "
                            onClick={loadMore}
                        >
                            <>
                                <FaChevronDown className="text-sm  " />
                                Load more comments
                            </>

                        </button>}

                    </div>

                </div> : ""}



                <div className="flex items-center gap-3 w-full py-4 px-5" >

                    {/* User Avatar */}
                    <Avatar
                        src={userData.photo}
                        sx={{
                            width: 40,
                            height: 40,
                        }}
                        className='bg-[#F0F2F5]'
                    />

                    {/* Comment Box */}
                    <div className=" flex items-center justify-between flex-1 bg-[#F0F2F5] rounded-full px-4 py-2">

                        {/* Input */}
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className="
            flex-1
            bg-transparent
            outline-none
            text-sm
            placeholder:text-gray-500
          "
                            value={createdComment} onChange={(e) => setCreatedComment(e.target.value)}
                        />

                        {/* Icons */}
                        {createdComment == "" ? <div className="flex items-center gap-1 ">
                            <IconButton disabled size="small">
                                <SendIcon className="text-gray-500 text-lg hover:text-blue-500 transition" />
                            </IconButton>
                        </div> : <div className="flex items-center gap-1 ">
                            <IconButton
                                loading={isSubmitting}
                                onClick={() => {
                                    handleComment(createdComment, id);
                                    getPostComments();
                                    setTimeout(() => {
                                        setCommentsCount(commentsCount + 1)
                                    }, 300);
                                }}
                                size="small">
                                {isSubmitting ? "" : <SendIcon className="text-blue-500 text-lg hover:text-blue-900 transition" />}
                            </IconButton>
                        </div>}

                    </div>

                </div>




            </div>

        </div>}




    </>
}

export default PostDetailsPage;
