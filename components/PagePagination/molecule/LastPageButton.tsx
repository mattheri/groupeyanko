import { FC } from 'react';
import { Button } from 'components/Button/atom/Button';
import cn from 'classnames';
import styles from '../pagepagination.module.scss';
import DoubleArrowForward from '../atom/DoubleArrowForward';

interface Props {
  toggle:(n:number) => void;
  active:number;
  length:number
}

const LastPageButton:FC<Props> = ({ toggle, active, length }) => {
  const goToLastPage = () => toggle(length - 1);

  return (
    <Button 
      className={cn([styles.paginationControls, styles.rightRadius])}
      disabled={active === length - 1}
      onClick={goToLastPage}
    >
      <DoubleArrowForward />
    </Button>
  )
};

export default LastPageButton;
