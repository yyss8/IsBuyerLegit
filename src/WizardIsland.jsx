import React from 'react';
import PlatformRouting from './PlatformRouting.jsx';
import { LanguageProvider } from './i18n.jsx';

const WizardIsland = () => (
  <LanguageProvider>
    <PlatformRouting />
  </LanguageProvider>
);

export default WizardIsland;
