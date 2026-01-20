import type { Metadata } from "next";
import { CustomCursor } from "@/components/common/CustomCursor";
import { ToastContainer } from "@/components/common/Toast";
import { ContactModalProvider } from "@/context/ContactModalContext";
import "./globals.css";

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

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  icons: {
    icon: "/favicon.ico?v=4",
    apple: "/apple-icon.png?v=4",
    shortcut: "/favicon.ico?v=4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
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
