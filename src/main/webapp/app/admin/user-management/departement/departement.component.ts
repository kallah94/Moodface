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
  data: any[] = [];
  options: any;
  Nbmood: Number[] = [];
  NbUser: Number[] = [];
  Index: Number[] = [];
  departements: String[] = [];
  name: String;
  ListmoodModel: MoodPlatValModel[] = [];

  constructor(private userService: UserService, private moodService: MoodService) {}

  ChartFunction(dat: any, index: number, texte: String) {
    this.data[index] = {
      labels: ['Very Happy', 'Happy', 'Sad', 'Angry'],

      datasets: [
        {
          data: dat,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFFE00'],
          hoverBackgroundColor: ['#BB6384', '#3111EB', '#F55556', '#FFFFF']
        }
      ]
    };
    this.options = {
      title: {
        display: true,
        text: texte,
        fontSize: 20,
        fontColor: '#BB6384'
      },
      legend: {
        position: 'left',
        display: false
      }
    };
  }

  ngOnInit() {
    this.userService.departements().subscribe(res => {
      this.departements = res.sort();
      //  console.log("TETS TEST", res)
      let index = 0;

      res.forEach(name => {
        this.moodService.getMoodValueDepartement(name).subscribe(list => {
          const dat = list.body;
          //  console.log("NAME NAME NAME ", name)
          this.NbUser.push(dat.pop());
          this.Nbmood.push(dat.pop());
          //  console.log(dat)
          this.Index.push(index);
          this.ChartFunction(dat, index, name);
          index += 1;
        });
      });
    });
  }
}
