import { Component, output } from '@angular/core';
import { MessageService } from '../../../shared/services/message.service';
import { Game } from '../../entities/game';
import { GameService } from '../../services/game.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public setGame = output<Game | null>();

  constructor(
    private gameService: GameService,
    private messageService: MessageService
  ) {}

  protected start() {
    this.gameService.start().subscribe({
      next: (game: Game) => {
        this.setGame.emit(game);
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.display(
          error.error.message === undefined
            ? 'Cannot reach the server'
            : error.error.message
        );
        
        this.setGame.emit(null);
      },
    });
  }
}
