import { expect, test } from '@playwright/test';
import {
  acknowledgeTransition,
  completeCycleDays,
  prepareFreshPage,
  startStarterAction,
} from './helpers/arrel.js';

test('coach mentions long-term consistency in cycle 2', async ({ page }) => {
  await prepareFreshPage(page);
  await startStarterAction(page);

  // Cicle 1: Fem 6 dies "Fet" amb notes
  await completeCycleDays(page, [
    { label: 'Fet', note: 'M’ha anat molt bé.' },
    { label: 'Fet', note: 'Continuo amb ganes.' },
    { label: 'Fet', note: 'M’agrada el ritme.' },
    { label: 'Fet', note: 'Fet sense problemes.' },
    { label: 'Fet', note: 'Molt fluït avui.' },
    { label: 'Fet', note: 'Acabo el cicle content.' },
  ]);

  // Tancament de cicle i generació de lectura
  await page.getByRole('button', { name: 'Generar lectura personal' }).click();
  
  // Avancem el rellotge per poder tancar el cicle (Day 7 -> Day 1 del següent)
  await page.clock.fastForward(24 * 60 * 60 * 1000); // 1 dia
  await page.reload();

  const closeButton = page.getByRole('button', { name: 'Tancar el cicle' });
  await expect(closeButton).toBeVisible();
  await closeButton.click();

  // Ara som a la pantalla de transició
  await acknowledgeTransition(page, 1);

  // Ara ja som al cicle 2, dia 1
  await expect(page.getByText('Cicle 2')).toBeVisible();
  await expect(page.getByText('Dia 1')).toBeVisible();

  // Verifiquem que el missatge del coach al cicle 2 (dia 1) menciona la constància del cicle 1
  await expect(page.getByText(/Has mantingut una constància excel·lent durant l’últim cicle/)).toBeVisible();
});
