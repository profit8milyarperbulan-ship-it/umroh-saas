"use client";

import { useState } from "react";

export default function BuilderPage() {
  const [nama, setNama] = useState("");
  const [hotel, setHotel] = useState("");
  const [maskapai, setMaskapai] = useState("");
  const [durasi, setDurasi] = useState("");
  const [harga, setHarga] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    const text = `
✨ *PAKET UMROH ${nama.toUpperCase()}*

🕌 Hotel: ${hotel}
✈️ Maskapai: ${maskapai}
📅 Durasi: ${durasi} hari

💰 Harga: Rp ${harga}

🔥 Fasilitas:
✔ Hotel dekat masjid
✔ Makan 3x sehari
✔ Tour leader berpengalaman
✔ Handling visa & perlengkapan

🎯 Cocok untuk:
- yang ingin ibadah nyaman
- keluarga
- jamaah pertama kali

📲 Daftar sekarang sebelum kuota habis!
    `;

    setResult(text);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🧠 Umroh Package Builder</h1>

      <div style={{ marginTop: 20 }}>
        <input placeholder="Nama Paket" onChange={(e) => setNama(e.target.value)} />
        <input placeholder="Hotel" onChange={(e) => setHotel(e.target.value)} />
        <input placeholder="Maskapai" onChange={(e) => setMaskapai(e.target.value)} />
        <input placeholder="Durasi" onChange={(e) => setDurasi(e.target.value)} />
        <input placeholder="Harga" onChange={(e) => setHarga(e.target.value)} />

        <button onClick={generate}>Generate</button>
      </div>

      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </div>
  );
}