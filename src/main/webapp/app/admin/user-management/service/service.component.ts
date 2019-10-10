import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { MoodService } from 'app/entities/mood/mood.service';
import { MoodPlatValModel } from '../plateau/moodPlatValModel';

@Component({
  selector: 'jhi-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  services: String[] = [];
  Listmoodvalue: MoodPlatValModel[] = [];
  name: String;
  constructor(private userService: UserService, private moodService: MoodService) {}

  ngOnInit() {
    this.userService.services().subscribe(res => {
      this.services = res;
      res.forEach(name => {
        this.moodService.getMoodValueService(name).subscribe(list => {
          this.Listmoodvalue.push(new MoodPlatValModel(name, list.body));
        });
      });
    });
  }
}
