import useRouterEvents from "components/Hooks/useRouterEvents";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BreadcrumbsPresenter, { BreadcrumbLink } from "../presenter/BreadcrumbsPresenter";

const useBreadcrumbs = () => {
	const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbLink[]>([]);

	const updateBreadcrumbWithName = async (url:string) => {
		const upToDateBreadcrumbLinks = await BreadcrumbsPresenter.getBreadcrumbLinks(breadcrumbs, url);

		setBreadcrumbs(upToDateBreadcrumbLinks);
	}

	useRouterEvents('routeChangeStart', updateBreadcrumbWithName);

	return breadcrumbs;
}

export default useBreadcrumbs;
