import { describe, it, expect } from 'vitest';

const baseURL = 'http://localhost:3002';

describe('Admin Add Points API', () => {
  it('debería agregar puntos correctamente', async () => {
    const response = await fetch(`${baseURL}/api/admin/add-points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: '123',
        points: 50,
      }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({ success: true });
  });

  it('debería manejar errores para entradas inválidas', async () => {
    const response = await fetch(`${baseURL}/api/admin/add-points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points: -10 }), // Entrada inválida
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.message).toContain('Invalid points');
  });
});
