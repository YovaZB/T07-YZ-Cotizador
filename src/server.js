'use strict';

const http = require('node:http');
const minimist = require('minimist');
const { calcularTotal } = require('./cotizador');

function enviarJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function atender(req, res) {
  const url = new URL(req.url, 'http://127.0.0.1');
  if (url.pathname === '/salud') {
    return enviarJson(res, 200, { estado: 'activo', laboratorio: 'T07-YZ' });
  }
  if (url.pathname !== '/cotizacion' || req.method !== 'GET') {
    return enviarJson(res, 404, { error: 'Ruta no encontrada' });
  }

  const formula = url.searchParams.get('formula');
  if (formula === null) {
    return enviarJson(res, 400, { error: 'Se requiere el parámetro formula' });
  }
  try {
    const total = calcularTotal(formula);
    if (typeof total !== 'number' || !Number.isFinite(total)) {
      return enviarJson(res, 400, { error: 'Resultado no numérico' });
    }
    return enviarJson(res, 200, { total });
  } catch (error) {
    return enviarJson(res, 400, { error: 'Fórmula inválida' });
  }
}

if (require.main === module) {
  const args = minimist(process.argv.slice(2), { default: { port: 3005 } });
  const port = Number(args.port);
  if (!Number.isInteger(port) || port < 1024 || port > 65535) {
    throw new Error('Puerto fuera de rango (1024-65535)');
  }
  // Solo escucha en loopback. Proyecto didáctico, no apto para despliegue.
  http.createServer(atender).listen(port, '127.0.0.1', () => {
    console.log(`T07-YZ activo en http://127.0.0.1:${port}`);
  });
}

module.exports = { atender };
