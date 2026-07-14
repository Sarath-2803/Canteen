"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

import { Payment } from "@/lib/types";
import { paymentsService } from "@/services/payments";

interface PaymentContextType {
  payments: Payment[];
  loading: boolean;

  createPayment: (
    orderId: string,
    amount: number
  ) => Promise<any>;

  verifyPayment: (
    payload: unknown
  ) => Promise<Payment>;

  getPaymentByOrderId: (
    orderId: string
  ) => Promise<Payment | null>;

  refreshPayments: () => Promise<void>;
}

const PaymentContext =
  createContext<PaymentContextType | null>(
    null
  );

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

        setPayments(
          response.data ?? []
        );
      } finally {
        setLoading(false);
      }
    }, []);

  const createPayment =
    useCallback(
      async (
        orderId: string,
        amount: number
      ) => {
        return paymentsService.createOrder(
          orderId,
          amount
        );
      },
      []
    );

  const verifyPayment =
    useCallback(
      async (
        payload: unknown
      ) => {
        const response =
          await paymentsService.verify(
            payload
          );

        const payment =
          response.data;

        setPayments(
          (prev) => [
            payment,
            ...prev.filter(
              (p) =>
                p.id !== payment.id
            ),
          ]
        );

        return payment;
      },
      []
    );

  const getPaymentByOrderId =
    useCallback(
      async (
        orderId: string
      ) => {
        try {
          const response =
            await paymentsService.getByOrderId(
              orderId
            );

          return (
            response.data ??
            null
          );
        } catch {
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
    useContext(
      PaymentContext
    );

  if (!context) {
    throw new Error(
      "usePayment must be used within PaymentProvider"
    );
  }

  return context;
}