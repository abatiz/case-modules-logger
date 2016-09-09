# case-logger
Módulo para hacer logs de las aplicaciones y enviarlos a un recolector de logs para analizarlos.

Responsable: [Miguel Herrero](https://github.com/Miguel-Herrero)

[![Run Status](https://api.shippable.com/projects/579b43a3a8f22a0c00a44a1a/badge?branch=logger)](https://app.shippable.com/projects/579b43a3a8f22a0c00a44a1a) [![Coverage Badge](https://api.shippable.com/projects/579b43a3a8f22a0c00a44a1a/coverageBadge?branch=logger)](https://app.shippable.com/projects/579b43a3a8f22a0c00a44a1a)

## Instalación

Instala la dependencia en `package.json` con la `VERSIÓN` que quieras:

```
"dependencies": {
  "case-logger": "git+https://707d3242d7f4d30295f57d7914148ac6524408ba:x-oauth-basic@github.com/abatiz/case-modules-logger.git#VERSIÓN"
}
```

Importa el módulo y asígnale un `namespace` identificativo para tu script:

    var Logger = require('case-logger')('myApp:plugin:speedtest');
    
Se le puede pasar un objeto de opciones, donde se puede quitar que se envíen a Graylog.

```
var Logger = require('./index.js')({
  logger: false,
  namespace: 'myApp:plugin:speedtest'
});
```
    
## Métodos de logs

Todos los métodos aceptan dos parámetros:

0. (String, **requerido**): el título del log.
1. (String, opcional): un mensaje completo del log; el stacktrace del error por ejemplo.

### error()

**Level 1**. En este nivel de log, se debe actuar inmediatamente.

    Logger.error('No se encuentra el socket de conexión a MongoDB', stackTrace);
    
### warn()

**Level 4**. Condiciones de peligro, que pueden llevar a error si no se toman acciones. Hay que tratar de solucionarlo.

    Logger.warn('Código de MCC y MNC no encontrado en BD. Configuración no se ha podido devolver al usuario');
    
### log()

**Level 5**. Eventos que son inusuales pero significativos, y que no pueden llevar a condición de error.

    Logger.log('El documento no tiene velocidades medias para calcular el total');
    
### info()

**Level 6**. Mensajes normales de operaciones; pueden usarse para informes, mediciones… No se requiere intervención.

    Logger.info('Obtenida configuración de la sonda de la DB');
    
### debug()

**Level 7**. Mensajes de depuración, útiles para los desarrolladores durante el desarrollo de la app. No útiles durante las operaciones.

Este nivel de log en ningún caso envía datos a Graylog.

    Logger.debug('Configuración obtenida de la DB en 8754 ms');

## Niveles de log
En conformidad con la [GELF Format Specification](http://docs.graylog.org/en/2.0/pages/gelf.html#gelf-format-specification), los niveles de logs son iguales a los niveles estándar de syslog ([RFC 3164](http://www.ietf.org/rfc/rfc3164.txt)):

| Numerical Code | Severity                                 | Equivalent Logger method |
|----------------|------------------------------------------|--------------------------|
|        0       | Emergency: system is unusable            |                          |
|        1       | Alert: action must be taken immediately  |           error          |
|        2       | Critical: critical conditions            |                          |
|        3       | Error: error conditions                  |                          |
|        4       | Warning: warning conditions              |           warn           |
|        5       | Notice: normal but significant condition |            log           |
|        6       | Informational: informational messages    |           info           |
|        7       | Debug: debug-level messages              |           debug          |

## Código completo de ejemplo

Copia este código en un archivo javascript:

````
var stackTraceExample = 'Error: Things keep happening! at /home/gbusey/file.js:525:2 at Frobnicator.refrobulate (/home/gbusey/business-logic.js:424:21) at Actor.<anonymous> (/home/gbusey/actors.js:400:8) at increaseSynergy (/home/gbusey/actors.js:701:6)'

/**
 * If no options are passed, default Graylog is used
 */
var LogWithoutOptions = require('./index.js')('myApp:myScript')

LogWithoutOptions.error('Alert: action must be taken immediately', stackTraceExample)
LogWithoutOptions.warn('Warning: warning conditions')
LogWithoutOptions.log('Notice: normal but significant condition')
LogWithoutOptions.info('Informational: informational messages')
LogWithoutOptions.debug('Debug: debug-level messages')
````
Ejecútalo con `DEBUG=* node example.js` y verás en Graylog los datos enviados.

## Analizar la información en Graylog

La información que se recibe en Graylog es:

0. timestamp (cuándo se envió el log)
0. hostname (quién generó el log)
0. source (la IP de quien generó el log)
0. level (nivel de criticidad, de acuerdo con los *Niveles de log* según el método usado)
0. namespace (el script que generó el log)
0. message (título del log)
0. full_message (si lo hay, mensaje completo del log)

## Contribuciones

Cualquier sugerencia, fallo o mejora, abre una issue.
