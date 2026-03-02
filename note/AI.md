# IsBuyerLegit.ai - AI Development Notes

## Task: Step 1 Context Routing Component (March 1, 2026)

**Objective**: 
Build a minimalist, high-stakes fraud detection wizard's first step.

**Implementation Details**:
- **Language/Framework**: React (Functional Components + Hooks).
- **Styling**: Tailwind CSS single-file implementation.
- **Aesthetic**: Modern dark mode with dark charcoal gray (`#111111`) background, warm off-white (`#E0E0E0`) text, and Amex Gold/Faded Amber (`#FFC107`) accents on hover/active states.
- **Layout/Flow**: Typeform-style flex component. Centered headline with `text-5xl`/`text-6xl`. Two large tappable cards acting as routing options. Subtext included in the "Local" card for clarify ("Facebook Marketplace, OfferUp"). 
- **Interactivity**: 
  - `transition-all duration-300 transform hover:scale-105` applied to cards.
  - State tracking using `useState(null)` for `selectedPlatform`. 
  - Click-throughs update styling actively and dump logs to console (`handleSelect`).

**Status**: Completed and ready to drop into the broader context wizard setup.

---

## Task: Environment & Dependency Setup (March 1, 2026)

**Objective**: 
Setup a self-contained runtime environment and configure all dependencies for evaluating the React components created previously.

**Implementation Details**:
- **Build Tool**: Vite (`@vitejs/plugin-react`)
- **Core Dependencies**: `react`, `react-dom`
- **Styling Libraries**: `tailwindcss` v4, leveraging the modern `@tailwindcss/vite` plugin system.
- **Folder Structure Restructuring**:
  - Migrated `PlatformRouting.jsx` into standard `src/` directory.
  - Added entrypoints (`index.html`, `src/main.jsx`, `src/App.jsx`).
  - Added a root container logic (`src/index.css` importing `#111111`).
- **Scripts Available**:
  - `npm run dev`: Boot local hot-reloading Vite dev server.
  - `npm run build`: Pack production build.
  - `npm run preview`: Preview static build outputs.

**Status**: Completed. Setup scripts generated, initialized, and verified.

---

## Task: Light Mode UX & Copy Update (March 1, 2026)

**Objective**: 
Convert the wizard to a robust light mode aesthetic and update copy framing.

**Implementation Details**:
- **Aesthetic Shift**: Transitioned from Dark Mode to Light Mode. 
  - Background: Soft off-white `#F0F0F0` configured centrally in `:root`.
  - Text: Near black `#111111` for high contrast readability.
- **Copy Changes**: 
  - Headline adjusted to "Where do you sell?"
  - Selection cards refocused sequentially as queries: "Are you an eBay seller?" and "Are you a local seller?"
- **Accents**: 
  - Hover states retained "Amex Gold" concept using classical `#D4AF37`. 
  - Replaced inverted backgrounds with subtle elevated `.shadow-sm` and ring borders on hover to maintain elegant interactivity in light mode. 

**Status**: Applied and verified via manual Vite inspection.

---

## Task: Intro Animation + Inline Buyer Prompt (March 1, 2026)

**Objective**: 
Add a centered hero heading animation on page load, then transition to a smaller routed question beneath it.

**Implementation Details**:
- **Motion Sequence**:
  - Introduced a timed state transition using `useEffect` + `setTimeout(1000)`.
  - Heading `"Is your buyer legit"` fades in while centered, then moves upward and scales down.
- **Follow-up Prompt**:
  - Added fade-in text: `"You are a [ebay/local] buyer"` below the moved heading.
  - Implemented clickable inline options (`ebay` / `local`) tied to `selectedPlatform`.
- **Interaction Behavior**:
  - Selection is highlighted with gold accent (`#D4AF37`) and underline treatment.
  - Existing console logging is retained and updated to reflect inline option choice.

**Status**: Completed and integrated in the `PlatformRouting` flow.

---

## Task: Title Capitalization + Vertical Center Transition (March 1, 2026)

**Objective**: 
Refine intro animation behavior so the secondary prompt becomes the visual center after the title moves upward.

**Implementation Details**:
- Updated title copy to `"Is Your Buyer Legit"` (capitalized words).
- Removed bracket characters around selectable options in the follow-up sentence.
- Repositioned animated states:
  - Title initially appears centered and fades in.
  - After delay, title moves upward.
  - `"You are a ebay/local buyer"` now fades in at exact vertical center (`top-1/2` + translate).

**Status**: Completed and aligned to updated motion/copy request.

---

## Task: Warm White + Corrected Move-Up Animation (March 1, 2026)

**Objective**: 
Refine the intro transition so the headline first fades in centered, then moves up while the buyer question appears at the new visual center.

**Implementation Details**:
- Reworked animation timing into two phases:
  - `isTitleVisible`: quick initial fade-in of centered heading.
  - `hasMovedUp`: delayed (~1s) upward movement of title + question fade-in at center.
