import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:5301',
    timezoneId: 'Europe/Madrid',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'mobile-chromium',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 375, height: 812 },
        browserName: 'chromium',
      },
    },
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5301',
    url: 'http://127.0.0.1:5301/inici',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
