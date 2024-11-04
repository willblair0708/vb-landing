'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import posthog from 'posthog-js';

import ArrowIcon from '@/public/assets/ui/Arrow';

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function cookieConsentGiven(): string | CookiePreferences | undefined {
  if (typeof window === 'undefined') return undefined;
  const consent = localStorage.getItem('cookie_consent');
  if (!consent) return 'undecided';
  try {
    return JSON.parse(consent);
  } catch {
    return consent;
  }
}

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [consentGiven, setConsentGiven] = useState<
    string | CookiePreferences | undefined
  >(undefined);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const [analyticsInitialized, setAnalyticsInitialized] = useState(false);

  const initializeGA = () => {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
    });
    setAnalyticsInitialized(true);
  };

  useEffect(() => {
    setMounted(true);
    setConsentGiven(cookieConsentGiven());
  }, []);

  useEffect(() => {
    if (consentGiven && typeof consentGiven === 'object') {
      posthog.set_config({
        persistence: consentGiven.analytics ? 'localStorage+cookie' : 'memory',
      });

      if (consentGiven.analytics) {
        initializeGA();
      }
    }
  }, [consentGiven]);

  const handleAcceptCookies = () => {
    const fullConsent: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem('cookie_consent', JSON.stringify(fullConsent));
    setConsentGiven(fullConsent);
  };

  const handleDeclineCookies = () => {
    const minimalConsent: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem('cookie_consent', JSON.stringify(minimalConsent));
    setConsentGiven(minimalConsent);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    setConsentGiven(preferences);
    setShowPreferences(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {consentGiven === 'undecided' && (
        <motion.div
          className='fixed bottom-0 left-0 right-0 z-50 mx-auto mb-4 w-[calc(100%-2rem)] max-w-[500px] rounded-2xl border border-white/10 bg-black/90 p-8 backdrop-blur-xl sm:bottom-8 sm:left-8 sm:right-auto sm:mx-0 sm:mb-0 sm:w-[500px]'
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
        >
          {!showPreferences ? (
            <div className='flex h-full flex-col justify-between space-y-8'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <h2 className='bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-lg font-medium text-transparent'>
                    Privacy Settings
                  </h2>
                  <button
                    onClick={handleDeclineCookies}
                    className='text-white/60 transition-colors hover:text-white'
                  >
                    <svg
                      width='15'
                      height='15'
                      viewBox='0 0 15 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='opacity-60 transition-opacity hover:opacity-100'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M8.63488 7.0723L15.0001 0.707107L14.293 0L7.92777 6.3652L1.56258 0L0.855469 0.707107L7.22066 7.0723L0.855469 13.4375L1.56258 14.1446L7.92777 7.77941L14.293 14.1446L15.0001 13.4375L8.63488 7.0723Z'
                        fill='currentColor'
                      />
                    </svg>
                  </button>
                </div>
                <p className='text-[15px] leading-relaxed text-white/60'>
                  We use advanced analytics to enhance your experience and
                  improve our services. Your privacy matters to us.
                </p>
              </div>

              <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                <div className='flex gap-2'>
                  <motion.button
                    onClick={handleAcceptCookies}
                    className='group relative inline-flex h-9 items-center justify-center gap-2 rounded-full bg-white/10 px-4 backdrop-blur-sm transition-all hover:bg-white/20'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className='text-sm font-medium text-white'>
                      Accept All
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={handleDeclineCookies}
                    className='group relative inline-flex h-9 items-center justify-center gap-2 rounded-full border border-white/10 px-4 transition-all hover:bg-white/5'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className='text-sm font-medium text-white/80'>
                      Decline
                    </span>
                  </motion.button>
                </div>

                <motion.button
                  onClick={() => setShowPreferences(true)}
                  className='group relative inline-flex h-9 items-center justify-center gap-2 rounded-full border border-white/10 px-4 transition-all hover:bg-white/5'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className='text-sm font-medium text-white/80'>
                    Customize
                  </span>
                </motion.button>
              </div>
            </div>
          ) : (
            <div className='space-y-6'>
              <h2 className='bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-lg font-medium text-transparent'>
                Cookie Preferences
              </h2>

              <div className='space-y-4'>
                {[
                  {
                    title: 'Essential Cookies',
                    description: 'Required for core functionality',
                    key: 'necessary' as const,
                    disabled: true,
                  },
                  {
                    title: 'Analytics',
                    description: 'Help us understand usage patterns',
                    key: 'analytics' as const,
                  },
                  {
                    title: 'Marketing',
                    description: 'Personalized recommendations',
                    key: 'marketing' as const,
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className='flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10'
                  >
                    <label className='flex-1'>
                      <span className='block text-sm font-medium text-white'>
                        {item.title}
                      </span>
                      <span className='mt-0.5 block text-sm text-white/60'>
                        {item.description}
                      </span>
                    </label>
                    <input
                      type='checkbox'
                      checked={preferences[item.key]}
                      disabled={item.disabled}
                      onChange={(e) =>
                        setPreferences((prev) => ({
                          ...prev,
                          [item.key]: e.target.checked,
                        }))
                      }
                      className='h-5 w-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black'
                    />
                  </div>
                ))}
              </div>

              <div className='flex justify-end gap-2'>
                <motion.button
                  onClick={() => setShowPreferences(false)}
                  className='group relative inline-flex h-9 items-center justify-center gap-2 rounded-full border border-white/10 px-4 transition-all hover:bg-white/5'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className='text-sm font-medium text-white/80'>
                    Cancel
                  </span>
                </motion.button>
                <motion.button
                  onClick={handleSavePreferences}
                  className='group relative inline-flex h-9 items-center justify-center gap-2 rounded-full bg-white/10 px-4 backdrop-blur-sm transition-all hover:bg-white/20'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className='text-sm font-medium text-white'>
                    Save Preferences
                  </span>
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
