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

  getCheckinMode(){
    return this.http.get(environment.apiUrl+'/api/exec/checkinmode', this.authService.jwt()).map((response: Response) => response.json());
  }

  setCheckinMode(newMode: string){
    return this.http.post(environment.apiUrl+'/api/exec/checkinmode', {mode: newMode}, this.authService.jwt()).map((response: Response) => response.json());
  }

  setApplicationMode(newMode: string){
    return this.http.post(environment.apiUrl+'/api/applications/mode', {mode: newMode}, this.authService.jwt()).map((response: Response) => response.json());
  }

  getNextApplication(){
    return this.http.get(environment.apiUrl+'/api/exec/nextApplication', this.authService.jwt()).map((response: Response) => response.json());
  }

  getAdminList(){
    return this.http.get(environment.apiUrl+'/api/exec/admins', this.authService.jwt()).map((response: Response) => response.json());
  }

  addAdmin(emailToAdd: string){
    return this.http.post(environment.apiUrl+'/api/exec/addAdmin', {email: emailToAdd}, this.authService.jwt()).map((response: Response) => response.json());
  }

  revokeAdmin(emailToRevoke: string){
    return this.http.post(environment.apiUrl+'/api/exec/removeAdmin', {email: emailToRevoke}, this.authService.jwt()).map((response: Response) => response.json());
  }
}
