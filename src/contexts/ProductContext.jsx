/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

const ProductProvider = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("Token is", token);

  useEffect(() => {
    if (token) {
      getAllProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getAllProducts = async () => {
    setLoading(true);
    axios
      .get(`${apiUrl}/products`, {
        headers: {
          authorization: `Bearer ${token} `,
        },
      })
      .then((res) => {
        console.log(res);
        setProducts(res.data.data.products);
        // toast.success("Products fetched successfully");
      })
      .catch((err) => {
        console.log(err);
        console.log("An Error occured", err.message);
        err?.response
          ? toast.error(err.response.data.message)
          : toast.error("An Error occured");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createNewProduct = async (product) => {
    console.log("Product in context", product);
    const requestData = new FormData();
    requestData.append("title", product.title);
    requestData.append("price", product.price);
    requestData.append("description", product.description);
    requestData.append("image", product.image);
    console.log(requestData);
    setLoading(true);
    axios
      .post(`${apiUrl}/products`, requestData, {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        console.log(res.data);
        toast.success("Product created successfully");
        await getAllProducts();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        console.log("An error occured", err.message);
        err.response.data.message
          ? toast.error(err.response.data.message)
          : toast.error("An error occured");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const values = {
    products,
    setProducts,
    loading,
    setLoading,
    createNewProduct,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
