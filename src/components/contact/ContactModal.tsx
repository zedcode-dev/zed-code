"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Send, Loader2, Briefcase, User, CheckCircle, AlertCircle } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { toast } from "@/components/common/Toast";
import { Confetti } from "@/components/common/Confetti";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    // Step 1: Project
    projectType: string;
    budget: string;
    timeline: string;
    description: string;
    // Step 2: Contact
    name: string;
    email: string;
    company: string;
    phone: string;
}

const STORAGE_KEY = "zed-contact-form";

const initialFormData: FormData = {
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    name: "",
    email: "",
    company: "",
    phone: "",
};

const projectTypes = [
    "Web Application",
    "E-commerce",
    "Landing Page",
    "API / Backend System",
    "Other",
];

const budgets = [
    "< $500",
    "$500 - $1,000",
    "$1,000 - $3,000",
    "$3,000+",
];

const timelines = [
    "ASAP",
    "1-2 weeks",
    "1-3 months",
    "Flexible",
];

// Email validation helper
function isValidEmail(email: string): boolean {
    if (!email) return true; // Empty is valid (not touched yet)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [formData, setFormData] = useState<FormData>(initialFormData);

    // Load saved form data from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                setFormData(parsed);
            }
        } catch {
            // Ignore localStorage errors
        }
    }, []);

    // Save form data to localStorage when it changes
    useEffect(() => {
        try {
            // Only save if there's actual data
            const hasData = Object.values(formData).some(v => v.length > 0);
            if (hasData) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
            }
        } catch {
            // Ignore localStorage errors
        }
    }, [formData]);

    const updateField = useCallback((field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const markTouched = useCallback((field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    }, []);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send");
            }

            // Success! Show confetti
            setShowConfetti(true);
            toast.success("Message sent successfully! We'll get back to you soon.");

            // Clear saved form data
            localStorage.removeItem(STORAGE_KEY);

            // Close after a delay to show confetti
            setTimeout(() => {
                onClose();
                setStep(1);
                setFormData(initialFormData);
                setTouched({});
                setShowConfetti(false);
            }, 2000);

        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to send message. Please try again.";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Validation states
    const emailValid = isValidEmail(formData.email);
    const emailError = touched.email && formData.email && !emailValid;

    const canProceedStep1 = formData.projectType && formData.budget && formData.timeline;
    const canProceedStep2 = formData.name.trim().length >= 2 && formData.email && emailValid;

    // Progress calculation
    const progress = useMemo(() => {
        let filled = 0;
        if (formData.projectType) filled++;
        if (formData.budget) filled++;
        if (formData.timeline) filled++;
        if (formData.name) filled++;
        if (formData.email && emailValid) filled++;
        return Math.round((filled / 5) * 100);
    }, [formData, emailValid]);

    const handleClose = () => {
        onClose();
        setTimeout(() => setStep(1), 300);
    };

    return (
        <>
            <Confetti isActive={showConfetti} />

            <Modal isOpen={isOpen} onClose={handleClose}>
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-2xl overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-gray-900 to-gray-700"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-3 mb-8 mt-2">
                    {[1, 2].map((s) => (
                        <div key={s} className="flex items-center gap-3">
                            <motion.div
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                                    ${step >= s
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-100 text-gray-400"}
                                `}
                                animate={{ scale: step === s ? 1.1 : 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {step > s ? <CheckCircle size={18} /> : s}
                            </motion.div>
                            {s < 2 && (
                                <div className={`w-12 h-0.5 transition-colors duration-300 ${step > s ? "bg-gray-900" : "bg-gray-200"}`} />
                            )}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* Step 1: Project Details */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                                    <Briefcase size={18} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Project Details</h3>
                                    <p className="text-sm text-gray-500">Tell us about your project</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {/* Project Type */}
                                <div>
                                    <label id="project-type-label" className="text-sm font-medium text-gray-700 mb-2 block">
                                        Project Type {formData.projectType && <CheckCircle size={14} className="inline text-green-500 ml-1" />}
                                    </label>
                                    <div className="flex flex-wrap gap-2" role="group" aria-labelledby="project-type-label">
                                        {projectTypes.map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => updateField("projectType", type)}
                                                aria-pressed={formData.projectType === type}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.projectType === type
                                                    ? "bg-gray-900 text-white scale-105"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Budget */}
                                <div>
                                    <label id="budget-label" className="text-sm font-medium text-gray-700 mb-2 block">
                                        Budget Range {formData.budget && <CheckCircle size={14} className="inline text-green-500 ml-1" />}
                                    </label>
                                    <div className="flex flex-wrap gap-2" role="group" aria-labelledby="budget-label">
                                        {budgets.map((budget) => (
                                            <button
                                                key={budget}
                                                type="button"
                                                onClick={() => updateField("budget", budget)}
                                                aria-pressed={formData.budget === budget}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.budget === budget
                                                    ? "bg-gray-900 text-white scale-105"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {budget}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div>
                                    <label id="timeline-label" className="text-sm font-medium text-gray-700 mb-2 block">
                                        Timeline {formData.timeline && <CheckCircle size={14} className="inline text-green-500 ml-1" />}
                                    </label>
                                    <div className="flex flex-wrap gap-2" role="group" aria-labelledby="timeline-label">
                                        {timelines.map((timeline) => (
                                            <button
                                                key={timeline}
                                                type="button"
                                                onClick={() => updateField("timeline", timeline)}
                                                aria-pressed={formData.timeline === timeline}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.timeline === timeline
                                                    ? "bg-gray-900 text-white scale-105"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {timeline}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="contact-description" className="text-sm font-medium text-gray-700 mb-2 block">Project Description (Optional)</label>
                                    <textarea
                                        id="contact-description"
                                        value={formData.description}
                                        onChange={(e) => updateField("description", e.target.value)}
                                        placeholder="Tell us more about your project..."
                                        rows={3}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                disabled={!canProceedStep1}
                                className="w-full mt-6 py-3 bg-gray-900 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
                            >
                                Continue
                                <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    )}

                    {/* Step 2: Contact Info */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                                    <User size={18} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Contact Information</h3>
                                    <p className="text-sm text-gray-500">How can we reach you?</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="contact-name" className="text-sm font-medium text-gray-700 mb-2 block">
                                            Name * {formData.name.length >= 2 && <CheckCircle size={14} className="inline text-green-500 ml-1" />}
                                        </label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => updateField("name", e.target.value)}
                                            onBlur={() => markTouched("name")}
                                            placeholder="John Doe"
                                            required
                                            aria-required="true"
                                            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${touched.name && formData.name.length < 2 && formData.name.length > 0
                                                    ? "border-red-300 focus:ring-red-500"
                                                    : formData.name.length >= 2
                                                        ? "border-green-300 focus:ring-green-500"
                                                        : "border-gray-200 focus:ring-gray-900"
                                                }`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-company" className="text-sm font-medium text-gray-700 mb-2 block">Company</label>
                                        <input
                                            id="contact-company"
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => updateField("company", e.target.value)}
                                            placeholder="Acme Inc."
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contact-email" className="text-sm font-medium text-gray-700 mb-2 block">
                                        Email * {formData.email && emailValid && <CheckCircle size={14} className="inline text-green-500 ml-1" />}
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => updateField("email", e.target.value)}
                                        onBlur={() => markTouched("email")}
                                        placeholder="john@example.com"
                                        required
                                        aria-required="true"
                                        aria-invalid={emailError ? "true" : "false"}
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${emailError
                                                ? "border-red-300 focus:ring-red-500"
                                                : formData.email && emailValid
                                                    ? "border-green-300 focus:ring-green-500"
                                                    : "border-gray-200 focus:ring-gray-900"
                                            }`}
                                    />
                                    {emailError && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                            <AlertCircle size={12} />
                                            Please enter a valid email address
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="contact-phone" className="text-sm font-medium text-gray-700 mb-2 block">Phone (WhatsApp)</label>
                                    <input
                                        id="contact-phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => updateField("phone", e.target.value)}
                                        placeholder="+2010xxxxxxxx"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                                >
                                    <ArrowLeft size={16} />
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!canProceedStep2 || isSubmitting}
                                    className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send size={16} />
                                        </>
                                    )}
                                </button>
                            </div>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                By submitting this form, you agree to our <a href="/terms" className="underline hover:text-gray-600 transition-colors" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Modal>
        </>
    );
}
