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