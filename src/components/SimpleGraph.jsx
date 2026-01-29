import React from 'react';

export const SimpleGraph = ({ data, dataKey }) => {
    if (data.length < 2) return null;

    const maxScore = 100;

    // Normalize points
    const points = data
        .map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - (d.puntuacions[dataKey] / maxScore) * 100;
            return `${x},${y}`;
        })
        .join(' ');

    return (
        <div className="w-full h-32 bg-white/50 rounded-xl p-4 mb-8 shadow-sm border border-white/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-2 left-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                Tendència: {dataKey.toUpperCase()}
            </div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full pt-4">
                {/* Grid lines */}
                <line
                    x1="0"
                    y1="20"
                    x2="100"
                    y2="20"
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                    strokeDasharray="2"
                />
                <line
                    x1="0"
                    y1="50"
                    x2="100"
                    y2="50"
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                    strokeDasharray="2"
                />
                <line
                    x1="0"
                    y1="80"
                    x2="100"
                    y2="80"
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                    strokeDasharray="2"
                />

                {/* Trend Line */}
                <polyline
                    points={points}
                    fill="none"
                    stroke="url(#gradientLine)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                />
                <defs>
                    <linearGradient id="gradientLine" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
