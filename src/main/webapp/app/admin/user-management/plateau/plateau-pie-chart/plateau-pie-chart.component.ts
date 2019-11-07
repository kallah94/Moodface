import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { MoodService } from 'app/entities/mood/mood.service';
import { PieChartDemo } from 'app/admin/Chatrs/PieChart';

@Component({
  selector: 'jhi-plateau-pie-chart',
  templateUrl: './plateau-pie-chart.component.html',
  styleUrls: ['./plateau-pie-chart.component.scss']
})
export class PlateauPieChartComponent implements OnInit {
  charpies: any[] = [];

  constructor(private userService: UserService, private moodService: MoodService) {}

  ngOnInit() {
    this.userService.plateaux().subscribe(res => {
      res.forEach(name => {
        this.moodService.getMoodValuePlateau(name).subscribe(list => {
          const dat = list.body;
          const NbUser = dat.pop();
          const Nbmood = dat.pop();
          this.charpies.push(new PieChartDemo(name, dat, NbUser, Nbmood));
        });
      });
    });
  }
}
