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


export  async function getSinglePost(id) {
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