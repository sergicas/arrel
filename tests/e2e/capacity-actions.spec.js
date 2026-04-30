import { expect, test } from '@playwright/test';
import {
  expectStoredState,
  makeActiveState,
  prepareFreshPage,
  seedState,
} from './helpers/arrel.js';

test('capacity links open a useful area page and can start a seven-day cycle', async ({ page }) => {
  await prepareFreshPage(page);

  await page.getByRole('link', { name: 'Veure Cos' }).click();

  await expect(page).toHaveURL(/\/menu\/arees#cos$/);
  await expect(page.getByRole('heading', { name: 'Cada cicle treballa una capacitat.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Començar 7 dies de Cos' })).toBeVisible();

  await page.getByRole('button', { name: 'Començar 7 dies de Cos' }).click();

  await expect(page).toHaveURL(/\/app$/);
  await expect(page.locator('.v2-ledger-area')).toHaveText('Cos');
  await expect(page.getByText('Cicle 1')).toBeVisible();
  await expect(page.getByText('Dia 1')).toBeVisible();

  await expectStoredState(page, {
    status: 'active',
    entryMode: 'starter',
    primaryArea: 'physical',
    currentCycleArea: 'physical',
    cycleNumber: 1,
    dayInCycle: 1,
  });
});

test('starting another capacity keeps previous readings and opens the next cycle', async ({ page }) => {
  await seedState(
    page,
    makeActiveState({
      cycleNumber: 1,
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
    '/menu/arees#memoria'
  );

  await page.getByRole('button', { name: 'Començar 7 dies de Memòria' }).click();
  await expect(page.getByText('Arrel conservarà l’històric i obrirà un cicle nou.')).toBeVisible();
  await page.getByRole('button', { name: 'Sí, començar 7 dies de Memòria' }).click();

  await expect(page).toHaveURL(/\/app$/);
  await expect(page.locator('.v2-ledger-area')).toHaveText('Memòria');
  await expect(page.getByText('Cicle 2')).toBeVisible();
  await expect(page.getByText('Dia 1')).toBeVisible();

  await expectStoredState(page, {
    status: 'active',
    entryMode: 'starter',
    primaryArea: 'cognitive',
    currentCycleArea: 'cognitive',
    cycleNumber: 2,
    dayInCycle: 1,
    feedback: [
      {
        cycle: 1,
        day: 1,
        area: 'stress',
        value: 'done',
      },
    ],
  });
});
