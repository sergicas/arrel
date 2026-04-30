import { expect, test } from '@playwright/test';
import {
  expectStoredState,
  prepareFreshPage,
  startStarterAction,
} from './helpers/arrel.js';

test('landing starts the starter day 1 action without an account', async ({ page }) => {
  await prepareFreshPage(page);

  await expect(page.getByRole('heading', { name: 'Autonomia, capacitat i il·lusió cada dia.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Privacitat' })).toHaveAttribute('href', '/legal/privacitat');

  await startStarterAction(page);

  await expect(page.locator('.v2-ledger-area')).toHaveText('Calma');
  await expect(page.getByText('Cicle 1')).toBeVisible();
  await expect(page.getByText('Dia 1')).toBeVisible();
  await expect(page.getByText('≈ 3 min')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Asseu-te en silenci tres minuts/ })).toBeVisible();
  await expect(page.getByText('Guia curta')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Iniciar', exact: true })).toBeVisible();

  await expectStoredState(page, {
    status: 'active',
    entryMode: 'starter',
    primaryArea: 'stress',
    cycleNumber: 1,
    dayInCycle: 1,
    currentDayAvailableOn: '2026-04-27',
  });
});
