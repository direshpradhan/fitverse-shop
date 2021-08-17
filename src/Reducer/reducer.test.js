import { reducer } from "./reducer";

describe("cart test", () => {
  test("should add product to cart", () => {
    const initialState = {
      cart: [],
    };
    const action = {
      type: "ADD_TO_CART",
      payload: {
        _id: "123",
        name: "Product",
      },
    };

    const finalState = {
      cart: [
        {
          _id: "123",
          name: "Product",
          quantity: 1,
        },
      ],
    };

    const state = reducer(initialState, action);
    expect(state).toEqual(finalState);
  });

  test("should increment product quantity in cart", () => {
    const initialState = {
      cart: [
        {
          _id: "123",
          name: "Product 1",
          quantity: 2,
        },
        {
          _id: "124",
          name: "Product 2",
          quantity: 3,
        },
      ],
    };

    const action = {
      type: "INCREMENT_QUANTITY",
      payload: "123",
    };

    const finalState = {
      cart: [
        {
          _id: "123",
          name: "Product 1",
          quantity: 3,
        },
        {
          _id: "124",
          name: "Product 2",
          quantity: 3,
        },
      ],
    };

    const state = reducer(initialState, action);
    expect(state).toEqual(finalState);
  });

  test("should decrement product quantity in cart", () => {
    const initialState = {
      cart: [
        {
          _id: "123",
          name: "Product 1",
          quantity: 2,
        },
        {
          _id: "124",
          name: "Product 2",
          quantity: 3,
        },
      ],
    };

    const action = {
      type: "DECREMENT_QUANTITY",
      payload: "123",
    };

    const finalState = {
      cart: [
        {
          _id: "123",
          name: "Product 1",
          quantity: 1,
        },
        {
          _id: "124",
          name: "Product 2",
          quantity: 3,
        },
      ],
    };

    const state = reducer(initialState, action);
    expect(state).toEqual(finalState);
  });

  test("should remove product from cart", () => {
    const initialState = {
      cart: [
        {
          _id: "123",
          name: "Product 1",
          quantity: 2,
        },
        {
          _id: "124",
          name: "Product 2",
          quantity: 3,
        },
      ],
    };

    const action = {
      type: "REMOVE_CART_ITEM",
      payload: "124",
    };

    const finalState = {
      cart: [
        {
          _id: "123",
          name: "Product 1",
          quantity: 2,
        },
      ],
    };

    const state = reducer(initialState, action);
    expect(state).toEqual(finalState);
  });

  test("should move product from wishlist to cart", () => {
    const initialState = {
      cart: [
        {
          _id: "123",
          name: "Product 1",
          quantity: 2,
        },
        {
          _id: "124",
          name: "Product 2",
          quantity: 3,
        },
      ],
      wishlist: [
        {
          _id: "125",
          name: "Product 3",
        },
        {
          _id: "126",
          name: "Product 4",
        },
      ],
    };

    const action = {
      type: "MOVE_TO_CART",
      payload: {
        _id: "126",
        name: "Product 4",
      },
    };

    const finalState = {
      cart: [
        {
          _id: "123",
          name: "Product 1",
          quantity: 2,
        },
        {
          _id: "124",
          name: "Product 2",
          quantity: 3,
        },
        {
          _id: "126",
          name: "Product 4",
          quantity: 1,
        },
      ],
      wishlist: [
        {
          _id: "125",
          name: "Product 3",
        },
      ],
    };

    const state = reducer(initialState, action);
    expect(state).toEqual(finalState);
  });
});

describe("wishlist test", () => {
  test("should add product to wishlist", () => {
    const initialState = {
      wishlist: [],
    };

    const action = {
      type: "ADD_TO_WISHLIST",
      payload: {
        _id: "123",
        name: "Product 1",
      },
    };

    const finalState = {
      wishlist: [
        {
          _id: "123",
          name: "Product 1",
        },
      ],
    };

    const state = reducer(initialState, action);
    expect(state).toEqual(finalState);
  });

  test("should remove product from wishlist", () => {
    const initialState = {
      wishlist: [
        {
          _id: "123",
          name: "Product 1",
        },
        {
          _id: "124",
          name: "Product 2",
        },
      ],
    };

    const action = {
      type: "REMOVE_WISHLIST_ITEM",
      payload: "123",
    };

    const finalState = {
      wishlist: [
        {
          _id: "124",
          name: "Product 2",
        },
      ],
    };

    const state = reducer(initialState, action);
    expect(state).toEqual(finalState);
  });

  test("should move product from cart to wishlist", () => {
    const initialState = {
      cart: [
        {
          _id: "123",
          name: "Product 1",
          quantity: 2,
        },
        {
          _id: "124",
          name: "Product 2",
          quantity: 3,
        },
      ],
      wishlist: [
        {
          _id: "125",
          name: "Product 3",
        },
        {
          _id: "126",
          name: "Product 4",
        },
      ],
    };

    const action = {
      type: "MOVE_TO_WISHLIST",
      payload: {
        _id: "123",
        name: "Product 1",
        quantity: 2,
      },
    };

    const finalState = {
      cart: [
        {
          _id: "124",
          name: "Product 2",
          quantity: 3,
        },
      ],
      wishlist: [
        {
          _id: "125",
          name: "Product 3",
        },
        {
          _id: "126",
          name: "Product 4",
        },
        {
          _id: "123",
          name: "Product 1",
        },
      ],
    };

    const state = reducer(initialState, action);
    expect(state).toEqual(finalState);
  });
});
