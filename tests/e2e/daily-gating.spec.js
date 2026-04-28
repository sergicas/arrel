import { expect, test } from '@playwright/test';
import {
  advanceClock,
  expectStoredState,
  markToday,
  prepareFreshPage,
  readStoredState,
  startStarterAction,
} from './helpers/arrel.js';

test('daily reading locks the next day until local midnight', async ({ page }) => {
  await prepareFreshPage(page);
  await startStarterAction(page);

  await markToday(page, 'Hi és');

  await expect(page.getByText('Avui ja tens un senyal.')).toBeVisible();
  await expect(page.getByLabel('Temps fins al dia següent')).toContainText('15 h');
  await expect(page.getByRole('button', { name: 'S’obre demà' })).toBeDisabled();
  await expect(page.getByLabel('Dia 1: hi és')).toBeVisible();

  const stateAfterCheckIn = await readStoredState(page);
  expect(stateAfterCheckIn.feedback).toHaveLength(1);
  expect(stateAfterCheckIn.feedback[0]).toMatchObject({
    cycle: 1,
    day: 1,
    area: 'stress',
    value: 'done',
    completedOn: '2026-04-27',
  });

  await advanceClock(page, { hours: 15, minutes: 1 });

  const nextDayButton = page.getByRole('button', { name: 'Obrir el dia següent' });
  await expect(nextDayButton).toBeEnabled();
  await nextDayButton.click();

  await expect(page.getByText('Dia 2')).toBeVisible();
  await expect(page.getByText('≈ 10 min')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Apaga les notificacions del mòbil durant deu minuts/ })).toBeVisible();
  await expect(page.getByLabel('Dia 1: hi és')).toBeVisible();
  await expect(page.getByLabel('Dia 2: avui')).toBeVisible();

  await expectStoredState(page, {
    status: 'active',
    cycleNumber: 1,
    dayInCycle: 2,
    currentDayAvailableOn: '2026-04-28',
  });
});
