"use strict";
/* =============================================================================
   DESAFÍOS ESPECIALIZATE — CONTENIDO EDITABLE
   -----------------------------------------------------------------------------
   Este archivo concentra TODO el contenido. Para editar el sitio normalmente
   alcanza con tocar esto (no hace falta abrir app.js).

   · SECTORS / COURSES / DIFFICULTIES / SKILLS / DURATIONS: catálogos base.
   · CHALLENGES: la lista de desafíos. Cada objeto es un desafío; para crear uno
     nuevo, copiá un bloque entero y cambiá los campos:
       id · title · sector · course · difficulty · duration · skills · tools ·
       keywords · description · privacidad? (aviso de datos, OPCIONAL: solo si el caso maneja datos sensibles) · video{caso,resolucion} (pegá el link de YouTube tal cual de "Compartir") · context · challenge ·
       deliverables[] · practice[] · resources[]{name,type,meta,kind,url?} · hints[] ·
       prompt · solution{approach,decisions[],goldcopy{name,type}}
     El dataset que se muestra en "Recursos" se toma del primer recurso de tipo
     "archivo"/"dataset"/"material". Los videos vacíos muestran "próximamente".
   ============================================================================= */

/* ---------------- CONFIG ---------------- */
const SECTORS = {
  construccion: { label:"Construcción", cls:"s-construccion", icon:"ic-sec-construccion", blurb:"Obras, presupuestos y control de costos." },
  turismo:      { label:"Turismo y hospitalidad", cls:"s-turismo", icon:"ic-sec-turismo", blurb:"Hoteles, ocupación y experiencia del huésped." },
  servicios:    { label:"Servicios empresariales", cls:"s-servicios", icon:"ic-sec-servicios", blurb:"Ventas, clientes y gestión comercial." },
  creativas:    { label:"Industrias creativas", cls:"s-creativas", icon:"ic-sec-creativas", blurb:"Producción, contenidos y diseño." }
};

const COURSES = {
  "planillas-inteligentes": { label:"Planillas Inteligentes", short:"Planillas Inteligentes",
    blurb:"Aprendé a organizar, calcular, visualizar y automatizar información en planillas, con IA como asistente." },
  "introduccion-ia": { label:"Introducción a la Inteligencia Artificial", short:"Introducción a la IA",
    blurb:"Descubrí cómo usar la IA para analizar, crear, redactar y tomar mejores decisiones en tu trabajo." },
  "automatizacion-procesos": { label:"Automatización de procesos", short:"Automatización de procesos",
    blurb:"Diseñá flujos que automatizan tareas repetitivas combinando planillas, IA y buenas prácticas de proceso." },
  "contenidos-multimedia": { label:"Creación de contenidos multimedia", short:"Contenidos multimedia",
    blurb:"Planificá, creá y producí contenidos visuales y audiovisuales con apoyo de herramientas de IA." }
};

const DIFFICULTIES = {
  inicial:    { label:"Inicial", level:1 },
  intermedio: { label:"Intermedio", level:2 },
  avanzado:   { label:"Avanzado", level:3 }
};

const SKILLS = {
  analizar:   "Analizar",
  crear:      "Crear",
  organizar:  "Organizar",
  automatizar:"Automatizar",
  investigar: "Investigar",
  resolver:   "Resolver",
  comunicar:  "Comunicar",
  prompting:  "Prompting"
};

const DURATIONS = [
  { id:"corto", label:"Hasta 30 min", test:d => d <= 30 },
  { id:"medio", label:"30–60 min",    test:d => d > 30 && d <= 60 },
  { id:"largo", label:"Más de 60 min",test:d => d > 60 }
];

const RESOURCE_ICONS = { dataset:"ic-sheet", archivo:"ic-sheet", consigna:"ic-clip", plantilla:"ic-template", material:"ic-file", video:"ic-video", prompt:"ic-spark", recurso:"ic-file" };

