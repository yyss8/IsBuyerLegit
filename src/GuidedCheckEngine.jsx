import React, { useEffect, useMemo, useState } from 'react';
import LegalFooter from './LegalFooter';
import { useLanguage } from './i18n.jsx';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1477767870258876717/QAOb233eKrm6sFU3h5l-ulfa8zs_Aewll1YPH7noh2MQrbvHHWR_II-VFKQ0PR5fghAe';

const initialFormData = {
  account: { feedback: null, registrationAge: null, isRandomUsername: null, nameMismatch: null },
  payment: { offPlatform: null, fakeEmail: null, addressChanged: null },
  address: { isForwarder: null, visualMismatch: null, areaCodeMismatch: null },
};

const caseStudies = {
  '0_feedback': [
    {
      category: 'CATEGORY_WEB',
      summary:
        "A seller listed two high-value collectibles ($750 and $900). Both sold back-to-back via Buy It Now on the same day to two different 0-feedback buyers who had both joined that same day. The usernames followed the exact same pattern (first 2 letters of first name + first 3 letters of last name + 4 numbers). Both buyers were from neighboring towns and neither responded to messages. The eBay community advised canceling using 'problem with address' as the stated reason.",
      url: 'https://community.ebay.com/t5/Selling/Potential-0-feedback-buyer-scam/td-p/31424532',
      linkLabel: 'eBay Community Discussion',
    },
    {
      category: 'CATEGORY_WEB',
      summary:
        "A seller listed designer shoes and received an immediate purchase from a buyer with 0 feedback. The username appeared to show '84' after the name — making it look like the buyer had 84 feedback — but clicking through revealed it was actually part of the username with zero real feedback. The account was created the same day as the purchase. The shipping address had vowels deliberately removed (e.g., 'Scmmr Rd' instead of 'Scammer Road'). The seller nearly shipped before noticing these red flags.",
      url: 'https://betweennapsontheporch.net/how-i-almost-got-scammed-as-a-seller-on-ebay/',
      linkLabel: "Seller's Personal Blog Post",
    },
    {
      category: 'CATEGORY_OWNER',
      badge: true,
      story:
        "I sold a $500 item to a buyer who had registered their eBay account the same day as their purchase. The item was delivered with no issues — but I heard nothing back. About 14 days later, they opened a case claiming they had been in the hospital and came home to find the box empty. I responded asking them to return the empty box as proof. Two days later, without returning anything, the buyer escalated directly to eBay. eBay then informed me that based on 'legal documentation' provided by the buyer — which I was never shown or allowed to verify — they issued a full refund without my approval. I lost both the item and the money. It took 3 months of persistent complaints to eBay support and their social media team before they offered a 'goodwill' reimbursement — meaning eBay covered it themselves, not because they admitted any wrongdoing. The buyer faced no consequences.",
    },
  ],
  name_mismatch: [
    {
      category: 'CATEGORY_OWNER',
      badge: true,
      story:
        "I listed a $1,200 item and received an order from a newly registered account. The username was clearly system-generated (auto-assigned format) and bore no resemblance to the shipping recipient's name. The phone number on the order had a New York area code, but the shipping address was in Florida. I cancelled using 'something is wrong with the address' as the reason and blocked the buyer. Within minutes they sent abusive messages. A week or two later, I checked the account — eBay had already suspended it. Cancelling that order was the right call.",
    },
    {
      category: 'CATEGORY_WEB',
      summary:
        "A buyer purchased an item on eBay and received a package shipped directly from the manufacturer's retail store — not from the eBay seller. Inside was an invoice showing a different person's credit card had been charged, with the buyer's address as the destination. The manufacturer's legal team confirmed it was a stolen credit card. This is known as a 'triangulation scam': the fraudster lists items on eBay, uses stolen credit cards to buy from real retailers, and ships directly to the eBay buyer. The scammer collects the eBay payment while the stolen card covers the actual merchandise cost.",
      url: 'https://community.ebay.com/t5/Buying/Drop-shipping-Scam-Possibly-seller-uses-stolen-credit-card-to/td-p/32147649',
      linkLabel: 'eBay Community Discussion',
    },
    {
      category: 'CATEGORY_WEB',
      summary:
        "A seller listed a high-value GPU and received a bid from a buyer named 'Hank Pym' — a Marvel character — with 0 feedback and a UPS Store as the shipping address. Community members flagged that a fictional shipping name combined with a commercial forwarding address on a high-value electronics item is a strong indicator of stolen credit card use. The seller was advised to cancel before shipping.",
      url: 'https://community.ebay.com/t5/Selling/Does-ebay-allow-fake-names-for-buyers/td-p/32700864',
      linkLabel: 'eBay Community Discussion',
    },
  ],
  address_change: [
    {
      category: 'CATEGORY_WEB',
      summary:
        "A seller listed a $500 camera. After payment, the buyer requested to change the shipping address from a house in Hawaii to an industrial park in Delaware, citing a sick sister. The eBay community confirmed this as a near-certain scam: the new address was a commercial/industrial location, the story was implausible, and shipping to that address would have voided all seller protection. The correct response: cancel using 'problem with buyer address' and relist. If the buyer refuses to repurchase, that confirms they were a scammer.",
      url: 'https://community.ebay.com/t5/Selling/Different-Change-address-scam/td-p/33385850',
      linkLabel: 'eBay Community Discussion',
    },
    {
      category: 'CATEGORY_WEB',
      summary:
        "A seller received an address-change request right after selling an $800 item. The message came from a different eBay account than the actual buyer — a known bulk scam tactic where fraudsters message every recent high-value sale hoping a seller will ship to them instead. Both the buyer's account and the requesting account had been created the same day. The requesting account was suspended by eBay within hours. The seller was advised never to ship to an address not listed on the original order, regardless of who asks.",
      url: 'https://community.ebay.com/t5/Shipping/Scam-in-progress-Received-request-to-change-shipping-address-to/td-p/32567698',
      linkLabel: 'eBay Community Discussion',
    },
  ],
  is_forwarder: [
    {
      category: 'CATEGORY_WEB',
      summary:
        "A seller shipped a computer part to a freight forwarder address in Delaware. The buyer later opened a 'significantly not as described' case claiming the box was empty. The seller contacted the freight forwarder directly and obtained written confirmation that the item had been forwarded overseas. Despite this evidence, eBay's automated system initially sided with the buyer. The seller had to escalate manually — eBay's own policy states MBG is voided when a freight forwarder is used, but the automated system does not recognize this. Human review was required.",
      url: 'https://community.ebay.com/t5/Selling/Buyer-Using-Freight-Forwarder-Filed-a-SNAD/td-p/31996677',
      linkLabel: 'eBay Community Discussion',
    },
    {
      category: 'CATEGORY_WEB',
      summary:
        "A seller discovered that eBay's freight forwarder policy had quietly changed: eBay can now only void buyer protection if the buyer explicitly states in an eBay message that they used a forwarder. The address alone is no longer enough — eBay reps explained that buyers were claiming to 'work at' the freight forwarding company to bypass the exclusion. The practical solution confirmed by experienced sellers: message the buyer before shipping and get written acknowledgment, which creates the paper trail needed to win any future dispute.",
      url: 'https://community.ebay.com/t5/Selling/eBay-Policy-Change-Seller-Protection-Change-when-Buyer-uses-a/td-p/30295666',
      linkLabel: 'eBay Community Discussion',
    },
  ],
};

