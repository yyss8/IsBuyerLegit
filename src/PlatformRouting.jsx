import React, { useEffect, useState } from 'react';

const PlatformRouting = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (platform) => {
    setSelectedPlatform(platform);
    console.log(`You are a ${platform} buyer | User selected: ${platform}`);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-[#111111] p-6 font-sans">
      <div className="mx-auto max-w-5xl min-h-screen flex items-center justify-center">
        <div className="w-full text-center relative h-[60vh] flex items-center justify-center">
          <div
            className={`absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out ${
              hasAnimated
                ? 'top-[24%] text-5xl md:text-6xl opacity-100'
                : 'top-1/2 -translate-y-1/2 text-6xl md:text-7xl opacity-0'
            } font-bold tracking-tight`}
          >
            Is your buyer legit
          </div>

          <div
            className={`transition-opacity duration-700 ${
              hasAnimated ? 'opacity-100 delay-300' : 'opacity-0'
            } mt-36 md:mt-40 text-2xl md:text-3xl font-semibold`}
          >
            <span>You are a </span>
            <span className="font-bold">[</span>
            <button
              onClick={() => handleSelect('ebay')}
              className={`mx-1 font-bold transition-all duration-300 hover:text-[#D4AF37] ${
                selectedPlatform === 'ebay' ? 'text-[#D4AF37] underline underline-offset-4' : 'text-[#111111]'
              }`}
            >
              ebay
            </button>
            <span className="font-bold">/</span>
            <button
              onClick={() => handleSelect('local')}
              className={`mx-1 font-bold transition-all duration-300 hover:text-[#D4AF37] ${
                selectedPlatform === 'local' ? 'text-[#D4AF37] underline underline-offset-4' : 'text-[#111111]'
              }`}
            >
              local
            </button>
            <span className="font-bold">]</span>
            <span> buyer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformRouting;
