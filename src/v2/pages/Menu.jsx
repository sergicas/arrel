import { Link } from 'react-router-dom';
import Shell from '../components/Shell.jsx';

const ITEMS = [
  { to: '/menu/cicles', label: 'Cicles passats' },
  { to: '/menu/arees', label: 'Les cinc àrees' },
  { to: '/menu/sobre', label: 'Sobre arrel' },
];

export default function Menu() {
  return (
    <Shell showBack backTo="/">
      <div className="flex-1 flex flex-col pt-8">
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