const getOrderedCaseStudies = (flagKey) => {
  const entries = caseStudies[flagKey];

  if (!entries || entries.length === 0) {
    return [];
  }

  return [
    ...entries.filter((entry) => entry.category === 'CATEGORY_OWNER'),
    ...entries.filter((entry) => entry.category === 'CATEGORY_WEB'),
  ];
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
        warnings: {
          yes: {
            level: 'red',
            badge: '🚨 RED FLAG',
            description:
              "eBay requires that the actual shipping address matches the address on the order. Shipping to any other address — even at the buyer's request — voids your seller protection entirely. If a buyer 'item not received' case is opened, eBay will not cover you. Never agree to ship to a different address under any circumstances. If the address is genuinely wrong, the only safe option is to cancel the order and have the buyer repurchase with the correct address.",
          },
        },
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
              "Freight forwarder addresses are not automatically a scam — but eBay's buyer protection is only voided if the buyer explicitly confirms they used a forwarder in an eBay message. An address alone is no longer enough. Message the buyer before shipping to get written confirmation.",
          },
        },
      },
      {
        key: 'visualMismatch',
        label: 'Does this neighborhood look legitimate?',
        options: [
          { label: 'Yes, it looks legitimate', value: 'no', severity: 'safe' },
          { label: 'No, it does not look legitimate', value: 'yes', severity: 'risky' },
        ],
        warnings: {
          yes: {
            level: 'medium',
            badge: '⚠️ MEDIUM WARNING',
            description:
              "We know you shouldn't judge a book by its cover — but if Street View is showing abandoned factories, streets full of beat-up cars, and rundown housing, I don't think shipping something worth $10,000 there would be a smart idea. It doesn't automatically mean it's a scam, but if other flags are also showing up, trust your gut.",
          },
        },
      },
      {
        key: 'areaCodeMismatch',
        label: 'Does the phone area code match the shipping region?',
        options: [
          { label: 'Yes, it matches', value: 'no', severity: 'safe' },
          { label: 'No, it does not match', value: 'yes', severity: 'risky' },
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

const WarningBox = ({ warning, getWarningVisualStyle, t }) => {
  if (!warning) {
    return null;
  }

  const visualStyle = getWarningVisualStyle(warning.level);

  return (
    <div className={`bg-[#1A1A1A] border-l-4 ${visualStyle.borderColor} p-4 rounded-r-md`}>
      <p className={`text-sm font-bold ${visualStyle.badgeColor}`}>{t(warning.badge)}</p>
      <p className={`text-sm mt-2 leading-relaxed ${visualStyle.textColor}`}>{t(warning.description)}</p>
    </div>
  );
};

const WebSourceCard = ({ summary, url, linkLabel, t }) => {
  return (
    <article className="rounded-xl border border-[#E5E5E0] bg-[#F7F7F5] p-4 md:p-5">
      <p className="text-xs font-semibold tracking-wide text-[#8A8A86]">{t('🔗 Verified Source')}</p>
      <p className="mt-2 text-sm md:text-base leading-relaxed text-[#2F2F2F]">{t(summary)}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#5E5E5E] underline decoration-1 underline-offset-2 transition-colors duration-300 hover:text-[#2F2F2F]"
      >
        {t('🔗 Source:')} {t(linkLabel)}
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
};

const OwnerCard = ({ story, t }) => {
  return (
    <article className="relative rounded-xl border border-[#E9D9A8] bg-[#FFFBF0] p-4 md:p-5">
      <p className="absolute right-4 top-3 text-xs md:text-sm font-bold tracking-wide text-[#A27400]">
        {t("🛡️ OWNER'S PICK")}
      </p>
      <p className="mt-7 text-sm md:text-base leading-relaxed text-[#3C3624] italic font-serif">{t(story)}</p>
    </article>
  );
};

const CaseStudiesModal = ({ isOpen, onClose, flagKey, flagTitle, t }) => {
  const orderedEntries = getOrderedCaseStudies(flagKey);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || orderedEntries.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/70 p-4 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] rounded-2xl border border-[#E7DFC9] bg-[#FFFDF7] shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E7DFC9] px-5 py-4">
          <p className="text-base md:text-lg font-bold text-[#2F2F2F]">{t('Case Studies:')} {t(flagTitle)}</p>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md border border-[#D8D1BE] px-3 py-1 text-sm font-semibold text-[#4A4A4A] hover:border-[#D9CC9A] hover:text-[#7A5A00]"
            aria-label={t('Close')}
          >
            ✕
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5 space-y-3">
          {orderedEntries.map((entry, index) => {
            if (entry.category === 'CATEGORY_OWNER' && entry.badge) {
              return <OwnerCard key={`owner-${index}`} story={entry.story} t={t} />;
            }

            if (entry.category === 'CATEGORY_WEB') {
              return (
                <WebSourceCard
                  key={`web-${index}`}
                  summary={entry.summary}
                  url={entry.url}
                  linkLabel={entry.linkLabel}
                  t={t}
                />
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
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

const AccountStep = ({ accountData, accountConfig, getWarningVisualStyle, setNestedValue, t }) => {
  const feedbackQuestion = accountConfig.questions.find((question) => question.key === 'feedback');
  const randomUsernameQuestion = accountConfig.questions.find(
    (question) => question.key === 'isRandomUsername',
  );
  const registrationQuestion = {
    key: 'registrationAge',
    label: 'When did this account register?',
    options: [
      { label: 'Today or within 7 days', value: 'recent', severity: 'risky' },
      { label: 'More than 7 days ago', value: 'older', severity: 'safe' },
    ],
    warnings: {
      recent: {
        level: 'medium',
        badge: '⚠️ MEDIUM WARNING',
        description:
          "Every user starts as a new user. eBay discourages treating all new accounts as scammers, but we need to look closer at this user's other information to be safe.",
      },
      older: {
        level: 'medium',
        badge: '⚠️ MEDIUM WARNING',
        description:
          "Every user starts as a new user. eBay discourages treating all new accounts as scammers, but we need to look closer at this user's other information to be safe.",
      },
    },
  };

  const feedbackValue = accountData.feedback;
  const registrationAgeValue = accountData.registrationAge;
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
        <p className="text-lg md:text-xl font-semibold mb-4">{t(feedbackQuestion.label)}</p>
        <div className="flex flex-wrap gap-3">
          {feedbackQuestion.options.map((option) => {
            const isSelected = feedbackValue === option.value;

            return (
              <button
                key={option.value}
                onClick={() => setNestedValue('account', 'feedback', option.value)}
                className={`cursor-pointer w-full sm:w-auto rounded-full px-6 py-3 text-base md:text-lg font-semibold border-2 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${getOptionClasses(
                  isSelected,
                  option.severity === 'risky',
                )}`}
              >
                {t(option.label)}
              </button>
            );
          })}
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            feedbackQuestion.warnings?.[feedbackValue] ? 'max-h-[1200px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <WarningBox
            warning={feedbackQuestion.warnings?.[feedbackValue] ?? null}
            getWarningVisualStyle={getWarningVisualStyle}
            t={t}
          />
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            feedbackValue === 'new' ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <div className="pl-2">
            <p className="text-lg md:text-xl font-semibold mb-4">{t(registrationQuestion.label)}</p>
            <div className="flex flex-wrap gap-3">
              {registrationQuestion.options.map((option) => {
                const isSelected = registrationAgeValue === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => setNestedValue('account', 'registrationAge', option.value)}
                    className={`cursor-pointer w-full sm:w-auto rounded-full px-6 py-3 text-base md:text-lg font-semibold border-2 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${getOptionClasses(
                      isSelected,
                      option.severity === 'risky',
                    )}`}
                  >
                    {t(option.label)}
                  </button>
                );
              })}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                registrationQuestion.warnings?.[registrationAgeValue]
                    ? 'max-h-[1200px] opacity-100 mt-3'
                  : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              <WarningBox
                warning={registrationQuestion.warnings?.[registrationAgeValue] ?? null}
                getWarningVisualStyle={getWarningVisualStyle}
                t={t}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          feedbackValue === 'new' ? 'max-h-[2000px] opacity-100 mt-0' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div>
          <p className="text-lg md:text-xl font-semibold mb-4">{t(randomUsernameQuestion.label)}</p>
          <div className="flex flex-wrap gap-3">
            {randomUsernameQuestion.options.map((option) => {
              const isSelected = randomUsernameValue === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => setNestedValue('account', 'isRandomUsername', option.value)}
                  className={`cursor-pointer w-full sm:w-auto rounded-full px-6 py-3 text-base md:text-lg font-semibold border-2 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${getOptionClasses(
                    isSelected,
                    option.severity === 'risky',
                  )}`}
                >
                  {t(option.label)}
                </button>
              );
            })}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              randomUsernameWarning ? 'max-h-[1200px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <WarningBox warning={randomUsernameWarning} getWarningVisualStyle={getWarningVisualStyle} t={t} />
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              randomUsernameValue === 'yes' ? 'max-h-[1200px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <div className="pl-2">
              <p className="text-lg md:text-xl font-semibold mb-2">
                {t('Does the bot-like username match the shipping name?')}
              </p>
              <p className="text-sm text-[#6B6B6B] mb-4">
                {t("(e.g., Shipping name is 'Alice Johnson' but username is 'js_1234')")}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setNestedValue('account', 'nameMismatch', 'no')}
                  className={`cursor-pointer w-full sm:w-auto rounded-full px-6 py-3 text-base md:text-lg font-semibold border-2 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${getOptionClasses(
                    nameMismatchValue === 'no',
                    false,
                  )}`}
                >
                  {t('Yes')}
                </button>
                <button
                  onClick={() => setNestedValue('account', 'nameMismatch', 'yes')}
                  className={`cursor-pointer w-full sm:w-auto rounded-full px-6 py-3 text-base md:text-lg font-semibold border-2 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${getOptionClasses(
                    nameMismatchValue === 'yes',
                    true,
                  )}`}
                >
                  {t('No, completely different')}
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  nameMismatchWarning ? 'max-h-[1200px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
                }`}
              >
                <WarningBox
                  warning={nameMismatchWarning}
                  getWarningVisualStyle={getWarningVisualStyle}
                  t={t}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GuidedCheckEngine = ({ onReturnToMain }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialFormData);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [maxReachedScreen, setMaxReachedScreen] = useState(0);
  const [feedbackStatus, setFeedbackStatus] = useState('idle');
  const [feedbackText, setFeedbackText] = useState('');
  const [copiedForwarderMessage, setCopiedForwarderMessage] = useState(false);
  const [expandedFlagCards, setExpandedFlagCards] = useState({});
  const [activeCaseStudyModal, setActiveCaseStudyModal] = useState(null);

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

      if (category === 'account' && field === 'feedback' && value === 'established') {
        nextCategoryData.registrationAge = null;
        nextCategoryData.isRandomUsername = null;
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
      const {
        feedback,
        registrationAge,
        isRandomUsername,
        nameMismatch,
      } = formData.account;

      if (feedback === null) {
        return false;
      }

      if (feedback === 'new' && registrationAge === null) {
        return false;
      }

      if (feedback === 'new' && isRandomUsername === null) {
        return false;
      }

      if (feedback === 'new' && isRandomUsername === 'yes') {
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
            title: t('🚨 New User Feedback'),
            color: feedbackType === 'up' ? 3066993 : 15158332,
            fields: [
              {
                name: t('Rating'),
                value: feedbackType === 'up' ? t('👍 Useful') : t('👎 Not Useful'),
                inline: true,
              },
              {
                name: t('Comments'),
                value: feedbackText.trim() || t('No comment provided.'),
              },
            ],
            footer: { text: t('IsBuyerLegit.com Dashboard') },
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

  const toggleFlagCard = (flagKey) => {
    setExpandedFlagCards((previous) => ({
      ...previous,
      [flagKey]: !previous[flagKey],
    }));
  };

  const openCaseStudiesModal = (flagKey, flagTitle) => {
    setActiveCaseStudyModal({ flagKey, flagTitle });
  };

  const closeCaseStudiesModal = () => {
    setActiveCaseStudyModal(null);
  };

  const handleCopyForwarderMessage = async () => {
    const suggestedMessage = t('Hi, we noticed your shipping address appears to be a freight forwarding service. Could you please confirm whether you are using a freight forwarder so we can process your order correctly? Thank you.');

    try {
      await navigator.clipboard.writeText(suggestedMessage);
      setCopiedForwarderMessage(true);
      setTimeout(() => setCopiedForwarderMessage(false), 1800);
    } catch (error) {
      console.log('Clipboard copy failed:', error);
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
    const conditions = {
      hasNewFeedback: formData.account.feedback === 'new',
      isRecentRegistration:
        formData.account.feedback === 'new' && formData.account.registrationAge === 'recent',
      hasNameMismatch:
        formData.account.isRandomUsername === 'yes' && formData.account.nameMismatch === 'yes',
      isForwarderAddress: formData.address.isForwarder === 'yes_warehouse',
      hasVisualMismatch: formData.address.visualMismatch === 'yes',
      hasAreaCodeMismatch: formData.address.areaCodeMismatch === 'yes',
      hasOffPlatformRequest: formData.payment.offPlatform === 'yes_text_email',
      hasFakePaymentEmail: formData.payment.fakeEmail === 'yes',
      hasAddressChanged:
        formData.payment.addressChanged === 'yes'
        || formData.payment.addressChanged === true
        || formData.payment.addressChanged === 'true',
    };

    const flagDefinitions = [
      {
        key: '0_feedback',
        when: conditions.hasNewFeedback,
        severity: 'medium',
        title: 'Buyer account has 0 feedback or is newly created',
        description:
          "New accounts aren't automatically scammers — everyone starts at zero. However, on high-value items, 0 feedback combined with other signals below significantly increases risk. Scammers create throwaway accounts at no cost and simply open a new one after each suspension.",
        caseStudiesFlagKey: '0_feedback',
      },
      {
        key: 'registration_age',
        when: conditions.isRecentRegistration,
        severity: 'medium',
        title: 'Same-day or brand new account',
        description:
          'An account registered today or within the past 7 days purchasing a high-value item is the most common scam pattern on eBay. However, it can also be a legitimate buyer who just created an account to make a purchase. Look closely at the other flags below to determine if this is a risky signal or just a new user.',
        caseStudiesFlagKey: '0_feedback',
      },
      {
        key: 'name_mismatch',
        when: conditions.hasNameMismatch,
        severity: 'red',
        title: "System-generated username doesn't match shipping name",
        description:
          'A large mismatch points to two fraud patterns: (1) Stolen credit card — the fraudster uses someone else\'s payment info and ships to their own address. (2) Triangulation scam — the fraudster sells your item on another platform using a stolen card, then opens an "item not received" case on eBay to get a second refund. eBay seller protection does NOT cover chargebacks filed by the real cardholder, even if tracking shows delivery.',
        caseStudiesFlagKey: 'name_mismatch',
      },
      {
        key: 'is_forwarder',
        when: conditions.isForwarderAddress,
        severity: 'medium',
        title: 'Delivery address appears to be a freight forwarder or warehouse',
        description:
          "Freight forwarders are not automatically fraudulent — many legitimate international buyers use them. However, a critical eBay policy detail applies: eBay's Money Back Guarantee (buyer protection) is only voided if the buyer explicitly acknowledges using a freight forwarder in an eBay message. A freight forwarder address alone is no longer sufficient — buyers can claim they live or work at the address. This means a dispute can still go against you unless you have written confirmation from the buyer. Getting that confirmation before shipping is the most important protective step.",
        caseStudiesFlagKey: 'is_forwarder',
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
        caseStudiesFlagKey: 'address_change',
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
  }, [formData]);

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#111111] px-6 py-10 md:py-14 font-sans flex flex-col">
      <style>
        {`@keyframes panelFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}
      </style>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 flex-1 w-full">
        <aside className="md:w-56 md:pt-8">
          <div className="rounded-2xl border border-[#E7DFC9] bg-[#FFFDF7] p-4 md:p-5">
            <p className="text-sm font-semibold text-[#7A7A7A] mb-3">{t('Guided Check')}</p>
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
                    {t(label)}
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
                {t(currentConfig.stepLabel)}
              </p>
              <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
                {t(currentConfig.title)}
              </h1>

              {currentScreen === 0 ? (
                <AccountStep
                  accountData={formData.account}
                  accountConfig={currentConfig}
                  getWarningVisualStyle={getWarningVisualStyle}
                  setNestedValue={setNestedValue}
                  t={t}
                />
              ) : (
                <div className="mt-8 space-y-7">
                  {currentScreen === 2 ? (
                    <div className="rounded-xl border border-[#E7DFC9] bg-[#FFFEFA] p-4 md:p-5">
                      <p className="text-sm md:text-base text-[#5B5B5B]">
                        {t('We recommend verifying the address visually before proceeding.')}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <a
                          href="https://www.google.com/maps"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md border border-[#D8D1BE] px-3 py-1.5 text-xs md:text-sm font-semibold text-[#6A6A6A] transition-colors duration-300 hover:border-[#CFC7B4] hover:text-[#4E4E4E]"
                        >
                          {t('🗺 Google Maps')}
                        </a>
                        <a
                          href="https://www.zillow.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md border border-[#D8D1BE] px-3 py-1.5 text-xs md:text-sm font-semibold text-[#6A6A6A] transition-colors duration-300 hover:border-[#CFC7B4] hover:text-[#4E4E4E]"
                        >
                          {t('🏠 Zillow')}
                        </a>
                      </div>
                    </div>
                  ) : null}

                  {currentConfig.questions.map((question) => {
                  const selectedValue = formData[currentConfig.category][question.key];
                  const activeWarning = question.warnings?.[selectedValue] || null;

                  return (
                    <div key={question.key}>
                      <p className="text-lg md:text-xl font-semibold mb-4">{t(question.label)}</p>
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
                              className={`cursor-pointer w-full sm:w-auto rounded-full px-6 py-3 text-base md:text-lg font-semibold border-2 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40 ${
                                isSelected
                                  ? isRiskySelection
                                    ? 'bg-[#FEE2E2] border-[#DC2626] text-[#7F1D1D] focus:ring-red-600/40'
                                    : 'border-[#D9CC9A] bg-[#F4E7C0] text-[#7A5A00]'
                                  : 'border-[#D8D1BE] bg-[#FFFFFF] text-[#2F2F2F] hover:border-[#D9CC9A] hover:text-[#7A5A00] hover:bg-[#FBF2D6]'
                              }`}
                            >
                              {t(option.label)}
                            </button>
                          );
                        })}
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-out ${
                          activeWarning ? 'max-h-[1200px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
                        }`}
                      >
                        {activeWarning ? (
                          <div
                            className={`bg-[#1A1A1A] border-l-4 ${getWarningVisualStyle(activeWarning.level).borderColor} p-4 rounded-r-md`}
                          >
                            <p className={`text-sm font-bold ${getWarningVisualStyle(activeWarning.level).badgeColor}`}>
                              {t(activeWarning.badge)}
                            </p>
                            <p className={`text-sm mt-2 leading-relaxed ${getWarningVisualStyle(activeWarning.level).textColor}`}>
                              {t(activeWarning.description)}
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
                  {t('Back')}
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
                  {t('Next')}
                </button>
              </div>
            </>
          ) : (
            <>
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
                    const isExpanded = Boolean(expandedFlagCards[flag.key]);
                    const isRed = flag.severity === 'red';
                    const caseStudyCount = getOrderedCaseStudies(flag.caseStudiesFlagKey).length;

                    return (
                      <article
                        key={flag.key}
                        className={`rounded-2xl border bg-[#FFFEFA] p-4 md:p-5 border-l-4 ${
                          isRed ? 'border-l-[#E53E3E] border-[#F2D6D6]' : 'border-l-[#D97706] border-[#F3E5CC]'
                        }`}
                      >
                        <button
                          onClick={() => toggleFlagCard(flag.key)}
                          className="w-full text-left"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold tracking-wide ${
                                  isRed ? 'bg-[#FFF5F5] text-[#C53030]' : 'bg-[#FFFBEB] text-[#92400E]'
                                }`}
                              >
                                {isRed ? t('🚩 RED FLAG') : t('⚠️ MEDIUM WARNING')}
                              </span>
                              <p className="mt-2 text-base md:text-lg font-bold text-[#2B2B2B]">{t(flag.title)}</p>
                            </div>
                            <span className="text-lg font-bold text-[#6B6B6B]" aria-hidden="true">
                              {isExpanded ? '▲' : '▼'}
                            </span>
                          </div>
                        </button>

                        {isExpanded ? (
                          <div className="mt-4 border-t border-[#EFE9D8] pt-4">
                            <p className="text-sm md:text-base leading-relaxed text-[#3A3A3A]">
                              {t(flag.description)}
                            </p>

                            {flag.key === 'is_forwarder' ? (
                              <div className="mt-4 rounded-xl border border-l-4 border-l-[#3B82F6] border-[#BFDBFE] bg-[#F0F7FF] p-4 md:p-5">
                                <p className="text-sm font-bold tracking-wide text-[#1D4ED8]">{t('💡 SUGGESTED ACTION')}</p>
                                <p className="mt-2 text-base font-bold text-[#1E3A8A]">{t('Get written confirmation before shipping')}</p>
                                <p className="mt-2 text-sm md:text-base leading-relaxed text-[#1E3A8A]">
                                  {t('If the address looks like a freight forwarder, message the buyer on eBay before shipping to confirm. Their reply creates the paper trail needed to void buyer protection if a dispute is opened later.')}
                                </p>

                                <div className="mt-3 rounded-lg border border-[#93C5FD] bg-[#EFF6FF] p-3">
                                  <p className="text-sm md:text-base leading-relaxed text-[#1E3A8A]">
                                    {t('Hi, we noticed your shipping address appears to be a freight forwarding service. Could you please confirm whether you are using a freight forwarder so we can process your order correctly? Thank you.')}
                                  </p>
                                </div>

                                <div className="mt-3">
                                  <button
                                    onClick={handleCopyForwarderMessage}
                                    className="cursor-pointer rounded-md border border-[#D9CC9A] px-3 py-1 text-sm font-semibold text-[#7A5A00] transition-all duration-300 hover:bg-[#F4E7C0] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/40"
                                  >
                                    {copiedForwarderMessage ? t('Copied') : t('Copy Message')}
                                  </button>
                                </div>
                              </div>
                            ) : null}

                            {caseStudyCount > 0 ? (
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  openCaseStudiesModal(flag.caseStudiesFlagKey, flag.title);
                                }}
                                className="mt-3 cursor-pointer rounded-md border border-[#D8D1BE] px-3 py-1.5 text-sm font-semibold text-[#4A4A4A] transition-colors duration-300 hover:border-[#D9CC9A] hover:text-[#7A5A00] hover:bg-[#FBF2D6]"
                              >
                                {t('📋 View Case Studies')}
                              </button>
                            ) : null}
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              )}

              <div className="mt-6 border border-[#E0E0E0]/20 rounded-lg p-4">
                {feedbackStatus === 'submitted' ? (
                  <p className="text-sm text-gray-400">{t('✅ Thanks for your feedback!')}</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-400">{t('Was this assessment useful?')}</p>

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
                        {t('👍 Yes')}
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
                        {t('👎 No')}
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
                        placeholder={t('Any specific feedback or missing red flags? (Optional)')}
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
                        {feedbackStatus === 'submitting' ? t('Submitting...') : t('Submit Feedback')}
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
                    {t('Back')}
                  </button>

                  <button
                    onClick={handleStartOver}
                    className="cursor-pointer rounded-xl px-7 py-3 text-base font-bold border-2 border-[#D9CC9A] text-[#7A5A00] transition-all duration-300 hover:bg-[#F4E7C0]"
                  >
                    {t('Start Over')}
                  </button>
                </div>
              </div>

              <CaseStudiesModal
                isOpen={Boolean(activeCaseStudyModal)}
                onClose={closeCaseStudiesModal}
                flagKey={activeCaseStudyModal?.flagKey}
                flagTitle={activeCaseStudyModal?.flagTitle}
                t={t}
              />
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