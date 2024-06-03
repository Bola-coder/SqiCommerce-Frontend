import { useState } from "react";
import axios from "axios";
const CreateProduct = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    // Add your logic here to handle the form submission
    console.log(product);
    axios
      .post(`${apiUrl}/products`, product, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("Product created successfully");
        setProduct({
          title: "",
          price: "",
          description: "",
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("An error occured", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <label className="">
          Title:
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Please wait" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
