export const initialState = {
  cart: [],
  wishlist: [],
  sortBy: null,
  fastDeliveryOnly: false,
  showInventoryAll: false,
  priceSlider: 1000,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case "ADD_TO_WISHLIST":
      const isInWishlist = state.wishlist.find(
        (wishlistItem) => wishlistItem.id === action.payload.id
      );
      if (!isInWishlist) {
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      }
      return state;

    case "INCREMENT":
      const increasedQuantity = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: increasedQuantity };

    case "DECREMENT":
      const decreasedQuantity = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity > 0);

      return { ...state, cart: decreasedQuantity };

    case "REMOVE_CART_ITEM":
      const newCart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      return { ...state, cart: newCart };

    case "REMOVE_WISHLIST_ITEM":
      const newWishlist = state.wishlist.filter(
        (wishItem) => wishItem.id !== action.payload
      );
      return { ...state, wishlist: newWishlist };

    case "SORT":
      return { ...state, sortBy: action.payload };

    case "CLEAR_SORT":
      return { ...state, sortBy: null };

    case "SHOW_OUT_OF_STOCK":
      return { ...state, showInventoryAll: !state.showInventoryAll };

    case "FAST_DELIVERY_ONLY":
      return { ...state, fastDeliveryOnly: !state.fastDeliveryOnly };

    case "MOVE_TO_WISHLIST":
      const changeCart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );

      const isInWishList = state.wishlist.find(
        (wishlistItem) => wishlistItem.id === action.payload.id
      );

      if (!isInWishList) {
        return {
          ...state,
          cart: changeCart,
          wishlist: [...state.wishlist, action.payload],
        };
      }
      return { ...state, cart: changeCart };

    case "PRICE_RANGE":
      return { ...state, priceSlider: action.payload };

    default:
      return state;
  }
};
