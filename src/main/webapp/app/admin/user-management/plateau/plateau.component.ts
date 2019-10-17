import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { MoodService } from 'app/entities/mood/mood.service';
import { MoodPlatValModel } from './moodPlatValModel';

@Component({
  selector: 'jhi-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss']
})
export class PlateauComponent implements OnInit {
  plateaux: String[] = [];
  name: String;
  ListmoodModel: MoodPlatValModel[] = [];

  constructor(private userService: UserService, private moodService: MoodService) {}

  ngOnInit() {
    this.userService.plateaux().subscribe(res => {
      this.plateaux = res;
      res.forEach(name => {
        this.moodService.getMoodValuePlateau(name).subscribe(list => {
          this.ListmoodModel.push(new MoodPlatValModel(name, list.body));
        });
      });
    });
  }
}
