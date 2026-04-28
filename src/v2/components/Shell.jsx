import { ChevronLeft, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArrelLogo from './ArrelLogo.jsx';

export default function Shell({
  children,
  showMenu = false,
  showBack = false,
  backTo = '/app',
  showChrome = true,
  className = '',
}) {
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
        <header className="v2-shell-frame box-border w-full max-w-[var(--app-max-width)] mx-auto px-5 pt-5 flex items-center justify-between min-h-[4rem] relative z-10">
          {showBack ? (
            <Link
              to={backTo}
              className="v2-nav-button"
              aria-label="Tornar"
            >
              <ChevronLeft size={18} />
            </Link>
          ) : (
            <span className="w-10" />
          )}
          <Link to="/inici" className="v2-brand" aria-label="Anar a la presentació d'Arrel">
            <ArrelLogo className="v2-brand-logo" />
            <span>Arrel</span>
          </Link>
          {showMenu ? (
            <Link
              to="/menu"
              className="v2-nav-button"
              aria-label="Menú"
            >
              <Menu size={18} />
            </Link>
          ) : (
            <span className="w-10" />
          )}
        </header>
      ) : null}
      <main className={mainClassName}>
        {children}
      </main>
    </div>
  );
}
