"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function PaketPage() {
  const [paket, setPaket] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quota, setQuota] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const fetchPaket = async () => {
    const { data, error } = await supabase
      .from("packages")
      .select("id, name, price, quota");

    if (!error) setPaket(data || []);
  };

  useEffect(() => {
    fetchPaket();
  }, []);

  const handleSubmit = async () => {
    if (!name || !price) return;

    if (editId) {
      await supabase
        .from("packages")
        .update({
          name,
          price: Number(price),
          quota: Number(quota),
        })
        .eq("id", editId);

      setEditId(null);
    } else {
      await supabase.from("packages").insert([
        {
          name,
          price: Number(price),
          quota: Number(quota),
        },
      ]);
    }

    setName("");
    setPrice("");
    setQuota("");
    fetchPaket();
  };

  const handleEdit = (p: any) => {
    setName(p.name);
    setPrice(p.price.toString());
    setQuota(p.quota?.toString() || "");
    setEditId(p.id);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("packages").delete().eq("id", id);
    fetchPaket();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>Paket Umroh</h1>

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
        <h3 style={{ marginBottom: 10 }}>
          {editId ? "Edit Paket" : "Tambah Paket"}
        </h3>

        <div style={{ display: "flex", gap: 10 }}>
          <input
            placeholder="Nama Paket"
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
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              padding: 10,
              border: "1px solid #ccc",
              borderRadius: 6,
              flex: 1,
            }}
          />

          <input
            placeholder="Kuota"
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
            style={{
              padding: 10,
              border: "1px solid #ccc",
              borderRadius: 6,
              width: 120,
            }}
          />

          <button
            onClick={handleSubmit}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "10px 15px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {editId ? "Update" : "Simpan"}
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
        <h3 style={{ marginBottom: 10 }}>Daftar Paket</h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th style={{ padding: 10, textAlign: "left" }}>Nama</th>
              <th style={{ padding: 10 }}>Harga</th>
              <th style={{ padding: 10 }}>Kuota</th>
              <th style={{ padding: 10 }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {paket.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: 10 }}>
                  Belum ada paket
                </td>
              </tr>
            ) : (
              paket.map((p) => (
                <tr key={p.id}>
                  <td style={{ padding: 10 }}>{p.name}</td>
                  <td style={{ padding: 10 }}>Rp {p.price}</td>
                  <td style={{ padding: 10 }}>{p.quota || "-"}</td>
                  <td style={{ padding: 10 }}>
                    <button
                      onClick={() => handleEdit(p)}
                      style={{
                        background: "#f59e0b",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: 6,
                        marginRight: 5,
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
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