import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";
import styles from "./Nav.module.css";

export const Nav = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  // const { state } = useData();
  return (
    <nav className={`${styles.nav} `}>
      <div
        className={`${styles.pointer} nav-brand`}
        onClick={() => navigate("/")}
      >
        Fitverse
      </div>
      <div>
        <ul className="flex flex-center list-non-bullet">
          {/* <li className="list-item-inline">
          <a className="link " href="/">
            Home
          </a>
        </li> */}
          <li className={`${styles.pointer} list-item-inline`}>
            <span
              onClick={() => navigate("/wishlist")}
              className="material-icons-outlined "
            >
              favorite_border
            </span>
            {/* <span class="badge-top">{state.wishlist.length}</span> */}
          </li>
          <li className={`${styles.pointer} list-item-inline`}>
            <span
              onClick={() => navigate("/cart")}
              class="material-icons-outlined"
            >
              shopping_cart
            </span>
          </li>
          <li className="list-item-inline">
            {!login ? (
              // <Link style={{ color: "white" }} to="/login">
              <button
                onClick={() => navigate("/login")}
                className={`${styles.btn_transparent} btn`}
              >
                Login
              </button>
            ) : (
              // </Link>
              <button
                className={`${styles.btn_transparent} btn`}
                onClick={logout}
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
