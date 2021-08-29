import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './model/category';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  readonly ROOT = 'http://localhost:8080/money'
  readonly API = '/api/1.0.0'

  constructor(private http: HttpClient) { }

  getCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(
      this.ROOT + this.API + '/categories'
    )
  }
}
