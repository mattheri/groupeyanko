import { FC } from "react";
import useBreadcrumbs from "../hook/useBreadcrumbs";
import Breadcrumbs from "../molecule/Breadcrumbs";

const BreadcrumbsController:FC = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Breadcrumbs breadcrumbs={breadcrumbs} />
  );
}

export default BreadcrumbsController;
