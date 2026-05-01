'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ExperiencePage() {
  const [jamaah, setJamaah] = useState<any[]>([])
  const [selected, setSelected] = useState('')
  const [ratings, setRatings] = useState({
    layanan: 5,
    fasilitas: 5,
    pembimbing: 5,
    kepuasan: 5
  })
  const [feedback, setFeedback] = useState('')
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data: j } = await supabase.from('jamaah').select('*')
    const { data: s } = await supabase
      .from('surveys')
      .select(`
        *,
        jamaah (name)
      `)

    setJamaah(j || [])
    setData(s || [])
  }

  async function submitSurvey() {
    await supabase.from('surveys').insert([
      {
        jamaah_id: selected,
        rating_layanan: ratings.layanan,
        rating_fasilitas: ratings.fasilitas,
        rating_pembimbing: ratings.pembimbing,
        rating_kepuasan: ratings.kepuasan,
        feedback
      }
    ])

    alert('Survey masuk 👍')
    setSelected('')
    setFeedback('')
    fetchData()
  }

  function calcScore(s: any) {
    return (
      (s.rating_layanan +
        s.rating_fasilitas +
        s.rating_pembimbing +
        s.rating_kepuasan) / 4
    )
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">
        Experience Jamaah
      </h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-2">Input Survey</h2>

        <div className="flex gap-2 flex-wrap">

          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="border p-2"
          >
            <option value="">Pilih Jamaah</option>
            {jamaah.map((j) => (
              <option key={j.id} value={j.id}>
                {j.name}
              </option>
            ))}
          </select>

          {['layanan','fasilitas','pembimbing','kepuasan'].map((k:any)=>(
            <select
              key={k}
              value={(ratings as any)[k]}
              onChange={(e)=>
                setRatings({
                  ...ratings,
                  [k]: Number(e.target.value)
                })
              }
              className="border p-2"
            >
              {[1,2,3,4,5].map(n=>(
                <option key={n} value={n}>
                  {k} {n}
                </option>
              ))}
            </select>
          ))}

          <input
            placeholder="Feedback"
            value={feedback}
            onChange={(e)=>setFeedback(e.target.value)}
            className="border p-2 w-64"
          />

          <button
            onClick={submitSurvey}
            className="bg-green-600 text-white px-4"
          >
            Submit
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-4">Hasil Survey</h2>

        <table className="w-full">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Score</th>
              <th>Feedback</th>
            </tr>
          </thead>

          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td>{d.jamaah?.name}</td>
                <td className="text-center">
                  {calcScore(d).toFixed(1)}
                </td>
                <td>{d.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}