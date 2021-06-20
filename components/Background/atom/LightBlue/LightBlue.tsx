import useViewportY from "components/Hooks/useViewportY";
import { FC, useRef } from "react";
import styled from 'styled-components';

const Bg = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #5b91cc;
  transform-origin: right center;
`;

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

  return <Bg
    ref={ref}
    style={{ 
      transform: `rotate(${rotate()}deg) translateY(${translate()}px)`, 
    }}
  />
}

export default LightBlue;
