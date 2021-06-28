import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import styles from "./Nav.module.css";

export const Nav = () => {
  const [showModal, setShowModal] = useState(false);
  const { token, logout, user } = useAuth();
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
              <div onClick={() => setShowModal((item) => !item)}>
                <span class="material-icons-outlined">account_circle</span>
                Hi, {user?.name.split(" ")[0]}
              </div>

              // <button
              //   className={`${styles.btn_transparent} btn`}
              //   onClick={() => logout()}
              // >
              //   Logout
              // </button>
            )}
            {showModal && (
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
                  {/* <div>Hi, {user?.name.split(" ")[0]}</div>
                  <div>My Profile</div> */}
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
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
