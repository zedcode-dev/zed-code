import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio - Our Work",
    description: "Explore our latest web development projects. See how Zed Code helps businesses transform their digital presence with modern, high-performance solutions.",
    alternates: {
        canonical: "https://zcode.site/portfolio",
    },
    openGraph: {
        title: "Portfolio | ZED CODE",
        description: "Selected work from Zed Code - Modern web development projects",
        url: "https://zcode.site/portfolio",
    },
};

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
