import { Category } from './category';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getListCategory(): Observable<Category[]> {
    const url = 'http://localhost:3000/listcategory';
    return this.http.get<Category[]>(url);
  }

}
