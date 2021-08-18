import axios from "axios";
import { API_URL } from "../../util/Constants";

export function getWishlistProducts() {
  return axios.get(`${API_URL}/wishlist`);
}

export async function addToWishlistService(newWishlistItem, product, dispatch) {
  try {
    const response = await axios.post(`${API_URL}/wishlist`, newWishlistItem);
    if (response.status === 200) {
      return dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
  } catch (error) {
    console.log("error adding product to wishlist...", error);
  }
}

export async function removeFromWishlistService(id, dispatch) {
  try {
    const response = await axios.delete(`${API_URL}/wishlist/${id}`);
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_WISHLIST_ITEM",
        payload: id,
      });
    }
  } catch (error) {
    console.log("error removing product from wishlist..", error);
  }
}

export async function moveToCartService(id, wishlistItem, dispatch) {
  try {
    const wishResponse = await axios.delete(`${API_URL}/wishlist/${id}`);
    const cartResponse = await axios.post(`${API_URL}/cart`, {
      product: { _id: id, quantity: 1 },
    });
    if (wishResponse.status === 200 && cartResponse.status === 200) {
      dispatch({ type: "MOVE_TO_CART", payload: wishlistItem });
    }
  } catch (error) {}
}
