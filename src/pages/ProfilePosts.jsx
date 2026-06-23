import React, { useContext, useEffect, useState } from 'react';
import { getProfilePosts } from '../Services/Profile';
import LoadingCard from './../components/LoadingCard/LoadingCard';
import PostCard from '../components/PostCard/PostCard';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import { UserContext } from '../Contexts/UserContext';
import { Link, useParams } from 'react-router-dom';

const ProfilePosts = () => {

  const { id } = useParams()
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);



  async function getPosts() {
    try {
      setLoading(true);

      const res = await getProfilePosts(id);


      setPosts(res?.data?.posts || []);

    } catch (error) {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {


    getPosts();
  }, [id]);

  return <>

    <div className="grid gap-3 mx-2">
      {loading ? (
        <LoadingCard />
      ) : posts.length > 0 ? (
        posts.map((post) => (

          <PostCard getProfilePosts={getPosts} key={post._id} postData={post} />
        ))
      ) : <>
      <div>

        <h1 className='text-center font-bold text-xl text-main py-10'>No posts to show</h1>
      </div>
      
      </>}

    </div>
    




  </>
}

export default ProfilePosts;
