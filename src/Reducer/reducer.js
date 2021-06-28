export const initialState = {
  products: [],
  cart: [],
  wishlist: [],
  sortBy: null,
  fastDeliveryOnly: false,
  showInventoryAll: false,
  filterByCategories: [],
  priceSlider: 50000,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_PRODUCTS":
      console.log("Intialize", action.payload);
      return { ...state, products: action.payload };

    case "INITIALIZE_CART":
      return { ...state, cart: action.payload };

    case "INITIALIZE_WISHLIST":
      return { ...state, wishlist: action.payload };

    case "ADD_TO_CART":
      console.log(state.cart);
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case "ADD_TO_WISHLIST":
      console.log(state.wishlist);
      const isInWishlist = state.wishlist.find(
        (wishlistItem) => wishlistItem._id === action.payload._id
      );
      if (!isInWishlist) {
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      }
      return state;

    case "INCREMENT":
      const increasedQuantity = state.cart.map((cartItem) => {
        if (cartItem._id === action.payload) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: increasedQuantity };

    case "DECREMENT":
      const decreasedQuantity = state.cart
        .map((cartItem) => {
          if (cartItem._id === action.payload) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity > 0);

      return { ...state, cart: decreasedQuantity };

    case "REMOVE_CART_ITEM":
      const newCart = state.cart.filter(
        (cartItem) => cartItem._id !== action.payload
      );
      return { ...state, cart: newCart };

    case "REMOVE_WISHLIST_ITEM":
      const newWishlist = state.wishlist.filter(
        (wishItem) => wishItem._id !== action.payload
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
      const changedCart = state.cart.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );

      const isInWishList = state.wishlist.find(
        (wishlistItem) => wishlistItem._id === action.payload._id
      );

      if (!isInWishList) {
        return {
          ...state,
          cart: changedCart,
          wishlist: [...state.wishlist, action.payload],
        };
      }
      return { ...state, cart: changedCart };

    case "MOVE_TO_CART":
      console.log("entered");
      const changedWishlist = state.wishlist.filter(
        (wishlistItem) => wishlistItem._id !== action.payload._id
      );

      const isInCart = state.cart.find(
        (cartItem) => cartItem._id === action.payload._id
      );

      if (!isInCart) {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
          wishlist: changedWishlist,
        };
      }
      return { ...state, wishlist: changedWishlist };

    case "PRICE_RANGE":
      return { ...state, priceSlider: action.payload };

    case "FILTER_BY_CATEGORY":
      console.log(state.filterByCategories.includes(action.payload));
      console.log(action.payload);
      if (state.filterByCategories.includes(action.payload)) {
        console.log({
          ...state,
          filterByCategories: state.filterByCategories.filter(
            (category) => category !== action.payload
          ),
        });
        return {
          ...state,
          filterByCategories: state.filterByCategories.filter(
            (category) => category !== action.payload
          ),
        };
      }
      console.log({
        ...state,
        filterByCategories: state.filterByCategories.concat(action.payload),
      });
      return {
        ...state,
        filterByCategories: state.filterByCategories.concat(action.payload),
      };

    default:
      return state;
  }
};
