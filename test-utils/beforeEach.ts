import { dismissCookieBanner } from './cookieBanner';

// Pauses for the desired amount of time.
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Runs prior to each test fixture and..,
// 1. Waits for the page to fully load and render.
// 2. Confirms the Cookie banner has displayed, and dismisses it.
export async function beforeEach() : Promise<void> {
    await sleep(10000);
    await dismissCookieBanner();
}