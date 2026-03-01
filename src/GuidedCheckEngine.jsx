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
          { label: '0 Feedback / New', value: 'new', severity: 'risky' },
          { label: 'Established Feedback', value: 'established', severity: 'safe' },
        ],
        warnings: {
          new: {
            level: 'medium',
            badge: '⚠️ MEDIUM WARNING',
            description:
              "Every user starts as a new user. eBay discourages treating all new accounts as scammers, but we need to look closer at this user's other information to be safe.",
          },
        },
      },
      {
        key: 'isRandomUsername',
        label: 'Does the username look random or bot-like?',
        options: [
          { label: 'Yes', value: 'yes', severity: 'risky' },
          { label: 'No', value: 'no', severity: 'safe' },
        ],
      },
      {
        key: 'nameMismatch',
        label: 'Do buyer name signals look mismatched?',
        options: [
          { label: 'Yes', value: 'yes', severity: 'risky' },
          { label: 'No', value: 'no', severity: 'safe' },
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
          { label: 'Yes, asked to text/email', value: 'yes_text_email', severity: 'risky' },
          { label: 'No, stayed inside eBay messages', value: 'no_stayed_on_platform', severity: 'safe' },
        ],
        warnings: {
          yes_text_email: {
            level: 'red',
            badge: '🚨 RED FLAG',
            description:
              'eBay strictly prohibits off-platform communication. Scammers frequently use texts to send fake payment confirmation emails. Keep all communications inside eBay messages.',
          },
        },
      },
      {
        key: 'fakeEmail',
        label: 'Any suspicious payment-confirmation emails?',
        options: [
          { label: 'Yes', value: 'yes', severity: 'risky' },
          { label: 'No', value: 'no', severity: 'safe' },
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
          { label: "Yes, it's a warehouse", value: 'yes_warehouse', severity: 'risky' },
          { label: 'No, looks residential/standard', value: 'no_standard', severity: 'safe' },
        ],
        warnings: {
          yes_warehouse: {
            level: 'medium',
            badge: '⚠️ MEDIUM WARNING',
            description:
              'Freight forwarders are commonly used by international buyers. While totally legitimate, they void some eBay Seller Protections and are frequently targeted by stolen credit cards. Signature confirmation is highly recommended.',
          },
        },
      },
      {
        key: 'visualMismatch',
        label: 'Do Street View visuals mismatch the provided details?',
        options: [
          { label: 'Yes', value: 'yes', severity: 'risky' },
          { label: 'No', value: 'no', severity: 'safe' },
        ],
      },
      {
        key: 'areaCodeMismatch',
        label: 'Does the phone area code mismatch the shipping region?',
        options: [
          { label: 'Yes', value: 'yes', severity: 'risky' },
          { label: 'No', value: 'no', severity: 'safe' },
        ],
      },
    ],
  },
];

