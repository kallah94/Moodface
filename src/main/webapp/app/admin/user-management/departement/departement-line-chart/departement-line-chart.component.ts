import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { MoodService } from 'app/entities/mood/mood.service';
import { LineChartDemo } from 'app/admin/Chatrs/LineChart';

@Component({
  selector: 'jhi-departement-line-chart',
  templateUrl: './departement-line-chart.component.html',
  styleUrls: ['./departement-line-chart.component.scss']
})
export class DepartementLineChartComponent implements OnInit {
  linechart: any[] = [];
  constructor(private userService: UserService, private moodService: MoodService) {}

  ngOnInit() {
    this.userService.departements().subscribe(res => {
      res.forEach(name => {
        this.moodService.getMoodBoardDepartement(name).subscribe(resbis => {
          const health = [];
          resbis.body.forEach(objet => {
            health.push(objet.health);
          });
          this.linechart.push(new LineChartDemo(name, health));
        });
      });
    });
  }
}
