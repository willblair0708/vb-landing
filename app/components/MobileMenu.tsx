import Link from 'next/link';
import { memo } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import * as SocialIcons from '@/public/assets/footer';
import VBIcon from '@/public/assets/ui/VBIcon';

const SOCIAL_ICONS = [
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/company/aaru-ai',
    Icon: SocialIcons.LinkedInIcon,
  },
  // {
  //   name: 'youtube',
  //   href: 'https://www.youtube.com/aaru',
  //   Icon: SocialIcons.YoutubeIcon,
  // },
  {
    name: 'twitter',
    href: 'https://twitter.com/aaruhq',
    Icon: SocialIcons.TwitterIcon,
  },
  // {
  //   name: 'instagram',
  //   href: 'https://www.instagram.com/aaru',
  //   Icon: SocialIcons.InstagramIcon,
  // },
];

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    y: '-100%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const mobileItemVariants = {
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      stiffness: 300,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

interface MobileMenuProps {
  pathname: string;
  toggleMenu: () => void;
  navItems: readonly { text: string; href: string }[];
}

const MobileMenu = memo(
  ({ pathname, toggleMenu, navItems }: MobileMenuProps) => (
    <AnimatePresence>
      <motion.div
        initial='closed'
        animate='open'
        exit='closed'
        variants={mobileMenuVariants}
        className='fixed inset-0 z-50 flex h-[700px] flex-col bg-white/95 backdrop-blur-sm sm:hidden'
      >
        <motion.div
          className='relative h-24 w-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className='absolute left-5 top-[20px] flex w-[85.5px]'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <VBIcon size={85.5} className='mt-6 text-black' color='black' />
          </motion.div>

          <motion.button
            onClick={toggleMenu}
            className='absolute right-5 top-[20px] text-black'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label='Close mobile menu'
          >
            <svg
              width='38'
              height='62'
              viewBox='0 0 38 62'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='transition-colors duration-200 hover:text-gray-600'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M20.6643 31.0001L33.3947 18.2697L31.9805 16.8555L19.2501 29.5859L6.51968 16.8555L5.10547 18.2697L17.8359 31.0001L5.10547 43.7305L6.51968 45.1447L19.2501 32.4143L31.9805 45.1447L33.3947 43.7305L20.6643 31.0001Z'
                fill='currentColor'
              />
            </svg>
          </motion.button>
        </motion.div>

        <div className='flex w-full justify-center py-[100px]'>
          <motion.div
            className='flex w-full flex-col items-center gap-[50px] px-4'
            variants={{
              open: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            <motion.div
              className='flex w-full flex-col items-center gap-[20px]'
              variants={{
                open: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              <div className='w-full gap-[20px] pl-[140px]'>
                {navItems.map((item) => (
                  <MobileMenuItem
                    key={item.text}
                    item={item}
                    pathname={pathname}
                    toggleMenu={toggleMenu}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              className='flex flex-col items-center gap-[60px]'
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
            >
              <Link href='/contact' className='self-center'>
                <motion.button
                  variants={mobileItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='group flex items-center gap-2.5 rounded-full bg-zinc-900 px-1.5 py-0.5 transition-colors duration-200 hover:bg-zinc-800'
                  onClick={toggleMenu}
                >
                  <span className='font-book font-oracle text-sm tracking-[1.12px] text-white'>
                    CONTACT
                  </span>
                  <motion.svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-3.5 w-3.5 text-white transition-transform duration-200 group-hover:translate-x-0.5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </motion.svg>
                </motion.button>
              </Link>

              <div className='flex w-full flex-col items-center border-t border-black pt-4'>
                <motion.div
                  className='flex justify-center gap-4'
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                >
                  {SOCIAL_ICONS.map((icon) => (
                    <motion.div
                      key={icon.name}
                      variants={mobileItemVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href={icon.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-black transition-colors duration-200 hover:text-[#8B8B8B]'
                      >
                        <span className='sr-only'>{icon.name}</span>
                        <icon.Icon color='currentColor' />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
);

const MobileMenuItem = memo(
  ({
    item,
    pathname,
    toggleMenu,
  }: {
    item: { text: string; href: string };
    pathname: string;
    toggleMenu: () => void;
  }) => {
    const isActive = pathname === item.href;

    return (
      <motion.div variants={mobileItemVariants} whileHover={{ x: 10 }}>
        <Link
          href={item.href}
          onClick={toggleMenu}
          className={`relative mb-[15px] block font-oracle text-[32px] leading-[43.20px] tracking-[-0.36px] text-zinc-900 transition-opacity duration-200 ${
            isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80'
          }`}
        >
          {item.text}
          {isActive && (
            <motion.div
              className='absolute -left-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#18181B]'
              layoutId='activeIndicator'
            />
          )}
        </Link>
      </motion.div>
    );
  }
);

MobileMenu.displayName = 'MobileMenu';
MobileMenuItem.displayName = 'MobileMenuItem';

export default MobileMenu;
