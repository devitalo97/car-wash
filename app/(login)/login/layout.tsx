import type { Metadata } from "next";
import "@/app/ui/globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full">
      <body className={"h-full"}>{children}</body>
    </html>
  );
}
