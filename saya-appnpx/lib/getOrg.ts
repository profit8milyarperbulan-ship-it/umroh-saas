import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getOrg() {
  const { data: userData } = await supabase.auth.getUser()

  if (!userData?.user) return null

  const { data } = await supabase
    .from('organizations')
    .select('*')
    .eq('user_id', userData.user.id)
    .single()

  return data
}