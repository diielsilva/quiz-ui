import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _message = signal<string>('');

  public get message() {
    return this._message;
  }

  public display(message: string) {
    this._message.set(message);
    this.clean();
  }

  private clean(): void {
    setTimeout(() => {
      this._message.set('');
    }, 2500);
  }
}
