import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './game/components/home/home.component';
import { PlayComponent } from './game/components/play/play.component';
import { Game } from './game/entities/game';
import { MessageComponent } from './shared/components/message/message.component';
import { MessageService } from './shared/services/message.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, PlayComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected game = signal<Game | null>(null);

  constructor(protected messageService: MessageService) {}

  protected setGame(game: Game | null) {
    this.game.set(game);
  }
}
