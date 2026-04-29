import { Link } from 'react-router-dom';
import Shell from '../components/Shell.jsx';
import { NAV_SECTIONS } from '../lib/navigation.js';

export default function Menu() {
  return (
    <Shell>
      <div className="flex-1 flex flex-col pt-8 gap-8">
        <div className="v2-panel">
          <p className="v2-panel-label mb-3">Mapa</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Des d’aquí pots anar a qualsevol pantalla d’Arrel.
          </p>
          <Link to="/app" className="inline-flex mt-4 text-sm text-[var(--text-primary)] underline">
            Obrir la prova d’avui
          </Link>
        </div>

        {NAV_SECTIONS.map((section) => (
          <section key={section.title} className="v2-panel">
            <p className="v2-panel-label mb-2">{section.title}</p>
            <ul className="flex flex-col">
              {section.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="block py-4 border-b border-[var(--border-subtle)] last:border-b-0 hover:text-[var(--text-secondary)] transition"
                  >
                    <span className="block text-lg text-[var(--text-primary)]">{item.label}</span>
                    <span className="block mt-1 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Shell>
  );
}
