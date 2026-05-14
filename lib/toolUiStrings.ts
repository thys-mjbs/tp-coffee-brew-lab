// Per-tool UI string interfaces and locale overrides.
// English defaults live inside each tool component; this file provides translated string sets.
// Add a new language by adding a key to toolUiStrings that satisfies the same shape as `es`.

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface CopyStrings {
  copy: string
  copied: string
}

// ─── CoffeeRatioCalculator ────────────────────────────────────────────────────

export interface CoffeeRatioStrings extends CopyStrings {
  howManyCups: string
  customPlaceholder: string
  cupSizeLabel: string
  standardMugLabel: string
  coffeeMakerLabel: string
  outputUnitsLabel: string
  metric: string
  imperial: string
  strengthLabel: string
  weakLabel: string
  weakNote: string
  mediumLabel: string
  mediumNote: string
  strongLabel: string
  strongNote: string
  veryStrongLabel: string
  veryStrongNote: string
  emptyState: string
  cup: string
  cups: string
  groundCoffeeLabel: string
  groundCoffeeSub: string
  tablespoonsLabel: string
  tablespoonsSub: string
  teaspoonsLabel: string
  teaspoonsSub: string
  scoopsLabel: string
  scoopsSub: string
  footnote: string
}

// ─── FrenchPressRatioCalculator ───────────────────────────────────────────────

export interface FrenchPressStrings extends CopyStrings {
  pressSizeLabel: string
  customMlPlaceholder: string
  millilitres: string
  strengthLabel: string
  lightLabel: string
  lightNote: string
  mediumLabel: string
  mediumNote: string
  strongLabel: string
  strongNote: string
  veryStrongLabel: string
  veryStrongNote: string
  unitsLabel: string
  metric: string
  imperial: string
  emptyState: string
  forXWater: (water: string, ratio: number) => string
  groundCoffeeLabel: string
  groundCoffeeSub: string
  tablespoonsLabel: string
  tablespoonsSub: string
  scoopsLabel: string
  scoopsSub: string
  steepReminder: string
  footnote: string
}

// ─── InstantCoffeeCalculator ──────────────────────────────────────────────────

export interface InstantCoffeeStrings extends CopyStrings {
  numberOfCupsLabel: string
  cupSizeLabel: string
  smallLabel: string
  standardLabel: string
  largeLabel: string
  bigMugLabel: string
  brandLabel: string
  genericInstantLabel: string
  genericNote: string
  nescafeLabel: string
  nescafeNote: string
  busteloLabel: string
  busteloNote: string
  folgersLabel: string
  folgersNote: string
  strengthLabel: string
  mildLabel: string
  mediumLabel: string
  strongLabel: string
  unitsLabel: string
  metric: string
  imperial: string
  cup: string
  cups: string
  instantCoffeeLabel: string
  instantCoffeeSub: string
  teaspoonsLabel: string
  teaspoonsSub: string
  tablespoonsLabel: string
  tablespoonsSub: string
  footnote: string
}

// ─── CoffeeBeansPerCupCalculator ──────────────────────────────────────────────

export interface CoffeeBeansStrings extends CopyStrings {
  howManyCups: string
  customPlaceholder: string
  cupSizeLabel: string
  espressoLabel: string
  smallLabel: string
  standardLabel: string
  largeLabel: string
  bigMugLabel: string
  roastLevelLabel: string
  lightRoastLabel: string
  lightRoastNote: string
  mediumRoastLabel: string
  mediumRoastNote: string
  darkRoastLabel: string
  darkRoastNote: string
  strengthLabel: string
  weakLabel: string
  mediumLabel: string
  strongLabel: string
  veryStrongLabel: string
  unitsLabel: string
  metric: string
  imperial: string
  emptyState: string
  cup: string
  cups: string
  wholeBeansLabel: string
  beansUnit: string
  perCup: (n: number) => string
  byWeightLabel: string
  byWeightSub: string
  tablespoonsLabel: string
  tablespoonsSub: string
  beanWeightLabel: string
  gPerBean: string
  footnote: string
}

