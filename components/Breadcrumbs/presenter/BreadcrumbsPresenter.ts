import AxiosService from "services/AxiosService";
import CategoryService from "services/Categories/CategoryService";
import ProductService from "services/Products/ProductService";

class BreadcrumbsPresenter {
	private static instance:BreadcrumbsPresenter;
	private constructor() {}

	static getInstance():BreadcrumbsPresenter {
		if (!BreadcrumbsPresenter.instance) BreadcrumbsPresenter.instance = new BreadcrumbsPresenter();

		return BreadcrumbsPresenter.instance;
	}

	public async text(path:string):Promise<string> {
		const [domain, query] = path.split('/');
		const staticPath = this.isStaticPath(`/${domain}`);

		if (staticPath) return this.constantsNames[staticPath[0]];

		switch(domain) {
			case 'product':
				return this.product(query);
			default:
				return this.category(query);
		}
	}

	private get constants() {
		const CONSTANTS = {
			index: '/',
			profile: '/me',
			quote: '/quote',
			quotesent: '/quotesent',
			forgotpassword: '/forgotpassword',
		}

		return Object.entries(CONSTANTS);
	}

	private get constantsNames() {
		return {
			index: 'Accueil',
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
		const product = await ProductService.fetchProduct(id);

		return product.name;
	}

	private async category(id:string) {
		const category = await CategoryService.fetchCategory(id);

		return category.name;
	}
}

export default BreadcrumbsPresenter.getInstance();
