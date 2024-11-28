import { test, expect } from '@playwright/test';

test.describe('Auth Login Page', () => {
  test('debería cargar la página de login correctamente', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page).toHaveTitle(/Login/);
  });

  test('debería mostrar un error para credenciales incorrectas', async ({
    page,
  }) => {
    await page.goto('/auth/login');
    await page.fill('input[name="email"]', 'usuario_invalido');
    await page.fill('input[name="password"]', 'contraseña_invalida');
    await page.click('button[type="submit"]');
    const errorMessage = await page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Credenciales inválidas');
  });
});
