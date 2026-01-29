import React from 'react';

const EvolutionChart = ({ data, color = '#9333ea' }) => {
  // data format: [{label: '12/01', value: 45}, {label: '19/01', value: 60}]
  if (!data || data.length === 0)
    return (
      <div className="h-32 flex items-center justify-center text-gray-400 text-xs text-center border border-dashed border-gray-200 rounded-lg bg-gray-50">
        No hi ha dades suficients
        <br />
        Completa dies per veure l'evolució
      </div>
    );

  const height = 150;
  const width = 300;
  const padding = 20;

  const getX = (index) => padding + (index / (data.length - 1 || 1)) * (width - 2 * padding);
  const getY = (value) => height - padding - (value / 100) * (height - 2 * padding);

  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Grid Lines */}
        <line
          x1={padding}
          y1={getY(0)}
          x2={width - padding}
          y2={getY(0)}
          stroke="#f3f4f6"
          strokeWidth="1"
        />
        <line
          x1={padding}
          y1={getY(50)}
          x2={width - padding}
          y2={getY(50)}
          stroke="#f3f4f6"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1={padding}
          y1={getY(100)}
          x2={width - padding}
          y2={getY(100)}
          stroke="#f3f4f6"
          strokeWidth="1"
        />

        {/* Single Point Visual - Horizontal Dashed Line for Baseline */}
        {data.length === 1 && (
          <line
            x1={padding}
            y1={getY(data[0].value)}
            x2={width - padding}
            y2={getY(data[0].value)}
            stroke={color}
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.3"
          />
        )}

        {/* Area Gradient */}
        {data.length > 1 && (
          <>
            <defs>
              <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`${points} L${getX(data.length - 1)},${height - padding} L${padding},${height - padding} Z`}
              fill="url(#gradientArea)"
            />
          </>
        )}

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots */}
        {data.map((d, i) => (
          <g key={i} className="group">
            <circle
              cx={getX(i)}
              cy={getY(d.value)}
              r="4"
              fill="white"
              stroke={color}
              strokeWidth="2"
              className="transition-all duration-300 group-hover:r-6"
            />
            {/* Tooltip on hover (simple svg native) */}
            <text
              x={getX(i)}
              y={getY(d.value) - 10}
              textAnchor="middle"
              fontSize="10"
              className="opacity-0 group-hover:opacity-100 transition-opacity fill-gray-600 font-bold bg-white"
            >
              {d.value}%
            </text>
            {/* X Labels */}
            <text
              x={getX(i)}
              y={height - 2}
              textAnchor="middle"
              fontSize="8"
              className="fill-gray-400"
            >
              {d.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default EvolutionChart;
