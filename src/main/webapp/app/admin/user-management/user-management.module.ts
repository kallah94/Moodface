import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Moodface1SharedModule } from 'app/shared/shared.module';
import { UserMgmtComponent } from './user-management.component';
import { UserMgmtDetailComponent } from './user-management-detail.component';
import { UserMgmtUpdateComponent } from './user-management-update.component';
import { UserMgmtDeleteDialogComponent } from './user-management-delete-dialog.component';
import { userManagementRoute } from './user-management.route';
import { UserServComponent } from './user-management.service.component';
import { UserDepartComponent } from './user-management.departement.component';
import { UserPlateauComponent } from './user-management.plateaux.component';
@NgModule({
  imports: [Moodface1SharedModule, RouterModule.forChild(userManagementRoute)],
  declarations: [
    UserMgmtComponent,
    UserMgmtDetailComponent,
    UserMgmtUpdateComponent,
    UserMgmtDeleteDialogComponent,
    UserServComponent,
    UserDepartComponent,
    UserPlateauComponent
  ],
  entryComponents: [UserMgmtDeleteDialogComponent]
})
export class UserManagementModule {}
