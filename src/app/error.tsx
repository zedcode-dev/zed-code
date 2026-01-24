"use client";

import { Button } from "@/components/common/Button";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-30" />

            <div className="relative text-center max-w-md">
                {/* Error Icon */}
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <span className="text-4xl">⚠️</span>
                </div>

                {/* Error Message */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Something went wrong!
                </h1>
                <p className="text-gray-500 mb-8">
                    We encountered an unexpected error. Please try again or go back to the homepage.
                </p>

                {/* Error Details (dev only) */}
                {process.env.NODE_ENV === "development" && error.message && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-left">
                        <p className="text-sm font-mono text-red-600 break-all">
                            {error.message}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        variant="primary"
                        size="lg"
                        icon={<RefreshCw size={18} />}
                        onClick={reset}
                    >
                        Try Again
                    </Button>
                    <Link href="/">
                        <Button variant="secondary" size="lg" icon={<Home size={18} />}>
                            Go Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
