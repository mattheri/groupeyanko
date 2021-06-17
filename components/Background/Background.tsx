import { FC } from "react";
import DeepBlue from "./atom/DeepBlue/DeepBlue";
import LightBlue from "./atom/LightBlue/LightBlue";
import styles from './background.module.scss';

const Background:FC = () => {
  
  return (
    <div className={styles.background}>
      <DeepBlue />
    </div>
  );
}

export default Background;
