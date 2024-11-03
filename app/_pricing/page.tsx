'use client';

import { useRef, useState } from 'react';

import { motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';
import ArrowIcon from '@/public/assets/ui/Arrow';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// Move form fields outside component to prevent recreation on each render
const formFields = [
  {
    id: 'firstName',
    label: 'FIRST NAME',
    placeholder: 'First Name',
    type: 'text',
    width: 'half',
  },
  {
    id: 'lastName',
    label: 'LAST NAME',
    placeholder: 'Last Name',
    type: 'text',
    width: 'half',
  },
  {
    id: 'email',
    label: 'EMAIL',
    placeholder: 'Business Email Address',
    type: 'email',
    width: 'half',
  },
  {
    id: 'jobTitle',
    label: 'JOB TITLE',
    placeholder: 'Job Title',
    type: 'text',
    width: 'half',
  },
  {
    id: 'organization',
    label: 'ORGANIZATION',
    placeholder: 'Organization',
    type: 'text',
    width: 'half',
  },
  {
    id: 'message',
    label: 'MESSAGE',
    placeholder: 'Your Message',
    type: 'textarea',
    width: 'full',
  },
] as const;

// Move form field rows outside component
const formFieldRows = [
  ['firstName', 'lastName'],
  ['email', 'jobTitle'],
  ['organization'],
] as const;

// Move variants outside component to prevent recreation
const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
} as const;

// Add these variants near the top with other variants
const inputVariants = {
  initial: { y: 0 },
} as const;

const labelVariants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
} as const;

