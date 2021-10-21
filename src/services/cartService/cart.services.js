import axios from "axios";
import { API_URL } from "../../util/Constants";

export function getCartProducts() {
  return axios.get(`${API_URL}/cart`);
}

export async function addToCartService(newCartItem, product, dispatch) {
  try {
    const response = await axios.post(`${API_URL}/cart`, newCartItem);
    if (response.status === 200) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  } catch (error) {
    console.log("Error adding product to cart..", error);
  }
}

export async function incrementQuantityService(id, quantity, dispatch) {
  try {
    const response = await axios.post(`${API_URL}/cart/${id}`, {
      quantity: quantity + 1,
    });
    if (response.status === 200) {
      dispatch({ type: "INCREMENT_QUANTITY", payload: id });
    }
  } catch (error) {
    console.log("Error incrementing quantity..", error);
  }
}

export async function decrementQuantityService(id, quantity, dispatch) {
  try {
    const response = await axios.post(`${API_URL}/cart/${id}`, {
      quantity: quantity - 1,
    });
    if (response.status === 200) {
      dispatch({ type: "DECREMENT_QUANTITY", payload: id });
    }
  } catch (error) {
    console.log("Error decrementing quantity..", error);
  }
}

export async function removeProductFromCartService(id, dispatch) {
  try {
    const response = await axios.delete(`${API_URL}/cart/${id}`);

    if (response.status === 200) {
      dispatch({ type: "REMOVE_CART_ITEM", payload: id });
    }
  } catch (error) {
    console.log("error while removing product from cart..", error);
  }
}

export async function moveToWishlistService(id, cartItem, dispatch) {
  try {
    const cartResponse = await axios.delete(`${API_URL}/cart/${id}`);

    const wishResponse = await axios.post(`${API_URL}/wishlist`, {
      product: { _id: id },
    });

    if (wishResponse.status === 200 && cartResponse.status === 200) {
      dispatch({ type: "MOVE_TO_WISHLIST", payload: cartItem });
    }
  } catch (error) {}
}

export async function clearCartService(dispatch) {
  try {
    const cartResponse = await axios.delete(`${API_URL}/cart/`);
    if (cartResponse.status === 200) {
      dispatch({ type: "CLEAR_CART" });
    }
  } catch (error) {}
}
