import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Moodface1SharedModule } from 'app/shared/shared.module';
import { MoodComponent } from './mood.component';
import { MoodDetailComponent } from './mood-detail.component';
import { MoodUpdateComponent } from './mood-update.component';
import { MoodDeletePopupComponent, MoodDeleteDialogComponent } from './mood-delete-dialog.component';
import { moodRoute, moodPopupRoute } from './mood.route';
import { MoodDepartementComponent } from './mood-departement/mood-departement.component';
import { MoodServiceComponent } from './mood-service/mood-service.component';
import { MoodPlateauComponent } from './mood-plateau/mood-plateau.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToggleButtonModule } from 'primeng/togglebutton';

const ENTITY_STATES = [...moodRoute, ...moodPopupRoute];

@NgModule({
  imports: [Moodface1SharedModule, InputSwitchModule, ToggleButtonModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MoodComponent,
    MoodDetailComponent,
    MoodUpdateComponent,
    MoodDeleteDialogComponent,
    MoodDeletePopupComponent,
    MoodDepartementComponent,
    MoodServiceComponent,
    MoodPlateauComponent
  ],
  entryComponents: [MoodDeleteDialogComponent]
})
export class Moodface1MoodModule {}
