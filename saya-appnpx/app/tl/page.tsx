'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function TLPage() {
  const [packages, setPackages] = useState<any[]>([])
  const [tls, setTls] = useState<any[]>([])
  const [selectedPackage, setSelectedPackage] = useState('')
  const [selectedTL, setSelectedTL] = useState('')
  const [stats, setStats] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data: p } = await supabase.from('packages').select('*')
    const { data: t } = await supabase.from('tour_leaders').select('*')

    const { data: assign } = await supabase
      .from('tl_assignments')
      .select(`
        *,
        tour_leaders (name),
        branches (name)
      `)

    const map: any = {}

    assign?.forEach((a: any) => {
      const name = a.tour_leaders?.name || '-'

      if (!map[name]) {
        map[name] = {
          name,
          total: 0
        }
      }

      map[name].total++
    })

    setPackages(p || [])
    setTls(t || [])
    setStats(Object.values(map))
  }

  async function assignTL() {
    if (!selectedPackage || !selectedTL) {
      alert('Pilih paket & TL')
      return
    }

    // ambil TL data
    const { data: tl } = await supabase
      .from('tour_leaders')
      .select('*')
      .eq('id', selectedTL)
      .single()

    await supabase.from('tl_assignments').insert([
      {
        package_id: selectedPackage,
        tl_id: selectedTL,
        branch_id: tl.branch_id
      }
    ])

    alert('TL berhasil ditugaskan')
    setSelectedPackage('')
    setSelectedTL('')
    fetchData()
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">TL System</h1>

      {/* ASSIGN */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-2">Assign Tour Leader</h2>

        <div className="flex gap-2 flex-wrap">
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="border p-2"
          >
            <option value="">Pilih Paket</option>
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={selectedTL}
            onChange={(e) => setSelectedTL(e.target.value)}
            className="border p-2"
          >
            <option value="">Pilih TL</option>
            {tls.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <button
            onClick={assignTL}
            className="bg-green-600 text-white px-4"
          >
            Assign
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-4">
          Statistik TL (Fairness)
        </h2>

        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Nama TL</th>
              <th>Total Tugas</th>
            </tr>
          </thead>

          <tbody>
            {stats.map((s) => (
              <tr key={s.name}>
                <td>{s.name}</td>
                <td className="text-center">{s.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}