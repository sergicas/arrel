import { Link } from 'react-router-dom';
import Shell from '../components/Shell.jsx';

const ITEMS = [
  { to: '/menu/cicles', label: 'Històric' },
  { to: '/menu/arees', label: 'Les cinc capacitats' },
  { to: '/menu/ritme', label: 'Ritme de proves' },
  { to: '/menu/recordatori', label: 'Recordatori diari' },
  { to: '/diagnostic', label: 'Personalitzar focus' },
  { to: '/menu/sobre', label: 'Sobre Arrel' },
  { to: '/legal/privacitat', label: 'Privacitat i termes' },
];

export default function Menu() {
  return (
    <Shell showBack backTo="/app">
      <div className="flex-1 flex flex-col pt-8 gap-8">
        <div className="v2-panel">
          <p className="v2-panel-label mb-3">Menú secundari</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            El centre d&apos;Arrel continua sent la pantalla d&apos;avui. Aquí només hi ha
            context, lectures anteriors i configuració mínima.
          </p>
          <Link to="/app" className="inline-flex mt-4 text-sm text-[var(--text-primary)] underline">
            Tornar a avui
          </Link>
        </div>

        <ul className="flex flex-col">
          {ITEMS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block py-5 text-lg text-[var(--text-primary)] border-b border-[var(--border-subtle)] hover:text-[var(--text-secondary)] transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
