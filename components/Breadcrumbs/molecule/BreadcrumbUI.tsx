import Breadcrumb from "react-bootstrap/Breadcrumb";
import Link from "next/link";
import styled from 'styled-components';
import theme from "theme/theme";
import { Button } from "components/Button/Button";

type BreadcrumbProps = {
  navigationState: [string, string][];
  asPath: string;
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
  padding: 0;
`;

export function BreadcrumbUI({ navigationState, asPath }: BreadcrumbProps) {
  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        {navigationState.map(([key, value]) => {
          return (
            <BreadcrumbItem as={Button} key={key} href={value} size='sm' active={asPath === value}>
              {key}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
}
