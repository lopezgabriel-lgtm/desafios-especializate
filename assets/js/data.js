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
  sector:"turismo", course:"introduccion-ia", difficulty:"inicial", duration:15,
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
  sector:"construccion", course:"introduccion-ia", difficulty:"inicial", duration:15,
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
  sector:"creativas", course:"introduccion-ia", difficulty:"inicial", duration:15,
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
  sector:"creativas", course:"introduccion-ia", difficulty:"inicial", duration:15,
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
  sector:"servicios", course:"introduccion-ia", difficulty:"inicial", duration:15,
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
{
  id:"construccion-compras-materiales",
  title:"Ordená la planilla de compras de materiales de la obra",
  sector:"construccion", course:"planillas-inteligentes", difficulty:"intermedio", duration:45,
  skills:["organizar","analizar","prompting"], tools:["planillas","sheets","ia"],
  keywords:["limpieza de datos","compras","materiales","obra","duplicados","proveedores","rubros","SUMAR.SI"],
  description:"La planilla de compras de marzo la cargaron tres personas distintas y es un caos. Limpiala para saber cuánto se gastó realmente en materiales, por rubro.",
  video:{ caso:"https://youtu.be/msxT6hMYn80", resolucion:"" },
  context:"Trabajás en la administración de Constructora Paraná Obras S.R.L., que está levantando el Edificio Los Aromos, un edificio de 8 pisos en Rosario. Durante marzo, las compras de materiales las fueron cargando el jefe de obra, el pañolero y vos, cada uno a su manera: fechas escritas de mil formas, proveedores con y sin tildes, precios con signo peso y algún remito cargado dos veces. El viernes hay reunión con el director de obra y te pidieron un número confiable de cuánto se gastó en materiales el mes pasado.",
  challenge:"Limpiá y ordená la planilla de compras de marzo para que los datos queden consistentes y sin duplicados. Después calculá el total de cada compra, el gasto total del mes y cuánto se gastó en cada uno de los 4 rubros de la obra (Estructura, Albañilería, Instalaciones y Terminaciones).",
  deliverables:[
    "Planilla de compras limpia: fechas, proveedores, materiales, rubros y unidades escritos de forma uniforme",
    "Columna Total calculada con fórmula (Cantidad × Precio unitario)",
    "Resumen con el gasto total del mes y el gasto por rubro",
    "Una nota breve con qué cambiaste y por qué"
  ],
  practice:[
    "Detectar y eliminar filas duplicadas",
    "Unificar formatos de fecha, texto y números",
    "Completar datos faltantes con criterio",
    "Usar fórmulas básicas y SUMAR.SI",
    "Pedirle ayuda a un asistente de IA para limpiar datos"
  ],
  resources:[
    { name:"ordena la planilla de compras de materiales de la obra.xlsx", type:"Archivo de trabajo", meta:"Planilla · 62 filas · 8 columnas",
      kind:"archivo", url:"https://docs.google.com/spreadsheets/d/1k_WarvBAMZFd005Vo6vujTb-1nTT0qdh8l1GbopiwoM/edit?usp=drive_link" },
    { name:"Promptbook - Compras materiales.pdf", type:"Promptbook", meta:"PDF · 9 prompts paso a paso",
      kind:"prompt", url:"https://drive.google.com/file/d/1BCBwfSbkbIuR3sIb6hsBqA9qpXz7e9iQ/view?usp=drive_link" }
  ],
  hints:[
    "Antes de tocar nada, recorré la planilla columna por columna y anotá qué problemas ves en cada una. Vas a encontrar al menos cinco tipos distintos.",
    "El Nº de remito identifica cada compra: si aparece dos veces, es la misma compra cargada de nuevo. Y un número que tiene \"$\", puntos o palabras adentro no suma: primero tiene que ser número.",
    "Cuando proveedores y rubros estén escritos siempre igual, agregá la columna Total y armá una tablita con los 4 rubros. SUMAR.SI te deja sumar el Total solo de las filas de un rubro."
  ],
  prompt:"Actuá como asistente administrativo de una constructora. Tengo una planilla de compras de materiales de obra con estas columnas: Nº remito, Fecha, Proveedor, Material, Rubro, Cantidad, Unidad y Precio unitario. La cargaron varias personas y tiene fechas en distintos formatos, nombres escritos de formas diferentes, precios con \"$\" y puntos, algunas celdas vacías y remitos repetidos. Te pego las filas abajo. 1) Listame los problemas que encontrás, agrupados por columna. 2) Proponeme cómo dejar cada columna uniforme en Google Sheets (con qué función o herramienta). 3) Decime qué remitos parecen duplicados. No borres ni inventes datos: si algo no se puede deducir, marcalo para revisar.",
  solution:{
    approach:"Primero se diagnostica la planilla columna por columna; después se eliminan los duplicados usando el Nº de remito, se unifican formatos (fechas, textos, unidades y números) y se completan los vacíos que se pueden deducir del material. Recién con los datos limpios se calcula el Total de cada compra y el resumen por rubro con SUMAR.SI.",
    decisions:[
      "Usar el Nº de remito como identificador: seis remitos (R-1046, R-1054, R-1060, R-1069, R-1078 y R-1090) estaban cargados dos veces y se dejaron una sola vez (de 62 filas quedan 56 compras).",
      "Convertir fechas, cantidades y precios a valores reales (fecha y número), no texto, para poder ordenar, filtrar y sumar.",
      "Escribir siempre igual proveedores, materiales y rubros, con una lista cerrada de 4 rubros, para que SUMAR.SI no se pierda filas.",
      "Completar los rubros y las unidades vacíos a partir del material (cal e hidrófugo → Albañilería, pegamento para porcellanato y pastina → Terminaciones, alambre → kg) en lugar de dejarlos en blanco o inventar.",
      "Calcular el Total con fórmula y agregar un control: la suma de los rubros tiene que dar igual que el total del mes."
    ],
    goldcopy:{ name:"GoldCopy - Ordená la planilla de compras de materiales de la obra", type:"Archivo resuelto",
               url:"https://docs.google.com/spreadsheets/d/1ThY7vvEeeHOSsNTKJxjfBm7zaykzTlQ4m8lUE4XC944/edit?usp=sharing" }
  }
},
{
  id:"servicios-anonimizar-municipio",
  title:"Limpiá y anonimizá la nómina antes de enviarla al municipio",
  sector:"servicios", course:"planillas-inteligentes", difficulty:"inicial", duration:30,
  skills:["organizar","prompting","resolver"], tools:["planillas","sheets","ia"],
  keywords:["limpieza de datos","anonimización","datos personales","nómina","municipio","duplicados","formato de fechas","protección de datos"],
  description:"Una pyme de servicios tiene que mandarle al municipio el listado de su personal para un programa de empleo. La nómina viene desordenada y con datos personales: hay que limpiarla y anonimizarla antes del envío.",
  privacidad:"La nómina tiene nombres, DNI, fechas de nacimiento, teléfonos, mails y domicilios del personal. Son datos ficticios, pero trabajalos como si fueran reales: no los pegues en una IA y anonimizá todo antes de compartir, como viste en el curso.",
  video:{ caso:"https://youtu.be/Ojy2g5QNJ54", resolucion:"https://youtu.be/EoQ0dRI1mts" },
  context:"Trabajás en la administración de Soluciones Norte SRL, una pyme de Río Claro que brinda atención al cliente y back office para otras empresas. Tiene 20 empleados. La Municipalidad ofrece una reducción de la tasa de seguridad e higiene a las empresas donde al menos el 60 % del personal vive en el partido, y para evaluarlo pidió el listado del personal sin datos que permitan identificar a las personas. La única fuente es una exportación del sistema de sueldos que nadie revisó.",
  challenge:"Prepará el archivo para la Municipalidad. Primero limpiá la nómina: sacá las filas repetidas y unificá nombres, DNI, fechas, barrios, localidades, género y tipo de contrato. Después armá una hoja anonimizada con los datos que pide el municipio (código, barrio, rango de edad, género, tipo de contrato, año de ingreso y si reside en el partido) y calculá si la empresa llega al 60 % de residentes. Podés usar la IA como asistente, pero sin pasarle los datos reales.",
  deliverables:[
    "La nómina limpia, sin duplicados y con formatos unificados (uso interno)",
    "La hoja anonimizada lista para enviar a la Municipalidad",
    "El cálculo del porcentaje de personal que reside en el partido",
    "Una nota breve con qué datos eliminaste, reemplazaste o generalizaste"
  ],
  practice:[
    "Detectar y quitar duplicados",
    "Unificar texto y fechas con funciones y Buscar y reemplazar",
    "Anonimizar: eliminar, codificar y generalizar datos personales",
    "Calcular rangos y porcentajes con fórmulas",
    "Usar la IA como asistente sin exponer datos personales"
  ],
  resources:[
    { name:"Nómina de personal — Soluciones Norte.xlsx", type:"Archivo de trabajo", meta:"Planilla · 22 filas · incluye el pedido del municipio",
      kind:"archivo", url:"https://docs.google.com/spreadsheets/d/1ZjuD5fBFxULH5VYjj25vfaJcRuSesi-qSzAUSM9mm_k/edit?usp=sharing" },
    { name:"Limpiá y anonimizá la nómina antes de enviarla al municipio", type:"Promptbook", meta:"PDF · 3 pasos + variante",
      kind:"prompt", url:"https://drive.google.com/file/d/1OykU0ycV91GKpTlnRkoa_6UDDczJSrgC/view?usp=drive_link" }
  ],
  hints:[
    "Leé primero la hoja \"Pedido del municipio\": te dice exactamente qué columnas mandar y cuáles no. Todo lo demás se queda en la empresa.",
    "Para encontrar duplicados, no confíes en el nombre: compará por DNI, después de sacarle los puntos. Para nombres y barrios, probá ESPACIOS, NOMPROPIO y Buscar y reemplazar.",
    "Anonimizar no es solo borrar columnas: el nombre se reemplaza por un código, la fecha de nacimiento se generaliza a un rango y la de ingreso, al año. Guardá la correspondencia código-persona en una hoja interna que no se envía."
  ],
  prompt:"Tengo una planilla de Google Sheets con la nómina de personal de una pyme. Columnas: Apellido y nombre, DNI, Fecha de nacimiento, Teléfono, Mail, Domicilio, Barrio, Localidad, Género, Tipo de contrato, Fecha de ingreso. Viene de una exportación y tiene nombres con mayúsculas y espacios de más, DNI con y sin puntos, fechas en varios formatos, barrios escritos de distintas formas y posibles filas repetidas. No te voy a pasar los datos. Dame un plan paso a paso para limpiarla en Google Sheets, con las funciones o herramientas para cada paso.",
  solution:{
    approach:"Separar el trabajo en dos hojas: una nómina limpia de uso interno, que conserva los datos personales y la correspondencia con el código, y una hoja para el municipio, que toma de la anterior solo lo pedido, anonimizado con fórmulas. Primero se limpia y después se anonimiza, porque con datos sucios no se pueden detectar duplicados ni calcular edades.",
    decisions:[
      "Detectar duplicados por DNI sin puntos, no por nombre: así aparece Herrera, repetido en mayúsculas y con otro formato.",
      "Unificar todas las fechas como fecha real, para poder calcular la edad con fórmula.",
      "Diferenciar los barrios vacíos: \"No corresponde\" para quien vive en otro partido y \"Sin dato\" para completar antes del envío.",
      "Anonimizar en tres niveles: eliminar (DNI, teléfono, mail, domicilio), codificar (nombre → EMP-01) y generalizar (edad en rangos, ingreso solo el año).",
      "Compartir solo la hoja del municipio, pegada como valores en un archivo nuevo, y no pasarle nunca la nómina real a la IA."
    ],
    goldcopy:{ name:"GoldCopy - Nómina de personal — Soluciones Norte.xlsx", type:"Archivo resuelto",
               url:"https://docs.google.com/spreadsheets/d/1Mp24x49z_fE1M3Cc1YOGIOrwgkPbef4I6vGW1zCu_ts/edit?usp=drive_link" }
  }
},
{
  id:"turismo-registro-reservas",
  title:"Ordená con IA el registro de reservas de una hostería",
  sector:"turismo", course:"planillas-inteligentes", difficulty:"inicial", duration:30,
  skills:["organizar","analizar","prompting"], tools:["ia","chatgpt","gemini","planillas"],
  keywords:["reservas","hostería","limpieza de datos","duplicados","canales de venta","booking","whatsapp","datos personales"],
  description:"El registro de reservas de una hostería en Tilcara está lleno de errores de carga. Usá la IA como asistente para ordenarlo y responder tres preguntas simples de la dueña.",
  video:{ caso:"https://youtu.be/qQFf6wcpefY", resolucion:"https://youtu.be/x_6FAlP932s" },
  context:"Trabajás en la recepción de la Hostería Piedra Mora, un alojamiento de 12 habitaciones en Tilcara, Jujuy. Las reservas llegan por Booking, WhatsApp, Instagram y teléfono, y durante semanas las cargaron en la misma planilla tres personas distintas: vos, la dueña (Marta) desde el celular y un compañero que pegaba lo que bajaba de Booking. Resultado: fechas escritas de mil maneras, canales con nombres distintos, montos como texto, celdas vacías y reservas cargadas dos veces.",
  challenge:"Marta necesita saber, antes del fin de semana, cómo viene la temporada de octubre y noviembre. Usá una herramienta de IA (ChatGPT, Gemini o la que uses) como asistente para ordenar el registro de reservas y responder tres preguntas: ¿cuántas reservas reales hay?, ¿qué canal trae más reservas? y ¿cuánto suman los ingresos del período? Ojo: la planilla tiene teléfonos de huéspedes, así que antes de pegar datos en la IA pensá qué información no deberías compartir.",
  deliverables:[
    "La planilla limpia: una fila por reserva real, con fechas, canales, habitaciones y montos unificados",
    "Un resumen con las tres respuestas para Marta (reservas reales, canal con más reservas e ingresos totales)",
    "Un registro breve de qué problemas encontraste, qué le pediste a la IA y cómo verificaste sus respuestas"
  ],
  practice:[
    "Escribir prompts claros con rol, contexto y formato de salida",
    "Usar la IA para diagnosticar y limpiar datos",
    "Verificar las respuestas de la IA antes de confiar en ellas",
    "Cuidar los datos personales al trabajar con herramientas de IA",
    "Contar y sumar datos para responder preguntas del negocio"
  ],
  resources:[
    { name:"Ordená con IA el registro de reservas de una hostería", type:"Archivo de trabajo", meta:"Planilla · 66 filas · 9 columnas",
      kind:"archivo", url:"https://docs.google.com/spreadsheets/d/1xRi9MHwQKMllhtKc4Daset1W_zAmRpTeqIGfNcBts9M/edit?usp=drive_link" },
    { name:"Promptbook del desafío.pdf", type:"Promptbook", meta:"PDF · 8 prompts paso a paso",
      kind:"prompt", url:"https://docs.google.com/spreadsheets/d/1xRi9MHwQKMllhtKc4Daset1W_zAmRpTeqIGfNcBts9M/edit?usp=sharing" }
  ],
  hints:[
    "Antes de limpiar, pedile a la IA un diagnóstico: que te liste qué tipos de problemas ve en cada columna, sin corregir nada todavía.",
    "Resolvé primero lo que se repite (cómo está escrito el canal, la habitación y las fechas) y recién después buscá duplicados: con los datos unificados, las filas repetidas se ven mucho más fácil.",
    "Una reserva duplicada tiene el mismo huésped, la misma fecha de ingreso y la misma habitación. Si el mismo nombre aparece con fechas distintas, puede ser alguien que volvió: no lo borres sin mirar."
  ],
  prompt:"Actuá como asistente administrativo de una hostería en Tilcara. Te voy a pegar el registro de reservas de octubre y noviembre (sin la columna de teléfonos). Las columnas son: N°, Huésped, Fecha de ingreso, Noches, Habitación, Canal, Tarifa por noche e Importe total. Todavía no corrijas nada: armá una tabla con cada tipo de problema que encuentres (formato de fechas, canales escritos distinto, números como texto, celdas vacías, posibles duplicados), en qué columna aparece y 2 ejemplos con su N° de fila. [pegá acá las filas]",
  solution:{
    approach:"Primero se protegen los datos personales (se quita la columna Teléfono antes de usar la IA). Después se le pide a la IA un diagnóstico sin corregir, se unifican las categorías (canal y habitación), las fechas y los números, se completan los vacíos que se pueden deducir (tarifa según habitación; importe = noches × tarifa) y recién ahí se buscan duplicados. Con la tabla limpia se cuentan y suman las reservas por canal para responder a Marta, verificando cada paso con filtros y controles rápidos.",
    decisions:[
      "No pegar teléfonos en la IA: para limpiar no hacen falta y son datos personales de los huéspedes",
      "Unificar el canal en 4 valores (Booking, WhatsApp, Instagram, Teléfono) y la habitación en 3 (Doble, Triple, Familiar) antes de contar",
      "Recalcular todo el importe como Noches × Tarifa en vez de confiar en los montos cargados a mano",
      "Considerar duplicado solo lo que coincide en huésped + fecha + habitación: el huésped que aparece dos veces con fechas distintas son dos estadías",
      "Mirar reservas e ingresos por separado: el canal con más reservas no es necesariamente el que deja más plata"
    ],
    goldcopy:{ name:"GoldCopy - Ordená con IA el registro de reservas de una hostería", type:"Archivo resuelto",
               url:"https://docs.google.com/spreadsheets/d/15fTmzefm8a4JPOs-iX7VGX0Oxshh-AEK1EFCK6wBPls/edit?usp=sharing" }
  }
},
{
  id:"cafe-aurora-feedback-clientes",
  title:"Analizador inteligente de feedback para la toma de decisiones",
  sector:"turismo", course:"planillas-inteligentes", difficulty:"avanzado", duration:60,
  skills:["analizar","automatizar","comunicar","crear","resolver"], tools:["planillas","sheets","ia"],
  keywords:["limpieza de datos","feedback de clientes","análisis de sentimiento","sucursales","canales de contacto","dashboard ejecutivo","Google Sheets","inteligencia artificial","calificación","hallazgos"],
  description:"Café Aurora reúne comentarios de clientes de distintos canales. Ordená y enriquecé el dataset con IA para convertir el feedback en evidencia que permita tomar decisiones de negocio.",
  video:{ caso:"https://youtu.be/biGYVx0j2TY", resolucion:"https://youtu.be/UaE4P_c9EK0" },
  context:"Trabajás como analista de datos para Café Aurora. La empresa recopiló cientos de comentarios de clientes provenientes de distintos canales de atención. El dataset RAW contiene ID de comentario, fecha, canal, sucursal, calificación y comentario. La dirección necesita transformar esa información en evidencia para comprender la experiencia de los clientes. Entre los antecedentes a investigar hay problemas de abastecimiento, un cambio de encargado en la sucursal Caballito, dudas sobre la calidad de algunos productos y posibles diferencias entre sucursales y entre canales.",
  challenge:"Prepará un dataset confiable y enriquecelo con IA para clasificar cada comentario por tema, sentimiento y prioridad. Después analizá el estado general de la experiencia de clientes, los aspectos del servicio que generan mayor reacción, las diferencias entre sucursales, la evolución temporal y los canales de contacto. Elaborá un dashboard ejecutivo y un informe de hallazgos con recomendaciones respaldadas por los datos. Respondé, como mínimo, cuál es el volumen de feedback, la calificación promedio, la distribución de sentimientos, los temas con más reclamos, las sucursales con mayor porcentaje de comentarios negativos, la evolución de Caballito antes y después de mayo, los cambios temporales relevantes y los canales con mayor proporción de reclamos.",
  deliverables:[
    "Dataset limpio y normalizado, con una estructura consistente para fecha, canal, sucursal, calificación y comentario",
    "Dataset enriquecido con las columnas Tema, Sentimiento y Prioridad para cada comentario",
    "Dashboard ejecutivo con KPIs generales, análisis de productos y experiencia, sucursales, canales y evolución temporal",
    "Informe de hallazgos con resumen ejecutivo, evidencia cuantitativa y cualitativa, casos particulares, situaciones a seguir y recomendaciones de negocio",
    "Recomendaciones para la dirección sustentadas estrictamente en la evidencia recopilada"
  ],
  practice:[
    "Auditar, limpiar y normalizar un dataset en Google Sheets",
    "Preparar un dataset para usarlo de forma segura con inteligencia artificial",
    "Clasificar comentarios por tema, sentimiento y prioridad",
    "Calcular KPIs y analizar feedback por sucursal, canal y período",
    "Diseñar un dashboard ejecutivo y comunicar hallazgos sin atribuir causalidad sin evidencia"
  ],
  resources:[
    { name:"Dataset RAW — Café Aurora", type:"Archivo de trabajo", meta:"Google Sheets",
      kind:"archivo", url:"https://docs.google.com/spreadsheets/d/1_fkrJosfSbxsVbW0i8Q0tosHGPEkLiK_DVxrWdYL2Cc/edit?usp=drive_link" },
    { name:"Promptbook del desafío — Café Aurora", type:"Promptbook", meta:"Google Docs",
      kind:"prompt", url:"https://drive.google.com/file/d/11V0H1W9jq7jSCJedbLIcKjoHDfslzzY5/view?usp=drive_link" }
  ],
  hints:[
    "Antes de analizar resultados, revisá que los campos clave estén completos y que fechas, canales, sucursales y calificaciones tengan un formato consistente. Un dashboard no corrige errores del dataset de origen.",
    "Para clasificar con IA, enviá únicamente el identificador de la sucursal, la calificación y el comentario. Definí las categorías permitidas y pedí una salida tabular para poder reincorporarla a la planilla sin alterar el orden de los registros.",
    "Al comparar sucursales o canales, usá porcentajes de comentarios negativos además de volúmenes absolutos. Si un cambio coincide en el tiempo con un evento operativo, tratá esa relación como una hipótesis que los datos deben investigar, no como una causa demostrada."
  ],
  prompt:"Estoy trabajando en Google Sheets con configuración regional de Argentina.\n\nTengo una hoja llamada IA con la siguiente estructura:\n\n* Columna A: ID_Sucursal\n* Columna B: Calificacion\n* Columna C: Comentario\n\nNecesito completar las siguientes columnas:\n\n* Columna D: Tema\n* Columna E: Sentimiento\n* Columna F: Prioridad\n\nAnalizá cada comentario y clasificá los resultados utilizando exclusivamente las siguientes categorías.\n\nTema:\n\nElegí una única categoría entre:\n\n* Atención\n* Producto\n* Precio\n* Limpieza\n* Ambiente\n* Tiempo de espera\n\nSentimiento\n\nClasificá cada comentario como:\n\n* Positivo\n* Negativo\n* Neutro\n\nPrioridad\n\nClasificá cada comentario como:\n\n* Alta\n* Media\n* Baja\n\nCriterios para Prioridad\n\nAlta: problemas graves o situaciones que requieren atención inmediata.\n\nMedia: situaciones que afectan la experiencia del cliente, pero no representan una urgencia.\n\nBaja: comentarios positivos, sugerencias o situaciones de escaso impacto operativo.\n\nDevolvé el resultado en una nueva versión de mi tabla enriquecida en formato csv, con las siguientes columnas, respetando el mismo orden de los registros:\n\n| Tema | Sentimiento | Prioridad |\n\nNo agregues comentarios ni explicaciones.",
  solution:{
    approach:"Primero se audita y normaliza el dataset para que los registros sean comparables. Después se prepara una hoja para IA que minimice los datos compartidos y se clasifican los comentarios con categorías cerradas de tema, sentimiento y prioridad. Las clasificaciones se revisan contra el comentario y la calificación antes de reincorporarlas al dataset. Con la tabla unificada se calculan los KPIs generales y se comparan temas, sucursales, canales y períodos. Finalmente se construyen el dashboard y el informe, distinguiendo siempre los datos observados de las hipótesis que requieran seguimiento.",
    decisions:[
      "Usar una estructura única para el dataset: ID de comentario, fecha, canal, sucursal, calificación y comentario; no analizar hasta corregir inconsistencias de formato, categorías y duplicados.",
      "Preparar para IA una tabla con ID_Sucursal, Calificacion y Comentario, dejando fuera los datos que no son necesarios para clasificar el feedback.",
      "Limitar la clasificación a seis temas (Atención, Producto, Precio, Limpieza, Ambiente y Tiempo de espera), tres sentimientos (Positivo, Neutro y Negativo) y tres prioridades (Alta, Media y Baja).",
      "Validar la coherencia de Tema, Sentimiento y Prioridad con el texto y la calificación antes de usar esas variables en los análisis.",
      "Comparar sucursales y canales principalmente por proporción de comentarios negativos, no solo por cantidad de mensajes.",
      "Presentar coincidencias entre hitos operativos y cambios en el feedback como hipótesis de investigación, sin afirmar causalidad si el dataset no la demuestra.",
      "Respaldar cada recomendación con los resultados del análisis y separar en el informe los datos observados, las interpretaciones y las líneas de seguimiento."
    ],
    goldcopy:{ name:"GoldCopy — Café Aurora", type:"Archivo resuelto",
               url:"https://docs.google.com/spreadsheets/d/1CHyODAUfGkVm6X7RMCgbuVGgG6u439BOPGf_pUXbtGc/edit?usp=sharing" }
  }
},
{
  id:"construccion-vocabulario-obra",
  title:"Prompteá para entender el lenguaje de la construcción",
  sector:"construccion", course:"introduccion-ia", difficulty:"inicial", duration:45,
  skills:["investigar","comunicar","prompting"], tools:["ia","chatgpt","gemini","perplexity"],
  keywords:["vocabulario técnico","glosario","obra","hormigón","certificado de avance","dirección de obra","lenguaje claro","compradores en pozo"],
  description:"Empezás a trabajar en una constructora sin conocer el rubro y tenés que informar a quienes compraron departamentos cómo avanza la obra. Usá la IA para entender cómo funciona la construcción, armar un glosario con los términos técnicos y explicar en palabras simples el informe del jefe de obra.",
  video:{ caso:"https://youtu.be/m3qpPbYtUxc", resolucion:"" },
  context:"Acabás de entrar a Constructora Aldaba, una empresa de Córdoba que está levantando el Edificio Los Aromos: planta baja y 4 pisos, 12 departamentos vendidos en pozo. Vas a ocupar el puesto de administración y comunicación: atender a los compradores y escribirles la novedad mensual de obra. El problema es que venís de otro rubro, y los papeles de la obra están llenos de palabras como losa s/4.º, H-21, orden de servicio, fondo de reparo o certificado n.º 18. Sergio, el socio gerente, te dejó una carpeta con los documentos de una semana normal y el glosario que armó Martina, la persona que estaba antes que vos (nadie lo revisó).",
  challenge:"Usá la IA como asistente para ponerte al día con el sector, arrancando por una pregunta grande: ¿qué necesito saber de la construcción para hacer bien mi trabajo? Con ese mapa, leé la carpeta de obra, detectá el vocabulario técnico y armá un glosario en lenguaje claro, verificando cada definición contra cómo se usa el término en los documentos. Revisá también el glosario de Martina. Por último, convertí el parte de avance del jefe de obra en la novedad de septiembre para los compradores. Ojo: la IA puede definir con mucha seguridad términos que en Argentina significan otra cosa.",
  deliverables:[
    "Un mapa del sector en una página: etapas de obra, quién es quién, documentos, plata, riesgos y qué importa en tu puesto",
    "Un glosario de al menos 30 términos de la carpeta, por categoría, con definición en lenguaje claro y documento donde aparece",
    "La revisión del glosario de Martina: qué definiciones están mal y por qué",
    "El borrador de la novedad de septiembre para compradores (máximo 220 palabras)"
  ],
  practice:[
    "Usar la IA para investigar un sector desconocido partiendo de preguntas amplias",
    "Pedir definiciones con contexto (país, rubro, uso en el documento)",
    "Detectar alucinaciones y regionalismos, y verificar con fuentes",
    "Traducir lenguaje técnico a lenguaje claro sin perder precisión",
    "Comunicar un atraso con honestidad y sin prometer lo que no está confirmado"
  ],
  resources:[
    { name:"Edificio Los Aromos - Prompteá para entender el lenguaje de la construcción.pdf", type:"Material de trabajo", meta:"PDF · 10 documentos de obra · 6 páginas",
      kind:"material", url:"https://drive.google.com/file/d/1SitBXDRgfbeqnBKgBjWr1VP9-wwr3u7o/view?usp=sharing" },
    { name:"Promptbook - Prompteá para entender el lenguaje de la construcción.pdf", type:"Promptbook", meta:"PDF · 9 prompts paso a paso",
      kind:"prompt", url:"https://drive.google.com/file/d/1CkzEUdwCampuIJGRlybnzy6aNMSVOkgn/view?usp=drive_link" }
  ],
  hints:[
    "No arranques por el glosario: primero pedile a la IA el panorama del sector (etapas, roles, documentos, plata y riesgos). Con ese mapa en la cabeza, la carpeta se entiende mucho mejor.",
    "Cuando pidas definiciones, aclarale que es una obra en Argentina y pasale la frase donde aparece el término. Una definición es buena si encaja con esa frase. Si la IA usa palabras como \"colado\" o \"trabe\", está pensando en otro país.",
    "En el glosario de Martina, desconfiá de las definiciones que parecen obvias para alguien de afuera del rubro. Buscá cada término en la carpeta: el contexto (por ejemplo, un resultado de ensayo en MPa) te dice si la definición cierra o no."
  ],
  prompt:"Empiezo a trabajar en administración y comunicación de una constructora de Córdoba, Argentina, que hace edificios de departamentos. Vengo de otro rubro. Voy a atender a compradores de departamentos en pozo y a escribir novedades mensuales de obra. ¿Qué necesito saber del sector de la construcción para hacer bien mi trabajo? Organizalo en: etapas de una obra, quién es quién, qué documentos se usan, cómo se mueve la plata, qué suele complicar y qué me importa en mi puesto. Usá vocabulario de Argentina.",
  solution:{
    approach:"Se arranca con una pregunta amplia a la IA para armar un mapa del sector (etapas, roles, documentos, plata, riesgos y foco del puesto). Con ese mapa se lee la carpeta documento por documento: se listan los términos técnicos y las siglas, se definen en lenguaje claro con contexto argentino y cada definición se contrasta con el uso real en los documentos. Con el mismo criterio se revisa el glosario heredado (4 de sus 14 definiciones están mal). Por último, el parte del jefe de obra se traduce a una novedad para compradores usando solo sus datos.",
    decisions:[
      "Empezar por el panorama del sector y recién después ir al vocabulario, para entender cada término dentro del proceso de obra",
      "Pedir siempre definiciones con contexto: Argentina, obra de edificio y la frase donde aparece el término",
      "Validar cada definición contra la carpeta: H-21 junto a \"23,4 MPa, cumple\" desarma la definición de \"21 bolsas de cemento\"",
      "Corregir las 4 definiciones erróneas del glosario heredado (carpeta, desencofrar, H-21 y fondo de reparo)",
      "En la novedad, contar el atraso con sus causas y repetir la fecha de posesión tal como la dice el jefe de obra, sin prometer otra"
    ],
    goldcopy:{ name:"GoldCopy - Prompteá para entender el lenguaje de la construcción.pdf", type:"Archivo resuelto",
               url:"https://drive.google.com/file/d/1uo7KDH4JDGDRUAESPFcfzA85uR9g_ru4/view?usp=drive_link" }
  }
},
];
