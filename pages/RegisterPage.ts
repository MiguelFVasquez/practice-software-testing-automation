import { Page, Locator } from '@playwright/test';

/**
 * RegisterPage se mantiene por si se necesita en tests de UI de registro
 * (por ejemplo, validar mensajes de error del formulario).
 *
 * Para la creación de usuarios de soporte en otros tests,
 * usa ApiHelper.registrarUsuario() en su lugar: es ~20x más rápido
 * y no tiene dependencia del estado del router SPA.
 */
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
        this.firstNameInput = page.getByTestId('first-name');
        this.lastNameInput = page.getByTestId('last-name');
        this.dobInput = page.getByTestId('dob');
        this.postalCodeInput = page.getByTestId('postal_code');
        this.houseNumberInput = page.getByTestId('house_number');
        this.streetInput = page.getByTestId('street');
        this.cityInput = page.getByTestId('city');
        this.stateInput = page.getByTestId('state');
        this.countryDropdown = page.getByTestId('country');
        this.phoneInput = page.getByTestId('phone');
        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.registerButton = page.getByTestId('register-submit');
    }

    /**
     * Llena y envía el formulario de registro.
     * Úsalo solo cuando estés probando el formulario de registro en sí mismo.
     *
     * NOTA: No incluye waitForURL. Si necesitas esperar la redirección
     * después del registro, hazlo explícitamente en el test para mantener
     * la intención clara y el POM sin lógica de flujo de navegación.
     */
    async registrarUsuario(user: {
        firstName: string;
        lastName: string;
        dob: string;
        postalCode: string;
        houseNumber: string;
        street: string;
        city: string;
        state: string;
        country: string;
        phone: string;
        email: string;
        password: string;
    }): Promise<void> {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.dobInput.fill(user.dob);
        await this.postalCodeInput.fill(user.postalCode);
        await this.houseNumberInput.fill(user.houseNumber);
        await this.streetInput.fill(user.street);
        await this.cityInput.fill(user.city);
        await this.stateInput.fill(user.state);
        await this.countryDropdown.selectOption(user.country);
        await this.phoneInput.fill(user.phone);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.registerButton.click();
    }
}