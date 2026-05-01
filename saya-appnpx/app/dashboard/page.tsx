'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { getOrg } from '@/lib/getOrg'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>({})

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const org = await getOrg()
    if (!org) return

    const { data: bookings } = await supabase
      .from('bookings')
      .select('*')
      .eq('organization_id', org.id)

    const { data: payments } = await supabase
      .from('payments')
      .select('*')
      .eq('organization_id', org.id)

    let total = 0
    let paid = 0

    bookings?.forEach((b) => {
      total += b.total_price || 0

      const p = payments
        ?.filter((x) => x.booking_id === b.id)
        .reduce((s, x) => s + x.amount, 0) || 0

      paid += p
    })

    setSummary({ total, paid })
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="mt-4">
        <p>Total: {summary.total}</p>
        <p>Paid: {summary.paid}</p>
      </div>
    </div>
  )
}