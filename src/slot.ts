import { randomInt } from 'node:crypto';

export interface SlotConfig {
  reelsCount: number;
  rowsCount: number;
  symbols: Record<number, number[]>;
  lines: number[][];
  reels: number[][];
}

export interface SpinResult {
  positions: number[];
  screen: number[][];
}

export class Slot {
  private readonly config: SlotConfig;

  constructor(config: SlotConfig) {
    this.config = config;
  }

  spin(): SpinResult {
    const positions: number[] = [];
    for (const reel of this.config.reels) {
      positions.push(randomInt(reel.length));
    }

    const screen = this.getScreen(positions);
    return { positions, screen };
  }

  private getScreen(positions: number[]): number[][] {
    const screen: number[][] = [];

    for (let row = 0; row < this.config.rowsCount; row++) {
      const symbols: number[] = [];

      for (let reelIndex = 0; reelIndex < this.config.reelsCount; reelIndex++) {
        const reel = this.config.reels[reelIndex];
        // The strip is circular: past the last symbol it continues from the first.
        const index = (positions[reelIndex] + row) % reel.length;
        symbols.push(reel[index]);
      }

      screen.push(symbols);
    }

    return screen;
  }
}
