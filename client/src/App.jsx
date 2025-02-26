import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} /> {/* Default route for "/" */}
          <Route path="product-list" element={<Product />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
