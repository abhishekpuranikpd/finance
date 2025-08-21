"use client"

import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { ScrollArea } from "../../../components/ui/scroll-area"

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
    <FileText className="w-6 h-6 text-indigo-600" />
    <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
  </div>
</div>

                <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        <CardTitle className="text-2xl">SK Enterprises Terms of Service</CardTitle>
                        <p className="text-indigo-100">Last updated: {new Date().toLocaleDateString()}</p>
                    </CardHeader>

                    <CardContent className="p-8">
                        <ScrollArea className="h-[70vh] pr-4">
                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <section>
                                    <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                                    <p>
                                        By accessing and using SK Enterprises services, you agree to be bound by these terms.
                                        If you do not agree, please discontinue use of our services.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold mb-2">2. Description of Service</h2>
                                    <p>
                                        SK Enterprises provides business management tools including scheme management, customer
                                        database management, and related operations. We reserve the right to modify or discontinue
                                        services at any time.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Provide accurate and complete information</li>
                                        <li>Maintain the security of your account credentials</li>
                                        <li>Comply with applicable laws</li>
                                        <li>Not interfere with or disrupt the service</li>
                                        <li>Not use the service for illegal purposes</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold mb-2">4. Payment Terms</h2>
                                    <p>
                                        Payment for services is due as agreed. Late payments may result in service suspension.
                                        All fees are non-refundable unless otherwise specified.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
                                    <p>
                                        The service and its original content, features, and functionality are owned by
                                        SK Enterprises and protected by applicable intellectual property laws.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
                                    <p>
                                        SK Enterprises is not liable for indirect, incidental, or consequential damages
                                        from your use of the service. Our total liability shall not exceed the amount paid
                                        for the service.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
                                    <p>
                                        We may suspend or terminate your access immediately for violating these terms or
                                        engaging in harmful conduct.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
                                    <p>
                                        These terms are governed by the laws of India, without regard to conflict of law provisions.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-semibold mb-2">9. Contact Information</h2>
                                    <p>
                                        For questions about these Terms of Service, please contact us at:
                                    </p>
                                    <div className="bg-gray-50 p-4 rounded-lg mt-3">
                                        <p className="text-gray-700"><strong>SK Enterprises</strong></p>
                                        <p className="text-gray-700">Email: skenterprisesaland@gmail.com</p>
                                        <p className="text-gray-700">Phone: +91 9901091166</p>
                                    </div>
                                </section>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
