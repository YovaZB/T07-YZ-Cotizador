'use strict';

/**
 * Estado inicial deliberadamente vulnerable para un laboratorio académico.
 * Expresión esperada: "12.50 * 3".
 * NO desplegar este código en producción.
 */
function calcularTotal(expresion) {
  const entrada = String(expresion);
  return eval(entrada); // CWE-95: evalúa contenido proporcionado por el solicitante
}

module.exports = { calcularTotal };
