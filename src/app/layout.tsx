import type { Metadata } from "next";
import { CartProvider } from "@/contexts/CartContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { PaymentProvider } from "@/contexts/PaymentContext";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Nosh & go",
  description: "Order delicious food online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <PaymentProvider>{children}

                <Toaster
                  position="top-right"
                  richColors
                  closeButton
                  duration={2500}
                />
              </PaymentProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
