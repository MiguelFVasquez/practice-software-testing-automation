import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    private readonly page: Page;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly dobInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly houseNumberInput: Locator;
    private readonly streetInput: Locator;
    private readonly cityInput: Locator;
    private readonly stateInput: Locator;
    private readonly countryDropdown: Locator;
    private readonly phoneInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly registerButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Map elements using the exact data-test attributes from your DOM inspection
        this.firstNameInput = page.getByTestId('first-name');
        this.lastNameInput = page.getByTestId('last-name');
        this.dobInput = page.getByTestId('dob');
        
        // Address specific fields provided by your DOM analysis
        this.postalCodeInput = page.getByTestId('postal_code');
        this.houseNumberInput = page.getByTestId('house_number');
        this.streetInput = page.getByTestId('street');
        this.cityInput = page.getByTestId('city');
        this.stateInput = page.getByTestId('state');
        this.countryDropdown = page.getByTestId('country');
        
        // Remaining credentials and contact info
        this.phoneInput = page.getByTestId('phone');
        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.registerButton = page.getByTestId('register-submit');
    }

    /**
     * Fills out the registration form using the accurate segmented address fields
     * @param user Object containing randomly generated user credentials and address info
     */
    async registrarUsuario(user: any): Promise<void> {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.dobInput.fill(user.dob);
        
        // Typing postal code and house number to trigger any app autofill behaviors
        await this.postalCodeInput.fill(user.postalCode);
        await this.houseNumberInput.fill(user.houseNumber);
        
        // Explicitly filling the rest of the address fields as a fallback strategy.
        // This guarantees test stability in CI/CD environments even if the autofill API lags.
        await this.streetInput.fill(user.street);
        await this.cityInput.fill(user.city);
        await this.stateInput.fill(user.state);
        
        await this.countryDropdown.selectOption(user.country);
        await this.phoneInput.fill(user.phone);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        
        await this.registerButton.click();
        
        // Wait for the server to process the registration and redirect to the login screen
        await this.page.waitForURL(/.*login/);
    }
}