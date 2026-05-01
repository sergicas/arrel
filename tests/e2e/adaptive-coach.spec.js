import { expect, test } from '@playwright/test';
import {
  markToday,
  openNextActionDay,
  prepareFreshPage,
  startStarterAction,
} from './helpers/arrel.js';

test('coach adapts the next day action based on yesterday feedback', async ({ page }) => {
  await prepareFreshPage(page);
  await startStarterAction(page);

  // Dia 1: Marquem amb molta fricció i una nota de fatiga
  await markToday(page, 'Ho deixo per avui', 'M’he sentit molt cansat i m’ha costat.');

  // Obrim el dia 2 fent servir el helper
  await openNextActionDay(page);

  // Verifiquem que el missatge del coach apareix
  await expect(page.getByText(/Ahir vas notar que la prova/)).toBeVisible();
  await expect(page.getByText('Prova adaptada')).toBeVisible();

  // Verifiquem que l'acció és la versió "suau" (nextSmallStep del dia 2 de Calma)
  // El dia 2 de Calma normal és "Apaga les notificacions..."
  // El nextSmallStep és "posa el mòbil en silenci tres minuts..."
  await expect(page.getByText(/posa el mòbil en silenci tres minuts/)).toBeVisible();
});
