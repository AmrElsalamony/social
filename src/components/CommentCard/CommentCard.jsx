import { FaRegThumbsUp, FaReply, FaTrash } from "react-icons/fa";
import formatPostDate from "../../Services/ConvertTime";
import image from '../../assets/Portrait_Placeholder.png';
import { Link } from 'react-router-dom';


export default function CommentCard({ comment }) {



  return (

    <div className="card border-none w-full shadow-sm p-2 rounded-xl  flex mb-4  group">

      {/* Avatar */}
      <Link to={`/profile/${comment.commentCreator._id}/posts`}>
        <img
          src={comment.commentCreator.photo ? comment.commentCreator.photo : image}
          alt=""
          className="w-9 me-1 h-9 rounded-full object-cover border"
        />
      </Link>
      {/* Content */}
      <div className="flex-1">
        <div className="card rounded-2xl px-3 py-2 relative">

          {/* Name */}
          <Link to={`/profile/${comment.commentCreator._id}/posts`}>
            <p className="font-semibold text-sm text-main">
              {comment.commentCreator.name}
            </p>
          </Link>
          {/* Text */}
          <p className="text-sm text-sub my-2">
            {comment.content}
          </p>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-2 text-xs text-sub ms-2 ">

          {/* Like */}
          <button className="flex items-center gap-1 hover:text-blue-500 transition">
            <FaRegThumbsUp />
            Like
          </button>

          {/* Reply */}
          <button
            // onClick={() => onReply(comment)}
            className="flex items-center gap-1 hover:text-blue-500 transition"
          >
            <FaReply />
            Reply
          </button>

          {/* Time */}
          <span className="text-sub">{formatPostDate(comment.createdAt)}</span>

          {/* Delete*/}
          {/* { (
            <button
             onClick={() => onDelete(comment._id)}
              className="ml-auto opacity-0 group-hover:opacity-100 text-red-500 transition"
            >
              <FaTrash />
            </button>
          )} */}
        </div>

      </div>
    </div>
  );
}