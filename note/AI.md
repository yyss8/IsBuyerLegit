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