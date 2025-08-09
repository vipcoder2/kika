
export interface Translation {
  [key: string]: string;
}

export const translations: { [locale: string]: Translation } = {
  en: {
    'nav.home': 'Home',
    'nav.live-score': 'Live Score',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.privacy': 'Privacy',
    'nav.disclaimer': 'Disclaimer',
    'match.live': 'LIVE',
    'match.upcoming': 'Upcoming',
    'match.finished': 'FT',
    'match.vs': 'vs',
    'match.watch': 'Watch',
    'match.streams': 'Available Streams',
    'match.prediction': 'Match Prediction',
    'match.votes': 'total votes',
    'match.win': 'Win',
    'match.draw': 'Draw',
    'poll.voted': 'You voted for:',
    'time.days': 'd',
    'time.hours': 'h',
    'time.minutes': 'm',
    'time.seconds': 's',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.live-score': 'Resultados en Vivo',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.privacy': 'Privacidad',
    'nav.disclaimer': 'Descargo',
    'match.live': 'EN VIVO',
    'match.upcoming': 'Próximo',
    'match.finished': 'FIN',
    'match.vs': 'vs',
    'match.watch': 'Ver',
    'match.streams': 'Transmisiones Disponibles',
    'match.prediction': 'Predicción del Partido',
    'match.votes': 'votos totales',
    'match.win': 'Ganar',
    'match.draw': 'Empate',
    'poll.voted': 'Votaste por:',
    'time.days': 'd',
    'time.hours': 'h',
    'time.minutes': 'm',
    'time.seconds': 's',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.live-score': 'النتائج المباشرة',
    'nav.about': 'حول',
    'nav.contact': 'اتصل بنا',
    'nav.privacy': 'الخصوصية',
    'nav.disclaimer': 'إخلاء المسؤولية',
    'match.live': 'مباشر',
    'match.upcoming': 'قادم',
    'match.finished': 'انتهى',
    'match.vs': 'ضد',
    'match.watch': 'مشاهدة',
    'match.streams': 'البث المتاح',
    'match.prediction': 'توقع المباراة',
    'match.votes': 'إجمالي الأصوات',
    'match.win': 'فوز',
    'match.draw': 'تعادل',
    'poll.voted': 'صوت لـ:',
    'time.days': 'ي',
    'time.hours': 'س',
    'time.minutes': 'د',
    'time.seconds': 'ث',
  },
};

export function getSystemLanguage(): string {
  const language = navigator.language.split('-')[0];
  return translations[language] ? language : 'en';
}

export function useTranslation(locale: string = 'en') {
  const t = (key: string): string => {
    return translations[locale]?.[key] || translations.en[key] || key;
  };

  return { t };
}
