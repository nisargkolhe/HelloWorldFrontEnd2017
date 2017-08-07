import { Component, OnInit } from '@angular/core';
import { AnnouncementService, UserService, AlertService } from '../services/index';

import { Announcement } from "../announcement";
import { User } from "../user";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  announcements: Announcement[] = [];
  currentUser: User;
  loading = true;

  constructor(
    private announcementService: AnnouncementService,
    private alertService: AlertService,
    private userService: UserService) {
      this.currentUser = userService.loadFromLocalStorage();
  }

  ngOnInit() {
    let that = this;
    that.loadAnnouncements();
    (function loop() {
      setTimeout(function () {
        that.loading = true;
        that.loadAnnouncements();
        loop();
      }, 60000);
    }());
  }

  loadAnnouncements(){
    this.announcementService.getAllAnnouncements()
      .subscribe(
        result => {
          this.announcements = result.announcements;
          this.loading = false;
          console.log(result);
        }, error => {
          console.log(error);
        }
    );
  }

  deleteAnnouncement(announcementId: number){
    this.announcementService.deleteAnnouncementById(announcementId)
      .subscribe(
        result => {
          this.loading = false;
          this.alertService.success(result.message);
          this.loadAnnouncements();
          console.log(result);
        }, error => {
          this.loading = false;
          this.alertService.success(error.message);
          console.log(error);
        }
    );
  }

}
