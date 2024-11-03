import { useMemo } from 'react';

import { Group } from '@visx/group';
import { useTooltipInPortal, withTooltip } from '@visx/tooltip';

import { usStates } from './state-data';

const COLORS = {
  'Kamala Harris': '#1019EC',
  'Donald Trump': '#EC1014',
  Undecided: '#787777',
  split: '#A900C0',
};

const LETTERS = {
  'Kamala Harris': 'D',
  'Donald Trump': 'R',
};

interface Choice {
  text: string;
  color?: string;
}

interface AreaData {
  id: string;
  probabilities: { count: number; percent: number; text: string }[];
  margin: number;
}

interface Area extends AreaData {
  id: string;
  path: string;
  name: string;
}

export default withTooltip<
  {
    data: AreaData[];
  },
  Area
>(
  ({
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
    data,
  }) => {
    const { containerBounds, TooltipInPortal, containerRef } =
      useTooltipInPortal({ scroll: true, detectBounds: false });

    const areas: Area[] = useMemo(() => {
      return usStates.map((state) => {
        const stateData = data.find((x) => x.id === state.id)!;

        return {
          id: state.id,
          path: state.path,
          name: state.name,
          probabilities: stateData?.probabilities,
          margin: stateData?.margin,
        } satisfies Area;
      });
    }, [data]);

    return (
      <div
        ref={containerRef}
        className='relative z-0 flex items-center justify-center overflow-hidden'
      >
        <svg
          className='w-[400px] md:w-[850px] xl:w-[1000px]'
          viewBox='0 0 836 493'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          {areas?.map((area) => {
            const color = computeColor(area);

            return (
              <Group key={area.id}>
                <path
                  d={area.path}
                  stroke={'#151515'}
                  fill={color}
                  strokeWidth='1'
                  strokeOpacity={1}
                  fillOpacity={
                    tooltipOpen
                      ? tooltipData && tooltipData.id === area.id
                        ? 1.0
                        : 0.3
                      : 1.0
                  }
                  className='transition-all duration-300'
                  onMouseLeave={hideTooltip}
                  onMouseMove={(event) => {
                    showTooltip({
                      tooltipData: area,
                      tooltipLeft: event.clientX - containerBounds.left,
                      tooltipTop: event.clientY - containerBounds.top,
                    });
                  }}
                />
              </Group>
            );
          })}
        </svg>
        {tooltipOpen && tooltipData && (
          <TooltipInPortal
            top={tooltipTop}
            left={tooltipLeft}
            className='!max-w-[400px] rounded-lg !p-2 font-sans !text-black !ring-2 !ring-indigo-500/10 !backdrop-blur-sm'
          >
            <p className='mb-4 text-xs font-medium uppercase'>
              {tooltipData.name}
            </p>
            <h3 className='text-base'>Probability</h3>
            {(tooltipData.probabilities ?? [])
              .toSorted((b, a) => a.count - b.count)
              .map((probability, index) => (
                <div key={index}>
                  <hr className='my-1 h-px border-0 bg-gray-200' />
                  <div className='flex items-center justify-center'>
                    <SmallerLetter
                      className='mr-2 text-white'
                      letter={
                        LETTERS[probability.text as keyof typeof LETTERS] ?? 'U'
                      }
                      backgroundColor={
                        COLORS[probability.text as keyof typeof COLORS]
                      }
                    />
                    <p className='mr-3'>{probability.text}</p>
                    <div className='ml-auto'>
                      <span>
                        {probability.percent === 99
                          ? `>99`
                          : probability.percent === 1
                            ? `<1`
                            : probability.percent.toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            <h3 className='mt-4 text-base'>Margin Delta</h3>
            <hr className='my-1 h-px border-0 bg-gray-200' />
            <div className='flex items-center justify-center'>
              {tooltipData.margin > 0 ? (
                <SmallerLetter
                  className='mr-2 text-white'
                  letter={'R'}
                  backgroundColor={COLORS['Donald Trump']}
                />
              ) : tooltipData.margin < 0 ? (
                <SmallerLetter
                  className='mr-2 text-white'
                  letter={'D'}
                  backgroundColor={COLORS['Kamala Harris']}
                />
              ) : (
                <SmallerLetter
                  className='mr-2 text-white'
                  letter={'-'}
                  backgroundColor={COLORS['Undecided']}
                />
              )}
              <p className='mr-3'>
                {tooltipData.margin > 0
                  ? 'Donald Trump'
                  : tooltipData.margin < 0
                    ? 'Kamala Harris'
                    : 'Standstill'}
              </p>
              <div className='ml-auto'>
                <span>+{Math.abs(tooltipData.margin)}</span>
              </div>
            </div>
          </TooltipInPortal>
        )}
      </div>
    );
  }
);

function SmallerLetter({
  className,
  backgroundColor,
  letter,
}: {
  className: string;
  letter: string;
  backgroundColor: string;
}) {
  return (
    <div
      className={`flex h-4 w-4 items-center justify-center text-xs font-medium ${className}`}
      style={{ backgroundColor }}
    >
      {letter}
    </div>
  );
}

function computeColor(area: Area) {
  if (area.margin === 0) {
    return COLORS.split;
  } else if (area.margin > 0) {
    return COLORS['Donald Trump'];
  } else {
    return COLORS['Kamala Harris'];
  }
}
