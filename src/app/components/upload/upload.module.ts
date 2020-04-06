import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoryIndexComponent } from './story-index/story-index.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoryInfoComponent } from './story-info/story-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { UploadDialogModule } from 'src/app/shared/upload-dialog/upload-dialog.module';


@NgModule({
	declarations: [
		UploadComponent,
		DropzoneComponent,
		StoryIndexComponent,
		StoryInfoComponent,
	],
	providers: [],
	imports: [
		CommonModule,
		UploadRoutingModule,
		UploadDialogModule,
		ReactiveFormsModule,
		NgxFileDropModule,
		SharedModule,
		MatButtonToggleModule,
		MatButtonModule,
		DragDropModule,
		MatSelectModule,
		MatInputModule,
		MatIconModule,
		MatChipsModule,
		MatProgressSpinnerModule,
		MatAutocompleteModule,
		MatSlideToggleModule,
		MatSliderModule
	],
	// entryComponents: [UploadDialogComponent]
})
export class UploadModule { }
