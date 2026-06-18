import axios from "axios";


const baseUrl = "https://route-posts.routemisr.com"

export async function RegisterFunction(formData) {
    try {
        const { data } = await axios.post(baseUrl + "/users/signup", formData)
        return data.success
    } catch (error) {
        return error.response.data.message
    }

}




export async function loginFunction(formData) {
    try {
        const { data } = await axios.post(baseUrl + "/users/signin", formData)
        return data
    } catch (error) {


        if (error.code === "ERR_NETWORK") {
            // alert("You are offline. Check your internet connection.");
            return "You are offline. Check your internet connection.";
        } else {
            return error.response.data.message

        }



    }

}