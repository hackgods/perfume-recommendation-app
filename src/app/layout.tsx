import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://perfumes.saurabhsuresh.com"),
  title: {
    default: "Perfume Recommendation System - Discover Perfumes That Match Your Taste",
    template: "%s | Perfume Recommendation System",
  },
  description: "Start with fragrances you already love. We decode your taste fingerprint and reveal recommendations that match your taste. An intelligent perfume discovery system powered by machine learning and real data.",
  keywords: [
    "perfume recommendation",
    "fragrance discovery",
    "perfume finder",
    "scent matching",
    "personalized perfume",
    "taste fingerprint",
    "perfume DNA",
    "fragrance recommendation system",
    "perfume discovery",
    "scent profile",
  ],
  authors: [{ name: "Saurabh Suresh", url: "https://www.saurabhsuresh.com" }],
  creator: "Saurabh Suresh",
  publisher: "Saurabh Suresh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Perfume Recommendation System",
    title: "Perfume Recommendation System - Discover Perfumes That Match Your Taste",
    description: "Start with fragrances you already love. We decode your taste fingerprint and reveal recommendations that match your taste.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Perfume Recommendation System",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#fff0f3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Perfume Recommendation System",
    description: "An intelligent perfume recommendation system that helps you discover fragrances that match your personal taste profile.",
    url: "https://perfumes.saurabhsuresh.com",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Saurabh Suresh",
      url: "https://www.saurabhsuresh.com",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
