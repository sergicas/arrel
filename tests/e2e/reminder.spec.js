import { expect, test } from '@playwright/test';
import {
  expectStoredState,
  makeActiveState,
  seedState,
} from './helpers/arrel.js';

test('web reminder stores the preference with the installed-app fallback copy', async ({ page }) => {
  await seedState(page, makeActiveState(), '/menu/recordatori');

  await expect(page.getByRole('heading', { name: 'Un avís a l’hora que triïs.' })).toBeVisible();
  await expect(page.getByRole('status')).toContainText('Arrel no t’enviarà cap recordatori.');

  await page.locator('label.v2-reminder-toggle').click();
  await page.getByLabel('Hora del recordatori').fill('09:00');
  await page.getByRole('button', { name: 'Desar recordatori' }).click();

  await expect(page.getByRole('status')).toContainText(
    'Preferència desada. Les notificacions locals s’activaran quan obris Arrel com a app instal·lada.'
  );
  await expectStoredState(page, {
    reminder: {
      enabled: true,
      time: '09:00',
      permission: 'unavailable',
      scheduled: false,
    },
  });

  await page.reload();
  await expect(page.getByLabel('Carregant Arrel')).not.toBeVisible();

  await expect(page.getByRole('checkbox')).toBeChecked();
  await expect(page.getByLabel('Hora del recordatori')).toHaveValue('09:00');
  await expect(page.getByRole('status')).toContainText(
    'Preferència desada. Les notificacions locals s’activaran quan obris Arrel com a app instal·lada.'
  );

  await page.locator('label.v2-reminder-toggle').click();
  await page.getByRole('button', { name: 'Desar recordatori' }).click();

  await expect(page.getByRole('status')).toContainText('Arrel no t’enviarà cap recordatori.');
  await expectStoredState(page, {
    reminder: {
      enabled: false,
      time: '09:00',
      scheduled: false,
    },
  });
});
