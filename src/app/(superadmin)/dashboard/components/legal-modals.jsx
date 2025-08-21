"use client"
import { Button } from "../../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog"
import { ScrollArea } from "../../../../components/ui/scroll-area"

export const PrivacyPolicyModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto">
          Privacy Policy
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>Last updated: {new Date().toLocaleDateString()}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-base mb-2">1. Information We Collect</h3>
              <p className="text-gray-600 mb-2">
                We collect information you provide directly to us, such as when you create an account, use our services,
                or contact us for support. This may include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Name, email address, and contact information</li>
                <li>Business information and financial data</li>
                <li>Customer and scheme management data</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">2. How We Use Your Information</h3>
              <p className="text-gray-600 mb-2">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and manage your account</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">3. Information Sharing</h3>
              <p className="text-gray-600">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy. We may share information with:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4 mt-2">
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">4. Data Security</h3>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no method of transmission over the internet is
                100% secure.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">5. Data Retention</h3>
              <p className="text-gray-600">
                We retain your information for as long as necessary to provide our services and comply with legal
                obligations. You may request deletion of your data by contacting us.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">6. Your Rights</h3>
              <p className="text-gray-600 mb-2">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>File a complaint with regulatory authorities</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">7. Contact Us</h3>
              <p className="text-gray-600">
                If you have questions about this Privacy Policy, please contact us at:
                <br />
                Email: privacy@skenterprises.com
                <br />
                Address: SK Enterprises Business Office
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export const TermsOfServiceModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto">
          Terms of Service
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>Last updated: {new Date().toLocaleDateString()}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-base mb-2">1. Acceptance of Terms</h3>
              <p className="text-gray-600">
                By accessing and using SK Enterprises services, you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">2. Description of Service</h3>
              <p className="text-gray-600">
                SK Enterprises provides business management tools including scheme management, customer database
                management, and related business operations services. We reserve the right to modify or discontinue
                services at any time.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">3. User Responsibilities</h3>
              <p className="text-gray-600 mb-2">You agree to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the service in compliance with applicable laws</li>
                <li>Not interfere with or disrupt the service</li>
                <li>Not use the service for illegal or unauthorized purposes</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">4. Payment Terms</h3>
              <p className="text-gray-600">
                Payment for services is due according to the agreed schedule. Late payments may result in service
                suspension. All fees are non-refundable unless otherwise specified in writing.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">5. Intellectual Property</h3>
              <p className="text-gray-600">
                The service and its original content, features, and functionality are owned by SK Enterprises and are
                protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">6. Limitation of Liability</h3>
              <p className="text-gray-600">
                SK Enterprises shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages resulting from your use of the service. Our total liability shall not exceed the amount paid by
                you for the service.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">7. Termination</h3>
              <p className="text-gray-600">
                We may terminate or suspend your account and access to the service immediately, without prior notice,
                for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third
                parties.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">8. Governing Law</h3>
              <p className="text-gray-600">
                These terms shall be governed by and construed in accordance with the laws of India, without regard to
                its conflict of law provisions.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">9. Contact Information</h3>
              <p className="text-gray-600">
                For questions about these Terms of Service, please contact us at:
                <br />
                Email: legal@skenterprises.com
                <br />
                Address: SK Enterprises Business Office
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
