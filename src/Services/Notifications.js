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

export async function getAllNotifications(page = 1, limit = 10) {
  try {
    const { data } = await axios.get(
      `${baseUrl}/notifications`,
      {
        params: {
          page,
          limit,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return {
      success: true,
      notifications: data.data.notifications || [],
      pagination: data.meta?.pagination || {
        currentPage: page,
        nextPage: null,
        totalPages: 1,
        totalItems: 0,
      },
    };

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return {
      success: false,
      notifications: [],
      pagination: {
        currentPage: 1,
        nextPage: null,
        totalPages: 0,
        totalItems: 0,
      },
    };
  }
}


// export async function getAllNotifications() {
//   try {

//     let page = 1;

//     let allNotifications = [];

//     let hasNextPage = true;

//     while (hasNextPage) {

//       const { data } = await axios.get(
//         `${baseUrl}/notifications`,
//         {
//           params: {
//             page,
//             limit: 10, 
//           },

//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         }
//       );

//       allNotifications.push(
//         ...data.data.notifications
//       );

//       if (data.meta.pagination.nextPage) {

//         page = data.meta.pagination.nextPage;

//       } else {

//         hasNextPage = false;

//       }

//     }

//     return {
//       success: true,
//       notifications: allNotifications,
//     };

//   } catch (error) {

//     console.log(error);

//     return {
//       success: false,
//       notifications: [],
//     };

//   }
// }


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





