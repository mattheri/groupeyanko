import React from "react";
import { useRouter } from "next/router";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Link from "next/link";
import { useBreadcrumbs } from "../Hooks/useBreadcrumbs";

export function Breadcrumbs() {
  const router = useRouter();

  const { navigationState } = useBreadcrumbs();

  return (
    <Breadcrumb className="mt-5">
      {navigationState.map(([key, value]) => {
        return (
          <Breadcrumb.Item key={key} active={router.asPath === value}>
            <Link href={value}>{key}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
