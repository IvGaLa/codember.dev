/*
Desafío 5: ¡Encuentra a ΩMEGA!
La IA maligna ΩMEGA está acorralada. Tras revisar todos los nodos sanos de la red en el reto anterior... ¡hemos detectado que ΩMEGA se ha escondido en uno!

No sabemos exactamente cuál es... pero sabemos las reglas que ha seguido ΩMEGA para esconderse.

Necesitamos encontrar los números que cumplen las siguientes condiciones:

El número es primo.
La suma de sus dígitos también es un número primo.
Tu tarea es escribir un programa que encuentre cuántos números de la lista cumplen con estas condiciones y determinar cuál es el tercer número que cumple con ellas al recorrer la lista en orden ascendente.

Ejemplo:

Si tuviéramos la lista: 11,12,13,14

11: Es primo. 1 + 1 = 2, que es primo. → Cumple.
12: No es primo. → No cumple.
13: Es primo. 1 + 3 = 4, que no es primo. → No cumple.
14: No es primo. → No cumple.
En este caso, solo un número cumple las condiciones, y ese número sería el primero (11).

¿Qué debes hacer?

Analiza la lista de nodos del resultado del reto anterior y encuentra todos los números que cumplen las condiciones.
Determina cuántos números cumplen las condiciones.
Identifica el tercer número que cumple las condiciones al recorrer la lista en orden ascendente.
Respuesta:

Envía el número total de números que cumplen las condiciones y el tercer número encontrado, separados por un guión. Por ejemplo, si hay 4 números que cumplen y el tercer número es 11, enviarías: submit 4-11
*/

import { reto04 } from "../reto04/reto04.js";


const isPrimo = (num) => {
  if (num == 1 || num == 2 || num == 3) // Si es 1, 2 ó 3 es primo
    return true

  if (num % 2 == 0) // Si es par, no es primo
    return false

  let intentos = 1 // Lo inicializo a 1 por que el for lo empiezo en 3 (salto el 1 y 2)
  for (let i = 3; i <= num; i += 2) { // Hago pasos de +2 para saltar los números pares.
    if (intentos > 2) // Si ya llevamos mas de dos intentos, salimos sin comprobar mas divisiones
      break

    if (num % i == 0) // Si es divisible, le añado un intento
      intentos++
  }

  return (intentos > 2) ? false : true // Si hay mas de dos intentos, no es primo

}


const reto05 = (nodes) => {
  const _data = nodes.split(',')
  const primos = []

  for (let i = 0; i < _data.length; i++) {
    const sumados = _data[i].toString().split('').reduce((previous, value) => {
      return Number(previous) + Number(value)
    }, 0)
    if (isPrimo(_data[i]) && isPrimo(sumados))
      primos.push(_data[i])
  }

  return primos
}



const _path = '2024/reto04/'
const input = 'network.txt'
const nodes = reto04(`${_path}${input}`) // Recuperamos el listado de nodos del reto anterior
const primos = reto05(nodes)
console.log(`submit ${primos.length}-${primos[2]}`); // submit 7-43