import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { UserService } from 'app/core/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'app/core/user/user.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-user-plateau',
  templateUrl: './user-plateau.component.html',
  styleUrls: ['./user-plateau.component.scss']
})
export class UserPlateauComponent implements OnInit {
  ListUser: any[] = [];
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  routeData: Subscription;
  name: String;
  plateaux: String[] = [];
  users: IUser[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.plateaux().subscribe(res => {
      this.plateaux = res;
      res.forEach(name => {
        this.userService.getUsersByPlateauName(name).subscribe(rep => {
          this.ListUser.push(rep.body);
        });
      });
    });
  }
}
