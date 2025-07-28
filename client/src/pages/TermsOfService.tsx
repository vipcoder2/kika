
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FileText, Users, Gavel, AlertCircle } from "lucide-react";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service</title>
        <meta name="description" content="Read our terms of service and user agreement. Understand your rights and responsibilities when using our football streaming platform and services." />
        <link rel="canonical" href={`${window.location.origin}/terms-of-service`} />
        <meta property="og:title" content="Terms of Service" />
        <meta property="og:description" content="Read our terms of service and user agreement. Understand your rights and responsibilities when using our football streaming platform and services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/terms-of-service`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Service" />
        <meta name="twitter:description" content="Read our terms of service and user agreement. Understand your rights and responsibilities when using our football streaming platform and services." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-red-50 rounded-full">
                    <FileText className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Terms of Service</h1>
                <p className="text-gray-600 text-lg">Last updated: December 12, 2024</p>
              </div>
            </div>

            <div className="space-y-8">
              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>By accessing and using our website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>
                  <p>If you do not agree to abide by the above, please do not use this service.</p>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Gavel className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Use License</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>
                  <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">User Conduct</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the rights of others</li>
                    <li>Distribute spam, malware, or other harmful content</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt our services</li>
                  </ul>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Disclaimer</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Limitations</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.</p>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Revisions</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>We may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
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

export default TermsOfService;
