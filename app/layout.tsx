import "./globals.css";

import localFont from "next/font/local";

const druk = localFont({
  src: "../public/fonts/DrukCyr-Heavy.woff",
  variable: "--font-druk",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${druk.variable} antialiased`}>{children}</body>
    </html>
  );
}
