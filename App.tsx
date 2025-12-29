import React, { useState, useEffect } from 'react';
import { Editor } from './components/Editor';
import { LandingPage } from './components/LandingPage';

export default function App() {
  const [view, setView] = useState<'landing' | 'editor'>('landing');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  if (view === 'landing') {
    return (
      <LandingPage 
        onStart={() => setView('editor')} 
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <Editor 
      onBack={() => setView('landing')} 
      isDark={isDark}
      toggleTheme={toggleTheme}
    />
  );
}