
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { calcularTotal } = require('../src/cotizador');

test('rechaza una expresión JavaScript distinta de precio * cantidad', () => {
  assert.throws(() => calcularTotal('Math.max(4, 9)'), /Fórmula inválida/);
});

test('rechaza una cantidad negativa', () => {
  assert.throws(() => calcularTotal('12 * -1'), /Fórmula inválida/);
});

test('rechaza cantidades fuera de rango', () => {
  assert.throws(() => calcularTotal('12 * 900'), /fuera de rango/);
});
