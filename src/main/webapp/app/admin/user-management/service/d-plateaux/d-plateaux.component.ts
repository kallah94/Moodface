import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-d-plateaux',
  templateUrl: './d-plateaux.component.html',
  styleUrls: ['./d-plateaux.component.scss']
})
export class DPlateauxComponent implements OnInit {
  plateaux: String[] = [];
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    this.userService.findPlateauxByService(name).subscribe(res => (this.plateaux = res.body));
  }
}
