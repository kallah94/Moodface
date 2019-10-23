import { Component, OnInit } from '@angular/core';
import { MoodService } from '../mood.service';
import { ActivatedRoute } from '@angular/router';
import { IMoodboard } from 'app/shared/model/moodboard.model';
// import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-moodboarddepartement',
  templateUrl: './moodboarddepartement.component.html',
  styleUrls: ['./moodboarddepartement.component.scss']
})
export class MoodboarddepartementComponent implements OnInit {
  moodboard: IMoodboard;
  departementName: String;
  constructor(private moodService: MoodService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    this.departementName = name;
    this.moodService.getMoodBoardDepartement(name).subscribe(res => {
      this.moodboard = res.body;
    });
  }
}
