import { FaUserPlus } from "react-icons/fa";
import { followUnfollowUser, getSuggestions } from "../Services/Profile";
import { useEffect, useState } from "react";
import SuggestionCardSkeleton from "../components/SuggestionCard";
import { Link, useLocation } from "react-router-dom";

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [loadingUserId, setLoadingUserId] = useState(null);
  const [followingUsers, setFollowingUsers] = useState([]);

  const location = useLocation();

 
  async function getData() {
    try {
      setLoading(true);

      const { data } = await getSuggestions();

      setSuggestions(data?.suggestions || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  async function follow(id) {
    try {
      setLoadingUserId(id);

      await followUnfollowUser(id);

      setFollowingUsers((prev) =>
        prev.includes(id)
          ? prev.filter((uid) => uid !== id)
          : [...prev, id]
      );

    

    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUserId(null);
    }
  }

  return (
    <div className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-2 sm:px-0">

   
      {location.pathname === "/" ? (
        <Link to={"/suggestion"}>
          <button className="text-sm flex items-center justify-center font-semibold mb-3 px-2 py-2 bg-blue-500 w-full text-white rounded-2xl">
            More people
            <i className="fa fa-arrow-right mt-1 ms-3"></i>
          </button>
        </Link>
      ) : (
        <h1 className="text-xl font-bold my-4 px-2 text-center text-main">
          People you may know
        </h1>
      )}

   
      <div className="space-y-3">

        {loading ? (
          <>
            <SuggestionCardSkeleton />
            <SuggestionCardSkeleton />
            <SuggestionCardSkeleton />
          </>
        ) : (
          suggestions.map((user) => (
            <div
              key={user._id}
              className="card flex items-center justify-between p-2 rounded-2xl shadow-sm border hover:shadow-md transition w-full"
            >

         
              <Link to={`/profile/${user?._id}/posts`}>
                <div className="flex items-center gap-2 min-w-0">

                  <img
                    src={user.photo}
                    className="w-10 h-10 rounded-full object-cover bg-gray-50 flex-shrink-0"
                  />

                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm truncate text-main">
                      {user.name}
                    </h3>

                    <p className="text-xs text-sub truncate">
                      @{user.username}
                    </p>

                    <p className="text-[11px] text-sub">
                      {user.followersCount} followers
                      {user.mutualFollowersCount
                        ? ` , ${user.mutualFollowersCount} mutual`
                        : ""}
                    </p>
                  </div>

                </div>
              </Link>

             
              <button
                onClick={() => follow(user._id)}
                disabled={loadingUserId === user._id}
                className={`
                  flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition flex-shrink-0
                  ${followingUsers.includes(user._id)
                    ? "bg-gray-200 text-black hover:bg-gray-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                  }
                `}
              >
                {loadingUserId === user._id ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  <FaUserPlus className="text-xs" />
                )}

                {followingUsers.includes(user._id)
                  ? "Following"
                  : "Follow"}
              </button>

            </div>
          ))
        )}

      </div>
    </div>
  );
}