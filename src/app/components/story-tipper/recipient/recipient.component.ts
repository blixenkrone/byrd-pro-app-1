import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { switchMap, debounceTime, tap, map, filter, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { IMediaUser, IProfileRequest } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RecipientComponent implements OnInit {

  queryForm!: FormGroup;
  mediaSearchResults$!: Observable<IMediaUser[]>;
  @Output() private readonly mediaTipList: EventEmitter<IMediaUser[]> = new EventEmitter()

  mediaReqBody: IProfileRequest = {
    page: 0,
    hits: 20,
    feed: 'pro',
  }

  mediaReceivers: IMediaUser[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private srcSrv: SearchService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();

    this.mediaSearchResults$ = this.srcSrv.searchProfiles(this.mediaReqBody)

    // this.mediaSearchResults$ = this.queryForm.valueChanges.pipe(
    //   map((form) => form.medias ? form.medias.trim() : ''),
    //   filter(Boolean),
    //   debounceTime(400),
    //   distinctUntilChanged(),
    //   switchMap((query => {
    //     this.mediaReqBody.query = query;
    //     console.log(this.mediaReqBody)
    //     return this.srcSrv.searchProfiles(this.mediaReqBody)
    //   })),
    //   tap(val => console.log(val))
    // )
  }

  handleReceiver(media: IMediaUser) {
    const mediaExists = this.mediaReceivers.includes(media);
    if (mediaExists) {
      this.mediaReceivers.splice(this.mediaReceivers.indexOf(media), 1)
      this.snackBar.open(`Removed ${media.displayName}`, undefined, { duration: 2000 })
    } else {
      this.mediaReceivers.push(media)
      this.snackBar.open(`Added ${media.displayName}`, undefined, { duration: 2000 })
    }


    console.log(this.mediaReceivers)
    this.mediaTipList.emit(this.mediaReceivers)
  }

  public createForm() {
    this.queryForm = this.fb.group({
      medias: ['', Validators.minLength(1)]
    })
  }

}
