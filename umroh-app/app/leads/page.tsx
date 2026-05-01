"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);

  const fetchLeads = async () => {
    const { data } = await supabase.from("leads").select("*");
    setLeads(data || []);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // 🔥 HITUNG SCORING
  const getScore = (lead: any) => {
    if (!lead.last_followup_at) return "cold";

    const last = new Date(lead.last_followup_at);
    const now = new Date();

    const diffMinutes = (now.getTime() - last.getTime()) / 1000 / 60;

    if (diffMinutes < 30) return "hot";
    if (diffMinutes < 120) return "warm";
    return "cold";
  };

  // warna badge
  const getColor = (score: string) => {
    if (score === "hot") return "red";
    if (score === "warm") return "orange";
    return "gray";
  };

  // 🔥 AUTO FOLLOW UP MANUAL (opsional klik)
  const followUpNow = async (lead: any) => {
    const message = `Halo ${lead.name} 🙏

Kami follow up kembali ya kak 😊
Apakah masih tertarik umroh?`;

    await fetch("/api/send-wa", {
      method: "POST",
      body: JSON.stringify({
        phone: lead.phone,
        message,
      }),
    });

    await supabase
      .from("leads")
      .update({
        last_followup_at: new Date().toISOString(),
        status: "followup",
      })
      .eq("id", lead.id);

    fetchLeads();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🔥 Leads Scoring System</h1>

      {leads.map((l) => {
        const score = getScore(l);

        return (
          <div
            key={l.id}
            style={{
              background: "#fff",
              padding: 15,
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <b>{l.name}</b>
            <p>{l.phone}</p>
            <p>Status: {l.status}</p>

            {/* 🔥 BADGE */}
            <span
              style={{
                background: getColor(score),
                color: "#fff",
                padding: "4px 10px",
                borderRadius: 6,
                marginRight: 10,
              }}
            >
              {score.toUpperCase()}
            </span>

            {/* ACTION */}
            <button onClick={() => followUpNow(l)}>
              Follow Up Sekarang
            </button>
          </div>
        );
      })}
    </div>
  );
}