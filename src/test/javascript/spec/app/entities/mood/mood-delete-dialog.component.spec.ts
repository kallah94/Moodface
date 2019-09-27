import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Moodface1TestModule } from '../../../test.module';
import { MoodDeleteDialogComponent } from 'app/entities/mood/mood-delete-dialog.component';
import { MoodService } from 'app/entities/mood/mood.service';

describe('Component Tests', () => {
  describe('Mood Management Delete Component', () => {
    let comp: MoodDeleteDialogComponent;
    let fixture: ComponentFixture<MoodDeleteDialogComponent>;
    let service: MoodService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Moodface1TestModule],
        declarations: [MoodDeleteDialogComponent]
      })
        .overrideTemplate(MoodDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MoodDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MoodService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
