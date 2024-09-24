import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from '../components/features/header'
import "./globals.css";

const isocpeur = localFont({
  src: "./fonts/ISOCPEUR.ttf",
  variable: "--font-isocpeur"
});

const isocp = localFont({
  src: "./fonts/ISOCP Regular.ttf",
  variable: "--font-isocp"
});

const isocpeurItalic = localFont({
  src: "./fonts/ISOCTEURItalic.ttf",
  variable: "--font-isocpeur-italic"
});

export const metadata: Metadata = {
  title: "Portfolizer",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${isocpeur.variable} ${isocp.variable} ${isocpeurItalic.variable} font-[family-name:var(--font-isocpeur)] flex flex-col min-h-[99vh]`}>
        <Header />
        {children}
        <footer className="grid place-items-center border-gray-500 border-t h-12 mt-auto">Created by Vladyslav Hryhola</footer>
      </body>
    </html>
  );
}
