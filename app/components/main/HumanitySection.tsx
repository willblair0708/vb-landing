import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  memo,
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import { signal } from '@preact/signals-react';
import { useComputed, useSignals } from '@preact/signals-react/runtime';
import { motion, type MotionValue, useTransform } from 'framer-motion';

import { useCooldown } from '@/hooks/use-cooldown';
import { useScrollControl, useScrollForce } from '@/hooks/use-scroll-control';

interface HumanitySectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

const slideIndex = signal(0);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95, x: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const boxVariants = {
  hidden: { opacity: 0, x: -10, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const Slide = memo(
  ({
    progressX,
    index,
    isFallback,
  }: {
    progressX?: MotionValue<number>;
    index?: number;
    isFallback: boolean;
  }) => {
    useSignals();

    const id = useId();
    const slide = useComputed(() => slides[index ?? slideIndex.value]);

    return (
      <section id={id}>
        <motion.div
          className='relative flex min-h-[calc(100vh-60px)] w-full flex-col bg-[#EBFA13] via-[#e8f52a] to-[#EBFA13] px-5 lg:grid lg:grid-cols-[60fr_50fr_minmax(min-content,_208px)] lg:py-5'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.div
            variants={imageVariants}
            className={`relative flex h-fit w-full items-center justify-center border-black py-12 lg:h-full lg:border-b lg:p-8 ${
              isFallback && index !== 0 ? 'border-r lg:border-r-0' : ''
            }`}
          >
            <motion.div
              className='m-auto h-fit w-fit p-2'
              key={`${slideIndex.value}:image`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={slide.value.image}
                alt='Woman Aaru'
                width={500}
                height={500}
                className='h-96 lg:h-full'
              />
            </motion.div>
            {progressX ? (
              <Scrollbar
                range={[0.0, 0.21]}
                value={progressX}
                axis={{ primary: 'left', secondary: 'bottom' }}
              />
            ) : null}
          </motion.div>
          <motion.div
            variants={textVariants}
            className='relative border border-b-0 border-r-0 border-black lg:border-r'
          >
            {progressX ? (
              <>
                <Scrollbar
                  range={[0.21, 0.35]}
                  value={progressX}
                  axis={{ primary: 'bottom', secondary: 'left' }}
                />
                <Scrollbar
                  range={[0.35, 0.6]}
                  value={progressX}
                  axis={{ primary: 'left', secondary: 'top' }}
                />
                <Scrollbar
                  range={[0.6, 0.8]}
                  value={progressX}
                  axis={{ primary: 'top', secondary: 'right' }}
                />
              </>
            ) : null}
            <div className='mb-[230px] h-full w-full p-5 pb-0 lg:mb-0'>
              <motion.div
                className='mb-10 text-[13px] uppercase tracking-wide text-black'
                key={`${slideIndex.value}:tagline`}
                variants={textVariants}
              >
                {slide.value.label}
              </motion.div>
              <motion.h3
                className='font-serif text-4xl leading-[1.2] tracking-tighter text-black lg:text-[40px]'
                key={`${slideIndex.value}:description`}
                variants={textVariants}
              >
                {slide.value.tagline}
              </motion.h3>
            </div>
          </motion.div>
          <motion.div
            variants={boxVariants}
            className={`relative flex h-full w-full flex-col border-b border-l border-black lg:border-l-0 ${
              isFallback && index === slides.length - 1 ? 'mb-6' : ''
            }`}
          >
            <div className='flex h-full w-full pb-5 pl-5'>
              <div className='z-20 mt-auto flex max-w-[208px] flex-col space-y-[50px] bg-white p-4 pb-8'>
                <motion.p
                  className='border-t border-black py-[10px] text-sm tracking-tight text-black'
                  key={`${slideIndex.value}:tagp`}
                  variants={boxVariants}
                >
                  0{(index ?? slideIndex.value) + 1}
                </motion.p>
                <motion.p
                  className='border-t border-black py-[10px] text-sm tracking-tight text-black'
                  key={`${slideIndex.value}:desc`}
                  variants={boxVariants}
                >
                  {slide.value.description}
                </motion.p>
                {/* <button className='flex w-fit items-center gap-x-2 rounded-full bg-black px-2 py-1 text-xs uppercase text-white transition-colors hover:bg-gray-800'>
                <span>{slide.value.buttonText}</span>
                <icons.Arrow color='white' />
              </button> */}
              </div>
            </div>
            {progressX ? (
              <Scrollbar
                range={[0.8, 1]}
                value={progressX}
                axis={{ primary: 'left', secondary: 'bottom' }}
              />
            ) : null}
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

Slide.displayName = 'Slide';

const slides = [
  {
    image: '/assets/main/pixelated_woman.svg',
    label: 'Humanity at Scale',
    tagline:
      'Leverage hundreds of traits across demographics, psychographics and more to recreate any population, group, or geography in moments.',
    description: 'If you can describe it, Aaru can simulate it.',
    buttonText: 'Build your World',
  },
  {
    image: '/assets/main/pixelated_earth.svg',
    label: 'See the future, change the present',
    tagline:
      'Configure worlds with hypothetical news, information, and stories to measure the impact of events that haven’t yet happened.',
    description:
      "Whether it is a Vice Presidential nomination, a brand launch, or a terrorist attack, proactively identifying the impact of events is core to Aaru's operations.",
    buttonText: 'See the Future',
  },
  {
    image: '/assets/main/pixelated_stopwatch.svg',
    label: 'Infinite Scale in Minimal Time',
    tagline:
      'Reduce 4 weeks of research into 40 seconds with higher accuracy than any survey, poll, or focus group in 1/1000th of the time.',
    description:
      "Humans don't scale. They don't tell the truth, they have biases, and they frequently don't respond. Worst of all, they're slow.",
    buttonText: 'Learn more',
  },
  {
    image: '/assets/main/pixelated_tree.svg',
    label: 'Converge on Reality',
    tagline:
      'With an increasing number of agents, variance decreases. Simulations get closer and closer to reality until Aaru reaches convergence.',
    description:
      'Aaru researchers work on complex challenges daily. We tackle questions on the scale of humanity. What we build provides more accurate and detailed understandings of the world. We build clarity in chaos.',
    buttonText: 'Design Tomorrow',
  },
];

const FORCE_THRESHOLD = 700;

function HumanitySection({ id, bgColor, isMobile }: HumanitySectionProps) {
  const shouldFallback = useMemo(
    () =>
      window.matchMedia('(pointer: coarse)').matches ||
      window.innerWidth < 1024,
    []
  );

  if (!shouldFallback)
    return <ScrollingSection id={id} bgColor={bgColor} isMobile={isMobile} />;

  return (
    <motion.section
      id={id}
      className='relative min-h-screen text-black'
      style={{ backgroundColor: bgColor }}
    >
      {slides.map((_, index) => (
        <Slide index={index} key={index} isFallback={true} />
      ))}
    </motion.section>
  );
}

function ScrollingSection({ id, bgColor, isMobile }: HumanitySectionProps) {
  useSignals();

  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollForce, scrollTotal, addScrollEvent, resetScrollForce } =
    useScrollForce();

  // Use a cooldown so we don't immediately relock scroll when trying to scroll
  // past the section
  const cooldown = useCooldown(100);

  const { isLocked, lockScroll, unlockScroll } = useScrollControl({
    onWheel: (e: WheelEvent, scroll: (y: number, relock?: boolean) => void) => {
      addScrollEvent(e);

      const force = scrollForce.get();

      if (force > FORCE_THRESHOLD) {
        if (slideIndex.value < slides.length - 1) {
          gotoNextSection(1);
        } else {
          leaveSection(scroll, 1);
        }
      } else if (force < 0) {
        if (slideIndex.value > 0) {
          gotoNextSection(-1);
        } else {
          leaveSection(scroll, -1);
        }
      }
    },
    onKeyDown: (ev, scroll) => {
      if (ev.key === 'ArrowDown') {
        if (slideIndex.value < slides.length - 1) {
          gotoNextSection(1);
        } else {
          leaveSection(scroll, 1);
        }
      } else if (ev.key === 'ArrowUp') {
        if (slideIndex.value > 0) {
          gotoNextSection(-1);
        } else {
          leaveSection(scroll, -1);
        }
      }
    },
  });

  const progressX = useTransform(
    scrollTotal,
    [0, FORCE_THRESHOLD * slides.length],
    [0, 1]
  );

  const gotoNextSection = useCallback(
    (direction: number) => {
      slideIndex.value += direction;

      if (direction === 1) {
        resetScrollForce(0, slideIndex.value * FORCE_THRESHOLD);
      } else if (direction === -1) {
        resetScrollForce(
          FORCE_THRESHOLD - 1,
          (slideIndex.value + 1) * FORCE_THRESHOLD
        );
      }
    },
    [resetScrollForce]
  );

  const leaveSection = useCallback(
    (scroll: (y: number) => void, direction: number) => {
      unlockScroll();
      cooldown.trigger();
      if (direction === 1) {
        scroll(window.scrollY + window.innerHeight);
        resetScrollForce(FORCE_THRESHOLD, FORCE_THRESHOLD * slides.length);
      } else {
        scroll(window.scrollY - window.innerHeight);
        resetScrollForce(0, 0);
      }
    },
    [resetScrollForce, cooldown, unlockScroll, slides.length]
  );

  useLayoutEffect(() => {
    const ref = sectionRef.current;

    // Use a raw intersection observer here because we want to react to the events,
    // not just whenever we happen to rerender.
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isInView = entry.isIntersecting;

        if (cooldown.isValid && isInView && !isLocked) {
          sectionRef.current?.scrollIntoView({ behavior: 'instant' });
          lockScroll();
        }

        if (!isInView && isLocked) {
          unlockScroll();
        }
      },
      { threshold: 0.98 }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [isLocked, lockScroll, unlockScroll, cooldown]);

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className='relative h-screen p-[30px] text-black'
      style={{ backgroundColor: bgColor }}
      initial={{ padding: '0' }}
      whileInView={{ padding: '2rem' }}
      viewport={{ amount: 0.9, once: true }}
    >
      <Slide progressX={progressX} isFallback={false} />
    </motion.section>
  );
}

export default dynamic(() => Promise.resolve(HumanitySection), {
  ssr: false,
});

type Axis = 'left' | 'right' | 'bottom' | 'top';

const Scrollbar = memo(
  ({
    range,
    value,
    axis,
  }: {
    range: number[];
    value: MotionValue<number>;
    axis: { primary: Axis; secondary: Axis };
  }) => {
    const segment = useTransform(value, range, ['0%', '100%']);
    const display = useTransform(value, (value) => {
      const [start, end] = range;

      if (value > start && value <= end) {
        return 'initial';
      } else if (start === 0 && value <= 0) {
        return 'initial';
      } else {
        return 'none';
      }
    });

    // TODO: clean this up
    const position =
      axis.secondary === 'top'
        ? '-top-1'
        : axis.secondary === 'bottom'
          ? '-bottom-1'
          : axis.secondary === 'left'
            ? '-left-1'
            : '-right-1';

    const padding =
      axis.primary === 'top'
        ? 'pb-8'
        : axis.primary === 'bottom'
          ? 'pt-8'
          : axis.primary === 'left'
            ? 'pr-8'
            : 'pl-8';

    const dimensions =
      axis.primary === 'left' || axis.primary === 'right'
        ? 'w-8 h-2'
        : 'w-2 h-8';

    return (
      <div className={`absolute h-full w-full ${padding}`}>
        <div className='relative h-full w-full'>
          <motion.div
            className={`absolute ${dimensions} rounded-md bg-black ${position}`}
            style={{ [axis.primary]: segment, display }}
          />
        </div>
      </div>
    );
  }
);

Scrollbar.displayName = 'Scrollbar';
