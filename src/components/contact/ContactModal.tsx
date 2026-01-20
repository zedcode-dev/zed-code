"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Send, Loader2, Briefcase, User, CheckCircle } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { toast } from "@/components/common/Toast";

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

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        projectType: "",
        budget: "",
        timeline: "",
        description: "",
        name: "",
        email: "",
        company: "",
        phone: "",
    });

    const updateField = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to send");

            toast.success("Message sent successfully! We'll get back to you soon.");
            onClose();
            setStep(1);
            setFormData({
                projectType: "",
                budget: "",
                timeline: "",
                description: "",
                name: "",
                email: "",
                company: "",
                phone: "",
            });
        } catch {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const canProceedStep1 = formData.projectType && formData.budget && formData.timeline;
    const canProceedStep2 = formData.name && formData.email;

    const handleClose = () => {
        onClose();
        setTimeout(() => setStep(1), 300);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-3 mb-8">
                {[1, 2].map((s) => (
                    <div key={s} className="flex items-center gap-3">
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                            ${step >= s
                                ? "bg-gray-900 text-white"
                                : "bg-gray-100 text-gray-400"}
                        `}>
                            {step > s ? <CheckCircle size={18} /> : s}
                        </div>
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
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Project Type</label>
                                <div className="flex flex-wrap gap-2">
                                    {projectTypes.map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => updateField("projectType", type)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.projectType === type
                                                ? "bg-gray-900 text-white"
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
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Budget Range</label>
                                <div className="flex flex-wrap gap-2">
                                    {budgets.map((budget) => (
                                        <button
                                            key={budget}
                                            type="button"
                                            onClick={() => updateField("budget", budget)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.budget === budget
                                                ? "bg-gray-900 text-white"
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
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Timeline</label>
                                <div className="flex flex-wrap gap-2">
                                    {timelines.map((timeline) => (
                                        <button
                                            key={timeline}
                                            type="button"
                                            onClick={() => updateField("timeline", timeline)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.timeline === timeline
                                                ? "bg-gray-900 text-white"
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
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Project Description (Optional)</label>
                                <textarea
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
                            className="w-full mt-6 py-3 bg-gray-900 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => updateField("name", e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Company</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => updateField("company", e.target.value)}
                                        placeholder="Acme Inc."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Email *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Phone (WhatsApp)</label>
                                <input
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
                                className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
    );
}
