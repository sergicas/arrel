import { expect } from '@playwright/test';

export const STORAGE_KEY = 'arrel-v2-state';
export const START_TIME = '2026-04-27T09:00:00+02:00';

export function makeActiveState(overrides = {}) {
  return {
    status: 'active',
    entryMode: 'starter',
    primaryArea: 'stress',
    secondaryArea: null,
    cycleNumber: 1,
    dayInCycle: 1,
    currentDayAvailableOn: '2026-04-27',
    nextDayAvailableAt: null,
    pace: 'slow',
    feedback: [],
    ...overrides,
  };
}

export async function prepareFreshPage(page, path = '/inici', time = START_TIME) {
  await page.clock.install({ time: new Date(time) });
  await page.addInitScript((key) => {
    const clearFlag = `${key}-fresh-cleared`;
    if (window.sessionStorage.getItem(clearFlag)) return;
    window.localStorage.removeItem(key);
    window.sessionStorage.setItem(clearFlag, 'true');
  }, STORAGE_KEY);
  await page.goto(path);
}

export async function seedState(page, state, path = '/app', time = START_TIME) {
  await page.clock.install({ time: new Date(time) });
  await page.addInitScript(
    ([key, value]) => {
      if (!window.localStorage.getItem(key)) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [STORAGE_KEY, state]
  );
  await page.goto(path);
}

export async function readStoredState(page) {
  return page.evaluate((key) => JSON.parse(window.localStorage.getItem(key) || 'null'), STORAGE_KEY);
}

export async function expectStoredState(page, matcher) {
  await expect.poll(() => readStoredState(page)).toMatchObject(matcher);
}

export async function advanceClock(page, { days = 0, hours = 0, minutes = 0, seconds = 0 }) {
  const ms = (((days * 24 + hours) * 60 + minutes) * 60 + seconds) * 1000;
  await page.clock.fastForward(ms);
}

export async function startStarterAction(page) {
  await page.getByText('Comença ara', { exact: true }).click();
  await page.getByRole('button', { name: /Calma/ }).click();
  await expect(page).toHaveURL(/\/app$/);
}

export async function markToday(page, label = 'Fet', note = '') {
  await page.locator('.v2-stamp').filter({ has: page.getByText(label, { exact: true }) }).click();
  if (note) {
    await page.getByPlaceholder('Exemple: m’ha costat començar, però després m’ha anat bé.').fill(note);
  }
  await page.getByRole('button', { name: 'Guardar la lectura' }).click();
}

export async function openNextActionDay(page) {
  await advanceClock(page, { days: 1, minutes: 1 });
  const nextDayButton = page.getByRole('button', { name: /Obrir (la prova següent|el descans)/ });
  await expect(nextDayButton).toBeEnabled();
  await nextDayButton.click();
}

export async function completeCycleDays(page, labelsOrCount = 6, label = 'Fet') {
  const labels = Array.isArray(labelsOrCount)
    ? labelsOrCount
    : Array.from({ length: labelsOrCount }, () => label);

  for (const day of labels) {
    const dayLabel = typeof day === 'string' ? day : day.label;
    const note = typeof day === 'string' ? '' : day.note || '';
    await markToday(page, dayLabel, note);
    await openNextActionDay(page);
  }
}

export async function closeRestDay(page) {
  await advanceClock(page, { days: 1, minutes: 1 });
  const closeButton = page.getByRole('button', { name: 'Tancar el cicle' });
  await expect(closeButton).toBeEnabled();
  await closeButton.click();
}

export async function acknowledgeTransition(page, previousCycle) {
  await expect(page.getByText(`Has acabat el cicle ${previousCycle}.`)).toBeVisible();
  await page.getByRole('button', { name: 'Obrir la prova d’avui' }).click();
}

export async function completeDiagnostic(page, optionIndex = 2) {
  for (let step = 1; step <= 5; step += 1) {
    await expect(page.getByLabel(`Pas ${step} de 5`)).toBeVisible();
    const options = page.locator('.v2-option');
    const optionCount = await options.count();
    await options.nth(Math.min(optionIndex, optionCount - 1)).click();
  }
}

export function acceptNextDialog(page, expectedMessage) {
  page.once('dialog', async (dialog) => {
    if (expectedMessage) expect(dialog.message()).toContain(expectedMessage);
    await dialog.accept();
  });
}
