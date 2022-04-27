import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoTodosService {
  public noTodos = new BehaviorSubject<boolean>(false);
  constructor() {}
}