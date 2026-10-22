import { randomInt } from 'node:crypto';
import type { LineResult } from './interfaces/line-result.ts';
import type { SlotConfig } from './interfaces/slot-config.ts';
import type { SpinResult } from './interfaces/spin-result.ts';

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

    const lines: LineResult[] = [];
    let totalWin = 0;
    for (const line of this.config.lines) {
      const result = this.evaluateLine(screen, line);
      lines.push(result);
      totalWin += result.payout;
    }

    return { positions, screen, lines, totalWin };
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

  private evaluateLine(screen: number[][], line: number[]): LineResult {
    const lineSymbols: number[] = [];
    for (let reelIndex = 0; reelIndex < line.length; reelIndex++) {
      const row = line[reelIndex];
      lineSymbols.push(screen[row][reelIndex]);
    }

    // Only the first symbol of a line is assumed payable for this config
    const symbol = lineSymbols[0];
    let count = 0;
    for (const lineSymbol of lineSymbols) {
      if (lineSymbol !== symbol) {
        break;
      }
      count++;
    }

    const payout = this.config.symbols[symbol][count - 1];
    return { symbol, count, payout };
  }
}
