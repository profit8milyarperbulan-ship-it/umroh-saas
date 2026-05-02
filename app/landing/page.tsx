"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://vpenzzxmmnaclvkrclwv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZW56enhtbW5hY2x2a3JjbHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MTk0OTksImV4cCI6MjA5MzE5NTQ5OX0.1hTuTG8Y3vhopYgSvDnAPpYRkmSoGjOkrK8DCrmAFGY"
);

export default function LandingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    alert("🔥 BUTTON KEKLIK"); // TEST CLICK

    console.log("🔥 HANDLE SUBMIT KEJALAN");
    console.log("DATA:", name, phone);

    if (!name || !phone) {
      alert("Isi dulu nama & nomor WA");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("leads")
      .insert([{ name, phone }]);

    console.log("HASIL:", data);
    console.log("ERROR:", error);

    setLoading(false);

    if (error) {
      alert("❌ Gagal masuk: " + error.message);
    } else {
      alert("✅ Data masuk! Tim kami akan hubungi Anda");

      setName("");
      setPhone("");
    }
  };

  return (
    <div style={{ fontFamily: "Arial" }}>
      {/* HEADER */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <b>Travel Barokah</b>
          <div style={{ fontSize: "12px" }}>Sistem Umroh</div>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <a href="#">Jamaah</a>
          <a href="#">Booking</a>
          <a href="#">Payments</a>
          <a href="#">Dashboard</a>
          <a href="#">Settings</a>
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
        }}
      >
        <div
          style={{
            width: "350px",
            background: "#fff",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            Daftar Umroh Sekarang ✨
          </h3>

          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
            }}
          />

          <input
            type="text"
            placeholder="No WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
            }}
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "12px",
              background: "green",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Mengirim..." : "Daftar Sekarang"}
          </button>
        </div>
      </div>
    </div>
  );
}