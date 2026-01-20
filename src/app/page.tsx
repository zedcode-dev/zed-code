"use client";

import { useState, useEffect, useRef } from "react";



import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, Server, Palette, Code, Check, Quote, Sparkles, Github, Instagram, Linkedin } from "lucide-react";
import { TiktokIcon } from "@/components/common/Icons";
import { siteContent } from "@/config/content";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import {
  FullpageContainer,
  FullpageSection,
  SectionContent,
  ScrollIndicator,
} from "@/components/fullpage/FullpageScroll";
import { TextReveal, Magnetic } from "@/components/animations";
import { MouseParallax } from "@/components/animations/MouseParallax";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import Image from "next/image";
import { ContactModal } from "@/components/contact/ContactModal";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe,
  Server,
  Palette,
  Code,
};

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { pages, identity } = siteContent;
  const { hero, services, about, testimonials, cta } = pages.home;

  return (
    <>
      <FullpageContainer header={<Header />}>
        {/* ==================== HERO ==================== */}
        <FullpageSection className="bg-white">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-grid" />

          {/* Animated Gradient Orbs - Larger and more vibrant */}
          <div className="absolute inset-0 z-0">
            <motion.div
              className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-200 to-purple-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-40"
              animate={{
                x: [-100, 100, -100],
                y: [-50, 100, -50],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-40"
              animate={{
                x: [50, -100, 50],
                y: [0, 150, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            />
            <motion.div
              className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-pink-100 to-rose-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-40"
              animate={{
                x: [0, 80, 0],
                y: [50, -50, 50],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 10 }}
            />
          </div>


          <SectionContent index={0} className="px-6 lg:px-0">


            <div className="max-w-screen-xl mx-auto text-center w-full">
              {/* Badge - Pop in with bounce */}
              <div className="flex justify-center w-full mb-8">
                <motion.div
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/50 backdrop-blur-xl rounded-full border border-gray-200/60 shadow-lg shadow-gray-200/20"
                  initial={{ opacity: 0, y: -40, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </motion.div>
                  <span className="text-sm font-semibold text-gray-800">{hero.badge}</span>
                </motion.div>
              </div>

              {/* ZED CODE Brand Title - Clean & Premium */}
              <div className="relative mb-6 text-center">
                <h1 className="text-7xl sm:text-8xl md:text-[7rem] lg:text-[8rem] font-black tracking-tighter leading-none select-none relative z-10">
                  <span
                    className="bg-clip-text text-transparent bg-[length:200%_100%] animate-shine"
                    style={{
                      backgroundImage: "linear-gradient(110deg, #09090b 20%, #4c1d95 38%, #ffffff 50%, #4c1d95 62%, #09090b 80%)",
                    }}
                  >
                    ZED CODE
                  </span>
                </h1>

                {/* Colored Glow behind - Pulse animation */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-purple-600/15 blur-[120px] -z-10 rounded-full mix-blend-color-burn pointer-events-none"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>

              {/* Main Title - Slide Up with Stagger */}
              <motion.div
                className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-10 leading-tight max-w-4xl mx-auto overflow-hidden"
              >
                <div className="overflow-hidden inline-block py-2">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                    className="block"
                  >
                    {hero.title}
                  </motion.span>
                </div>
              </motion.div>

              {/* Subtitle - Fade In */}
              <motion.p
                className="text-xl md:text-2xl lg:text-[1.4rem] text-gray-500 leading-relaxed mb-14 max-w-3xl mx-auto"
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {hero.subtitle}
              </motion.p>

              {/* CTAs - Elastic Pop */}
              <motion.div
                className="flex flex-col sm:flex-row gap-5 justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1 }}
              >
                <Magnetic strength={0.12}>
                  <Button variant="primary" size="lg" icon={<ArrowRight size={20} />} className="text-base px-10" onClick={() => setIsContactOpen(true)}>
                    {hero.ctaPrimary.label}
                  </Button>
                </Magnetic>
                <Magnetic strength={0.12}>
                  <Link href={hero.ctaSecondary.href}>
                    <Button variant="secondary" size="lg" className="text-base px-10">
                      {hero.ctaSecondary.label}
                    </Button>
                  </Link>
                </Magnetic>
              </motion.div>
            </div>
          </SectionContent>

          <ScrollIndicator />
        </FullpageSection>

        {/* ==================== SERVICES ==================== */}
        <FullpageSection className="bg-[#FAFAFA]" id="services">
          <div className="absolute inset-0 bg-grid opacity-30" />

          <SectionContent index={1} className="px-6 lg:px-0">
            <div className="max-w-screen-xl mx-auto w-full">
              <div className="text-center mb-20">
                <motion.span
                  className="inline-block text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  What We Do
                </motion.span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  <TextReveal text="Comprehensive digital solutions" />
                </h2>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">{services.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.items.map((service, index) => {
                  const IconComponent = iconMap[service.icon];
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.12, duration: 0.7 }}
                    >
                      <Card hoverable tilt className="h-full text-center py-6 px-5 group">
                        <motion.div
                          className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-lg shadow-gray-900/15"
                          whileHover={{ scale: 1.05, rotate: 3 }}
                          transition={{ duration: 0.3 }}
                        >
                          {IconComponent && <IconComponent size={26} className="text-white" />}
                        </motion.div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </SectionContent>

          <ScrollIndicator />
        </FullpageSection>

        {/* ==================== PORTFOLIO PREVIEW ==================== */}
        <FullpageSection className="bg-[#FAFAFA]">
          <SectionContent index={2} className="px-6 lg:px-0">
            <div className="max-w-screen-xl mx-auto w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                  <motion.span
                    className="inline-block text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                  >
                    Portfolio
                  </motion.span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                    <TextReveal text={pages.home.portfolio.title} />
                  </h2>
                </div>
                <Link href="/portfolio" className="group flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all">
                  View all projects
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Portfolio Grid - Show 3 items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pages.home.portfolio.items.slice(0, 3).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <Link href="/portfolio" className="block">
                      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300">
                        {/* Thumbnail */}
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-900 rounded-full">
                            {project.category}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{project.title}</h3>
                          <p className="text-gray-500 text-sm line-clamp-2">{project.description}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionContent>

          <ScrollIndicator />
        </FullpageSection>

        {/* ==================== ABOUT ==================== */}
        <FullpageSection className="bg-white" id="about">
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <SectionContent index={3} className="px-6 lg:px-0">
            <div className="max-w-screen-xl mx-auto w-full">
              <div className="text-center mb-12">
                <motion.span
                  className="inline-block text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  About Us
                </motion.span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  <TextReveal text={about.title} />
                </h2>
                <motion.p
                  className="text-lg text-gray-500 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {about.description}
                </motion.p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 mt-12">
                {about.items.map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
                      {item.value}
                    </div>
                    <p className="text-gray-400 font-medium text-sm">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionContent>

          <ScrollIndicator />
        </FullpageSection>

        {/* ==================== TESTIMONIALS ==================== */}
        <FullpageSection className="bg-[#FAFAFA]" id="testimonials">
          <SectionContent index={4} className="px-6 lg:px-0">
            <div className="max-w-screen-xl mx-auto w-full">
              <div className="text-center mb-12">
                <motion.span
                  className="inline-block text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  Testimonials
                </motion.span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  <TextReveal text={testimonials.title} />
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.items.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.7 }}
                  >
                    <Card hoverable tilt className="h-full py-6 px-5">
                      <Quote size={28} className="text-gray-200 mb-4" />
                      <blockquote className="text-gray-700 text-sm leading-relaxed mb-5">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{testimonial.author}</p>
                          <p className="text-gray-500 text-xs">{testimonial.role}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionContent>

          <ScrollIndicator />
        </FullpageSection>

        {/* ==================== CTA ==================== */}
        <FullpageSection className="bg-gray-900 text-white" id="contact">
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 opacity-[0.2]"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "48px 48px",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
          </div>

          {/* Animated Sparkles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                top: `${(i * 15 + 10) % 90}%`,
                left: `${10 + i * 10}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8,
              }}
            >
              <Sparkles size={16} className="text-white/20" />
            </motion.div>
          ))}

          <SectionContent index={5} className="px-6 lg:px-0">
            <div className="max-w-screen-xl mx-auto text-center w-full">
              <motion.span
                className="inline-block text-sm font-semibold text-white/60 uppercase tracking-[0.2em] mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                Let's Work Together
              </motion.span>

              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {cta.title}
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl text-white mb-14 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {cta.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Magnetic strength={0.1}>
                  <Button
                    variant="secondary"
                    size="lg"
                    icon={<ArrowRight size={20} />}
                    className="bg-white text-gray-900 hover:bg-gray-100 border-none shadow-lg"
                    onClick={() => setIsContactOpen(true)}
                  >
                    {cta.ctaPrimary.label}
                  </Button>
                </Magnetic>
              </motion.div>
            </div>
          </SectionContent>

          {/* Footer Bar */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {/* Left: Terms */}
            <Link href="/terms" className="hover:text-white transition-colors font-medium">
              Terms & Conditions
            </Link>

            {/* Center: Copyright (absolute centered on desktop) */}
            <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
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
                    className="hover:text-white transition-colors"
                    aria-label={item.label}
                  >
                    {Icon && <Icon size={18} />}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </FullpageSection>
      </FullpageContainer>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
