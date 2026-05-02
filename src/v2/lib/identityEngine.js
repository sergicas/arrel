import { AREA_LABELS, AREAS } from './types.js';
import { analyzeUserStyle, USER_STYLES } from './toneEngine.js';

export function synthesizeIdentity(state) {
  const feedback = state.feedback || [];
  const cycles = state.cycleReadings || [];
  
  if (cycles.length === 0 && feedback.length < 7) return null;

  const userStyle = analyzeUserStyle(feedback);
  
  // 1. Fortalesa principal (àrea amb més èxits)
  const areaCounts = {};
  feedback.filter(f => f.value === 'done').forEach(f => {
    areaCounts[f.area] = (areaCounts[f.area] || 0) + 1;
  });
  
  const strongestAreaId = Object.keys(areaCounts).reduce((a, b) => areaCounts[a] > areaCounts[b] ? a : b, AREAS.PHYSICAL);
  const strongestArea = AREA_LABELS[strongestAreaId];

  // 2. Índex de Resiliència (capacitat de tornar després d'un salt o esforç)
  let returnsAfterFriction = 0;
  let totalFriction = 0;
  for (let i = 0; i < feedback.length - 1; i++) {
    if (feedback[i].value !== 'done') {
      totalFriction++;
      if (feedback[i+1].value === 'done') returnsAfterFriction++;
    }
  }
  const resilienceScore = totalFriction === 0 ? 1 : returnsAfterFriction / totalFriction;
  
  // 3. Arquetip d'usuari
  let archetype = 'Usuari d’Arrel';
  let description = 'Estàs començant a construir el teu camí de capacitats.';

  if (resilienceScore > 0.7 && feedback.length >= 14) {
    archetype = userStyle === USER_STYLES.REFLECTIVE ? 'Explorador Conscient' : 'Constructor Resilient';
    description = 'Destaques per la teva capacitat de mantenir el rumb i tornar al ritme fins i tot quan el dia es complica.';
  } else if (feedback.length >= 21) {
    archetype = 'Mestre de la Constància';
    description = 'Arrel ja forma part de la teva rutina. Has demostrat un compromís profund amb el teu benestar a llarg termini.';
  } else if (userStyle === USER_STYLES.REFLECTIVE) {
    archetype = 'Observador Atent';
    description = 'Aprofites cada prova per reflexionar i conèixer-te millor a través de les teves notes.';
  } else if (feedback.length >= 7) {
    archetype = 'Practicant Decidit';
    description = 'Et centres en l’acció i en avançar dia a dia per consolidar les teves capacitats.';
  }

  // 4. Fites assolides
  const milestones = [];
  if (feedback.length >= 6) milestones.push('Primer cicle completat');
  if (feedback.length >= 24) milestones.push('Un mes de vida conscient');
  if (resilienceScore >= 0.9 && totalFriction >= 3) milestones.push('Mestre de la resiliència');
  if (Object.keys(areaCounts).length >= 4) milestones.push('Explorador de capacitats');

  return {
    archetype,
    description,
    strongestArea,
    resilienceLevel: resilienceScore > 0.8 ? 'Alta' : resilienceScore > 0.4 ? 'Mitjana' : 'En construcció',
    style: userStyle,
    milestones,
    totalProves: feedback.filter(f => f.value === 'done').length,
    totalCycles: state.cycleNumber
  };
}
