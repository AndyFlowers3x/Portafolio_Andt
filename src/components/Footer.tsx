"use client";

const footerLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#contacto", label: "Contacto" },
];

const socials = [
  {
    href: "https://github.com/AndyFlowers3x",
    label: "GitHub",
    hoverColor: "hover:text-neon-purple",
    icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  {
    href: "https://www.linkedin.com/in/andy-flores-701883312/",
    label: "LinkedIn",
    hoverColor: "hover:text-neon-cyan",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    href: "https://www.instagram.com/xyz_andt",
    label: "Instagram",
    hoverColor: "hover:text-neon-pink",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    href: "mailto:andt4x@outlook.es",
    label: "Email",
    hoverColor: "hover:text-neon-pink",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    isStroke: true,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-color bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <a href="#inicio" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-linear-to-br from-neon-purple to-neon-cyan rounded-sm flex items-center justify-center text-white font-bold text-sm group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow duration-300">
                AF
              </div>
              <span className="text-foreground font-semibold">Andy Flores</span>
            </a>
            <p className="text-foreground/50 text-sm leading-relaxed max-w-xs">
              Ingeniero en Desarrollo de Aplicaciones creando experiencias digitales
              modernas e innovadoras.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground/80 mb-4 uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/50 hover:text-neon-purple transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground/80 mb-4 uppercase tracking-wider">
              Conecta
            </h4>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg border border-border-color bg-surface-light flex items-center justify-center text-foreground/50 ${s.hoverColor} hover:border-transparent transition-all duration-300`}
                  aria-label={s.label}
                >
                  <svg className="w-4 h-4" fill={s.isStroke ? "none" : "currentColor"} stroke={s.isStroke ? "currentColor" : undefined} strokeWidth={s.isStroke ? 1.5 : undefined} viewBox="0 0 24 24">
                    <path d={s.icon} strokeLinecap={s.isStroke ? "round" : undefined} strokeLinejoin={s.isStroke ? "round" : undefined} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border-color py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-foreground/40">
            &copy; {new Date().getFullYear()} Andy Flores. Todos los derechos reservados.
          </span>
          <span className="text-xs text-foreground/30 font-mono">
            Hecho con Next.js, Tailwind CSS & Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
