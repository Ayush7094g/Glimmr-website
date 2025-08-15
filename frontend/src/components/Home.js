// src/components/Home.js
import React from 'react';

import Header from './Header';
import Footer from './Footer';
import PremiumJewelrySection from "./PremiumJewelrySection";
import ARTryOnCard from './ARTryOnCard';

import TryOn from './ARTryOnCard';
import HeroIntro from './HeroIntro';
import AssuranceSection from './AssuranceSection';
import EarringsCollection from './EarringsCollection';
import EthnicRecommendation from './EthnicRecommendation';

const Home = () => {
  return (
    <div>
      
      <Header />
      <HeroIntro />
      <main className="p-4">
        {/* <h1 className="text-3xl font-bold mb-4">Welcome to My Jewellery App</h1> */}
        <PremiumJewelrySection />

        <ARTryOnCard />

        <div className="mt-20">
         
        </div>

        <div className="mt-20">
          <EarringsCollection />
        </div>

        {/* ✅ Ethnic Wear Recommendation Section */}
        <section className="mt-20 px-4 sm:px-10">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
            Recommended Ethnic Wear for You
          </h2>
          <EthnicRecommendation />
        </section>
      </main>
      <AssuranceSection />
      <Footer />
    </div>
  );
};

export default Home;
