import { createGlobalStyle } from "styled-components";
import theme from "theme/theme";

const GlobalStyles = createGlobalStyle`
	html,
	body {
		padding: 0;
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
			Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
		overflow-x: hidden;
		height: 100%;
		width: 100%;
	}

	html {
		font-size: 62.5%;
	}

	body, #__next {
		font-size: 1.5rem;
		font-family: ${theme.typography.body};
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	* {
		box-sizing: border-box;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		${theme.typography.heading};
	}

`;

export default GlobalStyles;
