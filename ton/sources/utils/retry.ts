const MAX_TRIES = 5,
      DELAY = 1000;

export const sleep = (ms = DELAY) => new Promise((r) => setTimeout(r, ms));

export async function must<T>(fn: () => Promise<T>, maxTries = MAX_TRIES, delay = DELAY): Promise<T> {
    let i = 0;
    let err = null;
    while (i < maxTries) {
        try {
            const result = await fn();
            return result;
        } catch(error) {
            err = error;
            i++;
        }

        await sleep(delay);
    }

    throw err
}