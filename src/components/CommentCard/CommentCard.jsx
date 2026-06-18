import { FaRegThumbsUp, FaReply, FaTrash } from "react-icons/fa";
import formatPostDate from "../../Services/ConvertTime";
import image from '../../assets/Portrait_Placeholder.png';


export default function CommentCard({comment 
    // ,onReply,onDelete,currentUserId,
}) {
    // console.log(comment);
    
//   const isOwner = currentUserId === comment?.commentCreator?._id;

  return (
    
    <div className="w-full shadow-sm p-2 rounded-xl border flex mb-4  group">

      {/* Avatar */}
      <img
        src={comment.commentCreator.photo? comment.commentCreator.photo :image}
        alt=""
        className="w-9 me-1 h-9 rounded-full object-cover border"
      />

      {/* Content */}
      <div className="flex-1">

        <div className="bg-gray-100 rounded-2xl px-3 py-2 relative">

          {/* Name */}
          <p className="font-semibold text-sm text-gray-900">
            {comment.commentCreator.name}
          </p>

          {/* Text */}
          <p className="text-sm text-gray-700">
            {comment.content}
          </p>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">

          {/* Like */}
          <button className="flex items-center gap-1 hover:text-red-500 transition">
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
          <span>{formatPostDate(comment.createdAt)}</span>

          {/* Delete (only owner) */}
          {/* {isOwner && (
            <button
            //   onClick={() => onDelete(comment._id)}
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