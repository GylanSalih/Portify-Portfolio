import { DarkModeProvider } from './contexts/DarkModeContext';
import ClientLayout from './components/ClientLayout/ClientLayout';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './fonts/fonts.css';
import './styles/globals.css';

export const metadata = {
  title: 'Portify - Portfolio & Blog',
  description:
    'Professional portfolio and blog showcasing modern development skills',
  keywords: 'portfolio, blog, development, web design, coding',
  authors: [{ name: 'Portify' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Portify - Portfolio & Blog',
    description:
      'Professional portfolio and blog showcasing modern development skills',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedMode = localStorage.getItem('darkMode');
                  const darkMode = savedMode ? savedMode === 'true' : true;
                  if (darkMode) {
                    document.documentElement.classList.add('dark-mode');
                  }
                  
                  // Aggressive removal of browser extension attributes
                  const removeExtensionAttrs = () => {
                    const elements = document.querySelectorAll('[bis_skin_checked]');
                    elements.forEach(el => el.removeAttribute('bis_skin_checked'));
                  };
                  
                  // Run multiple times to catch all instances
                  removeExtensionAttrs();
                  setTimeout(removeExtensionAttrs, 0);
                  setTimeout(removeExtensionAttrs, 100);
                  
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', removeExtensionAttrs);
                  }
                  
                  // Observer to catch dynamically added attributes - WITH CLEANUP
                  if (window.MutationObserver) {
                    const observer = new MutationObserver(function(mutations) {
                      mutations.forEach(function(mutation) {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'bis_skin_checked') {
                          mutation.target.removeAttribute('bis_skin_checked');
                        }
                      });
                    });
                    
                    observer.observe(document.body, {
                      attributes: true,
                      subtree: true,
                      attributeFilter: ['bis_skin_checked']
                    });
                    
                    // MEMORY LEAK FIX: Stop observer after 10 seconds
                    setTimeout(() => {
                      observer.disconnect();
                    }, 10000);
                    
                    // MEMORY LEAK FIX: Stop observer on page unload
                    window.addEventListener('beforeunload', () => {
                      observer.disconnect();
                    });
                  }
                } catch (e) {
                  console.warn('Extension attribute removal failed:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <DarkModeProvider>
          <ErrorBoundary>
            <ClientLayout>{children}</ClientLayout>
          </ErrorBoundary>
        </DarkModeProvider>
        <Footer />
      </body>
    </html>
  );
}
