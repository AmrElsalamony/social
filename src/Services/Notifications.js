import axios from "axios";


const baseUrl = "https://route-posts.routemisr.com"

export default async function getUnreadNotifications() {
    try {
        const { data } = await axios.get(baseUrl + "/notifications/unread-count", {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data
    } catch (error) {
        return error
    }

}


export async function getAllNotifications() {
  try {

    let page = 1;

    let allNotifications = [];

    let hasNextPage = true;

    while (hasNextPage) {

      const { data } = await axios.get(
        `${baseUrl}/notifications`,
        {
          params: {
            page,
            limit: 10, // أكبر limit يسمح به الـ API
          },

          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      allNotifications.push(
        ...data.data.notifications
      );

      if (data.meta.pagination.nextPage) {

        page = data.meta.pagination.nextPage;

      } else {

        hasNextPage = false;

      }

    }

    return {
      success: true,
      notifications: allNotifications,
    };

  } catch (error) {

    console.log(error);

    return {
      success: false,
      notifications: [],
    };

  }
}


export async function makeOneNotificationRead(id) {
    try {
        const data = await axios.patch(baseUrl + `/notifications/${id}/read`,{}, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data
    } catch (error) {
        return error
    }

}



export async function makeAllNotificationRead() {
    try {
        const data = await axios.patch(baseUrl + `/notifications/read-all`,{}, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data
    } catch (error) {
        return error
    }

}





