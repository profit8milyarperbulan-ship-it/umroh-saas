"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function PaymentsPage() {
  const [jamaah, setJamaah] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [selectedJamaah, setSelectedJamaah] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("dp");

  // 🔄 ambil data jamaah
  const fetchJamaah = async () => {
    const { data, error } = await supabase
      .from("jamaah")
      .select("id, name");

    if (error) {
      console.log("ERROR JAMAah:", error.message);
    } else {
      setJamaah(data || []);
    }
  };

  // 🔄 ambil data payment (FIX ERROR DI SINI)
  const fetchPayments = async () => {
    const { data, error } = await supabase
      .from("payments")
      .select("id, jamaah_id, amount, type, created_at");

    if (error) {
      console.log("ERROR FETCH PAYMENT:", error.message);
    } else {
      setPayments(data || []);
    }
  };

  useEffect(() => {
    fetchJamaah();
    fetchPayments();
  }, []);

  // ➕ tambah pembayaran
  const tambahPayment = async () => {
    if (!selectedJamaah || !amount) return;

    const { error } = await supabase.from("payments").insert([
      {
        jamaah_id: selectedJamaah,
        amount: Number(amount),
        type,
      },
    ]);

    if (error) {
      console.log("ERROR INSERT:", error.message);
    } else {
      setAmount("");
      fetchPayments();
    }
  };

  // 💰 hitung total
  const total = payments.reduce(
    (acc, p) => acc + Number(p.amount),
    0
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Payments</h1>

      {/* FORM */}
      <div className="mb-4">
        <select
          className="border p-2 mr-2"
          value={selectedJamaah}
          onChange={(e) => setSelectedJamaah(e.target.value)}
        >
          <option value="">Pilih Jamaah</option>
          {jamaah.map((j) => (
            <option key={j.id} value={j.id}>
              {j.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Jumlah"
          className="border p-2 mr-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="border p-2 mr-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="dp">DP</option>
          <option value="lunas">Pelunasan</option>
        </select>

        <button
          onClick={tambahPayment}
          className="bg-green-600 text-white px-4 py-2"
        >
          Simpan
        </button>
      </div>

      {/* TOTAL */}
      <div className="mb-4">
        <h2 className="font-bold">Total Masuk:</h2>
        <p>Rp {total}</p>
      </div>

      {/* LIST */}
      <div className="bg-white p-4 rounded shadow">
        {payments.length === 0 ? (
          <p>Belum ada pembayaran</p>
        ) : (
          payments.map((p) => (
            <div key={p.id} className="border-b py-2">
              <p>Jamaah ID: {p.jamaah_id}</p>
              <p>Rp {p.amount}</p>
              <p>{p.type}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}