import {
  Activity,
  AlarmClockCheck,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  CheckCircle2,
  Compass,
  Dumbbell,
  Footprints,
  Gauge,
  HeartHandshake,
  Leaf,
  Lightbulb,
  PenLine,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Sprout,
  Timer,
  UsersRound,
  Wind,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useArrel } from '../state/useArrel.js';
import { STATUS } from '../lib/types.js';
import ArrelLogo from '../components/ArrelLogo.jsx';
import ArrelMascot from '../components/ArrelMascot.jsx';
import SEO from '../../components/SEO.jsx';

const FEATURES = [
  {
    icon: Activity,
    title: 'Una acció curta cada dia',
    text: 'Arrel et proposa una acció de 3 a 10 minuts. La fas quan puguis i marques com ha anat.',
  },
  {
    icon: Compass,
    title: 'Pots començar sense test',
    text: 'Primer pots provar una acció. Si vols personalitzar l’experiència, després fas una diagnosi de cinc preguntes.',
  },
  {
    icon: Timer,
    title: 'Funciona per setmanes',
    text: 'Cada cicle té sis dies d’acció i un dia per revisar què has fet abans de continuar.',
  },
];

const APP_MOCKUPS = [
  {
    preview: 'quiz',
    icon: PenLine,
    title: 'Diagnosi lleugera',
    text: 'Cinc preguntes quan vulguis personalitzar el focus.',
  },
  {
    preview: 'action',
    icon: AlarmClockCheck,
    title: 'Accions concretes',
    text: 'Tasques curtes amb un check-in senzill.',
  },
  {
    preview: 'results',
    icon: BadgeCheck,
    title: 'Progrés visible',
    text: 'Una lectura clara del que estàs consolidant.',
  },
];

const EXPLAINERS = [
  {
    icon: BookOpen,
    title: 'Què és Arrel?',
    text: 'Una app que et dona una acció concreta cada dia per cuidar cos, ment, estrès, relacions i rutina personal.',
  },
  {
    icon: Gauge,
    title: 'A qui va dirigida?',
    text: 'A persones que volen cuidar-se millor però no volen una altra llista infinita d’hàbits, mètriques i recordatoris.',
  },
  {
    icon: ShieldCheck,
    title: 'Què no és?',
    text: 'No és una app mèdica, no substitueix cap professional i no promet resultats clínics.',
  },
  {
    icon: Lightbulb,
    title: 'Què fas cada dia?',
    text: 'Obres l’app, llegeixes una acció, la fas i tanques amb un check-in molt curt: fet, mig fet o no fet.',
  },
];

const FIRST_DAY_STEPS = [
  {
    step: '01',
    icon: SmilePlus,
    title: 'Entres a l’app',
    text: 'Arrel t’explica com funciona: una acció al dia, cicles setmanals i check-in curt.',
  },
  {
    step: '02',
    icon: Compass,
    title: 'Tries com començar',
    text: 'Pots provar una acció sense diagnosi o respondre cinc preguntes per personalitzar el primer focus.',
  },
  {
    step: '03',
    icon: Sparkles,
    title: 'Fas l’acció del dia',
    text: 'És una acció petita i concreta. Per exemple: caminar deu minuts, respirar tres minuts o escriure una frase.',
  },
  {
    step: '04',
    icon: CheckCircle2,
    title: 'Marques com ha anat',
    text: 'Indiques si ho has fet, mig fet o no fet. Amb això Arrel manté el fil del cicle.',
  },
];

const AREAS = [
  {
    icon: Dumbbell,
    name: 'Cos',
    text: 'Moviment, mobilitat, força bàsica i petites accions físiques.',
  },
  {
    icon: Brain,
    name: 'Ment',
    text: 'Atenció, flexibilitat mental, lectura, memòria i canvi de perspectiva.',
  },
  {
    icon: Wind,
    name: 'Estrès',
    text: 'Pausa, respiració, notificacions, ritme intern i descans mental.',
  },
  {
    icon: UsersRound,
    name: 'Vincles',
    text: 'Missatges, trucades, converses curtes i presència amb altres persones.',
  },
  {
    icon: Leaf,
    name: 'Identitat',
    text: 'Accions per sortir de rutines personals massa automàtiques.',
  },
];

const USE_CASES = [
  'Quan vols cuidar-te però et costa mantenir rutines llargues.',
  'Quan tens poc temps i necessites una acció molt concreta.',
  'Quan vols reduir estrès sense començar un programa complicat.',
  'Quan prefereixes provar primer i personalitzar després.',
];

