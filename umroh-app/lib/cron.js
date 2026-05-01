import { supabase } from "./supabaseClient";

const INTERVAL_MS = 60 * 1000; // 1 menit (untuk testing, nanti bisa 1 jam)

export function startCron() {
  if (global.__CRON_STARTED__) return;
  global.__CRON_STARTED__ = true;

  console.log("🔥 Auto Follow Up Cron Running...");

  setInterval(async () => {
    try {
      // ambil leads yang belum closing
      const { data: leads, error } = await supabase
        .from("leads")
        .select("*")
        .neq("status", "closing");

      if (error) {
        console.error("Fetch leads error:", error);
        return;
      }

      const now = new Date();

      for (const lead of leads) {
        const last = lead.last_followup_at
          ? new Date(lead.last_followup_at)
          : null;

        const diffMinutes = last
          ? (now - last) / 1000 / 60
          : 999;

        // 🔥 RULE: kirim kalau > 30 menit
        if (!last || diffMinutes > 30) {
          const message = `Halo ${lead.name} 🙏

Kami follow up kembali ya kak 😊
Apakah masih ada yang ingin ditanyakan terkait umroh?

Kami siap bantu sampai berangkat ✈️`;

          // kirim WA
          await fetch("http://localhost:3000/api/send-wa", {
            method: "POST",
            body: JSON.stringify({
              phone: lead.phone,
              message,
            }),
          });

          // update timestamp
          await supabase
            .from("leads")
            .update({
              last_followup_at: new Date().toISOString(),
              status: "followup",
            })
            .eq("id", lead.id);

          console.log("Follow up sent:", lead.name);
        }
      }
    } catch (err) {
      console.error("Cron error:", err);
    }
  }, INTERVAL_MS);
}