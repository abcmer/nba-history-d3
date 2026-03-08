import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NBA History",
  description: "NBA Championship Teams Over Time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
