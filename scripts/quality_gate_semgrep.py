#!/usr/bin/env python3
"""Valida los resultados de Semgrep; ERROR bloquea y JSON inválido también."""
import json
import sys
from pathlib import Path


def main():
    if len(sys.argv) != 2:
        print('Uso: quality_gate_semgrep.py <ruta.json>', file=sys.stderr)
        return 2
    archivo = Path(sys.argv[1])
    try:
        data = json.loads(archivo.read_text(encoding='utf-8'))
        resultados = data['results']
        if not isinstance(resultados, list):
            raise ValueError('results no es una lista')
    except (OSError, KeyError, ValueError, TypeError) as exc:
        print(f'ERROR: No pudo verificarse Semgrep: {exc}', file=sys.stderr)
        return 2
    errores = [r for r in resultados if r.get('extra', {}).get('severity', '').upper() == 'ERROR']
    advertencias = [r for r in resultados if r.get('extra', {}).get('severity', '').upper() == 'WARNING']
    print(f'T07-YZ Semgrep: {len(resultados)} hallazgos; ERROR={len(errores)}; WARNING={len(advertencias)}')
    for r in errores:
        print('BLOQUEANTE:', r.get('check_id'), r.get('path'), 'linea', r.get('start', {}).get('line'))
    if errores:
        print('QUALITY GATE SAST: FAILED por hallazgos ERROR', file=sys.stderr)
        return 1
    print('QUALITY GATE SAST: SUCCESS (0 ERROR)')
    return 0


if __name__ == '__main__':
    sys.exit(main())
