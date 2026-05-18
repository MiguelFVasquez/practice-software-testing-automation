import { Page, Locator } from '@playwright/test';

export class HomePage {
    private readonly page: Page;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    public readonly productGrid: Locator;
    public readonly productTitle: Locator;

    constructor(page: Page) {
        this.page = page;

        // Mapeo de elementos usando los data-test correspondientes
        this.searchInput = page.getByTestId('search-query');
        this.searchButton = page.getByTestId('search-submit');
        
        // Elementos dinámicos del catálogo para las validaciones
        this.productGrid = page.locator('.col-md-9'); // Contenedor de las tarjetas
        this.productTitle = page.getByTestId('product-name'); // Título dentro de cada tarjeta
    }

    // Método para realizar una búsqueda de producto
    async buscarProducto(nombre: string): Promise<void> {
        await this.searchInput.fill(nombre);
        await this.searchButton.click();
        
        // Buenas prácticas: Esperamos a que la red se estabilice un momento tras la búsqueda
        await this.page.waitForLoadState('networkidle');
    }

    // Método para aplicar un filtro por marca (opcional/escalable para tus pruebas)
    async filtrarPorMarca(marca: string): Promise<void> {
        // En la web, las marcas suelen tener un checkbox con data-test="brand-X" o similar
        const brandCheckbox = this.page.locator(`input[value="${marca}"]`);
        await brandCheckbox.check();
        await this.page.waitForLoadState('networkidle');
    }
}