import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Auth Register Page', () => {
  test('debería cargar la página de registro correctamente', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/auth/register`);
    await expect(page).toHaveURL(`${BASE_URL}/auth/register`);
  });

  test('debería mostrar un error para credenciales incorrectas', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/auth/register`);

    await page.fill('input[name="name"]', 'Usuario de Prueba');
    await page.fill('input[name="username"]', 'usuariotest');
    await page.fill('input[name="email"]', 'correo_invalido');
    await page.fill('input[name="password"]', '1234');
    await page.fill('input[name="confirmPassword"]', 'abcd');

    await page.click('button[type="submit"]');

    await expect(page).not.toHaveURL(`${BASE_URL}/auth/login`);
  });
});
