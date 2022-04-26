import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly _apiUrl = environment.apiUrl;
  private _httpError = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  getAllDescending(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this._apiUrl}order=u_id.desc`);
  }

  deleteTodo(todo: Todo): Observable<any> {
    const u_id: number = todo.u_id;
    return this.httpClient.delete(`${this._apiUrl}u_id=eq.${u_id}`);
  }

  addTodo(todo: Todo): Observable<any> {
    return this.httpClient.post(`${this._apiUrl}`, todo);
  }

  updateTodo(todo: any): Observable<any> {
    const u_id: number = todo.u_id;
    return this.httpClient.patch(`${this._apiUrl}u_id=eq.${u_id}`, todo);
  }

  set httpError(value: boolean) {
    this._httpError.next(value);
    setTimeout(() => {
      this._httpError.next(!value);
    }, 1500);
  }

  get httpError(): boolean {
    return this._httpError.getValue();
  }
}
