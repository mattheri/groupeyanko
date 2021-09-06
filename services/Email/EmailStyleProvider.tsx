import { renderToString } from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

class EmailStyleProvider {
	static instance:EmailStyleProvider;
	private constructor() {}

	static getInstance():EmailStyleProvider {
		if (!EmailStyleProvider.instance) {
			EmailStyleProvider.instance = new EmailStyleProvider();
		}
		return EmailStyleProvider.instance;
	}

	private getStyleSheet():ServerStyleSheet {
		const sheet = new ServerStyleSheet();
		return sheet;
	}

	public render(Component:any) {
		const sheet = this.getStyleSheet();
		try {

			const html = renderToString(
				<StyleSheetManager sheet={sheet.instance}>
					<Component />
				</StyleSheetManager>
			);
			const css = sheet.getStyleTags();
			console.log(css);
			return { html, css };

		} catch (e:unknown) {

			const error = e as Error;
			throw new Error(error.message);

		} finally {
			sheet.seal();
		}
	}
}

export default EmailStyleProvider.getInstance();