'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { getOrg } from '@/lib/getOrg'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SettingsPage() {
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const org = await getOrg()
    if (!org) return
    setForm(org)
  }

  async function save() {
    await supabase
      .from('organizations')
      .update(form)
      .eq('id', form.id)

    alert('Saved')
  }

  return (
    <div className="p-6 text-black">
      <input
        value={form.name || ''}
        onChange={(e)=>setForm({...form, name:e.target.value})}
        className="border p-2 w-full mb-2"
      />

      <button onClick={save}>Save</button>
    </div>
  )
}