import { without } from "ramda";
import { create } from "zustand";

// `set` is Zustand's built-in tool to update the state
const useCartItemsStore = create((set) => ({
  cartItems: [],

  toggleIsInCart: (slug) =>
    set(({ cartItems }) => {
      // If it's already in the cart, remove it
      if (cartItems.includes(slug)) {
        return { cartItems: without([slug], cartItems) };
      }

      // Otherwise, add it
      return { cartItems: [slug, ...cartItems] };
    }),
}));

export default useCartItemsStore;
