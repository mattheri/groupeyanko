/// <reference types="next" />
/// <reference types="next/types/global" />

export type Image = {
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

export interface Category {
    id: number,
    name: string,
    slug: string,
    parent: number,
    description: string,
    display: string,
    image: Image,
    menu_order: number,
    count: 7,
    _links: {
        self: CategoryLink[],
        collection: CategoryLink[],
        up: CategoryLink[]
    },
    [key: string]: any
}

export interface Product {
    readonly id: number,
    name: string,
    slug: string,
    readonly permalink?: string,
    readonly date_created?: string,
    readonly date_created_gmt?: string,
    readonly date_modified?: string,
    readonly date_modified_gmt?: string,
    type: 'simple' | 'grouped' | 'variable' | string,
    status: 'draft' | 'pending' | 'private' | 'publish' | string,
    featured?: boolean,
    catalog_visibility: 'visible' | 'catalog' | 'search' | 'hidden' | string,
    description: string,
    short_description?: string,
    sku: string,
    readonly price: string,
    regular_price?: string,
    sale_price?: string,
    date_on_sale_from?: string | null,
    date_on_sale_from_gmt?: string | null,
    date_on_sale_to?: string | null,
    date_on_sale_to_gmt?: string | null,
    readonly price_html?: string,
    readonly on_sale?: boolean,
    readonly purchasable?: boolean,
    readonly total_sales?: number,
    on_sale?: boolean,
    purchasable: boolean,
    total_sales: number,
    virtual?: boolean,
    downloadable?: boolean,
    downloads?: string[],
    download_limit?: number | -1,
    download_expiry?: number | -1,
    external_url?: string,
    button_text?: string,
    tax_status?: 'taxable' | 'shipping' | 'none' | string,
    tax_class?: string,
    manage_stock?: boolean,
    stock_quantity?: number | null,
    backorders?: 'no' | 'notify' | 'yes' | string,
    readonly backorders_allowed?: boolean,
    readonly backordered?: boolean,
    sold_individually?: boolean,
    weight?: string,
    dimensions?: {
      length?: string,
      width?: string,
      height?: string
    },
    readonly shipping_required?: boolean,
    readonly shipping_taxable?: boolean,
    shipping_class?: string,
    readonly shipping_class_id?: number,
    reviews_allowed?: boolean,
    readonly average_rating?: string,
    readonly rating_count?: number,
    categories: Pick<Category, 'id' | 'name' | 'slug'>[],
    images: Image[],
    [key: string]: any
}