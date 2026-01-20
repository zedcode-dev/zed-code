"use client";

import { useEffect, useCallback, ReactNode, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
    }, [onClose]);

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, handleEscape]);

    // Prevent wheel events from escaping modal
    const handleWheel = useCallback((e: React.WheelEvent) => {
        const content = contentRef.current;
        if (!content) return;

        const { scrollTop, scrollHeight, clientHeight } = content;
        const isAtTop = scrollTop === 0;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

        // Allow scroll only if content is scrollable in the scroll direction
        if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
            e.preventDefault();
        }
        e.stopPropagation();
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-hidden max-h-[90vh] flex flex-col relative"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Always visible close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>

                            {/* Header */}
                            {title && (
                                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 pr-16">
                                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                                </div>
                            )}

                            {/* Content - scrollable with custom scrollbar */}
                            <div
                                ref={contentRef}
                                onWheel={handleWheel}
                                className="p-6 pt-12 overflow-y-auto flex-1 custom-scrollbar"
                            >
                                {children}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
