import React, { useMemo, useState } from 'react';
import LegalFooter from './LegalFooter';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1477767870258876717/QAOb233eKrm6sFU3h5l-ulfa8zs_Aewll1YPH7noh2MQrbvHHWR_II-VFKQ0PR5fghAe';

const initialFormData = {
  account: { feedback: null, isRandomUsername: null, nameMismatch: null },
  payment: { offPlatform: null, fakeEmail: null, addressChanged: null },
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
        label: 'Account Age/Feedback Score?',
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
        label: 'Does the username look random or bot-like? (e.g., name-1234 or name_0)',
        options: [
          { label: 'Yes', value: 'yes', severity: 'risky' },
          { label: 'No', value: 'no', severity: 'safe' },
        ],
        warnings: {
          yes: {
            level: 'medium',
            badge: '⚠️ MEDIUM WARNING',
            description:
              "It looks sketchy, but don't panic! eBay automatically generates these usernames (like `name-1234`) when buyers use Guest Checkout or Apple/Google sign-in. By itself, this is normal. However, we need to verify if the generated name matches the shipping details below.",
          },
        },
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
      {
        key: 'addressChanged',
        label: 'After payment, did the buyer ask to change the shipping address?',
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
              'Freight forwarders are commonly used by international buyers and can be legitimate. Buyer protection can be voided when the buyer explicitly confirms they are using a forwarding address (not simply because they work near or at that location). These addresses are also frequently targeted by stolen credit cards, so signature confirmation is highly recommended.',
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

const getOptionClasses = (isSelected, isRiskySelection) => {
  if (isSelected && isRiskySelection) {
    return 'bg-[#FEE2E2] border-[#DC2626] text-[#7F1D1D] focus:ring-red-600/40';
  }

  if (isSelected) {
    return 'border-[#D9CC9A] bg-[#F4E7C0] text-[#7A5A00]';
  }

  return 'border-[#D8D1BE] bg-[#FFFFFF] text-[#2F2F2F] hover:border-[#D9CC9A] hover:text-[#7A5A00] hover:bg-[#FBF2D6]';
};

const WarningBox = ({ warning, getWarningVisualStyle }) => {
  if (!warning) {
    return null;
  }

  const visualStyle = getWarningVisualStyle(warning.level);

  return (
    <div className={`bg-[#1A1A1A] border-l-4 ${visualStyle.borderColor} p-4 rounded-r-md`}>
      <p className={`text-sm font-bold ${visualStyle.badgeColor}`}>{warning.badge}</p>
      <p className={`text-sm mt-2 leading-relaxed ${visualStyle.textColor}`}>{warning.description}</p>
    </div>
  );
};

const AccountStep = ({ accountData, accountConfig, getWarningVisualStyle, setNestedValue }) => {
  const feedbackQuestion = accountConfig.questions.find((question) => question.key === 'feedback');
  const randomUsernameQuestion = accountConfig.questions.find(
    (question) => question.key === 'isRandomUsername',
  );

  const feedbackValue = accountData.feedback;
  const randomUsernameValue = accountData.isRandomUsername;
  const nameMismatchValue = accountData.nameMismatch;

  const randomUsernameWarning = randomUsernameQuestion?.warnings?.[randomUsernameValue] ?? null;
  const nameMismatchWarning =
    nameMismatchValue === 'yes'
      ? {
          level: 'red',
          badge: '🚨 RED FLAG',
          description:
            "System-generated usernames from eBay usually follow a consistent pattern based on the buyer's real name or email. A complete mismatch between a bot-like username and the shipping name is a strong indicator of a stolen account or a fraudulently created burner account.",
        }
      : null;

  return (
    <div className="mt-8 space-y-7">
      <div>
        <p className="text-lg md:text-xl font-semibold mb-4">{feedbackQuestion.label}</p>
        <div className="flex flex-wrap gap-3">
          {feedbackQuestion.options.map((option) => {
            const isSelected = feedbackValue === option.value;

            return (
              <button
                key={option.value}
                onClick={() => setNestedValue('account', 'feedback', option.value)}
                className={`cursor-pointer rounded-full px-6 py-3 text-base md:text-lg font-semibold border-2 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${getOptionClasses(
                  isSelected,
                  option.severity === 'risky',
                )}`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            feedbackQuestion.warnings?.[feedbackValue] ? 'max-h-60 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <WarningBox
            warning={feedbackQuestion.warnings?.[feedbackValue] ?? null}
            getWarningVisualStyle={getWarningVisualStyle}
          />
        </div>
      </div>

      <div>
        <p className="text-lg md:text-xl font-semibold mb-4">{randomUsernameQuestion.label}</p>
        <div className="flex flex-wrap gap-3">
          {randomUsernameQuestion.options.map((option) => {
            const isSelected = randomUsernameValue === option.value;

            return (
              <button
                key={option.value}
                onClick={() => setNestedValue('account', 'isRandomUsername', option.value)}
                className={`cursor-pointer rounded-full px-6 py-3 text-base md:text-lg font-semibold border-2 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${getOptionClasses(
                  isSelected,
                  option.severity === 'risky',
                )}`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            randomUsernameWarning ? 'max-h-72 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <WarningBox warning={randomUsernameWarning} getWarningVisualStyle={getWarningVisualStyle} />
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            randomUsernameValue === 'yes' ? 'max-h-[420px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <div className="pl-2">
            <p className="text-lg md:text-xl font-semibold mb-2">
              Does the bot-like username completely mismatch the shipping name?
            </p>
            <p className="text-sm text-[#6B6B6B] mb-4">
              (e.g., Shipping name is 'Alice Johnson' but username is 'js_1234')
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setNestedValue('account', 'nameMismatch', 'yes')}
                className={`cursor-pointer rounded-full px-6 py-3 text-base md:text-lg font-semibold border-2 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${getOptionClasses(
                  nameMismatchValue === 'yes',
                  true,
                )}`}
              >
                Yes
              </button>
              <button
                onClick={() => setNestedValue('account', 'nameMismatch', 'no')}
                className={`cursor-pointer rounded-full px-6 py-3 text-base md:text-lg font-semibold border-2 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${getOptionClasses(
                  nameMismatchValue === 'no',
                  false,
                )}`}
              >
                No
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                nameMismatchWarning ? 'max-h-60 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              <WarningBox
                warning={nameMismatchWarning}
                getWarningVisualStyle={getWarningVisualStyle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GuidedCheckEngine = ({ onReturnToMain }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [maxReachedScreen, setMaxReachedScreen] = useState(0);
  const [feedbackStatus, setFeedbackStatus] = useState('idle');
  const [feedbackText, setFeedbackText] = useState('');

  const currentConfig = screens[currentScreen];

  const setNestedValue = (category, field, value) => {
    setFormData((previous) => {
      const nextCategoryData = {
        ...previous[category],
        [field]: value,
      };

      if (category === 'account' && field === 'isRandomUsername' && value === 'no') {
        nextCategoryData.nameMismatch = null;
      }

      return {
        ...previous,
        [category]: nextCategoryData,
      };
    });
  };

  const isCurrentScreenComplete = useMemo(() => {
    if (currentScreen > 2) {
      return true;
    }

    if (currentScreen === 0) {
      const { feedback, isRandomUsername, nameMismatch } = formData.account;

      if (feedback === null || isRandomUsername === null) {
        return false;
      }

      if (isRandomUsername === 'yes') {
        return nameMismatch !== null;
      }

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
    if (currentScreen === 0 && onReturnToMain) {
      onReturnToMain();
      return;
    }

    setCurrentScreen((previous) => Math.max(previous - 1, 0));
  };

  const handleStartOver = () => {
    if (onReturnToMain) {
      onReturnToMain();
      return;
    }

    setFormData(initialFormData);
    setCurrentScreen(0);
    setMaxReachedScreen(0);
    setFeedbackStatus('idle');
    setFeedbackText('');
  };

  const submitToDiscord = async () => {
    const feedbackType = feedbackStatus === 'up' ? 'up' : feedbackStatus === 'down' ? 'down' : null;

    if (!feedbackType) {
      return;
    }

    setFeedbackStatus('submitting');

    try {
      const payload = {
        username: 'IBL Feedback Bot',
        embeds: [
          {
            title: '🚨 New User Feedback',
            color: feedbackType === 'up' ? 3066993 : 15158332,
            fields: [
              {
                name: 'Rating',
                value: feedbackType === 'up' ? '👍 Useful' : '👎 Not Useful',
                inline: true,
              },
              {
                name: 'Comments',
                value: feedbackText.trim() || 'No comment provided.',
              },
            ],
            footer: { text: 'IsBuyerLegit.com Dashboard' },
          },
        ],
      };

      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Discord webhook failed with status ${response.status}`);
      }

      setFeedbackStatus('submitted');
      setFeedbackText('');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      setFeedbackStatus(feedbackType);
    }
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

  const verdict = useMemo(() => {
    const redFlags = [];
    const warnings = [];

    if (formData.payment.offPlatform === 'yes_text_email') {
      redFlags.push('⚠️ Buyer requested off-platform communication.');
    }

    if (formData.payment.addressChanged === 'yes') {
      redFlags.push('⚠️ Buyer requested a post-payment shipping address change.');
    }

    if (
      formData.account.isRandomUsername === 'yes'
      && formData.account.nameMismatch === 'yes'
    ) {
      redFlags.push('⚠️ Bot-like username completely mismatches the shipping name.');
    }

    if (formData.account.feedback === 'new') {
      warnings.push('⚠️ Buyer account has 0 feedback or is newly created.');
    }

    if (formData.address.isForwarder === 'yes_warehouse') {
      warnings.push('⚠️ Delivery address appears to be a freight forwarder warehouse.');
    }

    if (redFlags.length > 0) {
      return {
        level: 'high',
        label: 'HIGH RISK',
        icon: '🔴',
        textClass: 'text-red-500',
        bgClass: 'bg-red-900/10',
        borderClass: 'border-red-500/30',
        details: [...redFlags, ...warnings],
      };
    }

    if (warnings.length > 0) {
      return {
        level: 'caution',
        label: 'PROCEED WITH CAUTION',
        icon: '🟡',
        textClass: 'text-yellow-500',
        bgClass: 'bg-yellow-900/10',
        borderClass: 'border-yellow-500/30',
        details: warnings,
      };
    }

    return {
      level: 'safe',
      label: 'LOOKS SAFE',
      icon: '🟢',
      textClass: 'text-green-500',
      bgClass: 'bg-green-900/10',
      borderClass: 'border-green-500/30',
      details: ['✅ No common red flags detected.'],
    };
  }, [formData]);

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#111111] px-6 py-10 md:py-14 font-sans flex flex-col">
      <style>
        {`@keyframes panelFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}
      </style>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 flex-1 w-full">
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

              {currentScreen === 0 ? (
                <AccountStep
                  accountData={formData.account}
                  accountConfig={currentConfig}
                  getWarningVisualStyle={getWarningVisualStyle}
                  setNestedValue={setNestedValue}
                />
              ) : (
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
              )}

              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className={`rounded-xl px-5 py-3 text-base font-semibold transition-all duration-300 ${
                    currentScreen === 0
                      ? 'cursor-pointer border border-[#D8D1BE] text-[#4A4A4A] hover:border-[#D9CC9A] hover:text-[#7A5A00] hover:bg-[#FBF2D6]'
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

              <div className={`mt-8 rounded-2xl border p-6 md:p-8 ${verdict.bgClass} ${verdict.borderClass}`}>
                <p className={`text-3xl md:text-5xl font-black tracking-tight ${verdict.textClass}`}>
                  {verdict.icon} {verdict.label}
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-[#E7DFC9] bg-[#FFFEFA] p-5 md:p-6">
                <p className="text-sm md:text-base text-[#7A7A7A] mb-3">
                  {verdict.level === 'safe' ? 'Result' : 'Triggered Signals'}
                </p>
                <ul className="space-y-2">
                  {verdict.details.map((detail) => (
                    <li key={detail} className="text-base md:text-lg text-[#2B2B2B] leading-relaxed">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border border-[#E0E0E0]/20 rounded-lg p-4">
                {feedbackStatus === 'submitted' ? (
                  <p className="text-sm text-gray-400">✅ Thanks for your feedback!</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-400">Was this assessment useful?</p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => setFeedbackStatus('up')}
                        disabled={feedbackStatus === 'submitting'}
                        className={`cursor-pointer rounded-md border px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${
                          feedbackStatus === 'up'
                            ? 'border-[#D9CC9A] bg-[#F4E7C0] text-[#7A5A00]'
                            : 'border-[#D8D1BE] text-[#4A4A4A] hover:border-[#D9CC9A] hover:bg-[#FBF2D6]'
                        } ${feedbackStatus === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''}`}
                      >
                        👍 Yes
                      </button>
                      <button
                        onClick={() => setFeedbackStatus('down')}
                        disabled={feedbackStatus === 'submitting'}
                        className={`cursor-pointer rounded-md border px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${
                          feedbackStatus === 'down'
                            ? 'border-[#DC2626] bg-[#FEE2E2] text-[#7F1D1D]'
                            : 'border-[#D8D1BE] text-[#4A4A4A] hover:border-[#D9CC9A] hover:bg-[#FBF2D6]'
                        } ${feedbackStatus === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''}`}
                      >
                        👎 No
                      </button>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        feedbackStatus === 'up' || feedbackStatus === 'down' || feedbackStatus === 'submitting'
                          ? 'max-h-72 opacity-100 mt-3'
                          : 'max-h-0 opacity-0 mt-0'
                      }`}
                    >
                      <textarea
                        value={feedbackText}
                        onChange={(event) => setFeedbackText(event.target.value)}
                        placeholder="Any specific feedback or missing red flags? (Optional)"
                        rows={3}
                        className="w-full rounded-md border border-[#D8D1BE] bg-[#FFFEFA] px-3 py-2 text-sm text-[#2B2B2B] placeholder:text-[#9AA0A6] focus:outline-none focus:ring-2 focus:ring-[#D9CC9A]"
                      />

                      <button
                        onClick={submitToDiscord}
                        disabled={feedbackStatus === 'submitting'}
                        className={`mt-3 rounded-md border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                          feedbackStatus === 'submitting'
                            ? 'cursor-not-allowed border-[#E8E2D2] text-[#9AA0A6] bg-[#F8F5EB]'
                            : 'cursor-pointer border-[#D9CC9A] text-[#7A5A00] hover:bg-[#F4E7C0]'
                        }`}
                      >
                        {feedbackStatus === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                <div className="flex items-center gap-3">
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
              </div>
            </>
          )}
        </div>
        </div>
      </div>

      <LegalFooter />
    </div>
  );
};

export default GuidedCheckEngine;