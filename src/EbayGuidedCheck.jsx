import React, { useState } from 'react';
import { useLanguage } from './i18n.jsx';

const initialFormData = {
  feedback: null,
  offPlatform: null,
  streetView: null,
  addressChanged: null,
};

const stepConfig = {
  1: {
    category: 'Account Profile',
    question: "What is the buyer's feedback score?",
    field: 'feedback',
    options: [
      { label: '0–10 (new or very limited history)', value: '0-10' },
      { label: '11–100 (some history, mixed confidence)', value: '11-100' },
      { label: '100+ (strong account history)', value: '100+' },
    ],
  },
  2: {
    category: 'Communication',
    question: 'Have they asked you to text or pay outside eBay?',
    field: 'offPlatform',
    options: [
      { label: 'Yes, they are pushing off-platform', value: 'yes' },
      { label: 'No, they stayed fully on eBay', value: 'no' },
    ],
  },
  3: {
    category: 'Address Check',
    question: 'What does Google Street View show for the delivery address?',
    field: 'streetView',
    options: [
      { label: 'Looks consistent and residential', value: 'consistent' },
      { label: 'Looks vacant, mismatched, or suspicious', value: 'suspicious' },
      { label: "I can't verify it clearly", value: 'unclear' },
    ],
  },
  4: {
    category: 'Post-Payment',
    question: 'After payment, did they ask to change the shipping address?',
    field: 'addressChanged',
    options: [
      { label: 'Yes, they asked to change it', value: 'yes' },
      { label: 'No, no address change request', value: 'no' },
    ],
  },
};

const EbayGuidedCheck = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStartOver = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  const step = stepConfig[currentStep];

  return (
    <div className="min-h-screen bg-[#111111] text-[#E0E0E0] px-6 py-10 md:py-16 font-sans">
      <style>
        {`@keyframes guidedFadeSlide { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }`}
      </style>

      <div className="max-w-3xl mx-auto">
        <div
          key={currentStep}
          className="w-full"
          style={{ animation: 'guidedFadeSlide 320ms ease-out' }}
        >
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm md:text-base tracking-wide text-[#BDBDBD]">
              {t('Step')} {currentStep} {t('of 5')}
            </p>
            {currentStep >= 2 && currentStep <= 4 ? (
              <button
                onClick={handleBack}
                className="cursor-pointer text-sm md:text-base text-[#BDBDBD] hover:text-[#FFC107] transition-colors duration-300"
              >
                ← {t('Back')}
              </button>
            ) : (
              <span className="text-sm md:text-base text-transparent">← {t('Back')}</span>
            )}
          </div>

          {currentStep <= 4 ? (
            <>
              <p className="text-base md:text-lg text-[#BDBDBD] mb-3">{t(step.category)}</p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-10">
                {t(step.question)}
              </h1>

              <div className="space-y-4">
                {step.options.map((option) => {
                  const isSelected = formData[step.field] === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(step.field, option.value)}
                      className={`w-full text-left border-2 rounded-2xl p-5 md:p-6 text-xl md:text-2xl font-semibold cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:border-[#FFC107] hover:text-[#FFC107] hover:bg-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#FFC107]/50 ${
                        isSelected
                          ? 'border-[#FFC107] text-[#FFC107] bg-[#1A1A1A]'
                          : 'border-[#E0E0E0] text-[#E0E0E0] bg-transparent'
                      }`}
                    >
                      {t(option.label)}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <p className="text-base md:text-lg text-[#BDBDBD] mb-3">{t('The Verdict')}</p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-10">
                {t('Guided Check Summary')}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="rounded-2xl border border-[#2A2A2A] bg-[#171717] p-5">
                  <p className="text-sm text-[#9A9A9A]">{t('Feedback')}</p>
                  <p className="text-xl font-semibold mt-1">{formData.feedback ? t(formData.feedback) : t('Not answered')}</p>
                </div>
                <div className="rounded-2xl border border-[#2A2A2A] bg-[#171717] p-5">
                  <p className="text-sm text-[#9A9A9A]">{t('Off-Platform Request')}</p>
                  <p className="text-xl font-semibold mt-1">{formData.offPlatform ? t(formData.offPlatform) : t('Not answered')}</p>
                </div>
                <div className="rounded-2xl border border-[#2A2A2A] bg-[#171717] p-5">
                  <p className="text-sm text-[#9A9A9A]">{t('Street View Check')}</p>
                  <p className="text-xl font-semibold mt-1">{formData.streetView ? t(formData.streetView) : t('Not answered')}</p>
                </div>
                <div className="rounded-2xl border border-[#2A2A2A] bg-[#171717] p-5">
                  <p className="text-sm text-[#9A9A9A]">{t('Address Change Request')}</p>
                  <p className="text-xl font-semibold mt-1">{formData.addressChanged ? t(formData.addressChanged) : t('Not answered')}</p>
                </div>
              </div>

              <button
                onClick={handleStartOver}
                className="cursor-pointer inline-flex items-center justify-center rounded-2xl border-2 border-[#FFC107] px-8 py-4 text-xl font-bold text-[#FFC107] hover:bg-[#FFC107] hover:text-[#111111] transition-all duration-300"
              >
                {t('Start Over')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EbayGuidedCheck;