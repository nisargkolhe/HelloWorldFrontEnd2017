import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments';

import { AuthenticationService } from './authentication.service';


@Injectable()
export class ExecService {

  constructor(
    private http: Http,
    private authService: AuthenticationService
  ) { }

  getAllCheckins(){
    return this.http.get(environment.apiUrl+'/api/exec/checkin', this.authService.jwt()).map((response: Response) => response.json());
  }

  checkInUser(email: string){
    return this.http.post(environment.apiUrl+'/api/exec/checkin', {email: email}, this.authService.jwt()).map((response: Response) => response.json());
  }

  getStats(){
    return this.http.get(environment.apiUrl+'/api/exec/statistics', this.authService.jwt()).map((response: Response) => response.json());
  }

  getNextApplication(){
    return this.http.get(environment.apiUrl+'/api/exec/nextApplication', this.authService.jwt()).map((response: Response) => response.json());
  }
}
