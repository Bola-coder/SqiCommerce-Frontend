/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

const ProductProvider = ({ children }) => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("Token is", token);

  const values = { products, setProducts, loading, setLoading };
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
        toast.success("Products fetched successfully");
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

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
