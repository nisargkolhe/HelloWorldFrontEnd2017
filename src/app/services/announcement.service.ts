import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments';

import { Announcement } from '../announcement';

@Injectable()
export class AnnouncementService {

  constructor(private http: Http) { }

  getAllAnnouncements(){
    return this.http.get(environment.apiUrl+'/api/announcements').map((response: Response) => response.json());
  }

  postAnnouncement(announcement: Announcement){
    return this.http.post(environment.apiUrl+'/api/announcements', this.convertJsonToFormData(announcement), this.jwt()).map((response: Response) => response.json());
  }

  getAnnouncementById(announcementId: number){
    return this.http.get(environment.apiUrl+'/api/announcements/'+announcementId, this.jwt()).map((response: Response) => response.json());
  }

  deleteAnnouncementById(announcementId: number){
    return this.http.delete(environment.apiUrl+'/api/announcements/'+announcementId, this.jwt()).map((response: Response) => response.json());
  }

  public convertJsonToFormData(item){
    var formData = new FormData();

    for (var key in item) {
      if(item[key] != undefined)
        formData.append(key, item[key]);
    }

    return formData;
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
