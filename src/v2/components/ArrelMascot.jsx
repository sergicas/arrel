const MOODS = ['welcome', 'action', 'rest', 'celebrate'];

export default function ArrelMascot({ mood = 'welcome', className = '' }) {
  const activeMood = MOODS.includes(mood) ? mood : 'welcome';
  const isRest = activeMood === 'rest';
  const isAction = activeMood === 'action';
  const isCelebrate = activeMood === 'celebrate';
  const isWelcome = activeMood === 'welcome';

  return (
    <svg
      className={['v2-mascot', `v2-mascot-${activeMood}`, className].filter(Boolean).join(' ')}
      viewBox="0 0 160 160"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="80" cy="134" rx="44" ry="11" fill="#CBEFF4" opacity="0.72" />

      {isWelcome ? (
        <g className="v2-mascot-sparkles" fill="none" stroke="#58BCC9" strokeLinecap="round" strokeWidth="3">
          <path d="M24 38v12M18 44h12" />
          <path d="M130 28v10M125 33h10" />
          <circle cx="140" cy="60" r="3" fill="#DFF7FA" stroke="none" />
        </g>
      ) : null}

      {isAction ? (
        <g className="v2-mascot-prop">
          <rect x="108" y="33" width="32" height="32" rx="12" fill="#FBFFFF" />
          <rect x="108" y="33" width="32" height="32" rx="12" fill="none" stroke="#B6E9EF" strokeWidth="3" />
          <path d="M117 50.2l5.1 5.3 9-11.1" fill="none" stroke="#3E8F9C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      ) : null}

      {isRest ? (
        <g className="v2-mascot-prop">
          <path d="M118 31.5c-9.5 3.8-14 14.8-9.5 24.1 3.8 7.8 12.1 11.8 20.2 10.3-3 4.4-8 7.4-13.8 7.4-9.3 0-16.9-7.5-16.9-16.8 0-10.5 9.6-18.4 20-25Z" fill="#BCECF1" />
          <circle cx="130" cy="41" r="2.8" fill="#58BCC9" opacity="0.75" />
        </g>
      ) : null}

      {isCelebrate ? (
        <g className="v2-mascot-confetti" strokeLinecap="round" strokeWidth="4">
          <path d="M26 31l8 8" stroke="#58BCC9" />
          <path d="M136 31l-8 8" stroke="#8A86D6" />
          <path d="M43 22l2 11" stroke="#BCECF1" />
          <path d="M117 21l-3 11" stroke="#58BCC9" />
          <circle cx="23" cy="66" r="3" fill="#BCECF1" />
          <circle cx="139" cy="70" r="3" fill="#58BCC9" />
        </g>
      ) : null}

      <g className="v2-mascot-body">
        <path
          d="M79.8 22.5c17.5 13.5 38.1 31.4 38.1 62.4 0 27-17.3 47.8-37.9 47.8S42.1 111.9 42.1 84.9c0-31 20.2-48.9 37.7-62.4Z"
          fill="#58BCC9"
        />
        <path
          d="M47.6 92.3c7.5 15.5 18.6 23.5 32.4 23.5 14.2 0 26-8.4 33.2-24.9-8.2 5.5-19.3 8.9-32.1 8.9-13.5 0-25.3-2.7-33.5-7.5Z"
          fill="#DFF7FA"
        />
        <path
          d="M64.7 50c-5.4-12.9 1.9-25.8 15.9-28.4 2.9 15-3.6 26.3-15.9 28.4Z"
          fill="#8ED7E1"
        />
        <path
          d="M93.6 50.8c-1.8-13.6 7.6-24 21.5-24.1.3 14.9-8.6 24.3-21.5 24.1Z"
          fill="#BCECF1"
        />
        <path
          d="M80.2 23.8c-1.1 12.7-.8 22.4.7 30.2"
          fill="none"
          stroke="#2F7F8D"
          strokeLinecap="round"
          strokeWidth="5.8"
        />
        <ellipse cx="80" cy="81.6" rx="33" ry="35" fill="#FBFFFF" />

        {isRest ? (
          <g fill="none" stroke="#2C5F69" strokeLinecap="round" strokeWidth="4.8">
            <path d="M63.5 79.1c3.4 3.2 7 3.2 10.4 0" />
            <path d="M86.1 79.1c3.4 3.2 7 3.2 10.4 0" />
            <path d="M71.5 94.7c5.4 3.2 11.6 3.2 17 0" />
          </g>
        ) : (
          <>
            <circle cx="67.8" cy="77.7" r="4.7" fill="#2C5F69" />
            <circle cx="92.2" cy="77.7" r="4.7" fill="#2C5F69" />
            <path
              d={isCelebrate ? 'M70 91.5c5.7 7.6 14.3 7.6 20 0' : 'M70 94.7c5.5 6.2 14.5 6.2 20 0'}
              fill="none"
              stroke="#2C5F69"
              strokeLinecap="round"
              strokeWidth="5.8"
            />
          </>
        )}

        <circle cx="60.5" cy="90.1" r="5.2" fill="#F3D9DE" />
        <circle cx="99.5" cy="90.1" r="5.2" fill="#F3D9DE" />
      </g>

      <g className="v2-mascot-arms" fill="none" stroke="#2F7F8D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6">
        {isWelcome ? (
          <>
            <path d="M46 91c-13 5.5-20.4 2.5-25.5-7.3" />
            <path d="M114 88.8c13-2.7 19.2-11 21.6-23.7" />
            <path d="M133.7 65.7l8.5-4.1M134.9 67.1l6.7 5.6" />
          </>
        ) : null}
        {isAction ? (
          <>
            <path d="M45.5 92.5c-11.8 7.5-22.4 8.1-31.7 1.6" />
            <path d="M113.8 84.1c7.1-7.6 10.8-14.5 10.7-20.7" />
          </>
        ) : null}
        {isRest ? (
          <>
            <path d="M47.2 95.7c-9.3 6.1-18.7 6.5-28.2 1.2" />
            <path d="M112.8 95.7c9.3 6.1 18.7 6.5 28.2 1.2" />
          </>
        ) : null}
        {isCelebrate ? (
          <>
            <path d="M47.8 82.9C37.2 72.8 32.5 62.7 33.8 52.6" />
            <path d="M112.2 82.9c10.6-10.1 15.3-20.2 14-30.3" />
          </>
        ) : null}
      </g>

      <g className="v2-mascot-roots" fill="none" stroke="#2F7F8D" strokeLinecap="round" strokeWidth="5.2">
        <path d="M69 129.8c-2.6 7.1-8.2 10.7-16.9 11.6" />
        <path d="M80 131.8c-.2 8.5-3.2 14-9.8 17.2" />
        <path d="M91 129.8c2.6 7.1 8.2 10.7 16.9 11.6" />
      </g>
    </svg>
  );
}
