import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moto Nautika AI Assistant",
  description: "Napredni AI asistent za Moto Nautika d.o.o.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sl">
      <body className={`${inter.className} font-sans antialiased`}>{children}</body>
    </html>
  );
}
