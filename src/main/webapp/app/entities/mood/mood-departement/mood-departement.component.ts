import { Component, OnInit } from '@angular/core';
import { MoodService } from '../mood.service';
import { ActivatedRoute } from '@angular/router';
import { Mood } from 'app/shared/model/mood.model';

@Component({
  selector: 'jhi-mood-departement',
  templateUrl: './mood-departement.component.html',
  styleUrls: ['./mood-departement.component.scss']
})
export class MoodDepartementComponent implements OnInit {
  moods: Mood[] = [];

  constructor(private moodService: MoodService, private route: ActivatedRoute) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    this.moodService.getMoodByDepartement(name).subscribe(res => (this.moods = res.body));
    console.log(name);
  }
}
