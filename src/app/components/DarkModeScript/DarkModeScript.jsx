'use client';

import { useEffect } from 'react';

export default function DarkModeScript() {
  useEffect(() => {
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
        const startObserver = () => {
          if (!document.body) return;
          
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
        };
        
        if (document.body) {
          startObserver();
        } else {
          document.addEventListener('DOMContentLoaded', startObserver);
        }
      }
    } catch (error) {
      console.error('Error in DarkModeScript:', error);
    }
  }, []);

  return null;
}
