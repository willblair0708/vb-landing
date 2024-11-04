import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

interface ProductSectionProps {
  id: string;
  bgColor: string;
  productName: string;
  productDescription: string;
  imageSrc: string;
  features: Array<{
    title: string;
    description: string;
    bulletPoints?: string[];
  }>;
}

const PRODUCT_DESCRIPTION =
  'Too many people make decisions based on no data, or worse, bad data. Meet a family of simulation engines, built by our researchers alongside our category-defining partners. Engineered to provide clairvoyance for those who need it most.';

export default function ProductSection({
  id,
  bgColor,
  productName,
  productDescription,
  imageSrc,
  features,
}: ProductSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ backgroundColor: bgColor }}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='relative flex flex-col text-white'
    >
      <div
        className={`sm:flex-1 sm:py-4 sm:py-6 lg:px-6 ${
          id === 'dynamo-section' ? 'mt-24' : ''
        }`}
      >
        {id === 'dynamo-section' && (
          <motion.h3
            variants={itemVariants}
            className='font-oracle mb-32 max-w-md px-4 text-left font-book text-[15px] leading-[18px] tracking-[-0.02em] text-gray-400 sm:px-0'
          >
            {PRODUCT_DESCRIPTION}
          </motion.h3>
        )}

        <div className='flex min-h-[900px] w-full flex-col items-stretch bg-[#303036] md:flex-row'>
          {/* Image Section */}
          <motion.div
            variants={itemVariants}
            className='relative h-[400px] w-full md:h-auto md:w-1/2'
          >
            <div className='relative h-full w-full'>
              <Image
                src={imageSrc}
                alt={`${productName} Visualization`}
                layout='fill'
                objectFit='cover'
                quality={90}
                priority
                placeholder='blur'
                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='.5'%3E%3C/feGaussianBlur%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'%3E%3C/feFuncA%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Cimage filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMUlEQVQImWNkYGBg+P///38GBgYGRhgHRMAViKEKwCXQFcBVIivAUIDMQVGAzIFLAAC5WBKGV8FhOAAAAABJRU5ErkJggg=='%3E%3C/image%3E%3C/svg%3E"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={itemVariants}
            className='flex w-full flex-col justify-center p-8 sm:p-16 md:w-1/2'
          >
            <h2 className='mb-6 font-light font-lt text-[64px] leading-tight'>
              {productName}
            </h2>
            <h2 className='font-oracle font-book text-[24px] leading-snug tracking-tight text-[#C6C4C2]'>
              {productDescription}
            </h2>
            <div className='mt-[100px] sm:mt-[200px]'>
              <ul className='space-y-8'>
                {features.map((feature, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <div className='mb-2 h-px w-full bg-white opacity-20'></div>
                    <div className='flex flex-col items-start sm:flex-row'>
                      <div className='mb-2 flex items-center sm:mb-0 sm:w-1/3'>
                        <div className='mr-2 h-2 w-2 bg-white'></div>
                        <h3 className='text-xs font-bold uppercase tracking-tight'>
                          {feature.title}
                        </h3>
                      </div>
                      <div className='w-full text-white opacity-70 sm:w-2/3'>
                        <p>{feature.description}</p>
                        {feature.bulletPoints && (
                          <ul className='mt-2 space-y-1 pl-2'>
                            {feature.bulletPoints.map((point, i) => (
                              <li key={i} className='flex items-start'>
                                <span className='mr-2'>•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
