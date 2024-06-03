import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AuthProvider from "./contexts/AuthContext";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductProvider from "./contexts/ProductContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <ProductProvider>
            <Nav />
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
            <ToastContainer />
          </ProductProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
