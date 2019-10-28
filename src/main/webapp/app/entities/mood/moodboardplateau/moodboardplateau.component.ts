import { Component, OnInit } from '@angular/core';
import { IMoodboard } from 'app/shared/model/moodboard.model';
import { MoodService } from '../mood.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-moodboardplateau',
  templateUrl: './moodboardplateau.component.html',
  styleUrls: ['./moodboardplateau.component.scss']
})
export class MoodboardplateauComponent implements OnInit {
  moodboard: IMoodboard;
  plateauName: String;

  constructor(private moodService: MoodService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    this.plateauName = name;
    this.moodService.getMoodBoardPlateau(name).subscribe(res => {
      this.moodboard = res.body;
    });
  }
}
