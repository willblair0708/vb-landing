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
    necessary: true, // Always true as these are essential
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
          className='fixed bottom-0 left-0 right-0 z-50 mx-auto mb-4 w-[calc(100%-2rem)] max-w-[450px] bg-[#303036] p-6 sm:bottom-8 sm:left-8 sm:right-auto sm:mx-0 sm:mb-0 sm:w-[450px]'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {!showPreferences ? (
            <div className='flex h-full flex-col justify-between space-y-6 sm:space-y-4'>
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <h2 className='text-[15px] text-white'>How we use cookies</h2>
                  <button
                    onClick={handleDeclineCookies}
                    className='text-white hover:opacity-80'
                  >
                    <svg
                      width='15'
                      height='15'
                      viewBox='0 0 15 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M8.63488 7.0723L15.0001 0.707107L14.293 0L7.92777 6.3652L1.56258 0L0.855469 0.707107L7.22066 7.0723L0.855469 13.4375L1.56258 14.1446L7.92777 7.77941L14.293 14.1446L15.0001 13.4375L8.63488 7.0723Z'
                        fill='white'
                      />
                    </svg>
                  </button>
                </div>
                <p className='font-book font-oracle text-[15px] leading-[18px] text-white opacity-70'>
                  We use our own and third-party cookies to personalize content
                  and to analyze web traffic. Learn about our privacy policy.
                </p>
              </div>

              <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                <div className='flex gap-2'>
                  <motion.button
                    onClick={handleAcceptCookies}
                    className='inline-flex h-[22px] items-center justify-center gap-2.5 rounded-full bg-white px-2 py-1 hover:bg-[#E9E9E9]'
                  >
                    <span className='font-oracle text-xs font-normal uppercase leading-[14.40px] tracking-wide text-zinc-900'>
                      ACCEPT ALL
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={handleDeclineCookies}
                    className='inline-flex h-[22px] items-center justify-center gap-2.5 rounded-full bg-black px-2 py-1 hover:bg-[#303036]'
                  >
                    <span className='font-oracle text-xs font-normal uppercase leading-[14.40px] tracking-wide text-white'>
                      REJECT ALL
                    </span>
                  </motion.button>
                </div>

                <motion.button
                  onClick={() => setShowPreferences(true)}
                  className='inline-flex h-[22px] w-fit items-center justify-center gap-2.5 rounded-full bg-black px-2 py-1 hover:bg-[#303036]'
                >
                  <span className='font-oracle text-xs font-normal uppercase leading-[14.40px] tracking-wide text-white'>
                    MANAGE PREFERENCES
                  </span>
                </motion.button>
              </div>
            </div>
          ) : (
            <div className='space-y-4'>
              <h2 className='text-[15px] text-white'>Cookie Preferences</h2>

              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <label className='text-white'>
                    <span className='font-oracle text-[13px]'>
                      Necessary Cookies
                    </span>
                    <p className='text-[12px] opacity-70'>
                      Required for the website to function
                    </p>
                  </label>
                  <input
                    type='checkbox'
                    checked={preferences.necessary}
                    disabled
                    className='h-4 w-4 rounded border-gray-300'
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <label className='text-white'>
                    <span className='font-oracle text-[13px]'>
                      Analytics Cookies
                    </span>
                    <p className='text-[12px] opacity-70'>
                      Help us improve our website
                    </p>
                  </label>
                  <input
                    type='checkbox'
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        analytics: e.target.checked,
                      }))
                    }
                    className='h-4 w-4 rounded border-gray-300 bg-black'
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <label className='text-white'>
                    <span className='font-oracle text-[13px]'>
                      Marketing Cookies
                    </span>
                    <p className='text-[12px] opacity-70'>
                      Used for targeted advertising
                    </p>
                  </label>
                  <input
                    type='checkbox'
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        marketing: e.target.checked,
                      }))
                    }
                    className='h-4 w-4 rounded border-gray-300'
                  />
                </div>
              </div>

              <div className='flex justify-end gap-2 pt-4'>
                <motion.button
                  onClick={() => setShowPreferences(false)}
                  className='inline-flex h-[22px] items-center justify-center gap-2.5 rounded-full bg-black px-2 py-1 hover:bg-[#303036]'
                >
                  <span className='font-oracle text-xs font-normal uppercase leading-[14.40px] tracking-wide text-white'>
                    CANCEL
                  </span>
                </motion.button>
                <motion.button
                  onClick={handleSavePreferences}
                  className='inline-flex h-[22px] items-center justify-center gap-2.5 rounded-full bg-white px-2 py-1 hover:bg-[#E9E9E9]'
                >
                  <span className='font-oracle text-xs font-normal uppercase leading-[14.40px] tracking-wide text-zinc-900'>
                    SAVE PREFERENCES
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
