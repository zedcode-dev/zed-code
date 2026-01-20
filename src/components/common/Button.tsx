"use client";

import { forwardRef, ReactNode, useState } from "react";
import { motion, HTMLMotionProps, useMotionValue, useSpring } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
    magnetic?: boolean;
    className?: string;
}

const variants: Record<ButtonVariant, string> = {
    primary: `
    bg-gray-900 text-white
    shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]
    hover:shadow-[0_6px_20px_0_rgba(0,0,0,0.2)]
  `,
    secondary: `
    bg-white text-gray-900
    border border-gray-200
    hover:border-gray-300 hover:bg-gray-50
    shadow-sm hover:shadow-md
  `,
    ghost: `
    bg-transparent text-gray-600
    hover:text-gray-900 hover:bg-gray-50
  `,
};

const sizes: Record<ButtonSize, string> = {
    sm: "h-10 px-5 text-[13px]",
    md: "h-12 px-6 text-[15px]",
    lg: "h-14 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "md",
            children,
            icon,
            iconPosition = "right",
            magnetic = true,
            className = "",
            disabled,
            ...props
        },
        ref
    ) => {
        const [isHovered, setIsHovered] = useState(false);

        // Magnetic effect values
        const x = useMotionValue(0);
        const y = useMotionValue(0);
        const springX = useSpring(x, { stiffness: 150, damping: 15 });
        const springY = useSpring(y, { stiffness: 150, damping: 15 });

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!magnetic) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            x.set((e.clientX - centerX) * 0.15);
            y.set((e.clientY - centerY) * 0.15);
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
            setIsHovered(false);
        };

        return (
            <motion.button
                ref={ref}
                className={`
          relative inline-flex items-center justify-center gap-2
          font-semibold rounded-xl
          transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          overflow-hidden
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
                style={{ x: springX, y: springY }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                whileTap={{ scale: 0.97 }}
                disabled={disabled}
                {...props}
            >
                {/* Shine effect */}
                <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-200%" }}
                    animate={{ x: isHovered ? "200%" : "-200%" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                />

                {/* Content */}
                <span className="relative flex items-center gap-2">
                    {icon && iconPosition === "left" && (
                        <motion.span
                            animate={{ x: isHovered && iconPosition === "left" ? -2 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {icon}
                        </motion.span>
                    )}
                    {children}
                    {icon && iconPosition === "right" && (
                        <motion.span
                            animate={{ x: isHovered ? 4 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {icon}
                        </motion.span>
                    )}
                </span>
            </motion.button>
        );
    }
);

Button.displayName = "Button";
