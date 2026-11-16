# T07-YZ | Cotizador seguro (laboratorio DevSecOps)

Proyecto **original e independiente** para la Tarea 7. No depende de OWASP NodeGoat ni reutiliza el laboratorio anterior de Lodash.

## Escenario

Una aplicación Node.js de cotizaciones expone `GET /cotizacion?formula=12.50*3`. La versión inicial contiene dos problemas **intencionales**:

1. **SAST:** `src/cotizador.js` usa `eval()` sobre una entrada recibida de la solicitud HTTP (CWE-95). Semgrep, incluida la regla local de alta severidad `t07-yz-no-eval`, debe bloquear el job.
2. **SCA:** `minimist@1.2.5`, paquete npm de análisis de argumentos CLI, tiene la vulnerabilidad de Prototype Pollution **CVE-2021-44906, CVSS 9.8 (crítico)**. OWASP Dependency-Check debe bloquear la ejecución por superar `--failOnCVSS 7`.

> **Uso solo educativo**. Si se ejecuta localmente, escucha únicamente en `127.0.0.1`.

