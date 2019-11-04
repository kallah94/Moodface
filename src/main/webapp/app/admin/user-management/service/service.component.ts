import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { MoodService } from 'app/entities/mood/mood.service';
import { MoodPlatValModel } from '../plateau/moodPlatValModel';
import { PieChartDemo } from 'app/admin/Chatrs/PieChart';

@Component({
  selector: 'jhi-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  charpies: any[] = [];
  ListmoodModel: MoodPlatValModel[] = [];
  Legende: any;

  constructor(private userService: UserService, private moodService: MoodService) {}

  ngOnInit() {
    this.userService.services().subscribe(res => {
      res.forEach(name => {
        this.moodService.getMoodValueService(name).subscribe(list => {
          const dat = list.body;
          const NbUser = dat.pop();
          const Nbmood = dat.pop();
          this.charpies.push(new PieChartDemo(dat, name, NbUser, Nbmood));
        });
      });
    });
  }
}
