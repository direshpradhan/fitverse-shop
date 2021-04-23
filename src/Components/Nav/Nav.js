import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export const Nav = () => {
  const { login, logout } = useAuth();
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        E-commerce
      </Link>
      <ul className="list-non-bullet">
        {/* <li className="list-item-inline">
          <a className="link " href="/">
            Home
          </a>
        </li> */}
        <li className="list-item-inline">
          <Link
            // className="badge-icon"
            style={{ color: "white" }}
            to="/wishlist"
          >
            <span class="material-icons-outlined icon">favorite_border</span>
            {/* <span class="badge-top"></span> */}
          </Link>
        </li>
        <li className="list-item-inline">
          <Link style={{ color: "white" }} to="/cart">
            <span class="material-icons-outlined">shopping_cart</span>
          </Link>
        </li>
        <li className="list-item-inline">
          {!login ? (
            <Link style={{ color: "white" }} to="/login">
              <button className="btn btn-sm">Login</button>
            </Link>
          ) : (
            <button className="btn btn-sm" onClick={logout}>
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};
