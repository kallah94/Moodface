import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { MoodPlatValModel } from '../plateau/moodPlatValModel';
import { MoodService } from 'app/entities/mood/mood.service';

@Component({
  selector: 'jhi-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {

  departements: String[] = [];
  name: String;
  ListmoodModel: MoodPlatValModel[] = [];

  constructor(private userService: UserService, private moodService: MoodService) {}

  ngOnInit() {
    this.userService.departements().subscribe(res => {
      this.departements = res;
      res.forEach(name => {
        this.moodService.getMoodValueDepartement(name).subscribe(list => {
          this.ListmoodModel.push(new MoodPlatValModel(name, list.body));
        });
      });
    });
  }

}
