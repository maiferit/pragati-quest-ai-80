import { supabase } from './supabaseClient'

export async function saveQuery(userId: string, query: string) {
  await supabase.from('history').insert({ user_id: userId, query })
}
