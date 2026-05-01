'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LandingPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!name || !phone) {
      alert('Nama & WA wajib diisi')
      return
    }

    setLoading(true)

    await supabase.from('jamaah').insert([
      {
        name,
        phone,
        status: 'lead'
      }
    ])

    setLoading(false)
    setName('')
    setPhone('')

    alert('Data masuk 👍 Tim kami akan hubungi Anda')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">

        <h1 className="text-xl font-bold mb-4 text-center">
          Daftar Umroh Sekarang ✨
        </h1>

        <input
          placeholder="Nama"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          placeholder="No WhatsApp"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="bg-green-600 text-white w-full py-2"
        >
          {loading ? 'Mengirim...' : 'Daftar Sekarang'}
        </button>

      </div>
    </div>
  )
}