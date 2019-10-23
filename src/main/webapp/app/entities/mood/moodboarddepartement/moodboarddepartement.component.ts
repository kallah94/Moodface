import { Component, OnInit } from '@angular/core';
import { MoodService } from '../mood.service';
import { ActivatedRoute } from '@angular/router';
import { IMoodboard } from 'app/shared/model/moodboard.model';

@Component({
  selector: 'jhi-moodboarddepartement',
  templateUrl: './moodboarddepartement.component.html',
  styleUrls: ['./moodboarddepartement.component.scss']
})
export class MoodboarddepartementComponent implements OnInit {
  moodboard: IMoodboard;

  constructor(private moodService: MoodService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    // console.log(name);
    this.moodService.getMoodBoardDepartement(name).subscribe(res => {
      this.moodboard = res.body;
      // this.moodboard.listmood.
      // console.log("TEST TEST ",this.moodboard)
    });
  }
}
