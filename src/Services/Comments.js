import axios from "axios";

const baseUrl = "https://route-posts.routemisr.com";

// Get comments
export const getComments = async (postId) => {
  const { data } = await axios.get(`${baseUrl}/posts/${postId}/comments`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  return data;
};


export const createComment = async (commentContent, postId) => {
  const { data } = await axios.post(`${baseUrl}/posts/${postId}/comments`, { content: commentContent }, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  return data;
};




export const getLikes = async (postId) => {
  const { data } = await axios.get(`${baseUrl}/posts/${postId}/likes`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  return data;
};



export const likeAndUnlike = async ( postId) => {
  const  data  = await axios.put(`${baseUrl}/posts/${postId}/like`, {  }, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  return data;
};



export const bookMarkAndUnBookMark = async ( postId) => {
  const  data  = await axios.put(`${baseUrl}/posts/${postId}/bookmark`, {  }, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  return data;
};