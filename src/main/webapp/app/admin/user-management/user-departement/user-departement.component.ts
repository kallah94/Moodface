import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { UserService } from 'app/core/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'app/core/user/user.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-user-departement',
  templateUrl: './user-departement.component.html',
  styleUrls: ['./user-departement.component.scss']
})
export class UserDepartementComponent implements OnInit {
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
  departements: String[] = [];
  users: IUser[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.departements().subscribe(res => {
      this.departements = res;
      res.forEach(name => {
        this.userService.getUsersByDepartement(name).subscribe(rep => {
          this.ListUser.push(rep.body);
        });
      });
    });
  }
}
