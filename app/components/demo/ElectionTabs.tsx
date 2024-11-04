import Link from 'next/link';
import { useCallback, useMemo } from 'react';
import { memo } from 'react';

import { motion } from 'framer-motion';

interface ElectionTabsProps {
  activeTab: string;
  isSticky?: boolean;
}

const tabs = [
  { id: 'electoral', label: 'Electoral College' },
  { id: 'states', label: 'State by State' },
  { id: 'important-states', label: 'Most Important States' },
];

const navItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

const TabLink = memo(
  ({
    tab,
    activeTab,
    onClick,
  }: {
    tab: { id: string; label: string };
    activeTab: string;
    onClick?: () => void;
  }) => {
    const isActive = useMemo(() => activeTab === tab.id, [activeTab, tab.id]);

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        const section = document.getElementById(tab.id);
        if (section) {
          const navHeight = 90;
          const sectionTop = section.offsetTop - navHeight;
          window.scrollTo({
            top: sectionTop,
            behavior: 'smooth',
          });
        }
        if (onClick) onClick();
      },
      [tab.id, onClick]
    );

    return (
      <motion.div
        variants={navItemVariants}
        className='group relative'
        initial='hidden'
        animate='visible'
      >
        <Link
          href={`#${tab.id}`}
          className={`flex items-center transition-colors hover:text-white ${
            isActive ? 'text-white' : 'text-white opacity-50'
          }`}
          onClick={handleClick}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className='flex items-center'>
            <motion.span
              className={`mr-2 h-2 w-2 rounded-full bg-[#ffffff] text-white ${
                isActive ? 'visible' : 'invisible'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            />
            {tab.label}
          </span>
        </Link>
        <motion.div
          className='absolute -bottom-1 left-0 right-0 h-px origin-left bg-white'
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    );
  }
);

TabLink.displayName = 'TabLink';

function ElectionTabs({ activeTab, isSticky = false }: ElectionTabsProps) {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='w-full bg-[#18181B]'
    >
      <div className='flex flex-col items-center justify-between p-4 sm:p-6'>
        <div className='h-[1px] w-full bg-white'></div>
        <div className='mt-4 flex w-full items-center justify-between sm:mt-6'>
          <motion.p
            variants={navItemVariants}
            className='font-oracle font-book text-[12px] leading-[15px] tracking-[-0.02em] text-white opacity-70 sm:text-[15px] sm:leading-[18px]'
          >
            2024 Election Predictions:
          </motion.p>

          <div className='font-oracle flex space-x-4 text-[12px] leading-[15px] tracking-[-0.02em] text-white sm:space-x-8 sm:text-[15px] sm:leading-[18px]'>
            {tabs.map((tab) => (
              <TabLink key={tab.id} tab={tab} activeTab={activeTab} />
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default memo(ElectionTabs);
