import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/core/user/user.model';

@Component({
  selector: 'jhi-user-plateau',
  templateUrl: './user-plateau.component.html',
  styleUrls: ['./user-plateau.component.scss']
})
export class UserPlateauComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    this.userService.findUsersByPlateauName(name).subscribe(res => (this.users = res.body));
  }
}
