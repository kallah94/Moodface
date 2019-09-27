import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Moodface1TestModule } from '../../../test.module';
import { MoodUpdateComponent } from 'app/entities/mood/mood-update.component';
import { MoodService } from 'app/entities/mood/mood.service';
import { Mood } from 'app/shared/model/mood.model';

describe('Component Tests', () => {
  describe('Mood Management Update Component', () => {
    let comp: MoodUpdateComponent;
    let fixture: ComponentFixture<MoodUpdateComponent>;
    let service: MoodService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Moodface1TestModule],
        declarations: [MoodUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MoodUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MoodUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MoodService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Mood(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Mood();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
