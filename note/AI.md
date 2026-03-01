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