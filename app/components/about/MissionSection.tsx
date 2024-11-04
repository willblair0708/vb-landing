import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

// Update the interface to include the isMobile prop
interface MissionSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
  inView: boolean;
}

export default function MissionSection({
  id,
  bgColor,
  isMobile,
  inView: parentInView,
}: MissionSectionProps) {
  const [ref, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    // hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    // hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      initial='hidden'
      animate={parentInView && sectionInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`flex flex-col justify-center overflow-hidden px-4 ${
        isMobile
          ? 'min-h-[70vh] py-12'
          : 'min-h-[60vh] py-16 sm:min-h-[70vh] sm:py-20 md:min-h-[80vh] md:px-8 md:py-24 lg:px-24'
      }`}
      style={{ backgroundColor: bgColor }}
    >
      <div className='mx-auto max-w-6xl'>
        <motion.div
          variants={lineVariants}
          className={`mx-auto h-px bg-black ${
            isMobile ? 'mb-3 w-16' : 'mb-4 w-24 sm:mb-5 sm:w-28 md:mb-6 md:w-36'
          }`}
        />
        <motion.h2
          variants={itemVariants}
          className={`mx-auto mb-20 text-center tracking-[-0.02em] ${
            isMobile
              ? 'w-[200px] text-[13px] leading-[16px]'
              : 'w-[270px] text-[15px] leading-[18px]'
          }`}
        >
          Our Ethos
        </motion.h2>
        <motion.div variants={itemVariants} className='text-center'>
          <p
            className={`font-oracle font-book font-[200] tracking-[-0.01em] ${
              isMobile
                ? 'px-4 text-[32px] leading-[38.4px]'
                : 'text-[40px] leading-[48px] sm:text-[48px] sm:leading-[57.6px] md:text-[56px] md:leading-[67.2px] lg:text-[64px] lg:leading-[76.8px]'
            }`}
          >
            {isMobile ? (
              <>
                Our simulations go beyond predicting outcomes — they shape them.
                Rooted in transactionalism, our multi-agent approach is founded
                on the belief that value is created through the dynamic
                interactions between multiple parties.
              </>
            ) : (
              <>
                Our simulations go beyond <br /> predicting outcomes — they
                shape <br /> them. Rooted in transactionalism, <br /> our
                multi-agent approach is founded <br /> on the belief that value
                is created <br /> through the dynamic interactions <br />
                between multiple parties.
              </>
            )}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
