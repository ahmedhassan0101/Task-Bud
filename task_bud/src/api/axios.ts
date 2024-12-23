import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000, // 5 seconds timeout

  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You could add auth tokens here in the future
    // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const originalRequest = error.config;
    if (error.response) {
      // Handle specific HTTP error codes
      switch (error.response.status) {
        case 400:
          toast.error(error.response.data.msg || "Bad Request");
          break;
        case 401:
          // // Example retry logic
          // if (!originalRequest._retry) {
          //   originalRequest._retry = true;
          //   // Refresh token logic can go here
          //   toast.error("Unauthorized access - retrying...");
          // }
          // Handle unauthorized access
          toast.error("Unauthorized access");
          break;
        case 404:
          toast.error("Resource not found");
          break;
        case 500:
          toast.error("Server error");
          break;
        default:
          toast.error("Something went wrong");
      }
    } else if (error.request) {
      // Network error
      toast.error("Network error - please check your connection");
    } else {
      toast.error("An error occurred");
    }

    return Promise.reject(error);
  }
);

/* ------------------------------------ - ----------------------------------- */
// timeout (5000 milliseconds):

//    Think of this like setting a timer when you're waiting for food delivery.
//    If the delivery doesn't arrive within the set time (5 seconds in our case), you'll cancel the order.
//    This prevents your app from hanging indefinitely if the server isn't responding.
//    For example, if your server is down, instead of your app freezing while waiting for a response forever,
//    it will give up after 5 seconds and tell the user there was a problem.
/* ------------------------------------ - ----------------------------------- */

// Content-Type: 'application/json':

//    This is like putting a label on a package telling the post office what's inside.
//    When we send data to our server, we're telling it "Hey, I'm sending you JSON data.
//    "This helps the server know how to process our information correctly.
//    It's similar to how you'd specify whether you're sending a text message or a photo in a messaging app.
/* ------------------------------------ - ----------------------------------- */
// interceptors.request:

//    Imagine having a personal assistant who checks all your outgoing mail before it's sent.
//    The request interceptor does this for your API calls. It can:
//      - Handle common problems (like wrong address, missing information)
//      - Format responses consistently
//      - Show appropriate error messages to users
