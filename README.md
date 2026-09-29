# Desafíos Especializate — Guía de contenido

Biblioteca de práctica profesional para egresados de **especIAlizate**. Es una web
en HTML/CSS/JS sin frameworks ni compilación: se abre directo en el navegador.

Esta guía explica **cómo cargar los desafíos reales y crear nuevos**, campo por campo.

---

## 1. Estructura del proyecto

```
desafios-especializate/
├── index.html                estructura de la página + íconos (no se toca para cargar contenido)
├── assets/
│   ├── css/styles.css        estilos y colores (no se toca para cargar contenido)
│   ├── js/
│   │   ├── data.js           ← TODO EL CONTENIDO se edita acá
│   │   └── app.js            lógica de la app (no se toca para cargar contenido)
│   ├── img/                  logos
│   └── files/                acá van los archivos reales para descargar (datasets, PDFs…)
└── README.md                 esta guía
```

> **Regla de oro:** para cargar o editar desafíos, cursos, sectores, etc., **solo se
> edita `assets/js/data.js`**. `app.js` y `styles.css` no hace falta abrirlos.

---

## 2. Cómo probar los cambios

1. Abrí `assets/js/data.js` con cualquier editor de texto (VS Code, Bloc de notas, etc.).
2. Editá y guardá.
3. Abrí `index.html` en el navegador (o refrescá con **Ctrl/Cmd + F5** si ya estaba abierto).

No hay que instalar nada ni "compilar". Si algo no aparece, casi siempre es un error de
sintaxis en `data.js` (ver §9).

---

## 3. Reglas de sintaxis (importante antes de editar)

`data.js` es JavaScript. Respetá estos puntos y no vas a tener problemas:

- Cada valor de texto va **entre comillas dobles**: `title: "Mi título"`.
- Los ítems de una lista y los campos de un objeto se separan con **coma**: `["a", "b", "c"]`.
- Si un texto **lleva comillas dobles adentro**, usá comillas simples afuera o escapalas:
  `descripcion: 'Dijo "hola"'`  ó  `"Dijo \"hola\""`.
- Los **acentos y la ñ** están permitidos en los **textos** (`title`, `description`…),
  pero **NO** en los identificadores (`id`, claves de `SECTORS`/`COURSES`/`SKILLS`).
  Ej.: `id: "obra-presupuesto"` (bien), `id: "presupuestó"` (mal).
- No borres llaves `{ }`, corchetes `[ ]` ni comas de más.

---

## 4. Los catálogos (parte de arriba de `data.js`)

Antes de la lista de desafíos hay cinco catálogos. Se editan pocas veces, pero definen
las opciones disponibles.

### 4.1 `SECTORS` — sectores productivos
Hoy hay 4: `construccion`, `turismo`, `servicios`, `creativas`. Cada uno:

```js
construccion: { label:"Construcción", cls:"s-construccion", icon:"ic-sec-construccion",
                blurb:"Obras, presupuestos y control de costos." },
```

- `label`: nombre visible.  `blurb`: frase corta (aparece en "Acerca de").
- `cls` e `icon`: **no los inventes**. Están atados a un color (en `styles.css`) y a un
  ícono (en `index.html`). Podés **editar** los 4 sectores existentes sin problema.
  **Agregar un sector nuevo es tarea avanzada** (requiere sumar color e ícono): ver §8.

### 4.2 `COURSES` — cursos
Hoy hay 4: `planillas-inteligentes`, `introduccion-ia`, `automatizacion-procesos`,
`contenidos-multimedia`.

```js
"planillas-inteligentes": { label:"Planillas Inteligentes", short:"Planillas Inteligentes",
  blurb:"Aprendé a organizar, calcular, visualizar y automatizar información en planillas…" },
```

- `label`: nombre completo (se ve en el modal del desafío).
- `short`: nombre corto (se ve en la tarjeta y en el filtro).
- `blurb`: descripción (reservada para una futura ficha del curso).

**Para agregar un curso nuevo**, copiá un bloque y cambiá la clave y los textos:

```js
"gestion-datos": { label:"Gestión de datos", short:"Gestión de datos",
  blurb:"Ordená, limpiá y analizá conjuntos de datos para tomar decisiones." },
```

La clave (`"gestion-datos"`) es la que después vas a usar en cada desafío en el campo
`course`. El curso aparece automáticamente en el filtro y en el pie del sitio si le
asignás al menos un desafío.

### 4.3 `DIFFICULTIES` — dificultad
Fija: `inicial` (verde), `intermedio` (amarillo), `avanzado` (naranja). No hace falta
tocarla. Los colores ya están definidos.

### 4.4 `SKILLS` — habilidades (los tags)
Hoy: `analizar`, `crear`, `organizar`, `automatizar`, `investigar`, `resolver`,
`comunicar`, `prompting`. Son los tags que se muestran en las tarjetas y sirven de filtro.

Para **agregar una habilidad**: `presentar: "Presentar",`. Después la usás en `skills` de
cada desafío con su clave (`presentar`).

