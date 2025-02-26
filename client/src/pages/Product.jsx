import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TextField from "@mui/material/TextField";
import toast, { Toaster } from "react-hot-toast";
import { useApi } from "../Helpers/helpers";
import "./style.css";

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const Product = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { apiGet , apiPut , apiDelete } = useApi();

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const productsPerPage = 5;

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [loading , setLoading] = useState(false);

  // Fetch products function (to be used inside deleteProduct too)
 useEffect( ()=>{
    const fetchProduct = async () => {

    // try {
    //   const response = await fetch(`http://localhost:8000/api/products?page=${currentPage}&limit=${productsPerPage}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     credentials: "include",
    //   });

    //   if (response.ok) {
    //     const pageDetails = await response.json();
    //     setProducts(pageDetails.data);
    //     setTotalPages(pageDetails.last_page);
    //   } else if (response.status === 401) {
    //     localStorage.setItem("accessTokenFlowKart", null);
    //     navigate("/login");
    //   } else {
    //     const error = await response.json();
    //     throw new Error(error.message);
    //   }
    // } catch (e) {
    //   toast.error(e.message);
    //   navigate("/");
    // }
    setLoading(true)
    const response = await apiGet(`/products?page=${currentPage}&limit=${productsPerPage}`)

    if(response)
    { 
        setProducts(response.data);
        setTotalPages(response.last_page);
    }
    setLoading(false);

  };

  fetchProduct();
}, [currentPage, navigate]);



  // Delete Product (API Delete)
  const deleteProduct = async (productId) => {
    const confirmation = window.confirm("Are you sure you want to delete this product?");
    if (!confirmation) return;


    // try {
    //   const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (response.ok) {
    //     toast.success("Product deleted successfully!");

    //     const updatedProducts = products.filter((product) => product.id !== productId);
    //     setProducts(updatedProducts);

    //     // Check if the page is empty after deletion
    //     if (updatedProducts.length === 0 && currentPage > 1) {
    //       navigate(`/product-list?page=1`);
    //     } else {
    //       fetchProducts(); // ✅ Now this will work
    //     }
    //   } else {
    //     throw new Error("Failed to delete product");
    //   }
    // } catch (e) {
    //   toast.error(e.message);
    // }

    const response = await apiDelete(`/products/${productId}`);

    if(response)
    {
        toast.success("Product deleted successfully!");

        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);

        // Check if the page is empty after deletion
        if (updatedProducts.length === 0 && currentPage > 1) {
          navigate(`/product-list?page=1`);
        } else {
          fetchProducts(); // ✅ Now this will work
        }
    }
  };

  // Modal Handlers
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleChange = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {

    // try {
    //   const response = await fetch(`http://localhost:8000/api/products/${selectedProduct.id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(selectedProduct),
    //   });

    //   if (response.ok) {
    //     toast.success("Product updated successfully!");
    //     closeModal();
    //     fetchProducts();
    //   } else {
    //     throw new Error("Failed to update product");
    //   }
    // } catch (e) {
    //   toast.error(e.message);
    // }

    const response = await apiPut(`/products/${selectedProduct.id}`,selectedProduct)

    if(response)
    {
        toast.success("Product updated successfully!");
        closeModal();
        fetchProducts();
    }

  };

  // Pagination Handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      navigate(`/product-list?page=${currentPage + 1}`);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      navigate(`/product-list?page=${currentPage - 1}`);
    }
  };

  // ✅ Return function remains unchanged
  return (
    <>
      <div className={`products ${isModalOpen ? 'blur' : ''}`}>
        <div className="head">
        <h2>Flow Products</h2>
        <button onClick={()=>{navigate("/")}} className="logout-btn">Add Product</button>
        </div>
        

        <div className="product-detail head">
          <h3 className="id">ID</h3>
          <h3 className="name">Name</h3>
          <h3 className="category">Category</h3>
          <h3 className="price">Price</h3>
          <h3 className="actions">Actions</h3>
        </div>
        {
          loading

          ?

          <Box sx={{ width: "80%" }}>
            
            <Skeleton animation="wave" sx={{ height: 50 }}/>
            <Skeleton animation="wave" sx={{ height: 50 }}/>
            <Skeleton animation="wave" sx={{ height: 50 }}/>
            <Skeleton animation="wave" sx={{ height: 50 }}/>
            <Skeleton animation="wave" sx={{ height: 50 }}/>
            
          </Box>

          :

          products.map((product, index) => (
            <div className="product-detail" key={product.id}>
              <p className="id">{(currentPage - 1) * productsPerPage + index + 1}</p>
              <p className="name">{product.productName}</p>
              <p className="category">{product.productCategory}</p>
              <p className="price">${product.productPrice}</p>
              <p className="actions">
                <BorderColorIcon className="edit" onClick={() => openModal(product)} />
                <HighlightOffIcon className="delete" onClick={() => deleteProduct(product.id)} />
              </p>
            </div>
          ))

        

      }

        <div className="page">
          {/* Previous Button - Only Active if Current Page > 1 */}
          <div 
            onClick={currentPage > 1 ? prevPage : null} 
            className={currentPage === 1 ? "disabled" : ""}
            >
            <ChevronLeftIcon />
          </div>

          <span> Page {currentPage} of {totalPages} </span>

          {/* Next Button - Active if (Page = 1) OR (Page = 2 with Page 3 available) */}
          <div 
            onClick={currentPage < totalPages ? nextPage : null} 
            className={(currentPage === totalPages || (currentPage === 2 && totalPages === 2)) ? "disabled" : ""}
            >
            <ChevronRightIcon />
          </div>
        </div>

      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Product</h2>

            <TextField 
              label="Name" 
              variant="standard"
              type="text" 
              name="productName" 
              value={selectedProduct?.productName || ""} 
              onChange={handleChange} />

            <TextField 
              label="Category" 
              variant="standard" 
              type="text" 
              name="productCategory" 
              value={selectedProduct?.productCategory || ""} 
              onChange={handleChange} />

            <TextField 
              label="Price" 
              variant="standard" 
              type="number" 
              name="productPrice" 
              value={selectedProduct?.productPrice || ""} 
              onChange={handleChange} />

            <div className="modal-buttons">
              <button className="save-btn" onClick={saveChanges}>Save</button>
              <button className="close-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default Product;
