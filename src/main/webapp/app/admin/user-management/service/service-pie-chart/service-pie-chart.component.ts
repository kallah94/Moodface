import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { MoodService } from 'app/entities/mood/mood.service';
import { PieChartDemo } from 'app/admin/Chatrs/PieChart';

@Component({
  selector: 'jhi-service-pie-chart',
  templateUrl: './service-pie-chart.component.html',
  styleUrls: ['./service-pie-chart.component.scss']
})
export class ServicePieChartComponent implements OnInit {
  charpies: any[] = [];

  constructor(private userService: UserService, private moodService: MoodService) {}

  ngOnInit() {
    this.userService.services().subscribe(res => {
      res.forEach(name => {
        this.moodService.getMoodValueService(name).subscribe(list => {
          const dat = list.body;
          const NbUser = dat.pop();
          const Nbmood = dat.pop();
          this.charpies.push(new PieChartDemo(name, dat, NbUser, Nbmood));
        });
      });
    });
  }
}
