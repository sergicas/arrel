import { expect, test } from '@playwright/test';
import {
  advanceClock,
  expectStoredState,
  makeActiveState,
  markToday,
  seedState,
} from './helpers/arrel.js';

test('regular rhythm opens the next proof after six hours', async ({ page }) => {
  await seedState(page, makeActiveState());

  await page.locator('header').getByRole('link', { name: 'Mapa' }).click();
  await page.getByRole('link', { name: 'Ritme' }).click();
  await page.getByRole('radio', { name: /Regular/i }).click();

  await expectStoredState(page, { pace: 'regular' });

  await page.getByRole('link', { name: 'Tornar' }).click();
  await page.locator('header').getByRole('link', { name: 'Avui' }).click();
  await markToday(page, 'Fet');

  await expect(page.getByLabel('Temps fins a la prova següent')).toContainText('6 h');
  await expect(page.getByRole('button', { name: 'S’obre més tard' })).toBeDisabled();

  await advanceClock(page, { hours: 6, minutes: 1 });
  const nextDayButton = page.getByRole('button', { name: 'Obrir la prova següent' });
  await expect(nextDayButton).toBeEnabled();
  await nextDayButton.click();

  await expect(page.getByText('Dia 2')).toBeVisible();
  await expectStoredState(page, {
    pace: 'regular',
    dayInCycle: 2,
  });
});

test('accelerated rhythm is not exposed as a selectable option', async ({ page }) => {
  await seedState(page, makeActiveState({
    feedback: [{
      cycle: 1,
      day: 1,
      area: 'stress',
      value: 'done',
      completedOn: '2026-04-27',
    }],
    nextDayAvailableAt: null,
    pace: 'slow',
  }));

  await expect(page.getByRole('button', { name: 'S’obre demà' })).toBeDisabled();

  await page.locator('header').getByRole('link', { name: 'Mapa' }).click();
  await page.getByRole('link', { name: 'Ritme' }).click();

  await expect(page.getByRole('radio', { name: /Lent/i })).toBeVisible();
  await expect(page.getByRole('radio', { name: /Regular/i })).toBeVisible();
  await expect(page.getByRole('radio', { name: /Accelerat/i })).toHaveCount(0);
  await expectStoredState(page, { pace: 'slow' });
});
