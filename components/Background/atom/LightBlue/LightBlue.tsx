import useViewportY from "components/Hooks/useViewportY";
import { FC, useRef } from "react";
import styles from './lightBlue.module.scss';

const LightBlue:FC = () => {
  const y = useViewportY();
  const ref = useRef<HTMLDivElement>(null);

  const yPercent = () => (y  * 100) / ref.current?.clientHeight;

  const rotate = () => {
    let value = 180;

    value = value + yPercent();
    return value;
  }

  const translate = () => {
    let value = 0;

    value = value + ((ref.current?.clientHeight / 10) / yPercent());
    return value;
  }

  return <div ref={ref} style={{ transform: `rotate(${rotate()}deg) translateY(${translate()}px)`, }} className={styles.lightBlue} />
}

export default LightBlue;
