'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if a media query matches.
 * Useful for conditional rendering based on screen size.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Define listener
    const listener = () => setMatches(media.matches);

    // Modern browsers
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

/**
 * Shorthand for common breakpoints
 */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 768px)');
