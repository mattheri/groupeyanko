import { Category, Product } from "next-env";
import ApiService from "services/ApiService";
import { ApiResponse } from "services/domain/Api";

export interface BreadcrumbLink {
	name:string;
	url:string;
}
class BreadcrumbsPresenter {
	private static instance:BreadcrumbsPresenter;
	private constructor() {}

	static getInstance():BreadcrumbsPresenter {
		if (!BreadcrumbsPresenter.instance) BreadcrumbsPresenter.instance = new BreadcrumbsPresenter();

		return BreadcrumbsPresenter.instance;
	}

	public async getBreadcrumbLinks(breadcrumbLinks:BreadcrumbLink[], url:string) {
		if (url === '/') return this.isHome(breadcrumbLinks);
		const name = await this.getURLName(url);
		const isPresent = this.breadcrumbLinkIsPresent(breadcrumbLinks, name);
		const condition = isPresent ?? false;

		if (typeof condition === 'number' && condition >= 0) {
			const index = condition;
			return this.removeUnusedBreadcrumbLinks(breadcrumbLinks, index);
		}
		
		const newBreadcrumbLink:BreadcrumbLink = {
			name,
			url,
		};
		return this.addToBreadcrumbLinksList(breadcrumbLinks, newBreadcrumbLink);
	}

	private async getURLName(path:string):Promise<string> {
		const [, domain, query] = path.split('/');
		const staticPath = this.isStaticPath(`/${domain}`);

		if (staticPath) return this.constantsNames[staticPath[0]];

		switch(domain) {
			case 'product':
				const product = await this.product(query);

				return product.name;
			default:
				const category = await this.category(query);
	
				return category.name;
		}
	}

	private get constants() {
		const CONSTANTS = {
			profile: '/me',
			quote: '/quote',
			quotesent: '/quotesent',
			forgotpassword: '/forgotpassword',
		}

		return Object.entries(CONSTANTS);
	}

	private get constantsNames() {
		return {
			profile: 'Profil',
			quote: 'Envoyer ma soumission',
			quotesent: 'Soumission envoyée',
			forgotpassword: 'Mot de passe oublié',
		}
	}

	private isStaticPath(domain:string) {
		return this.constants.find(([key, path]) => path === domain);
	}

	private async product(id:string) {
		const response:ApiResponse<Product> = await ApiService.get({
			url: `/api/product/${id}`,
		});

		return response.data;
	}

	private async category(id:string) {
		const response:ApiResponse<Category> = await ApiService.get({
			url: `/api/category/${id}`,
		});

		return response.data;
	}

	private breadcrumbLinkIsPresent(breadcrumbLinks:BreadcrumbLink[], name:string) {
		const index = breadcrumbLinks.findIndex((breadcrumbLink) => breadcrumbLink.name === name);

		if (index < 0) return null;
	
		return index;
	}

	private removeUnusedBreadcrumbLinks(breadcrumbLinks:BreadcrumbLink[], index:number) {
		return breadcrumbLinks.filter((breadcrumbLink, i) => i <= index && breadcrumbLink);
	}

	private addToBreadcrumbLinksList(breadcrumbLinks:BreadcrumbLink[], newBreadcrumbLink:BreadcrumbLink) {
		return [...new Set([...breadcrumbLinks, newBreadcrumbLink])];
	}

	private isHome(breadcrumbLinks:BreadcrumbLink[]) {
		return this.removeUnusedBreadcrumbLinks(breadcrumbLinks, 0);
	}
}

export default BreadcrumbsPresenter.getInstance();
