import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";
import styles from "./Nav.module.css";

export const Nav = () => {
  const [showModal, setShowModal] = useState(false);
  const { cart } = useData();
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className={`${styles.nav}`}>
      <div className={`pointer`} onClick={() => navigate("/")}>
        Fitverse
      </div>

      <ul className="flex items-center list-non-bullet">
        <li className={`pointer list-item-inline`}>
          <span
            onClick={() => navigate("/wishlist")}
            className="material-icons-outlined "
          >
            favorite_border
          </span>
          {/* <span class="badge-top">{state.wishlist.length}</span> */}
        </li>
        <li className={`pointer list-item-inline ${styles.badge_icon}`}>
          <span
            onClick={() => navigate("/cart")}
            class="material-icons-outlined"
          >
            shopping_cart
          </span>
          <span className={`${styles.badge}`}>{cart.length}</span>
        </li>
        <li className="list-item-inline">
          {!token ? (
            <button
              onClick={() => navigate("/login")}
              className={`${styles.btn} pointer`}
            >
              Login
            </button>
          ) : (
            // <div onClick={() => setShowModal((item) => !item)}>
            //   <span class="material-icons-outlined">account_circle</span>
            //   Hi, {user?.name.split(" ")[0]}
            // </div>

            <button
              className={`${styles.btn} pointer`}
              onClick={() => logout()}
            >
              Logout
            </button>
          )}
          {/* {showModal && (
              <div
                onClick={() => setShowModal(false)}
                className={`${styles.modal_account}`}
                // style={{ position: "fixed", inset: "0" }}
              >
                <div
                  onMouseLeave={() => setShowModal(false)}
                  style={
                    showModal
                      ? {
                          display: "",
                          position: "absolute",
                          top: "0rem",
                          right: "1rem",
                          backgroundColor: "black",
                          padding: "0.5rem 2rem",
                          // minHeight: "6rem",
                          fontWeight: "400",
                          fontSize: "1rem",
                        }
                      : { display: "none" }
                  }
                >
                  <button
                    className="btn"
                    onClick={() => {
                      logout();
                      setShowModal(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )} */}
        </li>
      </ul>
    </nav>
  );
};
