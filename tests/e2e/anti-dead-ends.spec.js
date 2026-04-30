import { expect, test } from '@playwright/test';
import {
  acceptNextDialog,
  completeDiagnostic,
  expectStoredState,
  makeActiveState,
  prepareFreshPage,
  seedState,
} from './helpers/arrel.js';

test('menu and empty history expose state-aware next actions before starting', async ({ page }) => {
  await prepareFreshPage(page, '/menu');

  await expect(page.getByRole('link', { name: 'Triar per on començar' })).toHaveAttribute('href', '/inici');

  await page.goto('/menu/cicles');

  await expect(page.getByRole('heading', { name: 'Encara cap prova guardada.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Triar per on començar' })).toHaveAttribute('href', '/inici');
});

test('menu points initial-period users to continuation options instead of promising a proof', async ({ page }) => {
  await seedState(
    page,
    makeActiveState({
      status: 'initial_period_complete',
      cycleNumber: 3,
      dayInCycle: 1,
      continuedAfterInitialPeriod: false,
    }),
    '/menu'
  );

  const continueLink = page.getByRole('link', { name: 'Veure opcions per continuar' });
  await expect(continueLink).toHaveAttribute('href', '/app');

  await continueLink.click();

  await expect(page.getByText('Període inicial complet')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continuar amb un nou cicle' })).toBeVisible();
});

test('active diagnostic asks before opening a new cycle', async ({ page }) => {
  await seedState(
    page,
    makeActiveState({
      dayInCycle: 2,
      currentDayAvailableOn: '2026-04-28',
      feedback: [
        {
          cycle: 1,
          day: 1,
          area: 'stress',
          value: 'done',
          completedOn: '2026-04-27',
        },
      ],
    }),
    '/diagnostic'
  );

  for (let step = 1; step <= 4; step += 1) {
    await expect(page.getByLabel(`Pas ${step} de 5`)).toBeVisible();
    await page.locator('.v2-option').first().click();
  }

  await expect(page.getByLabel('Pas 5 de 5')).toBeVisible();

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('obrirà un cicle nou');
    await dialog.dismiss();
  });
  await page.locator('.v2-option').first().click();

  await expect(page.getByLabel('Pas 5 de 5')).toBeVisible();

  acceptNextDialog(page, 'obrirà un cicle nou');
  await page.locator('.v2-option').first().click();

  await expect(page.getByText('Focus ajustat')).toBeVisible();
  await expectStoredState(page, {
    status: 'active',
    entryMode: 'diagnostic',
    cycleNumber: 2,
    dayInCycle: 1,
  });
});

test('retaking a pending diagnostic result does not skip to the next cycle', async ({ page }) => {
  await prepareFreshPage(page, '/diagnostic');

  await completeDiagnostic(page, 2);

  await expect(page.getByText('Focus ajustat')).toBeVisible();
  await page.getByRole('button', { name: 'Ajustar respostes' }).click();

  await completeDiagnostic(page, 1);
  await page.getByRole('button', { name: /Veure la prova d’avui/ }).click();

  await expect(page.getByText('Cicle 1')).toBeVisible();
  await expect(page.getByText('Dia 1')).toBeVisible();
  await expectStoredState(page, {
    status: 'active',
    entryMode: 'diagnostic',
    cycleNumber: 1,
    dayInCycle: 1,
  });
});
