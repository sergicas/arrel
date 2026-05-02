import { expect, test } from '@playwright/test';
import {
  completeCycleDays,
  prepareFreshPage,
  startStarterAction,
} from './helpers/arrel.js';

test('app synthesizes a user identity after one cycle', async ({ page }) => {
  await prepareFreshPage(page);
  await startStarterAction(page);

  // Completem un cicle de 6 dies amb notes llargues per ser "Observador Atent"
  await completeCycleDays(page, [
    { label: 'Fet', note: 'Avui m’ha anat molt bé, he sentit que podia fer-ho tot i més.' },
    { label: 'Fet', note: 'He estat pensant en com de bé em sento quan faig aquestes proves.' },
    { label: 'Fet', note: 'M’ha costat una mica però al final he trobat el moment ideal.' },
    { label: 'Fet', note: 'Continuo amb la mateixa energia que el primer dia del cicle.' },
    { label: 'Fet', note: 'M’agrada molt com Arrel m’ajuda a centrar-me en el que importa.' },
    { label: 'Fet', note: 'Acabo el cicle amb una sensació de pau i control molt gran.' },
  ]);

  // Generem lectura
  await page.getByRole('button', { name: 'Generar lectura personal' }).click();

  // Anem al menú (Mapa) i després a Identitat
  await page.getByLabel('Mapa').click();
  await page.getByText('La meva identitat').click();

  // Verifiquem que som a la pàgina d'identitat i l'arquetip és correcte
  await expect(page.getByText('Observador Atent')).toBeVisible();
  await expect(page.getByText('Fortalesa')).toBeVisible();
  await expect(page.getByText('Primer cicle completat')).toBeVisible();
});
