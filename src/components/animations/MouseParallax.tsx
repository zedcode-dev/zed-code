"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface MouseParallaxProps {
    children: ReactNode;
    strength?: number;
    className?: string;
    enableOnMobile?: boolean;
}

export function MouseParallax({
    children,
    strength = 0.05,
    className = "",
    enableOnMobile = false
}: MouseParallaxProps) {
    const [windowWidth, setWindowWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Transform mouse position to parallax offset
    const x = useTransform(springX, (value) => {
        // Center is 0
        const center = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
        return (value - center) * -strength;
    });

    const y = useTransform(springY, (value) => {
        const center = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
        return (value - center) * -strength;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        setWindowWidth(window.innerWidth);

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, [mouseX, mouseY]);

    // Disable on mobile unless specified
    if (!enableOnMobile && windowWidth < 1024) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            style={{ x, y }}
            className={`will-change-transform ${className}`}
        >
            {children}
        </motion.div>
    );
}
