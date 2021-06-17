import useBouncingAnimation from "components/Hooks/useBouncingAnimation";
import useViewportY from "components/Hooks/useViewportY";
import { FC, useRef, useEffect, useState } from "react";
import styles from './deepBlue.module.scss';

const DeepBlue:FC = () => {
  const [height, setHeight] = useState(0);
  const y = useViewportY();
  const bounceAmount = useBouncingAnimation(10);
  const ref = useRef<HTMLDivElement>(null);

  const yPercent = () => (y  * 100) / ref.current?.clientHeight;

  useEffect(() => {
    if (!ref.current) return;

    setHeight(ref.current.clientHeight);
  }, [ref]);

  const translate = () => {
    let value = height / 15;

    value = value - ((height / 60) * yPercent());

    return value;
  };



  return <div ref={ref} style={{ transform: `translateY(${translate()}px)`, clipPath: `polygon(0 ${(20 - (yPercent() * 3)) + bounceAmount}%, 100% 0%, 100% 100%, 0% 100%)` }} className={styles.deepBlue} />
}

export default DeepBlue;
