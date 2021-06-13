import { useRouter } from "next/router";
import { useBreadcrumbs } from "../../Hooks/useBreadcrumbs";
import { BreadcrumbUI } from "../molecule/BreadcrumbUI";

export function Breadcrumbs() {
  const router = useRouter();

  const { navigationState } = useBreadcrumbs();

  return (
    <BreadcrumbUI asPath={router.asPath} navigationState={navigationState} />
  );
}
