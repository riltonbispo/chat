import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ProviderUserContext } from "@/userContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bigu Chat",
  description: "Chat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderUserContext>{children}</ProviderUserContext>
      </body>
    </html>
  );
}
