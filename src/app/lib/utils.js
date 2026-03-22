// Formatierung und Validierung
export const formatDate = date => {
  if (!date) return '';

  const d = new Date(date);
  return d.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// CSS Klassen
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Debounce Funktion
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle Funktion
export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Local Storage Helper
export const storage = {
  get: key => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove: key => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};

// Scroll Helper
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const scrollToElement = elementId => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Fisher-Yates shuffle — used by BlogPost and PortfolioPost
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Blog Helper Functions
export const calculateReadTime = (content, wordsPerMinute = 200) => {
  if (!content) return '1 min';

  // Wenn content ein Array von Objekten ist (wie in blogpost.json)
  if (Array.isArray(content)) {
    const allText = content.map(item => item.content || '').join(' ');
    return calculateReadTimeFromText(allText, wordsPerMinute);
  }

  // Wenn content ein String ist
  if (typeof content === 'string') {
    return calculateReadTimeFromText(content, wordsPerMinute);
  }

  return '1 min';
};

const calculateReadTimeFromText = (text, wordsPerMinute = 200) => {
  if (!text) return '1 min';

  // HTML-Tags entfernen und nur Text extrahieren
  const cleanText = text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Wörter zählen
  const wordCount = cleanText.split(/\s+/).length;

  // Lesezeit berechnen
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Formatierung
  if (minutes === 1) return '1 min';
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}min`;
};

export const formatReadTime = minutes => {
  if (minutes < 1) return '1 min';
  if (minutes < 60) return `${Math.ceil(minutes)} min`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.ceil(minutes % 60);

  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}min`;
};

// Blog Content Helper Functions
export const generateExcerpt = (content, maxLength = 150) => {
  if (!content) return 'No content available...';

  // Wenn content ein Array von Objekten ist (wie in blogpost.json)
  if (Array.isArray(content)) {
    const allText = content.map(item => item.content || '').join(' ');
    return generateExcerptFromText(allText, maxLength);
  }

  // Wenn content ein String ist
  if (typeof content === 'string') {
    return generateExcerptFromText(content, maxLength);
  }

  return 'No content available...';
};

// Neue Funktion: Kürzt vorhandene Excerpts oder generiert neue
export const processExcerpt = (existingExcerpt, content, maxLength = 150) => {
  // Wenn ein vorhandenes Excerpt existiert, kürze es
  if (existingExcerpt && existingExcerpt.trim()) {
    return generateExcerptFromText(existingExcerpt, maxLength);
  }

  // Ansonsten generiere ein neues aus dem Content
  return generateExcerpt(content, maxLength);
};

const generateExcerptFromText = (text, maxLength = 150) => {
  if (!text) return 'No content available...';

  // HTML-Tags entfernen und nur Text extrahieren
  const cleanText = text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Wenn der Text kürzer ist als maxLength, gib ihn direkt zurück
  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  // Kürze den Text und suche nach dem letzten vollständigen Wort
  let truncated = cleanText.substring(0, maxLength);

  // Finde den letzten Leerzeichen vor der Kürzung
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > 0) {
    // Kürze bis zum letzten vollständigen Wort
    truncated = truncated.substring(0, lastSpaceIndex);
  }

  // Füge "..." hinzu
  return truncated + '...';
};

// Kombinierte Funktion für Blog-Posts (readTime + excerpt)
export const processBlogContent = (content, options = {}) => {
  const { maxExcerptLength = 150, wordsPerMinute = 200 } = options;

  return {
    readTime: calculateReadTime(content, wordsPerMinute),
    excerpt: generateExcerpt(content, maxExcerptLength),
  };
};
