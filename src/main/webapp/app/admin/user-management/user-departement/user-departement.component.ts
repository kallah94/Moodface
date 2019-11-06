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
    this.userService.departements().subscribe(res => {
      this.departements = res;
      res.forEach(name => {
        this.userService.getUsersByDepartement(name).subscribe(rep => {
          this.ListUser.push(rep.body);
        });
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
