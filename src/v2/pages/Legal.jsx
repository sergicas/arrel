import { Link, useParams } from 'react-router-dom';
import Shell from '../components/Shell.jsx';

const CONTENT = {
  privacitat: {
    kicker: 'Privacitat',
    title: 'Les teves dades es queden al teu dispositiu.',
    body: [
      'Arrel guarda localment les respostes de diagnosi, les lectures diàries i les notes opcionals perquè puguis continuar el teu cicle.',
      'Ara mateix no hi ha compte d’usuari ni sincronització al núvol en aquesta versió. Si esborres les dades del navegador, també esborres el progrés local.',
      'No venem dades personals ni les fem servir per publicitat.',
    ],
  },
  termes: {
    kicker: 'Termes',
    title: 'Arrel és una eina de cura quotidiana, no una eina mèdica.',
    body: [
      'Les proves d’Arrel són propostes generals de cura quotidiana. No substitueixen cap diagnòstic, tractament ni consell professional.',
      'Si tens una condició mèdica, dolor persistent o malestar important, consulta un professional de salut abans de seguir qualsevol rutina.',
      'La versió actual guarda el progrés localment i pot canviar mentre Arrel continua evolucionant.',
    ],
  },
};

export default function Legal() {
  const { section = 'privacitat' } = useParams();
  const content = CONTENT[section] || CONTENT.privacitat;

  return (
    <Shell showBack backTo="/menu">
      <div className="flex-1 flex flex-col pt-8 pb-8 gap-6">
        <div>
          <p className="v2-kicker mb-4">{content.kicker}</p>
          <h2 className="text-3xl font-medium text-balance max-w-sm">{content.title}</h2>
        </div>

        <div className="v2-panel">
          <div className="flex flex-col gap-4">
            {content.body.map((paragraph) => (
              <p key={paragraph} className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link to="/legal/privacitat" className="v2-chip">Privacitat</Link>
          <Link to="/legal/termes" className="v2-chip">Termes d’ús</Link>
        </div>
      </div>
    </Shell>
  );
}
