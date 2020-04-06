import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper/stepper.component';
import { StoryComponent } from './story/story.component';
import { ImgselectDirective } from './imgselect.directive';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		StepperComponent,
		StoryComponent,
		ImgselectDirective
	],
	exports: [
		StepperComponent,
		StoryComponent,
		ImgselectDirective
	]
})
export class SharedModule { }
