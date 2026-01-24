"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
    id: number;
    x: number;
    delay: number;
    duration: number;
    color: string;
    size: number;
    rotation: number;
}

const colors = ["#a855f7", "#ec4899", "#eab308", "#22c55e", "#3b82f6", "#f97316"];

function generateConfetti(count: number = 50): ConfettiPiece[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage across screen
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 8,
        rotation: Math.random() * 360,
    }));
}

interface ConfettiProps {
    isActive: boolean;
    duration?: number;
}

export function Confetti({ isActive, duration = 3000 }: ConfettiProps) {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isActive) {
            setPieces(generateConfetti(40));
            setShow(true);

            const timer = setTimeout(() => {
                setShow(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isActive, duration]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
            <AnimatePresence>
                {pieces.map((piece) => (
                    <motion.div
                        key={piece.id}
                        initial={{
                            x: `${piece.x}vw`,
                            y: -20,
                            rotate: 0,
                            opacity: 1,
                        }}
                        animate={{
                            y: "100vh",
                            rotate: piece.rotation + 720,
                            opacity: [1, 1, 0],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: piece.duration,
                            delay: piece.delay,
                            ease: "easeOut",
                        }}
                        style={{
                            position: "absolute",
                            width: piece.size,
                            height: piece.size,
                            backgroundColor: piece.color,
                            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
