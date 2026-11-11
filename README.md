# Portafolio académico

Sitio estático para organizar el perfil del estudiante y las evidencias del curso. No requiere instalar dependencias ni ejecutar un servidor para abrir las páginas principales: abre `index.html` en el navegador.

## Estructura

- `index.html`: portada con resumen del portafolio.
- `tareas.html`: catálogo de cuatro unidades desplegables con sus 16 semanas.
- `semana.html`: vista de materiales y evidencias de una semana, seleccionada mediante el fragmento de URL (por ejemplo, `semana.html#1`).
- `perfil.html`: información del estudiante y de la universidad.
- `visor.html`: visor de archivos asociados a las evidencias.
- `data.js`: configuración del perfil, curso y actividades.
- `script.js` y `style.css`: comportamiento y estilos compartidos.
- `img/`, `Semana1/` y `Desarrollo de Aplicaciones 1/`: imágenes y materiales del portafolio.

## Actualizar el perfil

Edita el objeto `CONFIG` al inicio de `data.js`. Allí puedes cambiar el nombre, la foto, el código, el correo, la carrera, la universidad, el curso y el ciclo. Las páginas que muestran esos datos se actualizan automáticamente; la cifra de evidencias entregadas también se calcula desde las actividades.

Usa rutas relativas al repositorio para las imágenes y archivos, por ejemplo:

```js
studentImage: "img/foto.jpeg",
universityLogo: "img/logoupla.png",
```

## Agregar una actividad o evidencia

Las semanas se organizan dentro de las cuatro unidades de `units`. Cada semana tiene un `id` único, un tema, una descripción, materiales y una lista `tasks`:

```js
{
  id: 3,
  title: "ArrayList y Vector",
  description: "Uso de colecciones dinámicas para almacenar y administrar elementos.",
  materials: [
    {
      title: "Material de clase",
      file: "Desarrollo de Aplicaciones 1/Semana3/SEMANA3_POO.pdf"
    }
  ],
  tasks: [
    {
      id: 3,
      title: "Nombre de la evidencia",
      type: "documento",
      status: "entregado",
      file: "Desarrollo de Aplicaciones 1/Semana3/archivo.pdf"
    }
  ]
}
```

Los tipos reconocidos son `documento`, `codigo` y `presentacion`. Los estados más comunes son `entregado`, `pendiente` y `en progreso`. Para una semana sin materiales o evidencias, deja `materials: []` y `tasks: []`. Para mostrar una evidencia pendiente de archivo, usa `file: "#"`.

El enlace a la actividad se genera a partir de su identificador, así que mantén los `id` de actividades únicos en todas las unidades. Guarda los archivos dentro del repositorio y conserva su ruta relativa para que los enlaces funcionen al publicar el sitio.

## Visualización y publicación

Los archivos locales se pueden abrir desde el visor del portafolio. Las URLs externas dependen de que el servicio de origen permita su visualización y descarga desde el navegador.

Puedes publicar el sitio en GitHub Pages o en otro alojamiento estático. El contenido y los archivos locales forman parte del repositorio; los iconos y la tipografía se cargan desde servicios externos, por lo que su apariencia puede variar sin conexión a internet.
