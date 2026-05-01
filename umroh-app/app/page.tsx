"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DashboardPage() {
  const [leads, setLeads] = useState<any[]>([]);

  const fetchLeads = async () => {
    const { data } = await supabase.from("leads").select("*");
    setLeads(data || []);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // 🔥 SCORING
  const getScoreValue = (lead: any) => {
    if (!lead.last_followup_at) return 10;

    const last = new Date(lead.last_followup_at);
    const now = new Date();
    const diff = (now.getTime() - last.getTime()) / 1000 / 60;

    if (diff < 30) return 100; // HOT
    if (diff < 120) return 60; // WARM
    return 20; // COLD
  };

  // 🔥 SORTING (PRIORITAS)
  const sortedLeads = [...leads].sort(
    (a, b) => getScoreValue(b) - getScoreValue(a)
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Dashboard Prioritas Closing</h1>

      <h2 style={{ marginTop: 20 }}>🔥 Leads Paling Potensial</h2>

      <table width="100%" border={1} style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>WA</th>
            <th>Score</th>
            <th>Prioritas</th>
          </tr>
        </thead>

        <tbody>
          {sortedLeads.map((l) => {
            const score = getScoreValue(l);

            let label = "Cold";
            if (score >= 100) label = "HOT";
            else if (score >= 60) label = "WARM";

            return (
              <tr key={l.id}>
                <td>{l.name}</td>
                <td>{l.phone}</td>
                <td>{score}</td>
                <td>{label}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}