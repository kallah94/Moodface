import { Component, OnInit } from '@angular/core';
import { MoodService } from '../mood.service';
import { ActivatedRoute } from '@angular/router';
import { Mood } from 'app/shared/model/mood.model';

@Component({
  selector: 'jhi-mood-service',
  templateUrl: './mood-service.component.html',
  styleUrls: ['./mood-service.component.scss']
})
export class MoodServiceComponent implements OnInit {
  moods: Mood[] = [];

  constructor(private moodService: MoodService, private route: ActivatedRoute) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    this.moodService.getMoodByService(name).subscribe(res => (this.moods = res.body));
  }
}
