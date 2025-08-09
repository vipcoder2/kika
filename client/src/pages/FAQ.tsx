import { Link } from 'wouter';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

const faqs = [
  {
    question: "How do I watch live matches?",
    answer: "Simply browse our match listings and click the 'Watch' button on any live match. You'll be taken to the streaming page where you can select from multiple stream sources."
  },
  {
    question: "Are the streams free?",
    answer: "Yes, all our streams are completely free. We provide access to live football matches without any subscription fees or hidden charges."
  },
  {
    question: "What quality options are available?",
    answer: "We offer multiple stream sources with various quality options to ensure optimal viewing experience based on your internet connection speed."
  },
  {
    question: "Can I watch on mobile devices?",
    answer: "Absolutely! Our platform is fully optimized for mobile devices, tablets, and desktop computers. You can watch matches anywhere, anytime."
  },
  {
    question: "Why is a stream not working?",
    answer: "If a stream isn't working, try switching to an alternative stream source. We provide multiple options to ensure you don't miss any action. If issues persist, try refreshing the page."
  },
  {
    question: "Do you have upcoming match schedules?",
    answer: "Yes, we display upcoming matches with dates and times. You can see what matches are scheduled to help you plan your viewing."
  },
  {
    question: "What leagues and competitions do you cover?",
    answer: "We cover major football leagues and competitions including Premier League, La Liga, Serie A, Bundesliga, Champions League, and many more."
  },
  {
    question: "Is registration required?",
    answer: "No registration is required for watching matches. Simply visit our site and start streaming immediately."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-4">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <h3 className="font-semibold text-gray-900 pr-4">{question}</h3>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
          )}
        </button>
        {isOpen && (
          <div className="px-6 pb-6">
            <p className="text-gray-600 leading-relaxed">{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function FAQ() {
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
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about kikaSports</p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        <div className="text-center pt-12">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}