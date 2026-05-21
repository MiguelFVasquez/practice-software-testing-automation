import { APIRequestContext, expect } from '@playwright/test';

export class ApiHelper {
    private readonly request: APIRequestContext;
    private readonly baseUrl = 'https://api.practicesoftwaretesting.com';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * Registra un usuario llamando directamente al endpoint REST.
     *
     * El campo "address" debe ser un objeto anidado — la API lo valida
     * con la regla "array" de Laravel, que acepta objetos JSON.
     */
    async registrarUsuario(user: {
        first_name: string;
        last_name: string;
        dob: string;
        address: {
            street: string;
            city: string;
            state: string;
            country: string;
            postal_code: string;
        };
        phone: string;
        email: string;
        password: string;
    }): Promise<void> {
        const response = await this.request.post(`${this.baseUrl}/users/register`, {
            data: user,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        expect(
            response.status(),
            `Registro vía API falló con status ${response.status()}. Body: ${await response.text()}`
        ).toBe(201);
    }
}