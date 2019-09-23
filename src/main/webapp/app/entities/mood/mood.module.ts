import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MoodfaceSharedModule } from 'app/shared';
import {
  MoodComponent,
  MoodDetailComponent,
  MoodUpdateComponent,
  MoodDeletePopupComponent,
  MoodDeleteDialogComponent,
  moodRoute,
  moodPopupRoute
} from './';

const ENTITY_STATES = [...moodRoute, ...moodPopupRoute];

@NgModule({
  imports: [MoodfaceSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MoodComponent, MoodDetailComponent, MoodUpdateComponent, MoodDeleteDialogComponent, MoodDeletePopupComponent],
  entryComponents: [MoodComponent, MoodUpdateComponent, MoodDeleteDialogComponent, MoodDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoodfaceMoodModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
