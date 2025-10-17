
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
    <footer className="bg-white border-t border-border-color text-text-secondary">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          
          <div className="space-y-3 pr-4">
            <h3 className="text-lg font-bold text-brand-pink">CazaDeals</h3>
            <p>
              Tu destino número uno para encontrar las mejores ofertas y códigos de descuento. ¡Ahorra en grande con CazaDeals!
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-text-primary">Enlaces Rápidos</h4>
            <ul className="space-y-2">
                <FooterLink to="/">Inicio</FooterLink>
                <FooterLink to="/tiendas">Tiendas</FooterLink>
                <FooterLink to="/categorias">Categorías</FooterLink>
                <FooterLink to="/blog">Blog</FooterLink>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-text-primary">Soporte</h4>
            <ul className="space-y-2">
                <FooterLink to="/faq">Preguntas Frecuentes</FooterLink>
                <FooterLink to="/contacto">Contacto</FooterLink>
                <FooterLink to="/politica-privacidad">Política de Privacidad</FooterLink>
                <FooterLink to="/terminos-servicio">Términos de Servicio</FooterLink>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-text-primary">Síguenos</h4>
            <div className="flex space-x-4">
                <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.693.86 3.193 2.16 4.068-.796-.025-1.555-.245-2.21-.608v.065c0 2.368 1.688 4.34 3.92 4.795-.41.111-.843.17-1.28.17-.315 0-.622-.03-.92-.086.621 1.935 2.425 3.34 4.568 3.38-1.675 1.31-3.793 2.09-6.09 2.09-.396 0-.788-.023-1.175-.068 2.16 1.39 4.735 2.205 7.548 2.205 9.058 0 14.01-7.503 14.01-14.01 0-.213-.005-.426-.015-.637.96-.695 1.797-1.562 2.457-2.54z"></path></svg></SocialIcon>
                <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266.058 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689-.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"></path></svg></SocialIcon>
                <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59h-3.045v-9.068h-1.986v-3.51h1.986v-2.19c0-2.022 1.056-3.31 3.31-3.31h2.464v3.51h-1.985c-.833 0-1.018.523-1.018 1.018v1.04h3.045l-.47 3.51h-2.575v9.068z"></path></svg></SocialIcon>
            </div>
          </div>
        </div>

        <hr className="border-border-color my-8" />

        <div className="text-center text-xs text-text-secondary">
          &copy; {new Date().getFullYear()} CazaDeals. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
