import { ChevronLeft, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Shell({ children, showMenu = false, showBack = false, backTo = '/' }) {
  return (
    <div className="min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)] flex flex-col">
      <header className="w-full max-w-[var(--app-max-width)] mx-auto px-6 pt-6 flex items-center justify-between min-h-[4rem]">
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
        <span className="text-[0.72rem] uppercase tracking-[0.32em] text-[var(--text-tertiary)]">
          Arrel
        </span>
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
      <main className="flex-1 w-full max-w-[var(--app-max-width)] mx-auto px-6 pb-12 flex flex-col">
        {children}
      </main>
    </div>
  );
}
