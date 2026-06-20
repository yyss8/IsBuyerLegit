import React, { useMemo, useState } from 'react';
import LegalFooter from './LegalFooter';
import { useLanguage } from './i18n.jsx';

const baseQuestions = {
  feedback: {
    key: 'feedback',
    label: 'Account Age/Feedback Score?',
    options: [
      { label: '0 Feedback / New', value: 'new' },
      { label: 'Established Feedback', value: 'established' },
    ],
  },
  registrationAge: {
    key: 'registrationAge',
    label: 'When did this account register?',
    options: [
      { label: 'Today or within 7 days', value: 'recent' },
      { label: 'More than 7 days ago', value: 'older' },
    ],
  },
  isRandomUsername: {
    key: 'isRandomUsername',
    label: 'Does the username look random or bot-like? (e.g., name-1234 or name_0)',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
  nameMismatch: {
    key: 'nameMismatch',
    label: 'Does the bot-like username match the shipping name?',
    options: [
      { label: 'Yes', value: 'no' },
      { label: 'No, completely different', value: 'yes' },
    ],
  },
  offPlatform: {
    key: 'offPlatform',
    label: 'Asked to communicate or pay outside eBay?',
    options: [
      { label: 'Yes, asked to text/email', value: 'yes_text_email' },
      { label: 'No, stayed inside eBay messages', value: 'no_stayed_on_platform' },
    ],
  },
  addressChanged: {
    key: 'addressChanged',
    label: 'After payment, did the buyer ask to change the shipping address?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
  isForwarder: {
    key: 'isForwarder',
    label: 'Does the destination look like a forwarding address?',
    options: [
      { label: "Yes, it's a warehouse", value: 'yes_warehouse' },
      { label: 'No, looks residential/standard', value: 'no_standard' },
    ],
  },
};

const getQuestionFlow = (answers) => {
  const flow = [baseQuestions.feedback];

  if (answers.feedback === 'new') {
    flow.push(baseQuestions.registrationAge);
    flow.push(baseQuestions.isRandomUsername);

    if (answers.isRandomUsername === 'yes') {
      flow.push(baseQuestions.nameMismatch);
    }
  }

  flow.push(baseQuestions.offPlatform);
  flow.push(baseQuestions.addressChanged);
  flow.push(baseQuestions.isForwarder);

  return flow;
};

const RiskLevelBadge = ({ level, t }) => {
  if (level === 'high') {
    return (
      <div className="mt-8 rounded-2xl border border-[#F5C2C2] bg-[#FFF1F1] p-6 md:p-8">
        <p className="text-3xl md:text-5xl font-black tracking-tight text-[#C53030]">{t('🔴 HIGH RISK')}</p>
      </div>
    );
  }

  if (level === 'caution') {
    return (
      <div className="mt-8 rounded-2xl border border-[#F1D6A8] bg-[#FFF8E8] p-6 md:p-8">
        <p className="text-3xl md:text-5xl font-black tracking-tight text-[#92400E]">{t('🟡 PROCEED WITH CAUTION')}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-[#B8E0C6] bg-[#EEFDF3] p-6 md:p-8">
      <p className="text-3xl md:text-5xl font-black tracking-tight text-[#276749]">{t('🟢 LOOKS SAFE')}</p>
    </div>
  );
};

const ExpressCheck = ({ onSwitchToProfessional }) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState({});
  const [currentKey, setCurrentKey] = useState('feedback');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const questionFlow = useMemo(() => getQuestionFlow(answers), [answers]);
  const currentIndex = questionFlow.findIndex((question) => question.key === currentKey);
  const isComplete = currentIndex === -1;
  const currentQuestion = isComplete ? null : questionFlow[currentIndex];

  const mappedFormData = useMemo(() => ({
    account: {
      feedback: answers.feedback ?? null,
      registrationAge: answers.registrationAge ?? null,
      isRandomUsername: answers.isRandomUsername ?? null,
      nameMismatch: answers.nameMismatch ?? null,
    },
    payment: {
      offPlatform: answers.offPlatform ?? null,
      fakeEmail: null,
      addressChanged: answers.addressChanged ?? null,
    },
    address: {
      isForwarder: answers.isForwarder ?? null,
      visualMismatch: null,
      areaCodeMismatch: null,
    },
  }), [answers]);

  const verdict = useMemo(() => {
    const conditions = {
      hasNewFeedback: mappedFormData.account.feedback === 'new',
      isRecentRegistration:
        mappedFormData.account.feedback === 'new' && mappedFormData.account.registrationAge === 'recent',
      hasNameMismatch:
        mappedFormData.account.isRandomUsername === 'yes' && mappedFormData.account.nameMismatch === 'yes',
      isForwarderAddress: mappedFormData.address.isForwarder === 'yes_warehouse',
      hasVisualMismatch: mappedFormData.address.visualMismatch === 'yes',
      hasAreaCodeMismatch: mappedFormData.address.areaCodeMismatch === 'yes',
      hasOffPlatformRequest: mappedFormData.payment.offPlatform === 'yes_text_email',
      hasFakePaymentEmail: mappedFormData.payment.fakeEmail === 'yes',
      hasAddressChanged:
        mappedFormData.payment.addressChanged === 'yes'
        || mappedFormData.payment.addressChanged === true
        || mappedFormData.payment.addressChanged === 'true',
    };

    const flagDefinitions = [
      {
        key: '0_feedback',
        when: conditions.hasNewFeedback,
        severity: 'medium',
        title: 'Buyer account has 0 feedback or is newly created',
        description:
          "New accounts aren't automatically scammers — everyone starts at zero. However, on high-value items, 0 feedback combined with other signals below significantly increases risk. Scammers create throwaway accounts at no cost and simply open a new one after each suspension.",
      },
      {
        key: 'registration_age',
        when: conditions.isRecentRegistration,
        severity: 'medium',
        title: 'Same-day or brand new account',
        description:
          'An account registered today or within the past 7 days purchasing a high-value item is the most common scam pattern on eBay. However, it can also be a legitimate buyer who just created an account to make a purchase. Look closely at the other flags below to determine if this is a risky signal or just a new user.',
      },
      {
        key: 'name_mismatch',
        when: conditions.hasNameMismatch,
        severity: 'red',
        title: "System-generated username doesn't match shipping name",
        description:
          'A large mismatch points to two fraud patterns: (1) Stolen credit card — the fraudster uses someone else\'s payment info and ships to their own address. (2) Triangulation scam — the fraudster sells your item on another platform using a stolen card, then opens an "item not received" case on eBay to get a second refund. eBay seller protection does NOT cover chargebacks filed by the real cardholder, even if tracking shows delivery.',
      },
      {
        key: 'is_forwarder',
        when: conditions.isForwarderAddress,
        severity: 'medium',
        title: 'Delivery address appears to be a freight forwarder or warehouse',
        description:
          "Freight forwarders are not automatically fraudulent — many legitimate international buyers use them. However, a critical eBay policy detail applies: eBay's Money Back Guarantee (buyer protection) is only voided if the buyer explicitly acknowledges using a freight forwarder in an eBay message. A freight forwarder address alone is no longer sufficient — buyers can claim they live or work at the address. This means a dispute can still go against you unless you have written confirmation from the buyer. Getting that confirmation before shipping is the most important protective step.",
      },
      {
        key: 'visual_mismatch',
        when: conditions.hasVisualMismatch,
        severity: 'medium',
        title: 'Neighborhood does not look legitimate',
        description:
          "We know you shouldn't judge a book by its cover — but if Street View is showing abandoned factories, streets full of beat-up cars, and rundown housing, shipping something high-value there may not be a smart idea. It doesn't automatically mean it's a scam, but if other flags are also showing up, treat it as a serious warning.",
      },
      {
        key: 'area_code_mismatch',
        when: conditions.hasAreaCodeMismatch,
        severity: 'medium',
        title: "Phone area code doesn't match the shipping region",
        description:
          'A buyer with a New York area code shipping to Florida, for example, may indicate a stolen identity or a drop-shipping scam where the "buyer" is not the real end recipient. Cross-reference this with other account signals.',
      },
      {
        key: 'off_platform',
        when: conditions.hasOffPlatformRequest,
        severity: 'red',
        title: 'Buyer requested off-platform communication',
        description:
          "eBay strictly prohibits off-platform communication. Scammers use texts and emails to send fake payment confirmations, bypassing eBay's transaction record. Never communicate or confirm payments outside eBay messages.",
      },
      {
        key: 'fake_email',
        when: conditions.hasFakePaymentEmail,
        severity: 'red',
        title: 'Suspicious payment confirmation email received',
        description:
          'Fake payment emails are a common setup for shipping scams. The email looks like eBay or PayPal but is fraudulent. Always verify payment status directly in your eBay seller dashboard — never ship based on an email alone.',
      },
      {
        key: 'address_changed',
        when: conditions.hasAddressChanged,
        severity: 'red',
        title: 'Buyer requested post-payment shipping address change',
        description:
          "Shipping to any address other than the one confirmed in the eBay order immediately voids your seller protection. If the buyer later opens an 'item not received' case, eBay will rule against you — regardless of whether you have tracking proof of delivery. This is one of the most common and most preventable ways sellers lose both item and money. A legitimate buyer who entered the wrong address will always be willing to cancel and repurchase. A scammer will not.",
      },
    ];

    const triggeredFlags = flagDefinitions
      .filter((flagDefinition) => flagDefinition.when)
      .map(({ when, ...flag }) => flag);

    const highRiskRules = [
      {
        key: 'recent_registration_with_forwarder',
        when: conditions.isRecentRegistration && conditions.isForwarderAddress,
      },
    ];

    const hasRedFlag = triggeredFlags.some((flag) => flag.severity === 'red');
    const matchesHighRiskCombination = highRiskRules.some((rule) => rule.when);
    const isHighRisk = hasRedFlag || matchesHighRiskCombination;

    if (isHighRisk) {
      return { level: 'high', flags: triggeredFlags };
    }

    if (triggeredFlags.length > 0) {
      return { level: 'caution', flags: triggeredFlags };
    }

    return { level: 'safe', flags: [] };
  }, [mappedFormData]);

  const handleSelect = (value) => {
    if (isTransitioning || !currentQuestion) {
      return;
    }

    const nextAnswers = {
      ...answers,
      [currentQuestion.key]: value,
    };

    if (currentQuestion.key === 'feedback' && value !== 'new') {
      nextAnswers.registrationAge = null;
      nextAnswers.isRandomUsername = null;
      nextAnswers.nameMismatch = null;
    }

    if (currentQuestion.key === 'isRandomUsername' && value !== 'yes') {
      nextAnswers.nameMismatch = null;
    }

    setAnswers(nextAnswers);

    const nextFlow = getQuestionFlow(nextAnswers);
    const currentPosition = nextFlow.findIndex((question) => question.key === currentQuestion.key);
    const nextQuestion = nextFlow[currentPosition + 1] ?? null;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentKey(nextQuestion ? nextQuestion.key : '__complete__');
      setIsTransitioning(false);
    }, 300);
  };

  const handleStartOver = () => {
    setAnswers({});
    setCurrentKey('feedback');
    setIsTransitioning(false);
  };

  const showProfessionalModeButton = !isComplete && currentQuestion?.key === 'feedback';

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#111111] px-6 py-10 md:py-14 font-sans flex flex-col">
      <style>
        {`@keyframes expressFadeInUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: expressFadeInUp 320ms ease-out; }`}
      </style>

      <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        {!isComplete ? (
          <div
            key={currentQuestion.key}
            className={`w-full max-w-3xl transition-all duration-300 ${
              isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0 animate-fade-in-up'
            }`}
          >
            <p className="text-sm md:text-base text-[#7A7A7A] text-center mb-3">
              {t('Express Scan')} · {currentIndex + 1}/{questionFlow.length}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] text-center mb-10">
              {t(currentQuestion.label)}
            </h1>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="w-full cursor-pointer rounded-2xl border-2 border-[#D8D1BE] bg-[#FFFEFA] px-6 py-5 text-left text-xl md:text-2xl font-semibold text-[#2F2F2F] transition-all duration-300 hover:scale-[1.01] hover:border-[#1C1813] hover:bg-[#F8F3EA] focus:outline-none focus:ring-2 focus:ring-[#1C1813]/40"
                >
                  {t(option.label)}
                </button>
              ))}
            </div>

            {showProfessionalModeButton ? (
              <div className="mt-6 text-center">
                <button
                  onClick={onSwitchToProfessional}
                  className="cursor-pointer rounded-lg border border-[#D8D1BE] px-4 py-2 text-sm md:text-base font-semibold text-[#5A5A5A] transition-all duration-300 hover:border-[#1C1813] hover:text-[#1C1813] hover:bg-[#F8F3EA]"
                >
                  {t('professional mode')}
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="w-full max-w-4xl rounded-3xl border border-[#E7DFC9] bg-[#FFFDF7] p-6 md:p-9 shadow-sm animate-fade-in-up">
            <p className="text-sm md:text-base text-[#7A7A7A] tracking-wide">{t('Step 4: The Verdict')}</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
              {t('Summary Dashboard')}
            </h1>

            <RiskLevelBadge level={verdict.level} t={t} />

            {verdict.level === 'safe' ? (
              <div className="mt-5 rounded-2xl border border-[#E7DFC9] bg-[#FFFEFA] p-5 md:p-6">
                <p className="text-base md:text-lg text-[#2B2B2B] leading-relaxed">
                  {t('✅ No common red flags detected.')}
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {verdict.flags.map((flag) => {
                  const isRed = flag.severity === 'red';

                  return (
                    <article
                      key={flag.key}
                      className={`rounded-2xl border bg-[#FFFEFA] p-4 md:p-5 border-l-4 ${
                        isRed ? 'border-l-[#E53E3E] border-[#F2D6D6]' : 'border-l-[#D97706] border-[#F3E5CC]'
                      }`}
                    >
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold tracking-wide ${
                          isRed ? 'bg-[#FFF5F5] text-[#C53030]' : 'bg-[#FFFBEB] text-[#92400E]'
                        }`}
                      >
                        {isRed ? t('🚩 RED FLAG') : t('⚠️ MEDIUM WARNING')}
                      </span>
                      <p className="mt-2 text-base md:text-lg font-bold text-[#2B2B2B]">{t(flag.title)}</p>
                      <p className="mt-2 text-sm md:text-base leading-relaxed text-[#3A3A3A]">{t(flag.description)}</p>
                    </article>
                  );
                })}
              </div>
            )}

            <div className="mt-6">
              <a
                href="/stories/"
                className="text-sm font-semibold text-[#5B5B5B] underline decoration-[#D8CFBF] underline-offset-4 transition-colors hover:text-[#1C1813]"
              >
                {t('See real cases like this')}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={handleStartOver}
                className="cursor-pointer rounded-xl px-6 py-3 text-base font-bold border-2 border-[#D8CFBF] text-[#1C1813] transition-all duration-300 hover:bg-[#EFE9DD]"
              >
                {t('Start Over')}
              </button>
            </div>
          </div>
        )}
      </div>

      <LegalFooter />
    </div>
  );
};

export default ExpressCheck;
