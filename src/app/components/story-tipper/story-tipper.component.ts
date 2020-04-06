import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MailService } from 'src/app/services/mail.service';
import { Subject, Observable, of } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { first, catchError, tap, takeUntil } from 'rxjs/operators';
import { StepperService } from 'src/app/shared/shared.service';
import { IStep } from 'src/app/shared/stepper/stepper.component';
import { StoriesService } from 'src/app/services/stories.service';
import { SingleMailPrefs } from 'src/app/models/mail.model';
import { Router } from '@angular/router';
import { IStoryParams, IStoryResponse } from 'src/app/core/models/story.model';
import { IProUser, IMediaUser } from 'src/app/core/models/user.model';

@Component({
	selector: 'app-story-tipper',
	templateUrl: './story-tipper.component.html',
	styleUrls: ['./story-tipper.component.scss']
})
export class StoryTipperComponent implements OnInit, OnDestroy {
	private unsubscribe$ = new Subject();
	private storyTipArr: IStoryResponse[] = []
	private mediaReceivers: IMediaUser[] = [];
	usrExistingStories$!: Observable<IStoryResponse[]>;
	user$!: Observable<IProUser>
	isSelected: boolean = false;
	step!: number;
	responseArray!: [string, number];

	private storyParams: IStoryParams = {
		page: 0,
		hits: 10,
		feed: 'latest',
	}
	// endpoint for getting media profiles: ./profiles?page=0&hits=18&feed=admin&query=isMedia
	readonly steps: IStep[] = [
		{ name: 'Choose your stories', num: 1 },
		{ name: 'Select recipients', num: 2 },
		{ name: 'Finished', num: 3 }]

	readonly headliners = [
		{ headline: 'Tip your stories', sub: 'Tell the media about your hot scoop' },
		{ headline: 'Select a recipient', sub: 'Who should be informed of this story?', },
		{ headline: 'Done', sub: 'Your selected medias has been tipped!', },
	]


	constructor(
		private router: Router,
		private mailSrv: MailService,
		private stoSrv: StoriesService,
		private snackBar: MatSnackBar,
		private authSrv: AuthService,
		private sharedSrv: StepperService,
		private usrSrv: UserService) { }

	ngOnInit() {
		const uid = this.authSrv.getFbUser().uid;
		this.getUser(uid);
		this.getProfileStoryUploads(uid, this.storyParams);

		this.sharedSrv.stepNum$.subscribe((step) => this.step = step)
	}

	ngOnDestroy() {
		this.unsubscribe$.next()
		this.unsubscribe$.unsubscribe()
		console.log('Unsubscribed from mail tipper!')
	}

	handleStory(story: IStoryResponse) {
		const selected = this.storyTipArr.includes(story)
		if (selected) {
			this.storyTipArr.splice(this.storyTipArr.indexOf(story), 1)
			this.snackBar.open('Story removed from tip collection.', undefined, { duration: 2000 })
		} else {
			this.storyTipArr.push(story)
			this.snackBar.open('Story added to tip collection!', undefined, { duration: 2000 })
		}
		console.log('exists in array => true/false?: ', selected)
		console.log(this.storyTipArr)
	}

	/**
	  * mediaTipList returns medias to tip
	  * @param medias is output() from HTML component 'recipients'
	  */
	public mediaTipList(medias: IMediaUser[]) {
		this.mediaReceivers = medias;
		console.log(this.mediaReceivers)
	}

	public sendMail(user: IProUser) {
		const singleMailBody: SingleMailPrefs = {
			from: { email: user.email, displayName: user.displayName },
			recievers: this.mediaReceivers.map(m => ({ displayName: m.displayName, email: m.email, country: m.country })),
			storyIds: this.storyTipArr.map(s => s.objectID),
			subject: `${user.displayName} tipped a story!`,
		}
		console.log(singleMailBody)

		this.mailSrv.sendMail(singleMailBody)
			.pipe(first(), takeUntil(this.unsubscribe$), catchError(err => of(err)))
			.subscribe((val: [string, number]) => {
				console.log(val)
				this.responseArray = val;
				this.setStep(3)
			})
	}

	private getUser(uid: string) {
		this.user$ = this.usrSrv.getUserByUID$(uid)
			.pipe(catchError(err => of(err)), first())
	}

	private getProfileStoryUploads(uid: string, storyParams: IStoryParams) {
		this.usrExistingStories$ = this.stoSrv.getUserStories$(uid, storyParams)
			.pipe(catchError(err => of(err)), first(), tap(res => {

			}))
	}

	setStep = (step: number) => {
		step > 0 ? this.sharedSrv.setStep(step) : this.router.navigate(['/dashboard']);
	}

	home = () => this.router.navigate(['/dashboard'])

}
