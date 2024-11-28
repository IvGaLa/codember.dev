import { _readInput } from '../lib.js'

const sortNetworks = (a, b) => {
  const firstA = Number(a.split(',')[0])
  const firstB = Number(b.split(',')[0])
  return firstA - firstB
}

const getNetworks = (_file) => {
  const _d = _readInput(_file)
  const _data = _d[0].replaceAll(' ', '') // Limpio los espacios del imput
  const regexp = new RegExp('[0-9]+,[0-9]+', 'gm')
  return Array.from(_data.matchAll(regexp), (match) => match[0]).sort(sortNetworks).map(node => node.split(',').map(Number))
}

export const reto04 = (_file) => {
  const networks = getNetworks(_file)
  const subredes = []

  for (let i = 0; i < networks.length; i++) {
    const [nodoAnterior, nodoSiguiente]=networks[i]
    if (subredes.length === 0) { // Añadimos la primera subred
      subredes.push([nodoAnterior, nodoSiguiente])
      continue
    }

    for (let i = 0; i < subredes.length; i++) {
      const subred = subredes[i]
      const primerNodoSubred = subred.at(0) // Cogemos el primer nodo de la red que estamos mirando
      const ultimoNodoSubred = subred.at(-1) // Cogemos el último nodo de la red que estamos mirando

      if (nodoAnterior >= primerNodoSubred && nodoAnterior <= ultimoNodoSubred) {
        subred.push(nodoSiguiente) // Si es consecutivo, lo añadimos a la misma subred
        break
      } else if (i === subredes.length - 1) {
        subredes.push([nodoAnterior, nodoSiguiente])
        break
      }
    }
  }

  const redesValidas = subredes.filter(red => {
    if (red.length < 3) // Si la red tiene mas de tres nodos, no es válida.
      return red
  })

  return redesValidas.join(',')
}
