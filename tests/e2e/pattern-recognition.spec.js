import { expect, test } from '@playwright/test';
import {
  completeCycleDays,
  prepareFreshPage,
  startStarterAction,
} from './helpers/arrel.js';

test('app detects success patterns and mentions them in the cycle reading', async ({ page }) => {
  await prepareFreshPage(page);
  await startStarterAction(page);

  // Simulem un cicle on les proves es fan al matí i amb context de "tranquil"
  // Les dates als helpers per defecte comencen a les 09:00 (el matí)
  await completeCycleDays(page, [
    { label: 'Fet', note: 'M’he sentit molt tranquil.' },
    { label: 'Fet', note: 'Tot tranquil a casa.' },
    { label: 'Fet', note: 'M’agrada aquest moment.' },
    { label: 'Fet', note: 'Bé.' },
    { label: 'Fet', note: 'Fet.' },
    { label: 'Fet', note: 'Ok.' },
  ]);

  // Generem lectura de cicle
  await page.getByRole('button', { name: 'Generar lectura personal' }).click();

  // Verifiquem que apareix el patró d'èxit de context
  await expect(page.getByText(/Patró d’èxit/)).toBeVisible();
  await expect(page.getByText(/quan hi ha un context de "tranquil"/)).toBeVisible();
  
  // Verifiquem que apareix el patró d'èxit de franja horària
  await expect(page.getByText(/aprofitar el matí per fer les teves proves/)).toBeVisible();
});
