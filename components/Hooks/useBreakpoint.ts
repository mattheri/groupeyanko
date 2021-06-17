import { useState, useEffect } from 'react';
import theme from 'theme/theme';
import useWindowCondition from './useWindowCondition';

const BREAKPOINTS_VALUE = Object.values(theme.breakpoints);
const BREAKPOINTS_KEYS = Object.keys(theme.breakpoints);

type MatchingBreakpoints = {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
};

const matchingBreakpoints: MatchingBreakpoints = {
  xs: true,
  sm: true,
  md: false,
  lg: false,
  xl: false,
};

const useBreakpoints = (): MatchingBreakpoints => {
  const browser = useWindowCondition();
  const mediaQuery = (key:string) => browser && window.matchMedia(theme.breakpoints[key]).matches;

  const [breakpointsMatch, setBreakpointsMatch] = useState(matchingBreakpoints);

  useEffect(() => {
    if (browser) {
      const createMediaKeys = (
        bp: MatchingBreakpoints,
        index: number,
      ):MatchingBreakpoints => (
        (Object.fromEntries(Object.keys(bp).map((key) => {
          if (key === BREAKPOINTS_KEYS[index]) return [key, true];
  
          return [key, false];
        })) as MatchingBreakpoints)
      );
  
      const matchBreakpoints = () => {
        for (let i = BREAKPOINTS_KEYS.length; i >= 0; i -= 1) {
          if (mediaQuery(BREAKPOINTS_KEYS[i])) {
            setBreakpointsMatch((bp) => createMediaKeys(bp, i));
            break;
          }
        }
      };
      matchBreakpoints();
    }
  }, [browser]);

  console.log(breakpointsMatch, theme);

  return breakpointsMatch;
};

export default useBreakpoints;