// ─── CoffeeMeasurementConverter ───────────────────────────────────────────────

export interface MeasurementConverterStrings extends CopyStrings {
  convertFromLabel: string
  amountLabel: string
  gramsButtonLabel: string
  tablespoonsButtonLabel: string
  teaspoonsButtonLabel: string
  scoopsButtonLabel: string
  ouncesButtonLabel: string
  gramsLabel: string
  tablespoonsLabel: string
  teaspoonsLabel: string
  scoopsLabel: string
  ouncesLabel: string
  emptyState: string
  equalsPhrase: (amount: number, unitLabel: string) => string
  footnote: string
}

// ─── PourOverCalculator ───────────────────────────────────────────────────────

export interface PourOverStrings extends CopyStrings {
  brewerLabel: string
  recipeLabel: string
  customRatioNote: string
  hoffmannNote: string
  kasuyaNote: string
  coffeeDoseLabel: string
  ratioLabel: string
  unitsLabel: string
  metric: string
  imperial: string
  emptyState: string
  coffeeLabel: string
  waterLabel: string
  ratioResultLabel: string
  pourSequenceLabel: string
  footnote: string
  bloomLabel: string
  pourLabel: (n: number) => string
  pourNotes: {
    hoffmannBloom: (ml: number, sec: number) => string
    hoffmannContinuous: string
    kasuyaPour1: string
    kasuyaPour2: string
    kasuyaPour3: string
    kasuyaPour4: string
    kasuyaPour5: string
    customBloom: (ml: number, sec: number) => string
    customPour: (totalMl: number) => string
  }
}

// ─── AeroPressRecipe ──────────────────────────────────────────────────────────

export interface AeroPressStep {
  time: string
  action: string
  detail: string
}

export interface AeroPressStrings extends CopyStrings {
  methodLabel: string
  coffeeDoseLabel: string
  customPlaceholder: string
  standardLabel: string
  standardNote: string
  invertedLabel: string
  invertedNote: string
  hoffmannLabel: string
  hoffmannNote: string
  icedLabel: string
  icedNote: string
  coffeeLabel: string
  waterLabel: string
  tempLabel: string
  ratioLabel: string
  stepByStepLabel: string
  rinseNote: string
  copyRecipe: string
  copiedRecipe: string
  grindNotes: {
    standard: string
    inverted: string
    hoffmann: string
    iced: string
  }
  steps: {
    standard: (dose: number, waterMl: number, bloomMl: number) => AeroPressStep[]
    inverted: (dose: number, waterMl: number, bloomMl: number) => AeroPressStep[]
    hoffmann: (dose: number, waterMl: number) => AeroPressStep[]
    iced: (dose: number, waterMl: number, bloomMl: number, iceMl: number) => AeroPressStep[]
  }
}

// ─── ColdBrewRatioCalculator ──────────────────────────────────────────────────

export interface ColdBrewStrings extends CopyStrings {
  coldBrewStyleLabel: string
  concentrateLabel: string
  concentrateSub: string
  concentrateNote: string
  rtdLabel: string
  rtdSub: string
  rtdNote: string
  equipmentLabel: string
  masonJarLabel: string
  masonJarSub: string
  frenchPressLabel: string
  frenchPressSub: string
  coldBrewKitLabel: string
  coldBrewKitSub: string
  waterAmountLabel: string
  customMlPlaceholder: string
  unitsLabel: string
  metric: string
  imperial: string
  emptyState: string
  groundCoffeeLabel: string
  tablespoonsLabel: string
  steepTimeLabel: string
  steepTimeValue: string
  processNote: string
}

// ─── CaffeineCalculator ───────────────────────────────────────────────────────

