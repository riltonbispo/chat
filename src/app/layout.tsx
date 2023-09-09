import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ProviderUserContext } from "@/context/userContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bigu Chat",
  description: "Chat",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
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
