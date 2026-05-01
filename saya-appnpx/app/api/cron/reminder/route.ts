import { NextResponse } from 'next/server'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const fonnteKey = process.env.FONNTE_API_KEY!

  const now = new Date()

  // ambil bookings + relasi
  const resBookings = await fetch(
    `${supabaseUrl}/rest/v1/bookings?select=id,total_price,last_reminder_at,jamaah(name,phone),packages(name)`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    }
  )

  const bookings = await resBookings.json()

  // ambil payments
  const resPayments = await fetch(
    `${supabaseUrl}/rest/v1/payments?select=*`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    }
  )

  const payments = await resPayments.json()

  let sent = 0

  for (const b of bookings) {
    const paid =
      payments
        .filter((p: any) => p.booking_id === b.id)
        .reduce((sum: number, p: any) => sum + p.amount, 0) || 0

    const sisa = (b.total_price || 0) - paid

    // cek terakhir kirim
    const last = b.last_reminder_at
      ? new Date(b.last_reminder_at)
      : null

    const sameDay =
      last &&
      last.toDateString() === now.toDateString()

    if (sisa > 0 && !sameDay) {
      const message = `Assalamu'alaikum ${b.jamaah?.name},

Sisa pembayaran paket ${b.packages?.name}:

Total: Rp ${b.total_price.toLocaleString()}
Sudah bayar: Rp ${paid.toLocaleString()}
Sisa: Rp ${sisa.toLocaleString()}

Mohon segera dilunasi 🙏`

      // kirim WA
      await fetch('https://api.fonnte.com/send', {
        method: 'POST',
        headers: {
          Authorization: fonnteKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          target: b.jamaah?.phone,
          message
        })
      })

      // update last_reminder_at
      await fetch(
        `${supabaseUrl}/rest/v1/bookings?id=eq.${b.id}`,
        {
          method: 'PATCH',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            last_reminder_at: now.toISOString()
          })
        }
      )

      sent++
    }
  }

  return NextResponse.json({
    success: true,
    total_sent: sent
  })
}