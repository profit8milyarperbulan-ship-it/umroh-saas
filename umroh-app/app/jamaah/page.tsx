"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function JamaahPage() {
  const [jamaah, setJamaah] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const fetchJamaah = async () => {
    const { data, error } = await supabase
      .from("jamaah")
      .select("id, name, phone");

    if (!error) setJamaah(data || []);
  };

  useEffect(() => {
    fetchJamaah();
  }, []);

  const tambahJamaah = async () => {
    if (!name || !phone) return;

    await supabase.from("jamaah").insert([
      {
        name,
        phone,
      },
    ]);

    setName("");
    setPhone("");
    fetchJamaah();
  };

  const hapusJamaah = async (id: string) => {
    await supabase.from("jamaah").delete().eq("id", id);
    fetchJamaah();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>Jamaah</h1>

      {/* FORM */}
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginBottom: 20,
        }}
      >
        <h3 style={{ marginBottom: 10 }}>Tambah Jamaah</h3>

        <div style={{ display: "flex", gap: 10 }}>
          <input
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: 10,
              border: "1px solid #ccc",
              borderRadius: 6,
              flex: 1,
            }}
          />

          <input
            placeholder="No WA"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              padding: 10,
              border: "1px solid #ccc",
              borderRadius: 6,
              flex: 1,
            }}
          />

          <button
            onClick={tambahJamaah}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "10px 15px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Simpan
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: 10 }}>Data Jamaah</h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th style={{ padding: 10, textAlign: "left" }}>Nama</th>
              <th style={{ padding: 10, textAlign: "left" }}>No WA</th>
              <th style={{ padding: 10, textAlign: "left" }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {jamaah.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: 10 }}>
                  Belum ada data
                </td>
              </tr>
            ) : (
              jamaah.map((j) => (
                <tr key={j.id}>
                  <td style={{ padding: 10 }}>{j.name}</td>
                  <td style={{ padding: 10 }}>{j.phone}</td>
                  <td style={{ padding: 10 }}>
                    <button
                      onClick={() => hapusJamaah(j.id)}
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}