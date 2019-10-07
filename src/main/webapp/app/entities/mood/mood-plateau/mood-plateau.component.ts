import { Component, OnInit } from '@angular/core';
import { MoodService } from '../mood.service';
import { MockActivatedRoute } from 'src/test/javascript/spec/helpers/mock-route.service';
import { Mood } from 'app/shared/model/mood.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-mood-plateau',
  templateUrl: './mood-plateau.component.html',
  styleUrls: ['./mood-plateau.component.scss']
})
export class MoodPlateauComponent implements OnInit {
  moods: Mood[] = [];

  constructor(private moodService: MoodService, private route: ActivatedRoute) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    this.moodService.getMoodByPlateau(name).subscribe(res => (this.moods = res.body));
  }
}
