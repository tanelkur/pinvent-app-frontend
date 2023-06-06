import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";
import { toast } from "react-toastify";
import ProductForm from "../../components/product/productForm/ProductForm";
import Loader from "../../components/loader/Loader";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isLoading = useSelector(selectIsLoading);
  const productInfo = useSelector(selectProduct);

  const [product, setProduct] = useState(productInfo);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  // get product on first load and if page is refreshed
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  // Set product if page is refreshed
  useEffect(() => {
    setProduct(productInfo);
    setImagePreview(
      productInfo && productInfo.image ? `${productInfo.image.filePath}` : null
    );
    setDescription(
      productInfo && productInfo.description ? productInfo.description : ""
    );
  }, [productInfo]);

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }

    //console.log(...formData);
    if (
      !product?.name ||
      !product?.category ||
      !product?.quantity ||
      !product?.price ||
      !description
    )
      return toast.error("Please fill all input fields");
    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/dashboard");
  };
  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default EditProduct;