function AppPreview({ type = 'action', compact = false }) {
  return (
    <div className={`landing-app-preview is-${type} ${compact ? 'is-compact' : ''}`} aria-hidden="true">
      <div className="landing-phone-shell">
        <div className="landing-phone-top">
          <span>Arrel</span>
          <ArrelLogo className="landing-phone-logo" />
        </div>
        <div className="landing-phone-card">
          {type === 'quiz' ? (
            <>
              <p>Diagnosi</p>
              <h3>Com vols començar avui?</h3>
              <span />
              <span />
              <span />
            </>
          ) : null}
          {type === 'results' ? (
            <>
              <p>Progrés</p>
              <div className="landing-preview-rings">
                <span />
                <span />
                <strong>6/7</strong>
              </div>
            </>
          ) : null}
          {type === 'action' ? (
            <>
              <p>Acció d’avui · 5 min</p>
              <h3>Baixa revolucions abans de continuar.</h3>
              <div className="landing-preview-checks">
                <span>Fet</span>
                <span>Mig</span>
                <span>No</span>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { state, startStarterCycle } = useArrel();
  const hasStarted = state.status !== STATUS.NEW;

  const begin = () => {
    if (!hasStarted) {
      startStarterCycle();
    }
    navigate('/app');
  };

  return (
    <div className="landing-page">
      <SEO
        title="Una acció al dia"
        description="Arrel et proposa una acció curta cada dia per cuidar cos, ment, estrès, relacions i rutina personal."
        canonical="https://arrel.eu/"
      />
      <header className="landing-nav">
        <Link to="/inici" className="landing-brand" aria-label="Arrel">
          <ArrelLogo className="v2-brand-logo" />
          <span>Arrel</span>
        </Link>
        <nav className="landing-links" aria-label="Navegació principal">
          <a href="#que-es">Què és</a>
          <a href="#primer-dia">Primer dia</a>
          <a href="#arees">Àrees</a>
          <button type="button" onClick={begin}>
            {hasStarted ? 'Continuar' : 'Provar'}
          </button>
        </nav>
        <button type="button" onClick={begin} className="landing-mobile-action" aria-label="Provar Arrel">
          <ArrowRight size={18} />
        </button>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero-media" aria-hidden="true">
            <div className="landing-hero-image landing-hero-image-main">
              <AppPreview type="action" />
            </div>
            <div className="landing-hero-mascot">
              <ArrelMascot mood="welcome" />
            </div>
          </div>

          <div className="landing-hero-content">
            <p className="landing-kicker">Cura quotidiana sense soroll</p>
            <h1>Una acció al dia. Prou.</h1>
            <p className="landing-lead">
              Cinc minuts per cuidar cos, ment o estrès. Arrel tria el pas d’avui
              perquè tu no hagis de convertir-ho en un projecte.
            </p>
            <div className="landing-actions">
              <button type="button" onClick={begin} className="landing-primary">
                {hasStarted ? 'Continuar avui' : 'Provar sense compte'}
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="landing-proof-strip" aria-label="Resum d'Arrel">
              <span>
                <ShieldCheck size={17} />
                Sense compte
              </span>
              <span>
                <Footprints size={17} />
                3-10 min
              </span>
              <span>
                <HeartHandshake size={17} />
                Sense culpa
              </span>
            </div>
          </div>
        </section>

        <section id="que-es" className="landing-section landing-explain">
          <div className="landing-section-head">
            <p className="landing-kicker">Què és</p>
            <h2>Arrel és simple: una acció al dia i un check-in curt.</h2>
          </div>
          <div className="landing-definition">
            <p>
              No has de crear un pla, comparar dades ni omplir una pantalla plena
              d’objectius. Obres Arrel, fas l’acció que et proposa i marques com ha anat.
              Demà continues amb la següent.
            </p>
          </div>
          <div className="landing-explainer-grid">
            {EXPLAINERS.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="landing-explainer">
                  <Icon size={21} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="landing-section landing-gallery" aria-label="Pantalles d'Arrel">
          <div className="landing-gallery-track">
            {APP_MOCKUPS.map((mockup) => {
              const Icon = mockup.icon;

              return (
                <article key={mockup.title} className="landing-shot">
                  <AppPreview type={mockup.preview} />
                  <div>
                    <Icon size={20} />
                    <h3>{mockup.title}</h3>
                    <p>{mockup.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="metode" className="landing-section">
          <div className="landing-section-head">
            <p className="landing-kicker">Mètode</p>
            <h2>Pots provar-ho abans de personalitzar res.</h2>
          </div>
          <div className="landing-feature-grid">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <article key={feature.title} className="landing-feature">
                  <Icon size={22} />
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="primer-dia" className="landing-section landing-first-day">
          <div className="landing-section-head">
            <p className="landing-kicker">Primer dia</p>
            <h2>Què passa quan entres?</h2>
          </div>
          <div className="landing-step-grid">
            {FIRST_DAY_STEPS.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.step} className="landing-step-card">
                  <span>{item.step}</span>
                  <Icon size={23} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="arees" className="landing-section landing-areas">
          <div className="landing-section-head">
            <p className="landing-kicker">Les cinc àrees</p>
            <h2>Les accions es reparteixen en cinc àrees de la vida quotidiana.</h2>
          </div>
          <div className="landing-area-list">
            {AREAS.map((area) => {
              const Icon = area.icon;

              return (
                <article key={area.name}>
                  <Icon size={21} />
                  <h3>{area.name}</h3>
                  <p>{area.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="landing-section landing-use-cases">
          <div className="landing-section-head">
            <p className="landing-kicker">Quan serveix</p>
            <h2>Serveix quan vols començar petit i evitar complicar-te.</h2>
          </div>
          <ul>
            {USE_CASES.map((item) => (
              <li key={item}>
                <CheckCircle2 size={17} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="landing-final">
          <div>
            <Sprout size={28} />
            <h2>Prova una acció i decideix si et serveix.</h2>
            <p>
              Pots començar sense diagnosi. Si després vols que Arrel adapti millor les
              accions, respondràs cinc preguntes.
            </p>
            <button type="button" onClick={begin} className="landing-primary">
              {hasStarted ? 'Tornar a avui' : 'Obrir Arrel'}
              <ArrowRight size={18} />
            </button>
          </div>
          <AppPreview type="action" />
        </section>
      </main>

      <footer className="landing-footer">
        <span>Arrel</span>
        <nav aria-label="Informació legal">
          <Link to="/legal/privacitat">Privacitat</Link>
          <Link to="/legal/termes">Termes</Link>
          <a href="mailto:hola@arrel.eu">Contacte</a>
        </nav>
      </footer>
    </div>
  );
}