- Updated copy line to `"You are an ebay/local buyer"`.
- Removed width capping from the main layout container to avoid constraining hero text.
- Increased vertical separation by moving final heading position higher (`top-[10%]`).
- Improved option affordance:
  - Both `ebay` and `local` now look selectable by default (accent color + underline + hover/focus treatment).
- Shifted base background to warmer white (`#FAF6EE`) from greyer white.

**Status**: Completed and synchronized with styling/interaction request.

---

## Task: Local Option Replacement Panel + Pointer Affordance (March 1, 2026)

**Objective**: 
Make options explicitly pointer-selectable and replace the intro/questions with a guidance panel when `local` is selected.

**Implementation Details**:
- Added explicit `cursor-pointer` styling on inline option buttons.
- Added conditional rendering flow:
  - Default: animated hero + `"You are an ebay/local buyer"` selector.
  - On `local` click: replaces both heading and first question with a dedicated panel.
- Added replacement panel content:
  - Title: `"A More Detailed Fraud Detection Guideline Is In Progress"` (grammar corrected).
  - General prevention guidance paragraph covering identity verification, in-app records, payment caution, public meetup safety, and release-after-confirmation behavior.

**Status**: Completed and integrated.

---

## Task: Local Guidance Reworded Into Bullet Checklist (March 1, 2026)

**Objective**: 
Rewrite the local-buyer fraud guidance into a clear list format with actionable sub-points.

**Implementation Details**:
- Updated local panel title grammar to: `"A More Detailed Fraud Detection Guide Is In Progress"`.
- Replaced paragraph-style guidance with structured bullet points covering:
  - Prepayment trust warning.
  - Safe meetup locations with camera coverage.
  - Safe payment methods (`cash` / `Zelle`) and anti-fraud specifics.
  - Facebook Marketplace response-speed/detail best practices.
- Added nested sub-lists for explicit "not recommended" locations and payment-specific anti-scam steps.
- Added polished example response:
  - `"Yes, the item is available. I can meet at my local precinct from [time] to [time]. I accept cash or Zelle only."`

**Status**: Completed and applied to the local panel.

---

## Task: Wording + Payment Warnings + Clipboard + Return Flow (March 1, 2026)

**Objective**: 
Update first-question wording, strengthen payment-specific warnings, add clipboard utility, and allow restarting the intro workflow.

**Implementation Details**:
- Updated first prompt copy to: `"Your buyer is from ebay / local"` (rendered as selectable inline options).
- Expanded payment warnings in local guidance:
  - Added Zelle warning: never trust screenshot proof; release only after funds appear in your bank app.
  - Added large-cash warning: meet at a local bank and deposit before release; counterfeit checks are not fully reliable.
- Added `Copy to clipboard` action for the example response with temporary `Copied` state feedback.
- Added `Return` button on the local panel to restart the main heading + first-question animation workflow.
- Refactored intro timing with `introCycle` so restart fully replays fade-in and move-up sequence.

**Status**: Completed and verified.

---

## Task: Local Panel Vertical Padding/Clipping Fix (March 1, 2026)

**Objective**: 
Ensure the local guidance title/content is never clipped at the top of the viewport.

**Implementation Details**:
- Replaced absolute-centered local panel positioning with normal document flow layout.
- Added vertical padding around the local panel container (`py-10`, `md:py-16`) to provide breathing room above and below.
- Kept animated absolute positioning only for the default intro/question state.
- Preserved existing content, copy-to-clipboard action, and return behavior.

**Status**: Completed and visually aligned to padding requirement.

---

## Task: Ebay Guided Check (Step-by-Step) Component (March 1, 2026)

**Objective**: 
Create a standalone guided-question component for high-value eBay fraud checks with a future-ready shared state structure.

**Implementation Details**:
- Added new component file: `src/EbayGuidedCheck.jsx`.
- State architecture follows single-object requirement:
  - `formData = { feedback, offPlatform, streetView, addressChanged }`
  - `currentStep` numeric flow controller (1 → 5).
- Implemented Typeform-style single-question flow:
  - Step 1: Feedback score
  - Step 2: Off-platform request
  - Step 3: Google Street View check
  - Step 4: Address change request
  - Step 5: Verdict summary dashboard
- Behavior controls:
  - Auto-advance on option click.
  - Subtle `← Back` button on steps 2–4.
  - Prominent `Start Over` button on step 5 resetting both `formData` and `currentStep`.
- Styling:
  - Dark-mode palette `#111111` / `#E0E0E0` with `#FFC107` hover/accent.
  - Large typography, `max-w-3xl mx-auto`, and animated transitions via fade-slide keyframe.

**Status**: Completed and ready for integration or direct use.

---

## Task: Guided Check Engine (Category-Based Architecture) (March 1, 2026)

**Objective**: 
Build a category-grouped guided wizard using deeply nested state to support future Guided + Express mode sharing.

**Implementation Details**:
- Added component: `src/GuidedCheckEngine.jsx`.
- Implemented required nested schema:
  - `formData.account = { feedback, isRandomUsername, nameMismatch }`
  - `formData.payment = { offPlatform, fakeEmail }`
  - `formData.address = { isForwarder, visualMismatch, areaCodeMismatch }`
