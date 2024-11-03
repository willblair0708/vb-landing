import { useEffect, useState } from 'react';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const onResize = () => setIsMobile(window.innerWidth < 640);

    onResize();

    window.addEventListener('resize', onResize, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, []);

  return isMobile;
}
