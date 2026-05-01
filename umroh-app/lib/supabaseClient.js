import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://yfszqjslkqexvlckfxjt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlmc3pxanNsa3FleHZsY2tmeGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1Mjc3MzYsImV4cCI6MjA5MzEwMzczNn0.rki7Jma6vaL-Ir6zUkJ6-XFb_IZRCJvW6lSRJaSOBNs'
)