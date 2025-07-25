
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Shield, Lock, Eye, UserCheck, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
        <meta name="description" content="Learn how we protect your privacy and handle your personal data. Comprehensive privacy policy covering data collection, usage, cookies, and your privacy rights." />
        <link rel="canonical" href={`${window.location.origin}/privacy-policy`} />
        <meta property="og:title" content="Privacy Policy" />
        <meta property="og:description" content="Learn how we protect your privacy and handle your personal data. Comprehensive privacy policy covering data collection, usage, cookies, and your privacy rights." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/privacy-policy`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy" />
        <meta name="twitter:description" content="Learn how we protect your privacy and handle your personal data. Comprehensive privacy policy covering data collection, usage, cookies, and your privacy rights." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-red-50 rounded-full">
                    <Shield className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
                <p className="text-gray-600 text-lg">Last updated: December 12, 2024</p>
              </div>
            </div>

            <div className="space-y-8">
              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Account information (username, email address)</li>
                    <li>Usage data and preferences</li>
                    <li>Device information and IP address</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>We use the information we collect to provide, maintain, and improve our services:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide and deliver streaming services</li>
                    <li>Personalize your experience</li>
                    <li>Send important updates and notifications</li>
                    <li>Analyze usage patterns to improve our platform</li>
                    <li>Prevent fraud and ensure security</li>
                  </ul>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <UserCheck className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>You have certain rights regarding your personal information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Control cookie preferences</li>
                    <li>Data portability rights</li>
                  </ul>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                </div>
                <div className="text-gray-700">
                  <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                  <p className="mt-2 text-red-500 font-medium">privacy@kikasports.com</p>
                </div>
              </section>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
