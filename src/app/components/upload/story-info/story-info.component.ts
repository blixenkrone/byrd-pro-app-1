import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StoriesService } from 'src/app/services/stories.service';
import { takeUntil, switchMap, tap, filter, catchError, map, every, timeout, withLatestFrom, startWith } from 'rxjs/operators';
import { Subject, Observable, of, forkJoin, merge, combineLatest } from 'rxjs';
import { IAssignmentParams, IAssignment } from 'src/app/core/models/story.model';

@Component({
	selector: 'app-story-info',
	templateUrl: './story-info.component.html',
	styleUrls: ['./story-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryInfoComponent implements OnInit, OnDestroy {
	destroyed$ = new Subject();
	assignments$!: Observable<any>;
	@Input() storyForm!: FormGroup;
	exclusiveChecked: boolean = false;
	slider = {
		min: 0,
		max: 900,
		step: 15,
	}

	constructor(
		private storySrv: StoriesService) {
	}

	ngOnInit() {
		const assignmentParams: IAssignmentParams = { page: 0, hits: 90, feed: 'admin' }
		this.assignments$ = this.storySrv.getAssignments$(assignmentParams).pipe(
			catchError(err => of(err)),
			tap(res => {
				// console.log(res)
			})
		)
	}

	setFormValue(formCtl: string, value: any) {
		this.storyForm.get(formCtl)?.setValue(value)
	}

	get checked() {
		const checked = <boolean>this.storyForm.get('isExclusive')?.value
		if (!checked) {
			this.setFormValue('storyPrice', 0)
		}
		return checked;
	}

	get price$() {
		return this.storyForm.get('storyPrice')?.valueChanges as Observable<number>
	}

	ngOnDestroy() {
		this.destroyed$.next()
		this.destroyed$.unsubscribe()
	}

}
