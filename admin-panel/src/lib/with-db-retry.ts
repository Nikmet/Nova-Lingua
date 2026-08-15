/**
 * На части сетей (например, с включённым VPN) соединение до базы рвётся
 * посреди многошаговой транзакции — pg тогда бросает «Client has encountered
 * a connection error and is not queryable». Одиночные запросы почти не ловят
 * этот обрыв, а write'ы со вложенными связями (несколько операторов в одной
 * транзакции, например создание Группы с составом Учеников) — ловят
 * регулярно. Повтор почти всегда помогает, поэтому оборачиваем только такие
 * write'ы, не все запросы подряд.
 */
export async function withDbRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (!isRetryableConnectionError(error)) throw error;
    }
  }
  throw lastError;
}

function isRetryableConnectionError(error: unknown): boolean {
  return error instanceof Error && error.message.includes("not queryable");
}
