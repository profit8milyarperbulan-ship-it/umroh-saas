'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// 🔥 GANTI DENGAN ID ORGANIZATION KAMU
const ORG_ID = 'ISI_ORG_ID_KAMU'

const columns = [
  { key: 'lead', label: 'Lead' },
  { key: 'follow_up', label: 'Follow Up' },
  { key: 'closing', label: 'Closing' },
  { key: 'lunas', label: 'Lunas' }
]

// 🔥 AI MESSAGE
function generateMessage(name: string, status: string) {
  const followUp = [
    `Assalamu'alaikum ${name}, kami follow up terkait umroh 😊`,
    `${name}, apakah sudah ada waktu untuk diskusi paket?`,
    `Halo ${name}, kami siap bantu perjalanan umroh Anda 🙏`
  ]

  const closing = [
    `${name}, seat mulai terbatas, mau kami bantu booking sekarang?`,
    `${name}, banyak jamaah sudah DP, jangan sampai kehabisan ya`,
    `Kami bisa amankan slot ${name} hari ini 🙏`
  ]

  const lunas = [
    `MasyaAllah ${name}, pembayaran sudah kami terima 🙏`,
    `${name}, insyaAllah kita berangkat ke Baitullah 🤍`
  ]

  function random(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  if (status === 'follow_up') return random(followUp)
  if (status === 'closing') return random(closing)
  if (status === 'lunas') return random(lunas)

  return ''
}

export default function PipelinePage() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data } = await supabase
      .from('jamaah')
      .select('*')
      .eq('organization_id', ORG_ID) // 🔥 FILTER SAAS
      .order('created_at', { ascending: false })

    setData(data || [])
  }

  async function sendWA(phone: string, message: string) {
    await fetch('/api/send-wa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message })
    })
  }

  async function moveStatus(item: any, newStatus: string) {
    await supabase
      .from('jamaah')
      .update({
        status: newStatus
      })
      .eq('id', item.id)
      .eq('organization_id', ORG_ID) // 🔥 AMAN SAAS

    const message = generateMessage(item.name, newStatus)

    if (message) {
      await sendWA(item.phone, message)
    }

    fetchData()
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">
        Pipeline Closing (SaaS Ready)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {columns.map((col) => (
          <div key={col.key} className="bg-gray-100 p-3 rounded">

            <h2 className="font-bold mb-3">{col.label}</h2>

            <div className="space-y-2">
              {data
                .filter((d) => d.status === col.key)
                .map((d) => (
                  <div key={d.id} className="bg-white p-3 rounded shadow">
                    <p className="font-semibold">{d.name}</p>
                    <p className="text-sm">{d.phone}</p>

                    <div className="mt-2 flex gap-1 flex-wrap">
                      {columns.map((c) => (
                        <button
                          key={c.key}
                          onClick={() => moveStatus(d, c.key)}
                          className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}