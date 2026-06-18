import { useContext, useEffect } from 'react';
import { useState } from 'react';
import LoadingScreen from './../components/LoadingScreen/LoadingScreen';
import { UserContext } from './../Contexts/UserContext';
import ProfileSettings from './../components/ProfileSettings/ProfileSettings';
import { followUnfollowUser, getProfilePosts, getUserProfile } from '../Services/Profile';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import ProfilePosts from './ProfilePosts';
import { FaUserPlus, FaCheck } from "react-icons/fa";


const ProfilePage = () => {
  const { id } = useParams()
  const location = useLocation()
  const {userData} = useContext(UserContext);


  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [followLoading, SetFollowLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false)

  // setTimeout(() => {
  //   setIsLoading(false)
  // }, 500);
  async function follow() {
    try {
      SetFollowLoading(true)

      await followUnfollowUser(id);

      // setIsFollowing((prev) => !prev);
      getTest()
    } finally {
      setTimeout(() => {
        SetFollowLoading(false)
      }, 600);

    }
  }



  async function getTest() {
    try {
      const { data } = await getUserProfile(id);

      setIsFollowing(data.isFollowing)
      // console.log(data.isFollowing);

      setUser(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  // async function getPosts(id) {
  //  const data = await getProfilePosts(id)
  //  console.log(data);


  // }

  useEffect(() => {


    getTest();


    // getPosts()
  }, [id]);


  return <>

    {isLoading ? <LoadingScreen /> :
      <div className="bg-white rounded-2xl overflow-hidden shadow-md">

        {/* Cover */}
        <div className="relative h-48 sm:h-64 bg-gray-200">
          <img
            src={

              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200"
            }
            className="w-full h-full object-cover"
          />

          {/* Profile Photo */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0">
            <img
              src={user?.photo}
              alt=""
              className="w-32 h-32 rounded-full border-[5px] border-white bg-gray-100 object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Info */}
        <div className="pt-20 sm:pt-5 sm:pl-44 px-5 pb-6">

          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">
              {user?.name}
            </h1>

            <p className="text-gray-500 mt-1">
              @{user?.username}
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center sm:justify-start gap-8 mt-5">

            <div className="text-center">
              <h3 className="font-bold text-xl">
                {user?.followersCount}
              </h3>

              <p className="text-gray-500 text-sm">
                Followers
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-xl">
                {user?.followingCount}
              </h3>

              <p className="text-gray-500 text-sm">
                Following
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-xl">
                {user?.bookmarksCount}
              </h3>

              <p className="text-gray-500 text-sm">
                Bookmarks
              </p>
            </div>


          </div>


{userData._id == user._id?"":

          <div className="flex justify-center sm:justify-start gap-8 mt-5">

            <button
              onClick={follow}
              disabled={followLoading}
              className={`
    flex items-center gap-2 w-[120px] h-[40px] justify-center  rounded-lg text-sm transition flex-shrink-0
    ${isFollowing
                  ? "bg-gray-200 text-black hover:bg-gray-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                }
    ${followLoading ? "opacity-70 cursor-not-allowed" : ""}
  `}
            >
              {followLoading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : isFollowing ? (
                <>
                  <FaCheck className="text-xs" />
                  Following
                </>
              ) : (
                <>
                  <FaUserPlus className="text-xs" />
                  Follow
                </>
              )}
            </button>


          </div>

}

          {/* Buttons */}


          {/* <hr className='my-4' /> */}











        </div>

        <div className="max-w-5xl mx-auto">

          {/* Tabs */}

          <div className="flex justify-center gap-8 border-b bg-white rounded-xl px-4">

            <NavLink
              to={`posts`}
              className={({ isActive }) =>
                `py-4 font-medium border-b-2 ${location.pathname === `/profile/${id}/posts`
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
                }`
              }
            >

              posts
            </NavLink>

            <NavLink
              to="about"
              className={({ isActive }) =>
                `py-4 font-medium border-b-2 ${location.pathname === `/profile/${id}/about`
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
                }`
              }
            >
              About
            </NavLink>



          </div>

          {/* Content */}

          <div className="my-6">
            <Outlet context={{ user }} />
          </div>

        </div>

      </div>

    }





  </>
}

export default ProfilePage;
