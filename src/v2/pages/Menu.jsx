import { Link } from 'react-router-dom';
import Shell from '../components/Shell.jsx';
import { NAV_SECTIONS } from '../lib/navigation.js';
import { STATUS } from '../lib/types.js';
import { useArrel } from '../state/useArrel.js';

function getPrimaryAction(status) {
  if (status === STATUS.NEW) {
    return { to: '/inici', label: 'Triar per on començar' };
  }

  if (status === STATUS.INITIAL_PERIOD_COMPLETE) {
    return { to: '/app', label: 'Veure opcions per continuar' };
  }

  return { to: '/app', label: 'Obrir la prova d’avui' };
}

export default function Menu() {
  const { state } = useArrel();
  const primaryAction = getPrimaryAction(state.status);

  return (
    <Shell>
      <div className="flex-1 flex flex-col pt-8 gap-8">
        <div className="v2-panel">
          <p className="v2-panel-label mb-3">Mapa</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Des d’aquí pots anar a qualsevol pantalla d’Arrel.
          </p>
          <Link to={primaryAction.to} className="inline-flex mt-4 text-sm text-[var(--text-primary)] underline">
            {primaryAction.label}
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
