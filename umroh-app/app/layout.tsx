import "./globals.css";
import Link from "next/link";

// 🔥 import cron
import { startCron } from "../lib/cron";

// jalanin cron di server
if (typeof window === "undefined") {
  startCron();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body style={{ margin: 0, fontFamily: "Arial" }}>
        <div style={{ display: "flex" }}>
          {/* SIDEBAR */}
          <div
            style={{
              width: 200,
              background: "#1e293b",
              color: "#fff",
              minHeight: "100vh",
              padding: 20,
            }}
          >
            <h2>Umroh App</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/">Dashboard</Link></li>
              <li><Link href="/paket">Paket</Link></li>
              <li><Link href="/leads">Leads</Link></li>
              <li><Link href="/jamaah">Jamaah</Link></li>
              <li><Link href="/payments">Payments</Link></li>
            </ul>
          </div>

          {/* CONTENT */}
          <div style={{ flex: 1, padding: 20 }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}