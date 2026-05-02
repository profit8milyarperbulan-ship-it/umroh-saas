"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 🔥 GANTI DENGAN PUNYA NDORO
const supabase = createClient(
  "https://vpenzzxmmnaclvkrclwv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZW56enhtbW5hY2x2a3JjbHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MTk0OTksImV4cCI6MjA5MzE5NTQ5OX0.1hTuTG8Y3vhopYgSvDnAPpYRkmSoGjOkrK8DCrmAFGY"
);

export default function LandingPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    console.log("SUBMIT JALAN");

    const name = e.target.name.value;
    const phone = e.target.phone.value;

    const { error } = await supabase.from("leads").insert([
      {
        name,
        phone,
      },
    ]);

    console.log("ERROR:", error);

    if (error) {
      alert("Gagal menyimpan ❌");
    } else {
      alert("Data masuk 👍 Tim kami akan hubungi Anda");
      e.target.reset();
    }

    setLoading(false);
  };

  return (
    <div>
      {/* HEADER */}
      <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
        <h2>Nama Travel</h2>
        <small>Sistem Umroh</small>
      </div>

      {/* FORM */}
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "8px",
            width: "300px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>
            Daftar Umroh Sekarang ✨
          </h3>

          <input
            name="name"
            placeholder="Nama"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
            }}
          />

          <input
            name="phone"
            placeholder="No WhatsApp"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "green",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Mengirim..." : "Daftar Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
}