import { Component, OnInit } from '@angular/core';
import { IMoodboard } from 'app/shared/model/moodboard.model';
import { MoodService } from '../mood.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-moodboardservice',
  templateUrl: './moodboardservice.component.html',
  styleUrls: ['./moodboardservice.component.scss']
})
export class MoodboardserviceComponent implements OnInit {
  moodboardservice: IMoodboard[];
  serviceName: String;

  constructor(private moodService: MoodService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    this.serviceName = name;
    this.moodService.getMoodBoardService(name).subscribe(res => {
      this.moodboardservice = res.body;
    });
  }
}
