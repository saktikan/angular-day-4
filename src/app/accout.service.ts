import { Injectable } from '@angular/core';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccoutService {
  account = new Account('firstname', 'lastname');

  constructor() { }
}
