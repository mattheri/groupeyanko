import useBouncingAnimation from "components/Hooks/useBouncingAnimation";
import useViewportY from "components/Hooks/useViewportY";
import { FC, useRef, useEffect, useState } from "react";
import styled from 'styled-components';

const Bg = styled.div`
  position: fixed;
  width: 100vw;
  height: 300%;
  background-color: #14448b;
  transition: transform 0.6s, clip-path 1s;
`;

const DeepBlue:FC = () => {
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const y = useViewportY();
  const bounceAmount = useBouncingAnimation(10);
  const ref = useRef<HTMLDivElement>(null);

  const yPercent = () => (y  * 100) / ref.current?.clientHeight;

  useEffect(() => {
    if (!ref.current) return;

    setHeight(ref.current.clientHeight);
    setTop(ref.current.getBoundingClientRect().top);
  }, [ref]);

  const translate = () => {
    let value = height / 15;

    value = value - ((height / 60) * yPercent());

    if (value < top) return top;

    return value;
  };



  return <Bg
    ref={ref}
    style={{ 
      transform: `translateY(${translate()}px)`, 
      clipPath: `polygon(0 ${(20 - (yPercent() * 3)) + bounceAmount}%, 100% 0%, 100% 100%, 0% 100%)` 
    }}
  />
}

export default DeepBlue;
