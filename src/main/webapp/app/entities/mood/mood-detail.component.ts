import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMood } from 'app/shared/model/mood.model';

@Component({
  selector: 'jhi-mood-detail',
  templateUrl: './mood-detail.component.html'
})
export class MoodDetailComponent implements OnInit {
  mood: IMood;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mood }) => {
      this.mood = mood;
    });
  }

  previousState() {
    window.history.back();
  }
}
