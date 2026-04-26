# Portafolio Académico Inteligente (SPA)

Bienvenido al ecosistema de tu Portafolio Universitario. Este proyecto ha sido reescrito desde cero utilizando una arquitectura **Bento-Box** moderna y reactiva. 

La filosofía principal de este repositorio es el **Control Centralizado**. No necesitas duplicar archivos `.html` ni saber programación avanzada para administrar tu página. Todas las actualizaciones (incluyendo tu foto, textos descriptivos y semanas de tareas) se realizan única y exclusivamente editando el archivo `data.js`.

---

## Estructura del Ecosistema

- **`index.html`**: Portada y dashboard principal de bienvenida.
- **`tareas.html`**: Repositorio dinámico o línea de progreso.
- **`perfil.html`**: Presentación personal tipo carnet (CV), con logo y descripción institucional.
- **`semana.html`**: **[NO DUPLICAR]** Plantilla maestra paramétrica. Esta única página se encarga de renderizar la semana 1, la semana 16 o cualquier otra de forma dinámica dependiendo del enlace (`semana.html#3`). 
- **`visor.html`**: Navegador PDF de Pantalla Exclusiva con una Isla Dinámica para una lectura purista y un gestor nativo de descargas para evitar redirecciones molestas.
- **`data.js`**: **EL CEREBRO DEL SISTEMA**. Tu central de comando para editar perfil, carrera y tareas.
- **`style.css`**: Hoja de diseño y animaciones.
- **`script.js`**: Motor de Reactividad encargado del enrutamiento. (No necesitas tocarlo).

---

## ¿Cómo actualizar mi Información e Imágenes?

Para cambiar cualquier información tuya o de la universidad, abre con tu editor de código o un bloc de notas el archivo `data.js`. Al inicio encontrarás el objeto `CONFIG`.

### Diccionario de Variables de Perfil
*   **`studentName`**: Tu nombre legal completo para la tarjeta formal (Ej. `"Condori Moreno Joshep Emerson"`).
*   **`shortName`**: Tu nombre de pila o apodo corto para los saludos (Ej. `"Joshep"`).
*   **`studentImage`**: La ruta a tu foto. (Ej. `"img/foto.jpg"`). Solo mete la foto en la carpeta `img` y escribe aquí su nombre.
*   **`studentCode`** y **`studentEmail`**: Tu código universitario y correo.
*   **`aboutMe`**: **[NUEVO]** Aquí redactas o editas totalmente tu biografía (la sección "Sobre Mí").
*   **`career`** y **`shortCareer`**: Tu carrera formal (Ej. `"Ingeniería de Sistemas y Computación"`) y la abreviación para el muro de bienvenida (`"Ingeniería"`).

### Diccionario de Variables Institucionales (Universidad)
*   **`universityName`**: El nombre de tu institución.
*   **`aboutUniversity`**: **[NUEVO]** Descripción, visión o pequeña reseña de tu universidad.
*   **`universityLogo`**: El escudo de tu institución (Ej. `"img/logoupla.png"`).
*   **`course`** y **`semester`**: Materia y ciclo en curso. (Estos se reflejan textualmente en la bienvenida del Index).
*   **`footerText`**: El Copyright de final de página (usa corchetes autocompletables como `[UNIVERSITY_NAME] - [NAME_STUDENT]`).

---

## Gestión de Semanas y Tareas (Subir archivos)

Desplázate un poco más abajo en tu archivo `data.js` y encontrarás la lista `weeks`. El código recorrerá inteligentemente este lugar.

### ¿Cómo agregar o habilitar un archivo PDF a la semana?

Busca la tarea específica dentro de la semana y asegúrate de apuntar el atributo `file` a tu archivo:
```javascript
{
  id: 1,
  title: "APACHE MAVEN", // <- El título general de la unidad/semana
  tasks: [
    {
      title: "Guía Git",      // <- Título de la evidencia
      type: "documento",      // <- Iconografía (documento, code, etc)
      status: "entregado",    // <- Colores de estado (entregado, pendiente, en progreso)
      file: "Semana1/GUIA GITHUB.pdf" // <- RUTA AL ARCHIVO QUE QUIERES MOSTRAR
    }
  ]
}
```

*   **Sin evidencias aún:** Si todavía no has subido el PDF o es privado, simplemente cámbialo a `file: "#"` o `file: "null"`. El sistema lo detectará inteligentemente y en su lugar mostrará un aviso de Error Preventivo.
*   **URLs Externas:** Si tu archivo pesa mucho y lo subiste a Google Drive, puedes simplemente pegar el enlace en lugar de la ruta local (ej. `file: "https://drive.google.com/..."`).

---

## Despliegue, Visor y Uso sin Internet

Tu portafolio está programado nativamente usando una arquitectura _Hash-Routing_ (`#`), combinada con selectores DOM en Javascript puro y un gestor nativo de transferencias en `Blob Data`.

**¿Qué significa todo esto?**
Significa que **puedes copiar toda la carpeta en un USB, compartirlo sin internet y este funcionará y abrirá todos los PDFs a la perfección** (file:// protocol) sin jamás colgarse ni depender de servidores web como Node o Apache. Además, es directamente subible a la red (Netlify o GitHub Pages) para obtener una web profesional y funcional en menos de un segundo y de forma totalmente libre.

> Desarrollado con aplicando código limpio y principios de Software Sólido.
