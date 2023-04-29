export interface Coordinate {
  latitude: number
  longitude: number
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate
) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const fromRadian = (Math.PI * from.latitude) / 180
  const toRadian = (Math.PI * to.latitude) / 180

  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 180

  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  if (dist > 1) {
    dist = 1
  }

  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344

  return dist
}

// //pedra 90
// const to: Coordinate = {
//   latitude: -15.6337389,
//   longitude: -55.9884282,
// }
// const from: Coordinate = {
//   latitude: -15.6142378,
//   longitude: -56.0851705,
// }
// const distance = getDistanceBetweenCoordinates(from, to)
// console.log(distance)
