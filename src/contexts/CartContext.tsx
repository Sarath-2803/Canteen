"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import { CartItem } from "@/lib/types";
import { cartsService } from "@/services/carts";
import { useAuth } from "@/contexts/AuthContext";

interface CartContextType {
  cart: CartItem[];
  loading: boolean;

  addToCart: (
    itemId: string,
    quantity?: number
  ) => Promise<void>;

  removeFromCart: (
    cartItemId: string
  ) => Promise<void>;

  updateCartItem: (
    cartItemId: string,
    quantity: number
  ) => Promise<void>;

  refreshCart: () => Promise<void>;

  clearCart: () => void;

  cartCount: number;
}

const CartContext =
  createContext<CartContextType | null>(
    null
  );

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  const [cart, setCart] = useState<
    CartItem[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const refreshCart =
    useCallback(async () => {
      if (!user?.userId) {
        setCart([]);
        return;
      }

      try {
        setLoading(true);

        const cartResponse =
          await cartsService.getByUserId(
            user.userId
          );

        const cartData =
          cartResponse.data;

        // console.log("refreshCart cartData:", cartData);

        if (!cartData?.cartId) {
          setCart([]);
          return;
        }

        const itemsResponse =
          await cartsService.getItems(
            cartData.cartId
          );

        // console.log("refreshCart itemsResponse:", itemsResponse);

        setCart(
          itemsResponse.data ?? []
        );
      } catch (error) {
        console.error(
          "Failed to refresh cart:",
          error
        );

        setCart([]);
      } finally {
        setLoading(false);
      }
    }, [user?.userId]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart =
    useCallback(
      async (
        itemId: string,
        quantity = 1
      ) => {
        if (!user?.userId) {
          throw new Error(
            "User not authenticated"
          );
        }

        const cartResponse =
          await cartsService.getByUserId(
            user.userId
          );

        await cartsService.addItem(
          cartResponse.data.cartId,
          itemId,
          quantity
        );

        await refreshCart();
      },
      [user?.userId, refreshCart]
    );

  const updateCartItem =
    useCallback(
      async (
        cartItemId: string,
        quantity: number
      ) => {
        await cartsService.updateItem(
          cartItemId,
          quantity
        );

        await refreshCart();
      },
      [refreshCart]
    );

  const removeFromCart =
    useCallback(
      async (
        cartItemId: string
      ) => {
        // console.log("Removing cart item:", cartItemId);
        await cartsService.removeItem(
          cartItemId
        );

        await refreshCart();
      },
      [refreshCart]
    );

  const clearCart =
    useCallback(() => {
      setCart([]);
    }, []);

  const cartCount = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      ),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateCartItem,
      refreshCart,
      clearCart,
      cartCount,
    }),
    [
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateCartItem,
      refreshCart,
      clearCart,
      cartCount,
    ]
  );

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}