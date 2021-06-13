import { FC } from 'react';
import { Button } from 'components/Button/atom/Button';
import cn from 'classnames';
import styles from '../pagepagination.module.scss';
import DoubleArrowBack from '../atom/DoubleArrowBack';

interface Props {
  toggle:(n:number) => void;
  active:number;
}

const FirstPageButton:FC<Props> = ({ toggle, active }) => {
  const goToFirstPage = () => toggle(0);

  return (
    <Button 
      className={cn([styles.paginationControls, styles.leftRadius])}
      disabled={active === 0}
      onClick={goToFirstPage}
    >
      <DoubleArrowBack />
    </Button>
  )
};

export default FirstPageButton;
