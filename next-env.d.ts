/// <reference types="next" />
/// <reference types="next/types/global" />

export type CategoryImage = {
    id: number,
    date_created: string,
    date_created_gmt: string,
    date_modified: string,
    date_modified_gmt: string,
    src: string,
    name: string,
    alt: string,
    [key: string]: any
}

export type CategoryLink = {
    href: string
}

export type Category = {
    id: number,
    name: string,
    slug: string,
    parent: number,
    description: string,
    display: string,
    image: CategoryImage,
    menu_order: number,
    count: 7,
    _links: {
        self: CategoryLink[],
        collection: CategoryLink[],
        up: CategoryLink[]
    },
    [key: string]: any
}