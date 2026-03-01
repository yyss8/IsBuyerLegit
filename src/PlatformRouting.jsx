import React, { useEffect, useState } from 'react';

const PlatformRouting = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [hasMovedUp, setHasMovedUp] = useState(false);

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setIsTitleVisible(true);
    }, 80);

    const moveUpTimer = setTimeout(() => {
      setHasMovedUp(true);
    }, 1000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(moveUpTimer);
    };
  }, []);

  const handleSelect = (platform) => {
    setSelectedPlatform(platform);
    console.log(`You are an ${platform} buyer | User selected: ${platform}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#111111] p-6 font-sans">
      <div className="mx-auto min-h-screen flex items-center justify-center">
        <div className="w-full text-center relative h-[60vh]">
          {selectedPlatform === 'local' ? (
            <div className="absolute left-1/2 top-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#E7DFC9] bg-[#FFFDF7] p-8 md:p-10 text-left shadow-sm">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
                A More Detailed Fraud Detection Guide Is In Progress
              </h2>
              <ul className="mt-6 space-y-4 text-base md:text-lg leading-relaxed text-[#2B2B2B] list-disc pl-6">
                <li>
                  Do not trust buyers who seem unusually nice and offer to pay before meeting.
                </li>
                <li>
                  Meet in a safe, camera-monitored location (bank during business hours, police station).
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-[0.95em]">
                    <li>Not in a random parking lot.</li>
                    <li>Not outside a local fast-food spot (for example, Domino&apos;s).</li>
                  </ul>
                </li>
                <li>
                  Accept only safe, non-chargeback-friendly payment methods (cash or Zelle).
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-[0.95em]">
                    <li>For Zelle: use QR code scan or provide your phone number to avoid fake-email payment scams.</li>
                    <li>For cash: bring a counterfeit detection pen and check bills while the buyer inspects the item.</li>
                  </ul>
                </li>
                <li>
                  On Facebook Marketplace, reply within two messages to reduce negative-feedback risk and keep responses detailed.
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-[0.95em]">
                    <li>If buyer intent is unclear within two messages, treat it as a likely non-legit or problematic buyer.</li>
                    <li>Example response: “Yes, the item is available. I can meet at my local precinct from [time] to [time]. I accept cash or Zelle only.”</li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <div
                className={`absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out ${
                  hasMovedUp
                    ? 'top-[10%] text-5xl md:text-6xl'
                    : 'top-1/2 -translate-y-1/2 text-6xl md:text-7xl'
                } font-bold tracking-tight`}
                style={{ opacity: isTitleVisible ? 1 : 0 }}
              >
                Is Your Buyer Legit
              </div>

              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${
                  hasMovedUp ? 'opacity-100 delay-300' : 'opacity-0'
                } text-2xl md:text-3xl font-semibold`}
              >
                <span>You are an </span>
                <button
                  onClick={() => handleSelect('ebay')}
                  className={`cursor-pointer mx-1 px-1 rounded-sm font-extrabold underline decoration-2 underline-offset-4 transition-all duration-300 hover:text-[#B8860B] hover:bg-[#F4E7C0] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${
                    selectedPlatform === 'ebay' ? 'text-[#B8860B] bg-[#F4E7C0]' : 'text-[#C1972B]'
                  }`}
                >
                  ebay
                </button>
                <span className="font-bold text-[#9A9A9A]">/</span>
                <button
                  onClick={() => handleSelect('local')}
                  className={`cursor-pointer mx-1 px-1 rounded-sm font-extrabold underline decoration-2 underline-offset-4 transition-all duration-300 hover:text-[#B8860B] hover:bg-[#F4E7C0] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${
                    selectedPlatform === 'local' ? 'text-[#B8860B] bg-[#F4E7C0]' : 'text-[#C1972B]'
                  }`}
                >
                  local
                </button>
                <span> buyer</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformRouting;
