import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeWhile, takeUntil } from 'rxjs/operators';
import { StepperService } from '../shared.service';


export interface IStep {
	name: string;
	num: number;
}

@Component({
	selector: 'app-stepper',
	template: `
  		<div class="step-wrapper">
		  <div class="step" *ngFor="let s of steps; let i = index;" [class.visited]="step >= s.num">
  		    <span>{{s.num}}.</span>
  		    <span>{{s.name}}</span>
  		  </div>
  		</div>
  		`,
	styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, OnDestroy {
	@Input() steps: IStep[] = []
	step!: number;
	unsubscribe$ = new Subject();

	constructor(
		private sharedSrv: StepperService) { }

	ngOnInit() {
		this.sharedSrv.stepNum$.pipe(takeUntil(this.unsubscribe$))
			.subscribe(step => {
				console.log(step)
				this.step = step
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.unsubscribe()
		console.log('Killed the stepper')
	}

}
