import { assoc, omit } from "ramda"; // Add evolve here
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartItemsStore = create(
  persist(
    (set) => ({
      cartItems: {},
      setSelectedQuantity: (slug, quantity) =>
        set(({ cartItems }) => {
          if (quantity <= 0) {
            return { cartItems: omit([slug], cartItems) };
          }

          return { cartItems: assoc(slug, quantity, cartItems) };
        }),
      removeCartItem: (slug) =>
        set(({ cartItems }) => ({ cartItems: omit([slug], cartItems) })),
      clearCart: () => set({ cartItems: {} }), // 👈 Add this line
    }),
    { name: "cart-items-store" }
  )
);
export default useCartItemsStore;
