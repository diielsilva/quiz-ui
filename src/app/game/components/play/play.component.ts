import { Component, input, output } from '@angular/core';
import { MessageService } from '../../../shared/services/message.service';
import { Attempt } from '../../entities/attempt';
import { Game } from '../../entities/game';
import { GameStatus } from '../../enums/game-status';
import { GameService } from '../../services/game.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css',
})
export class PlayComponent {
  public game = input.required<Game>();
  protected setGame = output<Game | null>();

  constructor(
    private gameService: GameService,
    private messageService: MessageService
  ) {}

  public play(answer: number) {
    const attempt: Attempt = { gameId: this.game().id, answer };

    this.gameService.play(attempt).subscribe({
      next: (game: Game) => {
        if (game.status === GameStatus.FINISHED) {
          this.messageService.display('Game over!');
          this.setGame.emit(null);
          return;
        }

        this.setGame.emit(game);
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.display(
          error.error.message === undefined
            ? 'Cannot reach the server!'
            : error.error.message
        );

        this.setGame.emit(null);
      },
    });
  }
}
