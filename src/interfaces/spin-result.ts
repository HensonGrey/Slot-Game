import type { LineResult } from './line-result.ts';

export interface SpinResult {
  positions: number[];
  screen: number[][];
  lines: LineResult[];
  totalWin: number;
}
