/**
 * Genera datos de usuario únicos y válidos para cada ejecución de test.
 *
 * La API REST de practicesoftwaretesting.com espera el campo "address"
 * como un objeto anidado (que PHP/Laravel valida como "array"),
 * no como un string plano.
 */
export function crearUsuarioDePrueba() {
    const id = Date.now();
    return {
        first_name: 'Juan',
        last_name: 'Florez',
        dob: '1995-01-01',
        address: {
            street: 'Avenida Bolivar',
            city: 'Armenia',
            state: 'Quindio',
            country: 'CO',
            postal_code: '630003',
        },
        phone: '3123456789',
        email: `qa_user_${id}@test.com`,
        password: 'SecurePassword123*',
    };
}