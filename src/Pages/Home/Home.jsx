import React from "react";
import hero_svg from "../../static/hero.svg";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.home}`}>
        <div className={`${styles.image_container}`}>
          {/* <div className={`${styles.image_container}`}>
          <img src={hero} alt="" className={`${styles.hero_image}`} />
        </div>
        <div className={`${styles.hero_text}`}>
          <h2>Explore the world of fitness with Fitverse</h2>
          <button>
            Explore Now <span> </span>
          </button>
        </div> */}
          {/* <img
          src="https://images.unsplash.com/photo-1580086319619-3ed498161c77?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          alt=""
          className={`${styles.hero_image}`}
        />
        <img
          src={hero_potrait}
          alt=""
          className={`${styles.hero_image_potrait}`}
        /> */}
          <img src={hero_svg} alt="" className={`${styles.hero_image}`} />
        </div>
        {/* <h1 className={`${styles.title}`}>Fitverse</h1> */}
        <div className={`${styles.hero_text_container}`}>
          <h1>Get fit at the comfort of your home</h1>
          <h4>with the huge variety of fitness equipmets.</h4>
          <button
            onClick={() => navigate("/products")}
            className={`pointer ${styles.button}`}
          >
            Shop Now <span class="material-icons-outlined">navigate_next</span>
          </button>
        </div>
      </div>
    </>
  );
};
