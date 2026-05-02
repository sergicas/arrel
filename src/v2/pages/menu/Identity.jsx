import { Link } from 'react-router-dom';
import { Award, Shield, Target, User, ChevronRight } from 'lucide-react';
import { useArrel } from '../../state/useArrel.js';
import Shell from '../../components/Shell.jsx';

export default function Identity() {
  const { userIdentity } = useArrel();

  if (!userIdentity) {
    return (
      <Shell showBack backTo="/menu">
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 gap-6">
          <div className="w-16 h-16 rounded-full bg-[var(--area-soft)] flex items-center justify-center">
            <User className="text-[var(--area-accent)]" size={32} />
          </div>
          <div>
            <h1 className="text-xl font-bold mb-2">La teva Identitat Arrel</h1>
            <p className="text-[var(--text-secondary)]">Encara és aviat per definir el teu perfil. Continua completant proves per descobrir com Arrel et llegeix.</p>
          </div>
          <Link to="/app" className="btn btn-primary w-full">Començar la prova d’avui</Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell showBack backTo="/menu" className="v2-identity-shell">
      <div className="v2-identity-container p-4 flex flex-col gap-6">
        <header className="v2-identity-header text-center">
          <div className="v2-identity-avatar mx-auto mb-4">
            <User size={48} className="text-[var(--area-accent)]" />
          </div>
          <p className="v2-panel-label mb-1">Perfil Arrel</p>
          <h1 className="text-2xl font-bold">{userIdentity.archetype}</h1>
          <p className="mt-2 text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">
            {userIdentity.description}
          </p>
        </header>

        <section className="v2-identity-stats grid grid-cols-2 gap-3">
          <div className="v2-stat-card p-4 rounded-2xl bg-white border border-gray-100">
            <Target size={18} className="mb-2 text-[var(--area-accent)]" />
            <p className="text-xs text-[var(--text-tertiary)] uppercase font-semibold">Fortalesa</p>
            <p className="text-sm font-bold text-[var(--text-primary)]">{userIdentity.strongestArea}</p>
          </div>
          <div className="v2-stat-card p-4 rounded-2xl bg-white border border-gray-100">
            <Shield size={18} className="mb-2 text-[var(--area-accent)]" />
            <p className="text-xs text-[var(--text-tertiary)] uppercase font-semibold">Resiliència</p>
            <p className="text-sm font-bold text-[var(--text-primary)]">{userIdentity.resilienceLevel}</p>
          </div>
        </section>

        <section className="v2-identity-achievements p-5 rounded-3xl bg-white border border-gray-100 shadow-sm">
          <h2 className="text-sm font-bold mb-4 uppercase text-[var(--text-tertiary)] flex items-center gap-2">
            <Award size={16} /> Fites de creixement
          </h2>
          {userIdentity.milestones.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {userIdentity.milestones.map((milestone, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--area-accent)]" />
                  <span className="text-sm font-medium">{milestone}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--text-tertiary)] italic">Avança en els teus cicles per desbloquejar fites.</p>
          )}
        </section>

        <section className="v2-identity-summary p-5 rounded-3xl bg-[var(--area-soft)] border border-[var(--area-accent)] border-opacity-10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium opacity-70">Proves completades</span>
            <span className="font-bold">{userIdentity.totalProves}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium opacity-70">Cicles transitats</span>
            <span className="font-bold">{userIdentity.totalCycles}</span>
          </div>
        </section>

        <Link to="/menu/cicles" className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 mt-2">
          <div className="flex items-center gap-3">
            <ChevronRight size={18} className="text-[var(--text-tertiary)]" />
            <span className="text-sm font-medium">Veure historial de cicles</span>
          </div>
          <ChevronRight size={16} className="opacity-30" />
        </Link>
      </div>
    </Shell>
  );
}
