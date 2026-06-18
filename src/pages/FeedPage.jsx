import React, { useEffect } from 'react';
import getPosts
    from '../Services/PostsServices';
import { useState } from 'react';
import PostCard from './../components/PostCard/PostCard';
import LoadingCard from './../components/LoadingCard/LoadingCard';
import CreatePost from './../components/CreatePost/CreatePost';
import SuggestionsPage from './SuggestionPage';
import { Link } from 'react-router-dom';

const FeedPage = () => {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getAllPosts() {
        setIsLoading(true)
        const { data } = await getPosts()
        // console.log(data.posts[0]);
        if (data) {
            setPosts(data.posts)
        }
        setIsLoading(false)

    }




    useEffect(() => {

        getAllPosts()
    }, []);

    return <>

 
        {/* {isLoading ? 
        <div className="p-4"><LoadingCard/></div> : <div className="container mx-auto p-4">
            <CreatePost getData ={getAllPosts}/>
            <div className="grid gap-3">
                {
                    posts ? posts.map((post, index) => <PostCard key={index} postData={post} /> ) : <LoadingCard />
                }
            </div>
        </div>} */}




        {isLoading ? <div className="p-4"><LoadingCard /></div> : <div className="container mx-auto p-4">
            <div className="flex justify-between gap-2">

                <aside className="hidden xl:block w-[240px] sticky top-16 h-fit">
                    Left
                </aside>

                <main className="w-full max-w-[680px] mx-auto">
                    <CreatePost getData={getAllPosts} />
                    <div className="grid gap-3">
                        {
                            posts ? posts.map((post) => <PostCard key={post._id} postData={post} /> ) : <LoadingCard />
                        }
                    </div>
                </main>

                <aside className=" hidden xl:block w-[280px] sticky top-16 h-[540px]  overflow-hidden">
                   <SuggestionsPage/>


                      
                   
                </aside>
            </div>
        </div>}







    </>
}

export default FeedPage;
