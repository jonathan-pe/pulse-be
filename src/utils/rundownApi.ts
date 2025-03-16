const RUNDOWN_API_URL = 'https://therundown-therundown-v1.p.rapidapi.com'
const RUNDOWN_API_KEY = process.env.RUNDOWN_API_KEY!
const RUNDOWN_API_HOST = process.env.RUNDOWN_API_HOST!

export async function getSportsbooks(): Promise<any> {
  const url = `${RUNDOWN_API_URL}/affiliates`
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RUNDOWN_API_KEY,
      'x-rapidapi-host': RUNDOWN_API_HOST,
    },
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`Failed to fetch sportsbooks: ${response.statusText}`)
    }

    const { affiliates: sportsbooks } = await response.json()

    return sportsbooks
  } catch (error) {
    console.error(error)
  }
}
