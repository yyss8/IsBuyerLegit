import React, { useState } from 'react';

const PlatformRouting = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const handleSelect = (platform) => {
    setSelectedPlatform(platform);
    console.log(`Are you an eBay/local seller? | User selected: ${platform}`);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-[#111111] flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full text-center space-y-16">
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Where do you sell?
        </h1>
        
        {/* Cards Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full mt-12">
          
          {/* Card A: eBay */}
          <button
            onClick={() => handleSelect('eBay')}
            className={`flex-1 w-full max-w-sm p-12 rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 hover:border-[#D4AF37] hover:text-[#D4AF37] group focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/50 shadow-sm hover:shadow-md ${
              selectedPlatform === 'eBay' 
                ? 'border-[#D4AF37] text-[#D4AF37] bg-white ring-1 ring-[#D4AF37]' 
                : 'border-[#CCCCCC] text-[#111111] bg-white'
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-3xl md:text-4xl font-bold">Are you an<br/>eBay seller?</span>
            </div>
          </button>

          {/* Card B: Local */}
          <button
            onClick={() => handleSelect('Local')}
            className={`flex-1 w-full max-w-sm p-12 rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 hover:border-[#D4AF37] hover:text-[#D4AF37] group focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/50 shadow-sm hover:shadow-md ${
              selectedPlatform === 'Local' 
                ? 'border-[#D4AF37] text-[#D4AF37] bg-white ring-1 ring-[#D4AF37]' 
                : 'border-[#CCCCCC] text-[#111111] bg-white'
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <span className="text-3xl md:text-4xl font-bold leading-tight">Are you a<br/>local seller?</span>
              <span className="text-sm md:text-base opacity-70 group-hover:opacity-100 transition-opacity font-medium group-hover:text-[#D4AF37]">
                Facebook Marketplace, OfferUp
              </span>
            </div>
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default PlatformRouting;
