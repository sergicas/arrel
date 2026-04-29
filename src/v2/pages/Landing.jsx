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
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useArrel } from '../state/useArrel.js';
import { AREAS as AREA_IDS, AREA_LABELS } from '../lib/types.js';
import ArrelLogo from '../components/ArrelLogo.jsx';
import ArrelMascot from '../components/ArrelMascot.jsx';
import SEO from '../../components/SEO.jsx';

const FEATURES = [
  {
    icon: Activity,
    title: 'Una prova petita al teu ritme',
    text: 'Pots anar lent, regular o accelerat. Cada prova dura de 3 a 10 minuts.',
  },
  {
    icon: Compass,
    title: 'Comences amb una prova concreta',
    text: 'Arrel et dona una prova inicial i una lectura simple: hi és, costava o l’has evitat.',
  },
  {
    icon: Timer,
    title: 'Funciona per setmanes',
    text: 'Cada cicle té sis dies de prova i un setè dia per revisar els resultats.',
  },
];

const APP_MOCKUPS = [
  {
    preview: 'quiz',
    icon: PenLine,
    title: 'Capacitat setmanal',
    text: 'Cada cicle se centra en una capacitat que vols mantenir.',
  },
  {
    preview: 'action',
    icon: AlarmClockCheck,
    title: 'Proves concretes',
    text: 'Accions curtes amb un final clar.',
  },
  {
    preview: 'results',
    icon: BadgeCheck,
    title: 'Resultats visibles',
    text: 'Una lectura clara: hi és, costava o evitat.',
  },
];

const EXPLAINERS = [
  {
    icon: BookOpen,
    title: 'Què és Arrel?',
    text: 'Una app amb proves curtes per practicar cos, memòria, calma, vincles i identitat.',
  },
  {
    icon: Gauge,
    title: 'A qui va dirigida?',
    text: 'A persones que es fan grans i volen mantenir capacitats concretes.',
  },
  {
    icon: ShieldCheck,
    title: 'Què no és?',
    text: 'No és una app mèdica i no promet rejovenir. T’ajuda a practicar capacitats concretes.',
  },
  {
    icon: Lightbulb,
    title: 'Què fas cada dia?',
    text: 'Obres l’app, fas una prova curta i marques el resultat: hi és, costava o evitat.',
  },
];

const FIRST_DAY_STEPS = [
  {
    step: '01',
    icon: SmilePlus,
    title: 'Entres a l’app',
    text: 'Arrel t’explica la idea central: frenar l’envelliment amb una prova petita cada dia.',
  },
  {
    step: '02',
    icon: Compass,
    title: 'Tries com avançar',
    text: 'Comences en ritme lent, però pots passar a regular o accelerat si vols explorar més proves.',
  },
  {
    step: '03',
    icon: Sparkles,
    title: 'Fas la prova del dia',
    text: 'És un gest petit i concret. Per exemple: caminar deu minuts, recordar set objectes o trucar algú.',
  },
  {
    step: '04',
    icon: CheckCircle2,
    title: 'Guardes el resultat',
    text: 'Marques si la capacitat hi és, si ha costat o si l’has evitat.',
  },
];

const AREAS = [
  {
    icon: Dumbbell,
    name: 'Cos',
    text: 'Caminar, aixecar-te, fer força i mantenir l’equilibri.',
  },
  {
    icon: Brain,
    name: 'Memòria',
    text: 'Recordar, aprendre, calcular i explicar idees.',
  },
  {
    icon: Wind,
    name: 'Calma',
    text: 'Fer pausa, respirar i baixar la tensió.',
  },
  {
    icon: UsersRound,
    name: 'Vincles',
    text: 'Trucar, saludar, escoltar i fer una pregunta real.',
  },
  {
    icon: Leaf,
    name: 'Identitat',
    text: 'Provar una decisió diferent i veure com et queda.',
  },
];

const USE_CASES = [
  'Quan vols comprovar com tens el cos, la memòria, la calma, els vincles o la identitat.',
  'Quan vols conservar mobilitat, memòria, calma, vincles o identitat.',
  'Quan vols saber si una capacitat avui és fàcil, costa o l’estàs evitant.',
  'Quan prefereixes una estructura petita abans que un programa complicat.',
];

