import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss']
})
export class PlateauComponent implements OnInit {
  plateaux: String[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.plateaux().subscribe(res => (this.plateaux = res));
  }
}