- Added `currentScreen` index (`0..3`) with section flow:
  - Screen 1: eBay Account (3 questions)
  - Screen 2: Payment (2 questions)
  - Screen 3: Address (3 questions)
  - Screen 4: Verdict (JSON state dump)
- UX controls:
  - Category panel `Back`/`Next` navigation on screens 1–3.
  - `Next` is enabled only after all questions in current category are answered.
  - Verdict includes `Back` and prominent `Start Over` reset.
- Styling and transitions:
  - Dark-mode palette (`#111111`, `#E0E0E0`, `#FFC107`).
  - Large category typography, pill-style answer buttons, and fade-up panel transition.

**Status**: Completed and ready for UI integration.

---

## Task: eBay Route to Guided Check Engine (March 1, 2026)

**Objective**: 
Connect platform routing so selecting `ebay` enters the guided check workflow directly.

**Implementation Details**:
- Updated `PlatformRouting` to import `GuidedCheckEngine`.
- Added conditional render gate:
  - If `selectedPlatform === 'ebay'`, return `<GuidedCheckEngine />`.
- Preserved existing `local` panel behavior and restart flow.

**Status**: Completed and ready for end-to-end routing tests.

---

## Task: Guided Check Styling Alignment + Indexed Sidebar (March 1, 2026)

**Objective**: 
Align eBay guided flow visuals with the local-panel warm-light style and add left-side indexed navigation for returning to prior steps.

**Implementation Details**:
- Restyled `GuidedCheckEngine` from dark mode to warm-light panel aesthetic:
  - App background: `#FAF6EE`
  - Panel background: `#FFFDF7`
  - Border system: warm neutral (`#E7DFC9`, `#D8D1BE`)
  - Accent interactions: gold-tinted (`#D9CC9A`, `#7A5A00`)
- Added left indexed sidebar (`1. Account`, `2. Payment`, `3. Address`, `4. Verdict`).
- Added `maxReachedScreen` tracking so sidebar allows navigation only to current/previously reached steps (no skipping ahead).
- Preserved existing `Back`, `Next`, and `Start Over` logic with transition effects.

**Status**: Completed and integrated.

---

## Task: Heading Animation Smoothness Optimization (March 1, 2026)

**Objective**: 
Reduce perceived lag/frame drops in the opening `"Is Your Buyer Legit"` hero animation.

**Implementation Details**:
- Replaced layout-heavy animation (`transition-all` on `top` and dynamic text-size shifts) with GPU-friendly animation primitives:
  - `transform` + `opacity` only
  - `transform-gpu` and `will-change` hints
- Updated motion path to keep heading centered in a fixed container and move it upward via translate/scale transforms.
- Replaced initial fade timer with a double `requestAnimationFrame` start to better align with paint frames.
- Slightly tuned move-up trigger timing (`900ms`) for tighter perceived responsiveness.

**Status**: Completed and performance-tuned.

---

## Task: Hero Slide Animation Regression Fix (March 1, 2026)

**Objective**: 
Restore visible slide-up animation for the main heading after a transition-class regression.

**Implementation Details**:
- Root issue: arbitrary class `transition-[transform,opacity]` could fail style generation and cause transform to jump instantly.
- Replaced with explicit, stable Tailwind utilities:
  - `transition-transform`
  - `transition-opacity`
  - existing `duration-800 ease-out` retained.
- Kept transform-only motion path (`translate/scale`) and opacity fade logic.

**Status**: Completed and revalidated.

---

## Task: Semantic Coloring + Inline Expandable Warnings (March 1, 2026)

**Objective**: 
Introduce risk-aware answer styling and contextual warning accordions in the guided check question cards.

**Implementation Details**:
- Added semantic option metadata (`severity: safe | risky`) to question options.
- Added warning mapping object per question (`warnings[value] => { level, badge, description }`) to directly bind selected answers to warning content.
- Injected exact requested warning content:
  - Account/Feedback: `0 Feedback / New` → `⚠️ MEDIUM WARNING`
  - Payment/Off-Platform: `Yes, asked to text/email` → `🚨 RED FLAG`
  - Address/Freight Forwarder: `Yes, it's a warehouse` → `⚠️ MEDIUM WARNING`
- Updated selected button semantics:
  - Safe selections: gold/amber active style.
  - Risky selections: red/orange danger style (`bg-red-900/20`, `border-red-500`).
- Added inline warning accordion beneath each question:
  - Smooth `max-height + opacity` transition.
  - Dark warning container (`bg-[#1A1A1A]`) with severity left border (`border-yellow-500` or `border-red-500`).

**Status**: Completed and integrated.

---

## Task: Risk Button Contrast Accessibility Fix (March 1, 2026)

**Objective**: 
Increase color contrast of selected risky answer buttons to better meet accessibility expectations.

**Implementation Details**:
- Updated risky selected state in `GuidedCheckEngine` from low-contrast style:
  - old: `bg-red-900/20 border-red-500 text-red-300`
- To higher-contrast style:
  - new: `bg-[#FEE2E2] border-[#DC2626] text-[#7F1D1D]`
