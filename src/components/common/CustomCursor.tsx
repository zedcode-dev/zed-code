"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for cursor movement - reduced stiffness for better performance
    const cursorX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const cursorY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    // Slightly delayed follower - reduced stiffness
    const followerX = useSpring(mouseX, { stiffness: 150, damping: 25 });
    const followerY = useSpring(mouseY, { stiffness: 150, damping: 25 });

    // Check if desktop on mount
    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
        };
        checkDesktop();
        setMounted(true);

        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    const handleLinkHover = useCallback(() => setIsHovered(true), []);
    const handleLinkLeave = useCallback(() => setIsHovered(false), []);

    useEffect(() => {
        // Only run on desktop
        if (!mounted || !isDesktop) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        document.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        const interactiveElements = document.querySelectorAll("a, button, input, textarea, [role='button']");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleLinkHover);
            el.addEventListener("mouseleave", handleLinkLeave);
        });

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);

            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleLinkHover);
                el.removeEventListener("mouseleave", handleLinkLeave);
            });
        };
    }, [mouseX, mouseY, isVisible, mounted, isDesktop, handleLinkHover, handleLinkLeave]);

    useEffect(() => {
        // Only run on desktop
        if (!mounted || !isDesktop) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node instanceof HTMLElement) {
                            const interactive = node.querySelectorAll("a, button, input, textarea, [role='button']");
                            interactive.forEach(el => {
                                el.addEventListener("mouseenter", handleLinkHover);
                                el.addEventListener("mouseleave", handleLinkLeave);
                            });
                            if (node.matches("a, button, input, textarea, [role='button']")) {
                                node.addEventListener("mouseenter", handleLinkHover);
                                node.addEventListener("mouseleave", handleLinkLeave);
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, [mounted, isDesktop, handleLinkHover, handleLinkLeave]);

    // Don't render on mobile/tablet or before mount
    if (!mounted || !isDesktop) return null;

    return (
        <>
            <style jsx global>{`
                @media (min-width: 1024px) {
                    * { cursor: none !important; }
                }
            `}</style>

            {/* Main dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-gray-900 border border-white rounded-full pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
            />

            {/* Follower ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-gray-900 rounded-full pointer-events-none z-[9998]"
                style={{
                    x: followerX,
                    y: followerY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    scale: isHovered ? 2.5 : 1,
                    borderColor: isHovered ? "rgba(255, 255, 255, 0.8)" : "rgba(23, 23, 23, 1)",
                    backgroundColor: isHovered ? "rgba(23, 23, 23, 0.2)" : "transparent"
                }}
                transition={{ duration: 0.15 }}
            />
        </>
    );
}
