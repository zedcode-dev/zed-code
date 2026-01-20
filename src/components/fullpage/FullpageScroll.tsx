"use client";

import { ReactNode, useRef, useState, useEffect, createContext, useContext } from "react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";

// Context for section navigation
interface FullpageContextType {
    currentSection: number;
    totalSections: number;
    goToSection: (index: number) => void;
    goNext: () => void;
    goPrev: () => void;
    isMobile: boolean;
}

const FullpageContext = createContext<FullpageContextType | null>(null);

export function useFullpage() {
    const context = useContext(FullpageContext);
    if (!context) throw new Error("useFullpage must be used within FullpageProvider");
    return context;
}

// Main Fullpage Container
interface FullpageContainerProps {
    children: ReactNode;
    header?: ReactNode;
}

export function FullpageContainer({ children, header }: FullpageContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [totalSections, setTotalSections] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    const touchStartY = useRef(0);

    // Calculate progress
    const progress = totalSections > 0 ? ((currentSection + 1) / totalSections) * 100 : 0;
    const springProgress = useSpring(progress, { stiffness: 100, damping: 30 });

    // MUST be at top level - not conditional
    const progressWidth = useTransform(springProgress, (v) => `${v}%`);

    // After mount, check if mobile
    useEffect(() => {
        setMounted(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const sections = container.querySelectorAll('[data-fullpage-section]');
        setTotalSections(sections.length);
    }, [children]);

    // Handle hash-based navigation on initial load
    useEffect(() => {
        if (!mounted || totalSections === 0 || isMobile) return;

        const hash = window.location.hash;
        if (!hash) return;

        // Map hash to section index
        const hashToSection: Record<string, number> = {
            "#services": 1,
            "#portfolio": 2,
            "#stats": 3,
            "#testimonials": 4,
            "#contact": 5,
        };

        const targetSection = hashToSection[hash];
        if (targetSection !== undefined && targetSection < totalSections) {
            // Small delay to ensure everything is ready
            setTimeout(() => {
                setCurrentSection(targetSection);
                // Clear hash after navigation
                window.history.replaceState(null, "", window.location.pathname);
            }, 100);
        }
    }, [mounted, totalSections, isMobile]);

    const goToSection = (index: number) => {
        if (isAnimating || index < 0 || index >= totalSections) return;
        setIsAnimating(true);
        setCurrentSection(index);
        setTimeout(() => setIsAnimating(false), 1200);
    };

    const goNext = () => goToSection(currentSection + 1);
    const goPrev = () => goToSection(currentSection - 1);

    useEffect(() => {
        springProgress.set(progress);
    }, [progress, springProgress]);

    // Event handlers - only for desktop
    useEffect(() => {
        if (isMobile || !mounted) return;

        let lastWheel = 0;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const now = Date.now();
            if (now - lastWheel < 100 || isAnimating) return;
            lastWheel = now;

            if (e.deltaY > 30) goNext();
            else if (e.deltaY < -30) goPrev();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (["ArrowDown", "PageDown", " "].includes(e.key)) {
                e.preventDefault();
                goNext();
            } else if (["ArrowUp", "PageUp"].includes(e.key)) {
                e.preventDefault();
                goPrev();
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isAnimating, currentSection, totalSections, isMobile, mounted]);

    const contextValue = {
        currentSection: isMobile ? 0 : currentSection,
        totalSections,
        goToSection,
        goNext,
        goPrev,
        isMobile
    };

    return (
        <FullpageContext.Provider value={contextValue}>
            <div
                ref={containerRef}
                className={isMobile ? "bg-white" : "fixed inset-0 overflow-hidden bg-white"}
            >
                {/* Fixed Header */}
                {header && <div className="absolute top-0 left-0 right-0 z-40">{header}</div>}

                {/* Sections wrapper */}
                {isMobile ? (
                    <div>{children}</div>
                ) : (
                    <motion.div
                        className="h-full"
                        animate={{ y: `-${currentSection * 100}vh` }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    >
                        {children}
                    </motion.div>
                )}

                {/* Desktop-only UI elements */}
                {!isMobile && mounted && (
                    <>
                        {/* Progress Bar */}
                        <div className="fixed top-0 left-0 right-0 h-[3px] bg-gray-100 z-50">
                            <motion.div
                                className="h-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 origin-left"
                                style={{ width: progressWidth }}
                            />
                        </div>

                        {/* Navigation Dots */}
                        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
                            <div className="flex flex-col items-center gap-4">
                                {Array.from({ length: totalSections }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToSection(i)}
                                        className="group relative flex items-center justify-center"
                                        aria-label={`Go to section ${i + 1}`}
                                    >
                                        <span className="absolute right-full mr-4 text-xs font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {["Home", "Services", "Portfolio", "About", "Testimonials", "Contact"][i]}
                                        </span>
                                        <span
                                            className={`block rounded-full transition-all duration-500 ${currentSection === i
                                                ? "w-3 h-8 bg-gray-900"
                                                : "w-2 h-2 bg-gray-300 group-hover:bg-gray-500"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Section Counter */}
                        <div className={`fixed bottom-8 left-8 z-50 flex items-baseline gap-1 font-mono text-sm transition-opacity duration-300 ${currentSection === totalSections - 1 ? "opacity-0 pointer-events-none" : "opacity-100"
                            }`}>
                            <span className="text-2xl font-bold text-gray-900">
                                {String(currentSection + 1).padStart(2, "0")}
                            </span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">
                                {String(totalSections).padStart(2, "0")}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </FullpageContext.Provider>
    );
}

// Fullpage Section
interface FullpageSectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export function FullpageSection({ children, className = "", id }: FullpageSectionProps) {
    const { isMobile } = useFullpage();

    return (
        <section
            id={id}
            data-fullpage-section
            className={`
        w-full relative overflow-hidden
        ${isMobile
                    ? "min-h-screen py-24 flex items-center justify-center"
                    : "h-screen flex items-center justify-center"
                }
        ${className}
      `}
        >
            {children}
        </section>
    );
}

// Section content with animations for both mobile and desktop
interface SectionContentProps {
    children: ReactNode;
    className?: string;
    index: number;
}

export function SectionContent({ children, className = "", index }: SectionContentProps) {
    const { currentSection, isMobile } = useFullpage();
    const isActive = isMobile || currentSection === index;

    // Mobile: use whileInView for scroll-triggered animations
    if (isMobile) {
        // If it's the first section, show immediately to avoid initial empty screen
        const isFirstSection = index === 0;

        return (
            <motion.div
                className={`w-full ${className}`}
                initial={{
                    opacity: isFirstSection ? 1 : 0,
                    y: isFirstSection ? 0 : 50,
                    filter: isFirstSection ? "blur(0px)" : "blur(8px)"
                }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        );
    }

    // Desktop: use controlled animations based on currentSection
    return (
        <motion.div
            className={`w-full ${className}`}
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 40,
                filter: isActive ? "blur(0px)" : "blur(8px)",
            }}
            transition={{
                duration: 0.8,
                delay: isActive ? 0.3 : 0,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {children}
        </motion.div>
    );
}

// Scroll indicator
export function ScrollIndicator() {
    const { goNext, currentSection, totalSections, isMobile } = useFullpage();

    if (isMobile || currentSection === totalSections - 1) return null;

    return (
        <motion.button
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
            onClick={goNext}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
        >
            <span className="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium group-hover:text-gray-600 transition-colors">
                Scroll
            </span>
            <motion.div className="w-6 h-10 rounded-full border-2 border-gray-300 flex justify-center pt-2 group-hover:border-gray-400 transition-colors">
                <motion.div
                    className="w-1 h-2 bg-gray-400 rounded-full"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </motion.button>
    );
}
