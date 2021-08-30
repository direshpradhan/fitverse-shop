import { useNavigate, useParams } from "react-router-dom";
import { ProductCard } from "../../Components/ProductCard/ProductCard";
import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";
import axios from "axios";
import styles from "./ProductDetails.module.css";
import {
  addToCartService,
  addToWishlistService,
  removeFromWishlistService,
} from "../../services";

export const ProductDetails = (_) => {
  const { productId } = useParams();
  const { state, products, dispatch } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();
  console.log(token);
  console.log("id", productId);
  console.log("array", products);
  const product = products.find((product) => product._id === productId);
  const relatedProducts = products.filter(
    (item) => item.category === product.category && item._id !== product._id
  );
  const isInCart = state.cart.find((cartItem) => cartItem._id === product._id);
  console.log(relatedProducts);

  const addToCart = async (id) => {
    try {
      console.log(id);
      const newCartItem = { product: { _id: id } };
      console.log(token);
      // toastId.current = toast.info("Adding to Cart...");
      if (token) {
        // const response = await axios.post(
        //   "https://Fitverse-Shop-Backend.pdiresh.repl.co/cart",
        //   newCartItem,
        //   { headers: { authorization: `Bearer ${token}` } }
        // );
        // console.log(response);
        // if (response.status === 200) {
        //   // toast.dismiss(toastId.current);
        //   dispatch({ type: "ADD_TO_CART", payload: product });
        //   // toast.success("Added to Cart!!");
        // }
        addToCartService(newCartItem, product, dispatch);
      } else {
        console.log("login");
        navigate("/login");
      }
    } catch (error) {
      console.log(id);
      console.log(error.message);
    }
  };

  const addToWishlist = async (id) => {
    try {
      console.log("wishlist");
      const newWishlistItem = { product: { _id: id } };
      if (token) {
        // const response = await axios.post(
        //   "https://Fitverse-Shop-Backend.pdiresh.repl.co/wishlist",
        //   newWishlistItem,
        //   { headers: { authorization: `Bearer ${token}` } }
        // );
        // if (response.status === 200) {
        //   return dispatch({ type: "ADD_TO_WISHLIST", payload: product });
        // }
        // return "";
        return addToWishlistService(newWishlistItem, product, dispatch);
      }
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      // const response = await axios.delete(
      //   `https://Fitverse-Shop-Backend.pdiresh.repl.co/wishlist/${id}`,
      //   { headers: { authorization: `Bearer ${token}` } }
      // );
      // if (response.status === 200) {
      //   dispatch({
      //     type: "REMOVE_WISHLIST_ITEM",
      //     payload: id,
      //   });
      // }
      removeFromWishlistService(id, dispatch);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {product !== undefined && (
        <div className={`${styles.main_container}`}>
          <div className={`${styles.image_container} flex`}>
            <img
              className={`${styles.image} `}
              src={product.image}
              alt="productImage"
            />
          </div>
          <div className={`${styles.product_info}`}>
            <div className={`${styles.name}`}>
              <h3 className={`${styles.title}`}>{product.name}</h3>
              <p className={`${styles.brand}`}>
                by <span>{product.brand}</span>
              </p>
            </div>
            <div className={`${styles.pricing}`}>
              <span>&#8377;{product.discountedPrice}</span>{" "}
              <span>&#8377;{product.actualPrice}</span>{" "}
              <span>({product.discount})</span>
            </div>
            <div>
              <p>Available Offers:</p>
              <div className={`${styles.offers}`}>
                {product.offers.map((offer) => (
                  <div className="flex items-center">
                    <img
                      className={`${styles.img_tag}`}
                      src="https://rukminim1.flixcart.com/www/40/40/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                      alt=""
                    />
                    <div>{offer}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.button_container} flex`}>
              {!isInCart ? (
                product.inStock ? (
                  <button
                    className={`${styles.cart_button} flex justify-center items-center pointer`}
                    onClick={() => addToCart(product._id)}
                  >
                    <span class="material-icons-outlined">shopping_cart</span>
                    Add to cart
                  </button>
                ) : (
                  <button
                    className={`${styles.cart_button} flex justify-center items-center pointer`}
                    disabled
                  >
                    <span class="material-icons-outlined">shopping_cart</span>
                    Out of Stock
                  </button>
                )
              ) : (
                <button
                  onClick={() => navigate("/cart")}
                  className={`${styles.cart_button} flex justify-center items-center pointer`}
                >
                  <span class="material-icons-outlined">shopping_cart</span>
                  Go to Cart
                </button>
              )}

              {!state.wishlist?.find(
                (wishlistItem) => wishlistItem._id === product._id
              ) ? (
                <button
                  className={`${styles.wishlist_button} flex justify-center items-center pointer`}
                  onClick={() => addToWishlist(product._id)}
                >
                  <span className={`${styles.pointer} material-icons-outlined`}>
                    favorite_border
                  </span>
                  Add to Wishlist
                </button>
              ) : (
                <button
                  className={`${styles.wishlist_button} flex justify-center items-center pointer`}
                  onClick={() => removeFromWishlist(product._id)}
                >
                  <span
                    className={`${styles.pointer} material-icons-outlined`}
                    style={{ color: "red" }}
                  >
                    favorite
                  </span>
                  Remove from Wishlist
                </button>
              )}
            </div>
            <div>{/* <p>Description:</p> */}</div>
          </div>
        </div>
      )}
      <h3 className={`${styles.similar_products_title}`}>Similar Products:</h3>
      <div className={`${styles.similar_products} flex`}>
        {relatedProducts.map((product) => {
          return (
            <div className={`${styles.card_container}`}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
