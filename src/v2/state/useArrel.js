import { useContext } from 'react';
import { ArrelContext } from './arrelContextValue.js';

export function useArrel() {
  const ctx = useContext(ArrelContext);
  if (!ctx) throw new Error('useArrel must be used within ArrelProvider');
  return ctx;
}