export interface CaffeineStrings extends CopyStrings {
  brewMethodLabel: string
  dripLabel: string
  dripNote: string
  pourOverLabel: string
  pourOverNote: string
  frenchPressLabel: string
  frenchPressNote: string
  espressoLabel: string
  espressoNote: string
  coldBrewLabel: string
  coldBrewNote: string
  instantLabel: string
  instantNote: string
  roastLevelLabel: string
  lightRoast: string
  mediumRoast: string
  darkRoast: string
  cupsServingsLabel: string
  perServingLabel: string
  servingLabel: string
  servingsLabel: string
  dailyLimitLabel: string
  barMin: string
  barMax: string
  withinLimit: string
  approachingLimit: string
  exceedsLimit: string
  disclaimer: string
  buildCopyText: (cups: number, servingOrServings: string, methodLabel: string, roastLabel: string, totalCaff: number, pctDaily: number) => string
}

// ─── EspressoRatioCalculator ──────────────────────────────────────────────────

export interface EspressoRatioStrings extends CopyStrings {
  shotTypeLabel: string
  ristrettoLabel: string
  ristrettoNote: string
  espressoLabel: string
  espressoNote: string
  lungoLabel: string
  lungoNote: string
  customLabel: string
  customNote: string
  doseLabel: string
  ratioLabel: string
  emptyState: string
  doseInLabel: string
  yieldOutLabel: string
  ratioResultLabel: string
  shotTimeNote: string
  yieldNote: string
}

// ─── Spanish (es) translations ────────────────────────────────────────────────

