'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) return alert(error.message)

    router.push('/dashboard')
  }

  return (
    <div className="p-6 max-w-sm mx-auto text-black">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <button
        onClick={login}
        className="bg-black text-white px-4 py-2 w-full"
      >
        Login
      </button>
    </div>
  )
}