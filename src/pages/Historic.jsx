import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  ArrowRight,
  Activity,
  Filter,
  Calendar,
  ChevronDown,
  ChevronUp,
  FileDown,
} from 'lucide-react';
import { SimpleGraph } from '../components/SimpleGraph';
import SEO from '../components/SEO';
import { secureStorage } from '../lib/secureStorage';

export default function Historic() {
  const navigate = useNavigate();
  const [filtre, setFiltre] = useState('global'); // 'global', 'energia', 'son', 'nutricio', 'atencio', 'temps'
  // const [historic, setHistoric] = useState([]);

  const [diagnosticsAmbPuntuacions] = useState(() => {
    // Carregar històric
    const historicData = secureStorage.getItem('arrel_historic') || [];
    // Carregar progrés protocols
    const progresData = secureStorage.getItem('arrel_progres') || [];

    // Helper hoisted or inline? Inline is fine if pure
    function calcularPuntuacions(respostes) {
      // Assegurar que tenim prou respostes (omplir amb 0 si falta alguna) per evitar errors
      const r =
        respostes.length >= 17 ? respostes : [...respostes, ...Array(17 - respostes.length).fill(0)];

      // ENERGIA (3 preguntes: 0, 1, 2)
      const energia = Math.round(
        ([100, 70, 40, 20][r[0]] + [100, 70, 40, 20][r[1]] + [100, 70, 40, 20][r[2]]) / 3
      );

      // SON (4 preguntes: 3, 4, 5, 6)
      const son = Math.round(
        ([100, 70, 40, 20][r[3]] +
          [100, 70, 40, 20][r[4]] +
          [100, 70, 40, 20][r[5]] +
          [100, 70, 40, 20][r[6]]) /
        4
      );

      // NUTRICIÓ (4 preguntes: 7, 8, 9, 10)
      const nutricio = Math.round(
        ([100, 70, 40, 20][r[7]] +
          [100, 70, 40, 20][r[8]] +
          [100, 70, 40, 20][r[9]] +
          [100, 70, 40, 20][r[10]]) /
        4
      );

      // ATENCIÓ (3 preguntes: 11, 12, 13)
      const atencio = Math.round(
        ([100, 70, 40, 20][r[11]] + [100, 70, 40, 20][r[12]] + [100, 70, 40, 20][r[13]]) / 3
      );

      // TEMPS VISCUT (3 preguntes: 14, 15, 16)
      const temps = Math.round(
        ([100, 70, 40, 20][r[14]] + [100, 70, 40, 20][r[15]] + [100, 70, 40, 20][r[16]]) / 3
      );

      // GLOBAL: mitjana de les 5 àrees
      const global = Math.round((energia + son + nutricio + atencio + temps) / 5);

      return { global, energia, son, nutricio, atencio, temps };
    }

    // Calcular puntuacions per cada diagnòstic derived
    const ambPuntuacions = historicData.map((diag) => {
      const puntuacions = calcularPuntuacions(diag.respostes);

      // Intentar casar el progrés amb el diagnòstic (mateixa data)
      // Lógica MVP millorada: Busquem protocols amb data >= diag.data
      const relatedProtocols = progresData
        .filter((p) => {
          const pDate = new Date(p.data);
          const dDate = new Date(diag.data);
          return pDate >= dDate; // Protocols fets el mateix dia o després
        })
        .sort((a, b) => a.dia - b.dia);

      return {
        ...diag,
        puntuacions,
        protocols: relatedProtocols, // Array de protocols trobats
      };
    });
    return ambPuntuacions;
  }); // diagnosticsAmbPuntuacions lazy init

  const [nextProtocolDay] = useState(() => {
    const progresData = secureStorage.getItem('arrel_progres') || [];
    const maxDayCompleted = progresData.reduce((max, entry) => Math.max(max, entry.dia || 0), 1);
    return maxDayCompleted + 1;
  });



  const handleExportCSV = () => {
    if (!diagnosticsAmbPuntuacions.length) return;

    // Capçaleres CSV
    const headers = ['Data', 'Global', 'Energia', 'Son', 'Nutricio', 'Atencio', 'Temps Viscut'];

    // Files de dades
    const rows = diagnosticsAmbPuntuacions.map((diag) => [
      new Date(diag.data).toLocaleDateString(),
      diag.puntuacions.global,
      diag.puntuacions.energia,
      diag.puntuacions.son,
      diag.puntuacions.nutricio,
      diag.puntuacions.atencio,
      diag.puntuacions.temps,
    ]);

    // Combinar en string CSV
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    // Crear blob i descarregar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `arrel_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Simple SVG Graph Component
  // Moved SimpleGraph outside

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 md:p-8">
      <SEO
        title="Històric de Dades"
        description="Consulta l'evolució de les teves mètriques de salut al llarg del temps."
      />
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 flex items-center gap-3">
              Evolució <Activity className="w-8 h-8 text-purple-500" />
            </h1>
            <p className="text-lg text-gray-600">
              {diagnosticsAmbPuntuacions.length === 0
                ? 'Comença el teu camí de longevitat'
                : `${diagnosticsAmbPuntuacions.length} diagnòstics registrats`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-end">
            {/* Botó per anar al Protocol Dia X */}
            <button
              onClick={() => navigate(`/dia/${nextProtocolDay}`)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 text-sm"
            >
              <span>📅</span>
              <span>Anar al Dia {nextProtocolDay}</span>
            </button>

            {/* Export CSV (Nou) */}
            {diagnosticsAmbPuntuacions.length > 0 && (
              <button
                onClick={handleExportCSV}
                className="bg-white text-gray-600 border border-gray-200 px-4 py-2 rounded-full font-semibold hover:bg-gray-50 hover:text-purple-600 transition-colors flex items-center gap-2 text-sm"
                aria-label="Exportar dades a CSV"
              >
                <FileDown className="w-4 h-4" />
                Exportar
              </button>
            )}

            {/* FILTRE (Només si hi ha dades) */}
            {diagnosticsAmbPuntuacions.length > 0 && (
              <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400 ml-2" />
                <select
                  value={filtre}
                  onChange={(e) => setFiltre(e.target.value)}
                  className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer outline-none pr-8 py-1"
                >
                  <option value="global">Global</option>
                  <option value="energia">Energia</option>
                  <option value="son">Son</option>
                  <option value="nutricio">Nutrició</option>
                  <option value="atencio">Atencio</option>
                  <option value="temps">Temps Viscut</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* GRAPH SECTION */}
        <SimpleGraph data={diagnosticsAmbPuntuacions} dataKey={filtre} />

        {/* ESTAT BUIT */}
        {diagnosticsAmbPuntuacions.length === 0 ? (
          <div className="text-center py-20 bg-white/60 rounded-3xl border-2 border-dashed border-gray-300 backdrop-blur-sm">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Encara no tens dades</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Fes el teu primer diagnòstic per començar a trackejar la teva salut i longevitat.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              {/* Botó per anar al Protocol Dia X */}
              <button
                onClick={() => navigate(`/dia/${nextProtocolDay}`)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 text-sm"
              >
                <span>📅</span>
                <span>Anar al Dia {nextProtocolDay}</span>
              </button>
              {/* Botó per anar al Diagnòstic */}
              <button
                onClick={() => navigate('/diagnosis')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 text-sm"
              >
                <span>🧠</span>
                <span>Fer Diagnòstic</span>
              </button>
            </div>
          </div>
        ) : (
          /* LLISTA DE DIAGNÒSTICS */
          <div className="space-y-6">
            {[...diagnosticsAmbPuntuacions].reverse().map((diag, idx) => (
              <HistoricCard
                key={diag.id}
                diag={diag}
                idx={diagnosticsAmbPuntuacions.length - idx}
                filtre={filtre}
              // navigate={navigate}
              />
            ))}
          </div>
        )}

        {/* BOTÓ TORNAR */}
        <div className="mt-16 text-center">
          <button
            onClick={() => (window.location.href = '/resultats')}
            className="group flex items-center justify-center gap-2 mx-auto text-gray-500 hover:text-purple-600 font-medium transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Tornar als Resultats
          </button>
        </div>
      </div>
    </div>
  );
}

// Sub-component per gestionar l'estat d'expansió individual
function HistoricCard({ diag, idx, filtre }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const getColorScore = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  const getBgScore = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-700';
    if (score >= 60) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  const getProtocolName = (id) => {
    const names = {
      son: 'Finestra de son fixa 8h',
      cafe: 'Eliminar cafè després de 14h',
      sol: 'Caminar 20min al sol',
    };
    return names[id] || id;
  };

  const StatusIcon = ({ status }) => {
    if (status === 'completed') return '✅';
    if (status === 'partial') return '🟧';
    return '⬜';
  };

  const StatusText = ({ status }) => {
    if (status === 'completed')
      return (
        <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded text-xs font-medium">
          Fet
        </span>
      );
    if (status === 'partial')
      return (
        <span className="text-orange-700 bg-orange-50 px-2 py-0.5 rounded text-xs font-medium">
          Parcial
        </span>
      );
    return (
      <span className="text-gray-500 bg-gray-50 px-2 py-0.5 rounded text-xs font-medium">
        No fet
      </span>
    );
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 relative overflow-hidden group">
      {/* Puntuació Global Indicator (Corner) */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rotate-45 flex items-end justify-center pb-2 shadow-sm ${getBgScore(diag.puntuacions.global)}`}
      >
        <span className="font-bold text-lg transform -rotate-45 translate-y-1">
          {diag.puntuacions.global}
        </span>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 pr-12">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Diagnòstic {idx}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 capitalize">
            {new Date(diag.data).toLocaleDateString('ca-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </h3>
        </div>
      </div>

      {/* Mini-targetes de puntuacions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {/* GLOBAL (Mobile Visible) */}
        <div
          className={`p-3 rounded-xl bg-white border shadow-sm ${filtre === 'global' ? 'ring-2 ring-purple-400 border-purple-400' : 'border-gray-100'} transition-all`}
        >
          <div className={`text-2xl font-bold mb-1 ${getColorScore(diag.puntuacions.global)}`}>
            {diag.puntuacions.global}
          </div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Global
          </div>
        </div>

        {/* ENERGIA */}
        <div
          className={`p-3 rounded-xl bg-white border shadow-sm ${filtre === 'energia' ? 'ring-2 ring-orange-400 border-orange-400' : 'border-gray-100'} transition-all`}
        >
          <div className="text-2xl font-bold text-orange-500 mb-1">{diag.puntuacions.energia}</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Energia
          </div>
        </div>

        {/* SON */}
        <div
          className={`p-3 rounded-xl bg-white border shadow-sm ${filtre === 'son' ? 'ring-2 ring-indigo-400 border-indigo-400' : 'border-gray-100'} transition-all`}
        >
          <div className="text-2xl font-bold text-indigo-500 mb-1">{diag.puntuacions.son}</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Son</div>
        </div>

        {/* NUTRICIÓ */}
        <div
          className={`p-3 rounded-xl bg-white border shadow-sm ${filtre === 'nutricio' ? 'ring-2 ring-green-400 border-green-400' : 'border-gray-100'} transition-all`}
        >
          <div className="text-2xl font-bold text-green-500 mb-1">{diag.puntuacions.nutricio}</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Nutrició
          </div>
        </div>

        {/* ATENCIÓ */}
        <div
          className={`p-3 rounded-xl bg-white border shadow-sm ${filtre === 'atencio' ? 'ring-2 ring-blue-400 border-blue-400' : 'border-gray-100'} transition-all`}
        >
          <div className="text-2xl font-bold text-blue-500 mb-1">{diag.puntuacions.atencio}</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Atenció
          </div>
        </div>

        {/* TEMPS */}
        <div
          className={`p-3 rounded-xl bg-white border shadow-sm ${filtre === 'temps' ? 'ring-2 ring-purple-400 border-purple-400' : 'border-gray-100'} transition-all`}
        >
          <div className="text-2xl font-bold text-purple-500 mb-1">{diag.puntuacions.temps}</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Temps</div>
        </div>
      </div>

      {/* SECCIÓ PROTOCOLS EXPANDIBLE */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={toggleExpanded}
          className="w-full flex justify-between items-center group/btn outline-none hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
        >
          <h4 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
            📋 Protocols Registrats
          </h4>

          <div className="flex items-center gap-2">
            {/* Resum visual (bubble tags) */}
            <div className="flex gap-2 flex-wrap justify-end max-w-[200px] sm:max-w-none">
              {diag.protocols &&
                diag.protocols.map((p, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${p.compliment === 100 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <span>Dia {p.dia}:</span>
                    <span className="font-bold">{p.compliment || 0}%</span>
                  </div>
                ))}
              {(!diag.protocols || diag.protocols.length === 0) && (
                <span className="text-xs text-gray-400 italic">Cap dia completat</span>
              )}
            </div>
            {/* Icona expandir */}
            <div
              className={`p-1 rounded-full bg-gray-100 group-hover/btn:bg-gray-200 transition-all duration-300 ${expanded ? 'bg-purple-100 text-purple-600 rotate-180' : 'text-gray-400'}`}
            >
              <ChevronDown size={16} />
            </div>
          </div>
        </button>

        {/* Detall Expandible */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? 'max-h-[500px] opacity-100 mt-4 overflow-y-auto' : 'max-h-0 opacity-0'}`}
        >
          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
            {diag.protocols && diag.protocols.length > 0 ? (
              diag.protocols.map((protocol, i) => (
                <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                  <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 border-b pb-1">
                    Dia {protocol.dia} - {new Date(protocol.data).toLocaleDateString()}
                  </h5>
                  <div className="space-y-2">
                    {protocol.protocols ? (
                      protocol.protocols.map((p, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-base">
                              <StatusIcon status={p.status} />
                            </span>
                            <span className="text-gray-700 font-medium">
                              {getProtocolName(p.name)}
                            </span>
                          </div>
                          <StatusText status={p.status} />
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500 italic">No hi ha detalls.</p>
                    )}
                    {/* Optional: Add indicators summary */}
                    <div className="flex gap-4 mt-2 pt-2 border-t border-dashed border-gray-100">
                      <div className="text-xs text-gray-500">
                        Energia:{' '}
                        <span className="font-bold text-gray-700">{protocol.energia || '-'}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Ànim:{' '}
                        <span className="font-bold text-gray-700">{protocol.anim || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 mb-2">
                  No hi ha dades de protocols per aquest període.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
