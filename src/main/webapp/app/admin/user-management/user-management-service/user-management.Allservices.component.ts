import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-user-plateaux',
  templateUrl: './user-management.Allservices.component.html'
})
export class MgmtAllservicesComponent implements OnInit, OnDestroy {
  services: any[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.services = [];
    this.userService.services().subscribe(services => {
      this.services = services;
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