- Kept semantic danger intent while improving readability on the light theme.

**Status**: Completed and validated.

---

## Task: Conditional Username Follow-Up in Account Step (March 1, 2026)

**Objective**: 
Refactor username mismatch question into a nested follow-up that appears only when the random/bot-like username answer is `Yes`.

**Implementation Details**:
- Converted `nameMismatch` from sibling question to conditional follow-up under:
  - `Does the username look random or bot-like? (e.g., name-1234 or name_0)`
- Parent question behavior:
  - `No` → safe gold state, no warning/follow-up shown.
  - `Yes` → risky red state, immediate medium warning shown.
- Added exact medium warning content for parent `Yes` state.
- Added conditional follow-up question with exact hint text.
- Follow-up behavior:
  - `No` → safe gold state.
  - `Yes` → risky red state + immediate red-flag warning with exact provided content.
- State integrity:
  - When parent toggles to `No`, `formData.account.nameMismatch` is automatically cleared (`null`).
  - Step-completion logic now requires `nameMismatch` only if parent answer is `Yes`.
- Added smooth reveal transitions for both warning and nested follow-up blocks.

**Status**: Completed and build-verified.

---

## Task: Verdict Feedback Widget + Discord Webhook Integration (March 1, 2026)

**Objective**: 
Replace Step 4 share button with a lightweight usefulness feedback widget that submits directly to Discord via webhook.

**Implementation Details**:
- Updated `src/GuidedCheckEngine.jsx` with new state:
  - `feedbackStatus`: `idle | up | down | submitting | submitted`
  - `feedbackText`: string
- Replaced share CTA with staged feedback flow:
  - Idle: `Was this assessment useful?` + `👍 Yes` / `👎 No`
  - Up/Down: reveals textarea + `Submit Feedback`
  - Submitting: button shows loading state
  - Submitted: `✅ Thanks for your feedback!`
- Added async `submitToDiscord()` using `fetch` POST to provided Discord webhook.
  - Sends embed payload with dynamic color and rating field.
  - Includes optional comment or fallback text.
  - Uses try/catch and sets `submitted` only on success.
- Added subtle widget container styling:
  - `border border-[#E0E0E0]/20 rounded-lg p-4 mt-6`
  - muted text tone (`text-gray-400`)

**Status**: Completed and integrated.

---

## Task: Disclaimer Intercept + Traffic-Light Verdict Dashboard (March 1, 2026)

**Objective**: 
Add agreement gating before entering eBay flow and replace Step 4 JSON output with a conversion-focused verdict result screen.

**Implementation Details**:
- Added localStorage disclaimer intercept in `PlatformRouting`:
  - Reads `agreedDisclaimer` via `useEffect`.
  - On `eBay` click, blocks guided entry if not agreed.
  - Shows centered modal with `bg-black/80` overlay and required disclaimer text.
  - `I Understand & Agree` saves `agreedDisclaimer=true`, closes modal, and routes into guided check.
- Replaced Step 4 JSON dump in `GuidedCheckEngine` with traffic-light verdict UI:
  - 🔴 `HIGH RISK` (`text-red-500`, `bg-red-900/10`)
  - 🟡 `PROCEED WITH CAUTION` (`text-yellow-500`, `bg-yellow-900/10`)
  - 🟢 `LOOKS SAFE` (`text-green-500`, `bg-green-900/10`)
- Added explicit risk evaluation rules from `formData`:
  - High risk: off-platform request OR post-payment address change OR random username + complete mismatch.
  - Caution: 0 feedback/new account OR freight forwarder warehouse.
  - Safe: none triggered.
- Added triggered-signals list (or safe confirmation line).
- Added CTA button: `✍️ Share your scam story to warn others` plus `Start Over`.
- Added global footer at page bottom:
  - `© 2026 IsBuyerLegit. Not affiliated with eBay. | Detailed Disclaimer & Terms`.

**Status**: Completed and integrated.

---

## Task: Footer Added to Platform Selection Home Screen (March 1, 2026)

**Objective**: 
Display legal footer text on the initial home screen where users select `ebay` or `local`.

**Implementation Details**:
- Updated `PlatformRouting` layout to `flex flex-col` with main content in a `flex-1` container.
- Added bottom footer on the home screen component:
  - `© 2026 IsBuyerLegit. Not affiliated with eBay. | Detailed Disclaimer & Terms`
- Added placeholder anchor for `Detailed Disclaimer & Terms`.
- Kept selector UI vertically centered while preserving disclaimer modal behavior.

**Status**: Completed and build-ready.

---

## Task: Global Minimal Footer + Detailed Terms Modal (March 1, 2026)

**Objective**: 
Replace placeholder legal link behavior with a real, scrollable terms modal and unify the ultra-minimal footer across key screens.

**Implementation Details**:
- Added reusable component: `src/TermsModal.jsx`.
  - Overlay: `bg-black/80 backdrop-blur-sm`
  - Container: `#111111` background, `#E0E0E0` text, `max-w-2xl`, `rounded-xl`
  - Mobile-friendly scrolling: `max-h-[80vh] overflow-y-auto overscroll-contain`
  - UX controls: top-right close `✕` and sticky bottom `Close` button
  - Content: inserted all 4 legal sections (Affiliation, Service Nature, Liability, Privacy)