const START_PROOF_OPTIONS = [
  {
    area: AREA_IDS.PHYSICAL,
    text: 'Caminar, força bàsica i equilibri.',
  },
  {
    area: AREA_IDS.COGNITIVE,
    text: 'Recordar, aprendre i calcular.',
  },
  {
    area: AREA_IDS.STRESS,
    text: 'Fer pausa, respirar i baixar tensió.',
  },
  {
    area: AREA_IDS.RELATIONAL,
    text: 'Contactar, escoltar i parlar.',
  },
  {
    area: AREA_IDS.IDENTITY,
    text: 'Fer una decisió diferent.',
  },
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
              <p>Capacitat</p>
              <h3>Què treballes aquesta setmana?</h3>
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
              <p>Prova d’avui · 5 min</p>
              <h3>Mesura una capacitat avui.</h3>
              <div className="landing-preview-checks">
                <span>Hi és</span>
                <span>Costava</span>
                <span>Evitat</span>
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
  const startPanelRef = useRef(null);
  const { startStarterCycle } = useArrel();
  const [showStartOptions, setShowStartOptions] = useState(false);
  const [startStep, setStartStep] = useState('main');

  const openStartOptions = () => {
    setShowStartOptions(true);
    setStartStep('main');
    window.setTimeout(() => {
      startPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 0);
  };

  const chooseTodayProof = (area) => {
    startStarterCycle(area);
    navigate('/app');
  };

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="landing-page">
      <SEO
        title="Frena el teu envelliment"
        description="Arrel et proposa proves petites per practicar cos, memòria, calma, vincles i identitat."
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
          <a href="#arees">Capacitats</a>
          <Link to="/menu">Mapa</Link>
          <button type="button" onClick={openStartOptions}>
            Començar
          </button>
        </nav>
        <div className="landing-mobile-actions">
          <Link to="/menu" className="landing-mobile-link">Mapa</Link>
          <button type="button" onClick={openStartOptions} className="landing-mobile-action" aria-label="Obrir opcions d’inici">
            <ArrowRight size={18} />
          </button>
        </div>
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
            <p className="landing-kicker">Proves curtes per mantenir capacitats</p>
            <h1>Frena el teu envelliment.</h1>
            <p className="landing-lead">
              Arrel et proposa proves curtes per practicar cos, memòria, calma,
              vincles i identitat mentre et fas gran. Sense miracles: accions
              concretes de 3 a 10 minuts.
            </p>
            <div className="landing-actions">
              <button type="button" onClick={openStartOptions} className="landing-primary">
                Triar per on començar
                <ArrowRight size={18} />
              </button>
            </div>
            {showStartOptions ? (
              <section ref={startPanelRef} className="landing-start-panel" aria-label="Opcions per començar">
                {startStep === 'main' ? (
                  <>
                    <p className="landing-kicker">Com vols començar?</p>
                    <div className="landing-start-options">
                      <button type="button" onClick={() => setStartStep('proof')}>
                        <strong>Triar la prova d’avui</strong>
                        <span>Escull una capacitat i obre una prova de 3 a 10 minuts.</span>
                      </button>
                      <button type="button" onClick={() => goTo('/diagnostic')}>
                        <strong>Ajustar focus</strong>
                        <span>Respon cinc preguntes i tria la capacitat principal.</span>
                      </button>
                      <button type="button" onClick={() => goTo('/menu/ritme')}>
                        <strong>Triar ritme</strong>
                        <span>Lent, regular o accelerat.</span>
                      </button>
                      <button type="button" onClick={() => goTo('/menu/arees')}>
                        <strong>Veure capacitats</strong>
                        <span>Cos, memòria, calma, vincles i identitat.</span>
                      </button>
                      <button type="button" onClick={() => goTo('/menu')}>
                        <strong>Veure el mapa complet</strong>
                        <span>Totes les pantalles de l’app.</span>
                      </button>
                    </div>
                    <button type="button" className="landing-start-back" onClick={() => setShowStartOptions(false)}>
                      Tornar enrere
                    </button>
                  </>
                ) : (
                  <>
                    <p className="landing-kicker">Tria la prova d’avui</p>
                    <div className="landing-start-options">
                      {START_PROOF_OPTIONS.map((option) => (
                        <button
                          key={option.area}
                          type="button"
                          onClick={() => chooseTodayProof(option.area)}
                        >
                          <strong>{AREA_LABELS[option.area]}</strong>
                          <span>{option.text}</span>
                        </button>
                      ))}
                    </div>
                    <button type="button" className="landing-start-back" onClick={() => setStartStep('main')}>
                      Tornar a les opcions
                    </button>
                  </>
                )}
              </section>
            ) : null}
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
                Ritme flexible
              </span>
            </div>
          </div>
        </section>

        <section id="que-es" className="landing-section landing-explain">
          <div className="landing-section-head">
            <p className="landing-kicker">Què és</p>
            <h2>Arrel és simple: una capacitat per setmana i una prova curta cada vegada.</h2>
          </div>
          <div className="landing-definition">
            <p>
              No has de competir amb el teu passat. Obres Arrel, fas una prova curta
              i marques un resultat: hi és, costava o evitat.
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
            <h2>Comença amb una prova guiada i una lectura simple.</h2>
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
            <p className="landing-kicker">Les cinc capacitats</p>
            <h2>Les proves treballen cinc capacitats.</h2>
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
            <h2>Serveix quan vols actuar abans que una capacitat es perdi.</h2>
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
            <h2>Fes una prova i decideix què cal practicar.</h2>
            <p>
              Arrel et proposa una acció curta, tu la fas i marques què ha passat:
              hi és, costava o avui l’has evitat.
            </p>
            <button type="button" onClick={openStartOptions} className="landing-primary">
              Veure opcions
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
