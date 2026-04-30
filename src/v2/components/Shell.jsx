import { ArrowLeft, Home, LayoutGrid, Target } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ArrelLogo from './ArrelLogo.jsx';

const HEADER_LINKS = [
  { to: '/inici', label: 'Inici', icon: Home },
  { to: '/app', label: 'Avui', icon: Target },
  { to: '/menu', label: 'Mapa', icon: LayoutGrid },
];

export default function Shell({
  children,
  showBack = false,
  backTo = '/menu',
  showMenu = false,
  showChrome = true,
  className = '',
}) {
  const { pathname } = useLocation();
  const shellClassName = [
    'v2-shell min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)] flex flex-col',
    className,
  ].filter(Boolean).join(' ');
  const mainClassName = [
    'v2-shell-frame flex-1 box-border w-full max-w-[var(--app-max-width)] mx-auto px-5 pb-10 flex flex-col relative z-10',
    !showChrome ? 'v2-main-immersive' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={shellClassName}>
      {showChrome ? (
        <header className="v2-shell-frame v2-shell-header box-border w-full max-w-[var(--app-max-width)] mx-auto px-5 pt-5 flex items-center justify-between min-h-[4rem] relative z-10">
          <Link to="/inici" className="v2-brand" aria-label="Anar a la presentació d'Arrel">
            <ArrelLogo className="v2-brand-logo" />
            <span>Arrel</span>
          </Link>
          <nav className="v2-shell-nav" aria-label="Navegació principal">
            {HEADER_LINKS.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.to
                || (item.to === '/menu' && (
                  pathname.startsWith('/menu')
                  || pathname.startsWith('/legal')
                  || pathname.startsWith('/diagnostic')
                ));

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`v2-nav-button ${active ? 'is-active' : ''}`}
                  aria-label={item.label}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </header>
      ) : null}
      <main className={mainClassName}>
        {showChrome && (showBack || showMenu) ? (
          <nav className="v2-shell-secondary-nav" aria-label="Navegació de pantalla">
            {showBack ? (
              <Link to={backTo} className="v2-shell-back">
                <ArrowLeft size={16} />
                <span>Tornar</span>
              </Link>
            ) : null}
            {showMenu && backTo !== '/menu' ? (
              <Link to="/menu" className="v2-shell-back">
                <LayoutGrid size={16} />
                <span>Mapa</span>
              </Link>
            ) : null}
          </nav>
        ) : null}
        {children}
      </main>
    </div>
  );
}
