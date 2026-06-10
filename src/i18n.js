// Internationalization (i18n) module
// Supports: English (en), Spanish (es), French (fr)

const translations = {
  en: {
    // Setup Screen - Header
    configTitle: 'DECRYPTOR CONFIGURATION v1.0',

    // Setup Screen - Background Image
    bgImageLabel: 'BACKGROUND IMAGE',
    chooseFile: 'CHOOSE FILE',
    noFileSelected: 'No file selected (using default terminal background)',
    storedBgLoaded: 'Stored custom background loaded',
    bgUploaded: 'Background uploaded and saved!',
    bgTooLarge: 'Warning: Image too large to save permanently. It will only work during this session.',
    removeBgTooltip: 'Remove Background',

    // Setup Screen - Form Fields
    passwordLabel: 'DECRYPTION KEY (Max 8 characters)',
    passwordPlaceholder: 'ENTER CODE...',
    minutesLabel: 'COUNTDOWN TIME (Minutes)',
    attemptsLabel: 'MAX ATTEMPTS',
    winMsgLabel: 'SUCCESS MESSAGE',
    winMsgPlaceholder: 'ACCESS GRANTED',
    loseMsgLabel: 'FAIL MESSAGE',
    loseMsgPlaceholder: 'SYSTEM LOCKDOWN',
    initBtn: 'INITIALIZE DECRYPTOR',

    // Setup Screen - Validation
    errPassword: 'Password must be between 1 and 8 characters.',
    errMinutes: 'Please enter a valid time of at least 1 minute.',
    errAttempts: 'Please enter a valid attempt count of at least 1.',
    msgConfigured: 'SYSTEM CONFIGURED. INITIALIZING ENCRYPTED TUNNEL...',

    // Wait Screen
    waitTitle: 'DECRYPTOR ARMED',
    waitSubtitle: 'CLICK ANYWHERE TO BEGIN THE SEQUENCE',

    // Game Screen - Header
    statusLabel: 'STATUS:',
    statusDecrypting: 'DECRYPTING...',
    attemptsRemainingLabel: 'ATTEMPTS REMAINING:',
    gameInstructions: 'INTRODUCE DECRYPTION KEY',

    // Game Screen - Terminal
    terminalReady: 'SECURE SHELL BOUND - AWAITING DATA...',
    keyLinked: (i) => `KEY INDEX ${i} LINKED SUCCESSFULLY.`,
    keyError: (i) => `DECRYPTION ERROR: FAULTY KEY AT POSITION ${i}.`,

    // Loss Reasons (passed into loseTitle)
    reasonAttempts: 'ATTEMPTS EXHAUSTED',
    reasonTime: 'TIME LIMIT EXPIRED',

    // Result Screen
    resultDetermined: 'ACCESS DETERMINED',
    resultDefault: 'Result description message.',
    winTitle: 'DECRYPTION COMPLETE',
    loseTitle: (reason) => `DECRYPTION FAILURE (${reason})`,
    timeTaken: (m, s) => `Sequence resolved in ${m}m ${s}s.`,
    lockdownMsg: 'Security mainframe lockdown triggered.',
    resultReset: 'RESET SYSTEM',
  },

  es: {
    configTitle: 'CONFIGURACIÓN DEL DESCIFRADOR v1.0',

    bgImageLabel: 'IMAGEN DE FONDO',
    chooseFile: 'ELEGIR ARCHIVO',
    noFileSelected: 'Sin archivo (fondo de terminal por defecto)',
    storedBgLoaded: 'Fondo personalizado cargado',
    bgUploaded: '¡Fondo subido y guardado!',
    bgTooLarge: 'Aviso: Imagen demasiado grande para guardar permanentemente. Solo funcionará en esta sesión.',
    removeBgTooltip: 'Eliminar fondo',

    passwordLabel: 'CLAVE DE DESCIFRADO (Máx. 8 caracteres)',
    passwordPlaceholder: 'INTRODUCE CÓDIGO...',
    minutesLabel: 'TIEMPO DE CUENTA REGRESIVA (Minutos)',
    attemptsLabel: 'INTENTOS MÁXIMOS',
    winMsgLabel: 'MENSAJE DE ÉXITO',
    winMsgPlaceholder: 'ACCESO CONCEDIDO',
    loseMsgLabel: 'MENSAJE DE DERROTA',
    loseMsgPlaceholder: 'BLOQUEO DEL SISTEMA',
    initBtn: 'INICIALIZAR DESCIFRADOR',

    errPassword: 'La contraseña debe tener entre 1 y 8 caracteres.',
    errMinutes: 'Introduce un tiempo válido de al menos 1 minuto.',
    errAttempts: 'Introduce un número de intentos válido (mínimo 1).',
    msgConfigured: 'SISTEMA CONFIGURADO. INICIANDO TÚNEL CIFRADO...',

    waitTitle: 'DESCIFRADOR ARMADO',
    waitSubtitle: 'PULSA EN CUALQUIER LUGAR PARA INICIAR LA SECUENCIA',

    statusLabel: 'ESTADO:',
    statusDecrypting: 'DESCIFRANDO...',
    attemptsRemainingLabel: 'INTENTOS RESTANTES:',
    gameInstructions: 'INTRODUCE LA CLAVE DE DESCIFRADO',

    terminalReady: 'SHELL SEGURA VINCULADA - ESPERANDO DATOS...',
    keyLinked: (i) => `ÍNDICE DE CLAVE ${i} VINCULADO CORRECTAMENTE.`,
    keyError: (i) => `ERROR DE DESCIFRADO: CLAVE INCORRECTA EN POSICIÓN ${i}.`,

    reasonAttempts: 'INTENTOS AGOTADOS',
    reasonTime: 'TIEMPO EXPIRADO',

    resultDetermined: 'ACCESO DETERMINADO',
    resultDefault: 'Mensaje de resultado.',
    winTitle: 'DESCIFRADO COMPLETADO',
    loseTitle: (reason) => `FALLO EN EL DESCIFRADO (${reason})`,
    timeTaken: (m, s) => `Secuencia resuelta en ${m}m ${s}s.`,
    lockdownMsg: 'Bloqueo del servidor de seguridad activado.',
    resultReset: 'REINICIAR SISTEMA',
  },

  fr: {
    configTitle: 'CONFIGURATION DU DÉCHIFFREUR v1.0',

    bgImageLabel: 'IMAGE DE FOND',
    chooseFile: 'CHOISIR UN FICHIER',
    noFileSelected: 'Aucun fichier (fond de terminal par défaut)',
    storedBgLoaded: 'Fond personnalisé chargé',
    bgUploaded: 'Image de fond téléchargée et sauvegardée !',
    bgTooLarge: "Avertissement : Image trop volumineuse pour être sauvegardée. Elle ne fonctionnera que cette session.",
    removeBgTooltip: 'Supprimer le fond',

    passwordLabel: 'CLÉ DE DÉCHIFFREMENT (8 caractères max.)',
    passwordPlaceholder: 'ENTRER LE CODE...',
    minutesLabel: 'TEMPS DU COMPTE À REBOURS (Minutes)',
    attemptsLabel: 'TENTATIVES MAXIMUM',
    winMsgLabel: 'MESSAGE DE SUCCÈS',
    winMsgPlaceholder: 'ACCÈS AUTORISÉ',
    loseMsgLabel: "MESSAGE D'ÉCHEC",
    loseMsgPlaceholder: 'VERROUILLAGE DU SYSTÈME',
    initBtn: 'INITIALISER LE DÉCHIFFREUR',

    errPassword: 'Le mot de passe doit comporter entre 1 et 8 caractères.',
    errMinutes: "Veuillez entrer un temps valide d'au moins 1 minute.",
    errAttempts: 'Veuillez entrer un nombre de tentatives valide (minimum 1).',
    msgConfigured: 'SYSTÈME CONFIGURÉ. INITIALISATION DU TUNNEL CHIFFRÉ...',

    waitTitle: 'DÉCHIFFREUR ARMÉ',
    waitSubtitle: "CLIQUEZ N'IMPORTE OÙ POUR DÉMARRER LA SÉQUENCE",

    statusLabel: 'STATUT :',
    statusDecrypting: 'DÉCHIFFREMENT...',
    attemptsRemainingLabel: 'TENTATIVES RESTANTES :',
    gameInstructions: 'INTRODUIRE LA CLÉ DE DÉCHIFFREMENT',

    terminalReady: 'SHELL SÉCURISÉ CONNECTÉ - EN ATTENTE DE DONNÉES...',
    keyLinked: (i) => `INDEX CLÉ ${i} LIÉ AVEC SUCCÈS.`,
    keyError: (i) => `ERREUR DE DÉCHIFFREMENT : CLÉ INCORRECTE À LA POSITION ${i}.`,

    reasonAttempts: 'TENTATIVES ÉPUISÉES',
    reasonTime: 'DÉLAI EXPIRÉ',

    resultDetermined: 'ACCÈS DÉTERMINÉ',
    resultDefault: 'Message de résultat.',
    winTitle: 'DÉCHIFFREMENT TERMINÉ',
    loseTitle: (reason) => `ÉCHEC DU DÉCHIFFREMENT (${reason})`,
    timeTaken: (m, s) => `Séquence résolue en ${m}m ${s}s.`,
    lockdownMsg: 'Verrouillage du pare-feu de sécurité déclenché.',
    resultReset: 'RÉINITIALISER LE SYSTÈME',
  },
};

