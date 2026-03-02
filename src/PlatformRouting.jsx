import React, { useEffect, useState } from 'react';
import GuidedCheckEngine from './GuidedCheckEngine';
import LegalFooter from './LegalFooter';
import { useLanguage } from './i18n.jsx';

const getHasAgreedDisclaimer = () => localStorage.getItem('agreedDisclaimer') === 'true';

const PlatformRouting = () => {
  const { language, t } = useLanguage();
  const exampleResponse = language === 'zh'
    ? '你好，商品还在。我们可以在当地警局门口于 [time] 到 [time] 见面。我只收现金或 Zelle。'
    : 'Yes, the item is available. I can meet at my local precinct from [time] to [time]. I accept cash or Zelle only.';
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [hasAgreedDisclaimer, setHasAgreedDisclaimer] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [hasMovedUp, setHasMovedUp] = useState(false);
  const [introCycle, setIntroCycle] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const agreed = getHasAgreedDisclaimer();
    setHasAgreedDisclaimer(agreed);
  }, []);

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
    if (platform === 'ebay') {
      const agreed = getHasAgreedDisclaimer();

      if (!agreed) {
        setShowDisclaimerModal(true);
        return;
      }
    }

    setSelectedPlatform(platform);
    console.log(`Your buyer is from ${platform} | User selected: ${platform}`);
  };

  const handleAgreeDisclaimer = () => {
    localStorage.setItem('agreedDisclaimer', 'true');
    setHasAgreedDisclaimer(true);
    setShowDisclaimerModal(false);
    setSelectedPlatform('ebay');
  };

  const handleRestart = () => {
    setSelectedPlatform(null);
    setCopied(false);
    setIntroCycle((current) => current + 1);
  };

  const handleReturnToMainFromGuided = () => {
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
    return <GuidedCheckEngine onReturnToMain={handleReturnToMainFromGuided} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#111111] p-6 font-sans flex flex-col">
      <div
        className={`mx-auto w-full flex-1 ${
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
                {t('A More Detailed Fraud Detection Guide Is In Progress')}
              </h2>
              <p className="mt-3 text-sm md:text-base text-[#6B6B6B] text-center leading-relaxed">
                {t("Based on the site owner's experience, follow the general safety guidelines below for local meetups.")}
              </p>
              <div className="mt-6 space-y-4 text-[#2B2B2B]">
                <section className="rounded-lg border border-[#EEE6CF] bg-[#FFFEFA] p-4">
                  <h3 className="text-base md:text-lg font-bold">{t('• Trust & Payment Intent')}</h3>
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-[0.95em] leading-relaxed">
                    <li>{t('Do not trust buyers who seem unusually nice and offer to pay before meeting.')}</li>
                  </ul>
                </section>

                <section className="rounded-lg border border-[#EEE6CF] bg-[#FFFEFA] p-4">
                  <h3 className="text-base md:text-lg font-bold">{t('• Safe Meetup Location')}</h3>
                  <p className="mt-1 text-[0.95em] leading-relaxed">
                    {t('Meet in a safe, camera-monitored location (bank during business hours, police station).')}
                  </p>
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-[0.95em] leading-relaxed">
                    <li>{t('Not in a random parking lot.')}</li>
                    <li>{t('Not outside of your local Domino store.')}</li>
                    <li>{t('Not at your home for high-value items.')}</li>
                  </ul>
                </section>

                <section className="rounded-lg border border-[#EEE6CF] bg-[#FFFEFA] p-4">
                  <h3 className="text-base md:text-lg font-bold">{t('• Safe Payment Methods')}</h3>
                  <p className="mt-1 text-[0.95em] leading-relaxed">
                    {t('Accept only safe, non-chargeback-friendly payment methods (cash or Zelle).')}
                  </p>
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-[0.95em] leading-relaxed">
                    <li>{t('No check, No Gift Card, Avoid Venmo/Cash App/Paypal.')}</li>
                    <li><strong>{t('For Zelle:')}</strong> {t('use QR code scan or provide your phone number to avoid fake-email payment scams.')}</li>
                    <li>{t('NEVER trust a screenshot of a payment. Only hand over the item when the money shows up in your own bank app.')}</li>
                    <li><strong>{t('For cash:')}</strong> {t('bring a counterfeit detection pen and ask to check bills while the buyer inspects the item.')}</li>
                    <li>{t('For large amounts of cash: meet at a local bank and deposit before releasing the item; counterfeit-bill checks are not 100% reliable.')}</li>
                  </ul>
                </section>

                <section className="rounded-lg border border-[#EEE6CF] bg-[#FFFEFA] p-4">
                  <h3 className="text-base md:text-lg font-bold">{t('• Buyer Prompt Compliance')}</h3>
                  <p className="mt-1 text-[0.95em] leading-relaxed">
                    {t('Avoid buyers who cannot follow basic meetup prompts.')}
                  </p>
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-[0.95em] leading-relaxed">
                    <li>{t('Ask the buyer to update you at two points: first when they start heading out (with an estimated arrival time), and again when they are about [x] minutes away. Only leave to meet once they confirm they are close (adjust [x] based on distance).')}</li>
                    <li>{t('Stick to the agreed meetup time. Not showing up on time can be suspicious (for example, waiting until it gets dark).')}</li>
                    <li>{t('If the buyer asks to change locations during the meetup, decline if the new location has no cameras or foot traffic.')}</li>
                  </ul>
                </section>

                <section className="rounded-lg border border-[#EEE6CF] bg-[#FFFEFA] p-4">
                  <h3 className="text-base md:text-lg font-bold">{t('• Marketplace Message Pattern')}</h3>
                  <p className="mt-1 text-[0.95em] leading-relaxed">
                    {t('On ')}<strong>{t('Facebook Marketplace')}</strong>{t(', reply within two messages to reduce negative-feedback risk and keep responses detailed.')}
                  </p>
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-[0.95em] leading-relaxed">
                    <li>{t('If buyer intent is unclear within two messages, treat it as a likely non-legit or problematic buyer.')}</li>
                    <li>
                      <span>{t('Keep your initial responses detailed and clear. Example response:')} “{exampleResponse}”</span>
                      <button
                        onClick={handleCopyExample}
                        className="cursor-pointer ml-3 rounded-md border border-[#D9CC9A] px-3 py-1 text-sm font-semibold text-[#7A5A00] transition-all duration-300 hover:bg-[#F4E7C0] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40"
                      >
                        {copied ? t('Copied') : t('Copy to clipboard')}
                      </button>
                    </li>
                  </ul>
                </section>
              </div>

              <div className="mt-6 rounded-xl border border-[#E7DFC9] bg-[#FFF9E8] px-4 py-3 text-sm md:text-base text-[#5A4A1A] leading-relaxed">
                {t('This is a general safety guide, and scam tactics continue to evolve over time. You may complete many deals without strictly following every step above, but a single scam can wipe out profit from dozens of successful transactions. Stay alert and prioritize safety in every meetup.')}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleRestart}
                  className="cursor-pointer rounded-lg border border-[#D9CC9A] px-5 py-2 text-base font-semibold text-[#7A5A00] transition-all duration-300 hover:bg-[#F4E7C0] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40"
                >
                  {t('Return')}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
                <div
                  className={`transform-gpu will-change-transform will-change-opacity transition-transform transition-opacity duration-800 ease-out text-6xl md:text-7xl font-bold tracking-tight ${
                    hasMovedUp ? '-translate-y-32 md:-translate-y-40 scale-[0.86]' : 'translate-y-0 scale-100'
                  }`}
                  style={{ opacity: isTitleVisible ? 1 : 0 }}
                >
                  {t('Is Your Buyer Legit')}
                </div>
              </div>

              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${
                  hasMovedUp ? 'opacity-100 delay-300' : 'opacity-0'
                } text-2xl md:text-3xl font-semibold`}
              >
                <span>{t('Your buyer is from ')}</span>
                <button
                  onClick={() => handleSelect('ebay')}
                  className={`cursor-pointer mx-1 px-1 rounded-sm font-extrabold underline decoration-2 underline-offset-4 transition-all duration-300 hover:text-[#B8860B] hover:bg-[#F4E7C0] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${
                    selectedPlatform === 'ebay' ? 'text-[#B8860B] bg-[#F4E7C0]' : 'text-[#C1972B]'
                  }`}
                >
                  {t('eBay')}
                </button>
                <span className="font-bold text-[#9A9A9A]">/</span>
                <button
                  onClick={() => handleSelect('local')}
                  className={`cursor-pointer mx-1 px-1 rounded-sm font-extrabold underline decoration-2 underline-offset-4 transition-all duration-300 hover:text-[#B8860B] hover:bg-[#F4E7C0] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${
                    selectedPlatform === 'local' ? 'text-[#B8860B] bg-[#F4E7C0]' : 'text-[#C1972B]'
                  }`}
                >
                  {t('Local')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <LegalFooter />

      {showDisclaimerModal && !hasAgreedDisclaimer ? (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-[#2A2A2A] bg-[#111111] p-6 md:p-8 text-[#E0E0E0] shadow-xl">
            <p className="text-base md:text-lg leading-relaxed">
              {t('Disclaimer: This tool highlights suspicious buyer patterns based on community data. You must agree not to rely solely on this tool for financial decisions. We are not responsible for any financial losses or blocked legitimate sales.')}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAgreeDisclaimer}
                className="cursor-pointer rounded-xl border-2 border-[#FFC107] px-5 py-3 text-base font-bold text-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] hover:text-[#111111]"
              >
                {t('I Understand & Agree')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PlatformRouting;
