import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { MoodService } from 'app/entities/mood/mood.service';

@Component({
  selector: 'jhi-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss']
})
export class PlateauComponent implements OnInit {
  plateaux: String[] = [];
  moodvalues: Number[] = [];
  name: String;

  constructor(private userService: UserService, private moodService: MoodService) {}

  ngOnInit() {
    this.userService.plateaux().subscribe(res => (this.plateaux = res));
    const name = 'Administrator';
    this.moodService.getMoodValuePlateau(name).subscribe(list => (this.moodvalues = list.body));
  }
}
