import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/assets/css/admin-stylesheet.css'
import '../../public/assets/css/bootstrap.min.css'
import '../../public/assets/css/stylesheet.css'
import '../../public/assets/css/seller-stylesheet.css'
import '../../public/assets/css/loader.css'
import Script from "next/script";
import { Suspense } from 'react'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Srutle.com",
  description: "Strutle ecommerce project"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://icons.getbootstrap.com/assets/font/bootstrap-icons.min.css" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
          rel="stylesheet" />
        <link rel="icon" href="/icon.png" />
      </head>
      <body className={`body-slide body-pd ${geistSans.variable} ${geistMono.variable}`} cz-shortcut-listen="true" data-sidebar-behavior="sticky">
        <div className="loader-new">
          <svg viewBox="0 0 1320 300">
            <text x="50%" y="50%" dy=".35em" textAnchor="middle">
              S
            </text>
          </svg>
        </div>
        <Suspense>
          {children}
        </Suspense>

        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous" />
      </body>
    </html>
  );
}
