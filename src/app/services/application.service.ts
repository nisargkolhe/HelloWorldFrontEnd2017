import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments';

import { User } from '../user';
import { Application } from '../application';

@Injectable()
export class ApplicationService {

  constructor(private http: Http) { }

  getAllApplications() {
      return this.http.get(environment.apiUrl+'/api/applications',  this.jwt()).map((response: Response) => response.json());
  }

  getApplication(id) {
      return this.http.get(environment.apiUrl+'/api/applications/'+id,  this.jwt()).map((response: Response) => response.json());
  }

  setStatus(id, status) {
      return this.http.post(environment.apiUrl+'/api/applications/'+id+'/setStatus', {"status":status}, this.jwt()).map((response: Response) => response.json());
  }

  // private helper methods

  private jwt() {
      // create authorization header with jwt token
      //let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let token = localStorage.getItem('token');
      if (token) {
          let headers = new Headers({ 'Authorization': 'Bearer ' + token });
          return new RequestOptions({ headers: headers });
      }
  }
}
