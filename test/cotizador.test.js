'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { calcularTotal } = require('../src/cotizador');

test('12.50 * 3 produce 37.5', () => {
  assert.equal(calcularTotal('12.50 * 3'), 37.5);
});

test('9 * 2 produce 18', () => {
  assert.equal(calcularTotal('9 * 2'), 18);
});
