import { IDataStarWars } from './types'

const url = 'https://swapi.dev/api/'

export async function getData(
  typeData: IDataStarWars,
  number?: string
) {
  let urlTypeData = ''
  if (typeData.toLowerCase() === 'things') {
    urlTypeData = 'people/'
  } else if (typeData.toLowerCase() === 'planets') {
    urlTypeData = 'planets/'
  } else if (typeData.toLowerCase() === 'starships') {
    urlTypeData = 'starships/'
  }
  urlTypeData =
    number !== undefined ? urlTypeData + number : urlTypeData

  const res = await fetch(url + urlTypeData, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()
  return json
}
