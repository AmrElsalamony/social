import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Link } from 'react-router-dom';
import image from "../assets/Portrait_Placeholder.png"

const Left = () => {
    const { userData } = useContext(UserContext)
    // console.log(userData);

    return <>
        <div className="space-y-3">
            {/* Profile Card */}
            <Link to={`/profile/${userData._id}/posts`}>
                <div className="card rounded-xl  overflow-hidden">
                    <div className="relative">
                        <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        <div className="flex justify-center -mt-8">
                            <img
                                src={userData?.photo || image}
                                alt="Profile"
                                className="w-14 h-14 rounded-full border-2 border-white object-cover"
                            />
                        </div>
                        <div className="text-center px-4 pb-3 pt-1">
                            <h3 className="font-semibold text-main hover:underline cursor-pointer">
                                {userData?.name || "User Name"}
                            </h3>
                            <p className="text-sm text-sub">
                                @{userData?.username || "username"}
                            </p>
                        </div>
                    </div>
        
                </div>
            </Link>
            {/* Navigation Menu */}
            <div className="card rounded-xl  overflow-hidden mt-3">
                <nav className="space-y-1 py-2">
                    <Link to="/" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition rounded-lg mx-1 group">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition">
                            <i className="fa-solid fa-house text-blue-500 text-sm"></i>
                        </div>
                        <span className="text-sm font-medium text-main group-hover:text-gray-900">Home</span>
                    </Link>

                    <Link to={`/profile/${userData._id}/posts`} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition rounded-lg mx-1 group">
                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition">
                            <i className="fa-solid fa-user text-purple-500 text-sm"></i>
                        </div>
                        <span className="text-sm font-medium text-main group-hover:text-gray-900">Profile</span>
                    </Link>

                    <Link to="/suggestions" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition rounded-lg mx-1 group">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition">
                            <i className="fa-solid fa-users text-green-500 text-sm"></i>
                        </div>
                        <span className="text-sm font-medium text-main group-hover:text-gray-900">Sugestions</span>
                    </Link>



                    <Link to="/bookmarks" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition rounded-lg mx-1 group">
                        <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center group-hover:bg-yellow-100 transition">
                            <i className="fa-solid fa-bookmark text-yellow-500 text-sm"></i>
                        </div>
                        <span className="text-sm font-medium text-main group-hover:text-gray-900">Saved</span>
                    </Link>

                    <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition rounded-lg mx-1 group">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition">
                            <i className="fa-solid fa-gear text-gray-500 text-sm"></i>
                        </div>
                        <span className="text-sm font-medium text-main group-hover:text-gray-900">Settings</span>
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition rounded-lg mx-1 group">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition">
                            <i className="fa-solid fa-right-from-bracket text-gray-500 text-sm"></i>
                        </div>
                        <span className="text-sm font-medium text-main group-hover:text-gray-900">Logout</span>
                    </Link>
                </nav>
            </div>


        </div>


    </>
}

export default Left;
