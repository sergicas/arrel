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
    title: 'Una prova petita al teu ritme',
    text: 'Pots anar lent, regular o accelerat. La prova dura de 3 a 10 minuts; tu decideixes la cadència.',
  },
  {
    icon: Compass,
    title: 'Comences pel que encara respon',
    text: 'Primer pots provar-ho sense diagnosi. Si vols més precisió, després respon cinc preguntes sobre on notes que perds terreny.',
  },
  {
    icon: Timer,
    title: 'Funciona per setmanes',
    text: 'Cada cicle té sis dies de prova i un dia per mirar què ha resistit, què costa i què convé cuidar.',
  },
];

const APP_MOCKUPS = [
  {
    preview: 'quiz',
    icon: PenLine,
    title: 'Lectura de capacitats',
    text: 'Cinc preguntes per veure què convé preservar primer.',
  },
  {
    preview: 'action',
    icon: AlarmClockCheck,
    title: 'Proves concretes',
    text: 'Gestos curts que donen senyal, no una llista d’obligacions.',
  },
  {
    preview: 'results',
    icon: BadgeCheck,
    title: 'Senyals visibles',
    text: 'Una lectura clara del que respon, costa o s’evita.',
  },
];

const EXPLAINERS = [
  {
    icon: BookOpen,
    title: 'Què és Arrel?',
    text: 'Una app per frenar l’envelliment en el lloc on es nota cada dia: cos, memòria, calma, vincles i identitat.',
  },
  {
    icon: Gauge,
    title: 'A qui va dirigida?',
    text: 'A persones que noten que la vellesa ja no és una idea llunyana i volen seguir sent capaces, presents i curioses.',
  },
  {
    icon: ShieldCheck,
    title: 'Què no és?',
    text: 'No és una app mèdica ni promet revertir l’edat biològica. Parla de frenar l’envelliment com una pràctica quotidiana i observable.',
  },
  {
    icon: Lightbulb,
    title: 'Què fas cada dia?',
    text: 'Obres l’app, fas una prova petita i tanques amb una lectura: què ha respost, què ha costat o què has evitat.',
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
    title: 'Llegeixes què diu',
    text: 'Marques si la capacitat hi és, si ha costat o si l’has evitat. Això dona sentit al cicle.',
  },
];

const AREAS = [
  {
    icon: Dumbbell,
    name: 'Cos',
    text: 'Mobilitat, força bàsica i confiança per continuar habitant el cos.',
  },
  {
    icon: Brain,
    name: 'Memòria',
    text: 'Atenció, record, aprenentatge i flexibilitat per no tancar els camins mentals.',
  },
  {
    icon: Wind,
    name: 'Calma',
    text: 'Marge intern, pausa i capacitat de no viure sempre en reacció.',
  },
  {
    icon: UsersRound,
    name: 'Vincles',
    text: 'Presència, contacte i cura dels fils que et mantenen vinculat.',
  },
  {
    icon: Leaf,
    name: 'Identitat',
    text: 'Moviment personal, decisió i continuïtat amb qui encara vols ser.',
  },
];

const USE_CASES = [
  'Quan notes que una part de tu s’està encongint sense fer soroll.',
  'Quan vols conservar mobilitat, memòria, calma, vincles o identitat.',
  'Quan no vols una app d’hàbits, sinó una manera de comprovar què encara respon.',
  'Quan prefereixes una estructura petita abans que un programa complicat.',
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
              <p>Prova d’avui · 5 min</p>
              <h3>Comprova què encara respon.</h3>
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
        title="Frena el teu envelliment"
        description="Arrel et proposa proves petites per frenar l’envelliment quotidià: cos, memòria, calma, vincles i identitat."
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
            <p className="landing-kicker">Una pràctica petita contra el desgast</p>
            <h1>Frena el teu envelliment.</h1>
            <p className="landing-lead">
              Arrel et proposa proves petites per protegir cos, memòria, calma,
              vincles i identitat mentre et fas gran. Sense miracles: una manera
              clara de no abandonar-te.
            </p>
            <div className="landing-actions">
              <button type="button" onClick={begin} className="landing-primary">
                {hasStarted ? 'Continuar avui' : 'Comprovar avui'}
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
                Ritme flexible
              </span>
            </div>
          </div>
        </section>

        <section id="que-es" className="landing-section landing-explain">
          <div className="landing-section-head">
            <p className="landing-kicker">Què és</p>
            <h2>Arrel és simple: una capacitat per setmana i proves petites al ritme que puguis sostenir.</h2>
          </div>
          <div className="landing-definition">
            <p>
              No has de competir amb el teu passat ni convertir la vellesa en un projecte
              de rendiment. Obres Arrel, fas una prova petita i mires què diu sobre
              allò que vols conservar.
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
            <h2>Pots provar-ho abans de posar-li nom a res.</h2>
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
            <h2>Les proves observen cinc capacitats que val la pena preservar.</h2>
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
            <h2>Serveix quan vols no deixar que la vida s’encongeixi sense adonar-te’n.</h2>
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
            <h2>Fes una prova i mira si et diu alguna cosa real.</h2>
            <p>
              Pots començar sense diagnosi. Si després vols que Arrel miri millor què
              convé preservar, respondràs cinc preguntes.
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
