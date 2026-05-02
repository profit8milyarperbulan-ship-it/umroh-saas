import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { phone, message } = await req.json()

  const res = await fetch('https://api.fonnte.com/send', {
    method: 'POST',
    headers: {
      Authorization: process.env.FONNTE_API_KEY!,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      target: phone,
      message: message
    })
  })

  const data = await res.json()

  return NextResponse.json(data)
}