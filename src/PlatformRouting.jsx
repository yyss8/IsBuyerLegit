import React, { useEffect, useState } from 'react';
import GuidedCheckEngine from './GuidedCheckEngine';
import ExpressCheck from './ExpressCheck';
import LegalFooter from './LegalFooter';
import { useLanguage } from './i18n.jsx';

const getHasAgreedDisclaimer = () => localStorage.getItem('agreedDisclaimer') === 'true';

const PlatformRouting = () => {
  const { t } = useLanguage();
  const [hasAgreedDisclaimer, setHasAgreedDisclaimer] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [ebayMode, setEbayMode] = useState('express');

  useEffect(() => {
    const platform = new URLSearchParams(window.location.search).get('platform');

    if (platform === 'local') {
      window.location.replace('/local/');
      return;
    }

    const agreed = getHasAgreedDisclaimer();
    setHasAgreedDisclaimer(agreed);
    setShowDisclaimerModal(!agreed);
  }, []);

  const handleAgreeDisclaimer = () => {
    localStorage.setItem('agreedDisclaimer', 'true');
    setHasAgreedDisclaimer(true);
    setShowDisclaimerModal(false);
    setEbayMode('express');
  };

  const handleStartCheck = () => {
    const agreed = getHasAgreedDisclaimer();

    if (!agreed) {
      setShowDisclaimerModal(true);
      return;
    }

    setHasAgreedDisclaimer(true);
    setEbayMode('express');
  };

  const handleSwitchToProfessional = () => {
    setEbayMode('professional');
  };

  const handleReturnToExpress = () => {
    setEbayMode('express');
  };

  if (hasAgreedDisclaimer && ebayMode === 'express') {
    return <ExpressCheck onSwitchToProfessional={handleSwitchToProfessional} />;
  }

  if (hasAgreedDisclaimer && ebayMode === 'professional') {
    return <GuidedCheckEngine onReturnToMain={handleReturnToExpress} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF6EE] px-6 py-10 font-sans text-[#111111] md:py-14">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center text-center">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#6B6358]">
          eBay buyer check
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
          {t('Is Your Buyer Legit')}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#5B5B5B] md:text-lg">
          Answer a few questions about the buyer, payment, and shipping details before you decide whether to ship.
        </p>
        <button
          onClick={handleStartCheck}
          className="mt-8 cursor-pointer rounded-xl border-2 border-[#111111] bg-[#111111] px-7 py-3 text-base font-bold text-[#FAF6EE] transition-colors hover:bg-transparent hover:text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]/30"
        >
          Start eBay check
        </button>
      </main>

      <LegalFooter />

      {showDisclaimerModal && !hasAgreedDisclaimer ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-[#2A2A2A] bg-[#111111] p-6 text-[#E0E0E0] shadow-xl md:p-8">
            <p className="text-base leading-relaxed md:text-lg">
              {t('Disclaimer: This tool highlights suspicious buyer patterns based on community data. You must agree not to rely solely on this tool for financial decisions. We are not responsible for any financial losses or blocked legitimate sales.')}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAgreeDisclaimer}
                className="cursor-pointer rounded-xl border-2 border-[#EFE9DD] px-5 py-3 text-base font-bold text-[#EFE9DD] transition-colors hover:bg-[#EFE9DD] hover:text-[#111111]"
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
