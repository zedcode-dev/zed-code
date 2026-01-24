import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CustomCursor } from "@/components/common/CustomCursor";
import { ToastContainer } from "@/components/common/Toast";
import { ContactModalProvider } from "@/context/ContactModalContext";
import "./globals.css";

// Optimized font loading with next/font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// JSON-LD Structured Data for Organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zed Code",
  url: "https://zcode.site",
  logo: "https://zcode.site/icon.png",
  description: "Elite coding solutions for the next generation. Web development, mobile apps, API architecture, and custom solutions.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@zcode.site",
    contactType: "customer service",
  },
  sameAs: [
    "https://github.com/zedcode-dev",
    "https://linkedin.com/company/zedcode-dev",
    "https://instagram.com/zedcode-dev",
    "https://tiktok.com/@zedcode-dev",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://zcode.site'),
  title: {
    default: "ZED CODE | Engineering The Future",
    template: "%s | ZED CODE"
  },
  description: "Elite coding solutions for the next generation. Web development, mobile apps, API architecture, and custom solutions.",
  keywords: ["web development", "mobile apps", "API", "software engineering", "coding solutions", "nextjs", "react", "typescript"],
  authors: [{ name: "Zed Code", url: "https://zcode.site" }],
  creator: "Zed Code",
  alternates: {
    canonical: "https://zcode.site",
  },
  openGraph: {
    title: "ZED CODE | Engineering The Future",
    description: "Elite coding solutions for the next generation",
    url: "https://zcode.site",
    siteName: "ZED CODE",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ZED CODE - Engineering The Future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZED CODE | Engineering The Future",
    description: "Elite coding solutions for the next generation",
    creator: "@zedcode",
    images: ["/opengraph-image.png"],
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
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        <CustomCursor />
        <ToastContainer />
        {/* Skip Link for Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div id="main-content">
          <ContactModalProvider>
            {children}
          </ContactModalProvider>
        </div>
      </body>
    </html>
  );
}
