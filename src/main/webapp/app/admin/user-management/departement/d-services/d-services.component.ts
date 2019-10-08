import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-d-services',
  templateUrl: './d-services.component.html',
  styleUrls: ['./d-services.component.scss']
})
export class DServicesComponent implements OnInit {
  services: String[] = [];
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    this.userService.findServicesByDepartement(name).subscribe(res => (this.services = res.body));
  }
}
