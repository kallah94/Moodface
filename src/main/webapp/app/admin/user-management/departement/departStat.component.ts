import { Component, OnInit} from '@angular/core';
import { MoodPlatValModel } from '../plateau/moodPlatValModel';
import { UserService } from 'app/core/user/user.service';
import { MoodService } from 'app/entities/mood/mood.service';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
    selector: 'jhi-departement',
    templateUrl: './departStat.component.html',

  })

export class DoughnutChartDemoComponent implements OnInit {

    data: any;
    options: any;
    departements: String[] = [];
    name: String;
    ListmoodModel: MoodPlatValModel[] = [];
    constructor(
        private userService: UserService,
        private moodService: MoodService
    ) {}


    ngOnInit() {
        this.userService.departements().subscribe(res => {
          this.departements = res;
          const name = res.pop();
          const names = res.pop()
          this.moodService.getMoodValueDepartement(name).subscribe( list => {
              const dat = list.body;
            dat.pop()
            dat.pop()
        this.options = {
            plotOptions: {
              pie: {    customScale: 0.8,
                radius:  "90%",
                innerRadius: "70%",
                donut: {
                  size: '95%'
                }
              }
            }
          }

        this.data = {
            labels:["Very Happy","Happy", "Sad", "Angry"],

            datasets: [
                {
                   // data:this.dat,
                   data: dat,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FFFE00",
                    ],
                    hoverBackgroundColor: [
                        "#BB6384",
                        "#3111EB",
                        "#F55556",
                        "#FFFFF"
                    ]
                }]
            };
        });

        });
    }

}

