import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import VBIcon from '@/public/assets/ui/VBIcon';

import MobileMenu from './MobileMenu';

const navItems = [
  { text: 'Home', href: '/' },
  { text: 'Platform', href: '/platform' },
  { text: 'About', href: '/about' },
  { text: 'Model Demo', href: '/model' },
] as const;

const navItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

interface NavbarProps {
  isFixed?: boolean;
}

export default function Navbar({ isFixed = true }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <motion.nav
      initial={false} // Prevent initial animation
      animate='visible'
      className={`${
        isFixed ? 'fixed' : 'absolute'
      } left-0 right-0 z-50 flex w-full items-center justify-between bg-transparent px-4 py-4 sm:px-8 sm:py-6`}
    >
      <NavLogo />
      <DesktopMenu pathname={pathname} />
      <MobileMenuButton toggleMenu={toggleMenu} />
      <AnimatePresence mode='wait'>
        {isMenuOpen && (
          <MobileMenu
            pathname={pathname}
            toggleMenu={toggleMenu}
            navItems={navItems}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

const NavLogo = memo(() => (
  <motion.div variants={navItemVariants} className='flex items-center'>
    <Link href='/' scroll={false}>
      <VBIcon size={100} className='sm:size-62 text-white' />
    </Link>
  </motion.div>
));

NavLogo.displayName = 'NavLogo';

const DesktopMenu = memo(({ pathname }: { pathname: string }) => (
  <motion.div
    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    className='hidden items-center space-x-6 sm:flex sm:space-x-10'
  >
    {navItems.map((item) => (
      <NavItem key={item.text} item={item} pathname={pathname} />
    ))}
    <ContactButton />
  </motion.div>
));

DesktopMenu.displayName = 'DesktopMenu';

const NavItem = memo(
  ({
    item,
    pathname,
  }: {
    item: (typeof navItems)[number];
    pathname: string;
  }) => {
    const isActive = pathname === item.href;

    return (
      <motion.div variants={navItemVariants} className='group relative'>
        <Link
          href={item.href}
          className='font-book text-[14px] text-white transition-colors hover:text-gray-300'
          scroll={false} // Prevent scroll to top on navigation
        >
          <span className='flex items-center'>
            <AnimatePresence mode='wait'>
              {isActive && (
                <motion.span
                  className='mr-2 h-2 w-2 rounded-full bg-white'
                  layoutId='activeDot'
                  initial={false} // Prevent initial animation
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                />
              )}
            </AnimatePresence>
            {item.text}
          </span>
        </Link>
        <motion.div
          className='absolute -bottom-1 left-0 right-0 h-px origin-left bg-white'
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    );
  }
);

NavItem.displayName = 'NavItem';

const ContactButton = memo(() => (
  <motion.div variants={navItemVariants} className='group relative'>
    <Link href='/contact' scroll={false}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='flex items-center rounded-full border border-white bg-white px-2 py-0.5 text-xs text-black transition-all hover:bg-transparent hover:text-white'
      >
        CONTACT
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='ml-2 h-3 w-3'
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
        </svg>
      </motion.button>
    </Link>
    <motion.div
      className='absolute -bottom-1 left-0 right-0 h-px origin-left bg-white'
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
));

ContactButton.displayName = 'ContactButton';

const MobileMenuButton = memo(({ toggleMenu }: { toggleMenu: () => void }) => (
  <motion.button
    variants={navItemVariants}
    className='flex items-center sm:hidden'
    onClick={toggleMenu}
    aria-label='Toggle mobile menu'
  >
    <svg
      width='38'
      height='12'
      viewBox='0 0 38 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='text-white'
    >
      <path d='M0.5 1H38' stroke='currentColor' strokeWidth='2' />
      <path d='M0.5 11H38' stroke='currentColor' strokeWidth='2' />
    </svg>
  </motion.button>
));

MobileMenuButton.displayName = 'MobileMenuButton';
