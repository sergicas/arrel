import { Link } from 'react-router-dom';

export default function Shell({ children, showMenu = false, showBack = false, backTo = '/' }) {
  return (
    <div className="min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)] flex flex-col">
      <header className="w-full max-w-[var(--app-max-width)] mx-auto px-6 pt-6 flex items-center justify-between min-h-[3rem]">
        {showBack ? (
          <Link
            to={backTo}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition text-xl leading-none"
            aria-label="Tornar"
          >
            ←
          </Link>
        ) : (
          <span />
        )}
        {showMenu ? (
          <Link
            to="/menu"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition text-lg leading-none"
            aria-label="Menú"
          >
            ⚙
          </Link>
        ) : (
          <span />
        )}
      </header>
      <main className="flex-1 w-full max-w-[var(--app-max-width)] mx-auto px-6 pb-12 flex flex-col">
        {children}
      </main>
    </div>
  );
}
