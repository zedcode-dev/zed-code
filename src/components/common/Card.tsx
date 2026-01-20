"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface CardProps {
    children: ReactNode;
    className?: string;
    hoverable?: boolean;
    tilt?: boolean;
    glow?: boolean;
    onClick?: () => void;
}

export function Card({
    children,
    className = "",
    hoverable = true,
    tilt = true,
    glow = false,
    onClick,
}: CardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

    // Glow position
    const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
    const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !tilt) return;
        const rect = cardRef.current.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width - 0.5;
        const yPos = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPos);
        y.set(yPos);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`
        relative
        bg-white/90 backdrop-blur-xl
        border border-gray-200/80
        rounded-2xl p-8
        transition-shadow duration-500
        ${hoverable ? "hover:shadow-2xl hover:shadow-black/10" : "shadow-xl shadow-black/5"}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
            style={{
                rotateX: tilt ? rotateX : 0,
                rotateY: tilt ? rotateY : 0,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            whileHover={hoverable ? { y: -8, transition: { duration: 0.3, ease: "easeOut" } } : undefined}
        >
            {/* Glow effect on hover */}
            {glow && (
                <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0,0,0,0.03) 0%, transparent 50%)`,
                    }}
                />
            )}

            {/* Border glow */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                    background: "linear-gradient(135deg, rgba(0,0,0,0.05), transparent)",
                }}
            />

            <div style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
}
