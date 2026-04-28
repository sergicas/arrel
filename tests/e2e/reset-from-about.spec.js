import { expect, test } from '@playwright/test';
import {
  acceptNextDialog,
  makeActiveState,
  readStoredState,
  seedState,
} from './helpers/arrel.js';

test('about reset accepts the confirmation and returns to a clean new state', async ({ page }) => {
  await seedState(
    page,
    makeActiveState({
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
    '/menu/sobre'
  );

  acceptNextDialog(page, 'Esborrar totes les dades locals?');
  await page.getByRole('button', { name: 'Esborrar les dades locals' }).click();

  await expect(page).toHaveURL(/\/(app|inici)$/);
  await expect.poll(async () => {
    const state = await readStoredState(page);
    return state?.status || 'cleared';
  }).toMatch(/^(new|cleared)$/);

  const resetState = await readStoredState(page);
  if (resetState) {
    expect(resetState.entryMode).toBeNull();
    expect(resetState.primaryArea).toBeNull();
    expect(resetState.feedback).toEqual([]);
  }
});
