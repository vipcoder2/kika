
import { Link } from 'wouter';
import { ArrowLeft, Mail, MessageCircle, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.');
  };

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">Get in touch with our team</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Email Support</h3>
                </div>
                <p className="text-gray-600">support@kikasports.com</p>
                <p className="text-sm text-gray-500 mt-2">We typically respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Live Chat</h3>
                </div>
                <p className="text-gray-600">Available 24/7 for immediate assistance</p>
                <Button className="mt-3" size="sm">Start Chat</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Phone className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Phone Support</h3>
                </div>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500 mt-2">Mon-Fri: 9AM-6PM EST</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" type="text" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    required 
                    className="mt-1" 
                    rows={5}
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">How can I watch matches on KikaSports?</h4>
                <p className="text-gray-600">Simply browse our match listings and click on any match to start watching. No registration required!</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Is the streaming service free?</h4>
                <p className="text-gray-600">Yes, KikaSports provides free access to live football streaming for all users.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">What should I do if a stream is not working?</h4>
                <p className="text-gray-600">Try refreshing the page or switching to an alternative stream if available. If issues persist, contact our support team.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
