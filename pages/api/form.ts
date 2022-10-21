import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body
  const { name, score, phone } = body
  if (!name || !score || !phone) {
    return res.status(400).json({ error: 'Missing name, score, or phone' })
  }

  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from('leaderboard')
      .insert([
        { name, score, phone },
      ])
    if (error) {
      return res.status(400).json({ error: error.message })
    }
    return res.status(200).json(data)
  }

  return res.status(405).json({ error: 'Method not allowed' })

}
