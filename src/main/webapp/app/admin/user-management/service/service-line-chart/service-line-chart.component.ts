import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { MoodService } from 'app/entities/mood/mood.service';
import { LineChartDemo } from 'app/admin/Chatrs/LineChart';

@Component({
  selector: 'jhi-service-line-chart',
  templateUrl: './service-line-chart.component.html',
  styleUrls: ['./service-line-chart.component.scss']
})
export class ServiceLineChartComponent implements OnInit {
  linechart: any[] = [];
  constructor(private userService: UserService, private moodService: MoodService) {}

  ngOnInit() {
    this.userService.services().subscribe(res => {
      res.forEach(name => {
        this.moodService.getMoodBoardService(name).subscribe(resbis => {
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
