import { expect, test } from '@playwright/test';
import {
  expectStoredState,
  prepareFreshPage,
} from './helpers/arrel.js';

test('capacity links open a useful area page and can start a proof', async ({ page }) => {
  await prepareFreshPage(page);

  await page.getByRole('link', { name: 'Veure Cos' }).click();

  await expect(page).toHaveURL(/\/menu\/arees#cos$/);
  await expect(page.getByRole('heading', { name: 'Cada cicle treballa una capacitat.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Fer una prova de Cos' })).toBeVisible();

  await page.getByRole('button', { name: 'Fer una prova de Cos' }).click();

  await expect(page).toHaveURL(/\/app$/);
  await expect(page.locator('.v2-ledger-area')).toHaveText('Cos');
  await expect(page.getByText('Cicle 1')).toBeVisible();
  await expect(page.getByText('Dia 1')).toBeVisible();

  await expectStoredState(page, {
    status: 'active',
    entryMode: 'starter',
    primaryArea: 'physical',
    cycleNumber: 1,
    dayInCycle: 1,
  });
});
