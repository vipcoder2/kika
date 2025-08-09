import { Link } from 'wouter';
import { ArrowLeft, Users, Trophy, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About KikaSports</h1>
          <p className="text-xl text-gray-600">Your premier destination for live football streaming</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold">Who We Are</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                KikaSports is a dedicated platform for football enthusiasts who want to watch live matches from around the world. 
                We provide high-quality streaming services for various football competitions, ensuring you never miss a moment 
                of the beautiful game.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Trophy className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to make football accessible to everyone, everywhere. We strive to provide reliable, 
                high-quality streaming services that bring the excitement of live football matches directly to your screen, 
                whether you're at home, at work, or on the go.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Globe className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold">What We Offer</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>• Live streaming of football matches from major leagues and competitions</p>
                <p>• Multiple stream quality options to suit your internet connection</p>
                <p>• Real-time match information and scores</p>
                <p>• User-friendly interface optimized for all devices</p>
                <p>• Regular updates on upcoming matches and fixtures</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold">Our Commitment</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We are committed to providing a safe, reliable, and enjoyable streaming experience. Our platform is 
                continuously monitored and updated to ensure optimal performance and security for all our users.
              </p>
            </CardContent>
          </Card>

          <div className="text-center pt-8">
            <p className="text-gray-600 mb-6">
              Thank you for choosing KikaSports as your football streaming destination!
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start Watching
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}