// import React, { useContext, useEffect } from 'react';
// import { FaRegSmile, FaCamera, FaImage } from "react-icons/fa";
// import { Avatar, IconButton } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { UserContext } from '../../Contexts/UserContext';
// import { useState } from 'react';
// import axios from 'axios';
// import { createComment } from '../../Services/Comments';

// const AddComment = ({ id, callComments}) => {
//     const { userData } = useContext(UserContext)
//     const [createdComment, setCreatedComment] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     async function handleComment(content, id) {

//         setIsSubmitting(true)
//         const { data } = await createComment(content, id)
//         setCreatedComment("")
        
//         setIsSubmitting(false)

//         // console.log(data);
//         // console.log(content , id);

//     }


//     useEffect(() => {


//     }, []);
//     return <>
//         <div className="flex items-center gap-3 w-full py-4 px-5" >

//             {/* User Avatar */}
//             <Avatar
//                 src={userData.photo}
//                 sx={{
//                     width: 40,
//                     height: 40,
//                 }}
//                 className='bg-[#F0F2F5]'
//             />

//             {/* Comment Box */}
//             <div className=" flex items-center justify-between flex-1 bg-[#F0F2F5] rounded-full px-4 py-2">

//                 {/* Input */}
//                 <input
//                     type="text"
//                     placeholder="Write a comment..."
//                     className="
//             flex-1
//             bg-transparent
//             outline-none
//             text-sm
//             placeholder:text-gray-500
//           "
//                     value={createdComment} onChange={(e) => setCreatedComment(e.target.value)}
//                 />

//                 {/* Icons */}
//                 {createdComment == "" ? <div className="flex items-center gap-1 ">
//                     <IconButton disabled size="small">
//                         <SendIcon className="text-gray-500 text-lg hover:text-blue-500 transition" />
//                     </IconButton>
//                 </div> : <div className="flex items-center gap-1 ">
//                     <IconButton
//                         loading={isSubmitting}
//                         onClick={() => {
//                             handleComment(createdComment, id);
//                             callComments();
//                         }}
//                         size="small">
//                         {isSubmitting ? "" : <SendIcon className="text-blue-500 text-lg hover:text-blue-900 transition" />}
//                     </IconButton>
//                 </div>}

//             </div>

//         </div>

//     </>
// }

// export default AddComment;
