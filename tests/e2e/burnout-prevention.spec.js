import { expect, test } from '@playwright/test';
import {
  markToday,
  openNextActionDay,
  prepareFreshPage,
  startStarterAction,
} from './helpers/arrel.js';

test('app detects burnout risk after 3 days of friction and shows a warning', async ({ page }) => {
  await prepareFreshPage(page);
  await startStarterAction(page);

  // Dia 1, 2, 3: Marquem amb fricció (SKIPPED o PARTIAL)
  await markToday(page, 'Ho deixo per avui', '');
  await openNextActionDay(page);
  await markToday(page, 'Fet amb esforç', '');
  await openNextActionDay(page);
  await markToday(page, 'Ho deixo per avui', '');
  await openNextActionDay(page);

  // Dia 4: Verifiquem que apareix el banner de risc alt
  await expect(page.getByText(/ritme d’aquests últims dies demana força energia/)).toBeVisible();
});
