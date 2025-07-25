
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, MessageSquare, Phone, MapPin, Send } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us</title>
        <meta name="description" content="Get in touch with our support team for help with streaming issues, technical problems, or general inquiries. We're here to help you enjoy the best football streaming experience." />
        <link rel="canonical" href={`${window.location.origin}/contact-us`} />
        <meta property="og:title" content="Contact Us" />
        <meta property="og:description" content="Get in touch with our support team for help with streaming issues, technical problems, or general inquiries. We're here to help you enjoy the best football streaming experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/contact-us`} />
        <meta name="twitter:card" content="https://i.ibb.co/sdC85N9X/Kikasports-cover.png" />
        <meta name="twitter:title" content="Contact Us" />
        <meta name="twitter:description" content="Get in touch with our support team for help with streaming issues, technical problems, or general inquiries. We're here to help you enjoy the best football streaming experience." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-red-50 rounded-full">
                    <MessageSquare className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Contact Us</h1>
                <p className="text-gray-600 text-lg">Get in touch with our support team</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-red-500" />
                    <h3 className="text-xl font-bold text-gray-900">Email Support</h3>
                  </div>
                  <p className="text-gray-700 mb-2">For general inquiries and support</p>
                  <p className="text-red-500 font-medium">support@kikasports.com</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Phone className="w-6 h-6 text-red-500" />
                    <h3 className="text-xl font-bold text-gray-900">Phone Support</h3>
                  </div>
                  <p className="text-gray-700 mb-2">Available 24/7 for urgent issues</p>
                  <p className="text-red-500 font-medium">+1 (555) 123-4567</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-red-500" />
                    <h3 className="text-xl font-bold text-gray-900">Address</h3>
                  </div>
                  <p className="text-gray-700">
                    123 Sports Avenue<br />
                    Streaming City, SC 12345<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-500 focus:outline-none"
                      >
                        <option value="">Select a subject</option>
                        <option value="technical">Technical Support</option>
                        <option value="streaming">Streaming Issues</option>
                        <option value="account">Account Problems</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none resize-vertical"
                        placeholder="Describe your issue or inquiry in detail..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
