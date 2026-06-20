import React, { useEffect, useState } from 'react';
import { getBookMarkedPosts } from '../Services/PostsServices';
import PostCard from './../components/PostCard/PostCard';
import LoadingCard from './../components/LoadingCard/LoadingCard';
import { Link } from 'react-router-dom';

const BookMarkedPosts = () => {


    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    async function getPosts() {
        setIsLoading(true)
        const { data } = await getBookMarkedPosts()

        //    console.log(data.bookmarks);
        setPosts(data.bookmarks)
        setIsLoading(false)
    }
    useEffect(() => {

        getPosts()
    }, []);
    return <>
        {isLoading ? <div className="p-4"><LoadingCard /></div> : <>
            {posts.length != 0 ? <div className='grid gap-3 mt-5'>
                {[...posts].reverse().map((post) => <PostCard postData={post} getBookMarkedPosts={getPosts} />)}
            </div> : <div className="bg-white rounded-2xl mx-5 mt-10 shadow-sm border border-gray-100 px-6 py-10 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <i className="fa fa-x text-gray-500 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">No bookmarked posts yet !</h3>
                <Link to="/" className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                    <i className="fa-solid fa-house"></i> Go to Feed
                </Link>
            </div>}



        </>



        }


    </>
}

export default BookMarkedPosts;
