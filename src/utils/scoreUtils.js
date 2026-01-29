
const calculateGlobalScore = (scores) => {
    if (!scores) return 0;
    // Same normalization logic
    const normalize = (val, max) => (((val || 0) + max) / (max * 2)) * 100;
    const e = normalize(scores.energy, 4);
    const s = normalize(scores.sleep, 6);
    const n = normalize(scores.nutrition, 6);
    const a = normalize(scores.attention, 4);
    const t = normalize(scores.lived_time, 4);
    return Math.round((e + s + n + a + t) / 5);
};

export { calculateGlobalScore };
