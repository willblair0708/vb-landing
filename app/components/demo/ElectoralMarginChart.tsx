'use client';

import { motion } from 'framer-motion';

const ElectoralMarginChart = ({
  data,
}: {
  data: {
    margin: number;
    frequency: number;
  }[];
}) => {
  const margins = [
    { label: 'D+538', value: -538, hideOnSmall: false },
    { label: 'D+200', value: -200, hideOnSmall: false },
    { label: 'D+100', value: -100, hideOnSmall: true },
    { label: 'D+50', value: -50, hideOnSmall: true },
    { label: '0', value: 0, hideOnSmall: false },
    { label: 'R+50', value: 50, hideOnSmall: true },
    { label: 'R+100', value: 100, hideOnSmall: true },
    { label: 'R+200', value: 200, hideOnSmall: false },
    { label: 'R+538', value: 538, hideOnSmall: false },
  ];

  return (
    <div className='relative h-[700px] w-full'>
      <div className='absolute top-0 w-full'>
        {/* Horizontal lines and NO WINNER text */}
        <div className='flex w-full items-center justify-center gap-2'>
          <div className='h-[1px] w-full bg-party-blue' />
          <div className='whitespace-nowrap text-sm text-white'>NO WINNER</div>
          <div className='h-[1px] w-full bg-party-red' />
        </div>

        {/* HARRIS/TRUMP WINS section */}
        <div className='mt-4 flex items-center justify-center'>
          <div className='mr-6 text-sm text-white'>HARRIS WINS</div>
          <div className='mx-2 h-4 w-[0px] bg-gray-400' />
          <div className='text-sm text-white'>TRUMP WINS</div>
        </div>
      </div>

      <div className='relative flex h-[calc(100%-100px)] items-end justify-between pt-[80px]'>
        {/* Center line */}
        <div className='absolute left-1/2 ml-[1px] h-[565px] w-[2px] -translate-x-1/2 bg-gray-800' />

        {/* Render bars here */}
        {data.map((point, index) => {
          const position = ((point.margin + 538) / 1076) * 100; // Calculate position percentage
          return (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${point.frequency * 8}px` }}
              className={`absolute w-[2px] ${point.margin < 0 ? 'bg-party-blue' : 'bg-party-red'}`}
              style={{ left: `${position}%` }}
            />
          );
        })}
      </div>

      <div className='relative mt-4 flex w-full justify-between border-t border-gray-700 pt-4 text-xs text-gray-400'>
        {margins.map((margin) => {
          const position = ((margin.value + 538) / 1076) * 100; // Calculate position percentage
          return (
            <div
              className={`absolute ${margin.value === 538 ? '-translate-x-full' : margin.value === -538 ? '' : '-translate-x-1/2'} text-center ${margin.hideOnSmall ? 'hidden' : ''} md:block`}
              style={{ left: `${position}%` }}
              key={margin.label}
            >
              {margin.label}
            </div>
          );
        })}
      </div>

      <div className='mt-8 w-full text-center text-sm text-gray-400'>
        ELECTORAL VOTE MARGIN
      </div>
    </div>
  );
};

export default ElectoralMarginChart;
