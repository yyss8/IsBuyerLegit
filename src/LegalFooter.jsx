import React, { useState } from 'react';
import TermsModal from './TermsModal';

const LegalFooter = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
      <footer className="mt-auto py-6 text-center text-xs text-gray-500">
        © 2026 IsBuyerLegit. |{' '}
        <button
          onClick={() => setIsTermsOpen(true)}
          className="cursor-pointer hover:text-[#FFC107] transition-colors underline"
        >
          Disclaimer & Terms
        </button>
      </footer>

      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  );
};

export default LegalFooter;