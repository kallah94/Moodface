import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Moodface1SharedModule } from 'app/shared/shared.module';
import { MoodComponent } from './mood.component';
import { MoodDetailComponent } from './mood-detail.component';
import { MoodUpdateComponent } from './mood-update.component';
import { MoodDeletePopupComponent, MoodDeleteDialogComponent } from './mood-delete-dialog.component';
import { moodRoute, moodPopupRoute } from './mood.route';

const ENTITY_STATES = [...moodRoute, ...moodPopupRoute];

@NgModule({
  imports: [Moodface1SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MoodComponent, MoodDetailComponent, MoodUpdateComponent, MoodDeleteDialogComponent, MoodDeletePopupComponent],
  entryComponents: [MoodDeleteDialogComponent]
})
export class Moodface1MoodModule {}
