import type { Dict } from "./ru";

export const es: Dict = {
  htmlLang: "es",

  meta: {
    title: "Nova Lingua — un idioma que no se abandona",
    description:
      "Nova Lingua imparte clases de idiomas presenciales en grupos pequeños y estables. Tiumén, calle Maksima Gorkogo, 74. Inglés, español, chino y ruso como lengua extranjera.",
  },

  nav: [
    { href: "#kak", label: "Cómo funciona" },
    { href: "#programmy", label: "Programas" },
    { href: "#prepodavateli", label: "Profesores" },
    { href: "#otzyvy", label: "Opiniones" },
    { href: "#voprosy", label: "Preguntas" },
  ],

  header: {
    signUp: "Reservar",
    signUpAria: "Reservar una clase de prueba gratuita",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    mobileCta: "Reservar una clase de prueba gratuita",
    languageLabel: "Idioma de la página",
  },

  hero: {
    eyebrow: "Tiumén · calle Maksima Gorkogo, 74 · desde 2012",
    title: "Un idioma que no se abandona",
    lead: "Un grupo pequeño y estable, el mismo profesor y la misma tarde cada semana. Presencial, en el centro de Tiumén.",
    cta: "Clase de prueba gratis",
    ctaAria: "Reservar",
    photoAlt:
      "Profesora de Nova Lingua con libros de texto en un aula con banderas de inglés, español, chino y ruso",
    stats: [
      { value: "2012", label: "Enseñamos desde" },
      { value: "100+", label: "Alumnos" },
      { value: "hasta 6", label: "Por grupo" },
    ],
    languagesCount: "4",
    languagesLabel: "idiomas: inglés, español, chino y ruso como lengua extranjera",
    trialFree: "La clase de prueba es gratuita",
  },

  why: {
    title: "Por qué se suele abandonar",
    lead: "No es cuestión de aptitud. Una clase se aplaza, otra se pierde, y en noviembre ya da apuro ponerse al día.",
    minutesValue: "3 min",
    minutesLabel: "es lo que hablas en hora y media en un grupo de doce",
    onlineTitle: "Lo online se cancela fácil",
    onlineText: "Una clase a la que no hay que desplazarse se aplaza indefinidamente.",
  },

  comparison: {
    title: "Qué hacemos distinto",
    colUsual: "En una escuela de idiomas normal",
    colNova: "En Nova Lingua",
    rows: [
      {
        usual: "10–12 personas, hablas tres minutos por clase",
        nova: "Hasta seis personas: hablas en todas las clases",
      },
      {
        usual: "Los profesores rotan y el grupo cambia constantemente",
        nova: "El mismo grupo y el mismo profesor de principio a fin",
      },
      {
        usual: "El horario se rehace cada semana",
        nova: "La misma tarde siempre: martes y jueves a las 19:00",
      },
      {
        usual: "Una clase online fácil de cancelar",
        nova: "Solo clases presenciales en el centro de Tiumén",
      },
      {
        usual: "Te avisan del cambio una hora antes",
        nova: "Avisamos con antelación, con notificaciones por VK",
      },
    ],
  },

  quiz: {
    title: "No sabes por qué nivel empezar",
    lead: "Ocho preguntas sobre lo que ya sabes hacer en la práctica. Tres minutos y te damos el resultado al momento.",
    kicker: "Autoevaluación de nivel",
    idleTitle: "Tu nivel: de A1 a C1",
    idleText: "Tres opciones de respuesta, sin nada de gramática.",
    start: "Hacer el test",
    progressAria: "Progreso del test",
    answersAria: "Opciones de respuesta",
    counter: (n: number, total: number) => `${n} de ${total}`,
    questions: [
      "Sé presentarme y contar algo sobre mí en un par de frases sencillas",
      "Entiendo preguntas sencillas de un dependiente o un camarero y sé responder",
      "Puedo mantener una conversación corta sobre mis planes del día",
      "Entiendo la idea principal de un artículo o un vídeo sobre un tema conocido",
      "Sé explicar mi opinión y poner un ejemplo sin trabarme en cada palabra",
      "Entiendo a hablantes nativos hablando entre ellos si el tema me resulta familiar",
      "Sé escribir un correo profesional o negociar asuntos de trabajo",
      "Hablo con soltura de temas abstractos y especializados y casi no busco palabras",
    ],
    answerYes: "Sí, con soltura",
    answerMaybe: "Con esfuerzo, pero me apaño",
    answerNo: "No",
    answerYesAria: "Respuesta: sí, con soltura",
    answerMaybeAria: "Respuesta: con esfuerzo, pero me apaño",
    answerNoAria: "Respuesta: no",
    resultBadge: "Tu nivel es",
    results: {
      A1: {
        title: "Empezamos por lo básico, y está bien así",
        text: "Lo básico te suena, pero hablar todavía cuesta. En un grupo pequeño desde cero cogerás práctica rápido, sin miedo a equivocarte delante de los demás.",
      },
      A2: {
        title: "Ya tienes una base sobre la que construir",
        text: "Los temas cotidianos te salen sin esfuerzo. Lo siguiente es ganar fluidez y vocabulario hablando, no estudiando un manual.",
      },
      B1: {
        title: "Te haces entender, pero te falta confianza",
        text: "Entiendes más de lo que dices. En un grupo pequeño, donde todos hablan y hablan a menudo, esa distancia se cierra rápido.",
      },
      B2: {
        title: "Hablas bien: ahora toca el matiz",
        text: "Te desenvuelves con soltura en temas cotidianos y de trabajo. Lo siguiente es la precisión al formular y conversar sobre temas especializados.",
      },
      C1: {
        title: "Nivel de usuario competente",
        text: "Casi no buscas palabras y entiendes a los nativos de oído. En la clase de prueba te buscaremos un grupo donde no te aburras.",
      },
    },
    resultCta: "Reservar clase de prueba",
    restart: "Empezar de nuevo",
  },

  programs: {
    title: "Programas",
    lead: "Todas las clases son presenciales, en la calle Maksima Gorkogo, 74. Grupos de tarde, entre semana.",
    groupsLabel: "Grupos",
    otherLabel: "Otros formatos",
    perMonth: "al mes",
    featured: {
      lang: "Inglés",
      title: "Inglés para el trabajo",
      desc: "A partir del nivel A2. Correos, videollamadas, negociaciones y presentaciones.",
      schedule: "Dos veces por semana, 90 minutos, hasta 6 personas",
      price: "8 900 ₽",
    },
    groups: [
      {
        lang: "Inglés",
        title: "Inglés desde cero",
        desc: "Para adultos que empiezan por primera vez o que solo recuerdan lo del colegio.",
        schedule: "2×90 min, hasta 6 personas",
        price: "7 900 ₽",
      },
      {
        lang: "Español",
        title: "Español desde cualquier nivel",
        desc: "Desde cualquier nivel. Práctica oral desde la primera clase.",
        schedule: "2×90 min, hasta 6 personas",
        price: "8 400 ₽",
      },
      {
        lang: "Chino",
        title: "Chino desde cero",
        desc: "Para principiantes y para quienes continúan. Atención especial a los tonos y a los caracteres.",
        schedule: "2×90 min, hasta 5 personas",
        price: "9 900 ₽",
      },
      {
        lang: "Ruso",
        title: "Ruso como lengua extranjera",
        desc: "Para quienes se han mudado a Tiumén a trabajar o estudiar. Trámites, centro de salud, trabajo y vida diaria.",
        schedule: "2×90 min, hasta 6 personas",
        price: "8 400 ₽",
      },
    ],
    formats: [
      {
        title: "Clases individuales",
        desc: "Cualquiera de los cuatro idiomas, 60 minutos. El mismo profesor y un horario fijo, con un programa hecho a tu medida.",
        price: "2 600 ₽",
      },
      {
        title: "Adolescentes de 14 a 17",
        desc: "Inglés para quienes necesitan un idioma vivo, no una nota del trimestre. 2×90 min, hasta 6 personas.",
        price: "7 400 ₽",
      },
    ],
  },

  teachers: {
    title: "Quién da las clases",
    lead: "En un grupo pequeño el profesor pesa más que el programa. Elige un nombre para leer más: verás exactamente a la persona que te va a dar clase.",
    photoAltSuffix: "profesor de Nova Lingua",
    items: [
      {
        name: "Anna Vetrova",
        langs: "Inglés, español",
        bio: "Filología en la Universidad Estatal de Tiumén, certificado CELTA. Vivió cuatro años en Madrid y dio cursos corporativos en una empresa de logística.",
        quote:
          "«Los adultos suelen llegar convencidos de que tienen mala memoria. Casi siempre resulta que el problema no es la memoria, sino que durante diez años no les dejaron abrir la boca».",
      },
      {
        name: "Mark Selivanov",
        langs: "Inglés",
        bio: "Lingüística en la Universidad Estatal de Tiumén. Diploma DipTESOL. Seis años en Dublín trabajando en soporte de una fintech, con inglés ocho horas al día.",
        quote:
          "«Llevo a clase correos reales y grabaciones de videollamadas. Un diálogo de manual no lo va a oír nadie en la vida real».",
      },
      {
        name: "Darya Jromova",
        langs: "Chino",
        bio: "HSK 6, estancia en la Universidad de Lengua y Cultura de Pekín. Tres años en Chengdu enseñando ruso a estudiantes chinos, lo que además le enseñó cómo oyen ellos nuestra lengua.",
        quote:
          "«Los tonos no son difíciles, son ajenos. La diferencia está en que lo ajeno se pasa en un mes de práctica regular».",
      },
      {
        name: "Olga Teniakova",
        langs: "Ruso como lengua extranjera, inglés",
        bio: "Máster en enseñanza del ruso como lengua extranjera. Ocho años trabajando con personas que se han mudado a Rusia, desde oficios manuales hasta informática.",
        quote:
          "«El primer objetivo no es la gramática, sino que la persona pueda ir sola a una oficina pública y no tenerle miedo a una llamada».",
      },
    ],
  },

  reviews: {
    title: "Qué dicen los alumnos",
    lead: "Publicamos las opiniones con el nombre, el programa y el tiempo estudiado. A cualquiera de estas personas puedes encontrártela en el aula de Maksima Gorkogo, 74.",
    featured: {
      photoAlt: "Irina, alumna de Nova Lingua",
      quote:
        "«Antes negociaba con los proveedores a través de un intérprete y cada vez perdía la mitad del sentido. Las últimas cuatro videollamadas con los socios turcos las llevé yo sola».",
      note: "Mark llevaba a clase nuestros propios correos reales y analizaba por qué una formulación funciona y otra irrita a quien la lee.",
      name: "Irina, 34",
      role: "Directora de compras",
      program: "Inglés para el trabajo",
      duration: "Estudia desde hace 1 año y 2 meses · profesor Mark",
    },
    items: [
      {
        quote:
          "«Estudiaba español para viajar, sin ninguna meta profesional. Ocho meses después, en Valencia, me hice entender en una farmacia sin el traductor del móvil por primera vez en mi vida. Somos cinco en el grupo, y eso es lo importante: no puedes quedarte callado, te toca cada diez minutos».",
        name: "Sergey, 41, dentista",
        meta: "Español · 8 meses",
      },
      {
        quote:
          "«Llegué convencida de que tenía un B1 porque entiendo las series. En la clase de prueba me dijeron con honestidad que era A2 y me ofrecieron otro grupo. Me enfadé exactamente un día. Diez meses después hablo con más soltura que los conocidos que siguen creyendo que tienen un B1».",
        name: "Polina, 27, diseñadora",
        meta: "Inglés desde cero · 10 meses",
      },
      {
        quote:
          "«Voy a una fábrica en Cantón dos o tres veces al año. Hace año y medio solo sabía saludar; ahora me manejo solo: taxis, restaurantes, conversaciones cortas de trabajo en la planta. Los socios reaccionan a eso mucho más que a cualquier negociación con intérprete».",
        name: "Dmitry, 38, ingeniero",
        meta: "Chino · 1 año y 6 meses",
      },
      {
        quote:
          "«Me mudé a Tiumén por trabajo y los primeros meses lo resolvía todo mi mujer. Siete meses de clases después voy solo al centro de salud y a las oficinas públicas, y relleno los papeles sin ayuda. Olga construyó las clases desde el principio alrededor de lo que de verdad necesitaba esa semana».",
        name: "Nurlan, 31, ingeniero energético",
        meta: "Ruso como lengua extranjera · 7 meses",
      },
    ],
  },

  steps: {
    title: "Cómo es la inscripción",
    items: [
      {
        n: "Paso 1",
        title: "Nos dejas una solicitud",
        text: "Tres campos: nombre, contacto e idioma. No hay que rellenar nada más.",
      },
      {
        n: "Paso 2",
        title: "Un administrador te llama el mismo día",
        text: "Te preguntará por tu nivel, el horario que te venga bien y tu objetivo, te buscará el grupo adecuado y te dirá la fecha más próxima de clase de prueba.",
      },
      {
        n: "Paso 3",
        title: "Vienes a la clase de prueba",
        text: "Una clase de verdad, con el profesor y otros alumnos: no es una entrevista ni una presentación comercial. Después decides si sigues o no. Si no te ha encajado, no debes nada.",
      },
    ],
  },

  faq: {
    title: "Preguntas",
    items: [
      {
        q: "¿Dais clases online?",
        a: "No, todas las clases son presenciales. Es una decisión consciente: a una clase a la que hay que desplazarse se falta mucho menos y casi nunca se deja «para mañana». Si necesitas online sí o sí, es más honesto decirlo ya: no somos lo que buscas.",
      },
      {
        q: "No sé qué nivel tengo. ¿A qué grupo iré?",
        a: "Puedes hacer el test de esta página, pero el nivel lo determina definitivamente el profesor en la clase de prueba. Si resulta que el ritmo del grupo no te encaja, el administrador te ofrecerá otro: es algo normal y se resuelve antes de empezar las clases, no después.",
      },
      {
        q: "¿Y si falto a una clase?",
        a: "La clase perdida se puede recuperar. El administrador te buscará un hueco en otro grupo del nivel adecuado, o una sesión individual con el profesor, para que no te descuelgues del programa.",
      },
      {
        q: "Viajo mucho por trabajo. ¿Me sirve un grupo?",
        a: "Si los viajes son frecuentes, suele encajar mejor el formato individual, porque el horario se puede reorganizar a tu medida. Coméntaselo al administrador en la llamada y te propondrá la opción adecuada.",
      },
      {
        q: "¿Y si no me gusta el profesor?",
        a: "Díselo al administrador. Cambiarte de grupo es más fácil que perder a un alumno, y en una escuela pequeña eso se resuelve en una conversación.",
      },
      {
        q: "¿Cuántas personas habrá en el grupo?",
        a: "Hasta seis. En chino, hasta cinco. Ese es el límite máximo; normalmente son menos.",
      },
      {
        q: "¿La clase de prueba es gratis de verdad?",
        a: "Sí. Vienes a una clase real, trabajas con el grupo y después decides. El pago solo se habla si decides continuar.",
      },
      {
        q: "¿Cómo se pagan las clases?",
        a: "Mensualmente, a principio de mes. Aceptamos efectivo, tarjeta y transferencia por SBP.",
      },
      {
        q: "¿Dónde estáis?",
        a: "Tiumén, calle Maksima Gorkogo, 74, junto a la plaza del 400 Aniversario de Tiumén. Tres aulas: dos para grupos y una para clases individuales.",
      },
    ],
  },

  cta: {
    title: "Ven a una clase y decide con criterio",
    lead: "Una clase enseña más que toda esta web: cómo da clase el profesor, quién está en el grupo, si el ritmo es el tuyo. La prueba es gratuita y no te compromete a nada.",
    navLabels: ["Idioma", "Experiencia", "Contacto"],
    addressLine1: "Tiumén, calle Maksima Gorkogo, 74",
    addressLine2: "junto a la plaza del 400 Aniversario de Tiumén",
    stepCounter: (n: number) => `Paso ${n} de 3`,
    sentCounter: "Solicitud enviada",
    titles: ["¿Qué idioma quieres aprender?", "¿Qué experiencia tienes?", "¿Dónde te llamamos?"],
    doneTitle: "Listo",
    langs: [
      { label: "Inglés", note: "Grupos de hasta 6, tardes entre semana" },
      { label: "Español", note: "Grupos de hasta 6, tardes entre semana" },
      { label: "Chino", note: "Grupos de hasta 6, tardes entre semana" },
      { label: "Ruso como lengua extranjera", note: "Para quienes se han mudado a Rusia" },
    ],
    levels: [
      { label: "Empiezo de cero", note: "Nunca lo has estudiado o lo has olvidado casi todo" },
      { label: "Recuerdo algo", note: "El colegio o unos cursos de hace tiempo" },
      { label: "Hablo, pero con esfuerzo", note: "Entiendes más de lo que dices" },
      { label: "Hablo con soltura", note: "Necesitas práctica y vocabulario especializado" },
    ],
    nameLabel: "Cómo te llamas",
    contactLabel: "Teléfono o correo",
    submit: "Reservar una clase de prueba gratuita",
    disclaimer: "Gratis y sin compromiso. Respondemos el mismo día.",
    successText:
      "Un administrador se pondrá en contacto contigo el mismo día y te buscará un grupo y la fecha más próxima de clase de prueba.",
    sendAnother: "Enviar otra",
    hintDefault: "Te llevará menos de un minuto",
    back: "Atrás",
    nameError: "Escribe tu nombre",
    contactError: "Escribe un teléfono o correo",
  },

  footer: {
    logoAlt: "Nova Lingua",
    line1: "Tiumén, calle Maksima Gorkogo, 74 · junto a la plaza del 400 Aniversario de Tiumén",
    line2: "Inglés · Español · Chino · Ruso como lengua extranjera",
    line3: "Enseñamos desde 2012",
  },
};
