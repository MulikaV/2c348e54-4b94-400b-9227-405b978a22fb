import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "Showcasing my work as a Frontend/Full-Stack Developer",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-slate-800 min-h-screen`}>{children}</body>
    </html>
  );
}