import { useContext, useRef, useState } from "react";
import { FaImage, FaTimes, FaGlobe } from "react-icons/fa";
import { Avatar } from "@mui/material";
import { UserContext } from "../../Contexts/UserContext";
import { Link } from "react-router-dom";
import { addPost } from "../../Services/PostsServices";
import { showToast } from "../CustomToast";

export default function CreatePost({ getData }) {

  const { userData: user } = useContext(UserContext);

  const [text, setText] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const fileRef = useRef(null);

  const isDisabled = !text.trim() && !imageFile;

  const handlePickImage = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    fileRef.current.value = "";
  };

  async function createPost() {
    try {
      setLoading(true);

      const res = await addPost(text, imageFile);
      showToast('Post created successfully!', 'success');
      // console.log(res);

      setText("");
      removeImage();

      getData();

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mb-4 bg-white rounded-2xl shadow-md border border-gray-200 p-4">

      {/* USER */}
      <div className="flex items-center gap-3 mb-2">

        <Link to={`/profile/${user._id}/posts`}>
          <Avatar
            src={user?.photo}
            sx={{ width: 50, height: 50 }}
            className="bg-gray-100"
          />
        </Link>

        <div>
          <Link to={`/profile/${user._id}/posts`}>
            <h4 className="font-semibold text-sm leading-tight">
              {user?.name}
            </h4>
          </Link>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <FaGlobe size={10} />
            <span>Public</span>
          </div>

        </div>
      </div>

      {/* TEXT */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`What's on your mind, ${user?.name || "User"}?`}
        className="w-full resize-none outline-none text-sm min-h-[50px] py-1"
      />

      {/* FILE */}
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleChange}
        className="hidden"
      />

      {/* PREVIEW */}
      {imagePreview && (
        <div className="relative mt-2">

          <img
            src={imagePreview}
            className="w-full rounded-xl object-cover"
          />

          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full"
          >
            <FaTimes />
          </button>

        </div>
      )}

      {/* ACTIONS */}
      <div className="flex items-center justify-between mt-2 border-t pt-2">

        {/* PHOTO */}
        <button
          onClick={handlePickImage}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
        >
          <FaImage />
          <span className="text-sm">Photo</span>
        </button>

        {/* POST */}
        <button
          onClick={createPost}
          disabled={isDisabled || loading}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition
            ${isDisabled || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
            }
          `}
        >
          {loading ? "Posting..." : "Post"}
        </button>

      </div>

    </div>
  );
}