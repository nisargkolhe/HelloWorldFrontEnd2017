import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdInputModule } from '@angular/material';

import { Announcement } from '../announcement';

import { AlertService, AnnouncementService } from '../services/index';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  announcement: Announcement;
  loading = false;

  constructor(
    private router: Router,
    private announcementService: AnnouncementService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.announcement = new Announcement();
    this.announcement.should_email = false;
  }

  postAnnouncement(){
    this.loading = true;
    this.announcementService.postAnnouncement(this.announcement)
        .subscribe(
            data => {
                this.alertService.success('Announcement successfully sent.', true);
                this.router.navigate(['/']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }
}
