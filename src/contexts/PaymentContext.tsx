"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

import { Payment, RazorpayOrderResponse, VerifyPaymentRequest } from "@/lib/types";
import { paymentsService } from "@/services/payments";

interface PaymentContextType {
  payments: Payment[];
  loading: boolean;

  createPayment: (
    orderId: string,
    amount: number
  ) => Promise<RazorpayOrderResponse>;

  verifyPayment: (
    payload: VerifyPaymentRequest
  ) => Promise<Payment>;

  getPaymentByOrderId: (
    orderId: string
  ) => Promise<Payment | null>;

  refreshPayments: () => Promise<void>;
}

const PaymentContext =
  createContext<PaymentContextType | null>(null);

export function PaymentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [payments, setPayments] =
    useState<Payment[]>([]);

  const [loading, setLoading] =
    useState(false);

  const refreshPayments =
    useCallback(async () => {
      try {
        setLoading(true);

        const response =
          await paymentsService.getAll();

        setPayments(response.data ?? []);
      } catch (error) {
        console.error(
          "Failed to fetch payments:",
          error
        );
      } finally {
        setLoading(false);
      }
    }, []);

 const createPayment = useCallback(
    async (
        orderId: string,
        amount: number
    ): Promise<RazorpayOrderResponse> => {
      console.log("Creating payment for order:", orderId, "with amount:", amount);
        const response =
            await paymentsService.createOrder(
                orderId,
                amount
            );

        return response.data;
    },
    []
);

  const verifyPayment =
    useCallback(
      async (
        payload: VerifyPaymentRequest
      ): Promise<Payment> => {
        const response =
          await paymentsService.verify(
            payload
          );

        const payment =
          response.data;

        setPayments((prev) => [
          payment,
          ...prev.filter(
            (p) => p.id !== payment.id
          ),
        ]);

        return payment;
      },
      []
    );

  const getPaymentByOrderId =
    useCallback(
      async (
        orderId: string
      ): Promise<Payment | null> => {
        try {
          const response =
            await paymentsService.getByOrderId(
              orderId
            );

          return response.data ?? null;
        } catch (error) {
          console.error(
            "Failed to fetch payment:",
            error
          );

          return null;
        }
      },
      []
    );

  const value = useMemo(
    () => ({
      payments,
      loading,
      createPayment,
      verifyPayment,
      getPaymentByOrderId,
      refreshPayments,
    }),
    [
      payments,
      loading,
      createPayment,
      verifyPayment,
      getPaymentByOrderId,
      refreshPayments,
    ]
  );

  return (
    <PaymentContext.Provider
      value={value}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context =
    useContext(PaymentContext);

  if (!context) {
    throw new Error(
      "usePayment must be used within PaymentProvider"
    );
  }

  return context;
}