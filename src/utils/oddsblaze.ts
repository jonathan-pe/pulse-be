import { Sportsbook } from '../types/sportsbook'

const ODDSBLAZE_API_URL = 'https://data.oddsblaze.com/v1'
const ODDSBLAZE_API_KEY = process.env.ODDSBLAZE_API_KEY!

export async function getSportsbooks(): Promise<Sportsbook[]> {
  const response = await fetch(`${ODDSBLAZE_API_URL}/sportsbooks.json`)

  if (!response.ok) {
    throw new Error(`Failed to fetch sportsbooks: ${response.statusText}`)
  }

  const { sportsbooks } = await response.json()

  return sportsbooks
}
