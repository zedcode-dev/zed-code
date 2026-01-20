"use client";

import { motion, useInView, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

// Animation Variants Library
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
};

export const slideUp: Variants = {
    hidden: { y: "100%" },
    visible: {
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

export const staggerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.05,
        },
    },
};

// Text reveal animation (word by word)
export const textReveal: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
        },
    },
};

export const wordReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        rotateX: -90,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    },
};

// Letter reveal animation
export const letterReveal: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
        }
    },
};

// Reveal on scroll component
interface RevealProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right" | "scale";
    delay?: number;
    className?: string;
    once?: boolean;
}

export function Reveal({
    children,
    direction = "up",
    delay = 0,
    className = "",
    once = true,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    const variants: Record<string, Variants> = {
        up: fadeInUp,
        down: fadeInDown,
        left: fadeInLeft,
        right: fadeInRight,
        scale: scaleIn,
    };

    return (
        <motion.div
            ref={ref}
            variants={variants[direction]}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Text reveal by words
interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const words = text.split(" ");

    return (
        <motion.span
            ref={ref}
            className={`inline-block ${className}`}
            variants={textReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay }}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                    <motion.span
                        className="inline-block"
                        variants={wordReveal}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}

// Stagger children wrapper
interface StaggerProps {
    children: ReactNode;
    className?: string;
    fast?: boolean;
    delay?: number;
}

export function Stagger({ children, className = "", fast = false, delay = 0 }: StaggerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={fast ? staggerFast : staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
}

// Stagger item (child of Stagger)
interface StaggerItemProps {
    children: ReactNode;
    className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
    return (
        <motion.div variants={fadeInUp} className={className}>
            {children}
        </motion.div>
    );
}

// Magnetic effect for buttons/elements
interface MagneticProps {
    children: ReactNode;
    className?: string;
    strength?: number;
}

export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleMouseLeave = () => {
        if (ref.current) {
            ref.current.style.transform = "translate(0, 0)";
        }
    };

    return (
        <motion.div
            ref={ref}
            className={`transition-transform duration-300 ease-out ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    );
}

// Parallax effect
interface ParallaxProps {
    children: ReactNode;
    className?: string;
    speed?: number;
}

export function Parallax({ children, className = "", speed = 0.5 }: ParallaxProps) {
    return (
        <motion.div
            className={className}
            initial={{ y: 0 }}
            whileInView={{ y: [0, -30 * speed] }}
            transition={{ duration: 0 }}
            viewport={{ once: false }}
        >
            {children}
        </motion.div>
    );
}

// Hover scale effect
interface HoverScaleProps {
    children: ReactNode;
    className?: string;
    scale?: number;
}

export function HoverScale({ children, className = "", scale = 1.02 }: HoverScaleProps) {
    return (
        <motion.div
            className={className}
            whileHover={{ scale }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

// Blur in animation
export const blurIn: Variants = {
    hidden: {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
    },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
};
