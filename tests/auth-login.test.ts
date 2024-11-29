import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Auth Login Page', () => {
  test('debería cargar la página de login correctamente', async ({ page }) => {
    await page.goto(`${BASE_URL}/auth/login`);
  });

  test('debería mostrar un error para credenciales incorrectas', async ({
    page,
  }) => {
    const emailError = 'usuario_invalido';
    const passwordError = 'contraseña_invalida';

    await page.goto(`${BASE_URL}/auth/login`);

    await page.waitForSelector('input#email');
    await page.fill('input#email', emailError);
    await expect(page.locator('input#email')).toHaveValue(emailError);

    await page.waitForSelector('input#password');
    await page.fill('input#password', passwordError);
    await expect(page.locator('input#password')).toHaveValue(
      passwordError
    );

    const button = page.locator('#submit-button');
    await button.click();

    await expect(page).toHaveURL(`${BASE_URL}/auth/login`);
  });

  test('debería ingresar correctamente', async ({ page }) => {
    const email = 'nahuel1@gmail.com';
    const password = '12345678';
    await page.goto(`${BASE_URL}/auth/login`);

    await page.waitForSelector('input#email');
    await page.fill('input#email', email);
    await expect(page.locator('input#email')).toHaveValue(email);


    await page.waitForSelector('input#password');
    await page.fill('input#password', password);
    await expect(page.locator('input#password')).toHaveValue(password);

    await page.route('**/api/auth/signin', async (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          user: { email: 'nahuel1@gmail.com', role: 'user' },
          expires: new Date().toISOString(),
        }),
      });
    });

    const button = page.locator('#submit-button');
    await button.click();

    await expect(page).toHaveURL(`${BASE_URL}/dashboard`);

  });
});
