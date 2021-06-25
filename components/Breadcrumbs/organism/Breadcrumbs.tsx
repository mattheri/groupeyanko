import { useRouter } from "next/router";
import { useBreadcrumbs as useBR } from "../../Hooks/useBreadcrumbs";
import useBreadcrumbs from "../hook/useBreadcrumbs";
import { BreadcrumbUI } from "../molecule/BreadcrumbUI";

export function Breadcrumbs() {
  const router = useRouter();


  const { navigationState } = useBR();
  useBreadcrumbs();

  return (
    <BreadcrumbUI asPath={router.asPath} navigationState={navigationState} />
  );
}
