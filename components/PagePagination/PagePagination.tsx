import React from "react";
import cn from "classnames";
import styles from "./pagepagination.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FirstPageButton from "./molecule/FirstPageButton";
import LastPageButton from "./molecule/LastPageButton";
import ForwardButton from "./molecule/ForwardButton";
import BackButton from "./molecule/BackButton";

type PaginationProps = {
  length: number;
  active: number;
  toggle: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
  max?: number;
};

export function PagePagination({
  length,
  active,
  toggle,
  className,
  max,
}: PaginationProps) {
  const indexes = [];

  for (let i = 1; i <= length; i++) {
    indexes.push(i);
  }

  return (
    <Container>
      <Row
        className={cn({
          ["flex-nowrap justify-content-center"]: true,
          [className]: className,
        })}
      >
        {length > 1 && (
          <Col className="d-flex justify-content-center px-0">
            <FirstPageButton active={active} toggle={toggle} />
            <BackButton active={active} toggle={toggle} />

            {indexes.map((index) => {
              return (
                <div
                  key={index}
                  className={cn({
                    [styles.paginationBtn]: true,
                    [styles.active]: active === index - 1,
                  })}
                  onClick={() => toggle(index - 1)}
                >
                  {index}
                </div>
              );
            })}

            <ForwardButton active={active} length={length} toggle={toggle} />
            <LastPageButton active={active} length={length} toggle={toggle} />
          </Col>
        )}
      </Row>
    </Container>
  );
}
