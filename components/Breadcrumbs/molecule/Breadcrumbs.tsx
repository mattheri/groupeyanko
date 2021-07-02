import Breadcrumb from "react-bootstrap/Breadcrumb";
import styled from 'styled-components';
import theme from "theme/theme";
import { Button } from "components/Button/Button";
import { BreadcrumbLink } from "../presenter/BreadcrumbsPresenter";
import { FC } from "react";

interface Props {
  breadcrumbs:BreadcrumbLink[];
};

const BreadcrumbContainer = styled.div`
  display: block;
  padding: 0;
  grid-row: 4;
  width: 100%;

  @media only screen and (${theme.mediaQueries.lg}) {
    grid-row: 2;
    grid-column: 1 / 4;
  }
`;

const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  background-color: white;
  border-radius: .25rem;
  gap: 1rem;
`;

const BreadcrumbItem = styled(Breadcrumb.Item)`
  padding: 0.3rem 0.8rem;
`;

const Breadcrumbs:FC<Props> = ({ breadcrumbs }) => {
  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        {breadcrumbs.map(({ name, url }) => {
          return (
            <BreadcrumbItem as={Button} key={url} href={url} size='sm'>
              {name}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
}

export default Breadcrumbs;
