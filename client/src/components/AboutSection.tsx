
import React from "react";
import { Trophy, Tv, Shield, Users, Star } from "lucide-react";

const AboutSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-sport-card/40 to-sport-card/20 rounded-2xl p-6 border border-sport-muted/20">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Star className="w-8 h-8 text-sport-primary" />
          HD Football Live Stream
        </h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Kikasports offers you a live broadcast of hd football live stream and nba live stream tv channels. Through us, you can watch the free live football streaming hd with ease on your mobile, tablet and desktop devices.

          Watch all the live football matches such as the European Champions League, the English Premier League, the Spanish League and other major tournaments that are shown through the network of beIN, SKY SPORTS, BTSports Sports channels with ease. 

          Kikasports totally a free website for football lovers who never wants to miss any action no matter where they are.This is an easy to use site on which you can watch all the football matches happening Live.The Live football match stream is in HD quality
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-sport-dark/40 rounded-xl">
          <div className="w-12 h-12 bg-sport-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Tv className="w-6 h-6 text-sport-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Live Football Stream HD</h3>
          <p className="text-gray-300 text-sm">

            We are totally a free website for football lovers who never wants to miss any action no matter where they are. 

          </p>
        </div>
        
        <div className="text-center p-4 bg-sport-dark/40 rounded-xl">
          <div className="w-12 h-12 bg-sport-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-sport-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">All Leagues</h3>
          <p className="text-gray-300 text-sm">
            This is an easy to use site on which you can watch all the live football stream hd matches. 
          </p>
        </div>
        
        <div className="text-center p-4 bg-sport-dark/40 rounded-xl">
          <div className="w-12 h-12 bg-sport-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-sport-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Secure & Safe</h3>
          <p className="text-gray-300 text-sm">
            The Live football match stream is in HD quality. Enjoy free hd football live stream matches without the hassle of monthly subscription or plan.
          </p>
        </div>
        
        <div className="text-center p-4 bg-sport-dark/40 rounded-xl">
          <div className="w-12 h-12 bg-sport-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-sport-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
          <p className="text-gray-300 text-sm">
            Join thousands of football fans in our live chat during matches on our <a href="https://t.me/+Zo7CoigxqRczMjRk">telegram</a> channel.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
