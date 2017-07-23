import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments';

@Injectable()
export class AnnouncementService {

  constructor(private http: Http) { }

  getAllAnnouncements(){
    return this.http.get(environment.apiUrl+'/api/announcements').map((response: Response) => response.json());
  }
}
