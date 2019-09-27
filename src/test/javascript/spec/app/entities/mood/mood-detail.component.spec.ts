import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Moodface1TestModule } from '../../../test.module';
import { MoodDetailComponent } from 'app/entities/mood/mood-detail.component';
import { Mood } from 'app/shared/model/mood.model';

describe('Component Tests', () => {
  describe('Mood Management Detail Component', () => {
    let comp: MoodDetailComponent;
    let fixture: ComponentFixture<MoodDetailComponent>;
    const route = ({ data: of({ mood: new Mood(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Moodface1TestModule],
        declarations: [MoodDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MoodDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MoodDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mood).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
