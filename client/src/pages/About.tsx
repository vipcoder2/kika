
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "../contexts/LanguageContext";
import { Trophy, HelpCircle, Users, Mail } from "lucide-react";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                <Trophy className="w-6 h-6 text-red-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t('aboutUs')} KikaSports</h1>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">{t('ourMission')}</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {t('missionContent')}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('goalContent')}
                </p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">{t('whatWeOffer')}</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900 font-medium">{t('liveStreamsFeature')}</strong>
                    <p className="text-gray-700">{t('liveStreamsDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900 font-medium">{t('matchHighlights')}</strong>
                    <p className="text-gray-700">{t('catchUpOnHighlights')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900 font-medium">{t('communityEngagement')}</strong>
                    <p className="text-gray-700">{t('joinDiscussions')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900 font-medium">{t('comprehensiveSchedule')}</strong>
                    <p className="text-gray-700">{t('detailedCalendar')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900 font-medium">{t('competitionCoverage')}</strong>
                    <p className="text-gray-700">{t('majorLeagues')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold text-gray-900">{t('joinOurCommunity')}</h2>
              </div>
              <p className="mb-4 text-gray-700">
                {t('createFreeAccount')}
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  {t('unlimitedAccess')}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  {t('liveMatchChats')}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  {t('personalizedNotifications')}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  {t('favoriteTeamTracking')}
                </div>
              </div>
              <Button asChild className="w-full bg-red-500 hover:bg-red-600 text-white">
                <Link to="/login">{t('registerNow')}</Link>
              </Button>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold text-gray-900">{t('contactUs')}</h2>
              </div>
              <p className="mb-4 text-gray-700">
                {t('questionsOrFeedback')}
              </p>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-500" />
                  <span>support@kikasports.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
