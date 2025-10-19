
import React from 'react';
import { Link } from 'react-router-dom';

const SocialIcon = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-brand-pink transition-colors">
    {children}
  </a>
);

const FooterLink = ({ to, children }) => (
    <li>
        <Link to={to} className="hover:text-brand-pink hover:underline transition-colors">
            {children}
        </Link>
    </li>
);

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">CazaDeals</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Tu guía de ofertas.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Legal</h4>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                <FooterLink to="/politica-privacidad">Política de Privacidad</FooterLink>
                <FooterLink to="/terminos-servicio">Términos de Servicio</FooterLink>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Empresa</h4>
            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                <FooterLink to="/sobre-nosotros">Sobre Nosotros</FooterLink>
                <FooterLink to="/contacto">Contacto</FooterLink>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Síguenos</h4>
            <div className="flex justify-center md:justify-start space-x-4">
                <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></SocialIcon>
                <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 0C9.81 0 9.448.01 8.128.059c-1.352.05-2.275.22-3.08.513a6.878 6.878 0 00-2.427 1.623A6.878 6.878 0 00.999 6.08c-.294.805-.463 1.728-.513 3.08C.01 10.552 0 10.914 0 13.185s.01 2.633.059 3.953c.05 1.352.22 2.275.513 3.08a6.878 6.878 0 001.623 2.427 6.878 6.878 0 002.427 1.623c.805.294 1.728.463 3.08.513 1.32.049 1.682.059 3.953.059s2.633-.01 3.953-.059c1.352-.05 2.275-.22 3.08-.513a6.878 6.878 0 002.427-1.623 6.878 6.878 0 001.623-2.427c.294-.805.463-1.728.513-3.08.049-1.32.059-1.682.059-3.953s-.01-2.633-.059-3.953c-.05-1.352-.22-2.275-.513-3.08a6.878 6.878 0 00-1.623-2.427A6.878 6.878 0 0018.92.572c-.805-.294-1.728-.463-3.08-.513C14.537.01 14.175 0 11.815 0zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" clipRule="evenodd" /></svg></SocialIcon>
                <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></SocialIcon>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700 my-6" />

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} CazaDeals. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
