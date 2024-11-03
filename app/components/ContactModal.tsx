import { FC, useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion, useAnimation } from 'framer-motion';

interface ContactModalProps {
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } },
  blur: { scale: 1, transition: { duration: 0.2 } },
};

const ContactModal: FC<ContactModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    controls.start({ scale: 0.98, transition: { duration: 0.1 } });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    controls.start({ scale: 1, transition: { duration: 0.1 } });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className='fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm sm:px-0'
        variants={backdropVariants}
        initial='hidden'
        animate='visible'
        exit='hidden'
        onClick={onClose}
      >
        <motion.div
          className='relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 to-black shadow-2xl'
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
          ref={modalRef}
        >
          <motion.button
            onClick={onClose}
            className='absolute right-4 top-4 z-20 text-white/50 transition-colors hover:text-white focus:outline-none'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label='Close modal'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </motion.button>
          <div className='p-6 sm:p-8'>
            <motion.h2
              className='mb-6 font-sans text-2xl font-bold text-white sm:text-3xl'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Get in Touch
            </motion.h2>
            <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
              {['name', 'email', 'message'].map((field, index) => (
                <motion.div
                  key={field}
                  className='relative'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className='peer w-full border-b border-white/20 bg-transparent py-2 text-sm text-white placeholder-transparent transition-all duration-300 focus:border-white focus:outline-none sm:text-base'
                    variants={inputVariants}
                    whileFocus='focus'
                    initial='blur'
                    animate='blur'
                    required
                  />
                  <motion.label
                    htmlFor={field}
                    className='absolute -top-3.5 left-0 text-xs text-white/50 transition-all duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-white/50 sm:text-sm sm:peer-placeholder-shown:text-base sm:peer-focus:text-sm'
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </motion.label>
                </motion.div>
              ))}
              <motion.div
                className='pt-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  type='submit'
                  className='w-full rounded-full bg-white py-2 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black sm:py-3'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  animate={controls}
                >
                  {isSubmitting ? (
                    <motion.svg
                      className='mx-auto h-5 w-5 animate-spin text-black'
                      viewBox='0 0 24 24'
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                        fill='none'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      />
                    </motion.svg>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;
