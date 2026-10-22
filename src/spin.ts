import config from './configuration.ts';
import { Slot } from './slot.ts';

const { positions, screen } = new Slot(config).spin();

console.log('Positions:', positions.join(' '));
console.table(screen);
