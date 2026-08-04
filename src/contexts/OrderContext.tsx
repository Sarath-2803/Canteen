"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";

import { ordersService } from "@/services/orders";

import {
  CartItem,
  Order,
  OrderStatus,
} from "@/lib/types";

interface OrderContextType {
  orders: Order[];
  loading: boolean;

  page: number;
  totalPages: number;

  currentOrderItems: CartItem[];
  currentOrderTotal: number;

  checkout: (
    paymentMethod: string
  ) => Promise<Order>;

  updateOrderStatus: (
    orderId: string,
    status: OrderStatus
  ) => Promise<void>;

  cancelOrder: (
    orderId: string
  ) => Promise<void>;

  deleteOrder: (
    orderId: string
  ) => Promise<void>;

  getOrderById: (
    orderId: string
  ) => Order | undefined;

  refreshOrders: (
    page?: number
  ) => Promise<void>;

  refreshAllOrders: (
    page?: number
  ) => Promise<void>;
}

const OrderContext =
  createContext<OrderContextType | null>(
    null
  );

export function OrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { cart, refreshCart } = useCart();

  const [orders, setOrders] = useState<
    Order[]
  >([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] =
    useState(false);

  const currentOrderItems = useMemo(
    () => cart,
    [cart]
  );

  const currentOrderTotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum +
          (item.item?.price ?? 0) *
          item.quantity,
        0
      ),
    [cart]
  );

  const refreshOrders =
    useCallback(
      async (
        pageNumber = page
      ) => {
        if (
          !user?.userId
        ) {
          setOrders([]);
          return;
        }

        try {
          setLoading(true);

          const response =
            await ordersService.getByUserId(
              user.userId,
              pageNumber
            );

          const paginatedOrders = response.data;

          setOrders(
            paginatedOrders.data
          );

          setPage(
            paginatedOrders.page
          );

          setTotalPages(
            paginatedOrders.totalPages
          );

        } catch (
        error
        ) {
          console.error(
            "Failed to fetch orders",
            error
          );
        } finally {
          setLoading(false);
        }
      },
      [
        user?.userId,
        page
      ]
    );

    const refreshAllOrders = useCallback(
  async (pageNumber = page) => {
    try {
      setLoading(true);

      const response = await ordersService.getAll(pageNumber);

      const result = response.data;

      setOrders(result.data);
      setPage(result.page);
      setTotalPages(result.totalPages);
    } finally {
      setLoading(false);
    }
  },
  [page]
);

  const checkout =
    useCallback(
      async (
        paymentMethod: string
      ) => {
        if (!user?.userId) {
          throw new Error(
            "User not authenticated"
          );
        }

        try {
          setLoading(true);

          const response =
            await ordersService.checkout(
              user.userId,
              paymentMethod
            );

          const order =
            response.data;

          // console.log("Order created:", order);

          setOrders((prev) => [
            order,
            ...prev,
          ]);

          await refreshCart();

          return order;
        } finally {
          setLoading(false);
        }
      },
      [
        user?.userId,
        refreshCart,
      ]
    );

  const updateOrderStatus =
    useCallback(
      async (
        orderId: string,
        status: OrderStatus
      ) => {
        await ordersService.updateStatus(
          orderId,
          status
        );

        setOrders((prev) =>
          prev.map((order) =>
            order.orderId === orderId
              ? {
                ...order,
                status,
              }
              : order
          )
        );
      },
      []
    );

  const cancelOrder =
    useCallback(
      async (
        orderId: string
      ) => {
        await updateOrderStatus(
          orderId,
          "CANCELLED"
        );
      },
      [
        updateOrderStatus,
      ]
    );

  const deleteOrder =
    useCallback(
      async (
        orderId: string
      ) => {
        await ordersService.delete(
          orderId
        );

        setOrders((prev) =>
          prev.filter(
            (order) =>
              order.orderId !==
              orderId
          )
        );
      },
      []
    );

  const getOrderById =
    useCallback(
      (
        orderId: string
      ) =>
        orders.find(
          (order) =>
            order.orderId ===
            orderId
        ),
      [orders]
    );

  const value = useMemo(
    () => ({
      orders,
      page,
      totalPages,
      loading,

      currentOrderItems,
      currentOrderTotal,

      checkout,
      updateOrderStatus,
      cancelOrder,
      deleteOrder,
      getOrderById,
      refreshOrders,
      refreshAllOrders
    }),
    [
      orders,
      loading,
      currentOrderItems,
      currentOrderTotal,
      checkout,
      updateOrderStatus,
      cancelOrder,
      deleteOrder,
      getOrderById,
      refreshOrders,
      refreshAllOrders
    ]
  );

  return (
    <OrderContext.Provider
      value={value}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context =
    useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrder must be used within OrderProvider"
    );
  }

  return context;
}