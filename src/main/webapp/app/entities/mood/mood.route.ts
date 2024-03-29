import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Mood } from 'app/shared/model/mood.model';
import { MoodService } from './mood.service';
import { MoodComponent } from './mood.component';
import { MoodDetailComponent } from './mood-detail.component';
import { MoodUpdateComponent } from './mood-update.component';
import { MoodDeletePopupComponent } from './mood-delete-dialog.component';
import { IMood } from 'app/shared/model/mood.model';
import { MoodDepartementComponent } from './mood-departement/mood-departement.component';
import { MoodServiceComponent } from './mood-service/mood-service.component';
import { MoodPlateauComponent } from './mood-plateau/mood-plateau.component';
import { MoodboarddepartementComponent } from './moodboarddepartement/moodboarddepartement.component';
import { MoodboardserviceComponent } from './moodboardservice/moodboardservice.component';
import { MoodboardplateauComponent } from './moodboardplateau/moodboardplateau.component';

@Injectable({ providedIn: 'root' })
export class MoodResolve implements Resolve<IMood> {
  constructor(private service: MoodService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMood> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Mood>) => response.ok),
        map((mood: HttpResponse<Mood>) => mood.body)
      );
    }
    return of(new Mood());
  }
}

export const moodRoute: Routes = [
  {
    path: '',
    component: MoodComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'moodface1App.mood.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MoodDetailComponent,
    resolve: {
      mood: MoodResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'moodface1App.mood.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MoodUpdateComponent,
    resolve: {
      mood: MoodResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'moodface1App.mood.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MoodUpdateComponent,
    resolve: {
      mood: MoodResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'moodface1App.mood.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'departement/:name',
    component: MoodDepartementComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'moodface1App.mood.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'service/:name',
    component: MoodServiceComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'moodface1App.mood.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'plateau/:name',
    component: MoodPlateauComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'moodface1App.mood.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'moodBoardDepartement/:name',
    component: MoodboarddepartementComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'moodface1App.mood.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'moodBoardService/:name',
    component: MoodboardserviceComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'moodface1App.mood.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'moodBoardPlateau/:name',
    component: MoodboardplateauComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'moodface1App.mood.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const moodPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MoodDeletePopupComponent,
    resolve: {
      mood: MoodResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'moodface1App.mood.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
