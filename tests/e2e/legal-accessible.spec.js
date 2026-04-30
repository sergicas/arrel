import { expect, test } from '@playwright/test';
import {
  makeActiveState,
  prepareFreshPage,
  seedState,
} from './helpers/arrel.js';

async function expectPrivacy(page) {
  await expect(page).toHaveURL(/\/legal\/privacitat$/);
  await expect(page.getByRole('heading', { name: 'Les teves dades es queden al teu dispositiu.' })).toBeVisible();
}

async function expectTerms(page) {
  await expect(page).toHaveURL(/\/legal\/termes$/);
  await expect(page.getByRole('heading', { name: 'Proves generals, no consell professional.' })).toBeVisible();
}

test('landing footer links to privacy and can switch to terms', async ({ page }) => {
  await prepareFreshPage(page);

  await page.getByRole('link', { name: 'Privacitat' }).click();
  await expectPrivacy(page);

  await page.getByRole('link', { name: 'Termes d’ús' }).click();
  await expectTerms(page);

  await page.getByRole('link', { name: 'Privacitat' }).click();
  await expectPrivacy(page);
});

test('about page exposes legal information', async ({ page }) => {
  await seedState(page, makeActiveState(), '/menu/sobre');

  await page.getByRole('link', { name: 'Privacitat i termes' }).click();
  await expectPrivacy(page);
  await page.getByRole('link', { name: 'Termes d’ús' }).click();
  await expectTerms(page);
});

test('menu exposes legal information', async ({ page }) => {
  await seedState(page, makeActiveState(), '/menu');

  await page.getByRole('link', { name: 'Privacitat' }).click();
  await expectPrivacy(page);
  await page.getByRole('link', { name: 'Termes d’ús' }).click();
  await expectTerms(page);
});
