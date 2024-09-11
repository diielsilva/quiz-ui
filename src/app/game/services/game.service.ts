import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Attempt } from '../entities/attempt';
import { Game } from '../entities/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _api: string = `${environment.api}/games`;

  constructor(private httpClient: HttpClient) {}

  public start(): Observable<Game> {
    return this.httpClient.post<Game>(this._api, null);
  }

  public play(attempt: Attempt): Observable<Game> {
    return this.httpClient.patch<Game>(this._api, attempt);
  }
}
