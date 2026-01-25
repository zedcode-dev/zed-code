// Centralized content - all site text and data
// Change this file to update the website

export type NavItem = {
    label: string;
    href: string;
    sectionIndex?: number;
    isPage?: boolean;
    isCta?: boolean;
};

export const siteContent = {
    identity: {
        name: "ZED CODE",
        tagline: "Engineering Digital Solutions",
        email: "contact@zcode.site",
    },

    // Navigation - Portfolio is a separate page
    navigation: [
        { label: "Services", href: "#services", sectionIndex: 1 },
        { label: "Portfolio", href: "/portfolio", isPage: true },
        { label: "About", href: "#about", sectionIndex: 3 },
        { label: "Testimonials", href: "#testimonials", sectionIndex: 4 },
        { label: "Contact", href: "#contact", sectionIndex: 5, isCta: true },
    ] as NavItem[],

    social: [
        { label: "GitHub", href: "https://github.com/zedcode-dev", icon: "Github" },
        { label: "Instagram", href: "https://www.instagram.com/zedcode.dev/", icon: "Instagram" },
        { label: "TikTok", href: "https://www.tiktok.com/@zedcode.dev", icon: "Tiktok" },
    ],

    pages: {
        home: {
            hero: {
                badge: "Premium Web Development",
                title: "Build Your Digital Presence",
                subtitle: "Enterprise-grade web solutions with modern technologies. Exceptional performance, clean architecture, measurable results.",
                ctaPrimary: { label: "Start Project", href: "#contact" },
                ctaSecondary: { label: "View Portfolio", href: "/portfolio" },
            },
            services: {
                title: "Services",
                subtitle: "Comprehensive development solutions",
                items: [
                    {
                        id: "frontend",
                        icon: "Globe",
                        title: "Frontend Development",
                        description:
                            "Modern, responsive interfaces built with React, Next.js, TypeScript, and Tailwind CSS. Optimized for performance and smooth user experience.",
                    },
                    {
                        id: "backend",
                        icon: "Server",
                        title: "Backend Development",
                        description:
                            "API-driven backend logic ready for integration with databases and services. Built with Node.js, Express.js, PHP, and Laravel when required.",
                    },
                    {
                        id: "fullstack",
                        icon: "Code",
                        title: "Full-Stack Solutions",
                        description:
                            "Complete application development from architecture to deployment. Designed for scalable, reliable apps and smooth production rollout.",
                    },
                    {
                        id: "design",
                        icon: "Palette",
                        title: "UI/UX Design",
                        description:
                            "Strategic interface design focused on conversion. Figma prototyping with clean aesthetics and user-centered experience.",
                    },
                ],
            },
            portfolio: {
                title: "Portfolio",
                subtitle: "Selected work",
                items: [
                    {
                        id: "saleh-portfolio",
                        title: "Engineering Portfolio",
                        category: "Personal Brand",
                        description: "Comprehensive personal portfolio showcasing full-stack engineering capabilities, projects, and technical skills.",
                        tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
                        color: "from-blue-600 to-indigo-600",
                        thumbnail: "/portfolio/eng-saleh-portfolio.png",
                        stats: { type: "Portfolio", status: "Live" },
                        year: "2025",
                        url: "https://salehkhalifa.itslab.online/",
                    },
                    {
                        id: "dxlr-brand",
                        title: "DXLR Brand",
                        category: "E-commerce",
                        description: "Modern fashion brand e-commerce platform featuring dynamic animations and a premium shopping experience.",
                        tags: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
                        color: "from-rose-500 to-red-600",
                        thumbnail: "/portfolio/dxlr-brand.png",
                        stats: { type: "E-commerce", status: "Production" },
                        year: "2025",
                        url: "https://dxlr-brand.vercel.app/",
                    },
                    {
                        id: "afaq-realty",
                        title: "Afaq Realty",
                        category: "Real Estate",
                        description: "Bilingual real estate platform connecting buyers and sellers with advanced property search and listing features.",
                        tags: ["Next.js", "Radix UI", "Tailwind CSS", "Next-Intl"],
                        color: "from-emerald-600 to-teal-600",
                        thumbnail: "/portfolio/afaq-realty.png",
                        stats: { type: "Real Estate", status: "Live" },
                        year: "2025",
                        url: "https://afaq-realty.vercel.app/en",
                    },
                ],
            },
            about: {
                title: "Why ZED CODE",
                subtitle: "Excellence in execution",
                description: "We deliver professional web solutions that drive business growth. Technical expertise meets strategic thinking.",
                items: [
                    { value: "Quality", label: "First" },
                    { value: "On-Time", label: "Delivery" },
                    { value: "Clean", label: "Code" },
                    { value: "Direct", label: "Communication" },
                ],
            },
            testimonials: {
                title: "Client Feedback",
                items: [
                    {
                        quote: "ZED CODE transformed my professional presence. The portfolio site is incredibly fast, visually stunning, and perfectly captures my engineering skills. Truly a level above.",
                        author: "Saleh Khalifa",
                        role: "Software Engineer",
                        avatar: "/avatars/placeholder.jpg",
                    },
                    {
                        quote: "The e-commerce platform ZED CODE built for DXLR is a masterpiece. The animations and user experience are seamless, directly contributing to our increased engagement and sales.",
                        author: "Sarah Ahmed",
                        role: "Marketing Director, DXLR",
                        avatar: "/avatars/placeholder.jpg",
                    },
                    {
                        quote: "A top-tier real estate platform. We needed a complex bilingual system, and ZED CODE delivered a smooth, intuitive, and robust solution that our agents and clients love.",
                        author: "Mohammed Ali",
                        role: "Operations Manager, Afaq Realty",
                        avatar: "/avatars/placeholder.jpg",
                    },
                ],
            },
            cta: {
                title: "Ready to Start?",
                subtitle: "Let's discuss your project requirements.",
                ctaPrimary: { label: "Get in Touch", href: "#contact" },
            },
        },
    },

    footer: {
        description: "Professional web development services delivering enterprise-grade solutions.",
        copyright: `© ${new Date().getFullYear()} ZED CODE. All rights reserved.`,
        links: {
            company: [
                { label: "Services", href: "#services" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Contact", href: "#contact" },
            ],
            services: [
                { label: "Frontend Development", href: "#services-frontend" },
                { label: "Backend Development", href: "#services-backend" },
                { label: "Full-Stack Solutions", href: "#services-fullstack" },
                { label: "UI/UX Design", href: "#services-design" },
            ],
            legal: [
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
            ],
        },
    },
};

export type SiteContent = typeof siteContent;