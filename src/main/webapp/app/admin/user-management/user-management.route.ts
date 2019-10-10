import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { User } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { UserMgmtComponent } from './user-management.component';
import { UserMgmtDetailComponent } from './user-management-detail.component';
import { UserMgmtUpdateComponent } from './user-management-update.component';
import { DepartementComponent } from './departement/departement.component';
import { ServiceComponent } from './service/service.component';
import { PlateauComponent } from './plateau/plateau.component';
import { DServicesComponent } from './departement/d-services/d-services.component';
import { DPlateauxComponent } from './service/d-plateaux/d-plateaux.component';
import { UserPlateauComponent } from 'app/admin/user-management/user-plateau/user-plateau.component';

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
    path: 'departement',
    component: DepartementComponent,

    data: {
      pageTitle: 'userManagement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'service',
    component: ServiceComponent,

    data: {
      pageTitle: 'userManagement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'plateaux',
    component: PlateauComponent,

    data: {
      pageTitle: 'userManagement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'departement/:name/services',
    component: DServicesComponent,

    data: {
      pageTitle: 'userManagement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'service/:name/plateaux',
    component: DPlateauxComponent,

    data: {
      pageTitle: 'userManagement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'plateau/:name/users',
    component: UserPlateauComponent,

    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'userManagement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
