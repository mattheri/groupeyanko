const useSanitizedHTML = (html:string) => {
	return html.replaceAll(/(<([^>]+)>)/gi, "");
};

export default useSanitizedHTML;
