"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/config/content";
import { Button } from "@/components/common/Button";
import { useFullpage } from "@/components/fullpage/FullpageScroll";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { identity, navigation } = siteContent;
    const pathname = usePathname();

    // Safe context usage - only available on homepage
    let fullpageContext;
    try {
        fullpageContext = useFullpage();
    } catch {
        fullpageContext = null;
    }

    const { currentSection, goToSection, totalSections } = fullpageContext || {
        currentSection: 0,
        totalSections: 0,
        goToSection: () => { }
    };

    // Check if we are in the last section (dark background) - only on homepage
    const isLastSection = pathname === "/" && totalSections > 0 && currentSection === totalSections - 1;
    const textColorClass = isLastSection && !isScrolled ? "text-white" : "text-gray-900";
    const linkColorClass = isLastSection && !isScrolled
        ? "text-white/70 hover:text-white"
        : "text-gray-500 hover:text-gray-900";
    const logoBgClass = isLastSection && !isScrolled
        ? "bg-white text-gray-900"
        : "bg-gray-900 text-white";

    const handleNavClick = (item: typeof navigation[0], e: React.MouseEvent) => {
        // If it's a page link, let the Link handle it
        if (item.isPage) {
            setIsMobileMenuOpen(false);
            return; // Don't prevent default
        }

        e.preventDefault();

        // If on homepage and has sectionIndex, scroll to section
        if (pathname === "/" && fullpageContext && item.sectionIndex !== undefined) {
            if (fullpageContext.isMobile) {
                // Mobile: Native scroll
                const elementId = item.href.replace("#", "");
                const element = document.getElementById(elementId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            } else {
                // Desktop: Fullpage scroll
                goToSection(item.sectionIndex);
            }
        } else if (item.href.startsWith("#")) {
            // Navigate to homepage with hash
            window.location.href = "/" + item.href;
        }
        setIsMobileMenuOpen(false);
    };

    const isLinkActive = (item: typeof navigation[0]) => {
        // Portfolio page link - also active when in Portfolio section on homepage
        if (item.isPage && item.href === "/portfolio") {
            if (pathname === "/portfolio") return true;
            // Also active when on homepage in Portfolio section (index 2)
            if (pathname === "/" && fullpageContext && currentSection === 2) return true;
            return false;
        }
        // Other page links - check pathname
        if (item.isPage) {
            return pathname === item.href;
        }
        // Section links on homepage
        if (pathname === "/" && fullpageContext && item.sectionIndex !== undefined) {
            return item.sectionIndex === currentSection;
        }
        return false;
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === "/" && fullpageContext) {
            e.preventDefault();
            goToSection(0);
        }
        setIsMobileMenuOpen(false);
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || pathname !== "/"
                    ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-3"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            onClick={handleLogoClick}
                            className="flex items-center gap-2.5 z-50 relative group"
                        >
                            <div className={`w-9 h-9 ${logoBgClass} rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                                <span className="text-lg font-bold">Z</span>
                            </div>
                            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${textColorClass}`}>
                                Code
                            </span>
                        </Link>

                        {pathname.startsWith("/portfolio") || pathname === "/terms" ? (
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft size={18} />
                                <span>Back to Home</span>
                            </Link>
                        ) : (
                            <>
                                {/* Desktop Navigation */}
                                <nav className="hidden md:flex items-center gap-8">
                                    {navigation.map((item) => {
                                        const isActive = isLinkActive(item);

                                        // CTA Button
                                        if (item.isCta) {
                                            return item.isPage ? (
                                                <Link key={item.label} href={item.href}>
                                                    <Button variant="primary" size="sm">
                                                        {item.label}
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <Button
                                                    key={item.label}
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={(e) => handleNavClick(item, e)}
                                                >
                                                    {item.label}
                                                </Button>
                                            );
                                        }

                                        // Page Link (like Portfolio)
                                        if (item.isPage) {
                                            return (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    className={`text-sm font-medium transition-all duration-200 relative ${isActive
                                                        ? "text-gray-900 font-semibold"
                                                        : linkColorClass
                                                        }`}
                                                >
                                                    {item.label}
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="navbar-indicator"
                                                            className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gray-900"
                                                            transition={{ duration: 0.3 }}
                                                        />
                                                    )}
                                                </Link>
                                            );
                                        }

                                        // Section Link
                                        return (
                                            <button
                                                key={item.label}
                                                onClick={(e) => handleNavClick(item, e)}
                                                className={`text-sm font-medium transition-all duration-200 relative ${isActive
                                                    ? (isLastSection && !isScrolled ? "text-white font-semibold" : "text-gray-900 font-semibold")
                                                    : linkColorClass
                                                    }`}
                                            >
                                                {item.label}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="navbar-indicator"
                                                        className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${isLastSection && !isScrolled ? "bg-white" : "bg-gray-900"
                                                            }`}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </nav>

                                {/* Mobile Menu Button */}
                                <button
                                    className={`md:hidden z-50 relative p-2 transition-colors ${isMobileMenuOpen ? "text-gray-900" : (isLastSection && !isScrolled ? "text-white" : "text-gray-900")
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    aria-label="Toggle menu"
                                >
                                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-30 bg-white pt-24 px-6 md:hidden flex flex-col"
                    >
                        <nav className="flex flex-col gap-4 text-center">
                            {navigation.map((item, idx) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    {item.isCta ? (
                                        item.isPage ? (
                                            <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                                <Button variant="primary" size="lg" className="w-full">
                                                    {item.label}
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button
                                                variant="primary"
                                                size="lg"
                                                className="w-full"
                                                onClick={(e) => handleNavClick(item, e)}
                                            >
                                                {item.label}
                                            </Button>
                                        )
                                    ) : item.isPage ? (
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block w-full text-2xl font-medium py-3 ${isLinkActive(item) ? "text-gray-900" : "text-gray-500"
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={(e) => handleNavClick(item, e)}
                                            className={`block w-full text-2xl font-medium py-3 ${isLinkActive(item) ? "text-gray-900" : "text-gray-500"
                                                }`}
                                        >
                                            {item.label}
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
