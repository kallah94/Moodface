import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { User } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { UserMgmtComponent } from './user-management.component';
import { UserMgmtDetailComponent } from './user-management-detail.component';
import { UserMgmtUpdateComponent } from './user-management-update.component';
import { UserServComponent } from './user-management.service.component';
import { UserDepartComponent } from './user-management.departement.component';
import { UserPlateauComponent } from './user-management.plateaux.component';
import { MgmtAllplateauxComponent } from './user-management.Allplateaux.component';
import { MgmtAllservicesComponent } from './user-management.Allservices.component';
import { MgmtAlldepartementsComponent } from './user-management.Alldepartement.component';

@Injectable({ providedIn: 'root' })
export class UserMgmtResolve implements Resolve<any> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['login'] ? route.params['login'] : null;
    if (id) {
      return this.service.find(id);
    }
    return new User();
  }
}

export const userManagementRoute: Routes = [
  {
    path: '',
    component: UserMgmtComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'userManagement.home.title',
      defaultSort: 'id,asc'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':login/view',
    component: UserMgmtDetailComponent,
    resolve: {
      user: UserMgmtResolve
    },
    data: {
      pageTitle: 'userManagement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserMgmtUpdateComponent,
    resolve: {
      user: UserMgmtResolve
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':login/edit',
    component: UserMgmtUpdateComponent,
    resolve: {
      user: UserMgmtResolve
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':service/users_by_service',
    component: UserServComponent,
    resolve: {
      user: UserMgmtResolve
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':departement/users_by_departement',
    component: UserDepartComponent,
    resolve: {
      user: UserMgmtResolve
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':plateau/users_by_plateau',
    component: UserPlateauComponent,
    resolve: {
      user: UserMgmtResolve
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'Allplateaux',
    component: MgmtAllplateauxComponent,
    resolve: {
      user: UserMgmtResolve
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'Allservices',
    component: MgmtAllservicesComponent,
    resolve: {
      user: UserMgmtResolve
    },
    canActivate: [UserRouteAccessService]
  },

  {
    path: 'Alldepartements',
    component: MgmtAlldepartementsComponent,
    resolve: {
      user: UserMgmtResolve
    },
    canActivate: [UserRouteAccessService]
  }
];
