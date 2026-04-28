import { expect, test } from '@playwright/test';
import {
  completeDiagnostic,
  expectStoredState,
  prepareFreshPage,
} from './helpers/arrel.js';

test('diagnosis shows the result and opens a personalized calm week', async ({ page }) => {
  await prepareFreshPage(page, '/diagnostic');

  await completeDiagnostic(page, 2);

  await expect(page).toHaveURL(/\/app$/);
  await expect(page.getByText('Diagnosi completada')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Començarem per Calma.' })).toBeVisible();
  await expect(page.getByText('També tindrem present el cos.')).toBeVisible();

  const rows = page.locator('.v2-diagnostic-row');
  await expect(rows).toHaveCount(5);
  await expect(rows.first()).toContainText('Calma');
  await expect(rows.nth(1)).toContainText('Cos');

  await page.getByRole('button', { name: /Veure la prova d’avui/ }).click();

  await expect(page.locator('.v2-ledger-area')).toHaveText('Calma');
  await expect(page.getByText('personalitzat', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Aquesta setmana: Calma' })).toBeVisible();
  await expect(page.getByLabel('Resultat resumit de la diagnosi')).toContainText('Calma');

  await expectStoredState(page, {
    status: 'active',
    entryMode: 'diagnostic',
    primaryArea: 'stress',
    secondaryArea: 'physical',
    cycleNumber: 1,
    dayInCycle: 1,
    currentDayAvailableOn: '2026-04-27',
  });
});
