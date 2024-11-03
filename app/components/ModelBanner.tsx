import Link from 'next/link';

import { motion } from 'framer-motion';

import ArrowIcon from '@/public/assets/ui/Arrow';

export default function ModelBanner() {
  return (
    <Link href='/model'>
      <motion.div
        className='flex h-[40px] w-full items-center justify-center bg-white px-[30px] py-4 transition-colors duration-200 hover:bg-gray-50'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex items-center gap-2'>
          <motion.span
            className='font-oracle text-xs font-normal uppercase leading-[14.40px] tracking-wide text-zinc-900'
            whileHover={{ x: -8 }}
            transition={{ duration: 0.2 }}
          >
            Check our presidential election model
          </motion.span>
          <ArrowIcon className='rotate-[-90deg]' color='black' size={10} />
        </div>
      </motion.div>
    </Link>
  );
}
