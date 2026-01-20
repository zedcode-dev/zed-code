"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for cursor movement
    const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
    const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });

    // Slightly delayed follower
    const followerX = useSpring(mouseX, { stiffness: 250, damping: 20 });
    const followerY = useSpring(mouseY, { stiffness: 250, damping: 20 });

    // Mark as mounted after hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleLinkHover = () => setIsHovered(true);
        const handleLinkLeave = () => setIsHovered(false);

        document.addEventListener("mousemove", handleMouseMove);
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
    }, [mouseX, mouseY, isVisible, mounted]);

    useEffect(() => {
        if (!mounted) return;

        const observer = new MutationObserver((mutations) => {
            const handleLinkHover = () => setIsHovered(true);
            const handleLinkLeave = () => setIsHovered(false);

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
    }, [mounted]);

    // Don't render until mounted to prevent hydration mismatch
    if (!mounted) return null;

    return (
        <>
            <style jsx global>{`
        * { cursor: none !important; }
        @media (max-width: 1024px) {
            * { cursor: auto !important; }
            .custom-cursor { display: none !important; }
        }
      `}</style>

            {/* Main dot */}
            <motion.div
                className="custom-cursor fixed top-0 left-0 w-3 h-3 bg-gray-900 border border-white rounded-full pointer-events-none z-[9999]"
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
                className="custom-cursor fixed top-0 left-0 w-8 h-8 border border-gray-900 bg-white/10 backdrop-invert rounded-full pointer-events-none z-[9998]"
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
                transition={{ duration: 0.2 }}
            />
        </>
    );
}
