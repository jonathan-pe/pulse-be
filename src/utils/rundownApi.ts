const RUNDOWN_API_URL = 'https://therundown-therundown-v1.p.rapidapi.com'
const RUNDOWN_API_KEY = process.env.RUNDOWN_API_KEY!
const RUNDOWN_API_HOST = process.env.RUNDOWN_API_HOST!

const SUPPORTED_SPORTSBOOKS = [
  { id: 3, name: 'Pinnacle', url: 'https://www.pinnacle.com/en/rtn' },
  { id: 23, name: 'Fanduel', url: 'https://sportsbook.fanduel.com/' },
  {
    id: 22,
    name: 'BetMGM',
    url: 'https://mediaserver.betmgmpartners.com/renderBanner.do?zoneId=1721362',
  },
  { id: 2, name: 'Bovada', url: 'https://www.bovada.lv/' },
  { id: 12, name: 'Bodog', url: 'https://bit.ly/2Z5uFkw' },
  { id: 19, name: 'Draftkings', url: 'https://sportsbook.draftkings.com/' },
  { id: 21, name: 'Unibet', url: 'https://www.unibet.com/' },
  { id: 16, name: 'Matchbook', url: 'https://www.matchbook.com/' },
  {
    id: 6,
    name: 'BetOnline',
    url: 'https://record.betonlineaffiliates.ag/_4w2QQYoxTW4TMKfio_tvj2Nd7ZgqdRLk/1/',
  },
  { id: 11, name: 'Lowvig', url: 'https://sportsbook.lowvig.ag/' },
  {
    id: 4,
    name: 'Sportsbetting',
    url: 'https://www.sportsbetting.ag/join?btag=8KfE-TdI6XUcWcOFhDNnKGNd7ZgqdRLk\u0026affid=102915',
  },
  { id: 14, name: 'Intertops', url: 'http://bit.ly/2XkXdpa' },
  { id: 18, name: 'YouWager', url: 'http://bit.ly/2Z1s37j' },
]

export async function getSportsbooks(): Promise<any> {
  // Probably don't need to implement this until we have a bigger rate limit
  // The list of sportsbooks is static and unlikely to change often

  // const url = `${RUNDOWN_API_URL}/affiliates`
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'x-rapidapi-key': RUNDOWN_API_KEY,
  //     'x-rapidapi-host': RUNDOWN_API_HOST,
  //   },
  // }

  // try {
  //   const response = await fetch(url, options)

  //   if (!response.ok) {
  //     throw new Error(`Failed to fetch sportsbooks: ${response.statusText}`)
  //   }

  //   const { affiliates: sportsbooks } = await response.json()

  //   return sportsbooks
  // } catch (error) {
  //   console.error(error)
  // }

  return SUPPORTED_SPORTSBOOKS
}
