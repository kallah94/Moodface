/*import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { UserService } from 'app/core/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { User, IUser } from 'app/core/user/user.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-user-plateau',
  templateUrl: './user-plateau.component.html',
  styleUrls: ['./user-plateau.component.scss']
})
export class UserPlateauComponent implements OnInit {
  users: User[] = [];
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  routeData: Subscription;
  name;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    protected parseLinks: JhiParseLinks,
    protected alertService: JhiAlertService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll(name: string) {
    this.userService
      .getUsersByPlateauName(name, {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IUser[]>) => this.paginateUsers(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateUsers(data: IUser[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.users = data;
  }

  ngOnInit() {
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this.loadAll(this.name);
  }

  private onError(error) {
    this.alertService.error(error.error, error.message, null);
  }
}*/

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { UserService } from 'app/core/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { User, IUser } from 'app/core/user/user.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-user-plateau',
  templateUrl: './user-plateau.component.html',
  styleUrls: ['./user-plateau.component.scss']
})
export class UserPlateauComponent implements OnInit {
  users: User[] = [];
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  routeData: Subscription;
  name;
  plateaux: String[] = [];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    protected parseLinks: JhiParseLinks,
    protected alertService: JhiAlertService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  ngOnInit() {
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this.userService.plateaux().subscribe(res => {
      this.plateaux = res;
      res.forEach(name => {
        this.userService.getUsersByPlateauName(name).subscribe(
          //(rep: HttpResponse<User[]>) => this.paginateUsers(rep.body, rep.headers),
          //(rep: HttpErrorResponse) => this.onError(rep.message),
          (rep: HttpResponse<IUser[]>) => {
            this.users.push(new User(name, rep.body));
          },
          (rep: HttpErrorResponse) => this.onError(rep.message),
          (rep: HttpResponse<User[]>) => this.paginateUsers(rep.body, rep.headers)
        );
      });
    });
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateUsers(data: IUser[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.users = data;
  }

  private onError(error) {
    this.alertService.error(error.error, error.message, null);
  }
}
