import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useApi } from "../Helpers/helpers";
import Lottie from "lottie-react";
import Loading from "../assets/Loading.json";

const ProtectedRoutes = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { apiGet } = useApi();

  useEffect(() => {
    const tokenCheck = async () => {
      const token = localStorage.getItem("accessTokenFlowKart");

      if (token) {
        // try {
        //   const response = await fetch("http://localhost:8000/api/currentUser", {
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${token}`,
        //     },
        //     credentials: "include",
        //   });

        //   if (response.status === 200) {
        //     // User is authenticated
        //     setIsAuthenticated(true);
        //   } else {
        //     // Token is invalid or expired
        //     localStorage.removeItem("accessTokenFlowKart");
        //     setIsAuthenticated(false);
        //   }
        // } catch (error) {
        //   console.error("Error during authentication check:", error);
        //   setIsAuthenticated(false);
        // }
        const response = await apiGet("/currentUser");

        if (response) {
          setIsAuthenticated(true);
        }
      } else {
        // No token found
        setIsAuthenticated(false);
      }
      setCheckingAuth(false);
    };

    tokenCheck();
  }, []);

  if (checkingAuth) {
    return (
      <div className="animeLoading">
        <Lottie
          animationData={Loading}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the protected routes
  return <Outlet />;
};

export default ProtectedRoutes;
