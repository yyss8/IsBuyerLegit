import React, { useMemo, useState } from 'react';

const initialFormData = {
  account: { feedback: null, isRandomUsername: null, nameMismatch: null },
  payment: { offPlatform: null, fakeEmail: null },
  address: { isForwarder: null, visualMismatch: null, areaCodeMismatch: null },
};

const screens = [
  {
    stepLabel: 'Step 1: Account Assessment',
    category: 'account',
    title: 'eBay Account',
    questions: [
      {
        key: 'feedback',
        label: 'Feedback profile confidence',
        options: [
          { label: 'High', value: 'high' },
          { label: 'Low', value: 'low' },
        ],
      },
      {
        key: 'isRandomUsername',
        label: 'Does the username look random or bot-like?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
      {
        key: 'nameMismatch',
        label: 'Do buyer name signals look mismatched?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
    ],
  },
  {
    stepLabel: 'Step 2: Payment Risk',
    category: 'payment',
    title: 'Payment',
    questions: [
      {
        key: 'offPlatform',
        label: 'Asked to communicate or pay outside eBay?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
      {
        key: 'fakeEmail',
        label: 'Any suspicious payment-confirmation emails?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
    ],
  },
  {
    stepLabel: 'Step 3: Address Validation',
    category: 'address',
    title: 'Address',
    questions: [
      {
        key: 'isForwarder',
        label: 'Does the destination look like a forwarding address?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
      {
        key: 'visualMismatch',
        label: 'Do Street View visuals mismatch the provided details?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
      {
        key: 'areaCodeMismatch',
        label: 'Does the phone area code mismatch the shipping region?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
    ],
  },
];

const GuidedCheckEngine = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentScreen, setCurrentScreen] = useState(0);

  const currentConfig = screens[currentScreen];

  const setNestedValue = (category, field, value) => {
    setFormData((previous) => ({
      ...previous,
      [category]: {
        ...previous[category],
        [field]: value,
      },
    }));
  };

  const isCurrentScreenComplete = useMemo(() => {
    if (currentScreen > 2) {
      return true;
    }

    return currentConfig.questions.every(
      (question) => formData[currentConfig.category][question.key] !== null,
    );
  }, [currentConfig, currentScreen, formData]);

  const handleNext = () => {
    setCurrentScreen((previous) => Math.min(previous + 1, 3));
  };

  const handleBack = () => {
    setCurrentScreen((previous) => Math.max(previous - 1, 0));
  };

  const handleStartOver = () => {
    setFormData(initialFormData);
    setCurrentScreen(0);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#E0E0E0] px-6 py-10 md:py-14 font-sans">
      <style>
        {`@keyframes panelFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}
      </style>

      <div className="max-w-3xl mx-auto">
        <div
          key={currentScreen}
          className="rounded-3xl border border-[#2A2A2A] bg-[#161616] p-6 md:p-9 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
          style={{ animation: 'panelFadeUp 320ms ease-out' }}
        >
          {currentScreen <= 2 ? (
            <>
              <p className="text-sm md:text-base text-[#A7A7A7] tracking-wide">
                {currentConfig.stepLabel}
              </p>
              <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
                {currentConfig.title}
              </h1>

              <div className="mt-8 space-y-7">
                {currentConfig.questions.map((question) => {
                  const selectedValue = formData[currentConfig.category][question.key];

                  return (
                    <div key={question.key}>
                      <p className="text-lg md:text-xl font-semibold mb-4">{question.label}</p>
                      <div className="flex flex-wrap gap-3">
                        {question.options.map((option) => {
                          const isSelected = selectedValue === option.value;

                          return (
                            <button
                              key={option.value}
                              onClick={() =>
                                setNestedValue(currentConfig.category, question.key, option.value)
                              }
                              className={`cursor-pointer rounded-full px-6 py-3 text-base md:text-lg font-semibold border-2 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#FFC107]/50 ${
                                isSelected
                                  ? 'border-[#FFC107] bg-[#2A2204] text-[#FFC107]'
                                  : 'border-[#4A4A4A] bg-[#1B1B1B] text-[#E0E0E0] hover:border-[#FFC107] hover:text-[#FFC107]'
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentScreen === 0}
                  className={`rounded-xl px-5 py-3 text-base font-semibold transition-all duration-300 ${
                    currentScreen === 0
                      ? 'cursor-not-allowed border border-[#2F2F2F] text-[#5F5F5F]'
                      : 'cursor-pointer border border-[#4A4A4A] text-[#E0E0E0] hover:border-[#FFC107] hover:text-[#FFC107]'
                  }`}
                >
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isCurrentScreenComplete}
                  className={`rounded-xl px-6 py-3 text-base font-bold transition-all duration-300 ${
                    isCurrentScreenComplete
                      ? 'cursor-pointer border-2 border-[#FFC107] text-[#FFC107] hover:bg-[#FFC107] hover:text-[#111111]'
                      : 'cursor-not-allowed border-2 border-[#3D3D3D] text-[#707070]'
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm md:text-base text-[#A7A7A7] tracking-wide">Step 4: The Verdict</p>
              <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
                Summary Dashboard
              </h1>

              <div className="mt-8 rounded-2xl border border-[#2A2A2A] bg-[#121212] p-5 md:p-6">
                <p className="text-sm md:text-base text-[#9A9A9A] mb-3">Current `formData` JSON</p>
                <pre className="overflow-auto text-sm md:text-base leading-relaxed text-[#E0E0E0]">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="cursor-pointer rounded-xl px-5 py-3 text-base font-semibold border border-[#4A4A4A] text-[#E0E0E0] transition-all duration-300 hover:border-[#FFC107] hover:text-[#FFC107]"
                >
                  Back
                </button>

                <button
                  onClick={handleStartOver}
                  className="cursor-pointer rounded-xl px-7 py-3 text-base font-bold border-2 border-[#FFC107] text-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] hover:text-[#111111]"
                >
                  Start Over
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuidedCheckEngine;