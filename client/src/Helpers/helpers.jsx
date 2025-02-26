import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:8000/api";

const apiRequest = async (endpoint, method, body = null, navigate) => {
    
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const token = localStorage.getItem("accessTokenFlowKart");
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
      options.credentials = "include";
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    
    if (response.status===200 || response.status===201) 
    {
      return await response.json();
    } 
    else if (response.status === 401) 
    {
      toast.error("User Unauthorized !!")
      localStorage.removeItem("accessTokenFlowKart");
      navigate("/login");
    } 
    else 
    {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

export const useApi = () => {

  const navigate = useNavigate();

  return {
    apiPost: (endpoint, body) => apiRequest(endpoint, "POST", body, navigate),
    apiGet: (endpoint) => apiRequest(endpoint, "GET", null, navigate),
    apiPut: (endpoint, body) => apiRequest(endpoint, "PUT", body, navigate),
    apiDelete: (endpoint) => apiRequest(endpoint, "DELETE", null, navigate),
  };
};
