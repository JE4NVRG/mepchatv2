import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-slate-600 dark:text-slate-300">
          © {year} MepChat. Todos os direitos reservados.
        </span>
        <a 
          href="https://github.com/JE4NVRG" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
        >
          <svg 
            viewBox="0 0 24 24" 
            aria-hidden="true" 
            className="h-5 w-5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" 
            fill="currentColor"
          >
            <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.85 3.15 8.96 7.51 10.41.55.1.75-.24.75-.53v-1.86c-3.05.66-3.69-1.3-3.69-1.3-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.66.08-.66 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.72.38-1.2.69-1.48-2.44-.28-5-1.22-5-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.41.11-2.94 0 0 .93-.3 3.05 1.13.88-.24 1.82-.36 2.76-.36.94 0 1.88.12 2.76.36 2.12-1.43 3.05-1.13 3.05-1.13.6 1.53.22 2.66.11 2.94.71.77 1.13 1.75 1.13 2.95 0 4.22-2.57 5.15-5.02 5.42.39.34.73 1 .73 2.02v2.99c0 .29.2.63.76.52 4.35-1.45 7.5-5.56 7.5-10.41C23.02 5.24 18.27.5 12 .5z"/>
          </svg>
          Criado por <strong>JE4NVRG</strong>
        </a>
      </div>
    </footer>
  );
};

export default Footer;