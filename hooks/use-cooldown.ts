import { useRef, useState } from 'react';

export function useCooldown(time: number) {
  const [isValid, setIsValid] = useState(true);

  const timeout = useRef<number>(undefined);

  return {
    isValid,
    trigger: () => {
      setIsValid(false);

      if (timeout.current != undefined) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(
        () => setIsValid(true),
        time
      ) as unknown as number;
    },
  };
}
