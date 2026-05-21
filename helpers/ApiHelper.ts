import { APIRequestContext, expect } from '@playwright/test';

/**
 * Encapsula las llamadas HTTP directas a la API REST de practicesoftwaretesting.com.
 *
 * Ventaja clave: crear un usuario vía API elimina la transición SPA
 * del flujo Register→Login, que es la causa raíz del timeout en CI.
 */
export class ApiHelper {
    private readonly request: APIRequestContext;
    private readonly baseUrl = 'https://api.practicesoftwaretesting.com';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * Registra un usuario llamando directamente al endpoint REST.
     * Lanza un error inmediato y descriptivo si el servidor responde con error.
     *
     * @returns El objeto de usuario tal como lo devuelve la API.
     */
    async registrarUsuario(user: {
        first_name: string;
        last_name: string;
        dob: string;
        address: string;
        city: string;
        state: string;
        country: string;
        postcode: string;
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

        // Aserción explícita: si el registro falla, el test falla aquí con
        // un mensaje claro en lugar de un timeout críptico 60s más tarde.
        expect(
            response.status(),
            `El registro vía API falló con status ${response.status()}. Body: ${await response.text()}`
        ).toBe(201);
    }
}