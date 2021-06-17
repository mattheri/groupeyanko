import { FC } from "react";
import styles from './interactive.module.scss';

const InteractiveSectionContainer:FC = ({ children }) => {

  return (
    <section className={styles.interactive}>
      {children}
    </section>
  );
};

export default InteractiveSectionContainer;
