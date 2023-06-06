import React, { useEffect } from "react";
import "./ProductDetail.scss";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImage } from "../../loader/Loader";
import DOMPurify from "dompurify";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out of Stock</span>;
  };

  const dateCreated = new Date(product?.createdAt);
  const dateUpdated = new Date(product?.updatedAt);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isLoggedIn, isError, message, id]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Product Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImage />}
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No set for this product</p>
              )}
            </Card>
            <h4>Product Availability: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name:</span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr;SKU:</b> {product.sku}
            </p>
            <p>
              <b>&rarr;Category:</b> {product.category}
            </p>
            <p>
              <b>&rarr;Price:</b> {product.price}€
            </p>
            <p>
              <b>&rarr;Quantity:</b> {product.quantity}
            </p>
            <p>
              <b>&rarr;Total Value:</b> {product.price * product.quantity}€
            </p>
            <hr />
            <p>
              <b>&rarr;Description:</b>
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>{" "}
            <hr />
            <code className="--color-dark">
              Created on: {dateCreated.toLocaleString()}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {dateUpdated.toLocaleString()}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
