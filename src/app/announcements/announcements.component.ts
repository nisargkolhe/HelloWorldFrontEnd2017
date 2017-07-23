import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../services/index';

import { Announcement } from "../announcement";


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  announcements: Announcement[] = [];
  loading = true;

  constructor(private announcementService: AnnouncementService) { }

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

}
