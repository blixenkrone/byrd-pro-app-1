import { Injectable } from '@angular/core';
import { Subject, Observable, of, BehaviorSubject, merge, combineLatest, concat, throwError, race, iif, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { first, catchError, mergeMap, switchMap, tap, map, take, multicast, share, shareReplay } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { IProUser, IMediaUser, RequestProfiles } from '../core/models/user.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private isAdminSubj$ = new BehaviorSubject<boolean>(false);
	isAdmin$ = this.isAdminSubj$.asObservable()

	private userSubj$ = new ReplaySubject<IProUser>();
	user$ = this.userSubj$.asObservable()

	constructor(
		private authSrv: AuthService,
		private http: HttpClient) { }

	setUser(user: IProUser) {
		this.userSubj$.next(user);
		this.isAdminSubj$.next(user.isAdmin)
	}

	// * OP Method
	getUserByTokenHeader$(): Observable<IProUser> {
		const user$ = this.http.get<IProUser>(`${environment.proApiUrl}/auth/profile/token`);
		return user$.pipe(catchError(err => throwError(err)))
	}

	getAdminTest$ = (): Observable<boolean> => {
		const val$ = this.http.get<boolean>(`${environment.proApiUrl}/admin/secure`)
		return val$
	}

	getUserByUID$ = (userId: string): Observable<IProUser> => {
		const http$ = this.http.get<IProUser>(`${environment.proApiUrl}/profile/${userId}`)
			.pipe(catchError(err => of(err))) as Observable<IProUser>;
		return http$;
	}

	getUserByAfAuth$ = (): Observable<IProUser> => {
		const localUID = this.authSrv.getFbUser().uid;
		const httpReq$ = (uid: string) => this.http.get<IProUser>(`${environment.proApiUrl}/profile/${uid}`)
		const fetchFromAF$ = this.authSrv.getFBAuthToken$().pipe(switchMap(uid => uid ? httpReq$(uid) : throwError('No user found in af-auth')));
		return iif(() => localUID !== null, httpReq$(localUID), fetchFromAF$).pipe(catchError(err => of(err))) as Observable<IProUser>
	}

	getUserLocalOrRaced$() {
		const localUser$ = this.user$
		const localUserExist$ = localUser$.pipe(take(1), map(usr => !!usr))
		const racedUser$ = race(this.getUserByTokenHeader$(), this.getUserByAfAuth$())

		return localUserExist$.pipe(
			mergeMap((usrExistLocally: boolean) => {
				return iif(() => usrExistLocally, this.user$, racedUser$)
			})
		) as Observable<IProUser>
	}

	// feed === "pro” for this app
	getProfiles$ = (params: RequestProfiles | any, token: string): Observable<IMediaUser[]> => {
		return this.http.get<IMediaUser>(`${environment.byrdApiUrl}/profiles`, { params })
			.pipe(catchError(err => of(err)));
	}
}