- Updated footer in both `PlatformRouting` and `GuidedCheckEngine` to:
  - `© 2026 IsBuyerLegit. | Detailed Disclaimer & Terms`
  - clickable subtle link style: `cursor-pointer hover:text-[#FFC107] transition-colors`
- Added parent-state toggles (`isTermsOpen`) in both components and wired to `TermsModal`.

**Status**: Completed and integrated globally.

---

## Task: DRY Cleanup for Shared Legal UI (March 1, 2026)

**Objective**: 
Reduce duplication between `PlatformRouting` and `GuidedCheckEngine` for legal footer + terms modal behavior.

**Implementation Details**:
- Added reusable component: `src/LegalFooter.jsx`.
  - Encapsulates `isTermsOpen` state.
  - Renders shared footer text/link and mounts `TermsModal`.
- Refactored both pages to use `LegalFooter`:
  - `src/PlatformRouting.jsx`
  - `src/GuidedCheckEngine.jsx`
- Removed duplicate `TermsModal` imports and repeated footer/modal markup from both files.
- Minor cleanup in `PlatformRouting`:
  - Added `getHasAgreedDisclaimer()` helper to avoid repeated localStorage check logic.

**Status**: Completed and build-verified.

---

## Task: Local Guide Intro Subheading Copy Update (March 1, 2026)

**Objective**: 
Add a supportive explanatory subheading under the local-guide title with corrected grammar.

**Implementation Details**:
- Updated `src/PlatformRouting.jsx` local panel with new subheading under:
  - `A More Detailed Fraud Detection Guide Is In Progress`
- Final copy:
  - `Based on the site owner's experience, follow the general safety guidelines below for local meetups.`
- Applied muted styling for hierarchy and readability.

**Status**: Completed.

---

## Task: Local Meetup Prompt-Compliance Safety Section (March 1, 2026)

**Objective**: 
Add a new local safety checklist section focused on buyer behavior and meetup prompt compliance.

**Implementation Details**:
- Inserted a new section directly below payment-method guidance in the local panel:
  - `Avoid buyers who cannot follow basic meetup prompts.`
- Added reworded sub-points with corrected grammar:
  - Leave only after buyer confirms they are on the way and approximately `[x]` minutes out.
  - Treat late/no-show behavior as potentially suspicious.
  - Decline mid-meeting location switches to places without cameras or people.

**Status**: Completed and integrated in local guidance.

---

## Task: Standalone General Warning Under Local Guide (March 1, 2026)

**Objective**: 
Add a non-list general caution message between the final checklist section and the `Return` button.

**Implementation Details**:
- Inserted standalone warning block in `src/PlatformRouting.jsx` directly below the local checklist and above `Return`.
- Reworded for clarity and grammar:
  - Scam methods evolve over time.
  - One successful scam can erase profits from many clean deals.
  - Reinforces staying alert and prioritizing safety.
- Styled as a subtle highlighted panel for emphasis without breaking the minimalist layout.

**Status**: Completed.

---

## Task: Clarify Buyer Check-In Timing Wording (March 1, 2026)

**Objective**: 
Refine one local meetup bullet to explicitly require two buyer check-ins before seller departure.

**Implementation Details**:
- Updated wording in local safety section to reflect intended flow:
  - Buyer confirms when leaving and shares ETA.
  - Buyer confirms again when approximately `[x]` minutes away.
  - Seller heads out only after second close-distance confirmation.

**Status**: Completed.

---

## Task: Local Guide Readability Restructure (March 1, 2026)

**Objective**: 
Make the local safety content easier to scan by converting dense list text into clearly separated visual sections.

**Implementation Details**:
- Refactored local guide from one long nested list to multiple mini-sections.
- Added clear heading bullets per section:
  - Trust & Payment Intent
  - Safe Meetup Location
  - Safe Payment Methods
  - Buyer Prompt Compliance
  - Marketplace Message Pattern
- Each section now uses a subtle bordered card with concise bullets for faster reading.
- Preserved all existing safety guidance content and copy-to-clipboard example behavior.

**Status**: Completed and build-verified.

---

## Task: Freight Forwarder Protection Wording Correction (March 1, 2026)

**Objective**: 
Correct the freight-forwarder warning text to reference buyer protection logic accurately.

**Implementation Details**:
- Updated `src/GuidedCheckEngine.jsx` warning copy for forwarding-address scenario.
- Corrected statement from seller-protection impact to buyer-protection impact.
- Clarified condition: applies when buyer explicitly confirms they are using a forwarding address, not merely because they are located near/at a forwarding facility.
- Retained safety recommendation for signature confirmation.

**Status**: Completed.

---

## Task: Guided Check Return-To-Main Navigation (March 1, 2026)

**Objective**: 
Ensure guided-flow exit actions return to the main platform selector, not just reset inside the eBay flow.