/* ---------------- DATA: desafíos ---------------- */
const CHALLENGES = [
  {
  id:"turismo-prompt-imagen-promo",
  privacidad:"Este brief tiene datos internos de un negocio: tarifas, ocupación y el contacto de la dueña. Con un brief real, compartí con la IA solo la información visual que necesita y dejá afuera los datos de la empresa y de las personas, como viste en el curso.",
  title:"Armá con IA el prompt de la imagen para una promo de primavera",
  sector:"turismo", course:"introduccion-ia", difficulty:"inicial", duration:30,
  skills:["crear","prompting","comunicar"], tools:["ia","chatgpt","gemini"],
  keywords:["prompt de imagen","generación de imágenes","brief","instagram","redes sociales","promoción","cabañas","primavera"],
  description:"Unas cabañas de El Bolsón necesitan la imagen para su promo de primavera en Instagram. Convertí el brief en un buen prompt de imagen y mejoralo hasta que el resultado cumpla lo pedido.",
  video:{ caso:"https://youtu.be/nXeh3MzQCaM", resolucion:"" },
  context:"Trabajás en la recepción de Cabañas Arroyo Blanco, un complejo de seis cabañas de madera en El Bolsón, Río Negro. La dueña, Laura, quiere lanzar en octubre la promo \"Primavera en la cordillera\" (3 noches al precio de 2) y necesita una imagen para Instagram. No hay presupuesto para un fotógrafo, así que te pidió que la generes con IA. Te pasó un brief con todo lo que tiene que transmitir la imagen, pero también con datos internos del negocio.",
  challenge:"A partir del brief, escribí un prompt para generar la imagen del posteo de la promo con una herramienta de IA. Probalo, revisá el resultado contra lo que pide el brief y mejoralo al menos una vez. Al final, dejá tu prompt final y explicá qué cambiaste y por qué.",
  deliverables:[
    "Prompt final para generar la imagen del posteo",
    "Primera versión del prompt y qué cambiaste en la versión final (y por qué)",
    "Checklist breve: qué pedía el brief y si la imagen lo cumple"
  ],
  practice:[
    "Extraer de un brief lo que tiene que mostrar una imagen",
    "Estructurar un prompt de imagen (qué, cómo, encuadre, formato, qué evitar)",
    "Iterar un prompt a partir del resultado",
    "Compartir con la IA solo la información necesaria"
  ],
  resources:[
    { name:"Brief creativo — Cabañas Arroyo Blanco.pdf", type:"Material de trabajo", meta:"PDF · brief de 3 páginas",
      kind:"material", url:"https://drive.google.com/file/d/1t0y_iHMNHtegsvEOz5hcKXCnMioVrdrp/view?usp=sharing" },
    { name:"Promptbook del desafío.docx", type:"Promptbook", meta:"PDF · 7 prompts paso a paso",
      kind:"prompt", url:"https://drive.google.com/file/d/1jejpXnPGXEclsjAUcng4uep5Aj0a0zYc/view?usp=sharing" }
  ],
  hints:[
    "Antes de escribir el prompt, marcá en el brief tres cosas: qué tiene que aparecer, cómo se tiene que ver y qué no puede aparecer. No todo el brief sirve para la imagen.",
    "Un buen prompt de imagen describe qué se ve (sujeto y escena), cómo se ve (estilo, luz, colores), el encuadre y el formato, y lo que hay que evitar. Si falta alguna de esas partes, la IA la completa a su manera.",
    "Si la imagen trae algo que el brief no quiere (texto, personas, demasiada nieve), no empieces de cero: nombrá esa restricción de forma explícita en el prompt y volvé a generar."
  ],
  prompt:"Actuá como director/a de arte de una agencia chica. Te paso la parte visual de un brief para la imagen de un posteo de Instagram de unas cabañas en la Patagonia. Todavía no escribas el prompt: ordená la información en tres listas (qué tiene que aparecer, cómo se tiene que ver y qué hay que evitar) y agregá el formato de la imagen. Si falta algún dato importante para generar la imagen, preguntámelo. [pegá acá solo la parte visual del brief]",
  solution:{
    approach:"Primero se separa del brief la información visual de los datos internos del negocio, que no hacen falta para la imagen. Después se arma el prompt con una estructura fija: qué se ve, cómo se ve, encuadre y formato, y qué evitar. Se genera una primera imagen, se la revisa contra el brief con un checklist y se ajusta el prompt nombrando de forma explícita lo que falló.",
    decisions:[
      "Compartir con la IA solo la parte visual del brief: tarifas, ocupación y contacto de la dueña quedan afuera.",
      "Describir una escena concreta (galería de la cabaña con dos tazas, montañas y retamas en flor) en lugar de adjetivos sueltos como \"linda\" o \"acogedora\".",
      "Fijar la estación con detalles visibles: flores amarillas de retama y apenas nieve en las cumbres, para que no parezca invierno.",
      "Pedir formato vertical 4:5 y dejar el tercio superior despejado, porque el texto de la promo se agrega después en un editor, no dentro de la imagen.",
      "En la segunda versión, nombrar las restricciones que la primera imagen no respetó: sin personas, sin texto ni logos y sin elementos de lujo."
    ],
    goldcopy:{ name:"Prompt de la imagen — resuelto.pdf", type:"Documento resuelto",
               url:"https://drive.google.com/file/d/10njAXuFr65mZ0x2An1P-BSFVMlLOcjR8/view?usp=sharing" }
  }
},
{
  id:"construccion-prompt-promociones",
  title:"Armá un prompt para crear las promociones de un corralón",
  sector:"construccion", course:"introduccion-ia", difficulty:"inicial", duration:30,
  skills:["prompting","crear","comunicar"], tools:["ia","chatgpt","gemini"],
  keywords:["promociones","corralón","materiales","ventas","whatsapp","descuentos","prompt","cartel"],
  description:"Trabajás en ventas de un corralón de materiales y tenés que usar la IA para crear las promociones de la semana, respetando el stock y las reglas del dueño.",
  video:{ caso:"https://youtu.be/4CWiR1OA7wU", resolucion:"" },
  context:"Trabajás en el equipo de ventas de Corralón El Molino, en Paraná. Atendés el mostrador y manejás la lista de difusión de WhatsApp, donde hay unos 900 clientes: albañiles, maestros mayores de obra y vecinos que refaccionan. Todas las semanas hay que armar promociones y nadie tiene tiempo. Un compañero ya probó pedírselas a la IA con un prompt de una línea, y el resultado fue un \"20 % OFF en todo + envío gratis\" que el dueño no puede dar.",
  challenge:"Escribí un prompt para que la IA cree las 3 promociones de la semana del 19 al 24 de octubre. Tiene que usar los productos y los descuentos máximos del brief y cumplir las reglas de Raúl, el dueño. Por cada promo, la IA tiene que devolver un nombre, la mecánica, un mensaje de WhatsApp de hasta 50 palabras y un texto para el cartel de hasta 10 palabras. Probá el prompt, revisá el resultado y corregí lo que no cumpla.",
  deliverables:[
    "El prompt final",
    "Las 3 promociones generadas por la IA, revisadas",
    "Una línea explicando qué corregiste después de la primera respuesta"
  ],
  practice:[
    "Darle a la IA contexto, datos y límites concretos",
    "Convertir reglas del negocio en instrucciones claras",
    "Pedir un formato de salida listo para usar (WhatsApp y cartel)",
    "Revisar lo que genera la IA y pedir ajustes"
  ],
  resources:[
    { name:"Brief de promociones — Corralón El Molino.pdf", type:"Material del caso", meta:"PDF · 1 páginas · tabla de 5 productos  ·  Reglas del dueño",
      kind:"material", url:"https://drive.google.com/file/d/1ATLc4fpbtlk42C3qd_SnedZfZcajZsrc/view?usp=drive_link" },
    { name:"Promptbook — Promociones del corralón.pdf", type:"Promptbook", meta:"PDF · 3 pasos + variante",
      kind:"prompt", url:"https://drive.google.com/file/d/1ryBnRO25NIef7kus4t-EotC90uFMkeFx/view?usp=sharing" }
  ],
  hints:[
    "Empezá por el intento de Lucas: ¿qué no sabía la IA cuando le pidió \"promociones para un corralón\"?",
    "Pasale a la IA los datos que necesita (productos, stock, descuento máximo, fechas) y las reglas de Raúl escritas como instrucciones, no como sugerencias.",
    "Hay productos que conviene promocionar y otros que no: dejá explícito cuáles priorizar y cuál no se toca. Y decile exactamente qué partes querés de cada promo y cuántas palabras como máximo."
  ],
  prompt:"Te paso un prompt que escribió un vendedor de un corralón de materiales y la respuesta que obtuvo. Explicame qué información le faltó al prompt para que la IA pudiera hacer promociones útiles y realistas. No escribas promociones todavía. Prompt: \"Haceme promociones para un corralón de materiales.\" Respuesta: \"¡MEGA SALE! 20 % OFF en TODOS los materiales + envío GRATIS. ¡Solo por hoy!\"",
  solution:{
    approach:"Partir del error del prompt de una línea para ver qué le faltaba a la IA: contexto, datos, límites y formato. Después, armar un prompt por bloques con la tabla de productos y las reglas de Raúl escritas como obligatorias, probarlo y corregir con un segundo pedido lo que no cumpla.",
    decisions:[
      "Pasarle la tabla completa con los descuentos máximos, para que la IA no invente porcentajes.",
      "Escribir la prioridad (lo que sobra o se discontinúa) y marcar el hierro como NO PROMOCIONAR.",
      "Convertir cada regla de Raúl en una instrucción obligatoria: forma de pago, vigencia, sin envío gratis, aviso de discontinuado, tono.",
      "Pedir un formato de salida fijo con límites de palabras para WhatsApp y cartel.",
      "Revisar e iterar: la primera respuesta prometió envío sin cargo y se pasó de largo en un mensaje."
    ],
    goldcopy:{ name:"Promociones del corralón — resuelto.pdf", type:"Archivo resuelto",
               url:"https://drive.google.com/file/d/1eMJ-sgIuZK_7fzUp9msMa2EzLpIkGY7P/view?usp=sharing" }
  }
},
{
  id:"creativas-prompt-campana-cafe",
  privacidad:"El brief tiene información comercial de un cliente (ventas por franja horaria, ticket promedio, presupuesto) y los datos de contacto de la dueña. Con un cliente real, reemplazá el nombre del negocio y sacá números internos y contactos antes de pegar el brief en una IA, como viste en el curso.",
  title:"Diseñá el prompt para la campaña de primavera de un café",
  sector:"creativas", course:"introduccion-ia", difficulty:"inicial", duration:30,
  skills:["prompting","comunicar","crear"], tools:["ia","chatgpt","gemini"],
  keywords:["prompt","campaña","marketing","café","instagram","brief","redes sociales","estructura de prompt"],
  description:"Un café de especialidad lanza su merienda de primavera y el estudio necesita una propuesta de campaña. Tu tarea: convertir el brief del cliente en un prompt claro para que la IA arme un primer borrador que sirva.",
  video:{ caso:"https://youtu.be/iY4tFvH7Rz8", resolucion:"" },
  context:"Trabajás como productor/a de contenidos junior en Estudio Trama, un estudio chico de comunicación de Rosario que maneja las redes de varios comercios de barrio. Uno de los clientes es Almácigo, un café de especialidad de barrio Pichincha: a la mañana está lleno, pero de martes a viernes, entre las 15 y las 18 h, las mesas quedan vacías. Para revertirlo, lanzan la 'Merienda de primavera' y le pidieron al estudio una campaña de cuatro semanas. Martín, tu líder de cuentas, ya probó pedirle la campaña a la IA con una sola línea y el resultado no sirvió: genérico, con un descuento que no existe y un tono que no es el del café.",
  challenge:"Escribí el prompt que vas a usar para que la IA te arme una primera propuesta de campaña para la Merienda de primavera de Almácigo. Tiene que salir del brief e incluir las cinco partes que viste en el curso: rol, contexto, tarea, formato de la respuesta y restricciones. Probalo en un chat nuevo, revisá la respuesta contra el brief y hacé al menos una iteración para mejorar lo que no funcionó. No hace falta que la campaña quede perfecta: lo que se evalúa es el prompt.",
  deliverables:[
    "Tu prompt en dos versiones: la primera y la mejorada después de probarla",
    "La respuesta que te dio la IA con la versión mejorada",
    "Un checklist corto contra el brief: qué pedía el cliente y si la respuesta lo cumple",
    "Tres o cuatro líneas sobre qué cambiaste entre versiones y por qué"
  ],
  practice:[
    "Estructurar un prompt con rol, contexto, tarea, formato y restricciones",
    "Traducir un brief de cliente en instrucciones claras para la IA",
    "Detectar por qué un prompt vago da respuestas genéricas",
    "Iterar un prompt a partir de lo que falló en la respuesta",
    "Cuidar la información del cliente antes de compartirla con una IA"
  ],
  resources:[
    { name:"Brief — Campaña Merienda de primavera.docx", type:"Brief del cliente", meta:"PDF · 3 páginas · brief + primer intento fallido",
      kind:"material", url:"https://drive.google.com/file/d/1s73xNbX9AUwEODwkrDuC1-c3AKq2HRam/view?usp=sharing" },
    { name:"Promptbook del desafío.docx", type:"Promptbook", meta:"Word · 7 prompts paso a paso",
      kind:"prompt", url:"https://drive.google.com/file/d/1muGBTx6h4Dro3nadHll9T2vg-MVFvb0j/view?usp=sharing" }
  ],
  hints:[
    "Antes de escribir, marcá en el brief lo que la IA sí o sí necesita saber: qué se lanza, para quién, cuándo, dónde se publica y con qué tono. Lo que no cambia la respuesta, dejalo afuera.",
    "Mirá el primer intento de Martín en el anexo: cada problema de esa respuesta (el descuento inventado, el tono, las ideas genéricas) es una instrucción que faltaba. Convertilos en restricciones de tu prompt.",
    "Pedí un formato concreto (cuántas semanas, cuántas piezas, largo máximo de cada texto) y cerrá el prompt pidiéndole a la IA que marque los supuestos que hizo o que te pregunte lo que le falte antes de responder."
  ],
  prompt:"Actuá como mentor/a de prompting. Tengo que escribir un prompt para que una IA me arme una propuesta de campaña en redes para un café de especialidad. Te paso el brief del cliente (ya le saqué el nombre, los contactos y los números internos). Ayudame a separar la información en cinco partes: rol, contexto, tarea, formato de la respuesta y restricciones. Marcá qué datos del brief conviene incluir y cuáles no cambian la respuesta. Todavía no escribas el prompt final: quiero armarlo yo. Brief: [pegá acá el brief anonimizado]",
  solution:{
    approach:"Primero se protege la información del cliente (nombre, contactos, ventas). Después se lee el brief para quedarse con lo que la IA necesita y se diagnostica el primer intento de Martín para convertir sus fallas en instrucciones. Con eso se arma la versión 1 del prompt con rol, contexto, tarea, formato y restricciones; se prueba en un chat nuevo y se revisa la respuesta con un checklist hecho desde el brief. Por último se itera con ajustes puntuales hasta llegar a una versión 2 que devuelve una propuesta usable.",
    decisions:[
      "Rol concreto y situado (estratega de contenidos para cafés de barrio en Argentina), en lugar de 'experto en marketing'.",
      "Contexto con los datos que cambian la respuesta (franja 15–18 h de martes a viernes, combo a $8.500, público, canales, fechas) y sin ventas, ticket promedio ni contactos; el nombre del café va como [NOMBRE DEL CAFÉ].",
      "Restricciones que salen del primer intento fallido: no inventar descuentos ni sorteos, no usar 'barato', voseo rioplatense, sin vasos descartables en las imágenes sugeridas.",
      "Formato cerrado: concepto y mensaje clave, tabla de 4 semanas, 3 textos de hasta 60 palabras con llamado a la acción y 3 ideas de stories.",
      "Pedirle a la IA que liste los supuestos que hizo, para detectar lo que inventó.",
      "Iterar con ajustes puntuales sobre la misma conversación, sin reescribir todo el prompt."
    ],
    goldcopy:{ name:"GoldCopy - Prompt campaña café.pdf", type:"Archivo resuelto",
               url:"https://drive.google.com/file/d/1KdhZBzZE18ctk5OI90MiAaI9SKFOP9u1/view?usp=sharing" }
  }
},
{
  id:"creativas-idea-cliente-campana",
  title:"Diseñá un prompt que te ayude a entender los pedidos del cliente",
  sector:"creativas", course:"introduccion-ia", difficulty:"inicial", duration:30,
  skills:["prompting","analizar","comunicar"], tools:["ia","chatgpt","gemini"],
  keywords:["prompt","brief","cliente","campaña","marketing","reunión","mails","heladería","estudio creativo"],
  description:"Un cliente nuevo te dejó su idea de campaña repartida entre una reunión, tres mails y un brief a medio llenar. Diseñá un prompt para que la IA la ordene sin inventar nada.",
  privacidad:"Los materiales incluyen nombres y mails de los dueños de la heladería, además de datos comerciales (presupuesto y ventas). Con un cliente real, anonimizá esa información antes de pegarla en una IA, como viste en el curso.",
  video:{ caso:"https://youtu.be/s3SUMEEKPHA", resolucion:"" },
  context:"Trabajás como ejecutivo/a de cuentas junior en Estudio Faro, un estudio creativo de Córdoba. Acaban de sumar una cuenta nueva: Helados Pampa Fría, una heladería artesanal con tres locales que quiere una campaña para esta temporada. Ya hubo una reunión inicial y después llegaron tres mails, pero la información está desordenada y el dueño y su hija no siempre dicen lo mismo. El brief que completó el cliente quedó casi vacío.",
  challenge:"Tu directora te pide que, antes de pensar ideas creativas, dejes en claro qué quiere el cliente. Escribí un prompt que le pida a la IA leer la transcripción, los mails y el brief, y ordenar la idea del cliente en un brief de una página. La IA no tiene que inventar: lo que falte o se contradiga tiene que quedar marcado para validarlo. Después, revisá la respuesta contra los materiales y armá las preguntas para la próxima reunión.",
  deliverables:[
    "Tu prompt, con rol, contexto, tarea, formato de salida y límites.",
    "El brief ordenado por la IA y revisado por vos (con lo que falta o se contradice marcado).",
    "Entre 3 y 5 preguntas para validar con el cliente."
  ],
  practice:[
    "Estructura de un prompt: rol, contexto, tarea, formato y límites.",
    "Pedirle a la IA un formato de salida fácil de revisar.",
    "Evitar que la IA invente datos que no están en los materiales.",
    "Revisar críticamente una respuesta de IA antes de usarla.",
    "Anonimizar información de clientes antes de compartirla con una IA."
  ],
  resources:[
    { name:"Materiales del cliente — Pampa Fría.pdf", type:"Material de trabajo", meta:"PDF · Reunión, 3 mails y brief",
      kind:"material", url:"https://drive.google.com/file/d/1iBgymy6FMbUSYsbTZH3B9lKko104JLC3/view?usp=drive_link" },
    { name:"Promptbook — Idea del cliente.pdf", type:"Promptbook", meta:"PDF · Plantilla y 3 prompts",
      kind:"prompt", url:"https://drive.google.com/file/d/1OGvN7vBwJP6KHTcYKGKwnc-IGAiNINP_/view?usp=drive_link" }
  ],
  hints:[
    "Antes de escribir el prompt, pensá qué campos tiene que tener un brief y cómo querés recibir la respuesta: ¿texto corrido, lista o tabla?",
    "Pedile a la IA que indique de qué material sale cada dato. Así vas a poder revisar rápido si lo inventó o no.",
    "Hay al menos tres temas en los que Raúl y Micaela no dicen lo mismo. En lugar de que la IA elija una versión, pedile que los marque como pendientes de validar."
  ],
  prompt:"Estoy armando un prompt para que una IA lea la transcripción de una reunión, unos mails y un brief incompleto de un cliente, y me ordene su idea para una campaña de marketing. Revisá mi borrador y decime qué le falta en cuanto a rol, contexto, tarea, formato de salida y límites. No lo reescribas entero: marcame los 3 cambios que más mejorarían la respuesta. Mi borrador: [pegá acá tu prompt]",
  solution:{
    approach:"Escribir un prompt con rol, contexto, tarea, formato y límites; pegar los tres materiales etiquetados, y pedirle a la IA que ordene la idea del cliente en una tabla que separe lo confirmado de lo que falta o se contradice. Después, revisar la respuesta contra los materiales y convertir las dudas en preguntas para el cliente.",
    decisions:[
      "Pedir un formato fijo (campo, qué dijo el cliente, fuente y estado) para que la respuesta sea fácil de revisar.",
      "Aclarar explícitamente que la IA no complete lo que falta: lo marca como «A validar» o «Falta».",
      "Pegar los tres materiales juntos y etiquetados, para que la IA pueda cruzar la reunión, los mails y el brief.",
      "Revisar la salida contra los materiales, corregir lo que la IA supuso y transformar los pendientes en preguntas."
    ],
    goldcopy:{ name:"Idea del cliente Pampa Fría — resuelto.pdf", type:"Archivo resuelto",
               url:"https://drive.google.com/file/d/1PzYOZZbUv5ux0b9_Tsh5_JQEeUTMPniU/view?usp=drive_link" }
  }
},
{
  id:"servicios-prompt-encuesta",
  title:"Armá el prompt para la encuesta de clientes de una pyme",
  sector:"servicios", course:"introduccion-ia", difficulty:"inicial", duration:30,
  skills:["prompting","analizar","comunicar"], tools:["ia","chatgpt","gemini","formularios"],
  keywords:["encuesta","satisfacción","clientes","prompt","pyme","google forms","notas de reunión","requisitos"],
  description:"Una pyme rosarina de limpieza para empresas está perdiendo clientes y quiere encuestarlos. A partir de unas notas de reunión desordenadas, armá el prompt para que la IA genere la encuesta.",
  privacidad:"Las notas nombran a clientes de la empresa y a personas del equipo. Aunque este caso es ficticio, con notas reales sacá o reemplazá esos nombres antes de pegarlas en una IA, como viste en el curso.",
  video:{ caso:"https://youtu.be/i6X6awH-D7M", resolucion:"" },
  context:"Entraste hace poco como asistente administrativo/a en Servilim SRL, una pyme de Rosario que hace limpieza y mantenimiento para oficinas, consorcios y locales comerciales. Tiene 42 empleados y 58 clientes con contrato mensual. En los últimos seis meses se dieron de baja seis clientes y casi ninguno explicó por qué. La empresa nunca hizo una encuesta, así que Marcela, la socia gerente, se reunió con el equipo para definir una y te pasó sus notas tal cual las escribió.",
  challenge:"Escribí un prompt para que una IA genere la encuesta de satisfacción de Servilim, lista para cargar en Google Forms. Para eso, primero extraé de las notas los requisitos que se acordaron (dejando afuera lo que no tiene que ver con la encuesta), después armá el prompt y probalo. Por último, revisá que la encuesta que devuelve la IA cumpla todo lo acordado y ajustala si hace falta.",
  deliverables:[
    "Lista de requisitos extraídos de las notas de reunión",
    "El prompt final para generar la encuesta",
    "La encuesta generada por la IA, revisada contra los requisitos"
  ],
  practice:[
    "Detectar el objetivo y las restricciones de un pedido real",
    "Estructurar un prompt: rol, contexto, objetivo, público, restricciones y formato de salida",
    "Pedirle a la IA un formato de salida que te sirva para el paso siguiente",
    "Revisar críticamente lo que genera la IA e iterar",
    "Cuidar los datos de terceros antes de usar una IA"
  ],
  resources:[
    { name:"Brief y notas de reunión — Servilim.pdf", type:"Material del caso", meta:"PDF · 2 páginas",
      kind:"material", url:"https://drive.google.com/file/d/19t-l_am9fAhs4W6daU05lP0llEtrxvPo/view?usp=drive_link" },
    { name:"Promptbook — Encuesta Servilim.pdf", type:"Promptbook", meta:"PDF · 3 pasos + variante",
      kind:"prompt", url:"https://drive.google.com/file/d/1cKpev3qWSRS6CDOzFhA8wPS4bgnvDU8e/view?usp=drive_link" }
  ],
  hints:[
    "Antes de escribir el prompt, releé las notas y separá lo que quedó acordado de lo que es ruido o de lo que solo fue una opinión.",
    "Un buen prompt tiene partes: quién es la IA, el contexto de la pyme, para qué es la encuesta, quién la va a responder, qué restricciones tiene y cómo querés recibir el resultado.",
    "Mirá las discusiones que terminaron en un acuerdo (precio, anonimato, datos de la empresa): si no los escribís explícitos, la IA va a decidir por vos. Y pedile el tipo de pregunta de cada ítem para pasarlo fácil a Google Forms."
  ],
  prompt:"Actuá como especialista en encuestas de satisfacción para clientes de empresas de servicios. Te paso las notas de una reunión de una pyme argentina de limpieza para empresas. 1) Listá los requisitos que quedaron ACORDADOS para la encuesta. 2) Listá aparte los temas que NO tienen que ver con la encuesta. 3) Marcá cualquier punto ambiguo o contradictorio. No escribas la encuesta todavía. Notas: [PEGÁ ACÁ LAS NOTAS ANONIMIZADAS]",
  solution:{
    approach:"Resolverlo en dos movimientos: primero convertir las notas en una lista clara de requisitos, y recién después escribir un prompt estructurado que los incluya todos de forma explícita. El último paso es revisar la encuesta que devuelve la IA contra esa lista e iterar hasta que cumpla.",
    decisions:[
      "Separar los acuerdos del ruido: las lavadoras, la ausencia de Ignacio y el convenio quedan afuera; fecha y canales son logística.",
      "Convertir las discusiones resueltas en restricciones explícitas: relación precio/calidad (no precio), encuesta anónima con contacto opcional y sin CUIT ni razón social.",
      "Fijar límites medibles para que la IA no los interprete: máximo 10 preguntas, menos de 5 minutos, hasta 2 abiertas, trato de usted.",
      "Pedir un formato de salida listo para Google Forms: pregunta, tipo, opciones y si es obligatoria.",
      "Revisar el resultado con un checklist e iterar: la primera versión pidió el nombre de la empresa y preguntó por el precio."
    ],
    goldcopy:{ name:"Encuesta Servilim — resuelto.pdf", type:"Archivo resuelto",
               url:"https://drive.google.com/file/d/1ErUY11QgqKO459KqYjkiSKwcHyCH_lQQ/view?usp=drive_link" }
  }
},
];
