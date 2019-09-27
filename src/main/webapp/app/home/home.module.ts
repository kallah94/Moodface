import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Moodface1SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [Moodface1SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class Moodface1HomeModule {}
