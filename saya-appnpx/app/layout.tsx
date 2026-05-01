'use client'

import './globals.css'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// 🔥 pakai org kamu
const ORG_ID = 'e62d58e6-d4b3-4bd9-8acd-7a50049f04e1'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [org, setOrg] = useState<any>(null)

  useEffect(() => {
    fetchOrg()
  }, [])

  async function fetchOrg() {
    const { data } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', ORG_ID)
      .single()

    if (data) setOrg(data)
  }

  return (
    <html lang="en">
      <body className="bg-black text-white">

        {/* HEADER */}
        <div className="bg-white text-black px-6 py-4 flex items-center justify-between shadow">

          <div className="flex items-center gap-3">
            {org?.logo_url && (
              <img src={org.logo_url} className="h-10" />
            )}
            <div>
              <p className="font-bold text-lg">
                {org?.name || 'Nama Travel'}
              </p>
              <p className="text-xs text-gray-500">
                Sistem Umroh
              </p>
            </div>
          </div>

          {/* NAV */}
          <div className="flex gap-4 text-sm">
            <Link href="/jamaah">Jamaah</Link>
            <Link href="/bookings">Booking</Link>
            <Link href="/payments">Payments</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/settings">Settings</Link>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {children}
        </div>

      </body>
    </html>
  )
}