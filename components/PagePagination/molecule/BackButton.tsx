import { FC } from 'react';
import { Button } from 'components/Button/atom/Button';
import cn from 'classnames';
import styles from '../pagepagination.module.scss';
import DoubleArrowBack from '../atom/DoubleArrowBack';

type Fn = (curr:number) => number;

interface Props {
  toggle:(fn:Fn) => void;
  active:number;
}

const BackButton:FC<Props> = ({ toggle, active }) => {
  const backOnePage = () => toggle((curr) => curr = curr - 1);

  return (
    <Button 
      className={cn([styles.paginationControls, styles.rightRadius])}
      disabled={active === 0}
      onClick={backOnePage}
    >
      <DoubleArrowBack />
    </Button>
  )
};

export default BackButton;
