import axios from "axios";


const baseUrl = "https://route-posts.routemisr.com"
export default async function getPosts() {
  try {
    const { data } = await axios.get(baseUrl + "/posts", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return data
  } catch (error) {
    return error
  }

}


export async function getSinglePost(id) {
  try {
    const { data } = await axios.get(baseUrl + `/posts/${id}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return data
  } catch (error) {
    return error
  }

}



export async function addPost(postContent, postImage) {
  try {
    const formData = new FormData();

    formData.append("body", postContent);

    if (postImage) {
      formData.append("image", postImage);
    }

    const { data } = await axios.post(
      `${baseUrl}/posts`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return data;

  } catch (error) {
    return error.response?.data || error.message;
  }
}




export async function deletePost(id) {
  try {
    const { data } = await axios.delete(baseUrl + `/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    return data
  } catch (error) {
    return error
  }

}

export const updatePost = (id, formData) => {
  const token = localStorage.getItem("token");

  return axios.put(
    `https://route-posts.routemisr.com/posts/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};


export async function getBookMarkedPosts() {
  try {
    const { data } = await axios.get(baseUrl + "/users/bookmarks", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return data
  } catch (error) {
    return error
  }

}



export const sharePost = (postId, body) => {
  return axios.post(
    baseUrl + `/posts/${postId}/share`,
    {
      body
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
};