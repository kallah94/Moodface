import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { MoodService } from 'app/entities/mood/mood.service';
import { PieChartDemo } from 'app/admin/Chatrs/PieChart';

@Component({
  selector: 'jhi-departement-pie-chart',
  templateUrl: './departement-pie-chart.component.html',
  styleUrls: ['./departement-pie-chart.component.scss']
})
export class DepartementPieChartComponent implements OnInit {
  charpies: any[] = [];
  constructor(private userService: UserService, private moodService: MoodService) {}

  ngOnInit() {
    this.userService.departements().subscribe(res => {
      res.forEach(name => {
        this.moodService.getMoodValueDepartement(name).subscribe(list => {
          const dat = list.body;
          const NbUser = dat.pop();
          const Nbmood = dat.pop();
          this.charpies.push(new PieChartDemo(name, dat, NbUser, Nbmood));
        });
      });
    });
  }
}
