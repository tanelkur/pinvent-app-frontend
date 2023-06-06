import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/register`,
      userData,
      { withCredentials: true }
    ); // Kui App.js paneme default,
    // siis pole vaja siin panna withCredentials
    if (response.statusText === "OK") {
      toast.success("Registered successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/login`,
      userData
      // { withCredentials: true }
    ); // Kui App.js paneme default,
    // siis pole vaja siin panna withCredentials
    if (response.statusText === "OK") {
      toast.success("Logged in successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const logoutUser = async () => {
  try {
    await axios.get(
      `${BACKEND_URL}/api/users/logout`
      // { withCredentials: true }
    ); // Kui App.js paneme default,
    // siis pole vaja siin panna withCredentials
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/forgotpassword`,
      userData
      // { withCredentials: true }
    ); // Kui App.js paneme default,
    // siis pole vaja siin panna withCredentials
    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/users/resetpassword/${resetToken}`,
      userData
      // { withCredentials: true }
    ); // Kui App.js paneme default,
    // siis pole vaja siin panna withCredentials
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getLoginStatus = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/users/loggedin`
      // { withCredentials: true }
    ); // Kui App.js paneme default,
    // siis pole vaja siin panna withCredentials)
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/users/getuser`
      // { withCredentials: true }
    ); // Kui App.js paneme default,
    // siis pole vaja siin panna withCredentials)
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updateProfile = async (FormData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/updateuser`,
      FormData
      // { withCredentials: true }
    ); // Kui App.js paneme default,
    // siis pole vaja siin panna withCredentials)
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const changePassword = async (FormData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/changepassword`,
      FormData
      // { withCredentials: true }
    ); // Kui App.js paneme default,
    // siis pole vaja siin panna withCredentials)
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
