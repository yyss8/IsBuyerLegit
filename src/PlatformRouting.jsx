import React, { useEffect, useState } from 'react';
import GuidedCheckEngine from './GuidedCheckEngine';

const PlatformRouting = () => {
  const exampleResponse = 'Yes, the item is available. I can meet at my local precinct from [time] to [time]. I accept cash or Zelle only.';
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [hasMovedUp, setHasMovedUp] = useState(false);
  const [introCycle, setIntroCycle] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsTitleVisible(false);
    setHasMovedUp(false);

    let rafIdOne;
    let rafIdTwo;

    rafIdOne = window.requestAnimationFrame(() => {
      rafIdTwo = window.requestAnimationFrame(() => {
        setIsTitleVisible(true);
      });
    });

    const moveUpTimer = setTimeout(() => {
      setHasMovedUp(true);
    }, 900);

    return () => {
      window.cancelAnimationFrame(rafIdOne);
      window.cancelAnimationFrame(rafIdTwo);
      clearTimeout(moveUpTimer);
    };
  }, [introCycle]);

  const handleSelect = (platform) => {
    setSelectedPlatform(platform);
    console.log(`Your buyer is from ${platform} | User selected: ${platform}`);
  };

  const handleRestart = () => {
    setSelectedPlatform(null);
    setCopied(false);
    setIntroCycle((current) => current + 1);
  };

  const handleCopyExample = async () => {
    try {
      await navigator.clipboard.writeText(exampleResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.log('Clipboard copy failed:', error);
    }
  };

  if (selectedPlatform === 'ebay') {
    return <GuidedCheckEngine />;
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#111111] p-6 font-sans">
      <div
        className={`mx-auto min-h-screen w-full ${
          selectedPlatform === 'local'
            ? 'flex justify-center py-10 md:py-16'
            : 'flex items-center justify-center'
        }`}
      >
        <div
          className={`w-full relative ${
            selectedPlatform === 'local'
              ? 'max-w-4xl text-center'
              : 'text-center h-[60vh]'
          }`}
        >
          {selectedPlatform === 'local' ? (
            <div className="mx-auto w-full max-w-3xl rounded-2xl border border-[#E7DFC9] bg-[#FFFDF7] p-8 md:p-10 text-left shadow-sm">
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
                    <li>Not outside of your local Domino store.</li>
                  </ul>
                </li>
                <li>
                  Accept only safe, non-chargeback-friendly payment methods (cash or Zelle).
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-[0.95em]">
                    <li>No check, No Gift Card, Avoid Venmo/Cash App/Paypal.</li>
                    <li><strong>For Zelle:</strong> use QR code scan or provide your phone number to avoid fake-email payment scams.</li>
                    <li>NEVER trust a screenshot of a payment. Only hand over the item when the money shows up in your own bank app.</li>
                    <li><strong>For cash:</strong> bring a counterfeit detection pen and check bills while the buyer inspects the item.</li>
                    <li>For large amounts of cash: meet at a local bank and deposit before releasing the item; counterfeit-bill checks are not 100% reliable.</li>
                  </ul>
                </li>
                <li>
                  On <strong>Facebook Marketplace</strong>, reply within two messages to reduce negative-feedback risk and keep responses detailed.
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-[0.95em]">
                    <li>If buyer intent is unclear within two messages, treat it as a likely non-legit or problematic buyer.</li>
                    <li>
                      <span>Example response: “{exampleResponse}”</span>
                      <button
                        onClick={handleCopyExample}
                        className="cursor-pointer ml-3 rounded-md border border-[#D9CC9A] px-3 py-1 text-sm font-semibold text-[#7A5A00] transition-all duration-300 hover:bg-[#F4E7C0] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40"
                      >
                        {copied ? 'Copied' : 'Copy to clipboard'}
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="mt-8 text-center">
                <button
                  onClick={handleRestart}
                  className="cursor-pointer rounded-lg border border-[#D9CC9A] px-5 py-2 text-base font-semibold text-[#7A5A00] transition-all duration-300 hover:bg-[#F4E7C0] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40"
                >
                  Return
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
                <div
                  className={`transform-gpu will-change-transform will-change-opacity transition-[transform,opacity] duration-800 ease-out text-6xl md:text-7xl font-bold tracking-tight ${
                    hasMovedUp ? '-translate-y-32 md:-translate-y-40 scale-[0.86]' : 'translate-y-0 scale-100'
                  }`}
                  style={{ opacity: isTitleVisible ? 1 : 0 }}
                >
                  Is Your Buyer Legit
                </div>
              </div>

              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${
                  hasMovedUp ? 'opacity-100 delay-300' : 'opacity-0'
                } text-2xl md:text-3xl font-semibold`}
              >
                <span>Your buyer is from </span>
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformRouting;
