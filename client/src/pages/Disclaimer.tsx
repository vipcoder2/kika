
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AlertTriangle, Info, ExternalLink, Zap } from "lucide-react";

const Disclaimer = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer</title>
        <meta name="description" content="Important legal disclaimer regarding our streaming services. Read our terms of use, content policies, and legal notices before using our platform." />
        <link rel="canonical" href={`${window.location.origin}/disclaimer`} />
        <meta property="og:title" content="Disclaimer" />
        <meta property="og:description" content="Important legal disclaimer regarding our streaming services. Read our terms of use, content policies, and legal notices before using our platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/disclaimer`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Disclaimer" />
        <meta name="twitter:description" content="Important legal disclaimer regarding our streaming services. Read our terms of use, content policies, and legal notices before using our platform." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-yellow-50 rounded-full">
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Disclaimer</h1>
                <p className="text-gray-600 text-lg">Important legal information and notices</p>
              </div>
            </div>

            <div className="space-y-8">
              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Info className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">General Information</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>This website provides information and links to football streaming content. The information provided on this website is for general informational purposes only.</p>
                  <p>We do not guarantee the accuracy, completeness, or usefulness of any information provided, and we are not responsible for any errors or omissions in the content.</p>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <ExternalLink className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Third-Party Content</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>Our website may contain links to third-party websites and streaming services. We do not control these external sites and are not responsible for their content, privacy policies, or practices.</p>
                  <p>Users access third-party content at their own risk and should review the terms and conditions of any external websites they visit.</p>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Use at Your Own Risk</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>The use of this website and any streaming services is at your own risk. We provide the platform "as is" without any warranties, express or implied.</p>
                  <p>We are not liable for any damages, losses, or issues that may arise from the use of our website or any linked streaming services.</p>
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Copyright Notice</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>We respect intellectual property rights and expect users to do the same. If you believe that any content on our website infringes your copyright, please contact us immediately.</p>
                  <p>Users are responsible for ensuring they have the right to access and view any content through our platform.</p>
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

export default Disclaimer;