### 4.5 `DURATIONS` — franjas de tiempo del filtro
Fijas: hasta 30 / 30–60 / más de 60 min. **No se edita.** El desafío solo declara
`duration` en minutos (un número) y la app lo ubica solo en la franja correcta.

---

## 5. Anatomía de un desafío (campo por campo)

La lista `CHALLENGES` contiene un objeto por desafío. Esta es la referencia completa:

| Campo | Qué es / dónde se ve | Valores permitidos |
|---|---|---|
| `id` | Identificador único. No se muestra; se usa internamente. | Texto sin espacios ni acentos, ej. `"hotel-ocupacion"` |
| `title` | Título de la tarjeta y del modal. | Texto libre |
| `sector` | Sector del caso (columna/ícono/tinte). | Una **clave de `SECTORS`** |
| `course` | Curso vinculado (tarjeta, filtro y modal). | Una **clave de `COURSES`** |
| `difficulty` | Nivel (color verde/amarillo/naranja). | `"inicial"`, `"intermedio"` o `"avanzado"` |
| `duration` | Tiempo estimado (número, en minutos). | Número, ej. `45` |
| `skills` | Tags de habilidad (tarjeta y filtro). | Lista de **claves de `SKILLS`** |
| `tools` | Herramientas del caso. No se muestran, **alimentan el buscador**. | Lista de textos, ej. `["planillas","ia"]` |
| `keywords` | Palabras extra para el buscador. No se muestran. | Lista de textos |
| `description` | Bajada corta de la tarjeta y del modal. | Texto libre (1–2 oraciones) |
| `video` | Videos del modal: `{ caso, resolucion }`. | URLs de embed o `""` (ver §6.3) |
| `context` | Sección **1. El contexto** del modal. | Texto libre (párrafo) |
| `challenge` | Sección **2. El desafío** → la **consigna**. | Texto libre |
| `deliverables` | "Entregable esperado" (sección 2). | Lista de textos |
| `practice` | "Qué vas a poner en práctica" (informativo). | Lista de textos |
| `resources` | Sección **3. Recursos** (materiales). Ver §6.1. | Lista de objetos recurso |
| `hints` | Las **pistas** (popups bajo el video). | Lista de textos (recomendado: 3) |
| `prompt` | Prompt sugerido. Queda dentro del **Promptbook** descargable. | Texto libre |
| `solution` | Sección **5. Resolución / Goldcopy**. Ver §6.4. | Objeto (o borralo si no aplica) |

---

## 6. Detalle de los componentes clave

### 6.1 Recursos y **cuál es el "dataset"**
En el modal, la sección **Recursos** muestra exactamente **dos** tarjetas:

1. **El dataset**: la app toma **el primer** recurso de la lista `resources` cuyo `kind`
   sea `"archivo"`, `"dataset"` o `"material"`. Por eso conviene poner **primero** el
   archivo principal de trabajo.
2. **El Promptbook sectorial**: se agrega **solo**, en color violeta; contiene el `prompt`.

Cada recurso es un objeto:

```js
{ name:"Presupuesto de obra.xlsx", type:"Archivo de trabajo", meta:"Planilla · 3 hojas",
  kind:"archivo", url:"assets/files/presupuesto-de-obra.xlsx" }
```

- `name`: nombre visible del archivo.
- `type`: etiqueta (ej. "Archivo de trabajo", "Dataset").
- `meta`: detalle chico (ej. "Planilla · 3 hojas"). Opcional.
- `kind`: define el ícono y si cuenta como dataset. Valores: `archivo`, `dataset`,
  `material`, `consigna`, `plantilla`, `video`, `prompt`.
- `url` (opcional): **la ruta al archivo real**. Si la ponés, el botón **descarga de
  verdad**. Si la dejás sin poner, el botón muestra un aviso de demostración.

> **Nota:** hoy cada desafío trae varios recursos (consigna, plantilla…), pero en el modal
> **solo se muestran el dataset y el promptbook**. Podés dejar los demás en la lista (no
> molestan) o borrarlos. La consigna se lee en la sección "El desafío", no como archivo.

### 6.2 Cargar los archivos reales para descargar
1. Copiá el archivo (ej. `presupuesto-de-obra.xlsx`) dentro de **`assets/files/`**.
2. En el recurso correspondiente de `data.js`, agregá `url:"assets/files/presupuesto-de-obra.xlsx"`.
3. Listo: el botón de ese recurso ahora descarga el archivo real.

Para el **promptbook** real, generá el PDF, guardalo en `assets/files/` y (opcional)
podés hacer que apunte ahí más adelante; hoy el promptbook toma su contenido del campo
`prompt`.

### 6.3 Videos (Acompañamiento en video y Resolución)
Cada desafío tiene:

```js
video:{ caso:"", resolucion:"" },
```

- `caso`: video de la sección 4 (Acompañamiento).  `resolucion`: video dentro de "Ver
  propuesta de resolución".
- Poné la **URL de *embed***, no la del navegador. En YouTube: **Compartir → Insertar** y
  copiá la dirección que aparece en `src="..."` (tiene la forma `https://www.youtube.com/embed/XXXXXXXX`).
  En Vimeo: `https://player.vimeo.com/video/XXXXXXXX`.
