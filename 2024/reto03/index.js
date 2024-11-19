/*

Desafío 3: ¡Siguiendo la pista de la IA ΩMEGA!
La IA maligna ΩMEGA está causando problemas en el sistema de control de la empresa. Estamos siguiendo su rastro y necesitamos averiguar cuántos pasos ha tomado para llegar a la salida (ya sea por la izquierda o por la derecha).

ΩMEGA cuenta con una lista de instrucciones de salto. Cada instrucción indica el número de posiciones que debe moverse en esa misma lista.

· Número positivo: ΩMEGA avanza ese número de posiciones.
· Número negativo: Retrocede ese número de posiciones.
· Cero: Se queda en la misma posición (pero cuenta como movimiento).
Importante: Cada vez que ΩMEGA lee una instrucción, incrementa el valor de esa instrucción en 1 después de usarla.

· Si encuentra un 2, avanza 2 posiciones y luego esa instrucción se convierte en 3.
· Si encuentra un 0, se queda en su posición y luego esa instrucción se convierte en 1.
· Si encuentra un -3, retrocede 3 posiciones y luego esa instrucción se convierte en -2.
Voy a darte un ejemplo. Entre paréntesis te indicaré la instrucción actual en la que se encuentra ΩMEGA.

Lista de instrucciones: 1 2 4 1 -2

Inicio: (1) 2 4 1 -2    // → ΩMEGA empieza en la posición 0
Paso 1:  2 (2) 4 1 -2   // → Avanza una posición y la instrucción se convierte en 2
Paso 2:  2 3 4 (1) -2   // → Avanza 2 posiciones y la instrucción se convierte en 3
Paso 3:  2 3 4 2 (-2)   // → Avanza una posición y la instrucción se convierte en 2
Paso 4:  2 3 (4) 2 -1   // → Retrocede dos posiciones y pasa a -1
Paso 5:  2 3 4 2 -1     // → Avanza 4 posiciones y escapa
Resultado: 5
Otro ejemplo con lista de instrucciones: 0 1 2 3 -1

Inicio: (0) 1 2 3 -1   // → ΩMEGA empieza en la posición 0
Paso 1: (1) 1 2 3 -1   // → No avanza pero incrementa la instrucción en 1
Paso 2: 2 (1) 2 3 -1   // → Avanza una posición y la instrucción se convierte en 2
Paso 3: 2 2 (2) 3 -1   // → Avanza una posición y la instrucción se convierte en 2
Paso 4: 2 2 3 3 (-1)   // → Avanza dos posiciones y la instrucción se convierte en 3
Paso 5: 2 2 3 (3) 0    // → Retrocede una posición y la instrucción se convierte en 0
Paso 6: 2 2 3 4 0      // → Avanza tres posiciones y escapa
Resultado: 6
Otro ejemplo saliendo por la izquierda: 1 -2 5

Inicio: (1) -2 5    // → ΩMEGA empieza en la posición 0
Paso 1: 2 (-2) 5    // → Avanza una posición y la instrucción se convierte en 1
Paso 2: 2 -1 5      // → Retrocede dos posiciones y sale por la izquierda 
Resultado: 2
¡Ten en cuenta que, si la lista empieza por un número negativo, entonces ΩMEGA saldrá por la izquierda en un sólo paso!

Accede a este trace.txt. Tiene una lista de los movimientos que realizó ΩMEGA separados por salto de línea. Necesito que calcules los pasos que necesito ΩMEGA para salir de cada instrucción por línea, que sumes todos los resultados y me digas el resultado final de pasos que necesito ΩMEGA en total y el resultado de la última línea, separado por guión.

Por ejemplo, si necesitó 99 pasos en total sumándo los pasos de cada línea y para la instrucción de la última línea necesitó 13 pasos entonces la solución a enviar sería submit 99-13
*/

import { _readInput } from "../lib.js";


const reto03 = () => {
  const _file = '2024/reto03/trace.txt'
  //const _file = '2024/reto03/ejemplo.txt'
  const _data = _readInput(_file)

  let pasos = {} // Guardaré el número de línea con el total de pasos
  let line

  for (let i = 0; i < _data.length; i++) {

    line = _data[i].trim()
    const numbers = line.split(' ').map(n => Number(n))
    let index = 0
    // Si el primer número es negativo, salimos con un solo paso
    if (numbers[index] < 0) {
      pasos[i] = 1
      continue
    }

    const min = -1
    const max = _data[i].length - 1

    let moveTo = 0
    let actualIndex = 0
    let steps = 0


    while (index > min && index <= max) {

      // Si el número es 0, no nos movemos, pero le sumamos 1 a esa posición
      if (numbers[index] == 0) {
        numbers[index]++
      } else {
        // Si no es cero, miramos a donde nos tenemos que mover y le sumamos 1 al indice actual
        actualIndex = index
        moveTo = numbers[index] + index
        index = moveTo
        numbers[actualIndex]++
      }
      // Si nos vamos a mover a un sitió que no existe, entonces es que ya hemos salido
      if (Number.isNaN(moveTo)) {
        pasos[i] = steps
        continue
      }
      steps++
    }

    pasos[i] = steps
  }

  //Recuperamos el total de pasos
  let totalPasos = 0
  for (let i = 0; i < _data.length; i++) {
    totalPasos += pasos[i]
  }
  // Recuperamos el número de pasos de la última jugada
  const final = pasos[_data.length - 1]

  return `${totalPasos}-${final}`
}


console.log(`submit ${reto03()}`);
