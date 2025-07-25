import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    home: 'Home',
    liveMatches: 'Live Matches',
    liveScores: 'Live Scores',
    schedule: 'Schedule',
    competitions: 'Competitions',
    about: 'About',
    watch: 'Watch',
    watchLive: 'Watch Live',
    matchDetails: 'Match Details',
    live: 'LIVE',
    finished: 'FT',
    halftime: 'HT',
    moreStreams: 'More Streams',
    moreInfo: 'More Info',
    aboutUs: 'About Us',
    privacyPolicy: 'Privacy Policy',
    disclaimer: 'Disclaimer',
    faq: 'FAQ',
    contactUs: 'Contact Us',
    termsOfService: 'Terms Of Service',
    navigation: 'Navigation',
    support: 'Support',
    connect: 'Connect',
    allRightsReserved: 'All rights reserved',
    siteDisclaimer: 'This site does not store any files on its server. All contents are provided by non-affiliated third parties.',
    noFilesStored: 'This site does not store any files on its server. All contents are provided by non-affiliated third parties.',
    yourTimezone: 'Your timezone',
    currentTimezone: 'Current timezone',
    timezone: 'Timezone',
    liveFootball: 'Live Football Streaming',
    footballStreaming: 'Football live stream in HD is here! KikaSports delivers free soccer live TV, today\'s football match live, and 24/7 football streaming online.',
    highlights: 'Highlights',
    contact: 'Contact',
    // Match Card translations
    vs: 'vs',
    homeTeam: 'Home',
    away: 'Away',
    // About section translations
    ourMission: 'Our Mission',
    whatWeOffer: 'What We Offer',
    joinOurCommunity: 'Join Our Community',
    registerNow: 'Register Now',
    // Features
    hdQualityStreams: 'HD Quality Streams',
    fastReliable: 'Fast & Reliable',
    userFriendlyInterface: 'User-Friendly Interface',
    liveStreamsDesc: 'Watch high-quality streams of football matches from around the world.',
    fastReliableDesc: 'Our streaming infrastructure is optimized for speed and reliability, ensuring smooth playback during peak times.',
    userFriendlyDesc: 'Intuitive interface that makes finding and watching matches effortless with easy navigation and quick access.',
    // General content
    enjoyHdStreams: 'Enjoy HD quality streams with minimal buffering and excellent audio quality for the best viewing experience.',
    comprehensiveCoverage: 'Comprehensive Coverage',
    easyNavigation: 'Easy Navigation',
    neverMissAMatch: 'Never Miss a Match',
    aboutFootballCompetitions: 'About Football Competitions',
    experienceExcitement: 'Experience the excitement of world-class football with live streaming coverage of major competitions.',
    followFavoriteTeams: 'Follow your favorite teams throughout the season and never miss a crucial match with our reliable streaming platform.',
    readyToWatch: 'Ready to watch?',
    checkTodayMatches: 'Check out today\'s live matches',
    viewUpcomingSchedule: 'view the upcoming schedule',
    // FAQ content
    howToWatch: 'How can I watch live football matches?',
    howToWatchAnswer: 'Simply browse our homepage or live matches section to find ongoing games. Click on any match to access multiple streaming sources and enjoy high-quality live football action.',
    isFree: 'Is the streaming service free?',
    isFreeAnswer: 'Yes, our basic streaming service is completely free. You can watch live matches, view schedules, and access match information without any subscription fees.',
    whatDevices: 'What devices can I use to watch matches?',
    whatDevicesAnswer: 'Our platform is compatible with all devices including desktop computers, laptops, tablets, and smartphones. We have responsive design that adapts to any screen size.',
    whyBuffering: 'Why is my stream buffering or lagging?',
    whyBufferingAnswer: 'Buffering can be caused by slow internet connection or high server load. Try switching to a different stream source, lowering the quality, or checking your internet connection speed.',
    howToFind: 'How do I find specific matches or teams?',
    howToFindAnswer: 'Use our schedule page to browse matches by date and competition. You can filter by specific leagues or use the search functionality to find your favorite teams.',
    areStreamsSafe: 'Are the streams safe to watch?',
    // Schedule page
    fixtureList: 'Our fixture list covers all major football competitions including domestic leagues, international tournaments, cup competitions, and friendly matches from around the world.',
    filterMatches: 'Filter matches by competition, view fixtures by date, and access detailed match information. Find exactly what you\'re looking for with our user-friendly interface.',
    // Common actions
    or: 'or',
    and: 'and',
    // Mission content
    missionContent: 'KikaSports is dedicated to bringing football fans closer to the game they love. We provide high-quality live streams, comprehensive coverage, and a community platform for fans around the world to enjoy matches from major leagues and competitions.',
    goalContent: 'Our goal is to create the ultimate football viewing experience that\'s accessible, reliable, and community-focused. We believe that every fan deserves access to watch their favorite teams and players compete at the highest level.',
    liveStreamsFeature: 'Live Streams',
    matchHighlights: 'Match Highlights',
    communityEngagement: 'Community Engagement',
    comprehensiveSchedule: 'Comprehensive Schedule',
    competitionCoverage: 'Competition Coverage',
    unlimitedAccess: 'Unlimited access to all streams',
    liveMatchChats: 'Participation in live match chats',
    personalizedNotifications: 'Personalized match notifications',
    favoriteTeamTracking: 'Favorite team tracking',
    questionsOrFeedback: 'Have questions, suggestions, or feedback? We\'d love to hear from you!',
    createFreeAccount: 'Create a free account to get the most out of kikasports. Registered users enjoy:',
    catchUpOnHighlights: 'Catch up on the latest goals, key moments, and action from recent games.',
    joinDiscussions: 'Join discussions with fellow fans during matches through our live chat.',
    detailedCalendar: 'Never miss a match with our detailed calendar of upcoming fixtures.',
    majorLeagues: 'Follow all major leagues, cups, and international tournaments.',

    // Match Card additional translations
    venue: 'Venue',

    // Voting translations
    voteForWinner: 'Vote for Winner',
    homeWin: 'Home Win',
    awayWin: 'Away Win',
    draw: 'Draw',
    submitVote: 'Submit Vote',
    alreadyVoted: 'You have already voted',
    failedToSubmitVote: 'Failed to submit vote, please try again',

    // Streaming page translations
    streamingSources: 'Streaming Sources',
    noStreamsAvailable: 'No streams available',
    loadingStream: 'Loading stream...',
    selectQuality: 'Select Quality',
    fullscreen: 'Fullscreen',

    // About page translations
    features: 'Features',
    liveFootballStreaming: 'Live Football Streaming',
    freeAccess: 'Free Access',
    multipleLanguages: 'Multiple Languages',
    mobileOptimized: 'Mobile Optimized',

    // FAQ translations
    frequentlyAskedQuestions: 'Frequently Asked Questions',

    // General UI translations
    loading: 'Loading...',
    loadingMatch: 'Loading match...',
    error: 'Error',
    retry: 'Retry',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    share: 'Share',
    copy: 'Copy',
    copied: 'Copied!',

    // Time/Date translations
    today: 'Today',
    tomorrow: 'Tomorrow',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    nextWeek: 'Next Week',

    // Competition types
    league: 'League',
    cup: 'Cup',
    tournament: 'Tournament',
    friendly: 'Friendly',

    // All Matches section
    allMatches: 'All Matches',
    noMatchesAvailable: 'No matches available',

    // Hot matches
    hotMatches: 'Hot Matches',

    // Latest news
    latestNews: 'Latest News',

    // Stream quality
    hd: 'HD',
    sd: 'SD',
    auto: 'Auto',

    // Additional FAQ translations
    coverageQuestion: 'Which leagues and competitions do you cover?',
    coverageAnswer: 'We provide streaming coverage for all major football competitions including Premier League, Champions League, Europa League, La Liga, Serie A, Bundesliga, Ligue 1, and international tournaments like World Cup and European Championships.',
  },
  es: {
    home: 'Inicio',
    liveMatches: 'Partidos en Vivo',
    liveScores: 'Marcadores en Vivo',
    schedule: 'Calendario',
    competitions: 'Competiciones',
    about: 'Acerca de',
    watch: 'Ver',
    watchLive: 'Ver en Vivo',
    matchDetails: 'Detalles del Partido',
    live: 'EN VIVO',
    finished: 'FT',
    halftime: 'MT',
    moreStreams: 'Más Transmisiones',
    moreInfo: 'Más Información',
    aboutUs: 'Acerca de Nosotros',
    privacyPolicy: 'Política de Privacidad',
    disclaimer: 'Descargo de Responsabilidad',
    faq: 'Preguntas Frecuentes',
    contactUs: 'Contáctanos',
    termsOfService: 'Términos de Servicio',
    navigation: 'Navegación',
    support: 'Soporte',
    connect: 'Conectar',
    allRightsReserved: 'Todos los derechos reservados',
    siteDisclaimer: 'Este sitio no almacena archivos en su servidor. Todo el contenido es proporcionado por terceros no afiliados.',
    noFilesStored: 'Este sitio no almacena archivos en su servidor. Todo el contenido es proporcionado por terceros no afiliados.',
    yourTimezone: 'Tu zona horaria',
    currentTimezone: 'Zona horaria actual',
    timezone: 'Zona horaria',
    liveFootball: 'Transmisión de Fútbol en Vivo',
    footballStreaming: '¡La transmisión de fútbol en vivo en HD está aquí! KikaSports ofrece televisión de fútbol gratis en vivo, partidos de fútbol de hoy en vivo y transmisión de fútbol en línea 24/7.',
    highlights: 'Destacados',
    contact: 'Contacto',
    // Match Card translations
    vs: 'vs',
    homeTeam: 'Local',
    away: 'Visitante',
    // About section translations
    ourMission: 'Nuestra Misión',
    whatWeOffer: 'Lo Que Ofrecemos',
    joinOurCommunity: 'Únete a Nuestra Comunidad',
    registerNow: 'Registrarse Ahora',
    // Features
    hdQualityStreams: 'Transmisiones de Calidad HD',
    fastReliable: 'Rápido y Confiable',
    userFriendlyInterface: 'Interfaz Fácil de Usar',
    liveStreamsDesc: 'Mira transmisiones de alta calidad de partidos de fútbol de todo el mundo.',
    fastReliableDesc: 'Nuestra infraestructura de transmisión está optimizada para velocidad y confiabilidad, asegurando reproducción fluida durante horas pico.',
    userFriendlyDesc: 'Interfaz intuitiva que hace que encontrar y ver partidos sea fácil con navegación sencilla y acceso rápido.',
    // General content
    enjoyHdStreams: 'Disfruta de transmisiones de calidad HD con mínimo buffering y excelente calidad de audio para la mejor experiencia de visualización.',
    comprehensiveCoverage: 'Cobertura Integral',
    easyNavigation: 'Navegación Fácil',
    neverMissAMatch: 'Nunca Te Pierdas un Partido',
    aboutFootballCompetitions: 'Acerca de las Competiciones de Fútbol',
    experienceExcitement: 'Experimenta la emoción del fútbol de clase mundial con cobertura de transmisión en vivo de las principales competiciones.',
    followFavoriteTeams: 'Sigue a tus equipos favoritos durante toda la temporada y nunca te pierdas un partido crucial con nuestra plataforma de transmisión confiable.',
    readyToWatch: '¿Listo para ver?',
    checkTodayMatches: 'Echa un vistazo a los partidos en vivo de hoy',
    viewUpcomingSchedule: 'ver el próximo calendario',
    // FAQ content
    howToWatch: '¿Cómo puedo ver partidos de fútbol en vivo?',
    howToWatchAnswer: 'Simplemente navega por nuestra página de inicio o sección de partidos en vivo para encontrar juegos en curso. Haz clic en cualquier partido para acceder a múltiples fuentes de transmisión y disfrutar de acción de fútbol en vivo de alta calidad.',
    isFree: '¿Es gratis el servicio de transmisión?',
    isFreeAnswer: 'Sí, nuestro servicio básico de transmisión es completamente gratuito. Puedes ver partidos en vivo, ver horarios y acceder a información de partidos sin ninguna tarifa de suscripción.',
    whatDevices: '¿Qué dispositivos puedo usar para ver partidos?',
    whatDevicesAnswer: 'Nuestra plataforma es compatible con todos los dispositivos incluyendo computadoras de escritorio, laptops, tablets y smartphones. Tenemos diseño responsivo que se adapta a cualquier tamaño de pantalla.',
    whyBuffering: '¿Por qué mi transmisión está en buffering o con retraso?',
    whyBufferingAnswer: 'El buffering puede ser causado por conexión lenta a internet o alta carga del servidor. Intenta cambiar a una fuente de transmisión diferente, bajar la calidad, o verificar la velocidad de tu conexión a internet.',
    howToFind: '¿Cómo encuentro partidos específicos o equipos?',
    howToFindAnswer: 'Usa nuestra página de calendario para navegar partidos por fecha y competición. Puedes filtrar por ligas específicas o usar la funcionalidad de búsqueda para encontrar tus equipos favoritos.',
    areStreamsSafe: '¿Es seguro ver las transmisiones?',
    // Schedule page
    fixtureList: 'Nuestra lista de partidos cubre todas las principales competiciones de fútbol incluyendo ligas domésticas, torneos internacionales, competiciones de copa y partidos amistosos de todo el mundo.',
    filterMatches: 'Filtra partidos por competición, ve partidos por fecha y accede a información detallada de partidos. Encuentra exactamente lo que buscas con nuestra interfaz fácil de usar.',
    // Common actions
    or: 'o',
    and: 'y',
    // Mission content
    missionContent: 'KikaSports se dedica a acercar a los fanáticos del fútbol al juego que aman. Proporcionamos transmisiones en vivo de alta calidad, cobertura integral y una plataforma comunitaria para que los fanáticos de todo el mundo disfruten de partidos de las principales ligas y competiciones.',
    goalContent: 'Nuestro objetivo es crear la experiencia de visualización de fútbol definitiva que sea accesible, confiable y centrada en la comunidad. Creemos que todo fanático merece acceso para ver a sus equipos y jugadores favoritos competir al más alto nivel.',
    liveStreamsFeature: 'Transmisiones en Vivo',
    matchHighlights: 'Destacados de Partidos',
    communityEngagement: 'Participación Comunitaria',
    comprehensiveSchedule: 'Calendario Integral',
    competitionCoverage: 'Cobertura de Competiciones',
    unlimitedAccess: 'Acceso ilimitado a todas las transmisiones',
    liveMatchChats: 'Participación en chats de partidos en vivo',
    personalizedNotifications: 'Notificaciones personalizadas de partidos',
    favoriteTeamTracking: 'Seguimiento de equipos favoritos',
    questionsOrFeedback: '¿Tienes preguntas, sugerencias o comentarios? ¡Nos encantaría saber de ti!',
    createFreeAccount: 'Crea una cuenta gratuita para aprovechar al máximo kikasports. Los usuarios registrados disfrutan de:',
    catchUpOnHighlights: 'Ponte al día con los últimos goles, momentos clave y acción de juegos recientes.',
    joinDiscussions: 'Únete a discusiones con otros fanáticos durante los partidos a través de nuestro chat en vivo.',
    detailedCalendar: 'Nunca te pierdas un partido con nuestro calendario detallado de próximos partidos.',
    majorLeagues: 'Sigue todas las principales ligas, copas y torneos internacionales.',

    // Match Card additional translations
    venue: 'Estadio',

    // Voting translations
    voteForWinner: 'Vota por el Ganador',
    homeWin: 'Victoria Local',
    awayWin: 'Victoria Visitante',
    draw: 'Empate',
    submitVote: 'Enviar Voto',
    alreadyVoted: 'Ya has votado',
    failedToSubmitVote: 'Error al enviar el voto, intenta de nuevo',

    // Streaming page translations
    streamingSources: 'Fuentes de Transmisión',
    noStreamsAvailable: 'No hay transmisiones disponibles',
    loadingStream: 'Cargando transmisión...',
    selectQuality: 'Seleccionar Calidad',
    fullscreen: 'Pantalla Completa',

    // About page translations
    features: 'Características',
    liveFootballStreaming: 'Transmisión de Fútbol en Vivo',
    freeAccess: 'Acceso Gratuito',
    multipleLanguages: 'Múltiples Idiomas',
    mobileOptimized: 'Optimizado para Móviles',

    // FAQ translations
    frequentlyAskedQuestions: 'Preguntas Frecuentes',

    // General UI translations
    loading: 'Cargando...',
    loadingMatch: 'Cargando partido...',
    error: 'Error',
    retry: 'Reintentar',
    close: 'Cerrar',
    back: 'Atrás',
    next: 'Siguiente',
    previous: 'Anterior',
    share: 'Compartir',
    copy: 'Copiar',
    copied: '¡Copiado!',

    // Time/Date translations
    today: 'Hoy',
    tomorrow: 'Mañana',
    yesterday: 'Ayer',
    thisWeek: 'Esta Semana',
    nextWeek: 'Próxima Semana',

    // Competition types
    league: 'Liga',
    cup: 'Copa',
    tournament: 'Torneo',
    friendly: 'Amistoso',

    // All Matches section
    allMatches: 'Todos los Partidos',
    noMatchesAvailable: 'No hay partidos disponibles',

    // Hot matches
    hotMatches: 'Partidos Destacados',

    // Latest news
    latestNews: 'Últimas Noticias',

    // Stream quality
    hd: 'HD',
    sd: 'SD',
    auto: 'Auto',

    // Additional FAQ translations
    coverageQuestion: '¿Qué ligas y competiciones cubren?',
    coverageAnswer: 'Proporcionamos cobertura de transmisión para todas las principales competiciones de fútbol incluyendo Premier League, Champions League, Europa League, La Liga, Serie A, Bundesliga, Ligue 1, y torneos internacionales como la Copa del Mundo y Campeonatos Europeos.',
  },
  ar: {
    home: 'الرئيسية',
    liveMatches: 'المباريات المباشرة',
    liveScores: 'النتائج المباشرة',
    schedule: 'الجدول',
    competitions: 'البطولات',
    about: 'حول',
    watch: 'مشاهدة',
    watchLive: 'مشاهدة مباشرة',
    matchDetails: 'تفاصيل المباراة',
    live: 'مباشر',
    finished: 'انتهت',
    halftime: 'شوط أول',
    moreStreams: 'المزيد من البث',
    moreInfo: 'المزيد من المعلومات',
    aboutUs: 'من نحن',
    privacyPolicy: 'سياسة الخصوصية',
    disclaimer: 'إخلاء المسؤولية',
    faq: 'الأسئلة الشائعة',
    contactUs: 'اتصل بنا',
    termsOfService: 'شروط الخدمة',
    navigation: 'التنقل',
    support: 'الدعم',
    connect: 'تواصل',
    allRightsReserved: 'جميع الحقوق محفوظة',
    siteDisclaimer: 'هذا الموقع لا يخزن أي ملفات على خادمه. جميع المحتويات مقدمة من أطراف ثالثة غير تابعة.',
    noFilesStored: 'هذا الموقع لا يخزن أي ملفات على خادمه. جميع المحتويات مقدمة من أطراف ثالثة غير تابعة.',
    yourTimezone: 'منطقتك الزمنية',
    currentTimezone: 'المنطقة الزمنية الحالية',
    timezone: 'المنطقة الزمنية',
    liveFootball: 'بث كرة القدم المباشر',
    footballStreaming: 'بث كرة القدم المباشر بجودة عالية هنا! كيكا سبورتس يقدم تلفزيون كرة القدم المجاني المباشر، مباراة كرة القدم اليوم مباشرة، وبث كرة القدم عبر الإنترنت على مدار الساعة.',
    highlights: 'المقاطع المميزة',
    contact: 'اتصل بنا',
    // Match Card translations
    vs: 'ضد',
    homeTeam: 'المضيف',
    away: 'الضيف',
    // About section translations
    ourMission: 'مهمتنا',
    whatWeOffer: 'ما نقدمه',
    joinOurCommunity: 'انضم إلى مجتمعنا',
    registerNow: 'سجل الآن',
    // Features
    hdQualityStreams: 'بث عالي الجودة',
    fastReliable: 'سريع وموثوق',
    userFriendlyInterface: 'واجهة سهلة الاستخدام',
    liveStreamsDesc: 'شاهد بث عالي الجودة لمباريات كرة القدم من حول العالم.',
    fastReliableDesc: 'بنيتنا التحتية للبث محسّنة للسرعة والموثوقية، مما يضمن تشغيل سلس خلال أوقات الذروة.',
    userFriendlyDesc: 'واجهة بديهية تجعل العثور على المباريات ومشاهدتها أمرًا سهلاً مع التنقل السهل والوصول السريع.',
    // General content
    enjoyHdStreams: 'استمتع ببث عالي الجودة مع الحد الأدنى من التخزين المؤقت وجودة صوت ممتازة لأفضل تجربة مشاهدة.',
    comprehensiveCoverage: 'تغطية شاملة',
    easyNavigation: 'تنقل سهل',
    neverMissAMatch: 'لا تفوت أي مباراة',
    aboutFootballCompetitions: 'حول مسابقات كرة القدم',
    experienceExcitement: 'استمتع بإثارة كرة القدم عالمية المستوى مع تغطية البث المباشر للمسابقات الكبرى.',
    followFavoriteTeams: 'تابع فرقك المفضلة طوال الموسم ولا تفوت أي مباراة مهمة مع منصة البث الموثوقة لدينا.',
    readyToWatch: 'جاهز للمشاهدة؟',
    checkTodayMatches: 'اطلع على مباريات اليوم المباشرة',
    viewUpcomingSchedule: 'اعرض الجدول القادم',
    // FAQ content
    howToWatch: 'كيف يمكنني مشاهدة مباريات كرة القدم المباشرة؟',
    howToWatchAnswer: 'ببساطة تصفح صفحتنا الرئيسية أو قسم المباريات المباشرة للعثور على الألعاب الجارية. انقر على أي مباراة للوصول إلى مصادر بث متعددة والاستمتاع بحركة كرة القدم المباشرة عالية الجودة.',
    isFree: 'هل خدمة البث مجانية؟',
    isFreeAnswer: 'نعم، خدمة البث الأساسية لدينا مجانية تمامًا. يمكنك مشاهدة المباريات المباشرة وعرض الجداول والوصول إلى معلومات المباريات بدون أي رسوم اشتراك.',
    whatDevices: 'ما هي الأجهزة التي يمكنني استخدامها لمشاهدة المباريات؟',
    whatDevicesAnswer: 'منصتنا متوافقة مع جميع الأجهزة بما في ذلك أجهزة الكمبيوتر المكتبية والمحمولة والأجهزة اللوحية والهواتف الذكية. لدينا تصميم متجاوب يتكيف مع أي حجم شاشة.',
    whyBuffering: 'لماذا يتم تخزين البث مؤقتًا أو يتأخر؟',
    whyBufferingAnswer: 'يمكن أن يحدث التخزين المؤقت بسبب اتصال إنترنت بطيء أو حمل خادم عالي. جرب التبديل إلى مصدر بث مختلف، أو خفض الجودة، أو فحص سرعة اتصال الإنترنت.',
    howToFind: 'كيف أجد مباريات أو فرق معينة؟',
    howToFindAnswer: 'استخدم صفحة الجدول لتصفح المباريات حسب التاريخ والمسابقة. يمكنك تصفية حسب الدوريات المحددة أو استخدام وظيفة البحث للعثور على فرقك المفضلة.',
    areStreamsSafe: 'هل البث آمن للمشاهدة؟',
    // Schedule page
    fixtureList: 'قائمة مبارياتنا تغطي جميع مسابقات كرة القدم الرئيسية بما في ذلك الدوريات المحلية والبطولات الدولية ومسابقات الكؤوس والمباريات الودية من جميع أنحاء العالم.',
    filterMatches: 'رشح المباريات حسب المسابقة، اعرض المباريات حسب التاريخ، واحصل على معلومات مفصلة عن المباريات. اعثر بالضبط على ما تبحث عنه مع واجهتنا سهلة الاستخدام.',
    // Common actions
    or: 'أو',
    and: 'و',
    // Mission content
    missionContent: 'كيكا سبورتس مكرسة لتقريب عشاق كرة القدم من اللعبة التي يحبونها. نحن نقدم بث مباشر عالي الجودة وتغطية شاملة ومنصة مجتمعية للمشجعين من جميع أنحاء العالم للاستمتاع بالمباريات من الدوريات والمسابقات الكبرى.',
    goalContent: 'هدفنا هو إنشاء تجربة مشاهدة كرة القدم المثلى التي تكون متاحة وموثوقة ومتمحورة حول المجتمع. نحن نؤمن أن كل مشجع يستحق الوصول لمشاهدة فرقه ولاعبيه المفضلين يتنافسون في أعلى مستوى.',
    liveStreamsFeature: 'البث المباشر',
    matchHighlights: 'أبرز المباريات',
    communityEngagement: 'المشاركة المجتمعية',
    comprehensiveSchedule: 'جدول شامل',
    competitionCoverage: 'تغطية المسابقات',
    unlimitedAccess: 'وصول غير محدود لجميع البث',
    liveMatchChats: 'المشاركة في محادثات المباريات المباشرة',
    personalizedNotifications: 'إشعارات مخصصة للمباريات',
    favoriteTeamTracking: 'تتبع الفرق المفضلة',
    questionsOrFeedback: 'هل لديك أسئلة أو اقتراحات أو تعليقات؟ نحن نحب أن نسمع منك!',
    createFreeAccount: 'أنشئ حساب مجاني للاستفادة القصوى من كيكا سبورتس. المستخدمون المسجلون يستمتعون بـ:',
    catchUpOnHighlights: 'تابع آخر الأهداف واللحظات الرئيسية والحركة من الألعاب الأخيرة.',
    joinDiscussions: 'انضم إلى المناقشات مع المشجعين الآخرين خلال المباريات من خلال محادثتنا المباشرة.',
    detailedCalendar: 'لا تفوت مباراة مع تقويمنا المفصل للمباريات القادمة.',
    majorLeagues: 'تابع جميع الدوريات الكبرى والكؤوس والبطولات الدولية.',

    // Match Card additional translations
    venue: 'الملعب',

    // Voting translations
    voteForWinner: 'صوت للفائز',
    homeWin: 'فوز المضيف',
    awayWin: 'فوز الضيف',
    draw: 'تعادل',
    submitVote: 'إرسال التصويت',
    alreadyVoted: 'لقد صوتت بالفعل',
    failedToSubmitVote: 'فشل في إرسال التصويت، حاول مرة أخرى',

    // Streaming page translations
    streamingSources: 'مصادر البث',
    noStreamsAvailable: 'لا توجد بث متاح',
    loadingStream: 'تحميل البث...',
    selectQuality: 'اختر الجودة',
    fullscreen: 'ملء الشاشة',

    // About page translations
    features: 'الميزات',
    liveFootballStreaming: 'بث كرة القدم المباشر',
    freeAccess: 'وصول مجاني',
    multipleLanguages: 'لغات متعددة',
    mobileOptimized: 'محسن للهاتف المحمول',

    // FAQ translations
    frequentlyAskedQuestions: 'الأسئلة الشائعة',

    // General UI translations
    loading: 'تحميل...',
    loadingMatch: 'تحميل المباراة...',
    error: 'خطأ',
    retry: 'إعادة المحاولة',
    close: 'إغلاق',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    share: 'مشاركة',
    copy: 'نسخ',
    copied: 'تم النسخ!',

    // Time/Date translations
    today: 'اليوم',
    tomorrow: 'غداً',
    yesterday: 'أمس',
    thisWeek: 'هذا الأسبوع',
    nextWeek: 'الأسبوع القادم',

    // Competition types
    league: 'دوري',
    cup: 'كأس',
    tournament: 'بطولة',
    friendly: 'ودية',

    // All Matches section
    allMatches: 'جميع المباريات',
    noMatchesAvailable: 'لا توجد مباريات متاحة',

    // Hot matches
    hotMatches: 'المباريات المميزة',

    // Latest news
    latestNews: 'آخر الأخبار',

    // Stream quality
    hd: 'عالي الجودة',
    sd: 'جودة عادية',
    auto: 'تلقائي',
  },
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;