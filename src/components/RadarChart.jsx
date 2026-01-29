import React from 'react';

const RadarChart = ({ data, size = 300 }) => {
  // Data expected: { energia: 80, son: 60, nutricio: 40, atencio: 90, temps: 50 }
  const keys = ['energia', 'son', 'nutricio', 'atencio', 'temps'];
  const labels = ['Energia', 'Son', 'Nutrició', 'Atenció', 'Temps'];
  const maxVal = 100;
  const center = size / 2;
  const radius = size / 2 - 40; // Padding for labels
  const angleStep = (Math.PI * 2) / keys.length;

  // Helper to calculate coordinates
  const getCoordinates = (value, index) => {

    // Adjust angle to start top: -PI/2
    const adjustedAngle = index * angleStep - Math.PI / 2;

    const x = center + radius * (value / maxVal) * Math.cos(adjustedAngle);
    const y = center + radius * (value / maxVal) * Math.sin(adjustedAngle);
    return { x, y };
  };

  // Calculate points for the data polygon
  const points = keys
    .map((key, i) => {
      const { x, y } = getCoordinates(data[key] || 0, i);
      return `${x},${y}`;
    })
    .join(' ');

  // Calculate grid lines (concentric pentagons)
  const levels = [20, 40, 60, 80, 100];

  return (
    <div className="relative flex justify-center items-center w-full h-auto aspect-square max-w-[350px] mx-auto">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Gràfic de radar: Global ${data.global}, Energia ${data.energia}, Son ${data.son}, Nutrició ${data.nutricio}, Atenció ${data.atencio}, Temps ${data.temps}`}
        className="w-full h-full"
      >
        {/* Background Grid */}
        {levels.map((level) => {
          const levelPoints = keys
            .map((_, i) => {
              const { x, y } = getCoordinates(level, i);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={level}
              points={levelPoints}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Axes */}
        {keys.map((_, i) => {
          const { x, y } = getCoordinates(100, i);
          return (
            <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#e5e7eb" strokeWidth="1" />
          );
        })}

        {/* Data Polygon */}
        <polygon
          points={points}
          fill="rgba(147, 51, 234, 0.2)" // Purple-500 with opacity
          stroke="#9333ea"
          strokeWidth="2"
          className="filter drop-shadow-lg"
        />

        {/* Data Points */}
        {keys.map((key, i) => {
          const { x, y } = getCoordinates(data[key] || 0, i);
          return (
            <circle key={i} cx={x} cy={y} r="4" fill="#9333ea" stroke="white" strokeWidth="2" />
          );
        })}

        {/* Labels */}
        {keys.map((key, i) => {
          // Push labels out a bit further than radius
          const labelRadius = radius + 25;
          const adjustedAngle = i * angleStep - Math.PI / 2;
          const x = center + labelRadius * Math.cos(adjustedAngle);
          const y = center + labelRadius * Math.sin(adjustedAngle);

          return (
            <foreignObject key={i} x={x - 40} y={y - 10} width="80" height="20">
              <div className="text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                {labels[i]}
              </div>
            </foreignObject>
          );
        })}
      </svg>

      {/* Global Score Center Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{data.global}</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
            Global
          </span>
        </div>
      </div>
    </div>
  );
};

export default RadarChart;
