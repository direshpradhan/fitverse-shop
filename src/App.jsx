import { Routes, Route } from "react-router-dom";
import { Cart } from "./Pages/Cart/Cart";
import { Products } from "./Pages/Products/Products";
import "./styles.css";
import { Wishlist } from "./Pages/Wishlist/Wishlist";
import { Nav } from "./Components/Nav/Nav";
import { Login } from "./Pages/Login/Login";
import { Signup } from "./Pages/Signup/Signup";
import { PrivateRoute } from "./PrivateRoute";

export default function App() {
  return (
    <div className="App">
      <Nav />

      <Routes>
        <Route path="/" element={<Products />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
