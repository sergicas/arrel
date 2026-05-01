import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CycleDots from './CycleDots.jsx';
import { FEEDBACK } from '../lib/types.js';

describe('CycleDots', () => {
  it('labels feedback, current day, pending days and rest day', () => {
    render(
      <CycleDots
        dayInCycle={3}
        cycleNumber={1}
        feedback={[
          { cycle: 1, day: 1, value: FEEDBACK.DONE },
          { cycle: 1, day: 2, value: FEEDBACK.PARTIAL },
          { cycle: 1, day: 6, value: FEEDBACK.SKIPPED },
        ]}
      />
    );

    expect(screen.getByLabelText('Dia 1: hi és')).toBeInTheDocument();
    expect(screen.getByLabelText('Dia 2: amb esforç')).toBeInTheDocument();
    expect(screen.getByLabelText('Dia 3: avui')).toBeInTheDocument();
    expect(screen.getByLabelText('Dia 4: pendent')).toBeInTheDocument();
    expect(screen.getByLabelText('Dia 6: ho deixo per avui')).toBeInTheDocument();
    expect(screen.getByLabelText('Dia 7: lectura')).toBeInTheDocument();
  });
});
