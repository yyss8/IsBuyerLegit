import React, { useState } from 'react';
import TermsModal from './TermsModal';
import { useLanguage } from './i18n.jsx';

const LegalFooter = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
      <footer className="mt-auto py-6 text-center text-xs text-gray-500">
        &copy; 2026 IsBuyerLegit. {' '}
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="mx-1 rounded border border-[#D8CFBF] bg-[#FFFEFA] px-2 py-0.5 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#1C1813]/30"
          aria-label={t('Language')}
        >
          <option value="en">{t('English')}</option>
          <option value="zh">{t('中文')}</option>
        </select>
        |{' '}
        <button
          onClick={() => setIsTermsOpen(true)}
          className="cursor-pointer underline transition-colors hover:text-[#111111]"
        >
          {t('Disclaimer & Terms')}
        </button>
      </footer>

      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  );
};

export default LegalFooter;
