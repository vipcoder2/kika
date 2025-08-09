
import { Link } from 'wouter';
import { ArrowLeft, Shield, Eye, Lock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KK</span>
              </div>
              <div className="text-xl font-bold text-gray-900">KikaSports</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">How we protect and handle your information</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 2025</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p><strong>Automatically Collected Information:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and browser information</li>
                  <li>Device type and operating system</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring websites</li>
                </ul>
                
                <p className="pt-4"><strong>Information You Provide:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact form submissions</li>
                  <li>Feedback and support requests</li>
                  <li>Any other information you choose to share</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
              </div>
              <div className="space-y-3 text-gray-600">
                <p>We use the collected information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and improve our streaming services</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Monitor and analyze website performance</li>
                  <li>Detect and prevent technical issues</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold">Information Sharing</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To trusted service providers who assist in operating our website</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
                <p className="pt-4">All third-party providers are bound by confidentiality agreements and are prohibited from using your information for any other purpose.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
              <div className="space-y-4 text-gray-600">
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Remember your preferences</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Improve user experience</li>
                </ul>
                <p className="pt-4">You can control cookie settings through your browser preferences.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <div className="space-y-3 text-gray-600">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your information</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>Email: privacy@kikasports.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center pt-8">
            <p className="text-gray-500 text-sm">
              This privacy policy may be updated from time to time. We will notify you of any significant changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
