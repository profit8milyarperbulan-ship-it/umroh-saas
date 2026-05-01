"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

declare global {
  interface Window {
    fbq: any;
  }
}

export default function LandingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔥 LOAD META PIXEL
  useEffect(() => {
    // inject script pixel
    !(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    window.fbq("init", "23892268963740895"); // 👉 GANTI
    window.fbq("track", "PageView");
  }, []);

  const handleSubmit = async () => {
    if (!name || !phone) return alert("Isi semua data");

    setLoading(true);

    // simpan ke DB
    await supabase.from("leads").insert([
      {
        name,
        phone,
        source: "landing_page",
        status: "new",
      },
    ]);

    // 🔥 TRACK LEAD KE META
    if (window.fbq) {
      window.fbq("track", "Lead", {
  content_name: "Umroh Form Submit",
  value: 5000000, // asumsi potensi DP
  currency: "IDR",
});
    }

    // kirim WA
    const message = `Halo ${name} 🙏

Terima kasih sudah mendaftar program umroh 😊
Tim kami akan segera menghubungi Anda ya kak.`;

    await fetch("/api/send-wa", {
      method: "POST",
      body: JSON.stringify({
        phone,
        message,
      }),
    });

    setLoading(false);
    setSuccess(true);
    setName("");
    setPhone("");
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1>🕌 Umroh Nyaman & Hemat</h1>
      <p>Kuota terbatas! Daftar sekarang sebelum penuh.</p>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          placeholder="No WhatsApp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: 6,
          }}
        >
          {loading ? "Loading..." : "📲 Daftar Sekarang"}
        </button>
      </div>

      {success && (
        <p style={{ color: "green", marginTop: 10 }}>
          ✅ Berhasil! Tim kami akan menghubungi Anda.
        </p>
      )}
    </div>
  );
}