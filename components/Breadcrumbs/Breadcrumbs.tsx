import React from "react";
import { useRouter } from "next/router";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Link from "next/link";
import { Product, Category } from "../../next-env";
import axios from "axios";

// type NavigationState = [string, string][];
export function Breadcrumbs() {
  const router = useRouter();
  const [data, setData] = React.useState<Product[] | Category[]>();
  const [navigationState, setNavigationState] = React.useState({
    ["Accueil"]: "/",
  });

  // const compareArray = (array1: any[], array2: any[]) => {
  //   if (array1.filter((value, index) => array2[index] === value).length) {
  //     return true;
  //   }

  //   return false;
  // };

  // const handleBack = (crumb: [string, string]) => {
  //   setNavigationState((state) =>
  //     state.filter(
  //       (value, index) =>
  //         index <=
  //         state.findIndex((breadcrumb) => compareArray(breadcrumb, crumb))
  //     )
  //   );
  // };

  React.useEffect(() => {
    setNavigationState((state) => {
      if (router.asPath.includes("category")) {
        return {
          [`Accueil`]: "/",
          [`Catégorie`]: router.asPath || "/",
        };
      }

      if (router.asPath.includes("product")) {
        return Object.assign({}, state, {
          ["Produit"]: router.asPath || "/",
        });
      }

      return {
        [`Accueil`]: "/",
      };
    });
  }, [router]);

  // React.useEffect(() => {
  //   console.log(router.asPath);
  //   const product = router.asPath
  //     .replace(/\/product\/|[-%]/, "")
  //     .split("-")
  //     .join(" ")
  //     .toUpperCase();

  //   const category = router.asPath
  //     .replace("/category/", "")
  //     .split("-")
  //     .join(" ")
  //     .toUpperCase();

  //   const handleAddCrumb = (crumb: [string, string]) => {
  //     setNavigationState((state) => [...state, crumb]);
  //   };

  //   const handleRemoveCrumb = (crumb: [string, string]) => {
  //     setNavigationState((state) => state.filter((value) => value !== crumb));
  //   };

  //   const handleHasCrumb = (crumb: [string, string]) => {
  //     if (navigationState.some((array) => compareArray(array, crumb))) {
  //       handleRemoveCrumb(
  //         navigationState[
  //           navigationState.findIndex((breadcrumb) =>
  //             compareArray(breadcrumb, crumb)
  //           ) + 1
  //         ]
  //       );
  //       return true;
  //     }

  //     return false;
  //   };

  //   if (router.asPath.includes("category")) {
  //     if (!handleHasCrumb([category, router.asPath])) {
  //       handleAddCrumb([category, router.asPath]);
  //     }
  //   }

  //   if (router.asPath.includes("product")) {
  //     if (navigationState[3] || navigationState[4]) {
  //       handleRemoveCrumb([product, router.asPath]);
  //     }

  //     handleAddCrumb([product, router.asPath]);
  //   }
  // setNavigationState((state) => {
  //   if (router.asPath.includes("category")) {
  //     return {
  //       [`ACCUEIL`]: "/",
  //       [`${category}`]: router.asPath || "/",
  //     };
  //   }

  //   if (router.asPath.includes("product")) {
  //     return Object.assign({}, state, {
  //       [`${product}`]: router.asPath || "/",
  //     });
  //   }

  //   return {
  //     [`ACCUEIL`]: "/",
  //   };
  // });
  // }, [router]);

  return (
    <Breadcrumb className="mt-5">
      {Object.entries(navigationState).map(([key, value]) => (
        <Breadcrumb.Item key={key} active={router.asPath === value}>
          <Link href={value}>{key}</Link>
        </Breadcrumb.Item>
      ))}
      {/* {navigationState.map(([key, value]) => {
        return (
          <Breadcrumb.Item
            onClick={() => handleBack([key, value])}
            key={key}
            active={router.asPath === value}
          >
            <Link href={value}>{key}</Link>
          </Breadcrumb.Item>
        );
      })} */}
    </Breadcrumb>
  );
}
