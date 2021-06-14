import { useRouter } from "next/router";
import React, { useEffect, useCallback } from "react";
import CategoriesGrid from "components/CategoriesGrid/organism/CategoriesGrid";
import { useBreadcrumbs } from "components/Hooks/useBreadcrumbs";
import ProductsGrid from "components/ProductsGrid/ProductsGrid";
import { Category, Product } from "next-env";
import StaticCategoryProps from "services/Categories/StaticCategoryProps";
import { GetStaticPaths, GetStaticProps } from "next";

type ProductCategoryProps = {
  response: Product[] | Category[];
  name: [Category | null, string];
};

export const getStaticPaths:GetStaticPaths = async () => {
  const paths = await StaticCategoryProps.paths();

  return {
    paths,
    fallback: 'blocking'
  }
};

export const getStaticProps:GetStaticProps = async (context) => {
  const { response, parentCategory, categoryName } = await StaticCategoryProps.props(context);

  return {
    props: {
      response,
      name: [parentCategory, categoryName],
    },
    revalidate: 1,
  }
};

export default function ProductCategory({
  response,
  name,
}: ProductCategoryProps) {
  const router = useRouter();
  const { setNavigationState } = useBreadcrumbs();

  const makeBreadcrumbs = useCallback(() => {
    const [parentCategory, categoryName] = name;
    if (parentCategory !== null) {
      return setNavigationState([
        [
          parentCategory.name,
          `/category/${parentCategory.id}`,
        ],
        [categoryName, router.asPath],
      ]);
    }
    return setNavigationState([categoryName, router.asPath]);
  }, [name]);

  useEffect(() => {
    makeBreadcrumbs();
  }, [name]);

  const isCategory = (obj: Category[] | Product[]): obj is Category[] => {
    return (obj as Category[]).some(
      (category) => category.parent !== undefined
    );
  };
  
  if (isCategory(response)) {
    return <CategoriesGrid response={response} />;
  }

  return <ProductsGrid response={response} />;
}
