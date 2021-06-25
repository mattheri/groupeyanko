import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BreadcrumbsPresenter from "../presenter/BreadcrumbsPresenter";

const useBreadcrumbs = () => {
	const [breadcrumbs, setBreadcrumbs] = useState([]);
	const router = useRouter();

	const text = async () => {
		console.log(await BreadcrumbsPresenter.text(router.asPath));
	}

	useEffect(() => {
		text();
	}, [router.asPath]);
}

export default useBreadcrumbs;
