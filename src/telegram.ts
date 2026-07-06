import type { CartItem } from "./store";
import { formatPrice } from "./data";
import type { TgUser } from "./telegramWebApp";

// NOTE: In production, secrets like a bot token should NEVER be shipped in a
// client bundle. This is here per the user's request for a demo/prototype.
const TELEGRAM_BOT_TOKEN = "8822852010:AAFf3tOSupVet3t2zW8qlQCLiQmQoV9XxH0";
const TELEGRAM_CHANNEL = "@sokphengnetcafe";

export type OrderPayload = {
  invoice: string;
  customerName: string;
  customerPhone: string;
  method: "pickup" | "delivery";
  items: CartItem[];
  total: number;
  note?: string;
  createdAt: Date;
  tgUser?: TgUser | null;
};

function buildMessage(o: OrderPayload): string {
  const linesArr: string[] = [];
  linesArr.push("🧾 *NEW ORDER — NT26 Coffee*");
  linesArr.push("");
  linesArr.push(`🧾 Invoice: \`${o.invoice}\``);
  linesArr.push(`🕒 ${o.createdAt.toLocaleString()}`);
  linesArr.push(`🚚 Method: ${o.method === "pickup" ? "Pickup at store" : "Delivery"}`);
  linesArr.push("");
  linesArr.push("*👤 Customer*");
  linesArr.push(`Name: ${o.customerName}`);
  linesArr.push(`Phone: ${o.customerPhone || "-"}`);
  if (o.tgUser) {
    const handle = o.tgUser.username ? `@${o.tgUser.username}` : `id ${o.tgUser.id}`;
    linesArr.push(`Telegram: ${handle}`);
  }
  linesArr.push("");
  linesArr.push("*🛒 Items*");
  o.items.forEach((it, i) => {
    const unit = it.product.price + it.optionsPrice;
    linesArr.push(`${i + 1}. ${it.product.nameKh} × ${it.qty} — ${formatPrice(unit * it.qty)}`);
    if (it.options.length) linesArr.push(`   • ${it.options.join(", ")}`);
  });
  linesArr.push("");
  linesArr.push(`*💰 Total: ${formatPrice(o.total)}*`);
  if (o.note) {
    linesArr.push("");
    linesArr.push(`📝 Note: ${o.note}`);
  }
  return linesArr.join("\n");
}

/** Send a plain text message to the channel. */
export async function sendTelegramMessage(text: string): Promise<boolean> {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHANNEL,
        text,
        parse_mode: "Markdown",
      }),
    });
    const data = await res.json();
    return !!data.ok;
  } catch (e) {
    console.error("Telegram send error", e);
    return false;
  }
}

/** Send a photo (data URL) with caption to the channel. */
export async function sendTelegramPhoto(dataUrl: string, caption: string): Promise<boolean> {
  try {
    // Convert data URL to Blob
    const blob = await (await fetch(dataUrl)).blob();
    const form = new FormData();
    form.append("chat_id", TELEGRAM_CHANNEL);
    form.append("caption", caption);
    form.append("parse_mode", "Markdown");
    form.append("photo", blob, "receipt.png");

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
    const res = await fetch(url, { method: "POST", body: form });
    const data = await res.json();
    return !!data.ok;
  } catch (e) {
    console.error("Telegram photo error", e);
    return false;
  }
}

/** High-level: submit an order. Sends photo if provided, otherwise text. */
export async function submitOrder(order: OrderPayload, receiptImage?: string): Promise<boolean> {
  const message = buildMessage(order);
  if (receiptImage) {
    // Telegram caption max ~1024 chars; the message is short so it's fine.
    const ok = await sendTelegramPhoto(receiptImage, message);
    if (ok) return true;
    // Fallback to text-only
  }
  return sendTelegramMessage(message);
}

export { buildMessage };
