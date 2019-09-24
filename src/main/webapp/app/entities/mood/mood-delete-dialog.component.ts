import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMood } from 'app/shared/model/mood.model';
import { MoodService } from './mood.service';

@Component({
  selector: 'jhi-mood-delete-dialog',
  templateUrl: './mood-delete-dialog.component.html'
})
export class MoodDeleteDialogComponent {
  mood: IMood;

  constructor(protected moodService: MoodService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.moodService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'moodListModification',
        content: 'Deleted an mood'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-mood-delete-popup',
  template: ''
})
export class MoodDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mood }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MoodDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mood = mood;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/mood', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/mood', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
