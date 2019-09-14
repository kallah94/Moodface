import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MoodfaceSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [MoodfaceSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [MoodfaceSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoodfaceSharedModule {
  static forRoot() {
    return {
      ngModule: MoodfaceSharedModule
    };
  }
}
