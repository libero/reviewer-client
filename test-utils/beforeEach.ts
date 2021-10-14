// Pauses for the desired amount of time.
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Handles house keeping prior to running a test fixture
export async function beforeEach() : Promise<void> {
    await sleep(10000);
}