**Implementation Details**:
- Updated `src/PlatformRouting.jsx` to pass an `onReturnToMain` callback into `GuidedCheckEngine`.
- Updated `src/GuidedCheckEngine.jsx` to accept `onReturnToMain` prop.
- Changed Step 1 `Back` behavior:
  - when on the first guided screen, `Back` now returns to the main selector via callback.
- Changed verdict `Start Over` behavior:
  - if callback is available, `Start Over` now returns to the main selector.
  - fallback local reset behavior is preserved for standalone usage.
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Verified 0-Feedback Case Study Refactor (March 1, 2026)

**Objective**: 
Replace placeholder/invented case-study content with verified real data for the `0 Feedback / New` risk signal and improve source-vs-owner presentation.

**Implementation Details**:
- Updated `src/GuidedCheckEngine.jsx` with hardcoded `caseStudies['0_feedback']` data exactly as provided.
- Added card components:
  - `WebSourceCard` for `CATEGORY_WEB` (`summary`, `url`, `linkLabel`)
  - `OwnerCard` for `CATEGORY_OWNER` (`story`, `badge: true`)
- Added `CaseStudiesSection` with a minimal `View Case Studies` expand/collapse control.
- Enforced rendering safeguards:
  - no fallback/generated examples
  - returns `null` when `caseStudies[flagKey]` is missing or empty
- Enforced card ordering so `CATEGORY_OWNER` is always shown first, followed by `CATEGORY_WEB` cards.
- Added required link safety attributes to external links:
  - `target="_blank" rel="noopener noreferrer"`
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Step 1 Registration-Age Follow-Up for 0 Feedback (March 1, 2026)

**Objective**: 
Add a conditional registration-age question under `0 Feedback / New` in Step 1 and surface the highest-risk registration pattern in the verdict summary.

**Implementation Details**:
- Updated `src/GuidedCheckEngine.jsx` account schema:
  - `registrationAge: 'recent' | 'older' | null`
- Added Step 1 conditional follow-up shown only when `feedback === 'new'`:
  - Question: `When did this account register?`
  - Options:
    - `Today or within 7 days` (`recent`) → `🚨 RED FLAG`
    - `More than 7 days ago` (`older`) → `⚠️ MEDIUM WARNING`
  - Alerts reuse existing warning component/styling (`WarningBox`).
- Preserved existing username/random-name and name-mismatch logic/flow unchanged.
- Updated Step 1 completion gating:
  - `registrationAge` is required only when `feedback` is `new`.
- Updated nested state behavior:
  - when feedback changes to `established`, `registrationAge` is reset to `null`.
- Updated verdict generation:
  - adds separate red-flag entry when `feedback === 'new' && registrationAge === 'recent'`:
    - label: `Same-day or brand new account`
    - description: `Account registered today or within the past 7 days. Combined with 0 feedback, this is the highest-risk buyer profile on eBay.`
    - includes `0_feedback` case studies toggle on verdict card.
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Name Mismatch + Triangulation Case Study Integration (March 1, 2026)

**Objective**: 
Integrate verified `name_mismatch` case studies and replace the simple mismatch verdict line with the full stolen-card/triangulation risk description.

**Implementation Details**:
- Updated `src/GuidedCheckEngine.jsx` with hardcoded `caseStudies.name_mismatch` data:
  - `CATEGORY_OWNER` story (badge true)
  - two `CATEGORY_WEB` sources (triangulation thread + fake-name GPU thread)
- Preserved owner-first rendering order via existing case-study ordering logic.
- Updated verdict red-flag generation for `isRandomUsername === 'yes' && nameMismatch === 'yes'`:
  - changed from short string to structured detail with:
    - label: `System-generated username and shipping-name mismatch`
    - full multi-paragraph risk description (stolen-card + triangulation + chargeback protection risk)
    - case study linkage: `caseStudiesFlagKey: 'name_mismatch'`
- Kept triangulation explanation on verdict page (not as a mid-flow alert).
- Reuse strategy for owner story duplication:
  - anchored under `name_mismatch` verdict case studies so owner story appears once under the most relevant flag context.
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Verdict UI Refactor + Case Study Modal Migration (March 1, 2026)

**Objective**: 
Remove case studies from guided-question steps and redesign Step 4 summary into collapsible, severity-coded flag cards with modal-based case study viewing.

**Implementation Details**:
- Updated `src/GuidedCheckEngine.jsx` Step 1–3 rendering:
  - removed inline case-study display from guided flow pages.
  - preserved question text, answer options, and existing warning alert boxes.
- Added reusable case-study modal system:
  - new `CaseStudiesModal` component with `max-w-[600px]` centered layout.
  - supports close via `X`, backdrop click, and `Escape` key.
  - scrollable body for overflow.
- Added verdict risk badge component:
  - `RiskLevelBadge` with three states:
    - `🔴 HIGH RISK`
    - `🟡 PROCEED WITH CAUTION`
    - `🟢 LOOKS SAFE`
