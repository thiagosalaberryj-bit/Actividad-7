# Actividad 7 - DOM y persistencia local (IndexedDB)

## Descripcion

Aplicacion web simple para guardar el codigo de un dispositivo de rastreo de bicicleta usando IndexedDB. Los datos se guardan en el navegador y se conservan aunque cierres la pestaña o el navegador.

## Objetivo de la actividad

- Conectar el DOM con una base de datos local (IndexedDB).
- Mantener datos persistentes sin servidor externo.
- Mostrar registros guardados en pantalla.

## Funcionalidad principal

- Cargar un codigo de rastreador desde un formulario.
- Guardar el codigo y la fecha en IndexedDB.
- Mostrar la lista de codigos guardados.

## Estructura de carpetas

```
Actividad 7/
├── css/
│   └── style.css
├── js/
│   └── app.js
├── index.html
├── LICENSE.md
└── README.md
```

## Como probar

1. Abrir `index.html` en el navegador.
2. Ingresar un codigo y presionar "Guardar codigo".
3. Cerrar la pestaña o el navegador y volver a abrirlo.
4. Verificar que el codigo sigue en la lista.

Para ver la base de datos:

- Abrir DevTools (F12)
- Application -> IndexedDB -> ProyectoPWD -> registros

## Como clonar con GitHub

1. Copiar la URL del repositorio desde GitHub.
2. Ejecutar en la terminal:

```
git clone https://github.com/USUARIO/REPOSITORIO.git
```

3. Entrar en la carpeta del proyecto:

```
cd "Actividad 7"
```

## Recursos

- https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API
