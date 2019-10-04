import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-user-plateaux',
  templateUrl: './user-management.Allplateaux.component.html'
})
export class MgmtAllplateauxComponent implements OnInit, OnDestroy {
  plateaux: any[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.plateaux = [];
    this.userService.plateaux().subscribe(plateaux => {
      this.plateaux = plateaux;
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
