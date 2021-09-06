import { useState, useEffect } from 'react';

const useBouncingAnimation = (maxValue?:number) => {
  const [bouncingAmount, setBouncingAmount] = useState<number>(0);

  const initiateBounce = function () {
    let previousY = 0;

    return function (this:Window) {
      if (!previousY) {
        previousY = this.scrollY;
        return setBouncingAmount(10);
      }

      const timeout = this.setTimeout(() => {
        if (previousY === this.scrollY) setBouncingAmount(0);
        this.clearTimeout(timeout);
      }, 300);

      if (!timeout) return 0;

      const delta = previousY - this.scrollY;
      previousY = this.scrollY;
      return setBouncingAmount(() => {
        if (maxValue) {
          const isPositiveDelta = Math.sign(delta) > 0;
          const positiveDelta = Math.abs(delta);
          if (positiveDelta >= maxValue) {
            if (isPositiveDelta) return maxValue;

            return -maxValue;
          }
        }

        return delta;
      });
    };
  };

  useEffect(() => {
    const bounce = initiateBounce();
    window.addEventListener('scroll', bounce);

    return () => window.removeEventListener('scroll', bounce);
  }, []);

  return bouncingAmount;
};

export default useBouncingAnimation;