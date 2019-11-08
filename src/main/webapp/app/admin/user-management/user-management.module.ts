import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Moodface1SharedModule } from 'app/shared/shared.module';
import { UserMgmtComponent } from './user-management.component';
import { UserMgmtDetailComponent } from './user-management-detail.component';
import { UserMgmtUpdateComponent } from './user-management-update.component';
import { UserMgmtDeleteDialogComponent } from './user-management-delete-dialog.component';
import { userManagementRoute } from './user-management.route';
import { DepartementComponent } from './departement/departement.component';
import { PlateauComponent } from './plateau/plateau.component';
import { ServiceComponent } from './service/service.component';
import { DServicesComponent } from './departement/d-services/d-services.component';
import { DPlateauxComponent } from './service/d-plateaux/d-plateaux.component';
import { UserPlateauComponent } from 'app/admin/user-management/user-plateau/user-plateau.component';
import { UserServiceComponent } from 'app/admin/user-management/user-service/user-service.component';
import { UserDepartementComponent } from 'app/admin/user-management/user-departement/user-departement.component';
import { ChartModule } from 'primeng/chart';
import { PlateauLineChartComponent } from './plateau/plateau-line-chart/plateau-line-chart.component';
import { PlateauPieChartComponent } from './plateau/plateau-pie-chart/plateau-pie-chart.component';
import { DepartementPieChartComponent } from './departement/departement-pie-chart/departement-pie-chart.component';
import { DepartementLineChartComponent } from './departement/departement-line-chart/departement-line-chart.component';
import { ServiceLineChartComponent } from './service/service-line-chart/service-line-chart.component';
import { ServicePieChartComponent } from './service/service-pie-chart/service-pie-chart.component';

@NgModule({
  imports: [Moodface1SharedModule, ChartModule, RouterModule.forChild(userManagementRoute)],
  declarations: [
    UserMgmtComponent,
    UserMgmtDetailComponent,
    UserMgmtUpdateComponent,
    UserMgmtDeleteDialogComponent,
    DepartementComponent,
    PlateauComponent,
    ServiceComponent,
    DServicesComponent,
    DPlateauxComponent,
    UserPlateauComponent,
    UserServiceComponent,
    UserDepartementComponent,

    PlateauLineChartComponent,
    PlateauPieChartComponent,

    DepartementPieChartComponent,
    DepartementLineChartComponent,

    ServiceLineChartComponent,
    ServicePieChartComponent
  ],
  entryComponents: [UserMgmtDeleteDialogComponent]
})
export class UserManagementModule {}
