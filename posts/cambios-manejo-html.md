# Cambios realizados en manejo-html.html

## Resumen general

Se reestructuró completamente la sección "Lista de Etiquetas" del archivo `manejo-html.html`. El objetivo fue:
1. Agrupar etiquetas con funciones similares
2. Añadir un ejemplo de código mostrando cómo se usan las etiquetas juntas
3. Incluir tablas de atributos para cada grupo

---

## Cambios en style.css

### Ubicación: `style.css:112-127`

**Código añadido:**
```css
h3.section-title {
    color: #0ceca5;
    font-size: 1.2em;
    margin-top: 25px;
    margin-bottom: 10px;
    border-bottom: 1px solid #0ceca5;
    padding-bottom: 5px;
}

h3.section-tag {
    display: inline-block;
    margin: 15px 0 5px 0;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 0.95em;
}
```

**Razón:** Se añadieron dos nuevos estilos:
- `h3.section-title`: Para los títulos de cada grupo de etiquetas (ej: "1. Estructura del documento")
- `h3.section-tag`: Para cuando se necesiten destacar etiquetas individuales dentro de una sección

---

## Cambios en manejo-html.html

### Ubicación aproximada: Líneas 110-590

Se reemplazó toda la lista `<ul>` de etiquetas individuales por una estructura reorganizada con 9 secciones:

---

### Sección 1: Estructura del documento (línea ~113)

**Etiquetas agrupadas:** `<html>`, `<head>`, `<body>`

**Contenido añadido:**
- Párrafo explicativo
- Ejemplo de código con las 3 etiquetas
- Tabla con atributos: `lang`, `xmlns`

**Razón:** Estas tres etiquetas forman la base de todo documento HTML y deben entenderse juntas.

---

### Sección 2: Enlaces e hipervínculos (línea ~153)

**Etiquetas agrupadas:** `<a>`, `<link>`

**Contenido añadido:**
- Párrafo explicativo
- Ejemplo de `<a>`
- Ejemplo de `<link>`
- Tabla con atributos:
  - `<a>`: `href`, `target`, `title`
  - `<link>`: `rel`, `href`, `type`

**Razón:** Ya estaban agrupadas por el usuario, solo se añadió la tabla de atributos.

---

### Sección 3: Elementos de tabla (línea ~209)

**Etiquetas agrupadas:** `<table>`, `<tr>`, `<td>`, `<th>`

**Contenido añadido:**
- Párrafo explicativo
- Ejemplo con las 4 etiquetas
- Tabla con atributos:
  - `<table>`: `border`, `cellpadding`, `cellspacing`
  - `<td>` y `<th>`: `colspan`, `rowspan`

**Razón:** Estas 4 etiquetas siempre trabajan juntas para formar tablas.

---

### Sección 4: Elementos de formulario (línea ~268)

**Etiquetas agrupadas:** `<form>`, `<input>`, `<label>`, `<select>`, `<option>`, `<textarea>`, `<button>`, `<fieldset>`, `<legend>`

**Contenido añadido:**
- Párrafo explicativo
- Ejemplo de `<form>` con `<input>`, `<label>`, `<button>`
- Ejemplo de `<select>` con `<option>`
- Ejemplo de `<fieldset>` con `<legend>` y `<textarea>`
- Tabla con atributos para cada etiqueta

**Razón:** Todas estas etiquetas sirven para crear formularios interactivos.

---

### Sección 5: Elementos de texto (línea ~394)

**Etiquetas agrupadas:** `<p>`, `<br>`, `<hr>`

**Contenido añadido:**
- Párrafo explicativo
- Ejemplo con las 3 etiquetas
- Tabla con atributos de `<hr>`: `color`, `size`, `width`

**Razón:** Son etiquetas básicas para manejo de texto y espaciado.

---

### Sección 6: Listas (línea ~434)

**Etiquetas agrupadas:** `<ol>`, `<ul>`, `<li>`

**Contenido añadido:**
- Párrafo explicativo
- Ejemplo de `<ol>` y `<ul>`
- Tabla con atributos:
  - `<ol>` y `<ul>`: `type`, `start`
  - `<li>`: `value`

**Razón:** Estas etiquetas siempre trabajan juntas para crear listas.

---

### Sección 7: Multimedia y recursos embebidos (línea ~481)

**Etiquetas agrupadas:** `<img>`, `<iframe>`, `<script>`, `<style>`

**Contenido añadido:**
- Párrafo explicativo
- Ejemplo de `<img>`
- Ejemplo de `<iframe>`
- Ejemplo de `<script>`
- Ejemplo de `<style>`
- Tabla con atributos para cada etiqueta

**Razón:** Todas permiten embeber o enlazar recursos externos en la página.

---

### Sección 8: Título de página (línea ~572)

**Etiqueta:** `<title>`

**Contenido añadido:**
- Párrafo explicativo
- Ejemplo de código
- Nota sobre atributos globales

**Razón:** Es una etiqueta importante pero simple, no requiere atributos propios.

---

### Sección 9: Contenedor genérico (línea ~581)

**Etiqueta:** `<div>`

**Contenido añadido:**
- Párrafo explicativo
- Ejemplo de código
- Nota sobre atributos globales

**Razón:** Es el contenedor más básico y versátil de HTML.

---

## Cambios eliminados

- Se eliminaron los `<li>` individuales que existían antes para cada etiqueta
- Se eliminó el duplicado de `<table>` que aparecía dos veces en el código original
- Se eliminaron los comentarios de ayuda sobre indentación de código

---

## Estructura visual de cada sección

Cada sección sigue este patrón:

```html
<h3 class="section-title">Título de sección</h3>
<p>Descripción del grupo de etiquetas</p>
<pre><code class="language-html">Ejemplo de código</code></pre>
<table>
    <thead>
        <tr>
            <th>Atributo</th>
            <th>Descripción</th>
            <th>Ejemplo</th>
        </tr>
    </thead>
    <tbody>
        <!-- filas de atributos -->
    </tbody>
</table>
```

---

## Atributos globales documentados

Los siguientes atributos globales se mencionan en la sección "Atributos de una etiqueta HTML":
- `id`
- `class`
- `style`
- `title`
- `lang`
- `hidden`

Cada uno tiene su propio ejemplo de código.

---

## Notas técnicas

1. Los ejemplos de código dentro de `<pre><code>` mantienen la indentación intencionalmente para mostrar la estructura jerárquica.

2. Las tablas usan `<span class="code">` para destacar los nombres de atributos y valores.

3. El estilo `h3.section-title` incluye un borde inferior verde (`#0ceca5`) para separar visualmente las secciones.

4. Las tablas usan `colspan="3"` para crear encabezados de subsección dentro de la misma tabla (ej: cuando una tabla tiene atributos para múltiples etiquetas).

5. El archivo tiene un total de 604 líneas después de los cambios.
