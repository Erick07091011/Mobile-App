// Aquí tenemos nuestro archivo supabase.js para hacer las conexiones necesarias con nuestra app
import { createClient } from '@supabase/supabase-js'

// Reemplaza con tu URL y clave pública de Supabase
const SUPABASE_URL = 'https://vlmumyosvxmmmfflklwk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsbXVteW9zdnhtbW1mZmxrbHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NzY1NDAsImV4cCI6MjA3MDM1MjU0MH0._juuIBUJBvWshWIAiLC_Ixc0PkOV9anP2mx9wR1eDhQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
