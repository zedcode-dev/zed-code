"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";

export default function TermsPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-24 pb-12">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
                    <div className="absolute inset-0 bg-grid opacity-40" />

                    <div className="container relative mx-auto px-6">
                        {/* Back Link */}


                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Terms & Conditions - ZED CODE
                            </h1>
                            <p className="text-lg text-gray-500">
                                <strong>Last updated: January 17, 2026</strong>
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="prose prose-gray max-w-3xl mx-auto"
                        >
                            <div className="space-y-8">
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        By accessing or using ZED CODE&apos;s services, you agree to be bound by these Terms and Conditions (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our services. These Terms constitute a legally binding agreement between you (&quot;Client&quot;) and ZED CODE (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Description</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        ZED CODE provides professional web development services, including but not limited to:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                        <li>Custom website design and development</li>
                                        <li>Website maintenance and support</li>
                                        <li>E-commerce solutions</li>
                                        <li>Content management systems (CMS)</li>
                                        <li>Website optimization and performance enhancement</li>
                                        <li>Custom software solutions as agreed upon</li>
                                    </ul>
                                    <p className="text-gray-600 leading-relaxed">
                                        All services are subject to the specific terms agreed upon in individual project contracts or statements of work.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Intellectual Property Rights</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>3.1 Client Ownership:</strong> Upon receipt of full and final payment, clients receive full ownership of the final deliverables as specified in the project agreement, including custom code, designs, and content created specifically for the client.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>3.2 Portfolio Rights:</strong> ZED CODE retains the right to showcase completed projects in its portfolio, marketing materials, case studies, and promotional content as part of its standard service terms. This right is non-negotiable for standard engagements. Clients may request anonymization of highly sensitive business information or branding elements, provided that ZED CODE retains the right to display the visual, technical, and architectural aspects of the work. Exceptions may apply only where explicitly agreed in writing for NDA or white-label engagements.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>3.3 Pre-existing Materials:</strong> ZED CODE retains ownership of all pre-existing intellectual property, including frameworks, libraries, tools, templates, and methodologies used in delivering services.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        <strong>3.4 Third-party Components:</strong> Some projects may incorporate third-party software, plugins, or services subject to their own licenses. Clients are responsible for compliance with such licenses.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>4.1 Standard Terms:</strong> Payment terms are specified in individual project proposals and typically include:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                        <li>50% upfront deposit before project commencement</li>
                                        <li>Milestone-based payments throughout the development process</li>
                                        <li>Final payment upon project completion and before final delivery</li>
                                    </ul>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>4.2 Payment Methods:</strong> We accept bank transfers, credit cards, and other payment methods as specified in the project proposal.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>4.3 Late Payments:</strong> Payments not received within 15 days of the due date may incur a late fee of 5% per month. Work may be suspended until payment is received.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>4.4 Currency:</strong> All payments are in Egyptian Pounds (EGP) unless otherwise specified in the project agreement.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        <strong>4.5 Taxes:</strong> All prices are exclusive of applicable taxes unless stated otherwise. Clients are responsible for any applicable VAT or other taxes.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Project Scope and Changes</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>5.1 Scope Definition:</strong> The project scope is defined in the project proposal or statement of work. Any work outside this scope constitutes a change request.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>5.2 Change Requests:</strong> Changes to the agreed scope may affect timelines and costs. All change requests must be submitted in writing and will be evaluated for feasibility and additional charges.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        <strong>5.3 Client Responsibilities:</strong> Clients must provide timely feedback, necessary materials, access credentials, and approvals as outlined in the project agreement. Delays in client input may affect project timelines.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Project Timelines</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>6.1 Estimates:</strong> Project timelines are good-faith estimates based on the defined scope of work and assume timely client cooperation.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>6.2 Delays:</strong> Delays may occur due to scope changes, delayed client feedback, technical challenges, third-party dependencies, or force majeure events. We will communicate any significant timeline changes promptly.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        <strong>6.3 No Penalty:</strong> ZED CODE is not liable for delays caused by circumstances beyond our reasonable control.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Testing and Acceptance</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>7.1 Testing Period:</strong> Clients will have a specified testing period (typically 7-14 days) to review deliverables and report any issues.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>7.2 Bug Fixes:</strong> Critical bugs or errors that prevent core functionality will be fixed at no additional charge during the testing period.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        <strong>7.3 Acceptance:</strong> Deliverables are considered accepted if no written objection is received within the testing period.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Warranty and Support</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>8.1 Warranty Period:</strong> We provide a 30-day warranty from project delivery covering critical bugs and errors in our code that prevent core functionality.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>8.2 Exclusions:</strong> The warranty does not cover issues caused by client modifications, third-party services, hosting environment changes, or normal wear and tear.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        <strong>8.3 Post-Warranty Support:</strong> Ongoing maintenance and support services are available under separate agreements.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Hosting and Third-Party Services</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>9.1 Client Responsibility:</strong> Unless otherwise agreed, clients are responsible for obtaining and maintaining their own web hosting, domain registration, and third-party services.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>9.2 Recommendations:</strong> We may recommend hosting providers or third-party services, but clients enter into agreements directly with these providers.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        <strong>9.3 No Liability:</strong> ZED CODE is not responsible for issues arising from third-party services, including downtime, security breaches, or service termination.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Confidentiality and Data Protection</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>10.1 Confidential Information:</strong> We maintain strict confidentiality regarding all client information, business data, and project details. Sensitive information will not be disclosed to third parties without explicit written consent.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>10.2 Data Protection:</strong> We comply with applicable data protection laws in handling client data. Clients remain responsible for their own compliance with privacy laws regarding end-user data.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        <strong>10.3 Security:</strong> While we implement reasonable security measures, clients acknowledge that no system is completely secure. We are not liable for unauthorized access due to circumstances beyond our control.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>11.1 Indirect Damages:</strong> ZED CODE shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>11.2 Liability Cap:</strong> Our total liability for any claim arising from our services is limited to the total amount paid by the client for the specific service in question.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        <strong>11.3 Exceptions:</strong> Nothing in these Terms excludes liability for fraud, gross negligence, or matters that cannot be excluded under Egyptian law.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Indemnification</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Client agrees to indemnify and hold ZED CODE harmless from any claims, damages, or expenses arising from:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>Client&apos;s use of deliverables</li>
                                        <li>Content provided by the client</li>
                                        <li>Client&apos;s violation of third-party rights</li>
                                        <li>Client&apos;s violation of applicable laws</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Termination</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>13.1 Termination by Either Party:</strong> Either party may terminate a project agreement with 14 days written notice.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>13.2 Payment Upon Termination:</strong> In case of termination, the client is responsible for payment of all work completed and approved up to the termination date, plus any non-refundable expenses incurred.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>13.3 Delivery of Work:</strong> Upon receipt of payment for completed work, we will deliver all completed materials in their current state.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        <strong>13.4 Termination for Breach:</strong> We reserve the right to terminate immediately if the client breaches these Terms, including non-payment.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Governing Law and Dispute Resolution</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>14.1 Governing Law:</strong> These Terms are governed by the laws of the Arab Republic of Egypt.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>14.2 Jurisdiction:</strong> Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Giza, Egypt.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        <strong>14.3 Amicable Resolution:</strong> Parties agree to attempt to resolve disputes amicably through good-faith negotiation before pursuing legal action.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Force Majeure</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        ZED CODE is not liable for failure to perform obligations due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, pandemic, government actions, or infrastructure failures.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Entire Agreement</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        These Terms, together with any project-specific agreements, constitute the entire agreement between the parties and supersede all prior discussions or agreements.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Severability</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Waiver</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        Failure to enforce any provision of these Terms does not constitute a waiver of that provision or any other provision.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Assignment</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        Clients may not assign their rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations to affiliates or successors.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Changes to Terms</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>20.1 Modification Rights:</strong> We reserve the right to modify these Terms at any time. Updated Terms will be posted on our website with a new &quot;Last updated&quot; date.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        <strong>20.2 Notification:</strong> Significant changes will be communicated to existing clients via email or through our website.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        <strong>20.3 Acceptance:</strong> Continued use of our services after changes constitutes acceptance of the new Terms. Clients who do not agree to modified Terms should discontinue use of our services.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">21. Contact Information</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        For questions about these Terms and Conditions, please contact us:
                                    </p>
                                    <div className="text-gray-600 leading-relaxed">
                                        <p><strong>ZED CODE</strong></p>
                                        <p>Location: Giza, Egypt</p>
                                        <p>Email: [contact@zcode.site]</p>
                                        <p>Website: [www.zcode.site]</p>
                                    </div>
                                </section>

                                <hr className="my-8 border-gray-200" />

                                <p className="text-gray-600 leading-relaxed text-center font-medium">
                                    <strong>By using ZED CODE&apos;s services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</strong>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 border-t border-gray-100">
                    <div className="container mx-auto px-6 text-center">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Zed Code. All rights reserved.
                        </p>
                    </div>
                </footer>
            </main>
        </>
    );
}
