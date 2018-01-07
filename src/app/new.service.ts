import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { News } from './news';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NewService {

  constructor(private http: HttpClient) { }

  getListNew(): Observable<News[]> {
    const url = 'http://localhost:3000/listnew';
    return this.http.get<News[]>(url);
  }
  getNew(id): Observable<News> {
    const url = 'http://localhost:3000/listnew/' + id;
    return this.http.get<News>(url);
  }
  uploadImage(imageToUpload) {
    const input = new FormData();
    input.append('file', imageToUpload);
    const url = 'http://localhost:3000/uploadimage';
    return this.http.post(url, input);
  }
  editNew(id, body) {
    const url = 'http://localhost:3000/editnew/' + id;
    return this.http.post(url, body, httpOptions);
  }
  addNew(body) {
    const url = 'http://localhost:3000/addnew';
    return this.http.post(url, body, httpOptions);
  }
  deleteNew(id) {
    const url = 'http://localhost:3000/deletenew/' + id;
    return this.http.delete(url, httpOptions);
  }
}
