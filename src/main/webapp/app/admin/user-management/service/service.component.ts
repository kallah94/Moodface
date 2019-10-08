import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  services: String[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.services().subscribe(res => (this.services = res));
  }
}
