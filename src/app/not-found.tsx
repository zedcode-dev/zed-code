"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-30" />

            <div className="relative text-center max-w-md">
                {/* 404 Display */}
                <div className="mb-8">
                    <h1 className="text-[10rem] md:text-[12rem] font-black leading-none text-gray-100 select-none">
                        404
                    </h1>
                    <div className="relative -mt-16 md:-mt-20">
                        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto shadow-xl">
                            <span className="text-2xl">🔍</span>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-500 mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        <Home size={18} />
                        Go Home
                    </Link>
                    <button
                        onClick={() => typeof window !== 'undefined' && window.history.back()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
