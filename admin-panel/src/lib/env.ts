import { z } from "zod";

/**
 * Единственное место, где читается process.env. Падаем на старте с внятным
 * сообщением, а не в рантайме на первом запросе к базе.
 */
const schema = z.object({
  DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET: минимум 32 символа"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const details = z.prettifyError(parsed.error);
  throw new Error(`Некорректные переменные окружения:\n${details}`);
}

export const env = parsed.data;
