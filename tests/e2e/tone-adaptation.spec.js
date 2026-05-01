import { expect, test } from '@playwright/test';
import {
  markToday,
  openNextActionDay,
  prepareFreshPage,
  startStarterAction,
} from './helpers/arrel.js';

test('coach adapts tone to concise user', async ({ page }) => {
  await prepareFreshPage(page);
  await startStarterAction(page);

  // Dia 1, 2, 3: Feedback sense notes (estil concís)
  await markToday(page, 'Fet', '');
  await openNextActionDay(page);
  await markToday(page, 'Fet', '');
  await openNextActionDay(page);
  await markToday(page, 'Fet', '');
  await openNextActionDay(page);

  // Dia 4: Verifiquem que el missatge del coach és concís
  // El missatge per defecte en concís és "Seguim amb la prova d’avui."
  await expect(page.getByText('Seguim amb la prova d’avui.')).toBeVisible();
});

test('coach adapts tone to reflective user', async ({ page }) => {
  await prepareFreshPage(page);
  await startStarterAction(page);

  // Dia 1, 2, 3: Feedback amb notes llargues (estil reflexiu)
  await markToday(page, 'Fet', 'Avui m’ha anat molt bé, he sentit que podia fer-ho tot i més.');
  await openNextActionDay(page);
  await markToday(page, 'Fet', 'He estat pensant en com de bé em sento quan faig aquestes proves cada matí.');
  await openNextActionDay(page);
  await markToday(page, 'Fet', 'M’ha costat una mica però al final he trobat el moment ideal per estar tranquil.');
  await openNextActionDay(page);

  // Dia 4: Verifiquem que el missatge del coach és reflexiu
  // El missatge per defecte en reflexiu és "Bon dia! Seguim avançant amb confiança..."
  await expect(page.getByText(/Seguim avançant amb confiança/)).toBeVisible();
});