// Create a separate input component to reduce re-renders
const FormInput = ({
  field,
  value,
  onChange,
}: {
  field: (typeof formFields)[number];
  value: string;
  onChange: (id: string, value: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div
      key={field.id}
      className='relative flex w-full flex-col items-start justify-end gap-8'
    >
      <div className='relative flex w-full flex-col items-start justify-center gap-2.5 self-stretch'>
        <motion.div
          className='relative w-full'
          initial='initial'
          animate={isFocused ? 'focus' : 'initial'}
          whileHover='hover'
          variants={inputVariants}
        >
          <motion.input
            type={field.type}
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            onFocus={(e) => {
              setIsFocused(true);
              e.target.placeholder = '';
            }}
            onBlur={(e) => {
              setIsFocused(false);
              e.target.placeholder = field.placeholder;
            }}
            placeholder={field.placeholder}
            className='peer relative flex h-[38px] w-full items-center gap-2.5 self-stretch rounded-[7px] bg-[#18181B] px-5 py-3 font-book text-[12px] tracking-[-0.12px] text-white transition-shadow duration-200 placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/20'
          />
          <motion.div
            className='pointer-events-none absolute inset-0 rounded-[7px]'
            animate={{
              boxShadow: isFocused
                ? '0 0 0 1px rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.1)'
                : '0 0 0 1px rgba(255,255,255,0)',
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
        <motion.label
          initial='initial'
          animate={isFocused || hasValue ? 'visible' : 'initial'}
          variants={labelVariants}
          className='pointer-events-none absolute -top-6 left-0 origin-left text-xs font-normal leading-[14.4px] tracking-[0.96px] text-white'
        >
          {field.label}
        </motion.label>
      </div>
    </div>
  );
};

export default function PricingPage() {
  const isMobile = useIsMobile();

  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement form submission logic
      console.log(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <motion.section
      ref={sectionRef}
      className='relative flex min-h-[98dvh] flex-col overflow-x-hidden bg-[#000000] text-white'
      initial={{ opacity: 0, backgroundColor: '#000000' }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar isFixed={false} />

      <div className='relative mt-20 flex flex-1 flex-col px-4 pb-8 sm:flex-row sm:justify-between sm:px-2 sm:pb-0 md:px-4 lg:px-8'>
        <div>
          <motion.h1
            variants={itemVariants}
            initial='initial'
            animate='animate'
            className={`${
              isMobile
                ? 'mt-24 text-3xl sm:text-4xl'
                : 'mt-[30vh] text-[42px] lg:text-[52px]'
            } max-w-2xl font-book leading-[1.2] tracking-[-0.42px]`}
          >
            Pricing
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial='initial'
            animate='animate'
            className='mt-2 max-w-[70%] font-light text-lg text-white/80'
          >
            Aaru serves a wide range of customers for diverse use cases. Contact
            us to see what plan would work best for you.{' '}
          </motion.p>
        </div>

        <div
          className={`${
            isMobile
              ? 'mt-12 w-full'
              : 'mt-32 w-full max-w-[569px] xl:max-w-[640px]'
          } mb-4 sm:mb-8`}
        >
          <motion.p
            variants={itemVariants}
            initial='initial'
            animate='animate'
            className='mb-[30px] font-book text-lg tracking-tight sm:mb-[50px] sm:text-[24px]'
          >
            Contact Us
          </motion.p>

          <form
            onSubmit={handleSubmit}
            className='relative flex w-full flex-col items-start gap-[50px]'
          >
            {formFieldRows.map((row) => (
              <div
                key={row.join('-')}
                className={`flex w-full ${
                  isMobile
                    ? 'flex-col gap-[50px]'
                    : 'relative flex-[0_0_auto] flex-row gap-[50px] self-stretch'
                }`}
              >
                {row.map((fieldId) => {
                  const field = formFields.find((f) => f.id === fieldId)!;
                  return (
                    <FormInput
                      key={field.id}
                      field={field}
                      value={formData[field.id] || ''}
                      onChange={handleInputChange}
                    />
                  );
                })}
              </div>
            ))}

            <div className='relative flex w-full flex-[0_0_auto] flex-col items-start justify-end gap-8 self-stretch'>
              <div className='relative w-full'>
                <div className='mb-4 flex items-center gap-2'>
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      x='2.06641'
                      y='1.96387'
                      width='10.8682'
                      height='10.8682'
                      rx='5.43408'
                      stroke='white'
                    />
                    <rect
                      x='7'
                      y='6.11133'
                      width='1'
                      height='4.57227'
                      fill='#D9D9D9'
                    />
                    <rect
                      x='7'
                      y='4.11133'
                      width='1'
                      height='1'
                      fill='#D9D9D9'
                    />
                  </svg>
                  <p className='text-sm text-white opacity-80'>
                    Please tell us about your project so we can connect you with
                    the right team.
                  </p>
                </div>

                <motion.div
                  initial='initial'
                  whileHover='hover'
                  variants={inputVariants}
                >
                  <textarea
                    value={formData.message || ''}
                    onChange={(e) =>
                      handleInputChange('message', e.target.value)
                    }
                    onFocus={(e) => (e.target.placeholder = '')}
                    onBlur={(e) => (e.target.placeholder = 'Your Message')}
                    placeholder='Your Message'
                    className='peer relative flex w-full items-center gap-2.5 self-stretch rounded-[7px] bg-[#18181B] px-5 pb-20 pt-3 font-book text-xs tracking-[-0.12px] transition-shadow duration-200 placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/20'
                  />
                  <motion.div
                    className='pointer-events-none absolute inset-0 rounded-[7px]'
                    animate={{
                      boxShadow: formData.message
                        ? '0 0 0 1px rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.1)'
                        : '0 0 0 1px rgba(255,255,255,0)',
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
                <motion.label
                  initial='initial'
                  animate={formData.message?.length > 0 ? 'visible' : 'initial'}
                  variants={labelVariants}
                  className='pointer-events-none absolute -top-6 left-0 origin-left text-xs font-normal leading-[14.4px] tracking-[0.96px] text-white'
                >
                  MESSAGE
                </motion.label>
              </div>
            </div>

            <motion.button
              type='submit'
              className='relative -mt-4 inline-flex flex-[0_0_auto] items-center justify-center gap-2.5 rounded-[20000px] bg-zinc-900 px-2 py-1 hover:border-white/20'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className='relative mt-[-1.00px] w-fit whitespace-nowrap text-xs font-normal leading-[13.2px] tracking-[0.96px] text-white'>
                SUBMIT
              </span>
              <ArrowIcon className='rotate-[-90deg]' color='white' size={10} />
            </motion.button>
          </form>
        </div>
      </div>
      <Footer />
    </motion.section>
  );
}
