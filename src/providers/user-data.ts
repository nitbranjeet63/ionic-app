import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage
  ) {}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(phonenumber: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setPhoneNumber(phonenumber);
    this.events.publish('user:login');
  };

  signup(phonenumber: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setPhoneNumber(phonenumber);
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('phonenumber');
    this.events.publish('user:logout');
  };

  setPhoneNumber(phonenumber: string): void {
    this.storage.set('phonenumber', phonenumber);
  };

  getPhoneNumber(): Promise<string> {
    return this.storage.get('phonenumber').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
