import { GameStatus } from '../enums/game-status';
import { Question } from './question';

export interface Game {
  id: string;
  status: GameStatus;
  current: Question;
  remaining: Question[];
  lives: number;
}
