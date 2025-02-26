import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import toast, { Toaster } from "react-hot-toast";
import { useApi } from "../Helpers/helpers";

const Home = () => {
  const { apiPost } = useApi(); // extracted apipost function from helpers.js

  const [product_name, setProductName] = useState("");
  const [product_category, setProductCategory] = useState("");
  const [product_price, setProductPrice] = useState("");

  const navigate = useNavigate(); // For redirection after creation

  const handleSubmit = async () => {
    if (!product_name || !product_category || !product_price) {
      toast.error("All fields are required !");
      return;
    }

    const productData = {
      productName: product_name,
      productCategory: product_category,
      productPrice: product_price,
    };

    const token = localStorage.getItem("accessTokenFlowKart");

    if (!token || token === "null") {
      toast.error("Authentication token missing. Please log in.");
      navigate("/login");
      return;
    }

    // try {
    //   const response = await fetch("http://localhost:8000/api/products", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`
    //     },
    //     body: JSON.stringify(productData),
    //     credentials: "include"
    //   });

    //   if(response.status===201)
    //   {
    //     toast.success("Product created successfully!!")
    //     setProductName("");
    //     setProductCategory("");
    //     setProductPrice("");
    //   }
    //   else if(response.status===401)
    //   {
    //     localStorage.setItem("accessTokenFlowKart",null);
    //     navigate("/login");
    //   }
    //   else
    //   {
    //     const error = await response.json();
    //     throw new Error(error.message);
    //   }

    // } catch (e) {
    //   toast.error(e.message);
    // }

    const response = await apiPost("/products", productData);

    if (response) {
      toast.success("Product created successfully!!");
      setProductName("");
      setProductCategory("");
      setProductPrice("");
    }
  };

  return (
    <div className="create_product">
      <div className="create_product_cont">
        <h1>Create Product</h1>

        <TextField
          id="product-name"
          label="Product Name"
          className="custom-textfield"
          placeholder="Enter product name (e.g., Apple iPhone 13)"
          variant="filled"
          type="text"
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          autoComplete="off"
        />

        <TextField
          id="product-category"
          label="Product Category"
          className="custom-textfield"
          placeholder="Enter product category (e.g., Electronics)"
          variant="filled"
          type="text"
          value={product_category}
          onChange={(e) => setProductCategory(e.target.value)}
          autoComplete="off"
        />

        <TextField
          id="product-price"
          label="Product Price"
          className="custom-textfield"
          placeholder="Enter product price (e.g., $999.99)"
          variant="filled"
          type="number"
          value={product_price}
          onChange={(e) => setProductPrice(e.target.value)}
          autoComplete="off"
        />

        <Button
          variant="outlined"
          className="logout-btn"
          onClick={handleSubmit}
        >
          Create
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
