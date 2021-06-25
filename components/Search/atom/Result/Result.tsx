import { FC } from "react";
import { useRouter } from 'next/router';
import styled from "styled-components";
import theme from "theme/theme";

export interface ResultProps {
  src:string;
  alt:string;
  name:string;
  id:string;
  onClick:() => void;
}

const Article = styled.article`
  height: 8rem;
  border-radius: 10px;
  text-decoration: none;
  padding: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    color: white;
    background-color: ${theme.colors.primary};
    text-decoration: none;
  }
`;

const Image = styled.img`
  margin-right: 1rem;
  border-radius: 10px;
`;

const Name = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DEFAULT_HREF = '/product/';
const DEFAULT_IMAGE_DIMENSIONS = {
  width: 50,
  height: 50,
};

const Result:FC<ResultProps> = ({ src, alt, name, id, onClick }) => {
  const router = useRouter();
  const closeThenNavigateTo = () => {
    onClick();
    router.push(`${DEFAULT_HREF}${id}`);
  }
  
  return (
    <Article onClick={closeThenNavigateTo}>
      <Image src={src} alt={alt} width={DEFAULT_IMAGE_DIMENSIONS.width} height={DEFAULT_IMAGE_DIMENSIONS.height} />
      <Name>{name}</Name>
    </Article>
  );
}

export default Result;
