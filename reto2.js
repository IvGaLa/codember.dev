/**
¿Cómo podemos detectar estos intentos de acceso? Está siguiendo estos patrones:

· Sólo usa letras minúsculas y dígitos.
· Nunca usa dígitos después de una letra (Una vez aparecen letras, la contraseña debe continuar solo con letras)
· Si usa dígitos, siempre los usa de forma creciente (si sale un 3, ya no usará después un número menor)
· Si usa letras, siempre las usa en orden alfabético creciente (si sale una "b" ya no podrá usar una "a", por ejemplo)
Algunos ejemplos para que lo entiendas perfectamente:

1234     -> true
abc      -> true
a123     -> false (un número después de una letra)
123abc   -> true
dbce     -> false (una "d" y después una "b")
Accede a este log.txt con una lista de intentos y con un programa cuenta cuántos han sido inválidos y cuántos válidos. 
Envía la respuesta usando el comando submit.

Por ejemplo, si hay 10 intentos válidos y 5 inválidos envía el comando submit 10true5false
*/

/**
 * Hacemos una comprobación de la validez de la contraseña mirando el código ASCII del carácter actual y siguiente.
 * Los códigos ASCII de los números siempre serán menores que las letras.
 * Números:
0 :  48
1 :  49
2 :  50
3 :  51
4 :  52
5 :  53
6 :  54
7 :  55
8 :  56
9 :  57
 * Letras:
a :  97
b :  98
c :  99
d :  100
e :  101
f :  102
g :  103
h :  104
i :  105
j :  106
k :  107
l :  108
m :  109
n :  110
o :  111
p :  112
q :  113
r :  114
s :  115
t :  116
u :  117
v :  118
w :  119
x :  120
y :  121
z :  122
 * 
 */

import fs from 'fs'

const fileLog = 'log.txt'
let verdaderos = 0
let falsos = 0
let isFalse = false


// 0 - charat 48
// a - charat 97
// Leemos el fichero
fs.readFileSync(fileLog, 'utf8')
  // Lo partimos por salto de línea y retorno de carro
  .split('\r\n')
  // Mapeamos las contraseñas
  .map(password => {
    // Comprobamos cada caracter de la contraseña con el caracter siguiente
    for (let i = 0; i < password.length - 1; i++) {
      // Si el caracter actual es mayor que el caracter siguiente...
      if (password.charCodeAt(i) > password.charCodeAt(i + 1)) {
        // Es falso
        isFalse = true
        // Salimos del for
        break
      }
    }

    (isFalse) ? falsos++ : verdaderos++
    isFalse = false

  })

// Mostramos el resultado
console.log(`submit ${verdaderos}true${falsos}false`);

/* Han actualizado la web con este mensaje:

--- advertencia ---
ΩMEGA ha causado estragos en el sistema y la solución del reto R2 ha cambiado. Si tu resultado anterior fue incorrecto, ¡intenta enviarlo de nuevo!


Ahora si es correcta la solución

*/