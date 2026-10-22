export interface SlotConfig {
  reelsCount: number;
  rowsCount: number;
  symbols: Record<number, number[]>;
  lines: number[][];
  reels: number[][];
}
