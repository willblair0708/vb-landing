import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { memo } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';

interface ProductNavbarProps {
  currentProduct: string;
}

const products = ['Dynamo', 'Lumen', 'Seraph'];

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

const menuVariants = {
  open: {
    opacity: 1,
    height: 'auto',
    marginTop: 8,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  closed: {
    // Added 'closed' key
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const ProductLink = memo(
  ({
    product,
    currentProduct,
    onClick,
  }: {
    product: string;
    currentProduct: string;
    onClick?: () => void;
  }) => {
    const isActive = useMemo(
      () => currentProduct === product,
      [currentProduct, product]
    );
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        const section = document.getElementById(
          `${product.toLowerCase()}-section`
        );
        if (section) {
          const navHeight = product.toLowerCase() === 'dynamo' ? 0 : 90;
          const sectionTop = section.offsetTop - navHeight;
          window.scrollTo({
            top: sectionTop,
            behavior: 'smooth',
          });
        }
        if (onClick) onClick();
      },
      [product, onClick]
    );

    return (
      <motion.div
        variants={navItemVariants}
        className='group relative'
        initial='hidden'
        animate='visible'
      >
        <Link
          href={`#${product.toLowerCase()}-section`}
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
            {product}
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

ProductLink.displayName = 'ProductLink';

function ProductNavbar({ currentProduct }: ProductNavbarProps) {
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
            className='font-book font-oracle text-[12px] leading-[15px] tracking-[-0.02em] text-white opacity-70 sm:text-[15px] sm:leading-[18px]'
          >
            Aaru Products:
          </motion.p>

          <div className='flex space-x-4 font-oracle text-[12px] leading-[15px] tracking-[-0.02em] text-white sm:space-x-8 sm:text-[15px] sm:leading-[18px]'>
            {products.map((product) => (
              <ProductLink
                key={product}
                product={product}
                currentProduct={currentProduct}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default memo(ProductNavbar);
