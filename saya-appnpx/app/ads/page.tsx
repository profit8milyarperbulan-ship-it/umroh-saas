'use client'

import { useState } from 'react'

export default function AdsPage() {
  const [budget, setBudget] = useState(50000)

  function generateAds() {
    return [
      {
        title: 'Angle Masalah',
        copy: `Umroh terasa mahal dan ribet?

Sekarang sudah banyak jamaah berangkat dengan cara lebih hemat & terencana.

Yuk konsultasi dulu 🙏`
      },
      {
        title: 'Angle Manfaat',
        copy: `Bayangkan bisa umroh dengan tenang tanpa bingung biaya.

Kami bantu dari awal sampai berangkat.

Klik sekarang untuk info lengkap ✨`
      },
      {
        title: 'Angle Testimoni',
        copy: `Sudah banyak jamaah berangkat bersama kami 🤍

Alhamdulillah puas dengan pelayanan & pembimbingannya.

Anda berikutnya?`
      }
    ]
  }

  function simulate() {
    const cpc = 1000
    const chatRate = 0.1
    const closingRate = 0.1

    const clicks = budget / cpc
    const chats = clicks * chatRate
    const closing = chats * closingRate

    return {
      clicks: Math.round(clicks),
      chats: Math.round(chats),
      closing: Math.round(closing)
    }
  }

  const ads = generateAds()
  const sim = simulate()

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">
        Ads System (Reseller Friendly)
      </h1>

      {/* INPUT */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-2">Budget Harian</h2>

        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="border p-2"
        />
      </div>

      {/* TARGETING */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-2">Targeting</h2>

        <p><b>Adset 1 (Broad):</b> Indonesia, usia 25-55</p>
        <p><b>Adset 2 (Interest):</b> Umroh, Haji, Muslim Travel, Kajian</p>
      </div>

      {/* ADS */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-4">3 Ads (Auto Generated)</h2>

        {ads.map((a, i) => (
          <div key={i} className="mb-4 border p-3 rounded">
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm mt-2">{a.copy}</p>
          </div>
        ))}
      </div>

      {/* SIMULASI */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Simulasi</h2>

        <p>Clicks: {sim.clicks}</p>
        <p>Chat Masuk: {sim.chats}</p>
        <p>Estimasi Closing: {sim.closing}</p>
      </div>
    </div>
  )
}