'use client'

import { useEffect, useState } from 'react'
import { getOrg } from '@/lib/getOrg'

export default function ReminderPage() {
  const [org, setOrg] = useState<any>(null)

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const o = await getOrg()
    setOrg(o)
  }

  async function kirim() {
    await fetch('/api/send-wa', {
      method: 'POST'
    })

    alert('WA terkirim')
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-xl mb-4">Reminder</h1>

      <button
        onClick={kirim}
        className="bg-green-600 text-white px-4 py-2"
      >
        Kirim WA
      </button>
    </div>
  )
}