- Si lo dejás en `""`, se muestra el placeholder "próximamente".

```js
video:{ caso:"https://www.youtube.com/embed/dQw4w9WgXcQ", resolucion:"" },
```

### 6.4 Resolución / Goldcopy
```js
solution:{
  approach:"Explicación del enfoque recomendado…",
  decisions:["Decisión 1","Decisión 2","Decisión 3"],
  goldcopy:{ name:"Presupuesto de obra — resuelto.xlsx", type:"Archivo resuelto" }
}
```
- `approach`: el enfoque sugerido.  `decisions`: decisiones clave (lista).
- `goldcopy`: el archivo resuelto de referencia (podés sumarle `url` para que se descargue).
- Si un desafío **no** debe mostrar resolución, borrá todo el bloque `solution` (incluida
  la coma anterior). La sección desaparece sola.

---

## 7. Cómo cargar un desafío (paso a paso)

1. Abrí `assets/js/data.js` y buscá la lista `CHALLENGES = [ … ]`.
2. Copiá un desafío completo (desde su `{` hasta su `},`) y pegalo al final de la lista,
   **antes** del `];` que la cierra.
3. Cambiá cada campo por tu contenido real, respetando §5 y §6.
4. Asegurate de que `sector`, `course` y cada `skills` usen **claves que existen** en los
   catálogos (§4).
5. Guardá y refrescá `index.html`.

**Plantilla en blanco para copiar y pegar:**

```js
{
  id:"mi-desafio-unico",
  title:"Título orientado al problema",
  sector:"servicios", course:"introduccion-ia", difficulty:"inicial", duration:30,
  skills:["analizar","comunicar"], tools:["ia"],
  keywords:["palabra1","palabra2"],
  description:"Bajada corta que describe el caso en una o dos oraciones.",
  video:{ caso:"", resolucion:"" },
  context:"Quién sos, dónde trabajás y qué está pasando (párrafo).",
  challenge:"La consigna: el problema concreto a resolver con lo aprendido.",
  deliverables:["Entregable 1","Entregable 2"],
  practice:["Habilidad o contenido 1","Habilidad o contenido 2"],
  resources:[
    { name:"Dataset del caso.xlsx", type:"Archivo de trabajo", meta:"Planilla", kind:"archivo", url:"" }
  ],
  hints:[
    "Pista 1: una orientación suave.",
    "Pista 2: un paso más concreto.",
    "Pista 3: la ayuda más directa."
  ],
  prompt:"Prompt sugerido para trabajar el caso con IA.",
  solution:{
    approach:"El enfoque recomendado.",
    decisions:["Decisión 1","Decisión 2"],
    goldcopy:{ name:"Caso — resuelto.xlsx", type:"Archivo resuelto", url:"" }
  }
},
```

> Consejo: cargá **un** desafío, verificá que aparezca bien, y recién ahí seguí con el
> siguiente. Así, si algo falla, sabés exactamente dónde mirar.

---

## 8. (Avanzado) Agregar un sector nuevo

Un sector nuevo necesita tres cosas coordinadas. Si no te sentís cómodo con esto,
pedímelo y lo dejo listo.

1. **`data.js` → `SECTORS`**: agregá la entrada con una `cls` e `icon` nuevos, por ej.
   `cls:"s-salud"`, `icon:"ic-sec-salud"`.
2. **`assets/css/styles.css`**: definí el color del sector para esa `cls` (buscá cómo
   están `.s-construccion`, `.s-turismo`, etc. y agregá `.s-salud{--sec:#XXXXXX;}` en los
   tres lugares: claro, `[data-theme="dark"]` y el bloque `@media …dark`).
3. **`index.html`**: agregá un `<symbol id="ic-sec-salud" …>` al sprite de íconos (copiá
   uno existente como base).

---

## 9. Si algo no aparece (errores comunes)

- **Toda la lista de desafíos desaparece:** casi siempre es una **coma faltante o de más**,
  una comilla sin cerrar, o una llave/corchete sin balancear en `data.js`. Revisá el
  último desafío que editaste.
- **El desafío aparece sin sector/curso o "vacío":** el `sector`, `course` o una `skill`
  usa una clave que **no existe** en los catálogos. Revisá que coincida exactamente
  (sin acentos, igual escrita).
- **Un video no se ve:** pusiste la URL del navegador en vez de la de *embed* (§6.3).
- **Para diagnosticar:** abrí la **Consola** del navegador (F12 → "Console"); si hay un
  error de sintaxis, ahí figura el archivo y la línea.

---

## 10. Notas técnicas

- Los desafíos que la persona marca se guardan en su navegador (`localStorage`), no en un
  servidor.
- No hay backend, pero está **preparado para conectarlo**: el día que quieras traer los
  desafíos desde una API o un CMS, se reemplaza la fuente de `CHALLENGES` (y la capa de
  guardado) por llamadas al servidor, **sin cambiar la interfaz**.
- Las tipografías se cargan desde Google Fonts (requiere conexión); el resto funciona sin
  internet una vez descargado.
