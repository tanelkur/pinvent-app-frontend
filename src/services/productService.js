import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/products/`;

//Create new product
export const createNewProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

//Get all products
export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//Delete a product
export const deleteSingleProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

//Get a product
export const getSingleProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

//Update product
export const updateSingleProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};
