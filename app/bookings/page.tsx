'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { getOrg } from '@/lib/getOrg'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function BookingPage() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const org = await getOrg()
    if (!org) return

    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('organization_id', org.id)

    setData(data || [])
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-xl font-bold mb-4">Bookings</h1>

      <table className="w-full bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.total_price}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}