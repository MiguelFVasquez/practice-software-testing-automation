/**
 * Genera datos de usuario únicos y válidos para cada ejecución de test.
 *
 * Centralizar la creación de datos aquí tiene dos ventajas:
 * 1. Un único lugar para actualizar si cambia el contrato de la API.
 * 2. Los tests se leen como especificaciones, no como constructores de objetos.
 */
export function crearUsuarioDePrueba() {
    const id = Date.now();
    return {
        // Campos requeridos por la API REST (snake_case)
        first_name: 'Juan',
        last_name: 'Florez',
        dob: '1995-01-01',
        address: '123 Avenida Bolivar',
        city: 'Armenia',
        state: 'Quindio',
        country: 'CO',
        postcode: '630003',
        phone: '3123456789',
        email: `qa_user_${id}@test.com`,
        password: 'SecurePassword123*',
    };
}