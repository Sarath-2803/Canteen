import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { PaymentProvider } from "@/contexts/PaymentContext";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"] });
// const geistMono = Geist_Mono({ subsets: ["latin"] });

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
      <body className={geist.className}>
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
