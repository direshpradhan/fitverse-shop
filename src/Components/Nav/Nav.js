import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import styles from "./Nav.module.css";

export const Nav = () => {
  const [showModal, setShowModal] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className={`${styles.nav} `}>
      <div className={`${styles.pointer}`} onClick={() => navigate("/")}>
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
            {!token ? (
              // <Link style={{ color: "white" }} to="/login">
              <button
                onClick={() => navigate("/login")}
                className={`${styles.btn_transparent} btn`}
              >
                Login
              </button>
            ) : (
              // </Link>
              <div>
                <span
                  onClick={() => setShowModal((item) => !item)}
                  class="material-icons-outlined"
                >
                  account_circle
                </span>
                <div
                  style={
                    showModal
                      ? {
                          display: "",
                          position: "fixed",
                          right: "1rem",
                          backgroundColor: "white",
                          padding: "0.5rem 1rem",
                          fontWeight: "400",
                          fontSize: "1rem",
                        }
                      : { display: "none" }
                  }
                >
                  <div>Hi, User</div>
                  <div>My account</div>
                  <div
                    onClick={() => {
                      logout();
                      setShowModal(false);
                    }}
                  >
                    Logout
                  </div>
                </div>
              </div>

              // <button
              //   className={`${styles.btn_transparent} btn`}
              //   onClick={() => logout()}
              // >
              //   Logout
              // </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
