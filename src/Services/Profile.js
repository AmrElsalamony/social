import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";


const baseUrl = "https://route-posts.routemisr.com"

export default async function getProfile() {
  try {
    const { data } = await axios.get(baseUrl + "/users/profile-data", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return data
  } catch (error) {
    return error
  }

}


export  async function getUserProfile(id) {
  try {
    const { data } = await axios.get(baseUrl + `/users/${id}/profile`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return data
  } catch (error) {
    return error
  }

}



export async function uploadProfilePhoto(photoFile) {
  try {
    const formData = new FormData();

    formData.append("photo", photoFile);

    const { data } = await axios.put(
      `${baseUrl}/users/upload-photo`,
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




export async function changePasswordApi(password, newPassword) {
  const token = localStorage.getItem("token");

  const { data } = await axios.patch(
    "https://route-posts.routemisr.com/users/change-password",
    {
      password,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
}



export  async function getSuggestions() {
  const page = 1;
  const limit = 20;
  try {
    const  {data}  = await axios.get(baseUrl + `/users/suggestions?page=${page}&limit=${limit}`,
     {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    return data
  } catch (error) {
    return error
  }

}


 

export  async function getProfilePosts(id) {
  try {
    const { data } = await axios.get(baseUrl + `/users/${id}/posts`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    return data
  } catch (error) {
    return error
  }

}


export  async function followUnfollowUser(id) {
  try {
    const  data  = await axios.put(baseUrl + `/users/${id}/follow`,{}, {
       headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    return data
  } catch (error) {
    return error
  }

}