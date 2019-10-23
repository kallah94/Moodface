import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { MoodService } from 'app/entities/mood/mood.service';
import { MoodPlatValModel } from './moodPlatValModel';
import { BarChartDemo } from '../../Chatrs/BarChart';
import { PieChartDemo } from 'app/admin/Chatrs/PieChart';
import { LineChartDemo } from 'app/admin/Chatrs/LineChart';

@Component({
  selector: 'jhi-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss']
})
export class PlateauComponent implements OnInit {

  departements: String[] = [];
  name: String;
  charpies: any[] = [];
  barchart: any;
  dats: any[] = [];
  ListmoodModel: MoodPlatValModel[] = [];
  Legende: any;

  constructor(private userService: UserService, private moodService: MoodService) {}

  ngOnInit() {
    this.userService.plateaux().subscribe(res => {

      this.departements = res;
      res.forEach(name => {
        this.moodService.getMoodValuePlateau(name).subscribe(list => {
          const dat = list.body;
          const NbUser = dat.pop();
          const Nbmood = dat.pop();
          this.dats.push(dat);
          this.charpies.push(new PieChartDemo(dat, name, NbUser, Nbmood));
        });
      });
    });
  }
}
