import { useState } from 'react';
import { Bell, BellOff, Clock3 } from 'lucide-react';
import Shell from '../../components/Shell.jsx';
import { useArrel } from '../../state/useArrel.js';

function getStatusCopy(reminder, savedResult) {
  const source = savedResult || reminder;

  if (source.error) return source.error;
  if (!source.enabled) return 'Arrel no t’enviarà cap recordatori.';
  if (source.scheduled) return `Recordatori actiu a les ${source.time}.`;
  if (source.permission === 'unavailable') {
    return 'Preferència desada. Les notificacions locals s’activaran quan obris Arrel com a app instal·lada.';
  }
  if (source.permission === 'denied') return 'El dispositiu no ha donat permís per enviar recordatoris.';

  return 'Recordatori desat.';
}

export default function Reminder() {
  const { state, setDailyReminder } = useArrel();
  const reminder = state.reminder;
  const [enabled, setEnabled] = useState(reminder.enabled);
  const [time, setTime] = useState(reminder.time);
  const [saving, setSaving] = useState(false);
  const [savedResult, setSavedResult] = useState(null);

  const saveReminder = async (event) => {
    event.preventDefault();
    setSaving(true);
    const result = await setDailyReminder({ enabled, time });
    setSavedResult(result);
    setEnabled(result.enabled);
    setTime(result.time);
    setSaving(false);
  };

  return (
    <Shell showBack backTo="/menu">
      <div className="flex-1 flex flex-col pt-8 pb-8 gap-6">
        <div>
          <p className="v2-kicker mb-4">Recordatori</p>
          <h2 className="text-3xl font-medium text-balance max-w-sm">
            Un avís suau per tornar a la prova del dia.
          </h2>
        </div>

        <div className="v2-panel">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Arrel et pot recordar el moment del dia, no exigir-te’l. No hi ha ratxes,
            penalitzacions ni soroll extra.
          </p>
        </div>

        <form className="v2-reminder-form" onSubmit={saveReminder}>
          <label className="v2-reminder-toggle">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(event) => setEnabled(event.target.checked)}
            />
            <span className="v2-switch" aria-hidden="true">
              <span />
            </span>
            <span className="v2-toggle-copy">
              <strong>{enabled ? 'Recordatori actiu' : 'Recordatori apagat'}</strong>
              <small>{enabled ? 'Un cop al dia, a l’hora que triïs.' : 'Pots seguir entrant quan vulguis.'}</small>
            </span>
          </label>

          <label className="v2-time-field">
            <span>
              <Clock3 size={15} />
              Hora del recordatori
            </span>
            <input
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              disabled={!enabled}
            />
          </label>

          <div className={`v2-reminder-status ${enabled ? 'is-on' : 'is-off'}`} role="status">
            {enabled ? <Bell size={17} /> : <BellOff size={17} />}
            <span>{getStatusCopy(reminder, savedResult)}</span>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={saving}>
            {saving ? 'Desant...' : 'Desar recordatori'}
          </button>
        </form>
      </div>
    </Shell>
  );
}
