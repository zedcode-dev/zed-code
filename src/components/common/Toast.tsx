"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (type: ToastType, message: string, duration?: number) => void;
    removeToast: (id: string) => void;
}

// Simple global toast state
let toastListeners: Array<(toasts: Toast[]) => void> = [];
let toasts: Toast[] = [];

function notifyListeners() {
    toastListeners.forEach(listener => listener([...toasts]));
}

export function addToast(type: ToastType, message: string, duration = 4000) {
    const id = Math.random().toString(36).slice(2);
    toasts = [...toasts, { id, type, message, duration }];
    notifyListeners();

    if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
    }
}

export function removeToast(id: string) {
    toasts = toasts.filter(t => t.id !== id);
    notifyListeners();
}

// Convenience methods
export const toast = {
    success: (message: string, duration?: number) => addToast("success", message, duration),
    error: (message: string, duration?: number) => addToast("error", message, duration),
    info: (message: string, duration?: number) => addToast("info", message, duration),
};

const icons = {
    success: CheckCircle,
    error: XCircle,
    info: AlertCircle,
};

const colors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-blue-500",
};

function ToastItem({ toast: t, onRemove }: { toast: Toast; onRemove: () => void }) {
    const Icon = icons[t.type];
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (!t.duration) return;
        const start = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const remaining = Math.max(0, 100 - (elapsed / t.duration!) * 100);
            setProgress(remaining);
            if (remaining <= 0) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [t.duration]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="relative bg-white rounded-2xl shadow-lg shadow-black/10 overflow-hidden min-w-[320px] max-w-md"
        >
            <div className="flex items-center gap-3 p-4">
                <div className={`w-8 h-8 rounded-full ${colors[t.type]} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={16} className="text-white" />
                </div>
                <p className="text-gray-900 text-sm font-medium flex-1">{t.message}</p>
                <button
                    onClick={onRemove}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                >
                    <X size={14} className="text-gray-400" />
                </button>
            </div>

            {/* Progress bar */}
            {t.duration && t.duration > 0 && (
                <div className="h-1 bg-gray-100">
                    <motion.div
                        className={`h-full ${colors[t.type]}`}
                        initial={{ width: "100%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.05, ease: "linear" }}
                    />
                </div>
            )}
        </motion.div>
    );
}

export function ToastContainer() {
    const [localToasts, setLocalToasts] = useState<Toast[]>([]);

    useEffect(() => {
        toastListeners.push(setLocalToasts);
        return () => {
            toastListeners = toastListeners.filter(l => l !== setLocalToasts);
        };
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
                {localToasts.map((t) => (
                    <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
                ))}
            </AnimatePresence>
        </div>
    );
}
