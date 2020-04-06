import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryTipperRoutingModule } from './story-tipper-routing.module';
import { StoryTipperComponent } from './story-tipper.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RecipientComponent } from './recipient/recipient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ImgselectDirective } from 'src/app/shared/imgselect.directive';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoryTipperRoutingModule,
    // SharedModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  declarations: [
    StoryTipperComponent,
    RecipientComponent
  ],
  exports: []
})
export class StoryTipperModule { }
