import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harry Kane — The Pursuit of Gold",
  description:
    "An unofficial interactive documentary about Harry Kane’s career.",
  metadataBase: new URL("https://harry-kane-ballon-dor.vercel.app"),
  openGraph: {
    title: "Harry Kane — The Pursuit of Gold",
    description: "One career. Countless goals. A legacy still being written.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
