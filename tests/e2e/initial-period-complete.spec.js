import { expect, test } from '@playwright/test';
import {
  acknowledgeTransition,
  closeRestDay,
  completeCycleDays,
  expectStoredState,
  prepareFreshPage,
  startStarterAction,
} from './helpers/arrel.js';

test('after two guided cycles the handoff is not a paywall and can continue to cycle 3', async ({ page }) => {
  await prepareFreshPage(page);
  await startStarterAction(page);

  await completeCycleDays(page, 6, 'Fet');
  await closeRestDay(page);
  await acknowledgeTransition(page, 1);
  await expect(page.getByText('Cicle 2')).toBeVisible();
  await expect(page.getByText('Dia 1')).toBeVisible();

  await completeCycleDays(page, 6, 'Fet');
  await closeRestDay(page);
  await acknowledgeTransition(page, 2);

  await expect(page.getByText('Període inicial complet')).toBeVisible();
  await expect(page.getByText('Ja tens dos cicles fets.')).toBeVisible();
  await expect(page.locator('body')).not.toContainText('5 €');
  await expect(page.locator('body')).not.toContainText('€/mes');

  await page.getByRole('button', { name: 'Continuar amb un nou cicle' }).click();

  await expect(page.locator('.v2-ledger-area')).toHaveText('Identitat');
  await expect(page.getByText('Cicle 3')).toBeVisible();
  await expect(page.getByText('Dia 1')).toBeVisible();

  await expectStoredState(page, {
    status: 'active',
    continuedAfterInitialPeriod: true,
    cycleNumber: 3,
    dayInCycle: 1,
  });
});
