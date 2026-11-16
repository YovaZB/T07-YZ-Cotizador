
'use strict';

/**
 * Sustituye la evaluación dinámica por validación de precio * cantidad.
 * Solo permite números decimales positivos y cantidades enteras.
 */
function calcularTotal(expresion) {
  const entrada = String(expresion).trim();
  const coincidencia = /^(\d+(?:\.\d{1,2})?)\s*\*\s*(\d{1,3})$/.exec(entrada);
  if (!coincidencia) {
    throw new TypeError('Fórmula inválida. Formato esperado: precio * cantidad');
  }
  const precio = Number(coincidencia[1]);
  const cantidad = Number(coincidencia[2]);
  if (!Number.isFinite(precio) || precio <= 0 || precio > 100000 || cantidad < 1 || cantidad > 100) {
    throw new RangeError('Precio o cantidad fuera de rango');
  }
  return Math.round(precio * cantidad * 100) / 100;
}

module.exports = { calcularTotal };