- Reworked Step 4 triggered-signals section:
  - each triggered flag now renders as a collapsed card by default.
  - full-card click toggles expand/collapse.
  - severity visuals:
    - RED FLAG: left border `#E53E3E`, badge `#FFF5F5` / `#C53030`
    - MEDIUM WARNING: left border `#D97706`, badge `#FFFBEB` / `#92400E`
  - expanded content shows short description and `📋 View Case Studies` button (when data exists).
- Mapped verdict flags to standardized titles/descriptions for:
  - `0_feedback`, `registration_age`, `name_mismatch`, `is_forwarder`, `visual_mismatch`, `area_code_mismatch`, `off_platform`, `fake_email`
  - retained existing `address_changed` risk handling as a separate red flag.
- Kept case-study datasets intact and reused via modal display only on Step 4.
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Step 1 New-User Alert Behavior Adjustment (March 1, 2026)

**Objective**: 
Remove interstitial warning on `0 Feedback / New` selection and use one shared medium warning message on the registration-age follow-up options.

**Implementation Details**:
- Updated `src/GuidedCheckEngine.jsx` Step 1 feedback question:
  - removed `warnings.new` so selecting `0 Feedback / New` shows no alert.
  - `Established Feedback` remains with no alert.
- Updated Step 1 registration-age follow-up warning mapping:
  - `recent` and `older` now both show the same `⚠️ MEDIUM WARNING` message:
    - `Every user starts as a new user. eBay discourages treating all new accounts as scammers, but we need to look closer at this user's other information to be safe.`
- Preserved form state values (`registrationAge: recent | older`) and downstream verdict logic unchanged.
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Address-Change Red Flag Alert + Case Study Integration (March 1, 2026)

**Objective**: 
Add explicit Step 2 red-flag guidance for post-payment address-change requests and connect this flag to dedicated verdict copy + case studies.

**Implementation Details**:
- Updated `src/GuidedCheckEngine.jsx` Step 2 payment question `addressChanged`:
  - added `warnings.yes` with `🚨 RED FLAG` and exact required seller-protection warning text.
  - `No` selection remains with no alert.
- Extended `caseStudies` data with new `address_change` key and two `CATEGORY_WEB` entries exactly as provided.
- Updated verdict flag entry for `address_changed`:
  - title: `Buyer requested post-payment shipping address change`
  - description: exact required text about seller-protection void and repurchase requirement.
  - linked verdict card to case-study modal via `caseStudiesFlagKey: 'address_change'`.
- Preserved Step 1 and Step 3 logic unchanged.
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Summary Flag Visibility Check for Address-Change Selection (March 1, 2026)

**Objective**: 
Ensure `After payment, did the buyer ask to change the shipping address? = Yes` consistently appears as a verdict flag on Step 4.

**Implementation Details**:
- Re-verified end-to-end mapping from Step 2 `addressChanged` selection to verdict flag generation.
- Added robust trigger guard in `src/GuidedCheckEngine.jsx` verdict logic:
  - treats `'yes'`, `'true'`, and `true` as affirmative values for `addressChanged`.
- Updated flag title copy for clearer recognition on summary list:
  - `After payment, buyer requested shipping address change`.
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Match-vs-Mismatch Question Clarity Refactor (March 1, 2026)

**Objective**: 
Reduce user confusion by rephrasing mismatch-style prompts into match-style questions while preserving existing risk evaluation logic.

**Implementation Details**:
- Updated Step 3 question copy in `src/GuidedCheckEngine.jsx`:
  - `Do Street View visuals match the provided details?`
  - `Does the phone area code match the shipping region?`
- Updated Step 3 option labels for clearer intent (`Yes, they match` / `No, they do not match`, etc.).
- Preserved downstream logic by remapping option values to existing schema semantics:
  - safe match responses map to value `no`
  - risky mismatch responses map to value `yes`
- Updated Step 1 nested username follow-up wording:
  - from mismatch phrasing to `Does the bot-like username match the shipping name?`
- Remapped Yes/No button value bindings in that follow-up so:
  - `Yes` remains safe (`nameMismatch = 'no'`)
  - `No, completely different` remains risky (`nameMismatch = 'yes'`)
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Step 3 Address Validation Helper Links + Street-View Prompt Update (March 1, 2026)

**Objective**: 
Improve Address Validation usability by adding quick external verification links and clearer neighborhood-consistency wording.

**Implementation Details**:
- Updated `src/GuidedCheckEngine.jsx` Step 3 UI (Address screen only):
  - Added subtitle: `We recommend verifying the address visually before proceeding.`
  - Added two side-by-side external link buttons:
    - `🗺 Google Maps` → `https://www.google.com/maps`
    - `🏠 Zillow` → `https://www.zillow.com`
  - Both use `target="_blank" rel="noopener noreferrer"`.
- Reworded Street View question label:
  - from `Do Street View visuals match the provided details?`
  - to `Does the neighborhood look consistent with the value of your item?`
- Added warning copy for mismatch selection (`No, they do not match` mapped to existing risky value):
  - `A neighborhood that doesn't match the value of your item can indicate a fabricated or misused address — for example, a high-value item shipping to an empty lot, a commercial building listed as residential, or an area inconsistent with the purchase. Weigh this alongside other flags on the verdict page.`
