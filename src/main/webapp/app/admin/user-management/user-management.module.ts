import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Moodface1SharedModule } from 'app/shared/shared.module';
import { UserMgmtComponent } from './user-management.component';
import { UserMgmtDetailComponent } from './user-management-detail.component';
import { UserMgmtUpdateComponent } from './user-management-update.component';
import { UserMgmtDeleteDialogComponent } from './user-management-delete-dialog.component';
import { userManagementRoute } from './user-management.route';
import { UserServComponent } from './user-management.service.component';
import { UserDepartComponent } from './user-management-departement/user-management.departement.component';
import { UserPlateauComponent } from './user-management-plateau/user-management.plateaux.component';
import { MgmtAllplateauxComponent } from './user-management-plateau/user-management.Allplateaux.component';
import { MgmtAllservicesComponent } from './user-management-service/user-management.Allservices.component';
import { MgmtAlldepartementsComponent } from './user-management-departement/user-management.Alldepartement.component';

@NgModule({
  imports: [Moodface1SharedModule, RouterModule.forChild(userManagementRoute)],
  declarations: [
    UserMgmtComponent,
    UserMgmtDetailComponent,
    UserMgmtUpdateComponent,
    UserMgmtDeleteDialogComponent,
    UserServComponent,
    UserDepartComponent,
    UserPlateauComponent,
    MgmtAllplateauxComponent,
    MgmtAllservicesComponent,
    MgmtAlldepartementsComponent
  ],
  entryComponents: [UserMgmtDeleteDialogComponent]
})
export class UserManagementModule {}