const esStrings: {
  'coffee-ratio-calculator': CoffeeRatioStrings
  'french-press-ratio-calculator': FrenchPressStrings
  'instant-coffee-calculator': InstantCoffeeStrings
  'coffee-beans-per-cup': CoffeeBeansStrings
  'coffee-measurement-converter': MeasurementConverterStrings
  'pour-over-calculator': PourOverStrings
  'aeropress-recipe': AeroPressStrings
  'cold-brew-ratio-calculator': ColdBrewStrings
  'caffeine-calculator': CaffeineStrings
  'espresso-ratio-calculator': EspressoRatioStrings
} = {
  'coffee-ratio-calculator': {
    howManyCups: '¿Cuántas tazas?',
    customPlaceholder: 'Personalizado',
    cupSizeLabel: 'Tamaño de taza',
    standardMugLabel: 'Taza estándar',
    coffeeMakerLabel: 'Taza de cafetera',
    outputUnitsLabel: 'Unidades',
    metric: 'métrico',
    imperial: 'imperial',
    strengthLabel: 'Intensidad',
    weakLabel: 'Suave',
    weakNote: 'Ligero y delicado — estándar SCA para goteo',
    mediumLabel: 'Medio',
    mediumNote: 'Equilibrado, el ratio más popular',
    strongLabel: 'Fuerte',
    strongNote: 'Intenso y con cuerpo',
    veryStrongLabel: 'Muy fuerte',
    veryStrongNote: 'Intenso y concentrado',
    emptyState: 'Introduce el número de tazas para ver la cantidad de café.',
    cup: 'taza',
    cups: 'tazas',
    groundCoffeeLabel: 'Café molido',
    groundCoffeeSub: 'por peso (más exacto)',
    tablespoonsLabel: 'Cucharadas',
    tablespoonsSub: '≈ 6 g por cucharada',
    teaspoonsLabel: 'Cucharaditas',
    teaspoonsSub: '≈ 2 g por cucharadita',
    scoopsLabel: 'Scoops',
    scoopsSub: 'scoop estándar de 2 cdas.',
    footnote: 'Los valores en cucharadas y cucharaditas corresponden a café molido a finura media (≈6 g/cda.). El molido grueso pesa menos; pesa el café en gramos para mayor precisión.',
    copy: 'Copiar',
    copied: 'Copiado',
  },

  'french-press-ratio-calculator': {
    pressSizeLabel: 'Tamaño de la prensa',
    customMlPlaceholder: 'ml personalizado',
    millilitres: 'mililitros',
    strengthLabel: 'Intensidad',
    lightLabel: 'Suave',
    lightNote: 'Limpio y delicado — resalta el origen del café',
    mediumLabel: 'Medio',
    mediumNote: 'Cuerpo equilibrado — punto de partida más popular',
    strongLabel: 'Fuerte',
    strongNote: 'Intenso y con mucho cuerpo',
    veryStrongLabel: 'Muy fuerte',
    veryStrongNote: 'Espeso e intensamente aromático',
    unitsLabel: 'Unidades',
    metric: 'métrico',
    imperial: 'imperial',
    emptyState: 'Selecciona el tamaño de la prensa para ver la dosis de café.',
    forXWater: (water, ratio) => `Para ${water} de agua a 1:${ratio}`,
    groundCoffeeLabel: 'Café molido',
    groundCoffeeSub: 'por peso (más exacto)',
    tablespoonsLabel: 'Cucharadas',
    tablespoonsSub: '≈ 7 g por cda. (molido grueso)',
    scoopsLabel: 'Scoops',
    scoopsSub: 'scoop estándar (2 cdas.)',
    steepReminder: 'Deja reposar 4 minutos antes de presionar el émbolo. Usa molido grueso (similar a la sal gruesa) para mayor claridad en la taza.',
    footnote: 'Los valores en cucharadas corresponden a café de molido grueso (≈7 g/cda.). Pesa en gramos para resultados más consistentes.',
    copy: 'Copiar',
    copied: 'Copiado',
  },

  'instant-coffee-calculator': {
    numberOfCupsLabel: 'Número de tazas',
    cupSizeLabel: 'Tamaño de taza',
    smallLabel: 'Pequeña',
    standardLabel: 'Estándar',
    largeLabel: 'Grande',
    bigMugLabel: 'Tazón grande',
    brandLabel: 'Marca',
    genericInstantLabel: 'Café instantáneo genérico',
    genericNote: 'Gránulos estándar de café soluble',
    nescafeLabel: 'Nescafé',
    nescafeNote: 'Nescafé Clásico / Gold',
    busteloLabel: 'Café Bustelo',
    busteloNote: 'Polvo estilo espresso, más denso',
    folgersLabel: 'Folgers',
    folgersNote: 'Folgers Clásico / Cristales',
    strengthLabel: 'Intensidad',
    mildLabel: 'Suave',
    mediumLabel: 'Medio',
    strongLabel: 'Fuerte',
    unitsLabel: 'Unidades',
    metric: 'métrico',
    imperial: 'imperial',
    cup: 'taza',
    cups: 'tazas',
    instantCoffeeLabel: 'Café instantáneo',
    instantCoffeeSub: 'por peso',
    teaspoonsLabel: 'Cucharaditas',
    teaspoonsSub: 'rasas, sin amontonar',
    tablespoonsLabel: 'Cucharadas',
    tablespoonsSub: 'rasas, sin amontonar',
    footnote: 'La densidad por cucharadita varía según la marca. Usa cucharas rasas para resultados consistentes. Temperatura del agua: 90–96 °C.',
    copy: 'Copiar',
    copied: 'Copiado',
  },

  'coffee-beans-per-cup': {
    howManyCups: '¿Cuántas tazas?',
    customPlaceholder: 'Personalizado',
    cupSizeLabel: 'Tamaño de taza',
    espressoLabel: 'Espresso',
    smallLabel: 'Pequeña',
    standardLabel: 'Estándar',
    largeLabel: 'Grande',
    bigMugLabel: 'Tazón grande',
    roastLevelLabel: 'Nivel de tueste',
    lightRoastLabel: 'Tueste claro',
    lightRoastNote: 'Granos más densos, ~0,15 g/grano',
    mediumRoastLabel: 'Tueste medio',
    mediumRoastNote: 'Peso promedio de grano ~0,13 g',
    darkRoastLabel: 'Tueste oscuro',
    darkRoastNote: 'Granos más ligeros, ~0,11 g/grano',
    strengthLabel: 'Intensidad',
    weakLabel: 'Suave',
    mediumLabel: 'Medio',
    strongLabel: 'Fuerte',
    veryStrongLabel: 'Muy fuerte',
    unitsLabel: 'Unidades',
    metric: 'métrico',
    imperial: 'imperial',
    emptyState: 'Introduce el número de tazas para ver el conteo de granos.',
    cup: 'taza',
    cups: 'tazas',
    wholeBeansLabel: 'Granos enteros',
    beansUnit: 'granos',
    perCup: (n) => `≈ ${n} por taza`,
    byWeightLabel: 'Por peso',
    byWeightSub: 'después de moler',
    tablespoonsLabel: 'Cucharadas',
    tablespoonsSub: 'molido medio',
    beanWeightLabel: 'Peso del grano',
    gPerBean: 'g/grano',
    footnote: 'El conteo de granos es una estimación basada en el peso promedio del grano Arábica. Los granos Robusta son más pequeños (≈0,10 g); los granos de especialidad de cribado grande pueden pesar 0,17 g o más. Pesa los granos para una medición precisa.',
    copy: 'Copiar',
    copied: 'Copiado',
  },

  'coffee-measurement-converter': {
    convertFromLabel: 'Convertir desde',
    amountLabel: 'Cantidad',
    gramsButtonLabel: 'Gramos (g)',
    tablespoonsButtonLabel: 'Cucharadas (cda.)',
    teaspoonsButtonLabel: 'Cucharaditas (cdta.)',
    scoopsButtonLabel: 'Scoops (2 cdas.)',
    ouncesButtonLabel: 'Onzas (oz)',
    gramsLabel: 'Gramos',
    tablespoonsLabel: 'Cucharadas',
    teaspoonsLabel: 'Cucharaditas',
    scoopsLabel: 'Scoops',
    ouncesLabel: 'Onzas',
    emptyState: 'Introduce una cantidad para ver las conversiones.',
    equalsPhrase: (amount, unitLabel) => `${amount} ${unitLabel.toLowerCase()} equivale a`,
    footnote: 'Basado en café molido a finura media: 6 g/cda., 2 g/cdta., 12 g/scoop. El molido grueso pesa menos por cucharada; el fino, más.',
    copy: 'Copiar',
    copied: 'Copiado',
  },

  'pour-over-calculator': {
    brewerLabel: 'Cafetera',
    recipeLabel: 'Receta',
    customRatioNote: 'Ajusta el ratio según tu preferencia',
    hoffmannNote: '30 g de café, 500 ml de agua — un vertido lento y continuo tras la pre-infusión',
    kasuyaNote: 'Método 4:6 — los dos primeros vertidos controlan el dulzor/acidez; los tres últimos, la intensidad',
    coffeeDoseLabel: 'Dosis de café (g)',
    ratioLabel: 'Ratio (1:x)',
    unitsLabel: 'Unidades',
    metric: 'métrico',
    imperial: 'imperial',
    emptyState: 'Introduce una dosis de café para ver tu receta.',
    coffeeLabel: 'Café',
    waterLabel: 'Agua',
    ratioResultLabel: 'Ratio',
    pourSequenceLabel: 'Secuencia de vertidos',
    footnote: 'Temperatura del agua: 93–96 °C. Molienda: media-fina para V60 y Kalita; media para Chemex.',
    bloomLabel: 'Pre-infusión',
    pourLabel: (n) => `Vertido ${n}`,
    pourNotes: {
      hoffmannBloom: (ml, sec) => `Vierte ${ml} ml, remueve, espera ${sec} s`,
      hoffmannContinuous: 'Vertido lento y continuo hasta el total',
      kasuyaPour1: 'Primer 20% — controla el dulzor',
      kasuyaPour2: 'Segundo 20% — controla la acidez',
      kasuyaPour3: 'Tercer vertido — controla la intensidad',
      kasuyaPour4: 'Cuarto vertido',
      kasuyaPour5: 'Quinto vertido',
      customBloom: (ml, sec) => `Vierte ${ml} ml, espera ${sec} s`,
      customPour: (totalMl) => `Vierte hasta ${totalMl} ml en total`,
    },
    copy: 'Copiar',
    copied: 'Copiado',
  },

  'aeropress-recipe': {
    methodLabel: 'Método',
    coffeeDoseLabel: 'Dosis de café',
    customPlaceholder: 'Personalizado',
    standardLabel: 'Estándar',
    standardNote: 'Método clásico — fácil, taza limpia, ideal para cualquier tueste',
    invertedLabel: 'Invertido',
    invertedNote: 'El método invertido evita el goteo — infusión más larga, mayor cuerpo',
    hoffmannLabel: 'James Hoffmann',
    hoffmannNote: 'La receta definitiva de AeroPress según Hoffmann — sin remover, presión suave, agua hirviendo',
    icedLabel: 'AeroPress con hielo',
    icedNote: 'Prepara el concentrado caliente directamente sobre hielo — rápido y con sabor intenso',
    coffeeLabel: 'Café',
    waterLabel: 'Agua',
    tempLabel: 'Temp.',
    ratioLabel: 'Ratio',
    stepByStepLabel: 'Paso a paso',
    rinseNote: 'Enjuaga siempre el filtro de papel antes de preparar.',
    copyRecipe: 'Copiar receta',
    copiedRecipe: '¡Copiado!',
    copy: 'Copiar',
    copied: '¡Copiado!',
    grindNotes: {
      standard: 'Molienda: media-fina',
      inverted: 'Molienda: media-fina',
      hoffmann: 'Molienda: media',
      iced: 'Molienda: media-fina',
    },
    steps: {
      standard: (dose, waterMl, bloomMl) => [
        { time: '0:00', action: 'Enjuague y preparación', detail: 'Enjuaga el filtro de papel con agua caliente. Coloca el AeroPress sobre la taza con la tapa del filtro puesta.' },
        { time: '0:00', action: 'Añade el café', detail: `Añade ${dose} g de café molido a finura media-fina.` },
        { time: '0:00', action: 'Pre-infusión', detail: `Vierte ${bloomMl} ml (el doble del peso del café) de agua. Remueve suavemente. Espera 30 segundos.` },
        { time: '0:30', action: 'Llena', detail: `Vierte el agua restante hasta ${waterMl} ml en total. Remueve una vez.` },
        { time: '1:00', action: 'Inserta el émbolo', detail: 'Inserta el émbolo y presiona lentamente durante 30 segundos. Para cuando oigas un silbido.' },
        { time: '1:30', action: 'Listo', detail: 'Tiempo total ~1:30. Diluye con agua caliente si lo deseas.' },
      ],
      inverted: (dose, waterMl, bloomMl) => [
        { time: '0:00', action: 'Coloca invertido', detail: 'Coloca el AeroPress boca abajo con el émbolo insertado hasta la marca 4.' },
        { time: '0:00', action: 'Añade el café', detail: `Añade ${dose} g de café molido a finura media-fina.` },
        { time: '0:00', action: 'Pre-infusión', detail: `Vierte ${bloomMl} ml de agua. Remueve para humedecer el café. Espera 30 segundos.` },
        { time: '0:30', action: 'Llena', detail: `Vierte hasta ${waterMl} ml en total. Remueve 3 veces. Coloca la tapa del filtro con el filtro enjuagado.` },
        { time: '1:00', action: 'Infusión', detail: 'Deja reposar 1 minuto adicional.' },
        { time: '2:00', action: 'Voltea y presiona', detail: 'Voltea con cuidado sobre tu taza. Presiona lentamente durante 30 segundos.' },
        { time: '2:30', action: 'Listo', detail: 'Tiempo total ~2:30. Más intenso y con más cuerpo que el método estándar.' },
      ],
      hoffmann: (dose, waterMl) => [
        { time: '0:00', action: 'Coloca invertido', detail: 'AeroPress invertido, émbolo en la marca 4. Usa agua hirviendo (100 °C).' },
        { time: '0:00', action: 'Añade el café', detail: `Añade ${dose} g de café molido a finura media.` },
        { time: '0:00', action: 'Llena de inmediato', detail: `Vierte los ${waterMl} ml de agua hirviendo. No remuevas.` },
        { time: '0:00', action: 'Tapa', detail: 'Coloca la tapa del filtro con el filtro enjuagado. No presiones todavía.' },
        { time: '2:00', action: 'Voltea', detail: 'A los 2 minutos voltea sobre la taza. Deja reposar 30 segundos antes de presionar.' },
        { time: '2:30', action: 'Presiona suavemente', detail: 'Presiona muy despacio durante 30 segundos. Para en cuanto oigas el silbido.' },
        { time: '3:00', action: 'Listo', detail: 'Tiempo total ~3 minutos. Agua hirviendo sin remover = extracción uniforme.' },
      ],
      iced: (dose, waterMl, bloomMl, iceMl) => [
        { time: '0:00', action: 'Prepara el vaso', detail: `Llena un vaso con ${iceMl} g de cubitos de hielo.` },
        { time: '0:00', action: 'Coloca en posición estándar', detail: 'AeroPress en posición estándar sobre el vaso con hielo.' },
        { time: '0:00', action: 'Añade el café', detail: `Añade ${dose} g de café molido a finura media-fina.` },
        { time: '0:00', action: 'Pre-infusión', detail: `Vierte ${bloomMl} ml de agua. Remueve. Espera 30 segundos.` },
        { time: '0:30', action: 'Llena', detail: `Vierte el agua restante hasta ${waterMl} ml de concentrado total.` },
        { time: '1:00', action: 'Presiona', detail: 'Presiona con firmeza durante 20 segundos directamente sobre el hielo.' },
        { time: '1:30', action: 'Listo', detail: 'El concentrado caliente se enfría al instante sobre el hielo. Remueve y sirve.' },
      ],
    },
  },

  'cold-brew-ratio-calculator': {
    coldBrewStyleLabel: 'Tipo de cold brew',
    concentrateLabel: 'Concentrado',
    concentrateSub: '1:4 — diluir 1:1 con agua o leche',
    concentrateNote: 'Diluye al 50 % antes de beber. Se conserva en el frigorífico hasta 2 semanas.',
    rtdLabel: 'Listo para beber',
    rtdSub: '1:8 — beber directamente sobre hielo',
    rtdNote: 'Beber directamente sobre hielo. Se conserva en el frigorífico hasta 10 días.',
    equipmentLabel: 'Equipo',
    masonJarLabel: 'Tarro de cristal',
    masonJarSub: 'Cualquier tarro hermético',
    frenchPressLabel: 'Prensa francesa',
    frenchPressSub: 'Úsala como colador',
    coldBrewKitLabel: 'Kit de cold brew',
    coldBrewKitSub: 'Cafetera de cold brew',
    waterAmountLabel: 'Cantidad de agua',
    customMlPlaceholder: 'ml personalizado',
    unitsLabel: 'Unidades',
    metric: 'métrico',
    imperial: 'imperial',
    emptyState: 'Introduce una cantidad de agua para ver tu receta de cold brew.',
    groundCoffeeLabel: 'Café molido',
    tablespoonsLabel: 'Cucharadas',
    steepTimeLabel: 'Maceración',
    steepTimeValue: '12–24 h',
    processNote: 'Mezcla el café de molido grueso con agua fría. Remueve para humedecer bien el café. Cubre y refrigera durante 12 a 24 horas. Filtra a través de un colador de malla fina o la malla de la prensa francesa; para un resultado más claro, filtra de nuevo con un filtro de papel o estopilla.',
    copy: 'Copiar',
    copied: 'Copiado',
  },

  'caffeine-calculator': {
    brewMethodLabel: 'Método de preparación',
    dripLabel: 'Goteo / filtro',
    dripNote: 'Taza estándar de 250 ml',
    pourOverLabel: 'Pour over',
    pourOverNote: 'V60, Chemex, Kalita',
    frenchPressLabel: 'Prensa francesa',
    frenchPressNote: 'Prensa de 8 tazas (1 L)',
    espressoLabel: 'Espresso',
    espressoNote: 'Doble (~36 ml de extracción)',
    coldBrewLabel: 'Cold brew',
    coldBrewNote: 'Por ración de 250 ml de concentrado',
    instantLabel: 'Café instantáneo',
    instantNote: 'Por cucharadita rasa (1,8 g)',
    roastLevelLabel: 'Nivel de tueste',
    lightRoast: 'Claro',
    mediumRoast: 'Medio',
    darkRoast: 'Oscuro',
    cupsServingsLabel: 'Tazas / raciones',
    perServingLabel: 'Por ración',
    servingLabel: 'ración',
    servingsLabel: 'raciones',
    dailyLimitLabel: 'Límite diario',
    barMin: '0 mg',
    barMax: 'Límite diario FDA: 400 mg',
    withinLimit: 'Dentro del límite diario recomendado por la FDA de 400 mg para adultos sanos.',
    approachingLimit: 'Cerca del límite diario recomendado. Ten en cuenta otras fuentes de cafeína en tu dieta.',
    exceedsLimit: 'Supera el límite diario recomendado por la FDA. Esta estimación es orientativa.',
    disclaimer: 'Las estimaciones de cafeína son aproximadas. El contenido real varía según el origen del grano, el lote de tueste y las variables del proceso. Consulta a un profesional de la salud si tienes sensibilidad a la cafeína.',
    buildCopyText: (cups, servingOrServings, methodLabel, roastLabel, totalCaff, pctDaily) =>
      `${cups} ${servingOrServings} de ${methodLabel} (${roastLabel}) = ${totalCaff} mg de cafeína = ${pctDaily} % del límite diario FDA (400 mg)`,
    copy: 'Copiar',
    copied: 'Copiado',
  },

  'espresso-ratio-calculator': {
    shotTypeLabel: 'Tipo de extracción',
    ristrettoLabel: 'Ristretto',
    ristrettoNote: 'Corto e intenso — se detiene al alcanzar el peso de la dosis',
    espressoLabel: 'Espresso',
    espressoNote: 'Objetivo estándar para un doble',
    lungoLabel: 'Lungo',
    lungoNote: 'Extracción larga — más amargo, mayor extracción de cafeína',
    customLabel: 'Personalizado',
    customNote: 'Introduce tu ratio preferido a continuación',
    doseLabel: 'Dosis (g)',
    ratioLabel: 'Ratio (1:x)',
    emptyState: 'Introduce una dosis para ver el peso objetivo de extracción.',
    doseInLabel: 'Dosis (entrada)',
    yieldOutLabel: 'Extracción (salida)',
    ratioResultLabel: 'Ratio',
    shotTimeNote: 'Tiempo objetivo de extracción: 25 a 35 segundos para espresso y ristretto; 35 a 45 segundos para lungo. Pesa la extracción en la taza, no en el portafiltro — la crema está incluida en el peso objetivo.',
    yieldNote: 'La extracción se mide en gramos sobre una báscula bajo el portafiltro. 1 ml de espresso pesa aproximadamente 1 g, por lo que gramos y mililitros son equivalentes a esta escala.',
    copy: 'Copiar',
    copied: 'Copiado',
  },
}

export const toolUiStrings: Record<string, typeof esStrings> = { es: esStrings }
