import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-user-plateaux',
  templateUrl: './user-management.Alldepartement.component.html'
})
export class MgmtAlldepartementsComponent implements OnInit, OnDestroy {
  departements: any[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.departements = [];
    this.userService.plateaux().subscribe(departements => {
      this.departements = departements;
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
