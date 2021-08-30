import { Routes, Route, useLocation } from "react-router-dom";
import { Cart } from "./Pages/Cart/Cart";
import { Products } from "./Pages/Products/Products";
import "./styles.css";
import { Wishlist } from "./Pages/Wishlist/Wishlist";
import { Nav } from "./Components/Nav/Nav";
import { Login } from "./Pages/Login/Login";
import { Signup } from "./Pages/Signup/Signup";
import { PrivateRoute } from "./PrivateRoute";
import { ProductDetails } from "./Pages/ProductDetails/ProductDetails";
import { Home } from "./Pages/Home/Home";

export default function App() {
  const location = useLocation();
  return (
    <div className="App">
      {/* {location.pathname !== "/" && <Nav />} */}
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
