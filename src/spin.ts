import config from './configuration.ts';
import { Slot } from './slot.ts';

const { positions, screen, lines, totalWin } = new Slot(config).spin();

console.log('Positions:', positions.join(' '));
console.table(screen);

const lineTable: Record<string, object> = {};
lines.forEach((result, index) => {
  const rows = config.lines[index];
  const symbols = rows.map((row, reelIndex) => screen[row][reelIndex]);

  lineTable[`Line ${index}`] = {
    rows: rows.join(' '),
    symbols: symbols.join(' '),
    symbol: result.symbol,
    count: result.count,
    payout: `x${result.payout}`,
  };
});
console.table(lineTable);

console.log(`Win: x${totalWin}`);
