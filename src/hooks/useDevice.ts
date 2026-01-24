"use client";

import { useState, useEffect } from "react";

/**
 * Hook to check if device is mobile
 * Returns false on server, true/false on client based on screen width
 */
export function useIsMobile(breakpoint: number = 1024): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile, { passive: true });
        return () => window.removeEventListener("resize", checkMobile);
    }, [breakpoint]);

    return isMobile;
}

/**
 * Hook to check if user prefers reduced motion
 * Respects accessibility preferences
 */
export function usePrefersReducedMotion(): boolean {
    const [prefersReduced, setPrefersReduced] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReduced(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return prefersReduced;
}

/**
 * Combined hook for performance-sensitive animations
 * Returns true if animations should be reduced/simplified
 */
export function useShouldReduceAnimations(): boolean {
    const isMobile = useIsMobile();
    const prefersReduced = usePrefersReducedMotion();

    return isMobile || prefersReduced;
}
