import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { MoodPlatValModel } from '../plateau/moodPlatValModel';
import { MoodService } from 'app/entities/mood/mood.service';
import { PieChartDemo } from 'app/admin/Chatrs/PieChart';

@Component({
  selector: 'jhi-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
  departements: String[] = [];
  name: String;
  charpies: any[] = [];
  barchart: any;
  dats: any[] = [];
  ListmoodModel: MoodPlatValModel[] = [];
  Legende: any;

  constructor(private userService: UserService, private moodService: MoodService) {}

  ngOnInit() {
    this.userService.departements().subscribe(res => {
      res.forEach(name => {
        this.moodService.getMoodValueDepartement(name).subscribe(list => {
          const dat = list.body;
          const NbUser = dat.pop();
          const Nbmood = dat.pop();
          this.dats.push(dat);
          this.charpies.push(new PieChartDemo(dat, name, NbUser, Nbmood));
        });
        console.log('TESTETETS', this.charpies);
      });
    });
  }
}
