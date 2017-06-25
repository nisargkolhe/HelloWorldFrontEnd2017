import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../user';
import { Application } from '../Application';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  create(user: User) {
      return this.http.post('http://localhost:8000'+'/api/user/register', user).map((response: Response) => response.json());
  }

  apply(application: Application) {
      return this.http.post('http://localhost:8000'+'/api/user/apply', application, this.jwt()).map((response: Response) => response.json());
  }

  updateApplication(application: Application) {
      return this.http.patch('http://localhost:8000'+'/api/user/apply', application, this.jwt()).map((response: Response) => response.json());
  }

  getApplication() {
      return this.http.get('http://localhost:8000'+'/api/user/application', this.jwt()).map((response: Response) => response.json());
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
