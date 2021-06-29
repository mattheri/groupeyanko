import { FC } from 'react';
import { Button } from 'components/Button/Button';
import cn from 'classnames';
import styles from '../pagepagination.module.scss';
import ForwardArrow from '../atom/ForwardArrow';

type Fn = (curr:number) => number;

interface Props {
  toggle:(fn:Fn) => void;
  active:number;
  length:number;
}

const ForwardButton:FC<Props> = ({ toggle, active, length }) => {
  const forwardOnePage = () => toggle((curr) => curr = curr + 1);

  return (
    <Button 
      className={cn([styles.paginationControls, styles.leftRadius])}
      disabled={active === length - 1}
      onClick={forwardOnePage}
    >
      <ForwardArrow />
    </Button>
  )
};

export default ForwardButton;
