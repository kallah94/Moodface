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
import { UserServiceComponent } from 'app/admin/user-management/user-service/user-service.component';
import { UserDepartementComponent } from 'app/admin/user-management/user-departement/user-departement.component';
import { PlateauPieChartComponent } from './plateau/plateau-pie-chart/plateau-pie-chart.component';
import { ServicePieChartComponent } from './service/service-pie-chart/service-pie-chart.component';
import { DepartementPieChartComponent } from './departement/departement-pie-chart/departement-pie-chart.component';
import { ServiceLineChartComponent } from './service/service-line-chart/service-line-chart.component';
import { DepartementLineChartComponent } from './departement/departement-line-chart/departement-line-chart.component';
import { PlateauLineChartComponent } from './plateau/plateau-line-chart/plateau-line-chart.component';

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
    path: 'plateaux/statistiques',
    component: PlateauPieChartComponent,

    data: {
      pageTitle: 'userManagement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'services/statistiques',
    component: ServicePieChartComponent,
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'departements/statistiques',
    component: DepartementPieChartComponent,
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'departements/health',
    component: DepartementLineChartComponent,
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'services/health',
    component: ServiceLineChartComponent,
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'plateaux/health',
    component: PlateauLineChartComponent,
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
    path: 'plateau/users',
    component: UserPlateauComponent,
    data: {
      pageTitle: 'userManagement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'service/users',
    component: UserServiceComponent,
    data: {
      pageTitle: 'userManagement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'departement/users',
    component: UserDepartementComponent,

    data: {
      pageTitle: 'userManagement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
