import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
  departements: String[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.departements().subscribe(res => (this.departements = res));
  }
}
