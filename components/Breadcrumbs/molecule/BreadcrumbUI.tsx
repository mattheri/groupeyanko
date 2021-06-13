import Breadcrumb from "react-bootstrap/Breadcrumb";
import Link from "next/link";

type BreadcrumbProps = {
  navigationState: [string, string][];
  asPath: string;
};

export function BreadcrumbUI({ navigationState, asPath }: BreadcrumbProps) {
  return (
    <Breadcrumb className="mt-5">
      {navigationState.map(([key, value]) => {
        return (
          <Breadcrumb.Item key={key} active={asPath === value}>
            <Link href={value}>{key}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
