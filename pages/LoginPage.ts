import { Page, Locator } from '@playwright/test';

export class LoginPage {
    //1. declare the properties and their types
    private readonly page: Page;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    // 2. create a constructor to initialize the properties
    constructor(page: Page) {
        this.page = page;

        // use data-testid attributes to locate the elements
        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
    }        
    // 3. create methods to interact with the elements
    async login(user: string, password: string): Promise<void> {
        await this.emailInput.fill(user);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }



}
