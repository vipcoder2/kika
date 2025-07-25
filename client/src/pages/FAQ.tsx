
import React from "react";
import { HelpCircle, Play, Smartphone, Wifi, Settings, Shield } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { useLanguage } from "../contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FAQ = () => {
  const { translate } = useLanguage();

  const faqs = [
    {
      question: translate("How can I watch live football matches?"),
      answer: translate("Simply browse our homepage or live matches section to find ongoing games. Click on any match to access multiple streaming sources and enjoy high-quality live football action.")
    },
    {
      question: translate("Is the streaming service free?"),
      answer: translate("Yes, our basic streaming service is completely free. You can watch live matches, view schedules, and access match information without any subscription fees.")
    },
    {
      question: translate("What devices can I use to watch matches?"),
      answer: translate("Our platform is compatible with all devices including desktop computers, laptops, tablets, and smartphones. We have responsive design that adapts to any screen size.")
    },
    {
      question: translate("Why is my stream buffering or lagging?"),
      answer: translate("Buffering can be caused by slow internet connection or high server load. Try switching to a different stream source, lowering the quality, or checking your internet connection speed.")
    },
    {
      question: translate("How do I find specific matches or teams?"),
      answer: translate("Use our schedule page to browse matches by date and competition. You can filter by specific leagues or use the search functionality to find your favorite teams.")
    },
    {
      question: translate("Are the streams safe to watch?"),
      answer: translate("We prioritize user safety and only link to reputable streaming sources. However, we recommend using ad blockers and keeping your browser updated for the best security.")
    },
    {
      question: translate("Can I watch matches on mobile devices?"),
      answer: translate("Absolutely! Our platform is fully optimized for mobile viewing. You can watch live matches on your smartphone or tablet with the same quality as desktop.")
    },
    {
      question: translate("What should I do if a stream is not working?"),
      answer: translate("If a stream isn't working, try refreshing the page or switching to an alternative stream source. Most matches have multiple streaming options available.")
    }
  ];

  return (
    <>
      <Helmet>
        <title>{translate("FAQ")}</title>
        <meta name="description" content={translate("Find answers to common questions about our football streaming service. Get help with watching live matches, technical issues, device compatibility, and more.")} />
        <link rel="canonical" href={`${window.location.origin}/faq`} />
        <meta property="og:title" content={translate("FAQ")} />
        <meta property="og:description" content={translate("Find answers to common questions about our football streaming service. Get help with watching live matches, technical issues, device compatibility, and more.")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/faq`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={translate("FAQ")} />
        <meta name="twitter:description" content={translate("Find answers to common questions about our football streaming service. Get help with watching live matches, technical issues, device compatibility, and more.")} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-red-50 rounded-full">
                    <HelpCircle className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{translate("Frequently Asked Questions")}</h1>
                <p className="text-gray-600 text-lg">{translate("Find answers to common questions about our streaming service")}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
                <Play className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">{translate("Streaming")}</h3>
                <p className="text-sm text-gray-700">{translate("Live match streaming and playback")}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
                <Smartphone className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">{translate("Devices")}</h3>
                <p className="text-sm text-gray-700">{translate("Compatible devices and platforms")}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
                <Shield className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">{translate("Safety")}</h3>
                <p className="text-sm text-gray-700">{translate("Security and privacy protection")}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                    <HelpCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>
                
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{translate("Still have questions?")}</h2>
                <p className="text-gray-700 mb-4">{translate("Can't find the answer you're looking for? Contact our support team.")}</p>
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  {translate("Contact Support")}
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FAQ;
