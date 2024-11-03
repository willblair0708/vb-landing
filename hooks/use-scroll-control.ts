import { useRef, useState } from 'react';

import { useMotionValue } from 'framer-motion';

interface ScrollControl {
  isLocked: boolean;
  lockScroll: () => void;
  unlockScroll: () => void;
}

interface ScrollControlOptions {
  onWheel?: (e: WheelEvent, scroll: (position: number) => void) => void;
  onScroll?: (scroll: (position: number) => void) => void;
  onKeyDown?: (e: KeyboardEvent, scroll: (position: number) => void) => void;
}

export function useScrollControl(
  options?: ScrollControlOptions
): ScrollControl {
  const controller = useRef<AbortController>(undefined);

  const [isLocked, setIsLocked] = useState(false);
  const lockPosition = useRef(0);

  function scroll(position: number, relock: boolean = false) {
    unlockScroll();
    lockPosition.current = position;
    window.scrollTo({ top: position, behavior: 'smooth' });
    if (relock) lockScroll();
  }

  function lockScroll() {
    controller.current = new AbortController();
    lockPosition.current = window.scrollY;

    // Add listeners for wheel, scroll, and keydown events
    document.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        if (options?.onWheel) {
          options.onWheel(e, scroll);
        }

        e.preventDefault();
        e.stopPropagation();
        return false;
      },
      { passive: false, signal: controller.current.signal }
    );

    document.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          if (options?.onKeyDown) {
            options.onKeyDown(e, scroll);
          }
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      },
      { signal: controller.current.signal }
    );

    document.addEventListener(
      'scroll',
      () => {
        console.log('reseting scroll');
        window.scrollTo({ top: lockPosition.current, behavior: 'instant' });
      },
      { signal: controller.current.signal }
    );

    setIsLocked(true);

    return () => controller.current?.abort();
  }

  function unlockScroll() {
    controller.current?.abort();
    setIsLocked(false);
  }

  return {
    isLocked: isLocked,
    lockScroll: lockScroll,
    unlockScroll: unlockScroll,
  };
}

interface UseScrollForceOptions {
  interval?: number;
}

export function useScrollForce({ interval = 100 }: UseScrollForceOptions = {}) {
  // const scrollEvents = useRef<{ t: number; v: number }[]>([]);
  const scrollForce = useMotionValue(0);
  const scrollTotal = useMotionValue(0);

  return {
    scrollForce,
    scrollTotal,
    addScrollEvent: (e: WheelEvent) => {
      scrollForce.set(scrollForce.get() + e.deltaY);
      scrollTotal.set(scrollTotal.get() + e.deltaY);
    },
    resetScrollForce: (currentValue: number, totalValue: number) => {
      scrollForce.jump(currentValue);
      scrollTotal.jump(totalValue);
    },
  };
}
