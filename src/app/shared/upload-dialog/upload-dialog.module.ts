import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadDialogComponent } from './upload-dialog.component';
import { DialogService } from './upload-dialog.service';

@NgModule({
    declarations: [
        UploadDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
    ],
    exports: [
        UploadDialogComponent
    ],
    providers: [
        DialogService,
    ],
    entryComponents: [UploadDialogComponent]

})
export class UploadDialogModule { }
