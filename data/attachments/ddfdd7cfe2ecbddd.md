# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search.spec.ts >> Catalog and Search engines - Home >> Should search for a product and display results
- Location: tests/search.spec.ts:12:9

# Error details

```
TimeoutError: locator.fill: Timeout 15000ms exceeded.
Call log:
  - waiting for getByTestId('search-query')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - img "Icon for practicesoftwaretesting.com" [ref=e5]
        - heading "practicesoftwaretesting.com" [level=1] [ref=e6]
      - heading "Performing security verification" [level=2] [ref=e7]
      - paragraph [ref=e8]: This website uses a security service to protect against malicious bots. This page is displayed while the website verifies you are not a bot.
  - contentinfo [ref=e12]:
    - generic [ref=e14]:
      - generic [ref=e16]:
        - text: "Ray ID:"
        - code [ref=e17]: a00efe836d03f270
      - generic [ref=e18]:
        - generic [ref=e19]:
          - text: Performance and Security by
          - link "Cloudflare" [ref=e20] [cursor=pointer]:
            - /url: https://www.cloudflare.com?utm_source=challenge&utm_campaign=m
        - link "Privacy" [ref=e22] [cursor=pointer]:
          - /url: https://www.cloudflare.com/privacypolicy/
```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  | 
  3  | export class HomePage {
  4  |     private readonly page: Page;
  5  |     private readonly searchInput: Locator;
  6  |     private readonly searchButton: Locator;
  7  |     public readonly productGrid: Locator;
  8  |     public readonly productTitle: Locator;
  9  | 
  10 |     constructor(page: Page) {
  11 |         this.page = page;
  12 |         this.searchInput = page.getByTestId('search-query');
  13 |         this.searchButton = page.getByTestId('search-submit');
  14 |         this.productGrid = page.locator('.col-md-9');
  15 |         this.productTitle = page.getByTestId('product-name');
  16 |     }
  17 | 
  18 |     async buscarProducto(nombre: string): Promise<void> {
  19 |         // Aumentamos el timeout solo para esta acción crítica
  20 |         // Playwright intentará encontrarlo hasta por 15 segundos antes de fallar el paso
  21 |         const input = this.searchInput;
  22 |         
  23 |         // Mas tiempo de espera para el fill, ya que a veces el input tarda en estar interactivo
> 24 |         await input.fill(nombre, { timeout: 15000 });
     |                     ^ TimeoutError: locator.fill: Timeout 15000ms exceeded.
  25 |         
  26 |         // Click con reintento automático
  27 |         await this.searchButton.click({ timeout: 15000 });
  28 |         
  29 |         // Espera a que el grid cargue con mayor margen
  30 |         await this.productTitle.first().waitFor({ state: 'visible', timeout: 20000 });
  31 |     }
  32 |     async filtrarPorMarca(marca: string): Promise<void> {
  33 |         const brandCheckbox = this.page.locator(`input[value="${marca}"]`);
  34 |         await brandCheckbox.check();
  35 |         // Misma corrección: esperar al primer resultado, no a networkidle.
  36 |         await this.productTitle.first().waitFor({ state: 'visible' });
  37 |     }
  38 | }
```