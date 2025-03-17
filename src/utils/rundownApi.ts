import { League } from '../types/league'
import { Sportsbook } from '../types/sportsbook'

const RUNDOWN_API_URL = 'https://therundown-therundown-v1.p.rapidapi.com'
const RUNDOWN_API_KEY = process.env.RUNDOWN_API_KEY!
const RUNDOWN_API_HOST = process.env.RUNDOWN_API_HOST!

const SUPPORTED_SPORTSBOOKS: Sportsbook[] = [
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

export async function getSportsbooks(): Promise<Sportsbook[]> {
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

const SUPPORTED_LEAGUES: League[] = [
  { sport: 'Football', id: 1, name: 'NCAA Football' },
  { sport: 'Football', id: 2, name: 'NFL' },
  { sport: 'Baseball', id: 3, name: 'MLB' },
  { sport: 'Basketball', id: 4, name: 'NBA' },
  { sport: 'Basketball', id: 5, name: "NCAA Men's Basketball" },
  { sport: 'Hockey', id: 6, name: 'NHL' },
  { sport: 'MMA', id: 7, name: 'UFC/MMA' },
  { sport: 'Basketball', id: 8, name: 'WNBA' },
  { sport: 'Soccer', id: 10, name: 'MLS' },
  { sport: 'Soccer', id: 11, name: 'EPL' },
  { sport: 'Soccer', id: 12, name: 'FRA1' },
  { sport: 'Soccer', id: 13, name: 'GER1' },
  { sport: 'Soccer', id: 14, name: 'ESP1' },
  { sport: 'Soccer', id: 15, name: 'ITA1' },
  { sport: 'Soccer', id: 16, name: 'UEFACHAMP' },
  { sport: 'Soccer', id: 17, name: 'UEFAEURO' },
  { sport: 'Soccer', id: 18, name: 'FIFA' },
  { sport: 'Soccer', id: 19, name: 'JPN1' },
  { sport: 'Cricket', id: 20, name: 'IPL' },
  { sport: 'Cricket', id: 21, name: 'T20' },
  // { sport: 'Politics', id: 22, name: 'Politics' },
  { sport: 'Basketball', id: 23, name: 'NBA Preseason' },
  { sport: 'Basketball', id: 24, name: 'NBA Playoffs' },
  { sport: 'Football', id: 25, name: 'NFL Preseason' },
  { sport: 'Football', id: 26, name: 'NFL Playoffs' },
  { sport: 'Hockey', id: 27, name: 'NHL Preseason' },
  { sport: 'Hockey', id: 28, name: 'NHL Playoffs' },
  { sport: 'Baseball', id: 29, name: 'MLB Preseason' },
  { sport: 'Baseball', id: 30, name: 'MLB Spring Training' },
  { sport: 'Baseball', id: 31, name: 'MLB Playoffs' },
  { sport: 'Basketball', id: 32, name: 'NBA Summer League' },
]

// Might need to change if we change our odds API or their service changes (check back periodically)
export async function getLeagues(): Promise<League[]> {
  return SUPPORTED_LEAGUES
}
