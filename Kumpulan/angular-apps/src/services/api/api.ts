import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Creditur } from '../../model/creditur.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private api = 'https://685cee61769de2bf085e7bc5.mockapi.io/dummy-surveyor/DummyData';

  constructor(private http: HttpClient) {}

  getData(): Observable<Creditur[]> {
    return this.http.get<Creditur[]>(this.api);
  }

  addData(data: Creditur): Observable<Creditur> {
    return this.http.post<Creditur>(this.api, data);
  }

  updateData(id: string, data: Creditur): Observable<Creditur> {
    return this.http.put<Creditur>(`${this.api}/${id}`, data);
  }

  deleteData(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
