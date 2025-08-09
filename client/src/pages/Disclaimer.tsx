
import { Link } from 'wouter';
import { ArrowLeft, AlertTriangle, Info, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Disclaimer() {
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
          <AlertTriangle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-xl text-gray-600">Important information about our services</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 2025</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Info className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold">General Information</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                The information contained on KikaSports website is for general information purposes only. 
                The information is provided by KikaSports and while we endeavor to keep the information up to date and correct, 
                we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, 
                reliability, suitability or availability with respect to the website or the information, products, services, 
                or related graphics contained on the website for any purpose.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold">Service Availability</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Stream Quality and Availability:</strong> We strive to provide high-quality streaming services, 
                  but we cannot guarantee uninterrupted service or perfect stream quality at all times. Stream availability 
                  may be affected by various factors including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Internet connection quality</li>
                  <li>Server maintenance</li>
                  <li>Third-party service issues</li>
                  <li>Geographic restrictions</li>
                  <li>High traffic volumes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Content and Copyright</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Third-Party Content:</strong> KikaSports may provide links to third-party streaming sources. 
                  We do not host any content ourselves and are not responsible for the availability, accuracy, 
                  or legality of third-party content.
                </p>
                <p>
                  <strong>Copyright Compliance:</strong> Users are responsible for ensuring their use of our service 
                  complies with applicable copyright laws in their jurisdiction. We respect intellectual property 
                  rights and will respond to valid copyright infringement notices.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                In no event will KikaSports be liable for any loss or damage including without limitation, indirect or 
                consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits 
                arising out of, or in connection with, the use of this website or our streaming services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
              <div className="space-y-3 text-gray-600">
                <p>By using our service, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the service for personal, non-commercial purposes only</li>
                  <li>Not attempt to circumvent any security measures</li>
                  <li>Not distribute or republish our content without permission</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Respect the rights of other users</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Technical Requirements</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>System Requirements:</strong> Our service requires a stable internet connection and 
                  a compatible device with an up-to-date web browser. We recommend:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Minimum 2 Mbps internet connection for standard quality</li>
                  <li>5 Mbps or higher for HD quality</li>
                  <li>Modern web browser with JavaScript enabled</li>
                  <li>Updated browser plugins if required</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Geographic Restrictions</h2>
              <p className="text-gray-600 leading-relaxed">
                Some content may not be available in all geographic locations due to licensing restrictions 
                or local regulations. We do not guarantee that all content will be accessible from all locations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to Disclaimer</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify this disclaimer at any time. Changes will be effective immediately 
                upon posting on this page. Your continued use of the service after any changes constitutes acceptance 
                of the new terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this disclaimer, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>Email: legal@kikasports.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center pt-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <p className="text-yellow-800 font-medium">
                By using KikaSports, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
