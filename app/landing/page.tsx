"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LandingPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const phone = e.target.phone.value;

    const { error } = await supabase.from("leads").insert([
      {
        name,
        phone,
      },
    ]);

    if (error) {
      alert("Gagal kirim ❌");
      console.error(error);
    } else {
      alert("Data masuk 👍 Tim kami akan hubungi Anda");
      e.target.reset();
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Daftar Umroh Sekarang ✨</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <input
          name="name"
          placeholder="Nama"
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          name="phone"
          placeholder="No WhatsApp"
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            background: "green",
            color: "white",
          }}
        >
          {loading ? "Mengirim..." : "Daftar Sekarang"}
        </button>
      </form>
    </div>
  );
}