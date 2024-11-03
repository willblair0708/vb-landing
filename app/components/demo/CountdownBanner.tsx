import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';

interface CountdownBannerProps {
  metadata: {
    id: string;
    timestamp: Date;
  };
  countdown?: string;
}

function formatDate(date: Date) {
  return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
}

function useCountdown() {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const getNextModelTime = () => {
      const now = new Date();
      const startDate = new Date('2024-10-30T09:00:00-04:00'); // 9 AM EST on Oct 30, 2024

      // If we're before the start date, return the start date
      if (now < startDate) {
        return startDate;
      }

      // Calculate hours since start date
      const hoursSinceStart =
        (now.getTime() - startDate.getTime()) / (1000 * 60 * 60);
      // Calculate number of 12-hour periods since start
      const periodsSinceStart = Math.floor(hoursSinceStart / 12);
      // Calculate next period
      const nextPeriod = periodsSinceStart + 1;
      // Calculate next model time
      const nextModelTime = new Date(
        startDate.getTime() + nextPeriod * 12 * 60 * 60 * 1000
      );

      return nextModelTime;
    };

    const updateCountdown = () => {
      const now = new Date();
      const targetTime = getNextModelTime();
      const diff = targetTime.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown('00:00:00');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    // Initial update
    updateCountdown();

    // Update every second
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return countdown;
}

function BannerContent({
  metadata,
  countdown,
  isMobile,
}: CountdownBannerProps & { isMobile: boolean }) {
  const localCountdown = useCountdown();
  const currentDate = formatDate(new Date());

  if (isMobile) {
    return (
      <div className='flex h-full w-full items-center justify-between'>
        {/* Left side */}
        <div className='flex items-center gap-3'>
          {/* Live Model indicator */}
          <div className='flex items-center gap-[5px]'>
            <div className='relative h-3 w-[7px]'>
              <div className='absolute left-0 top-[2.50px] h-[7px] w-[7px] rounded-full bg-black' />
            </div>
            <div className='font-oracle text-xs uppercase leading-[14.40px] tracking-wide text-zinc-900'>
              Live
            </div>
          </div>
          {/* Model ID */}
          <div className='font-oracle text-xs leading-[14.40px] tracking-wide text-[#5e5e5e]'>
            #{metadata.id}
          </div>
        </div>

        {/* Right side */}
        <div className='flex items-center gap-3'>
          {/* Countdown */}
          <div className='flex items-center gap-2'>
            <div className='font-oracle text-xs uppercase leading-[14.40px] tracking-wide text-zinc-900'>
              Next Model in
            </div>
            <div className='flex items-center gap-2.5 rounded-[5px] bg-white/50 px-2.5 pb-1 pt-[3px]'>
              <div className='font-oracle text-[13px] leading-none tracking-wide text-zinc-900'>
                {countdown || localCountdown}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-full w-full items-center justify-between'>
      <div className='flex items-center gap-2'>
        <div className='flex items-center gap-5'>
          {/* Live Model indicator */}
          <div className='flex items-center gap-[5px]'>
            <div className='relative h-3 w-[7px]'>
              <div className='absolute left-0 top-[2.50px] h-[7px] w-[7px] rounded-full bg-black' />
            </div>
            <div className='font-oracle text-xs uppercase leading-[14.40px] tracking-wide text-zinc-900'>
              Live Model
            </div>
          </div>
          {/* Model ID */}
          <div className='flex items-center gap-2'>
            <div className='font-oracle text-xs leading-[14.40px] tracking-wide text-[#5e5e5e]'>
              #{metadata.id}
            </div>
          </div>
          {/* Current Date */}
          <div className='font-oracle text-xs leading-[14.40px] tracking-wide text-[#5e5e5e]'>
            {currentDate}
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className='flex items-center gap-2'>
        <div className='flex items-center gap-2'>
          <div className='font-oracle text-xs uppercase leading-[14.40px] tracking-wide text-zinc-900'>
            Next Model in
          </div>
        </div>
        <div className='flex items-center gap-2.5 rounded-[5px] bg-white/50 px-2.5 pb-1 pt-[3px]'>
          <div className='font-oracle text-[13px] leading-none tracking-wide text-zinc-900'>
            {countdown || localCountdown}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CountdownBanner(props: CountdownBannerProps) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      }}
      initial='hidden'
      animate='visible'
      className={`w-full bg-[#03e87a] ${
        isMobile ? 'h-[40px] px-4 py-2' : 'h-[40px] px-[30px] py-[8.50px]'
      }`}
    >
      <BannerContent {...props} isMobile={isMobile} />
    </motion.div>
  );
}
