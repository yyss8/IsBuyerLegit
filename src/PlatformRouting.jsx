import React, { useState } from 'react';

const PlatformRouting = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const handleSelect = (platform) => {
    setSelectedPlatform(platform);
    console.log(`Where is your buyer from? | User selected: ${platform}`);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#E0E0E0] flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full text-center space-y-16">
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Where is your buyer from?
        </h1>
        
        {/* Cards Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full mt-12">
          
          {/* Card A: eBay */}
          <button
            onClick={() => handleSelect('eBay')}
            className={`flex-1 w-full max-w-sm p-12 rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 hover:border-[#FFC107] hover:text-[#FFC107] hover:bg-[#1A1A1A] group focus:outline-none focus:ring-4 focus:ring-[#FFC107]/50 ${
              selectedPlatform === 'eBay' 
                ? 'border-[#FFC107] text-[#FFC107] bg-[#1A1A1A]' 
                : 'border-[#E0E0E0] text-[#E0E0E0] bg-transparent'
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-4xl md:text-5xl font-bold">eBay</span>
            </div>
          </button>

          {/* Card B: Local */}
          <button
            onClick={() => handleSelect('Local')}
            className={`flex-1 w-full max-w-sm p-12 rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 hover:border-[#FFC107] hover:text-[#FFC107] hover:bg-[#1A1A1A] group focus:outline-none focus:ring-4 focus:ring-[#FFC107]/50 ${
              selectedPlatform === 'Local' 
                ? 'border-[#FFC107] text-[#FFC107] bg-[#1A1A1A]' 
                : 'border-[#E0E0E0] text-[#E0E0E0] bg-transparent'
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-3">
              <span className="text-4xl md:text-5xl font-bold">Local</span>
              <span className="text-base md:text-lg opacity-80 group-hover:opacity-100 transition-opacity font-medium">
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
