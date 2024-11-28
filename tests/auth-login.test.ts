import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Auth Login Page', () => {
  test('debería cargar la página de login correctamente', async ({ page }) => {
    await page.goto(`${BASE_URL}/auth/login`);
  });

  test('debería mostrar un error para credenciales incorrectas', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/auth/login`);
    await page.fill('input[name="email"]', 'usuario_invalido');
    await page.fill('input[name="password"]', 'contraseña_invalida');

    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(`${BASE_URL}/auth/login`);
  });
});
