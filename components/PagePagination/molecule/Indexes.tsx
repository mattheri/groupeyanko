import styled, { css } from "styled-components";
import { FC } from "react";
import Button from 'components/Button/Button'
import { LeftRadius, RightRadius } from "../atom/Radiuses";
import { Active } from "../atom/Active";
import theme from "theme/theme";

interface Props {
	pages:number[];
	onPageChange:(item:number) => void;
	active:number;
}

const IndexButtonOnlyCSS = css`
	border: 0;
	border-top: 1px ${theme.colors.dark} solid;
	border-bottom: 1px ${theme.colors.dark} solid;
	border-radius: 0;

	&:hover {
		border: 0;
		border-top: 1px ${theme.colors.dark} solid;
		border-bottom: 1px ${theme.colors.dark} solid;
		${Active}
	}
`;

const BorderLeft = css`
	border-left: 1px ${theme.colors.dark} solid;
	margin-left: 1rem;
	border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

	&:hover {
		border-left: 1px ${theme.colors.dark} solid;
	}
`;

const BorderRight = css`
	border-right: 1px ${theme.colors.dark} solid;
	margin-right: 1rem;
	border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

	&:hover {
		border-right: 1px ${theme.colors.dark} solid;
	}
`;

const StyledButton = styled(Button)<{first:boolean, last:boolean, active:boolean}>`
	${IndexButtonOnlyCSS}
	&:first-of-type {
		${LeftRadius && BorderLeft};
	}
	&:last-of-type {
		${RightRadius && BorderRight}
	}
	${({ active }) => active && Active};
`;

const IndexesContainer = styled.div`
	display: flex;
`;

const Indexes:FC<Props> = ({ pages, onPageChange, active }) => {	
	return(
		<IndexesContainer>
			{pages.map((page) => (
				<StyledButton
					type='button'
					active={active + 1 === page} 
					first={page === 1} 
					last={page === pages.length} 
					key={page} 
					tertiary
					onClick={() => onPageChange(page - 1)}
					>
						{page}
					</StyledButton>
			))}
		</IndexesContainer>
	);
}

export default Indexes;
