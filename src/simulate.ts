import config from './configuration.ts';
import { Slot } from './slot.ts';

const DEFAULT_SPINS = 1_000_000;
// Widening the range by 1.96 SD / √spins on each side makes it 95% likely the real RTP is inside.
const Z_SCORE_95 = 1.96;

const arg = process.argv[2];
const spins = arg === undefined ? DEFAULT_SPINS : Number(arg);

if (!Number.isSafeInteger(spins) || spins <= 0) {
  console.error('Usage: npm run simulate -- <N>   (N is a positive whole number, default 1000000)');
  process.exit(1);
}

const slot = new Slot(config);
// Each line costs 1, so a spin costs one bet per line.
const betPerSpin = config.lines.length;

let totalWin = 0;
let winningSpins = 0;
let largestWin = 0;
let sumOfSquaredReturns = 0;

for (let i = 0; i < spins; i++) {
  const { totalWin: win } = slot.spin();

  totalWin += win;
  if (win > 0) {
    winningSpins++;
  }
  if (win > largestWin) {
    largestWin = win;
  }

  // Returns of one spin, counting the lines cost. One spin costs 5 credits
  const spinReturn = win / betPerSpin;
  sumOfSquaredReturns += spinReturn * spinReturn;
}

const totalBet = spins * betPerSpin;
const rtp = totalWin / totalBet;
const hitFrequency = winningSpins / spins;
const standardDeviation = Math.sqrt(sumOfSquaredReturns / spins - rtp * rtp);
const confidenceRange = (Z_SCORE_95 * standardDeviation) / Math.sqrt(spins);

const percent = (value: number) => `${(value * 100).toFixed(2)}%`;

console.log(`Spins:               ${spins.toLocaleString('en-US')}`);
console.log(`Total bet:           ${totalBet.toLocaleString('en-US')}`);
console.log(`Total win:           ${totalWin.toLocaleString('en-US')}`);
console.log(`RTP:                 ${percent(rtp)} ± ${percent(confidenceRange)}`);
console.log(`Hit frequency:       ${percent(hitFrequency)} (1 in ${(1 / hitFrequency).toFixed(1)} spins)`);
console.log(`Standard deviation:  ${standardDeviation.toFixed(2)} bets per spin`);
console.log(`Largest win:         x${largestWin} (${largestWin / betPerSpin} bets)`);
