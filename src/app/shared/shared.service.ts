import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MailSlackNotification, SlackResponse } from '../models/slack.model';
import { Observable, of, BehaviorSubject, Subject, concat } from 'rxjs';
import { catchError, take, share, shareReplay, filter, startWith } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

export const ErrUnsupportedType = Error("this media type is not supported")
export const ErrUnsupportedFormat = Error("this media format is not supported")

@Injectable({ providedIn: 'root' })
export class StepperService {

	// Standard stepnum is 1 NOT 0
	private stepNumSubj = new BehaviorSubject<number>(1)
	stepNum$ = this.stepNumSubj.asObservable().pipe(shareReplay(1))

	constructor(
		private http: HttpClient) { }

	setStep = (num: number) => {
		this.stepNumSubj.next(num)
	}

	slackNotification<T>(body: MailSlackNotification): Observable<SlackResponse> {
		const slackNotification$ = this.http.post<SlackResponse>(`${environment.proApiUrl}/slack/tip`, body)
			.pipe(catchError((err) => of(err)), take(1))
		return slackNotification$
	}
}
