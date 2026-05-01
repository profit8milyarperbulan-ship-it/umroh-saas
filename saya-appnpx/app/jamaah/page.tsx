'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { getOrg } from '@/lib/getOrg'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function JamaahPage() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const org = await getOrg()
    if (!org) return

    const { data } = await supabase
      .from('jamaah')
      .select('*')
      .eq('organization_id', org.id)

    setData(data || [])
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-xl font-bold mb-4">Jamaah</h1>

      <table className="w-full bg-white">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((j) => (
            <tr key={j.id}>
              <td>{j.name}</td>
              <td>{j.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}