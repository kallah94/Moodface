import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMood, Mood } from 'app/shared/model/mood.model';
import { MoodService } from './mood.service';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-mood-update',
  templateUrl: './mood-update.component.html'
})
export class MoodUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    commentaire: [],
    mood: [null, [Validators.required]],
    agent: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected moodService: MoodService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mood }) => {
      this.updateForm(mood);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(mood: IMood) {
    this.editForm.patchValue({
      id: mood.id,
      commentaire: mood.commentaire,
      mood: mood.mood,
      agent: mood.agent
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mood = this.createFromForm();
    if (mood.id !== undefined) {
      this.subscribeToSaveResponse(this.moodService.update(mood));
    } else {
      this.subscribeToSaveResponse(this.moodService.create(mood));
    }
  }

  private createFromForm(): IMood {
    return {
      ...new Mood(),
      id: this.editForm.get(['id']).value,
      commentaire: this.editForm.get(['commentaire']).value,
      mood: this.editForm.get(['mood']).value,
      agent: this.editForm.get(['agent']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMood>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
