import { DarkModeProvider } from './contexts/DarkModeContext';
import ClientLayout from './components/ClientLayout/ClientLayout';
import Footer from './components/Footer/Footer';
import ErrorBoundaryWrapper from './components/ErrorBoundary/ErrorBoundaryWrapper';
import DarkModeScript from './components/DarkModeScript/DarkModeScript';
import './fonts/fonts.css';
import './styles/globals.css';

export const metadata = {
  title: 'Portify - Portfolio & Blog',
  description:
    'Professional portfolio and blog showcasing modern development skills',
  keywords: 'portfolio, blog, development, web design, coding',
  authors: [{ name: 'Portify' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Portify - Portfolio & Blog',
    description:
      'Professional portfolio and blog showcasing modern development skills',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" suppressHydrationWarning={true} data-scroll-behavior="smooth">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning={true}>
        <DarkModeScript />
        <DarkModeProvider>
          <ErrorBoundaryWrapper>
            <ClientLayout>{children}</ClientLayout>
          </ErrorBoundaryWrapper>
        </DarkModeProvider>
        <Footer />
      </body>
    </html>
  );
}
