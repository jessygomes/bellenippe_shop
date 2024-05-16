import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar/Navbar";
import ToastProvider from "@/lib/providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Belle Nippe",
  description: "Belle Nippe - Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-grid-small-black/[0.1]">
        <ClerkProvider>
          <div className="fixed top-0 z-30 w-full flex justify-center">
            <ToastProvider />
            <Navbar />
          </div>{" "}
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
