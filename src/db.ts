import { neon } from "@neondatabase/serverless";

// ⚠️ SECURITY: This connection string is exposed in the client bundle.
// For production, proxy DB access through a serverless function.
const DATABASE_URL =
  "postgresql://neondb_owner:npg_mcWpK4nx7bqD@ep-divine-voice-ainbgau3.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(DATABASE_URL);

export type DbUser = {
  id: number;
  name: string;
  phone: string;
  telegram_id: string | null;
  telegram_username: string | null;
  created_at: string;
  last_login_at: string;
};

let schemaReady: Promise<void> | null = null;

/** Create the users table if it doesn't exist. Runs at most once. */
function ensureSchema(): Promise<void> {
  if (schemaReady) return schemaReady;
  schemaReady = (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL UNIQUE,
        telegram_id TEXT,
        telegram_username TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_login_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    // Best-effort orders table for future logging
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id BIGSERIAL PRIMARY KEY,
        invoice TEXT NOT NULL,
        user_phone TEXT NOT NULL,
        user_name TEXT NOT NULL,
        method TEXT NOT NULL,
        total INTEGER NOT NULL,
        items JSONB NOT NULL,
        note TEXT,
        delivery_lat DOUBLE PRECISION,
        delivery_lng DOUBLE PRECISION,
        distance_m DOUBLE PRECISION,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    // Add columns if the table already exists from a previous version.
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_lat DOUBLE PRECISION`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_lng DOUBLE PRECISION`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS distance_m DOUBLE PRECISION`;
  })();
  return schemaReady;
}

/**
 * Insert or update a user by phone. Returns the persisted row.
 */
export async function upsertUser(input: {
  name: string;
  phone: string;
  telegramId?: string | null;
  telegramUsername?: string | null;
}): Promise<DbUser> {
  await ensureSchema();
  const rows = (await sql`
    INSERT INTO users (name, phone, telegram_id, telegram_username, last_login_at)
    VALUES (${input.name}, ${input.phone}, ${input.telegramId ?? null}, ${input.telegramUsername ?? null}, NOW())
    ON CONFLICT (phone) DO UPDATE
      SET name = EXCLUDED.name,
          telegram_id = COALESCE(EXCLUDED.telegram_id, users.telegram_id),
          telegram_username = COALESCE(EXCLUDED.telegram_username, users.telegram_username),
          last_login_at = NOW()
    RETURNING *
  `) as unknown as DbUser[];
  return rows[0];
}

/** Save an order snapshot (best-effort — errors are swallowed). */
export async function saveOrder(order: {
  invoice: string;
  userPhone: string;
  userName: string;
  method: string;
  total: number;
  items: unknown;
  note?: string;
  deliveryLat?: number | null;
  deliveryLng?: number | null;
  distanceM?: number | null;
}): Promise<void> {
  try {
    await ensureSchema();
    await sql`
      INSERT INTO orders (invoice, user_phone, user_name, method, total, items, note, delivery_lat, delivery_lng, distance_m)
      VALUES (
        ${order.invoice},
        ${order.userPhone},
        ${order.userName},
        ${order.method},
        ${order.total},
        ${JSON.stringify(order.items)}::jsonb,
        ${order.note ?? null},
        ${order.deliveryLat ?? null},
        ${order.deliveryLng ?? null},
        ${order.distanceM ?? null}
      )
    `;
  } catch (e) {
    console.error("saveOrder failed", e);
  }
}