/**
 * Detect the best matching language:
 * 1. Persisted user preference (localStorage)
 * 2. Browser language (navigator.language / navigator.languages)
 * 3. Fallback to English
 */
function detectLanguage() {
  const stored = localStorage.getItem('lang');
  if (stored && translations[stored]) return stored;

  // navigator.languages gives an ordered preference list
  const preferred = (navigator.languages && navigator.languages.length)
    ? navigator.languages
    : [navigator.language || 'en'];

  for (const lang of preferred) {
    const lower = lang.toLowerCase();
    // Exact match (e.g., 'fr')
    if (translations[lower]) return lower;
    // Regional variant match (e.g., 'es-MX' → 'es')
    const base = lower.split('-')[0];
    if (translations[base]) return base;
  }

  return 'en';
}

let currentLang = detectLanguage();

/**
 * Get the translated string for a given key in the current language.
 * Falls back to English if the key is not found.
 * Passes optional arguments to translation functions (for dynamic strings).
 */
export function t(key, ...args) {
  const entry =
    translations[currentLang]?.[key] ?? translations['en'][key];
  if (typeof entry === 'function') return entry(...args);
  return entry ?? key;
}

/**
 * Switch the active language and persist the choice.
 */
export function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
}

/**
 * Returns the current language code.
 */
export function getCurrentLang() {
  return currentLang;
}
