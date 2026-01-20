"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Instagram, Linkedin } from "lucide-react";
import { TiktokIcon } from "@/components/common/Icons";
import { siteContent } from "@/config/content";
import { Header } from "@/components/layout/Header";
import { useContactModal } from "@/context/ContactModalContext";


export default function PortfolioPage() {
    const { pages } = siteContent;
    const portfolio = pages.home.portfolio;
    const { openContactModal } = useContactModal();

    return (
        <>
            <Header />

            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-24 pb-20">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
                    <div className="absolute inset-0 bg-grid opacity-40" />

                    <div className="container relative mx-auto px-6">
                        {/* Back Link */}


                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl"
                        >
                            <span className="inline-block text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
                                Portfolio
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                {portfolio.title}
                            </h1>
                            <p className="text-xl text-gray-500 max-w-2xl">
                                {portfolio.subtitle}. Explore our latest projects and see how we help businesses transform their digital presence.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="space-y-24">
                            {portfolio.items.map((project, index) => (
                                <motion.article
                                    key={project.id}
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, delay: index * 0.1 }}
                                    className="group"
                                >
                                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                        {/* Image */}
                                        <div className={`order-1 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                            {project.url && project.url !== "#" ? (
                                                <a
                                                    href={project.url}
                                                    target={project.url.startsWith("http") ? "_blank" : "_self"}
                                                    rel={project.url.startsWith("http") ? "noopener noreferrer" : undefined}
                                                    className="block relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-2xl shadow-gray-200/50 cursor-pointer"
                                                >
                                                    <Image
                                                        src={project.thumbnail}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                                    {/* Hover Overlay */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                                                            <ExternalLink className="text-gray-900" size={24} />
                                                        </div>
                                                    </div>
                                                </a>
                                            ) : (
                                                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-2xl shadow-gray-200/50">
                                                    <Image
                                                        src={project.thumbnail}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className={`order-2 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="px-3 py-1 text-xs font-medium bg-gray-900 text-white rounded-full">
                                                    {project.category}
                                                </span>
                                                <span className="text-sm text-gray-400">{project.year}</span>
                                            </div>

                                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                                                {project.title}
                                            </h2>

                                            <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                                                {project.description}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-sm px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Stats */}
                                            <div className="flex gap-8 pt-6 border-t border-gray-100">
                                                {Object.entries(project.stats).map(([key, value]) => (
                                                    <div key={key}>
                                                        <div className="text-2xl font-bold text-gray-900">{value}</div>
                                                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* View Project Link */}
                                            {project.url && project.url !== "#" && (
                                                project.url.startsWith("http") ? (
                                                    <a
                                                        href={project.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mt-8 inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all"
                                                    >
                                                        View Project
                                                        <ArrowUpRight size={18} />
                                                    </a>
                                                ) : (
                                                    <Link
                                                        href={project.url}
                                                        className="mt-8 inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all"
                                                    >
                                                        View Project
                                                        <ArrowUpRight size={18} />
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="pt-20 pb-6 bg-gray-900">
                    <div className="container mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                                Ready to start your project?
                            </h2>
                            <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
                                Let's discuss how we can help bring your vision to life with our expertise.
                            </p>
                            <button
                                onClick={openContactModal}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
                            >
                                Get in Touch
                                <ArrowUpRight size={18} />
                            </button>
                        </motion.div>
                        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative">
                            {/* Left: Terms */}
                            <Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors font-medium">
                                Terms & Conditions
                            </Link>

                            {/* Center: Copyright */}
                            <div className="text-sm text-gray-500 md:absolute md:left-1/2 md:-translate-x-1/2">
                                © {new Date().getFullYear()} Zed Code. All rights reserved.
                            </div>

                            {/* Right: Socials */}
                            <div className="flex gap-4 items-center">
                                {siteContent.social.map((item) => {
                                    const Icon = { Github, Instagram, Linkedin, Tiktok: TiktokIcon }[item.icon];
                                    return (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-500 hover:text-white transition-colors"
                                            aria-label={item.label}
                                        >
                                            {Icon && <Icon size={18} />}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
