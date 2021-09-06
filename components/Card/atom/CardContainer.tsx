import styled from 'styled-components';

const CardContainer = styled.article`
	background-color: white;
  width: 100%;
  height: 36rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0;
  margin: 1rem 0;
  border-radius: 5px;
	cursor: pointer;
  border-radius: 5px;

  > *:hover {
    text-decoration: none;
  }
`;

export default CardContainer;
