import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogService, DialogData } from './upload-dialog.service';

@Component({
	selector: 'app-upload-dialog',
	template: `
		<ng-container *ngIf="dialogData$ | async as data">
			<ng-container *ngIf="!data.isLoading; else progressTmp">
				<h2>Your content has been uploaded</h2>
				<img src="assets/logos/upload_done.svg" alt="upload is done">
				<button (click)="closeDialog()">Okay</button>
			</ng-container>
			<ng-template #progressTmp>
				<h2>Uploading material to Byrd...</h2>
				<mat-spinner class="center-object" [diameter]="150" color="accent"></mat-spinner>
				<mat-progress-bar class="center-object" [value]="data.progress" color="accent"></mat-progress-bar>
				<h3 class="progress-percent">
					<span class="progress-red">{{data.progress}}</span> out of 100 %
				</h3>
			</ng-template>
		</ng-container>
		`
	,
	styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent {

	constructor(
		private dialogSrv: DialogService) { }

	dialogData$: Observable<DialogData> = this.dialogSrv.dialogData$

	closeDialog(): void {
		this.dialogSrv.close();
	}
}
