# Slot Game

A small backend-only slot machine in Node.js and TypeScript.

## Requirements

Node 22.18 or newer (it runs the `.ts` files directly), then `npm install`.

## How a spin works

1. Pick a random stop position per reel. That symbol is the top row.
2. Take the next two symbols down the strip for the other rows, wrapping around at the end. That's the 3×5 screen.
3. Read each payline's symbols off the screen.
4. Pay each line from the paytable and sum the payouts.

Lines pay left to right only, starting from the first reel with no gaps, so `x 9 9 9 x` or `x y 9 9 9` pay nothing. Each line costs 1 credit, so a spin costs 5.

## Scripts

- `npm run spin` plays one spin and prints the screen and each line's payout.
- `npm run simulate -- <N>` plays N spins (default 1,000,000) and reports RTP, hit frequency, standard deviation and the largest win.
- `npm run typecheck` runs the TypeScript compiler as a check.

```
$ npm run simulate -- 10000000
Spins:               10,000,000
Total bet:           50,000,000
Total win:           34,561,560
RTP:                 69.12% ± 0.32%
Hit frequency:       6.02% (1 in 16.6 spins)
Standard deviation:  5.16 bets per spin
Largest win:         6000 credits (1200x the bet)
```