- Preserved all existing formData keys and logic paths.
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Verdict Combination Rule Refactor (March 1, 2026)

**Objective**: 
Downgrade `Same-day or brand new account` to a medium warning and make `HIGH RISK` trigger only when recent-new-account and forwarder-address conditions are both true.

**Implementation Details**:
- Refactored verdict computation in `src/GuidedCheckEngine.jsx` to rule-based structure for easier future combinations:
  - introduced `conditions` object (normalized boolean predicates)
  - introduced `flagDefinitions` array (`when` + flag metadata)
  - introduced `highRiskRules` array for composite severity logic
- Updated `registration_age` flag severity from `red` to `medium`.
- Added/activated high-risk composite rule:
  - `recent_registration_with_forwarder` => `conditions.isRecentRegistration && conditions.isForwarderAddress`
- Updated summary level logic:
  - `HIGH RISK` only when any `highRiskRules` match
  - otherwise `PROCEED WITH CAUTION` if any flags are triggered
  - otherwise `LOOKS SAFE`
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Freight-Forwarder Flag Policy + Action Block Update (March 1, 2026)

**Objective**: 
Correct `is_forwarder` policy messaging, replace related case studies, and add a practical owner suggestion workflow in the verdict card.

**Implementation Details**:
- Updated `src/GuidedCheckEngine.jsx` Step 3 mid-flow warning (`yes_warehouse`) to the new policy text emphasizing written buyer confirmation in eBay messages.
- Replaced/added `caseStudies.is_forwarder` data with two provided `CATEGORY_WEB` sources.
- Updated verdict `is_forwarder` flag description to the exact provided wording.
- Linked `is_forwarder` verdict card to case studies via `caseStudiesFlagKey: 'is_forwarder'`.
- Added new blue `💡 SUGGESTED ACTION` block inside expanded `is_forwarder` verdict card:
  - heading: `Get written confirmation before shipping`
  - body text: provided action guidance
  - styled suggested-message box with provided template message
  - `Copy Message` button with clipboard behavior and temporary `Copied` state
- Preserved formData keys and all unrelated step/flag logic.
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Step 3 Street View Prompt Reword + Alert Copy Update (March 1, 2026)

**Objective**: 
Adjust Step 3 Street View prompt language to simpler legitimacy wording and replace its medium-warning message text.

**Implementation Details**:
- Updated `src/GuidedCheckEngine.jsx` Street View question label:
  - from `Does the neighborhood look consistent with the value of your item?`
  - to `Does this neighborhood look legitimate?`
- Replaced the warning description for risky selection (`No, they do not match`) with the provided text.
- Kept warning level as `⚠️ MEDIUM WARNING`.
- Kept formData keys and question logic unchanged.
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Street-View Selection and Summary Risk Alignment (March 1, 2026)

**Objective**: 
Ensure the new Step 3 legitimacy wording maps cleanly to summary-page label/severity and avoids mismatch-style phrasing.

**Implementation Details**:
- Updated Step 3 `visualMismatch` option labels in `src/GuidedCheckEngine.jsx`:
  - `Yes, it looks legitimate` (safe path)
  - `No, it does not look legitimate` (risky path)
- Updated Step 4 verdict flag for `visual_mismatch` to match the new framing:
  - title: `Neighborhood does not look legitimate`
  - severity: changed from `red` to `medium` to align with the updated warning posture
  - description revised to the same caution-oriented tone as Step 3 guidance.
- Preserved existing formData key/value logic (`visualMismatch` with `yes` as risky condition).
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Summary Severity Precedence Fix (March 1, 2026)

**Objective**: 
Ensure verdict severity matches flag types: any red flag must produce `HIGH RISK`, while medium-only sets produce `PROCEED WITH CAUTION` unless explicit combination rules also mark high risk.

**Implementation Details**:
- Updated `src/GuidedCheckEngine.jsx` verdict-level evaluation:
  - added `hasRedFlag = triggeredFlags.some(flag => flag.severity === 'red')`
  - kept existing `highRiskRules` combination framework
  - final precedence now:
    - `HIGH RISK` if `hasRedFlag` OR any high-risk combination rule matches
    - `PROCEED WITH CAUTION` if flags exist but no high condition
    - `LOOKS SAFE` if no flags
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.

---

## Task: Mobile Layout Polish for Guided Flow (March 1, 2026)

**Objective**: 
Improve mobile readability by preventing warning-text clipping and making answer buttons align consistently.

**Implementation Details**:
- Updated `src/GuidedCheckEngine.jsx` answer button sizing:
  - added `w-full sm:w-auto` to option buttons so they are full-width on mobile and auto-width on larger screens.
- Updated animated warning containers to prevent mobile text clipping:
  - expanded open-state max-height values from small fixed sizes (`max-h-60`/`max-h-72`/`max-h-[420px]`) to `max-h-[1200px]` where needed.
- Applied changes across Step 1 nested alerts and Step 2/3 warning blocks.
- Build verification completed successfully with `npm run build`.

**Status**: Completed and build-verified.