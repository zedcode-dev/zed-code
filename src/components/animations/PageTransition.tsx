"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
    children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                    initial: {
                        opacity: 0,
                        y: 20,
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                        },
                    },
                    exit: {
                        opacity: 0,
                        y: -20,
                        transition: {
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                        },
                    },
                }}
            >
                {/* Page slide overlay */}
                <motion.div
                    className="fixed inset-0 bg-gray-900 z-[200] pointer-events-none"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "bottom" }}
                />
                <motion.div
                    className="fixed inset-0 bg-gray-900 z-[200] pointer-events-none"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    style={{ transformOrigin: "top" }}
                />

                {children}
            </motion.div>
        </AnimatePresence>
    );
}
