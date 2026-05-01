import { expect, test } from '@playwright/test';
import {
  completeCycleDays,
  expectStoredState,
  prepareFreshPage,
  startStarterAction,
} from './helpers/arrel.js';

test('six proof days lead to a day 7 reading summary with feedback dots', async ({ page }) => {
  await prepareFreshPage(page);
  await startStarterAction(page);

  await completeCycleDays(page, [
    'Fet',
    'Fet',
    'Fet',
    'Fet amb esforç',
    'Fet amb esforç',
    {
      label: 'Ho deixo per avui',
      note: 'M’ha costat mantenir-ho mentre feia altres coses.',
    },
  ]);

  await expect(page.getByText('Dia 7 · tancament')).toBeVisible();
  await expect(page.getByText('Avui toca revisar el cicle.')).toBeVisible();

  const summary = page.getByLabel('Resum del cicle');
  await expect(summary.locator('.v2-cycle-summary-grid span').nth(0)).toContainText('6');
  await expect(summary.locator('.v2-cycle-summary-grid span').nth(0)).toContainText('proves');
  await expect(summary.locator('.v2-cycle-summary-grid span').nth(1)).toContainText('3');
  await expect(summary.locator('.v2-cycle-summary-grid span').nth(1)).toContainText('hi és');
  await expect(summary.locator('.v2-cycle-summary-grid span').nth(2)).toContainText('2');
  await expect(summary.locator('.v2-cycle-summary-grid span').nth(2)).toContainText('amb esforç');
  await expect(summary.locator('.v2-cycle-entry')).toHaveCount(6);
  await expect(summary.locator('.v2-feedback-pill.is-done')).toHaveCount(3);
  await expect(summary.locator('.v2-feedback-pill.is-partial')).toHaveCount(2);
  await expect(summary.locator('.v2-feedback-pill.is-skipped')).toHaveCount(1);

  await expect(page.getByLabel('Dia 1: hi és')).toBeVisible();
  await expect(page.getByLabel('Dia 4: amb esforç')).toBeVisible();
  await expect(page.getByLabel('Dia 6: ho deixo per avui')).toBeVisible();
  await expect(page.getByLabel('Dia 7: lectura')).toBeVisible();
  await expect(page.getByRole('button', { name: 'El cicle nou s’obre demà' })).toBeDisabled();

  await expectStoredState(page, {
    status: 'active',
    entryMode: 'starter',
    primaryArea: 'stress',
    cycleNumber: 1,
    dayInCycle: 7,
    currentDayAvailableOn: '2026-05-03',
  });

  const state = await page.evaluate((key) => JSON.parse(window.localStorage.getItem(key)), 'arrel-v2-state');
  expect(state.feedback).toHaveLength(6);

  const reading = page.getByLabel('Lectura personal');
  await expect(reading.getByText('Arrel pot llegir aquest cicle i proposar-te un següent pas.')).toBeVisible();
  await page.getByRole('button', { name: 'Generar lectura personal' }).click();

  await expect(reading.getByText('Un cicle que va començar amb més entrada')).toBeVisible();
  await expect(reading.getByText(/inici va entrar amb més disponibilitat/)).toBeVisible();
  await expect(reading.getByText(/M’ha costat mantenir-ho mentre feia altres coses/).first()).toBeVisible();
  await expect(reading.getByText(/compta tres respiracions/)).toBeVisible();

  await expectStoredState(page, {
    cycleReadings: [
      {
        cycle: 1,
        reading: {
          title: 'Un cicle que va començar amb més entrada',
          confidence: 'alta',
        },
      },
    ],
  });

  const stateWithReading = await page.evaluate((key) => JSON.parse(window.localStorage.getItem(key)), 'arrel-v2-state');
  expect(stateWithReading.cycleReadings).toHaveLength(1);

  await page.reload();
  await expect(page.getByLabel('Lectura personal').getByText('Un cicle que va començar amb més entrada')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Actualitzar lectura' })).toBeVisible();
});
