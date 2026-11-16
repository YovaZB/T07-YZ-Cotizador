# T07-YZ | Cotizador seguro (laboratorio DevSecOps)

Proyecto **original e independiente** para la Tarea 7. No depende de OWASP NodeGoat ni reutiliza el laboratorio anterior de Lodash.

## Escenario

Una aplicación Node.js de cotizaciones expone `GET /cotizacion?formula=12.50*3`. La versión inicial contiene dos problemas **intencionales**:

1. **SAST:** `src/cotizador.js` usa `eval()` sobre una entrada recibida de la solicitud HTTP (CWE-95). Semgrep, incluida la regla local de alta severidad `t07-yz-no-eval`, debe bloquear el job.
2. **SCA:** `minimist@1.2.5`, paquete npm de análisis de argumentos CLI, tiene la vulnerabilidad de Prototype Pollution **CVE-2021-44906, CVSS 9.8 (crítico)**. OWASP Dependency-Check debe bloquear la ejecución por superar `--failOnCVSS 7`.

> **Uso solo educativo**. No publiques ni despliegues la versión inicial en un servidor accesible desde Internet. Si se ejecuta localmente, escucha únicamente en `127.0.0.1`.

## Flujo de trabajo

1. Publica **solo el contenido de este directorio** en un nuevo repositorio, por ejemplo `T07-YZ-Cotizador`.
2. El workflow único de GitHub Actions aparece con el nombre **T07-YZ**.
3. Conserva la ejecución inicial **FAILED**, los tres artefactos (Semgrep, Dependency-Check, CycloneDX) y sus capturas.
4. Aplica el parche provisto **fuera de este ZIP de inicio** (`T07-YZ_Parche_Seguro.zip`), que sustituye `src/cotizador.js` y agrega una prueba de rechazo de expresiones no permitidas.
5. Actualiza el paquete npm: `npm install minimist@1.2.8 --save-exact --ignore-scripts --no-audit --no-fund`.
6. Ejecuta `npm test`, publica un segundo commit y conserva la ejecución **SUCCESS**, si los controles efectivamente pasan.

## Prueba de desarrollo local (opcional)

```powershell
npm install --ignore-scripts --no-audit --no-fund
npm test
npm start
```

Luego visita `http://127.0.0.1:3005/cotizacion?formula=12.50*3`.

## Evidencias a conservar

- URL pública/privada del repositorio y SHA de ambos commits.
- URL de GitHub Actions **FAILED** y detalle SAST ERROR, detalle SCA CVSS >= 7.
- URL de GitHub Actions **SUCCESS** después de corregir el código y el paquete.
- `T07-YZ-semgrep-json` (JSON), `T07-YZ-dependency-check` (JSON y HTML) y `T07-YZ-sbom-cyclonedx` (CycloneDX JSON) de las ejecuciones.
- Primeras 30 líneas del SBOM formateado y detalle de un componente extraído del JSON auténtico.

**Advertencia:** la ejecución real aún no está verificada. El archivo de informe Word se completa con los logs y reportes reales, sin inventar capturas ni resultados.
