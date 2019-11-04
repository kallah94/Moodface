/*
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { UserService } from 'app/core/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { User, IUser } from 'app/core/user/user.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-user-service',
  templateUrl: './user-service.component.html',
  styleUrls: ['./user-service.component.scss']
})
export class UserServiceComponent implements OnInit {
  users: User[] = [];
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  routeData: Subscription;
  name: String;
  services: String[] = [];

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
        this.userService.services().subscribe(res => {
              this.services = res;
              res.forEach(name => {
                this.userService
                  .getAllUsersByService(name, {
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                  })
                  .subscribe(
                    (rep: HttpResponse<IUser[]>) => this.paginateUsers(rep.body, rep.headers),
                    (rep: HttpErrorResponse) => this.onError(rep.message)
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
*/

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { UserService } from 'app/core/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { User, IUser } from 'app/core/user/user.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-user-service',
  templateUrl: './user-service.component.html',
  styleUrls: ['./user-service.component.scss']
})
export class UserServiceComponent implements OnInit {
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
  services: String[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.services().subscribe(res => {
      this.services = res;
      res.forEach(name => {
        this.userService.getAllUsersByService(name).subscribe(rep => {
          this.ListUser.push(rep.body);
        });
      });
    });
  }
}
