import { Page, Locator } from '@playwright/test';

export class HomePage {
    private readonly page: Page;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    public readonly productGrid: Locator;
    public readonly productTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByTestId('search-query');
        this.searchButton = page.getByTestId('search-submit');
        this.productGrid = page.locator('.col-md-9');
        this.productTitle = page.getByTestId('product-name');
    }

    async buscarProducto(nombre: string): Promise<void> {
        // Aumentamos el timeout solo para esta acción crítica
        // Playwright intentará encontrarlo hasta por 15 segundos antes de fallar el paso
        const input = this.searchInput;
        
        // Mas tiempo de espera para el fill, ya que a veces el input tarda en estar interactivo
        await input.fill(nombre, { timeout: 15000 });
        
        // Click con reintento automático
        await this.searchButton.click({ timeout: 15000 });
        
        // Espera a que el grid cargue con mayor margen
        await this.productTitle.first().waitFor({ state: 'visible', timeout: 20000 });
    }
    async filtrarPorMarca(marca: string): Promise<void> {
        const brandCheckbox = this.page.locator(`input[value="${marca}"]`);
        await brandCheckbox.check();
        // Misma corrección: esperar al primer resultado, no a networkidle.
        await this.productTitle.first().waitFor({ state: 'visible' });
    }
}