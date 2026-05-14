export const supportedLangs = ["es", "pt", "fr"] as const
export type Lang = (typeof supportedLangs)[number]

export const topToolSlugs = [
  "coffee-ratio-calculator",
  "french-press-ratio-calculator",
  "instant-coffee-calculator",
  "coffee-beans-per-cup",
  "coffee-measurement-converter",
  "pour-over-calculator",
  "aeropress-recipe",
  "cold-brew-ratio-calculator",
  "caffeine-calculator",
  "espresso-ratio-calculator",
] as const

export type TopToolSlug = (typeof topToolSlugs)[number]

export interface I18nVariant {
  lang: Lang
  slug: TopToolSlug
  metaTitle: string
  metaDescription: string
  h1: string
  excerpt: string
  faqs: { q: string; a: string }[]
}

const variants: I18nVariant[] = [
  // ─── SPANISH (es) ────────────────────────────────────────────────────────────

  {
    lang: "es",
    slug: "coffee-ratio-calculator",
    metaTitle: "Calculadora de Café: Cuánto Café por Taza en Gramos y Cucharadas",
    metaDescription:
      "Calcula exactamente cuánto café molido usar por taza en gramos, cucharadas o scoops. Ajustable por tamaño de taza y fuerza. Gratis, sin registro.",
    h1: "Calculadora de Café: Cuánto Café por Taza en Gramos y Cucharadas",
    excerpt:
      "Introduce el número de tazas, selecciona el tamaño y la fuerza, y obtén al instante la cantidad exacta de café en gramos, cucharadas soperas o scoops. Sin registrarte, sin cuentas.",
    faqs: [
      {
        q: "¿Cuánto café se pone por taza?",
        a: "Para una taza estándar de 250 ml a fuerza media (relación 1:16), usa unos 15 g de café molido, equivalentes a 2,5 cucharadas rasas. Si prefieres un café más ligero, baja a 14 g; para más intensidad, sube a 17 g. La calculadora hace el cálculo automáticamente para cualquier tamaño de taza.",
      },
      {
        q: "¿Cuántas cucharadas de café por taza?",
        a: "Una taza de 250 ml a fuerza media requiere aproximadamente 2,5 cucharadas de café molido a grano medio. Una cucharada sopera rasa equivale a unos 6 g. Si mides con una cuchara de café (scoop), necesitarás alrededor de 1,25 scoops por taza.",
      },
      {
        q: "¿Qué relación café-agua recomienda la SCA?",
        a: "La Specialty Coffee Association (SCA) recomienda una relación de 55 g de café por litro de agua, o aproximadamente 1:18, para su estándar 'Golden Cup'. La mayoría de los aficionados en casa prefieren una relación de entre 1:15 y 1:16 para obtener un café más intenso y con más cuerpo.",
      },
    ],
  },
  {
    lang: "es",
    slug: "french-press-ratio-calculator",
    metaTitle: "Calculadora de Prensa Francesa: Relación Café-Agua Perfecta",
    metaDescription:
      "Calcula exactamente cuánto café poner en tu prensa francesa según el tamaño y la intensidad. Resultado en gramos y cucharadas al instante.",
    h1: "Calculadora de Prensa Francesa: Relación Café-Agua Perfecta",
    excerpt:
      "Introduce el tamaño de tu prensa y la fuerza que prefieres para obtener la cantidad exacta de café molido en gramos y cucharadas. Ideal para prensas de 350 ml, 500 ml o 1 litro.",
    faqs: [
      {
        q: "¿Cuál es la relación café-agua ideal para la prensa francesa?",
        a: "La relación más utilizada para prensa francesa es 1:15 (1 g de café por cada 15 ml de agua). Para una prensa de 350 ml, eso equivale a unos 23 g de café, o aproximadamente 4 cucharadas rasas de molido grueso.",
      },
      {
        q: "¿Cuántas cucharadas de café para una prensa de 8 tazas?",
        a: "Una prensa de 8 tazas suele tener una capacidad de unos 1.000 ml. A relación 1:15, necesitas 67 g de café, equivalentes a unas 11 cucharadas soperas. Usa café de molienda gruesa para evitar residuos en la taza.",
      },
      {
        q: "¿Afecta el tamaño de molienda al sabor en la prensa francesa?",
        a: "Sí. La prensa francesa requiere molienda gruesa porque el café está en contacto con el agua durante 4 minutos. Una molienda muy fina sobreextrae el café y produce sabores amargos, además de dejar posos en el fondo de la taza. Una molienda gruesa, similar a la sal gruesa, es el punto de partida recomendado.",
      },
    ],
  },
  {
    lang: "es",
    slug: "instant-coffee-calculator",
    metaTitle: "Calculadora de Café Instantáneo: Cuánto Usar por Taza",
    metaDescription:
      "¿Cuántas cucharaditas de café instantáneo por taza? Incluye preajustes para Nescafé, Café Bustelo y café soluble estándar. Resultado inmediato.",
    h1: "Calculadora de Café Instantáneo: Cuánto Usar por Taza",
    excerpt:
      "Selecciona la marca de café instantáneo y el tamaño de taza para obtener la cantidad exacta en gramos y cucharaditas. Incluye preajustes para Nescafé, Café Bustelo y café soluble genérico.",
    faqs: [
      {
        q: "¿Cuánto café instantáneo se pone por taza?",
        a: "La medida estándar es 1–2 cucharaditas rasas (2–4 g) por taza de 240 ml. Nescafé recomienda 1 cucharadita rasa, mientras que marcas más intensas como Café Bustelo pueden requerir solo ½–1 cucharadita. La calculadora ajusta automáticamente según la marca y el tamaño de taza.",
      },
      {
        q: "¿Cuántas cucharaditas de Nescafé por taza?",
        a: "Nescafé recomienda 1 cucharadita rasa (aproximadamente 2 g) por taza de 240 ml con agua caliente. Si prefieres un café más intenso, usa 2 cucharaditas. Para un café más suave, prueba con ¾ de cucharadita.",
      },
      {
        q: "¿El café instantáneo tiene la misma cafeína que el café normal?",
        a: "El café instantáneo contiene entre 60 y 90 mg de cafeína por taza, comparado con los 90–120 mg del café de filtro o prensa francesa. Tiene algo menos de cafeína porque el proceso de fabricación reduce parte del contenido original, aunque sigue siendo una cantidad significativa.",
      },
    ],
  },
  {
    lang: "es",
    slug: "coffee-beans-per-cup",
    metaTitle: "Granos de Café por Taza: Cuántos Necesitas en Gramos y Cucharadas",
    metaDescription:
      "¿Cuántos granos de café necesitas por taza? Introduce el tamaño de taza y el ratio de extracción para obtener el resultado en gramos, cucharadas y número de granos.",
    h1: "Granos de Café por Taza: Cuántos Necesitas en Gramos y Cucharadas",
    excerpt:
      "Descubre cuántos granos de café enteros necesitas para tu taza. Introduce el tamaño y la fuerza para obtener el resultado en gramos, cucharadas y una estimación del número de granos.",
    faqs: [
      {
        q: "¿Cuántos granos de café hay en una cucharada?",
        a: "Una cucharada sopera de granos de café enteros contiene entre 60 y 70 granos, según el tamaño y el tostado. En gramos, una cucharada de granos equivale a unos 8–9 g, algo más que la cucharada de café molido (6 g) porque los granos dejan más espacio de aire.",
      },
      {
        q: "¿Cuántos gramos de granos de café necesito por taza?",
        a: "Para una taza de 250 ml a relación 1:16 (fuerza media), necesitas aproximadamente 15 g de granos antes de molerlos. El peso de los granos no cambia al molerlos, así que 15 g de granos enteros producen 15 g de café molido.",
      },
      {
        q: "¿Puedo medir los granos de café con una cuchara en lugar de una balanza?",
        a: "Sí, aunque es menos preciso. La densidad varía según el tostado: los granos de tostado oscuro son más ligeros y porosos, mientras que los de tostado claro son más densos. Para mayor precisión, usa una báscula de cocina. La calculadora muestra tanto el peso en gramos como la equivalencia en cucharadas para facilitar la medición sin balanza.",
      },
    ],
  },
  {
    lang: "es",
    slug: "coffee-measurement-converter",
    metaTitle: "Conversor de Medidas de Café: Gramos, Cucharadas, Cucharaditas y Scoops",
    metaDescription:
      "Convierte medidas de café al instante: gramos a cucharadas, cucharadas a gramos, scoops a gramos y más. Esencial para seguir cualquier receta.",
    h1: "Conversor de Medidas de Café: Gramos, Cucharadas, Cucharaditas y Scoops",
    excerpt:
      "Convierte entre gramos, cucharadas soperas, cucharaditas y scoops de café molido al instante. Ideal para adaptar recetas que usan diferentes unidades de medida.",
    faqs: [
      {
        q: "¿Cuántos gramos tiene una cucharada de café molido?",
        a: "Una cucharada sopera rasa de café molido a tamaño medio equivale a aproximadamente 6 g. Sin embargo, esta cifra varía ligeramente según la molienda: el café espresso fino puede pesar hasta 7–8 g por cucharada, mientras que una molienda gruesa puede dar solo 4–5 g.",
      },
      {
        q: "¿Cuánto es un scoop de café?",
        a: "Un scoop estándar de café equivale a 2 cucharadas soperas o aproximadamente 12 g de café molido a grano medio. Es la medida que suele incluir la mayoría de las cafeteras eléctricas con su cucharilla dosificadora.",
      },
      {
        q: "¿Cuántas cucharaditas son una cucharada de café?",
        a: "Una cucharada sopera equivale a 3 cucharaditas. En peso, una cucharada de café molido (6 g) corresponde a 3 cucharaditas de 2 g cada una. Si tu receta indica cucharaditas y solo tienes cucharas soperas, divide la cantidad entre 3.",
      },
    ],
  },
  {
    lang: "es",
    slug: "pour-over-calculator",
    metaTitle: "Calculadora de Pour Over y V60: Ratio y Receta Exacta",
    metaDescription:
      "Calcula el ratio pour over y obtén recetas paso a paso para V60, Chemex y Kalita Wave. Incluye preajustes de James Hoffmann y Tetsu Kasuya.",
    h1: "Calculadora de Pour Over y V60: Receta con Ratio Exacto",
    excerpt:
      "Obtén el ratio exacto y las instrucciones paso a paso para tu V60, Chemex o Kalita Wave. Incluye los métodos de James Hoffmann y Tetsu Kasuya, con control total de la dosis.",
    faqs: [
      {
        q: "¿Cuál es el ratio de café para el método pour over?",
        a: "El ratio más habitual para pour over y V60 es 1:15 a 1:17 (1 g de café por cada 15–17 ml de agua). James Hoffmann recomienda 1:16,67, equivalente a 30 g de café para 500 ml de agua. La calculadora adapta las cantidades a cualquier dosis que introduzcas.",
      },
      {
        q: "¿Cómo se hace el bloom o pre-infusión en el V60?",
        a: "El bloom consiste en verter el doble del peso del café en agua (por ejemplo, 60 ml para 30 g de café) y esperar 30–45 segundos. Este paso permite que el CO₂ atrapado en los granos escape, lo que mejora la extracción posterior. Los cafés muy frescos producen un bloom más activo y burbujeante.",
      },
      {
        q: "¿Cuál es la diferencia entre la receta de Hoffmann y la de Kasuya?",
        a: "James Hoffmann propone un método de 4 vertidos iguales después del bloom, manteniendo siempre agua en el cono. Tetsu Kasuya usa el método 4:6, dividiendo el agua en dos fases: el 40 % inicial controla el dulzor/acidez y el 60 % restante regula la intensidad. Ambas están disponibles como preajustes en la calculadora.",
      },
    ],
  },
  {
    lang: "es",
    slug: "aeropress-recipe",
    metaTitle: "Receta AeroPress: Método Estándar, Invertido y James Hoffmann",
    metaDescription:
      "Las mejores recetas de AeroPress en un solo lugar: método estándar, invertido y la receta de James Hoffmann. Incluye ratio, molienda, temperatura y tiempos.",
    h1: "Receta AeroPress: Método Estándar, Invertido y James Hoffmann",
    excerpt:
      "Encuentra la receta perfecta para tu AeroPress: método estándar, método invertido o la técnica de James Hoffmann. Ajusta la dosis y obtén instrucciones paso a paso con tiempos exactos.",
    faqs: [
      {
        q: "¿Cuál es el ratio de café para AeroPress?",
        a: "El ratio habitual para AeroPress es 1:12 a 1:16 (17–18 g de café para 200–220 ml de agua). El método de Hoffmann usa 11 g de café para 200 ml de agua (1:18), un ratio más ligero que produce un café muy limpio. La calculadora ajusta todos los parámetros según la dosis que elijas.",
      },
      {
        q: "¿Cuál es la diferencia entre el método estándar y el invertido en AeroPress?",
        a: "En el método estándar, el AeroPress se coloca directamente sobre la taza y el café gotea durante la preparación. En el método invertido, se coloca al revés (con el émbolo abajo) para que el café no gotee antes de tiempo, permitiendo una infusión completa durante el tiempo de reposo. El invertido da más control sobre el tiempo de extracción.",
      },
      {
        q: "¿A qué temperatura debe estar el agua para el AeroPress?",
        a: "La temperatura recomendada para AeroPress es de 80–90 °C. Hoffmann sugiere agua a 100 °C con tueste ligero y unos 85 °C con tuestes más oscuros. A diferencia de otros métodos, el AeroPress tolera bien un rango amplio de temperaturas gracias a su tiempo de extracción corto (1–2 minutos).",
      },
    ],
  },
  {
    lang: "es",
    slug: "cold-brew-ratio-calculator",
    metaTitle: "Calculadora de Cold Brew: Ratio Café-Agua para Concentrado o Listo para Beber",
    metaDescription:
      "Calcula el ratio exacto para tu cold brew, ya sea concentrado (1:4) o listo para beber (1:8). Compatible con prensa francesa, tarro mason y cafeteras específicas.",
    h1: "Calculadora de Cold Brew: Ratio Café-Agua para Concentrado o Listo para Beber",
    excerpt:
      "Introduce la cantidad de café o de agua que quieres usar y obtén el ratio exacto para un cold brew concentrado (1:4–1:5) o listo para beber (1:8). Funciona con prensa francesa, tarro de cristal o cafetera de cold brew.",
    faqs: [
      {
        q: "¿Cuál es el ratio de café para el cold brew?",
        a: "Para cold brew concentrado (el que luego se mezcla con leche o agua), el ratio habitual es 1:4 a 1:5 (1 g de café por cada 4–5 ml de agua). Para cold brew listo para beber directamente, usa 1:8. La calculadora muestra las cantidades para ambas opciones.",
      },
      {
        q: "¿Cuánto tiempo se deja en reposo el cold brew?",
        a: "El cold brew se deja reposar entre 12 y 24 horas en el frigorífico. 12 horas produce un sabor más suave y afrutado; 18–24 horas, un concentrado más intenso y con más cuerpo. No dejes el café en maceración más de 24 horas porque puede volverse amargo.",
      },
      {
        q: "¿Qué tipo de molienda es mejor para el cold brew?",
        a: "Se recomienda molienda gruesa, similar o algo más gruesa que la que se usa para prensa francesa. Una molienda más fina aumenta la extracción, pero también hace que el filtrado sea más difícil y puede añadir amargura al concentrado. Con una prensa francesa, la molienda gruesa es especialmente importante para evitar residuos.",
      },
    ],
  },
  {
    lang: "es",
    slug: "caffeine-calculator",
    metaTitle: "Calculadora de Cafeína: Cuánto hay en tu Taza de Café",
    metaDescription:
      "Estima el contenido de cafeína de tu taza según el método de preparación, la cantidad de café y el nivel de tueste. Compara espresso, filtro, cold brew e instantáneo.",
    h1: "Calculadora de Cafeína: Cuánto hay en tu Taza de Café",
    excerpt:
      "Descubre cuánta cafeína contiene tu café según el método de preparación (espresso, filtro, prensa francesa, cold brew), la cantidad de café y el tueste. Incluye comparativa y límite diario recomendado.",
    faqs: [
      {
        q: "¿Cuánta cafeína tiene una taza de café?",
        a: "Una taza de café de filtro de 240 ml contiene entre 80 y 120 mg de cafeína. Un espresso doble tiene entre 120 y 160 mg. El cold brew concentrado puede llegar a los 200 mg por porción. La calculadora estima la cafeína según el método, la dosis y el tueste que introduzcas.",
      },
      {
        q: "¿Qué método de preparación tiene más cafeína?",
        a: "El cold brew concentrado y el espresso tienen la mayor concentración de cafeína por mililitro, pero como el espresso se sirve en porciones pequeñas (30 ml), el total es similar al del café de filtro. Por volumen de bebida, el café filtro de goteo suele aportar más cafeína total por taza.",
      },
      {
        q: "¿Cuánta cafeína se puede tomar al día?",
        a: "La EFSA y la FDA consideran seguro un consumo de hasta 400 mg de cafeína al día para adultos sanos, equivalente a unas 3–4 tazas de café de filtro. Mujeres embarazadas deben limitar el consumo a menos de 200 mg diarios. La calculadora indica si tu consumo supera estos umbrales.",
      },
    ],
  },
  {
    lang: "es",
    slug: "espresso-ratio-calculator",
    metaTitle: "Calculadora de Ratio de Espresso: Dosis, Rendimiento y Recetas",
    metaDescription:
      "Calcula el ratio de espresso para espresso (1:2), ristretto (1:1), lungo (1:3) y ratios personalizados. Introduce la dosis y obtén el rendimiento objetivo en gramos.",
    h1: "Calculadora de Ratio de Espresso: Dosis, Rendimiento y Recetas",
    excerpt:
      "Introduce la dosis de café en el portafiltro y obtén el peso objetivo de extracción para espresso (1:2), ristretto (1:1), lungo (1:3) o cualquier ratio personalizado.",
    faqs: [
      {
        q: "¿Cuál es el ratio ideal para un espresso?",
        a: "El ratio estándar para un espresso es 1:2 (1 g de café por 2 g de agua extraída). Para una dosis de 18 g, el objetivo es extraer 36 g de espresso en 25–30 segundos. El ristretto usa 1:1 para un sabor más concentrado, y el lungo 1:3 para algo más largo y menos intenso.",
      },
      {
        q: "¿Qué diferencia hay entre ristretto y lungo?",
        a: "El ristretto (ratio 1:1) se extrae con menos agua, produciendo un sabor más concentrado, dulce y con menos amargor. El lungo (ratio 1:3) usa más agua y es más largo, con más amargor y un sabor más diluido. Para la misma dosis de 18 g, un ristretto daría 18 g de extracción y un lungo 54 g.",
      },
      {
        q: "¿Cómo afecta el ratio al sabor del espresso?",
        a: "Un ratio más bajo (más café, menos agua) produce un espresso más concentrado y viscoso. Un ratio más alto (menos café, más agua) produce un café más largo y con menos cuerpo. Si tu espresso sabe amargo, prueba a reducir el ratio; si sabe ácido o débil, aumenta la extracción.",
      },
    ],
  },

  // ─── PORTUGUESE (pt) ─────────────────────────────────────────────────────────

  {
    lang: "pt",
    slug: "coffee-ratio-calculator",
    metaTitle: "Calculadora de Café: Quanto Café por Xícara em Gramas e Colheres",
    metaDescription:
      "Calcule exatamente quanto café moído usar por xícara em gramas, colheres de sopa ou scoops. Ajustável por tamanho de xícara e intensidade. Grátis, sem cadastro.",
    h1: "Calculadora de Café: Quanto Café por Xícara em Gramas e Colheres",
    excerpt:
      "Digite o número de xícaras, selecione o tamanho e a intensidade e receba imediatamente a quantidade exata de café em gramas, colheres de sopa ou scoops. Sem cadastro, sem conta.",
    faqs: [
      {
        q: "Quanto café colocar por xícara?",
        a: "Para uma xícara padrão de 250 ml com intensidade média (proporção 1:16), use cerca de 15 g de café moído, equivalente a 2,5 colheres de sopa rasas. Para um café mais suave, use 13 g; para mais intenso, 17 g. A calculadora faz o cálculo automaticamente para qualquer tamanho de xícara.",
      },
      {
        q: "Quantas colheres de café por xícara?",
        a: "Uma xícara de 250 ml com intensidade média exige aproximadamente 2,5 colheres de sopa de café moído médio. Uma colher de sopa rasa equivale a cerca de 6 g. Se usar um scoop de café, precisará de cerca de 1,25 scoops por xícara.",
      },
      {
        q: "Qual é a proporção de café e água recomendada?",
        a: "A Specialty Coffee Association (SCA) recomenda 55 g de café por litro de água (aproximadamente 1:18) como seu padrão 'Golden Cup'. A maioria dos apreciadores de café em casa prefere uma proporção entre 1:15 e 1:16 para um café mais encorpado e intenso.",
      },
    ],
  },
  {
    lang: "pt",
    slug: "french-press-ratio-calculator",
    metaTitle: "Calculadora de French Press: Proporção Café-Água Perfeita",
    metaDescription:
      "Calcule exatamente quanto café colocar na sua French press de acordo com o tamanho e a intensidade desejada. Resultado em gramas e colheres de sopa.",
    h1: "Calculadora de French Press: Proporção Café-Água Perfeita",
    excerpt:
      "Digite o tamanho da sua French press e a intensidade preferida para obter a quantidade exata de café em gramas e colheres de sopa. Ideal para prensas de 350 ml, 500 ml ou 1 litro.",
    faqs: [
      {
        q: "Qual é a proporção ideal de café para French press?",
        a: "A proporção mais usada para French press é 1:15 (1 g de café para cada 15 ml de água). Para uma prensa de 350 ml, isso equivale a cerca de 23 g de café, ou aproximadamente 4 colheres de sopa rasas de moagem grossa.",
      },
      {
        q: "Quantas colheres de café para uma French press de 8 xícaras?",
        a: "Uma French press de 8 xícaras geralmente tem capacidade de cerca de 1.000 ml. Na proporção 1:15, você precisa de 67 g de café, equivalente a cerca de 11 colheres de sopa. Use moagem grossa para evitar sedimentos na xícara.",
      },
      {
        q: "Quanto tempo deixar o café na French press?",
        a: "O tempo de infusão recomendado é de 4 minutos. Após adicionar a água quente (92–96 °C), tampe a prensa sem pressionar o êmbolo. Após 4 minutos, pressione o êmbolo lentamente e sirva imediatamente. Deixar mais tempo pode tornar o café amargo.",
      },
    ],
  },
  {
    lang: "pt",
    slug: "instant-coffee-calculator",
    metaTitle: "Calculadora de Café Solúvel: Quanto Usar por Xícara",
    metaDescription:
      "Quantas colheres de café solúvel por xícara? Inclui presets para Nescafé e café solúvel padrão. Resultado imediato em gramas e colheres de chá.",
    h1: "Calculadora de Café Solúvel: Quanto Usar por Xícara",
    excerpt:
      "Selecione a marca de café solúvel e o tamanho da xícara para obter a quantidade exata em gramas e colheres de chá. Inclui presets para Nescafé e café solúvel genérico.",
    faqs: [
      {
        q: "Quanto café solúvel colocar por xícara?",
        a: "A medida padrão é 1–2 colheres de chá rasas (2–4 g) por xícara de 240 ml. A Nescafé recomenda 1 colher de chá rasa (cerca de 2 g). Para um café mais forte, use 2 colheres de chá. A calculadora ajusta automaticamente conforme a marca e o tamanho da xícara.",
      },
      {
        q: "Quantas colheres de Nescafé por xícara?",
        a: "A Nescafé recomenda 1 colher de chá rasa (aproximadamente 2 g) por xícara de 240 ml com água quente. Para um café mais intenso, use 2 colheres de chá. Para um café mais suave, experimente com ¾ de colher de chá.",
      },
      {
        q: "O café solúvel tem menos cafeína que o café coado?",
        a: "Sim, em geral. O café solúvel contém entre 60 e 90 mg de cafeína por xícara, enquanto o café coado tem entre 90 e 120 mg. O processo de fabricação reduz parte da cafeína original, mas o café solúvel ainda tem uma quantidade significativa.",
      },
    ],
  },
  {
    lang: "pt",
    slug: "coffee-beans-per-cup",
    metaTitle: "Grãos de Café por Xícara: Quantos Você Precisa em Gramas",
    metaDescription:
      "Quantos grãos de café você precisa por xícara? Digite o tamanho e a proporção para obter o resultado em gramas, colheres e número estimado de grãos.",
    h1: "Grãos de Café por Xícara: Quantos Você Precisa em Gramas e Colheres",
    excerpt:
      "Descubra quantos grãos de café inteiros você precisa para sua xícara. Digite o tamanho e a intensidade para obter o resultado em gramas, colheres de sopa e uma estimativa do número de grãos.",
    faqs: [
      {
        q: "Quantos grãos de café tem em uma colher de sopa?",
        a: "Uma colher de sopa de grãos de café inteiros contém entre 60 e 70 grãos, dependendo do tamanho e da torra. Em gramas, uma colher de sopa de grãos equivale a cerca de 8–9 g, um pouco mais do que a colher de café moído (6 g), pois os grãos deixam mais espaço de ar.",
      },
      {
        q: "Quantos gramas de grãos de café por xícara?",
        a: "Para uma xícara de 250 ml na proporção 1:16 (intensidade média), você precisa de aproximadamente 15 g de grãos antes de moê-los. O peso não muda ao moer, então 15 g de grãos inteiros produzem 15 g de café moído.",
      },
      {
        q: "Posso medir os grãos com colher em vez de balança?",
        a: "Sim, mas é menos preciso. A densidade varia conforme a torra: grãos de torra escura são mais leves e porosos, enquanto os de torra clara são mais densos. Para maior precisão, use uma balança de cozinha. A calculadora mostra tanto o peso em gramas quanto a equivalência em colheres.",
      },
    ],
  },
  {
    lang: "pt",
    slug: "coffee-measurement-converter",
    metaTitle: "Conversor de Medidas de Café: Gramas, Colheres, Colheres de Chá e Scoops",
    metaDescription:
      "Converta medidas de café na hora: gramas para colheres, colheres para gramas, scoops para gramas e mais. Essencial para seguir qualquer receita.",
    h1: "Conversor de Medidas de Café: Gramas, Colheres, Colheres de Chá e Scoops",
    excerpt:
      "Converta entre gramas, colheres de sopa, colheres de chá e scoops de café moído instantaneamente. Ideal para adaptar receitas que usam diferentes unidades de medida.",
    faqs: [
      {
        q: "Quantos gramas tem uma colher de sopa de café moído?",
        a: "Uma colher de sopa rasa de café moído médio equivale a aproximadamente 6 g. Esse valor pode variar um pouco: moagem fina para espresso pode pesar até 7–8 g por colher, enquanto moagem grossa pode dar apenas 4–5 g.",
      },
      {
        q: "Quanto é um scoop de café?",
        a: "Um scoop padrão de café equivale a 2 colheres de sopa ou aproximadamente 12 g de café moído médio. É a medida que a maioria das cafeteiras inclui com sua colher dosadora.",
      },
      {
        q: "Quantas colheres de chá tem uma colher de sopa de café?",
        a: "Uma colher de sopa equivale a 3 colheres de chá. Em peso, uma colher de sopa de café moído (6 g) corresponde a 3 colheres de chá de 2 g cada. Se sua receita indica colheres de chá e você só tem colher de sopa, divida a quantidade por 3.",
      },
    ],
  },
  {
    lang: "pt",
    slug: "pour-over-calculator",
    metaTitle: "Calculadora de Pour Over e V60: Proporção e Receita Exata",
    metaDescription:
      "Calcule a proporção pour over e obtenha receitas passo a passo para V60, Chemex e Kalita Wave. Inclui presets de James Hoffmann e Tetsu Kasuya.",
    h1: "Calculadora de Pour Over e V60: Receita com Proporção Exata",
    excerpt:
      "Obtenha a proporção exata e as instruções passo a passo para seu V60, Chemex ou Kalita Wave. Inclui os métodos de James Hoffmann e Tetsu Kasuya, com controle total da dose.",
    faqs: [
      {
        q: "Qual é a proporção de café para o método pour over?",
        a: "A proporção mais comum para pour over e V60 é 1:15 a 1:17. James Hoffmann recomenda 1:16,67 (30 g de café para 500 ml de água). A calculadora adapta as quantidades para qualquer dose que você inserir.",
      },
      {
        q: "Como fazer o bloom (pré-infusão) no V60?",
        a: "O bloom consiste em despejar o dobro do peso do café em água (por exemplo, 60 ml para 30 g de café) e aguardar 30–45 segundos. Esse passo permite que o CO₂ preso nos grãos escape, melhorando a extração posterior. Cafés muito frescos produzem um bloom mais ativo e borbulhante.",
      },
      {
        q: "Qual a diferença entre a receita de Hoffmann e a de Kasuya?",
        a: "James Hoffmann propõe 4 despejos iguais após o bloom, mantendo sempre água no cone. Tetsu Kasuya usa o método 4:6, dividindo a água em duas fases: 40% inicial controla dulçor/acidez e os 60% restantes regulam a intensidade. Ambas estão disponíveis como presets na calculadora.",
      },
    ],
  },
  {
    lang: "pt",
    slug: "aeropress-recipe",
    metaTitle: "Receita AeroPress: Método Padrão, Invertido e James Hoffmann",
    metaDescription:
      "As melhores receitas de AeroPress em um só lugar: método padrão, invertido e a receita de James Hoffmann. Inclui proporção, moagem, temperatura e tempos.",
    h1: "Receita AeroPress: Método Padrão, Invertido e James Hoffmann",
    excerpt:
      "Encontre a receita perfeita para o seu AeroPress: método padrão, invertido ou a técnica de James Hoffmann. Ajuste a dose e obtenha instruções passo a passo com tempos exatos.",
    faqs: [
      {
        q: "Qual é a proporção de café para AeroPress?",
        a: "A proporção habitual para AeroPress é 1:12 a 1:16 (17–18 g de café para 200–220 ml de água). O método de Hoffmann usa 11 g de café para 200 ml de água (1:18), uma proporção mais leve que produz um café muito limpo.",
      },
      {
        q: "Qual a diferença entre o método padrão e o invertido no AeroPress?",
        a: "No método padrão, o AeroPress é colocado diretamente sobre a xícara e o café escorre durante o preparo. No método invertido, é colocado ao contrário (com o êmbolo para baixo) para que o café não escorra antes do tempo, permitindo uma infusão completa durante o tempo de repouso.",
      },
      {
        q: "A que temperatura deve estar a água para o AeroPress?",
        a: "A temperatura recomendada é 80–90 °C. Hoffmann sugere 100 °C para torras claras e cerca de 85 °C para torras mais escuras. O AeroPress tolera bem uma faixa ampla de temperaturas graças ao seu tempo de extração curto (1–2 minutos).",
      },
    ],
  },
  {
    lang: "pt",
    slug: "cold-brew-ratio-calculator",
    metaTitle: "Calculadora de Cold Brew: Proporção para Concentrado ou Pronto para Beber",
    metaDescription:
      "Calcule a proporção exata para seu cold brew, seja concentrado (1:4) ou pronto para beber (1:8). Compatível com French press, pote de vidro e cafeteiras específicas.",
    h1: "Calculadora de Cold Brew: Proporção Café-Água para Concentrado ou Pronto para Beber",
    excerpt:
      "Insira a quantidade de café ou de água que deseja usar e obtenha a proporção exata para um cold brew concentrado (1:4–1:5) ou pronto para beber (1:8). Funciona com French press, pote de vidro ou cafeteira de cold brew.",
    faqs: [
      {
        q: "Qual é a proporção de café para cold brew?",
        a: "Para cold brew concentrado (que depois é misturado com leite ou água), a proporção habitual é 1:4 a 1:5. Para cold brew pronto para beber diretamente, use 1:8. A calculadora mostra as quantidades para ambas as opções.",
      },
      {
        q: "Quanto tempo deixar o cold brew repousar?",
        a: "O cold brew deve repousar entre 12 e 24 horas na geladeira. 12 horas produz um sabor mais suave e frutado; 18–24 horas, um concentrado mais intenso e encorpado. Não deixe macerar mais de 24 horas, pois pode ficar amargo.",
      },
      {
        q: "Qual moagem é melhor para cold brew?",
        a: "Recomenda-se moagem grossa, semelhante ou um pouco mais grossa do que a usada para French press. Moagem mais fina aumenta a extração, mas dificulta a filtragem e pode adicionar amargor ao concentrado.",
      },
    ],
  },
  {
    lang: "pt",
    slug: "caffeine-calculator",
    metaTitle: "Calculadora de Cafeína: Quanto Tem na Sua Xícara de Café",
    metaDescription:
      "Estime o teor de cafeína da sua xícara conforme o método de preparo, a quantidade de café e o nível de torra. Compare espresso, coado, cold brew e solúvel.",
    h1: "Calculadora de Cafeína: Quanto Tem na Sua Xícara de Café",
    excerpt:
      "Descubra quanta cafeína tem o seu café de acordo com o método de preparo (espresso, coado, French press, cold brew), a quantidade de café e a torra. Inclui comparativo e limite diário recomendado.",
    faqs: [
      {
        q: "Quanta cafeína tem uma xícara de café?",
        a: "Uma xícara de café coado de 240 ml contém entre 80 e 120 mg de cafeína. Um espresso duplo tem entre 120 e 160 mg. O cold brew concentrado pode chegar a 200 mg por porção. A calculadora estima a cafeína conforme o método, a dose e a torra que você inserir.",
      },
      {
        q: "Qual método de preparo tem mais cafeína?",
        a: "O cold brew concentrado e o espresso têm a maior concentração de cafeína por mililitro, mas como o espresso é servido em pequenas porções (30 ml), o total é similar ao do café coado. Por volume de bebida, o café coado geralmente aporta mais cafeína total por xícara.",
      },
      {
        q: "Quanto de cafeína é seguro por dia?",
        a: "A EFSA e a FDA consideram seguros até 400 mg de cafeína por dia para adultos saudáveis, equivalente a 3–4 xícaras de café coado. Mulheres grávidas devem limitar o consumo a menos de 200 mg diários.",
      },
    ],
  },
  {
    lang: "pt",
    slug: "espresso-ratio-calculator",
    metaTitle: "Calculadora de Ratio de Espresso: Dose, Rendimento e Receitas",
    metaDescription:
      "Calcule o ratio de espresso para espresso (1:2), ristretto (1:1), lungo (1:3) e ratios personalizados. Insira a dose e obtenha o rendimento alvo em gramas.",
    h1: "Calculadora de Ratio de Espresso: Dose, Rendimento e Receitas",
    excerpt:
      "Insira a dose de café no porta-filtro e obtenha o peso alvo de extração para espresso (1:2), ristretto (1:1), lungo (1:3) ou qualquer ratio personalizado.",
    faqs: [
      {
        q: "Qual é o ratio ideal para um espresso?",
        a: "O ratio padrão para espresso é 1:2 (1 g de café para 2 g de água extraída). Para uma dose de 18 g, o objetivo é extrair 36 g de espresso em 25–30 segundos. O ristretto usa 1:1 para um sabor mais concentrado, e o lungo 1:3 para algo mais longo e menos intenso.",
      },
      {
        q: "Qual a diferença entre ristretto e lungo?",
        a: "O ristretto (ratio 1:1) é extraído com menos água, produzindo um sabor mais concentrado, doce e com menos amargor. O lungo (ratio 1:3) usa mais água e é mais longo, com mais amargor e sabor mais diluído.",
      },
      {
        q: "Como o ratio afeta o sabor do espresso?",
        a: "Um ratio mais baixo (mais café, menos água) produz um espresso mais concentrado e viscoso. Um ratio mais alto (menos café, mais água) produz um café mais longo e com menos corpo. Se o seu espresso sabe amargo, tente reduzir o ratio; se sabe ácido ou fraco, aumente a extração.",
      },
    ],
  },

  // ─── FRENCH (fr) ─────────────────────────────────────────────────────────────

  {
    lang: "fr",
    slug: "coffee-ratio-calculator",
    metaTitle: "Calculateur de Café : Quelle Quantité par Tasse en Grammes et Cuillères",
    metaDescription:
      "Calculez exactement quelle quantité de café moulu utiliser par tasse en grammes, cuillères à soupe ou scoops. Ajustable selon la taille et l'intensité. Gratuit, sans inscription.",
    h1: "Calculateur de Café : Quelle Quantité par Tasse en Grammes et Cuillères",
    excerpt:
      "Entrez le nombre de tasses, choisissez la taille et l'intensité, et obtenez instantanément la quantité exacte de café en grammes, cuillères à soupe ou scoops. Sans inscription.",
    faqs: [
      {
        q: "Combien de café mettre par tasse ?",
        a: "Pour une tasse standard de 250 ml à intensité moyenne (ratio 1:16), utilisez environ 15 g de café moulu, soit 2,5 cuillères à soupe rases. Pour un café plus léger, 13 g suffisent ; pour plus d'intensité, montez à 17 g. La calculatrice fait le calcul automatiquement pour n'importe quelle taille.",
      },
      {
        q: "Combien de cuillères à soupe de café par tasse ?",
        a: "Une tasse de 250 ml à intensité moyenne nécessite environ 2,5 cuillères à soupe de café moulu moyen. Une cuillère à soupe rase correspond à environ 6 g. Avec un scoop de café, comptez environ 1,25 scoop par tasse.",
      },
      {
        q: "Quel est le ratio café/eau recommandé par la SCA ?",
        a: "La Specialty Coffee Association (SCA) recommande 55 g de café par litre d'eau (environ 1:18) pour son standard 'Golden Cup'. La plupart des amateurs à domicile préfèrent un ratio entre 1:15 et 1:16 pour un café plus corsé et intense.",
      },
    ],
  },
  {
    lang: "fr",
    slug: "french-press-ratio-calculator",
    metaTitle: "Calculateur Cafetière à Piston : Ratio Café-Eau Parfait",
    metaDescription:
      "Calculez exactement quelle quantité de café mettre dans votre cafetière à piston selon sa taille et l'intensité souhaitée. Résultat en grammes et cuillères.",
    h1: "Calculateur Cafetière à Piston : Ratio Café-Eau Parfait",
    excerpt:
      "Entrez la taille de votre cafetière à piston et l'intensité souhaitée pour obtenir la quantité exacte de café en grammes et cuillères à soupe. Idéal pour les presses de 350 ml, 500 ml ou 1 litre.",
    faqs: [
      {
        q: "Quel est le ratio café-eau idéal pour la cafetière à piston ?",
        a: "Le ratio le plus utilisé pour la cafetière à piston est 1:15 (1 g de café pour 15 ml d'eau). Pour une presse de 350 ml, cela correspond à environ 23 g de café, soit approximativement 4 cuillères à soupe rases de mouture grossière.",
      },
      {
        q: "Combien de cuillères de café pour une cafetière à piston de 8 tasses ?",
        a: "Une cafetière à piston de 8 tasses a généralement une capacité d'environ 1 000 ml. Au ratio 1:15, il faut 67 g de café, soit environ 11 cuillères à soupe. Utilisez une mouture grossière pour éviter les résidus dans la tasse.",
      },
      {
        q: "Combien de temps laisser infuser le café dans la cafetière à piston ?",
        a: "Le temps d'infusion recommandé est de 4 minutes. Après avoir ajouté l'eau chaude (92–96 °C), refermez le couvercle sans appuyer sur le piston. Après 4 minutes, pressez lentement et servez immédiatement. Laisser infuser plus longtemps peut rendre le café amer.",
      },
    ],
  },
  {
    lang: "fr",
    slug: "instant-coffee-calculator",
    metaTitle: "Calculateur de Café Soluble : Quelle Quantité par Tasse",
    metaDescription:
      "Combien de cuillères de café soluble par tasse ? Inclut des presets pour Nescafé et café instantané standard. Résultat immédiat en grammes et cuillères à café.",
    h1: "Calculateur de Café Soluble : Quelle Quantité par Tasse",
    excerpt:
      "Sélectionnez la marque de café soluble et la taille de la tasse pour obtenir la quantité exacte en grammes et cuillères à café. Inclut des presets pour Nescafé et café instantané générique.",
    faqs: [
      {
        q: "Combien de café soluble mettre par tasse ?",
        a: "La mesure standard est 1–2 cuillères à café rases (2–4 g) par tasse de 240 ml. Nescafé recommande 1 cuillère à café rase (environ 2 g). Pour un café plus fort, utilisez 2 cuillères à café. La calculatrice s'ajuste automatiquement selon la marque et la taille de la tasse.",
      },
      {
        q: "Combien de cuillères de Nescafé par tasse ?",
        a: "Nescafé recommande 1 cuillère à café rase (environ 2 g) par tasse de 240 ml avec de l'eau chaude. Pour un café plus intense, utilisez 2 cuillères à café. Pour un café plus léger, essayez ¾ de cuillère à café.",
      },
      {
        q: "Le café soluble a-t-il moins de caféine que le café filtre ?",
        a: "Oui, en général. Le café soluble contient entre 60 et 90 mg de caféine par tasse, contre 90–120 mg pour le café filtre. Le processus de fabrication réduit une partie de la caféine d'origine, bien que la quantité reste significative.",
      },
    ],
  },
  {
    lang: "fr",
    slug: "coffee-beans-per-cup",
    metaTitle: "Grains de Café par Tasse : Combien en Avez-Vous Besoin",
    metaDescription:
      "Combien de grains de café entiers pour une tasse ? Entrez la taille et le ratio pour obtenir le résultat en grammes, cuillères et nombre de grains estimé.",
    h1: "Grains de Café par Tasse : Combien en Avez-Vous Besoin en Grammes",
    excerpt:
      "Découvrez combien de grains de café entiers il vous faut pour votre tasse. Entrez la taille et l'intensité pour obtenir le résultat en grammes, cuillères à soupe et une estimation du nombre de grains.",
    faqs: [
      {
        q: "Combien de grains de café dans une cuillère à soupe ?",
        a: "Une cuillère à soupe de grains de café entiers contient entre 60 et 70 grains, selon la taille et la torréfaction. En grammes, une cuillère de grains équivaut à environ 8–9 g, un peu plus qu'une cuillère de café moulu (6 g), car les grains laissent plus d'espace d'air.",
      },
      {
        q: "Combien de grammes de grains de café par tasse ?",
        a: "Pour une tasse de 250 ml au ratio 1:16 (intensité moyenne), vous avez besoin d'environ 15 g de grains avant de les moudre. Le poids ne change pas à la mouture, donc 15 g de grains entiers produisent 15 g de café moulu.",
      },
      {
        q: "Puis-je mesurer les grains avec une cuillère plutôt qu'une balance ?",
        a: "Oui, mais c'est moins précis. La densité varie selon la torréfaction : les grains torréfiés foncés sont plus légers et poreux, ceux en torréfaction claire sont plus denses. Pour plus de précision, utilisez une balance de cuisine. La calculatrice affiche le poids en grammes et l'équivalence en cuillères.",
      },
    ],
  },
  {
    lang: "fr",
    slug: "coffee-measurement-converter",
    metaTitle: "Convertisseur de Mesures de Café : Grammes, Cuillères et Scoops",
    metaDescription:
      "Convertissez les mesures de café instantanément : grammes en cuillères, cuillères en grammes, scoops en grammes et plus encore. Indispensable pour suivre n'importe quelle recette.",
    h1: "Convertisseur de Mesures de Café : Grammes, Cuillères à Soupe, Cuillères à Café et Scoops",
    excerpt:
      "Convertissez entre grammes, cuillères à soupe, cuillères à café et scoops de café moulu instantanément. Idéal pour adapter des recettes utilisant différentes unités de mesure.",
    faqs: [
      {
        q: "Combien de grammes dans une cuillère à soupe de café moulu ?",
        a: "Une cuillère à soupe rase de café moulu moyen correspond à environ 6 g. Ce chiffre peut légèrement varier : une mouture fine pour espresso peut peser jusqu'à 7–8 g par cuillère, tandis qu'une mouture grossière peut donner seulement 4–5 g.",
      },
      {
        q: "Qu'est-ce qu'un scoop de café ?",
        a: "Un scoop standard de café équivaut à 2 cuillères à soupe, soit environ 12 g de café moulu moyen. C'est la mesure généralement incluse avec la plupart des cafetières électriques.",
      },
      {
        q: "Combien de cuillères à café font une cuillère à soupe de café ?",
        a: "Une cuillère à soupe équivaut à 3 cuillères à café. En poids, une cuillère à soupe de café moulu (6 g) correspond à 3 cuillères à café de 2 g chacune. Si votre recette indique des cuillères à café et que vous n'avez qu'une cuillère à soupe, divisez la quantité par 3.",
      },
    ],
  },
  {
    lang: "fr",
    slug: "pour-over-calculator",
    metaTitle: "Calculateur Pour Over et V60 : Ratio et Recette Exacte",
    metaDescription:
      "Calculez votre ratio pour over et obtenez des recettes étape par étape pour V60, Chemex et Kalita Wave. Inclut les presets de James Hoffmann et Tetsu Kasuya.",
    h1: "Calculateur Pour Over et V60 : Recette avec Ratio Exact",
    excerpt:
      "Obtenez le ratio exact et les instructions étape par étape pour votre V60, Chemex ou Kalita Wave. Inclut les méthodes de James Hoffmann et Tetsu Kasuya, avec contrôle total de la dose.",
    faqs: [
      {
        q: "Quel est le ratio café/eau pour le pour over ?",
        a: "Le ratio le plus courant pour le pour over et le V60 est 1:15 à 1:17. James Hoffmann recommande 1:16,67 (30 g de café pour 500 ml d'eau). La calculatrice adapte les quantités à n'importe quelle dose que vous saisissez.",
      },
      {
        q: "Comment faire le bloom (pré-infusion) sur le V60 ?",
        a: "Le bloom consiste à verser le double du poids du café en eau (par exemple 60 ml pour 30 g de café) et attendre 30–45 secondes. Cette étape permet au CO₂ piégé dans les grains de s'échapper, améliorant ainsi l'extraction suivante. Les cafés très frais produisent un bloom plus actif et bulleux.",
      },
      {
        q: "Quelle est la différence entre la recette Hoffmann et celle de Kasuya ?",
        a: "James Hoffmann propose 4 versements égaux après le bloom, en maintenant toujours de l'eau dans le cône. Tetsu Kasuya utilise la méthode 4:6, divisant l'eau en deux phases : les 40 % initiaux contrôlent la douceur/acidité et les 60 % restants régulent l'intensité. Les deux sont disponibles comme presets dans la calculatrice.",
      },
    ],
  },
  {
    lang: "fr",
    slug: "aeropress-recipe",
    metaTitle: "Recette AeroPress : Méthode Standard, Inversée et James Hoffmann",
    metaDescription:
      "Les meilleures recettes AeroPress au même endroit : méthode standard, inversée et la recette de James Hoffmann. Inclut ratio, mouture, température et minutage.",
    h1: "Recette AeroPress : Méthode Standard, Inversée et James Hoffmann",
    excerpt:
      "Trouvez la recette parfaite pour votre AeroPress : méthode standard, inversée ou la technique de James Hoffmann. Ajustez la dose et obtenez des instructions étape par étape avec des temps exacts.",
    faqs: [
      {
        q: "Quel est le ratio café/eau pour l'AeroPress ?",
        a: "Le ratio habituel pour l'AeroPress est 1:12 à 1:16 (17–18 g de café pour 200–220 ml d'eau). La méthode Hoffmann utilise 11 g de café pour 200 ml d'eau (1:18), un ratio plus léger qui produit un café très propre.",
      },
      {
        q: "Quelle est la différence entre la méthode standard et la méthode inversée ?",
        a: "Dans la méthode standard, l'AeroPress est placé directement sur la tasse et le café s'écoule pendant la préparation. Dans la méthode inversée, il est placé à l'envers (piston en bas) pour que le café ne s'écoule pas avant le temps, permettant une infusion complète pendant la phase de repos.",
      },
      {
        q: "À quelle température doit être l'eau pour l'AeroPress ?",
        a: "La température recommandée est de 80–90 °C. Hoffmann suggère 100 °C pour les torréfactions claires et environ 85 °C pour les plus foncées. L'AeroPress tolère bien une large plage de températures grâce à son temps d'extraction court (1–2 minutes).",
      },
    ],
  },
  {
    lang: "fr",
    slug: "cold-brew-ratio-calculator",
    metaTitle: "Calculateur Cold Brew : Ratio Café-Eau pour Concentré ou Prêt à Boire",
    metaDescription:
      "Calculez le ratio exact pour votre cold brew, qu'il soit concentré (1:4) ou prêt à boire (1:8). Compatible avec cafetière à piston, bocal en verre et carafes dédiées.",
    h1: "Calculateur Cold Brew : Ratio Café-Eau pour Concentré ou Prêt à Boire",
    excerpt:
      "Entrez la quantité de café ou d'eau que vous souhaitez utiliser et obtenez le ratio exact pour un cold brew concentré (1:4–1:5) ou prêt à boire (1:8). Fonctionne avec cafetière à piston, bocal en verre ou carafe cold brew.",
    faqs: [
      {
        q: "Quel est le ratio café/eau pour le cold brew ?",
        a: "Pour un cold brew concentré (ensuite mélangé avec du lait ou de l'eau), le ratio habituel est 1:4 à 1:5. Pour un cold brew prêt à boire directement, utilisez 1:8. La calculatrice affiche les quantités pour les deux options.",
      },
      {
        q: "Combien de temps laisser infuser le cold brew ?",
        a: "Le cold brew doit reposer entre 12 et 24 heures au réfrigérateur. 12 heures donne un goût plus doux et fruité ; 18–24 heures produit un concentré plus intense et corsé. Ne laissez pas macérer plus de 24 heures, au risque d'amertume.",
      },
      {
        q: "Quelle mouture utiliser pour le cold brew ?",
        a: "Il est recommandé d'utiliser une mouture grossière, semblable ou légèrement plus grossière que celle utilisée pour la cafetière à piston. Une mouture trop fine augmente l'extraction mais rend le filtrage difficile et peut ajouter de l'amertume au concentré.",
      },
    ],
  },
  {
    lang: "fr",
    slug: "caffeine-calculator",
    metaTitle: "Calculateur de Caféine : Quelle Quantité dans Votre Tasse de Café",
    metaDescription:
      "Estimez la teneur en caféine de votre tasse selon la méthode de préparation, la quantité de café et le niveau de torréfaction. Comparez espresso, filtre, cold brew et café soluble.",
    h1: "Calculateur de Caféine : Quelle Quantité dans Votre Tasse de Café",
    excerpt:
      "Découvrez la quantité de caféine dans votre café selon la méthode de préparation (espresso, filtre, cafetière à piston, cold brew), la quantité de café et la torréfaction. Inclut une comparaison et la limite journalière recommandée.",
    faqs: [
      {
        q: "Quelle quantité de caféine dans une tasse de café ?",
        a: "Une tasse de café filtre de 240 ml contient entre 80 et 120 mg de caféine. Un double espresso en contient entre 120 et 160 mg. Le cold brew concentré peut atteindre 200 mg par portion. La calculatrice estime la caféine selon la méthode, la dose et la torréfaction que vous saisissez.",
      },
      {
        q: "Quelle méthode de préparation a le plus de caféine ?",
        a: "Le cold brew concentré et l'espresso ont la plus haute concentration de caféine par millilitre, mais comme l'espresso est servi en petites portions (30 ml), le total est similaire au café filtre. En volume de boisson, le café filtre apporte généralement plus de caféine totale par tasse.",
      },
      {
        q: "Quelle quantité de caféine est sûre par jour ?",
        a: "L'EFSA et la FDA considèrent jusqu'à 400 mg de caféine par jour comme sûrs pour les adultes en bonne santé, soit l'équivalent de 3–4 tasses de café filtre. Les femmes enceintes doivent limiter leur consommation à moins de 200 mg par jour.",
      },
    ],
  },
  {
    lang: "fr",
    slug: "espresso-ratio-calculator",
    metaTitle: "Calculateur Ratio Espresso : Dose, Rendement et Recettes",
    metaDescription:
      "Calculez le ratio espresso pour espresso (1:2), ristretto (1:1), lungo (1:3) et ratios personnalisés. Entrez votre dose et obtenez le rendement cible en grammes.",
    h1: "Calculateur Ratio Espresso : Dose, Rendement et Recettes",
    excerpt:
      "Entrez la dose de café dans le porte-filtre et obtenez le poids cible d'extraction pour espresso (1:2), ristretto (1:1), lungo (1:3) ou tout ratio personnalisé.",
    faqs: [
      {
        q: "Quel est le ratio idéal pour un espresso ?",
        a: "Le ratio standard pour un espresso est 1:2 (1 g de café pour 2 g d'eau extraite). Pour une dose de 18 g, l'objectif est d'extraire 36 g d'espresso en 25–30 secondes. Le ristretto utilise 1:1 pour un goût plus concentré, et le lungo 1:3 pour quelque chose de plus long et moins intense.",
      },
      {
        q: "Quelle est la différence entre ristretto et lungo ?",
        a: "Le ristretto (ratio 1:1) est extrait avec moins d'eau, produisant un goût plus concentré, sucré et moins amer. Le lungo (ratio 1:3) utilise plus d'eau et est plus long, avec plus d'amertume et un goût plus dilué.",
      },
      {
        q: "Comment le ratio affecte-t-il le goût de l'espresso ?",
        a: "Un ratio plus bas (plus de café, moins d'eau) produit un espresso plus concentré et visqueux. Un ratio plus élevé (moins de café, plus d'eau) produit un café plus long et moins corsé. Si votre espresso est amer, essayez de réduire le ratio ; s'il est acide ou faible, augmentez l'extraction.",
      },
    ],
  },
]

export function getI18nVariant(lang: string, slug: string): I18nVariant | undefined {
  return variants.find((v) => v.lang === (lang as Lang) && v.slug === (slug as TopToolSlug))
}

export function getAllI18nParams() {
  return variants.map((v) => ({ lang: v.lang, slug: v.slug }))
}
