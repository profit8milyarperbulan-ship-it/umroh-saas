"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function LandingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    alert("🔥 BUTTON KEKLIK");

    if (!name || !phone) {
      alert("Isi dulu nama & nomor WA");
      return;
    }

    setLoading(true);

    try {
      // 🔥 bikin client DI DALAM FUNCTION (PENTING)
      const supabase = createClient(
        "https://vpenzzxmmnaclvkrclwv.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZW56enhtbW5hY2x2a3JjbHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MTk0OTksImV4cCI6MjA5MzE5NTQ5OX0.1hTuTG8Y3vhopYgSvDnAPpYRkmSoGjOkrK8DCrmAFGY"
      );

      const { data, error } = await supabase.from("leads").insert([
        {
          name: name,
          phone: phone,
        },
      ]);

      if (error) {
        console.error(error);
        alert("❌ Gagal masuk ke database");
      } else {
        alert("✅ Data masuk!");
        setName("");
        setPhone("");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error system");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: 350,
          background: "#fff",
          padding: 24,
          borderRadius: 8,
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          Daftar Umroh Sekarang ✨
        </h3>

        <input
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />

        <input
          placeholder="No WhatsApp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 12,
            background: "green",
            color: "#fff",
            border: "none",
          }}
        >
          {loading ? "Mengirim..." : "Daftar Sekarang"}
        </button>
      </div>
    </div>
  );
}