const GuidedCheckEngine = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [maxReachedScreen, setMaxReachedScreen] = useState(0);

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
    setCurrentScreen((previous) => {
      const next = Math.min(previous + 1, 3);
      setMaxReachedScreen((maxVisited) => Math.max(maxVisited, next));
      return next;
    });
  };

  const handleBack = () => {
    setCurrentScreen((previous) => Math.max(previous - 1, 0));
  };

  const handleStartOver = () => {
    setFormData(initialFormData);
    setCurrentScreen(0);
    setMaxReachedScreen(0);
  };

  const handleSidebarSelect = (targetScreen) => {
    if (targetScreen <= maxReachedScreen) {
      setCurrentScreen(targetScreen);
    }
  };

  const sidebarSteps = [
    '1. Account',
    '2. Payment',
    '3. Address',
    '4. Verdict',
  ];

  const getWarningVisualStyle = (level) => {
    if (level === 'red') {
      return {
        borderColor: 'border-red-500',
        badgeColor: 'text-red-300',
        textColor: 'text-[#D1D5DB]',
      };
    }

    return {
      borderColor: 'border-yellow-500',
      badgeColor: 'text-yellow-300',
      textColor: 'text-[#D1D5DB]',
    };
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#111111] px-6 py-10 md:py-14 font-sans">
      <style>
        {`@keyframes panelFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}
      </style>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
        <aside className="md:w-56 md:pt-8">
          <div className="rounded-2xl border border-[#E7DFC9] bg-[#FFFDF7] p-4 md:p-5">
            <p className="text-sm font-semibold text-[#7A7A7A] mb-3">Guided Check</p>
            <div className="space-y-2">
              {sidebarSteps.map((label, index) => {
                const isActive = currentScreen === index;
                const isAccessible = index <= maxReachedScreen;

                return (
                  <button
                    key={label}
                    onClick={() => handleSidebarSelect(index)}
                    disabled={!isAccessible}
                    className={`w-full text-left rounded-xl px-3 py-2 text-sm md:text-base font-semibold transition-all duration-300 ${
                      isActive
                        ? 'border border-[#D9CC9A] bg-[#F4E7C0] text-[#7A5A00]'
                        : isAccessible
                          ? 'cursor-pointer border border-transparent text-[#5B5B5B] hover:border-[#D9CC9A] hover:bg-[#FBF2D6] hover:text-[#7A5A00]'
                          : 'cursor-not-allowed border border-transparent text-[#B7B7B7]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="flex-1">
        <div
          key={currentScreen}
          className="rounded-3xl border border-[#E7DFC9] bg-[#FFFDF7] p-6 md:p-9 shadow-sm"
          style={{ animation: 'panelFadeUp 320ms ease-out' }}
        >
          {currentScreen <= 2 ? (
            <>
              <p className="text-sm md:text-base text-[#7A7A7A] tracking-wide">
                {currentConfig.stepLabel}
              </p>
              <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
                {currentConfig.title}
              </h1>

              <div className="mt-8 space-y-7">
                {currentConfig.questions.map((question) => {
                  const selectedValue = formData[currentConfig.category][question.key];
                  const activeWarning = question.warnings?.[selectedValue] || null;

                  return (
                    <div key={question.key}>
                      <p className="text-lg md:text-xl font-semibold mb-4">{question.label}</p>
                      <div className="flex flex-wrap gap-3">
                        {question.options.map((option) => {
                          const isSelected = selectedValue === option.value;
                          const isRiskySelection = option.severity === 'risky';

                          return (
                            <button
                              key={option.value}
                              onClick={() =>
                                setNestedValue(currentConfig.category, question.key, option.value)
                              }
                              className={`cursor-pointer rounded-full px-6 py-3 text-base md:text-lg font-semibold border-2 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${
                                isSelected
                                  ? isRiskySelection
                                    ? 'bg-[#FEE2E2] border-[#DC2626] text-[#7F1D1D] focus:ring-red-600/40'
                                    : 'border-[#D9CC9A] bg-[#F4E7C0] text-[#7A5A00]'
                                  : 'border-[#D8D1BE] bg-[#FFFFFF] text-[#2F2F2F] hover:border-[#D9CC9A] hover:text-[#7A5A00] hover:bg-[#FBF2D6]'
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-out ${
                          activeWarning ? 'max-h-60 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
                        }`}
                      >
                        {activeWarning ? (
                          <div
                            className={`bg-[#1A1A1A] border-l-4 ${getWarningVisualStyle(activeWarning.level).borderColor} p-4 rounded-r-md`}
                          >
                            <p className={`text-sm font-bold ${getWarningVisualStyle(activeWarning.level).badgeColor}`}>
                              {activeWarning.badge}
                            </p>
                            <p className={`text-sm mt-2 leading-relaxed ${getWarningVisualStyle(activeWarning.level).textColor}`}>
                              {activeWarning.description}
                            </p>
                          </div>
                        ) : null}
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
                      ? 'cursor-not-allowed border border-[#E8E2D2] text-[#B7B7B7]'
                      : 'cursor-pointer border border-[#D8D1BE] text-[#4A4A4A] hover:border-[#D9CC9A] hover:text-[#7A5A00] hover:bg-[#FBF2D6]'
                  }`}
                >
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isCurrentScreenComplete}
                  className={`rounded-xl px-6 py-3 text-base font-bold transition-all duration-300 ${
                    isCurrentScreenComplete
                      ? 'cursor-pointer border-2 border-[#D9CC9A] text-[#7A5A00] hover:bg-[#F4E7C0]'
                      : 'cursor-not-allowed border-2 border-[#E8E2D2] text-[#B7B7B7]'
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm md:text-base text-[#7A7A7A] tracking-wide">Step 4: The Verdict</p>
              <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
                Summary Dashboard
              </h1>

              <div className="mt-8 rounded-2xl border border-[#E7DFC9] bg-[#FFFEFA] p-5 md:p-6">
                <p className="text-sm md:text-base text-[#7A7A7A] mb-3">Current `formData` JSON</p>
                <pre className="overflow-auto text-sm md:text-base leading-relaxed text-[#2B2B2B]">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="cursor-pointer rounded-xl px-5 py-3 text-base font-semibold border border-[#D8D1BE] text-[#4A4A4A] transition-all duration-300 hover:border-[#D9CC9A] hover:text-[#7A5A00] hover:bg-[#FBF2D6]"
                >
                  Back
                </button>

                <button
                  onClick={handleStartOver}
                  className="cursor-pointer rounded-xl px-7 py-3 text-base font-bold border-2 border-[#D9CC9A] text-[#7A5A00] transition-all duration-300 hover:bg-[#F4E7C0]"
                >
                  Start Over
                </button>
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedCheckEngine;