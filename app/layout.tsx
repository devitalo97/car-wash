import type { Metadata } from "next";
import "./ui/globals.css";
import { inter } from "./ui/fonts";
import NavBar from "./ui/navbar";
import Footer from "./ui/footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
